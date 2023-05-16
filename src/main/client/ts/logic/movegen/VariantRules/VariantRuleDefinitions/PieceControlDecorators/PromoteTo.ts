import { PieceLetter, verifyPieceLetter, pieceControlConfigSettings, defaultPieces } from "@moveGeneration/PieceControl/PieceControlInterface";
import { compileEnumeration, prefixWithIndefiniteArticle } from "@client/ts/utils/StringFormatUtils";
import { PieceControl } from "../../../PieceControl/PieceControl";
import { VariantRule } from "../../VariantRule";
import type { VariantRuleHandler } from "../../VariantRuleInterface";

const tag = "promotionPieces";
export class PromoteTo extends VariantRule<typeof PieceControl, typeof tag> implements VariantRuleHandler<PieceControl> {
	static {
		VariantRule.initVariantRule(PromoteTo);
	}

	static filterPromotionPieceString(pieces: string): PieceLetter[] {
		const inputPromotion = pieces.split("").filter<PieceLetter>((p): p is PieceLetter => verifyPieceLetter(p));
		return inputPromotion.length ? inputPromotion : [defaultPieces.queen, defaultPieces.rook, defaultPieces.bishop, defaultPieces.knight];
	}

	private promotionPieces: PieceLetter[];
	constructor(promotionPieces?: unknown) {
		super();
		this.promotionPieces =
			Array.isArray(promotionPieces) &&
			promotionPieces.every<PieceLetter>((p): p is PieceLetter => typeof p === "string" && verifyPieceLetter(p))
				? promotionPieces
				: [defaultPieces.queen, defaultPieces.rook, defaultPieces.bishop, defaultPieces.knight];
	}

	getDecoratorType() {
		return PieceControl;
	}

	getPublicProperties() {
		const pieceNames = this.promotionPieces.reduce<string[]>((p, c) => {
			const pieceName = pieceControlConfigSettings[c].naming.name;
			return [...p, pieceName];
		}, []);
		return {
			parameterValue: this.promotionPieces,
			information: {
				name: "Pawns promote to",
				textualForm: "",
				description: `Pawns promote to ${prefixWithIndefiniteArticle(compileEnumeration(pieceNames))}`,
				tag
			}
		} as const;
	}

	matchesPGNDeclaration(match: string): boolean {
		const matchArray = match.match(/^PromoteTo=([A-ZxΘ]+)$/i);
		if (matchArray) {
			this.promotionPieces = PromoteTo.filterPromotionPieceString(matchArray[1]);
			return true;
		} else {
			return false;
		}
	}

	serializeToParsingForm(): string {
		return `PromoteTo=${this.promotionPieces.join("")}`;
	}

	isDisabled(): boolean {
		return false;
	}

	initDecoratorSettings(): void {
		if (this.decorator.hooks.usePawnLogic) {
			this.decorator.hooks.usePawnLogic.promotionPieces = this.promotionPieces;
		}

		for (const decorator of this.wrappingDecorators) decorator.initDecoratorSettings?.();
	}
}
