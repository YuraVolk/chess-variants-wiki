import type { BoardSquares } from "@client/ts/logic/BaseInterfaces";
import { Board } from "../../../Board/Board";
import { DisplaySettings } from "../../../Board/BoardInterface";
import { VariantRule } from "../../VariantRule";
import { VariantRuleAllowedChecks, variantRuleColors, VariantRuleHandler } from "../../VariantRuleInterface";
import { chessGlyphIndex } from "@client/fonts/chessGlyphIndex";

const tag = "blindfold";
export class Blindfold extends VariantRule<typeof Board, typeof tag> implements VariantRuleHandler<Board> {
	static {
		VariantRule.initVariantRule(Blindfold);
	}

	getDecoratorType() {
		return Board;
	}

	getPublicProperties() {
		return {
			parameterValue: true,
			information: {
				name: "Blindfold",
				description: "Pieces are invisible",
				tag,
				color: variantRuleColors.visual,
				displayIcon: chessGlyphIndex.blindfold
			}
		} as const;
	}

	matchesPGNDeclaration(match: string): boolean {
		return /^Blindfold$/i.test(match);
	}

	serializeToParsingForm(): string {
		return "Blindfold";
	}

	isDisabled({ variantDataRules }: VariantRuleAllowedChecks): boolean {
		return variantDataRules.fogOfWar;
	}

	getSquareVisibility(): BoardSquares<DisplaySettings[]> {
		const squareVisibility: BoardSquares<DisplaySettings[]> = this.callHandler("getSquareVisibility", arguments);
		return squareVisibility.map((r, i) =>
			r.map((v, j) => {
				if (this.decorator.board[i][j].isWall()) {
					return v;
				} else {
					return [...v, DisplaySettings.Blindfolded];
				}
			})
		);
	}
}
