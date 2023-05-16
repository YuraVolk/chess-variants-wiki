import { Board } from "../../../Board/Board";
import { DroppingMove, getLatestChainedMoves, MoveData } from "../../../MoveTree/MoveTreeInterface";
import { VariantRule } from "../../VariantRule";
import { VariantRuleAllowedChecks, variantRuleColors, VariantRuleHandler } from "../../VariantRuleInterface";
import { CaptureTheKing } from "./CaptureTheKing";
import { duckPieceString } from "../../../GameInformation/GameUnits/PieceString";
import { boardDimension } from "../../../GameInformation/GameData";
import { Coordinate, nonPlayablePieces } from "../../../GameInformation/GameUnits/GameUnits";
import { chessGlyphIndex } from "@client/fonts/chessGlyphIndex";

const tag = "duckChess";
export class DuckChess extends VariantRule<typeof Board, typeof tag> implements VariantRuleHandler<Board> {
	static {
		VariantRule.initVariantRule(DuckChess);
	}
	readonly dependencies = new Map([[CaptureTheKing, []]]);

	getDecoratorType() {
		return Board;
	}

	getPublicProperties() {
		return {
			parameterValue: true,
			information: {
				name: "Duck Chess",
				description: "The duck must be moved to an empty square after every move",
				tag,
				color: variantRuleColors.extending,
				displayIcon: chessGlyphIndex.duck
			}
		} as const;
	}

	matchesPGNDeclaration(match: string): boolean {
		return /^DuckChess$/i.test(match);
	}

	serializeToParsingForm(): string {
		return "DuckChess";
	}

	isDisabled({ variantDataRules }: VariantRuleAllowedChecks): boolean {
		return variantDataRules.taboo;
	}

	getLegalMoves(i: number, j: number): MoveData[] {
		const moves = this.callHandler("getLegalMoves", arguments);
		const latestMoves = getLatestChainedMoves(moves);

		const ducks: Coordinate[] = [],
			emptySquares: Coordinate[] = [];
		for (let i = 0; i < boardDimension; i++) {
			for (let j = 0; j < boardDimension; j++) {
				const pieceString = this.decorator.board[i][j];
				if (pieceString.isWall() && pieceString.piece === nonPlayablePieces.duck) {
					ducks.push([i, j]);
				} else if (pieceString.isEmpty()) {
					emptySquares.push([i, j]);
				}
			}
		}

		const droppingChainedMoves: DroppingMove[] = [];
		const duckChainedMoves: MoveData[] = [];
		if (ducks.length === 0) {
			for (const emptySquare of emptySquares) {
				droppingChainedMoves.push({ piece: duckPieceString, endCoordinates: emptySquare });
			}
			droppingChainedMoves.push({ piece: duckPieceString, endCoordinates: [i, j] });
		} else {
			for (const duck of ducks) {
				for (const emptySquare of emptySquares) {
					duckChainedMoves.push({ startCoordinates: duck, endCoordinates: emptySquare });
				}
				duckChainedMoves.push({ startCoordinates: duck, endCoordinates: [i, j] });
			}
		}

		for (const move of latestMoves) {
			move.nextChainedMoves = droppingChainedMoves.length > 0 ? droppingChainedMoves : duckChainedMoves;
		}

		return moves;
	}
}
