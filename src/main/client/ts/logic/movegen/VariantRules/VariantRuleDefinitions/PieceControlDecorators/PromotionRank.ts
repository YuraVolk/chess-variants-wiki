import { formatOrdinalNumber } from "@client/ts/utils/StringFormatUtils";
import { boardDimension } from "../../../GameInformation/GameData";
import { PieceControl } from "../../../PieceControl/PieceControl";
import { VariantRule } from "../../VariantRule";
import type { VariantRuleHandler } from "../../VariantRuleInterface";

const tag = "promotionRank";
export const disabledRank = 99;
export class PromotionRank extends VariantRule<typeof PieceControl, typeof tag> implements VariantRuleHandler<PieceControl> {
	static {
		VariantRule.initVariantRule(PromotionRank);
	}

	private promotionRank: number;
	constructor(promotionRank?: unknown) {
		super();
		this.promotionRank = typeof promotionRank === "number" ? promotionRank : 8;
	}

	getDecoratorType() {
		return PieceControl;
	}

	getPublicProperties() {
		return {
			parameterValue: this.promotionRank,
			information: {
				name: "Promotion Rank",
				textualForm: "",
				description: `on the ${this.promotionRank}${formatOrdinalNumber(this.promotionRank)} rank`,
				tag
			}
		} as const;
	}

	matchesPGNDeclaration(match: string): boolean {
		const matchArray = match.match(/^Prom=(\d\d?)$/i);
		if (matchArray) {
			this.promotionRank = Number(matchArray[1]);
			return true;
		} else {
			return false;
		}
	}

	serializeToParsingForm(): string {
		return `Prom=${this.promotionRank}`;
	}

	isDisabled(): boolean {
		return false;
	}

	getParametrizedOptions() {
		const resultingMap = new Map<string, number>();
		for (let i = 1; i <= boardDimension; i++) {
			resultingMap.set(String(i) + formatOrdinalNumber(i), i);
		}
		resultingMap.set("No promotion", disabledRank);
		return resultingMap;
	}

	initDecoratorSettings(): void {
		if (this.decorator.hooks.usePawnLogic) {
			this.decorator.hooks.usePawnLogic.promotionRanks = [
				boardDimension - this.promotionRank,
				this.promotionRank - 1,
				this.promotionRank - 1,
				boardDimension - this.promotionRank
			];
		}

		for (const decorator of this.wrappingDecorators) decorator.initDecoratorSettings?.();
	}
}
