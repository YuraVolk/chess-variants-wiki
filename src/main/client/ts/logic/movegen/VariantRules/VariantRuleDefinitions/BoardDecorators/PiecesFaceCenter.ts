import type { BoardSquares } from "@client/ts/logic/BaseInterfaces";
import { Board } from "../../../Board/Board";
import { DisplaySettings } from "../../../Board/BoardInterface";
import { VariantRule } from "../../VariantRule";
import { VariantRuleHandler, variantRuleColors } from "../../VariantRuleInterface";
import { chessGlyphIndex } from "@client/fonts/chessGlyphIndex";

const tag = "piecesFaceCenter";
export class PiecesFaceCenter extends VariantRule<typeof Board, typeof tag> implements VariantRuleHandler<Board> {
	static {
		VariantRule.initVariantRule(PiecesFaceCenter);
	}

	getDecoratorType() {
		return Board;
	}
	getPublicProperties() {
		return {
			parameterValue: true,
			information: {
				name: "Pieces Face Center",
				description: "Pieces are rotated to face center",
				tag,
				color: variantRuleColors.visual,
				displayIcon: chessGlyphIndex.pawn3dLarge
			}
		} as const;
	}
	matchesPGNDeclaration(match: string): boolean {
		return /^PiecesFaceCenter$/i.test(match);
	}
	serializeToParsingForm(): string {
		return "PiecesFaceCenter";
	}
	isDisabled(): boolean {
		return false;
	}

	getSquareVisibility(): BoardSquares<DisplaySettings[]> {
		const squareVisibility: BoardSquares<DisplaySettings[]> = this.callHandler("getSquareVisibility", arguments);
		return squareVisibility.map((r, i) =>
			r.map((v, j) => {
				if (!this.decorator.board[i][j].isPiece()) {
					return v;
				} else {
					return [...v, DisplaySettings.PieceFacesCenter];
				}
			})
		);
	}
}
