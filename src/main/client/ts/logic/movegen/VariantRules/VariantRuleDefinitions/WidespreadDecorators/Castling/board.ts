import type { VariantRuleHandler } from "@moveGeneration/VariantRules/VariantRuleInterface";
import { Castling } from ".";
import { Board } from "@moveGeneration/Board/Board";
import { VariantRule } from "@moveGeneration/VariantRules/VariantRule";
import type { SpecialMoveGenerationSettings } from "@moveGeneration/Board/BoardInterface";
import { MoveData, SpecialMove } from "@moveGeneration/MoveTree/MoveTreeInterface";
import type { NumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { getVerticalPlacementModulus, isVerticalPlacement } from "@client/ts/logic/BaseInterfaces";

export class BoardCastling extends Castling<typeof Board> implements VariantRuleHandler<Board> {
	static {
		VariantRule.initVariantRule(BoardCastling);
	}

	getDecoratorType() {
		return Board;
	}

	private isCastlingAvailable(player: NumericColor, board: Board, checks: number[]): boolean {
		const royal = this.decorator.data.fenOptions.tag("royal")[player];
		if (royal === null) return false;

		const royalCoordinate = royal[getVerticalPlacementModulus(player)];
		const squares = board.board;

		for (const checkSquare of checks) {
			const coordinateA = isVerticalPlacement(player) ? royalCoordinate : checkSquare;
			const coordinateB = isVerticalPlacement(player) ? checkSquare : royalCoordinate;
			if (
				!squares[coordinateA][coordinateB].isEmpty() ||
				board.preGeneratedAttacks[player].hoppingPieces[coordinateA][coordinateB] > 0 ||
				board.preGeneratedAttacks[player].slidingPieces[coordinateA][coordinateB] > 0
			)
				return false;
		}

		if (board.isKingInCheck(player)) return false;
		return true;
	}

	private isKingsideCastlingAvailable(player: NumericColor): boolean {
		if (!this.decorator.data.fenOptions.tag("castleKingside")[player]) return false;
		if (this.decorator.data.fenOptions.castlingKingsideData[player].endCoordinates === -1) return false;
		return this.isCastlingAvailable(player, this.decorator, this.decorator.data.fenOptions.castlingKingsideData[player].checkSquares);
	}

	private isQueensideCastlingAvailable(player: NumericColor): boolean {
		if (!this.decorator.data.fenOptions.tag("castleQueenside")[player]) return false;
		if (this.decorator.data.fenOptions.castlingQueensideData[player].endCoordinates === -1) return false;
		return this.isCastlingAvailable(player, this.decorator, this.decorator.data.fenOptions.castlingQueensideData[player].checkSquares);
	}

	getSpecialMoves(parameters: SpecialMoveGenerationSettings): MoveData[] {
		const { i, j, baseColor } = parameters;
		const specialMoves: MoveData[] = [];
		const royal = this.decorator.data.fenOptions.tag("royal")[baseColor];

		if (royal && royal[0] === i && royal[1] === j) {
			const fenOptions = this.decorator.data.fenOptions;
			if (this.isKingsideCastlingAvailable(baseColor)) {
				specialMoves.push({
					startCoordinates: [i, j],
					endCoordinates: this.getCastlingEndCoordinate(
						fenOptions,
						baseColor,
						fenOptions.castlingKingsideData[baseColor].endCoordinates
					),
					specialType: SpecialMove.CastlingKingside
				});
			}

			if (this.isQueensideCastlingAvailable(baseColor)) {
				specialMoves.push({
					startCoordinates: [i, j],
					endCoordinates: this.getCastlingEndCoordinate(
						fenOptions,
						baseColor,
						fenOptions.castlingQueensideData[baseColor].endCoordinates
					),
					specialType: SpecialMove.CastlingQueenside
				});
			}
		}

		return [...specialMoves, ...this.callHandler("getSpecialMoves", arguments)];
	}
}
