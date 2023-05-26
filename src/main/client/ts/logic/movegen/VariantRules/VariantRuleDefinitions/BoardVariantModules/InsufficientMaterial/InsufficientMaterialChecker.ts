import { Board } from "@moveGeneration/Board/Board";
import { InsufficientMaterialConstructor, InsufficientMaterialState } from "./InsufficientMaterialConstructor";
import { Tuple, assertNonUndefined, createTuple, createTupleFromCallback } from "@client/ts/baseTypes";
import { colors, totalPlayers } from "@moveGeneration/GameInformation/GameData";
import { Coordinate, NumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { stalemateOptionsValues } from "../../FENDataDecorators/StalemateOptions";
import { grasshopperPieceLetter, pieceControlConfigSettings, verifyPieceLetter } from "@moveGeneration/PieceControl/PieceControlInterface";
import { disabledRank } from "../../PieceControlDecorators/PromotionRank";
import { compareCoordinates } from "@moveGeneration/Board/BoardInterface";
import { createPieceFromData } from "@moveGeneration/GameInformation/GameUnits/PieceString";

export class InsufficientMaterialChecker {
	private readonly noRoyalsToMate: boolean = false;
	private readonly isDisabled: boolean = false;
	private readonly promotionPieces;
	private readonly hasPromotion;

	constructor(readonly state: InsufficientMaterialState, board: Board) {
		for (const variantRule of board.variantRules) {
			const { isDisabled, isPartiallyDisabled } = variantRule.getInsufficientMaterialData();
			if (isDisabled) {
				this.isDisabled = true;
				break;
			} else if (isPartiallyDisabled) this.noRoyalsToMate = true;
		}
		this.hasPromotion = board.variantData.promotionRank !== disabledRank;
		this.promotionPieces = board.variantData.promotionPieces || [];
	}

	private getRoyalPieceMedians(board: Board) {
		const { walls, royalMoveMedians } = this.state,
			royal = board.data.fenOptions.tag("royal"),
			variantData = board.variantData,
			boardSquares = board.board;
		const extraWalls = boardSquares.reduce((accumulator, row, i) => {
			return (
				accumulator +
				row.reduce((accumulator, square, j) => {
					if (square.isWall() && !walls[i][j]) {
						return accumulator + 1;
					} else return accumulator;
				}, 0)
			);
		}, 0);

		return royalMoveMedians.map((median, i) => {
			if (!royal[i]) return;

			let minimumMedian: number;
			if (variantData.stalemateOptions === stalemateOptionsValues.stalemateLoses) {
				minimumMedian = 1;
				median--;
			} else {
				median++;
				minimumMedian = 2;
			}

			median -= extraWalls;
			if (median < minimumMedian) median = minimumMedian;

			return median;
		});
	}

	private obtainPieceSymbolFromCoordinate(board: Board, coordinate: Coordinate) {
		const { optimizedPieces, pieceSquareMedians, backwardsPieceRegistry } = this.state;
		const piece = board.board[coordinate[0]][coordinate[1]];
		try {
			if (pieceControlConfigSettings[piece.piece].moveGenerationSettings.isPawn && this.hasPromotion) {
				const availableSymbols = [...optimizedPieces]
					.filter((p) => verifyPieceLetter(p) && !pieceControlConfigSettings[p].moveGenerationSettings.isPawn)
					.map((p) => pieceSquareMedians[p]);
				if (availableSymbols.length === 0) {
					return { selectedSymbol: InsufficientMaterialConstructor.NON_INDEXED_PIECE_SYMBOL, piece };
				} else {
					const candidates = availableSymbols.map((s) => {
						return s[Object.getOwnPropertySymbols(s)[0]].reduce<number>((p, n) => p + (n ?? 0), 0);
					});
					const candidateIndex = candidates.indexOf(Math.max(...candidates));
					const symbol = Object.getOwnPropertySymbols(availableSymbols[candidateIndex])[0];
					return {
						selectedSymbol: symbol,
						piece
					};
				}
			} else {
				const availableSymbols = Object.getOwnPropertySymbols(pieceSquareMedians[piece.piece]);
				const selectedSymbol =
					availableSymbols.length === 1 ? availableSymbols[0] : backwardsPieceRegistry[piece.piece][coordinate[0]][coordinate[1]];
				assertNonUndefined(selectedSymbol);

				return { selectedSymbol, piece };
			}
		} catch {
			return {
				selectedSymbol: InsufficientMaterialConstructor.NON_INDEXED_PIECE_SYMBOL,
				piece: createPieceFromData(piece.color, grasshopperPieceLetter)
			};
		}
	}

	private getPartialIntersection(parameters: {
		board: Board;
		army: Coordinate[];
		pieces: Tuple<Coordinate[], typeof totalPlayers>;
		royalColor: NumericColor;
	}) {
		const { pieceSquareMedians } = this.state,
			{ board, army, pieces, royalColor } = parameters;
		for (const coordinate of army) {
			const { piece, selectedSymbol } = this.obtainPieceSymbolFromCoordinate(board, coordinate);
			const symbolsLength = Object.getOwnPropertySymbols(pieceSquareMedians[piece.piece]).length;
			if (symbolsLength > 1 || pieceControlConfigSettings[piece.piece].moveGenerationSettings.isColorBound) {
				for (const enemyCoordinate of pieces[royalColor]) {
					const { selectedSymbol: enemySymbol } = this.obtainPieceSymbolFromCoordinate(board, enemyCoordinate);
					if (selectedSymbol === enemySymbol) return Infinity;
				}
			} else return Infinity;
		}

		return -1;
	}

	checkCurrentState(board: Board) {
		const fenOptions = board.data.fenOptions;
		const dead = fenOptions.tag("dead"),
			royal = fenOptions.tag("royal");
		const pieces = board.getPlayerPieces(),
			resultingInsufficientPieces = createTuple(false, totalPlayers);
		if (this.isDisabled) return resultingInsufficientPieces;

		const royalPieceMedians = this.getRoyalPieceMedians(board),
			{ oppositionMedians, pieceSquareMedians } = this.state;
		const squaresPlayerCanOutrange = createTupleFromCallback(() => createTuple(0, totalPlayers), totalPlayers);
		for (const color of colors) {
			const army = pieces[color];
			if (dead[color]) continue;
			for (const royalColor of colors) {
				if (color === royalColor || dead[royalColor]) continue;
				if (!royal[royalColor] || this.noRoyalsToMate) {
					squaresPlayerCanOutrange[royalColor][color] = this.getPartialIntersection({ board, army, pieces, royalColor });
				} else {
					const royalSquares = royalPieceMedians[royalColor];
					if (royalSquares === undefined) continue;
					const fenRoyal = royal[color],
						currentColorBounds: symbol[] = [];
					for (const coordinate of army) {
						if (fenRoyal && compareCoordinates(coordinate, fenRoyal)) {
							if (board.variantData.royalsCannotCapture) {
								squaresPlayerCanOutrange[color][royalColor]++;
							} else {
								squaresPlayerCanOutrange[color][royalColor] += oppositionMedians[color][royalColor];
							}
						} else {
							const { piece, selectedSymbol } = this.obtainPieceSymbolFromCoordinate(board, coordinate);
							if (this.hasPromotion && pieceControlConfigSettings[piece.piece].moveGenerationSettings.isPawn) {
								const medians = this.promotionPieces.map((piece) => {
									const subSymbol = Object.getOwnPropertySymbols(pieceSquareMedians[piece])[0];
									return pieceSquareMedians[piece][subSymbol][royalColor] ?? 0;
								});

								squaresPlayerCanOutrange[color][royalColor] += Math.max(...medians);
							} else {
								if (pieceControlConfigSettings[piece.piece].moveGenerationSettings.isColorBound) {
									if (currentColorBounds.includes(selectedSymbol)) continue;
									currentColorBounds.push(selectedSymbol);
								}

								squaresPlayerCanOutrange[color][royalColor] += pieceSquareMedians[piece.piece][selectedSymbol][royalColor] ?? 0;
							}
						}
					}

					squaresPlayerCanOutrange[color][royalColor] += pieces[royalColor].length - 1;
				}
			}
		}

		for (const color of colors) {
			if (dead[color]) continue;
			let sum = 0;
			for (let i = 0; i < totalPlayers; i++) {
				if (i === color) continue;
				sum += squaresPlayerCanOutrange[i][color];
			}

			const royal = royalPieceMedians[color];
			if ((royal !== undefined && sum <= royal) || sum < 0) resultingInsufficientPieces[color] = true;
		}
		return resultingInsufficientPieces;
	}
}
