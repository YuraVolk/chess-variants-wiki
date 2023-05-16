import { chessGlyphIndex } from "@client/fonts/chessGlyphIndex";
import { Board } from "../../../Board/Board";
import { VariantRule } from "../../VariantRule";
import { VariantRuleAllowedChecks, variantRuleColors, VariantRuleHandler } from "../../VariantRuleInterface";

const tag = "captureTheKing";
export class CaptureTheKing extends VariantRule<typeof Board, typeof tag> implements VariantRuleHandler<Board> {
	static {
		VariantRule.initVariantRule(CaptureTheKing);
	}

	getDecoratorType() {
		return Board;
	}

	getPublicProperties() {
		return {
			parameterValue: true,
			information: {
				name: "Capture the King",
				description: "To checkmate, kings must be captured",
				tag,
				color: variantRuleColors.minor,
				displayIcon: chessGlyphIndex.king
			}
		} as const;
	}

	matchesPGNDeclaration(match: string): boolean {
		return /^CaptureTheKing$/i.test(match);
	}

	serializeToParsingForm(): string {
		return "CaptureTheKing";
	}

	isDisabled({ variantDataRules }: VariantRuleAllowedChecks): boolean {
		return variantDataRules.giveaway || variantDataRules.taboo;
	}

	getInsufficientMaterialData() {
		return {
			isPartiallyDisabled: true,
			isDisabled: false
		} as const;
	}

	isKingInCheck(): boolean {
		return false;
	}

	isTheMoveLegal(): boolean {
		return true;
	}
}
