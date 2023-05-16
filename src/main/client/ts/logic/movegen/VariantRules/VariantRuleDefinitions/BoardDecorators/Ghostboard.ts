import { chessGlyphIndex } from "@client/fonts/chessGlyphIndex";
import type { BoardSquares } from "../../../../BaseInterfaces";
import { Board } from "../../../Board/Board";
import { DisplaySettings } from "../../../Board/BoardInterface";
import { VariantRule } from "../../VariantRule";
import { variantRuleColors, VariantRuleHandler } from "../../VariantRuleInterface";

const tag = "ghostboard";
export class Ghostboard extends VariantRule<typeof Board, typeof tag> implements VariantRuleHandler<Board> {
	static {
		VariantRule.initVariantRule(Ghostboard);
	}

	getDecoratorType() {
		return Board;
	}

	getPublicProperties() {
		return {
			parameterValue: true,
			information: {
				name: "Ghostboard",
				description: "Board, clocks and players are invisible",
				tag,
				color: variantRuleColors.visual,
				displayIcon: chessGlyphIndex.crossedBinoculars
			}
		} as const;
	}

	matchesPGNDeclaration(match: string): boolean {
		return /^Ghostboard$/i.test(match);
	}

	serializeToParsingForm(): string {
		return "Ghostboard";
	}

	isDisabled(): boolean {
		return false;
	}

	getSquareVisibility(): BoardSquares<DisplaySettings[]> {
		const squareVisibility: BoardSquares<DisplaySettings[]> = this.callHandler("getSquareVisibility", arguments);
		return squareVisibility.map((r) => r.map((v) => [...v, DisplaySettings.Ghosted]));
	}
}
