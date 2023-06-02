import { FENData } from "@moveGeneration/FENData/FENData";
import { Castling } from ".";
import type { VariantRuleHandler } from "@moveGeneration/VariantRules/VariantRuleInterface";
import { VariantRule } from "@moveGeneration/VariantRules/VariantRule";
import type { Board } from "@moveGeneration/Board/Board";
import { Tuple, createTupleFromCallback } from "@client/ts/baseTypes";
import { boardDimension, colors, totalPlayers } from "@moveGeneration/GameInformation/GameData";
import { getVerticalPlacementModulus, getHorizontalPlacementModulus, isVerticalPlacement } from "@client/ts/logic/BaseInterfaces";
import { MoveData, SpecialMove } from "@moveGeneration/MoveTree/MoveTreeInterface";
import { PieceString, emptyPieceString } from "@moveGeneration/GameInformation/GameUnits/PieceString";
import { compareCoordinates } from "@moveGeneration/Board/BoardInterface";
import type { Coordinate, NumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";

export interface CastlingData {
	endCoordinates: number;
	pieceCoordinates: number;
	pieceEndCoordinates: number;
	checkSquares: number[];
}

export class FENDataCastling extends Castling<typeof FENData> implements VariantRuleHandler<FENData> {
	static {
		VariantRule.initVariantRule(FENDataCastling);
	}

	private castlingKingsideData: Tuple<CastlingData, typeof totalPlayers> = createTupleFromCallback(
		() => ({ endCoordinates: -1, pieceCoordinates: -1, pieceEndCoordinates: -1, checkSquares: [] }),
		totalPlayers
	);
	private castlingQueensideData: Tuple<CastlingData, typeof totalPlayers> = createTupleFromCallback(
		() => ({ endCoordinates: -1, pieceCoordinates: -1, pieceEndCoordinates: -1, checkSquares: [] }),
		totalPlayers
	);

	getDecoratorType() {
		return FENData;
	}

	private extractDimensions(): Tuple<number, typeof totalPlayers> {
		let [dimensionRY, dimensionBG] = this.decorator.fenOptions.tag("dim");
		if (!this.decorator.fenOptions.tag("noCorners")) {
			if (dimensionRY > 8) dimensionRY = 8;
			if (dimensionBG > 8) dimensionBG = 8;
		}
		return [dimensionRY, dimensionBG, dimensionRY, dimensionBG];
	}

	injectBoard(board: Board): void {
		const dimensions = this.extractDimensions();
		const royalRanks = this.decorator.fenOptions.tag("royal").map((r, i) => (r ? r[getVerticalPlacementModulus(i)] : r));
		const royalCoordinates = this.decorator.fenOptions.tag("royal").map((r, i) => (r ? r[getHorizontalPlacementModulus(i)] : r));
		const kingsideCastlePieceCoordinate: number[] = [],
			queensideCastlePieceCoordinate: number[] = [];

		const boardSquares = board.board,
			castleWith = this.decorator.fenOptions.tag("castleWith");
		for (let i = 0; i < totalPlayers; i++) {
			const royalCoordinateI = royalCoordinates[i];
			const royalRanksI = royalRanks[i];
			if (royalCoordinateI === null || royalRanksI === null) {
				kingsideCastlePieceCoordinate.push(-1);
				queensideCastlePieceCoordinate.push(-1);
				continue;
			}

			const condition = i % 2 === 0;
			for (let j = royalCoordinateI; j < boardDimension; j++) {
				const pieceString = boardSquares[condition ? royalRanksI : j][condition ? j : royalRanksI];
				if (!pieceString.isEmpty() && pieceString.piece === castleWith) {
					kingsideCastlePieceCoordinate.push(j);
					break;
				} else if (j === boardDimension - 1) {
					kingsideCastlePieceCoordinate.push(-1);
				}
			}

			for (let j = royalCoordinateI; j > -1; j--) {
				const pieceString = boardSquares[condition ? royalRanksI : j][condition ? j : royalRanksI];
				if (!pieceString.isEmpty() && pieceString.piece === castleWith) {
					queensideCastlePieceCoordinate.push(j);
					break;
				} else if (j === 0) {
					queensideCastlePieceCoordinate.push(-1);
				}
			}
		}

		for (let i = 0; i < totalPlayers; i++) {
			const royalCoordinate = royalCoordinates[i];
			if (royalCoordinate === null) continue;

			try {
				if (kingsideCastlePieceCoordinate[i] === -1) {
					this.decorator.fenOptions.tag("castleKingside")[i] = false;
				} else {
					const d = this.castlingDisplacement[i][0] || dimensions[i] - 6 < 1 ? 1 : dimensions[i] - 6;
					const kArr = [...Array(d).keys()];
					const endCoordinates = royalCoordinate + d;
					const castlingData = {
						endCoordinates,
						checkSquares: kArr.map((j) => j + royalCoordinate + 1),
						pieceCoordinates: kingsideCastlePieceCoordinate[i],
						pieceEndCoordinates: endCoordinates - 1
					};
					if (royalCoordinate <= 6) {
						this.castlingQueensideData[i] = castlingData;
						this.decorator.fenOptions.castlingQueensideData[i] = castlingData;
					} else {
						this.castlingKingsideData[i] = castlingData;
						this.decorator.fenOptions.castlingKingsideData[i] = castlingData;
					}
				}
			} catch {
				this.decorator.fenOptions.tag("castleKingside")[i] = false;
			}

			try {
				if (queensideCastlePieceCoordinate[i] === -1) {
					this.decorator.fenOptions.tag("castleQueenside")[i] = false;
				} else {
					const d = this.castlingDisplacement[i][1] || dimensions[i] - 6 < 1 ? 1 : dimensions[i] - 6;
					const qArr = [...Array(d).keys()];
					const endCoordinates = royalCoordinate - d;
					const castlingData = {
						endCoordinates,
						checkSquares: royalCoordinate <= 6 ? qArr.map((j) => j + royalCoordinate - 2) : qArr.map((j) => j + royalCoordinate - 3),
						pieceCoordinates: queensideCastlePieceCoordinate[i],
						pieceEndCoordinates: endCoordinates + 1
					};
					if (royalCoordinate <= 6) {
						this.castlingKingsideData[i] = castlingData;
						this.decorator.fenOptions.castlingKingsideData[i] = castlingData;
					} else {
						this.castlingQueensideData[i] = castlingData;
						this.decorator.fenOptions.castlingQueensideData[i] = castlingData;
					}
				}
			} catch {
				this.decorator.fenOptions.tag("castleQueenside")[i] = false;
			}
		}

		for (const decorator of this.wrappingDecorators) decorator.injectBoard?.(board);
	}

	private getKingsideCastlingPieceEndCoordinate(player: NumericColor): [number, number] {
		return this.getCastlingEndCoordinate(this.decorator.fenOptions, player, this.castlingKingsideData[player].pieceEndCoordinates);
	}

	private getQueensideCastlingPieceEndCoordinate(player: NumericColor): [number, number] {
		return this.getCastlingEndCoordinate(this.decorator.fenOptions, player, this.castlingQueensideData[player].pieceEndCoordinates);
	}

	private getKingsideCastlingTandemPiece(player: NumericColor) {
		return this.castlingKingsideData[player].pieceCoordinates;
	}

	private getQueensideCastlingTandemPiece(player: NumericColor) {
		return this.castlingQueensideData[player].pieceCoordinates;
	}

	private getCastlingPieceEndCoordinates(coordinates: Coordinate, color: NumericColor): [Coordinate, Coordinate] {
		return [
			isVerticalPlacement(color)
				? [coordinates[0], this.getKingsideCastlingTandemPiece(color)]
				: [this.getKingsideCastlingTandemPiece(color), coordinates[1]],
			isVerticalPlacement(color)
				? [coordinates[0], this.getQueensideCastlingTandemPiece(color)]
				: [this.getQueensideCastlingTandemPiece(color), coordinates[1]]
		];
	}

	processStandardMove(moveData: MoveData): { endPiece: PieceString[] } {
		const returnType = this.callHandler("processStandardMove", arguments);
		const {
			fenOptions,
			sideToMove,
			board: { board }
		} = this.decorator;
		const {
			startCoordinates: [startI, startJ],
			endCoordinates: [endI, endJ]
		} = moveData;

		const [kingsidePiece, queensidePiece] = this.getCastlingPieceEndCoordinates(moveData.startCoordinates, sideToMove);
		switch (moveData.specialType) {
			case SpecialMove.CastlingKingside: {
				const secondKPiece = isVerticalPlacement(sideToMove)
					? board[startI][this.getKingsideCastlingTandemPiece(sideToMove)]
					: board[this.getKingsideCastlingTandemPiece(sideToMove)][startJ];
				const [kI, kJ] = this.getKingsideCastlingPieceEndCoordinate(sideToMove);

				board[kI][kJ] = secondKPiece;
				board[kingsidePiece[0]][kingsidePiece[1]] = emptyPieceString;
				break;
			}
			case SpecialMove.CastlingQueenside: {
				const secondQPiece = isVerticalPlacement(sideToMove)
					? board[startI][this.getQueensideCastlingTandemPiece(sideToMove)]
					: board[this.getQueensideCastlingTandemPiece(sideToMove)][startJ];
				const [qI, qJ] = this.getQueensideCastlingPieceEndCoordinate(sideToMove);
				board[qI][qJ] = secondQPiece;
				board[queensidePiece[0]][queensidePiece[1]] = emptyPieceString;
				break;
			}
		}

		const castleKingside = fenOptions.tag("castleKingside"),
			castleQueenside = fenOptions.tag("castleQueenside");
		fenOptions.tag("royal").forEach((royal, color) => {
			if (royal && royal[0] === endI && royal[1] === endJ) castleKingside[color] = castleQueenside[color] = false;
		});

		for (const color of colors) {
			const royalPiece = fenOptions.tag("royal")[color];
			if (!royalPiece) continue;
			if (compareCoordinates(royalPiece, moveData.startCoordinates)) {
				castleKingside[color] = false;
				castleQueenside[color] = false;
				break;
			} else if (compareCoordinates(kingsidePiece, moveData.startCoordinates)) {
				castleKingside[color] = false;
				break;
			} else if (compareCoordinates(queensidePiece, moveData.startCoordinates)) {
				castleQueenside[color] = false;
				break;
			}
		}

		return returnType;
	}
}
