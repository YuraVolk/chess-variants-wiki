import { Tuple, createTuple, createTupleFromCallback } from "@client/ts/baseTypes";
import { BoardSquares, initializeBoardSquares } from "@client/ts/logic/BaseInterfaces";
import { Board, baseImmunes } from "@moveGeneration/Board/Board";
import { boardDimension, colors, totalPlayers } from "@moveGeneration/GameInformation/GameData";
import { PieceString, createPieceFromData, emptyPieceString } from "@moveGeneration/GameInformation/GameUnits/PieceString";
import {
	PieceLetter,
	defaultPieces,
	grasshopperPieceLetter,
	pieceControlConfigSettings,
	verifyPieceLetter
} from "@moveGeneration/PieceControl/PieceControlInterface";
import { binaryMasks, findMinimumOnBoardSquares, oneBitMask, optimizePieceSet } from "./Utilities";
import { disabledRank } from "../../PieceControlDecorators/PromotionRank";
import { stringifyCoordinate } from "@moveGeneration/Board/BoardInterface";
import { bitCount } from "@utils/NumberUtils";
import { PieceMedianCounterReturnType } from "./PieceMedianCounter";

export interface InsufficientMaterialState {
	readonly walls: BoardSquares<boolean>;
	readonly backwardsPieceRegistry: Record<PieceLetter, BoardSquares<symbol | null>>;
	readonly pieceSquareMedians: Record<PieceLetter, Record<symbol, Tuple<number | undefined, typeof totalPlayers>>>;
	readonly royalMoveMedians: Tuple<number, typeof totalPlayers>;
	readonly optimizedPieces: Set<PieceLetter>;
	oppositionMedians: Tuple<Tuple<number, typeof totalPlayers>, typeof totalPlayers>;
}

export class InsufficientMaterialConstructor {
	static readonly NON_INDEXED_PIECE_SYMBOL = Symbol();
	private readonly board: Board;
	private readonly emptyBoard: BoardSquares<PieceString>;
	private readonly pieceMoveRegistry: Record<PieceLetter, Record<symbol, BoardSquares<Uint16Array>>> = {};
	private readonly possibleRoyals = createTupleFromCallback<string[], typeof totalPlayers>(() => [], totalPlayers);
	private readonly boardDestinations = new Map<PieceLetter, Uint16Array[]>();
	private readonly royalPieceSets = createTupleFromCallback(() => new Set<string>(), totalPlayers);
	readonly state: InsufficientMaterialState;

	constructor(board: Board, readonly callback: (state: InsufficientMaterialState) => void) {
		this.board = board.createClone();
		this.emptyBoard = this.board.board.map((row) => row.map((square) => (square.isWall() ? square : emptyPieceString)));
		this.state = {
			walls: this.emptyBoard.map((row) => row.map((square) => square.isWall())),
			backwardsPieceRegistry: {},
			royalMoveMedians: createTuple(0, totalPlayers),
			pieceSquareMedians: {
				[grasshopperPieceLetter]: {
					[InsufficientMaterialConstructor.NON_INDEXED_PIECE_SYMBOL]: [2, 2, 2, 2]
				}
			},
			optimizedPieces: optimizePieceSet(this.board.variantData.promotionPieces || [], true),
			oppositionMedians: createTupleFromCallback(() => createTuple(0, totalPlayers), totalPlayers)
		};
	}

	private initializeRoyals() {
		const boardSquares = this.board.board,
			promotionPieces = this.board.variantData.promotionPieces || [];
		this.board.data.fenOptions.tag("royal").forEach((royal, color) => {
			if (royal) {
				const piece = boardSquares[royal[0]][royal[1]].piece;
				if (pieceControlConfigSettings[piece].moveGenerationSettings.isPawn) {
					this.possibleRoyals[color] = [piece, ...promotionPieces];
				} else this.possibleRoyals[color] = [piece];
			} else if (promotionPieces.includes(defaultPieces.king)) {
				this.possibleRoyals[color] = [defaultPieces.king];
			}
		});

		for (const color of colors) {
			if (this.possibleRoyals[color].length > 1) {
				this.royalPieceSets[color] = optimizePieceSet(this.possibleRoyals[color], false);
			} else if (this.possibleRoyals[color].length === 1) {
				this.royalPieceSets[color].add(this.possibleRoyals[color][0]);
			}
		}
	}

	private recurseThroughSquares(i: number, j: number, piece: PieceString) {
		const {
			emptyBoard,
			board: { controls },
			pieceMoveRegistry
		} = this;
		const currentSquares = new Set<string>(),
			unvisitedSquares = new Set<string>();
		if (!piece.isPiece()) throw new TypeError(`Wrong piece signature detected at ${piece.value}`);
		const baseBuilder = controls[piece.piece]().setColor(piece.color).setBoard(emptyBoard).setBaseImmunePieces(baseImmunes);
		const registryResult = initializeBoardSquares(() => new Uint16Array(boardDimension).fill(oneBitMask));

		function recurse(x: number, y: number) {
			const control = baseBuilder.setCoordinates(x, y).constructPieceControl();
			const moves = control.getPseudoLegalMoves(),
				moveLength = moves.length;
			if (moveLength === 0) return;

			for (let i = 0; i < moveLength; i++) {
				const move = moves[i].move;
				const moveString = stringifyCoordinate(move);
				registryResult[x][y][move[0]] |= binaryMasks[move[1]];
				if (!currentSquares.has(moveString)) {
					unvisitedSquares.add(moveString);
				}
			}

			for (const value of unvisitedSquares) {
				const [x, y] = value.split(":");
				if (!currentSquares.has(value)) {
					currentSquares.add(value);
					recurse(parseInt(x, 10), parseInt(y, 10));
				}
			}
		}
		recurse(i, j);
		if (!(piece.piece in pieceMoveRegistry)) pieceMoveRegistry[piece.piece] = {};
		pieceMoveRegistry[piece.piece][Symbol()] = registryResult;

		const permutations = new Uint16Array(14).fill(oneBitMask);
		currentSquares.forEach((value) => {
			const valueArr = value.split(":");
			permutations[parseInt(valueArr[0], 10)] |= binaryMasks[parseInt(valueArr[1], 10)];
		});
		unvisitedSquares.forEach((value) => {
			const valueArr = value.split(":");
			permutations[parseInt(valueArr[0], 10)] |= binaryMasks[parseInt(valueArr[1], 10)];
		});

		return permutations;
	}

	private addToBoardDestinations(i: number, j: number, piece: PieceString) {
		const permutations = this.recurseThroughSquares(i, j, piece);

		const boardPiece = this.boardDestinations.get(piece.piece);
		if (boardPiece) {
			this.boardDestinations.set(piece.piece, boardPiece.concat(permutations));
		} else {
			this.boardDestinations.set(piece.piece, [permutations]);
		}
	}

	private getBoardDestinations() {
		const boardSquares = this.board.board,
			promotionRank = this.board.variantData.promotionRank || disabledRank,
			promotionPieces = this.board.variantData.promotionPieces || [];
		for (let i = 0; i < boardDimension; i++) {
			for (let j = 0; j < boardDimension; j++) {
				if (boardSquares[i][j].isPiece()) this.addToBoardDestinations(i, j, boardSquares[i][j]);
			}
		}

		const hasPromotion = promotionRank !== disabledRank && promotionPieces.some((p) => verifyPieceLetter(p));
		const promotionRanks = [boardDimension - promotionRank, promotionRank - 1, promotionRank - 1, boardDimension - promotionRank];
		const optimizedPieces = optimizePieceSet(promotionPieces, true);
		if (hasPromotion) {
			for (let color of colors) {
				color &= 1;
				for (let x = 0; x < boardDimension; x++) {
					const [i, j] = [color ? promotionRanks[color] : x, color ? x : promotionRanks[color]];
					if (this.state.walls[i][j]) continue;
					for (const piece of optimizedPieces) {
						this.addToBoardDestinations(i, j, createPieceFromData(0, piece));
					}
				}
			}
		}
	}

	private initializeBackwardsPieceRegistry() {
		const entries = this.boardDestinations.entries(),
			{
				state: { backwardsPieceRegistry },
				pieceMoveRegistry
			} = this;
		for (const [entry, uintArray] of entries) {
			if (pieceControlConfigSettings[entry].moveGenerationSettings.isPawn || entry === grasshopperPieceLetter || !verifyPieceLetter(entry))
				continue;
			let isAlwaysIntersecting = true;
			const permutationArray: Array<number | Uint16Array> = [];

			for (const permutationEntry of uintArray) {
				if (permutationArray.length === 0) {
					permutationArray.push(permutationEntry);
				} else {
					const index = permutationArray.findIndex((uintArr) => {
						if (typeof uintArr !== "number") return uintArr.every((n, j) => n === permutationEntry[j]);
						return false;
					});
					if (~index) {
						permutationArray.push(index);
					} else {
						permutationArray.push(permutationEntry);
						isAlwaysIntersecting = false;
					}
				}
			}

			if (isAlwaysIntersecting) {
				pieceMoveRegistry[entry] = {
					[Symbol()]: pieceMoveRegistry[entry][Object.getOwnPropertySymbols(pieceMoveRegistry[entry])[0]]
				};
			} else {
				if (!(entry in backwardsPieceRegistry)) {
					backwardsPieceRegistry[entry] = initializeBoardSquares(() => null);
				}

				const remappedSymbols: Array<symbol | number> = [];
				for (const squares of permutationArray) {
					let remappedSymbol: symbol | undefined;
					if (typeof squares === "number") {
						remappedSymbols.push(squares);
						continue;
					}
					for (let i = 0; i < boardDimension; i++) {
						for (let j = 0; j < boardDimension; j++) {
							if ((squares[i] & binaryMasks[j]) ^ oneBitMask) {
								if (!remappedSymbol) {
									remappedSymbol = Symbol();
									remappedSymbols.push(remappedSymbol);
								}

								this.state.backwardsPieceRegistry[entry][i][j] ??= remappedSymbol;
							}
						}
					}
				}

				const uintValues = Object.getOwnPropertySymbols(pieceMoveRegistry[entry]).map((sym) => pieceMoveRegistry[entry][sym]);
				pieceMoveRegistry[entry] = {};
				for (let i = 0; i < uintValues.length; i++) {
					const remapped = remappedSymbols[i];
					if (typeof remapped === "number") continue;
					if (typeof remapped === "undefined") break;
					pieceMoveRegistry[entry][remapped] = uintValues[i];
				}
			}
		}
	}

	private generateOppositionSquares() {
		const boardSquares = this.board.board,
			controls = this.board.controls,
			{ emptyBoard } = this;
		const royalMoves = createTuple<BoardSquares<Uint16Array>, typeof totalPlayers>(
			initializeBoardSquares(() => new Uint16Array(boardDimension).fill(oneBitMask)),
			totalPlayers
		);
		const oppositionRowEchelon = createTuple<BoardSquares<Uint16Array> | undefined, typeof totalPlayers>(undefined, totalPlayers);

		this.board.data.fenOptions.tag("royal").forEach((royal, color) => {
			if (!royal) return;
			const royalPiece = boardSquares[royal[0]][royal[1]];
			const controlBuilder = controls[royalPiece.piece];
			const builder = controlBuilder().setColor(0).setBaseImmunePieces(baseImmunes).setBoard(emptyBoard);
			const finalArray = initializeBoardSquares(() => new Uint16Array(14).fill(oneBitMask));
			for (let i = 0; i < boardSquares.length; i++) {
				for (let j = 0; j < boardSquares[0].length; j++) {
					if (emptyBoard[i][j].isWall()) continue;
					const control = builder.setCoordinates(i, j).constructPieceControl();
					const moves = control.getPseudoLegalMoves();
					const permutationArray = new Uint16Array(boardDimension).fill(oneBitMask);
					for (const { move } of moves) permutationArray[move[0]] |= binaryMasks[move[1]];
					finalArray[i][j] = permutationArray;
					royalMoves[color][i][j] = permutationArray;
				}
			}
			oppositionRowEchelon[color] = finalArray;
		});

		for (const color of colors) {
			this.state.royalMoveMedians[color] = findMinimumOnBoardSquares(royalMoves[color]);
		}
		return { oppositionRowEchelon, royalMoves };
	}

	private generateOppositeMedians(rowEchelon: Tuple<BoardSquares<Uint16Array> | undefined, typeof totalPlayers>) {
		const {
				emptyBoard,
				state: { oppositionMedians }
			} = this,
			royals = this.board.data.fenOptions.tag("royal");
		for (let i = 0; i < totalPlayers; i++) {
			for (let j = 0; j < totalPlayers; j++) {
				if (i === j || rowEchelon[i] === undefined) continue;
				const royalPieceA = royals[i],
					royalPieceB = royals[j];
				if (!royalPieceA || !royalPieceB) continue;
				const finalArray = Array.from({ length: 14 }, () => Array.from({ length: 14 }, () => 0));
				for (let i2 = 0; i2 < boardDimension; i2++) {
					for (let j2 = 0; j2 < boardDimension; j2++) {
						if (emptyBoard[i2][j2].isWall()) continue;
						const jjIndex = rowEchelon[j];
						const iiIndex = rowEchelon[i];
						if (!jjIndex || !iiIndex)
							throw new Error(
								`Central opposition matrix indexes are undefined: ${jjIndex?.toString() ?? "undefined"}  ${
									iiIndex?.toString() ?? "undefined"
								}`
							);
						if (
							(jjIndex[i2][j2][royalPieceA[1]] & binaryMasks[royalPieceA[0]]) ^ oneBitMask &&
							(iiIndex[i2][j2][royalPieceB[1]] & binaryMasks[royalPieceB[0]]) ^ oneBitMask
						) {
							continue;
						}

						const uintArray = jjIndex[i2][j2].map((e, x) => e & iiIndex[i2][j2][x]);
						let newResultingSquares = 0;
						for (let dimSquare = 0; dimSquare < boardDimension; dimSquare++) {
							newResultingSquares += bitCount(uintArray[dimSquare]) - 1;
						}

						finalArray[i2][j2] = newResultingSquares;
					}
				}

				let minimum = Infinity;
				for (let i2 = 0; i2 < boardDimension; i2++) {
					for (let j2 = 0; j2 < boardDimension; j2++) {
						if (finalArray[i2][j2] !== 0 && finalArray[i2][j2] < minimum) {
							minimum = finalArray[i2][j2];
						}
					}
				}
				oppositionMedians[i][j] = minimum - 1;
			}
		}
	}

	private generatePieceMoveMedians(royalMoves: Tuple<BoardSquares<Uint16Array>, typeof totalPlayers>) {
		const {
			pieceMoveRegistry,
			state: { pieceSquareMedians, walls },
			royalPieceSets
		} = this;
		let currentMessages = 0,
			requiredMessages = 0;
		for (const pieceLetter in pieceMoveRegistry) {
			if (!verifyPieceLetter(pieceLetter) || !Object.prototype.hasOwnProperty.call(pieceMoveRegistry, pieceLetter)) continue;
			if (pieceLetter in pieceSquareMedians) continue;
			pieceSquareMedians[pieceLetter] = {};
			const registeredSymbols = Object.getOwnPropertySymbols(pieceMoveRegistry[pieceLetter]);
			for (const registeredSymbol of registeredSymbols) {
				const pieceMedianCounter = new Worker(new URL("./PieceMedianCounter.ts", import.meta.url));
				pieceMedianCounter.postMessage({
					walls,
					moveRegistryArray: pieceMoveRegistry[pieceLetter][registeredSymbol].map((r) => r.map((uint) => uint.buffer)),
					royalMoves: royalMoves.map((board) => board.map((r) => r.map((uint) => uint.buffer))),
					royalPieceSet: royalPieceSets.map((s) => [...s])
				});
				requiredMessages++;
				pieceMedianCounter.onmessage = (e: MessageEvent<PieceMedianCounterReturnType>) => {
					pieceSquareMedians[pieceLetter][registeredSymbol] = e.data;
					pieceMedianCounter.terminate();
					if (requiredMessages === ++currentMessages) {
						this.callback(this.state);
					}
				};
			}
		}
	}

	generateInsufficientMaterialState() {
		this.initializeRoyals();
		this.getBoardDestinations();
		this.initializeBackwardsPieceRegistry();
		const { royalMoves, oppositionRowEchelon } = this.generateOppositionSquares();
		this.generateOppositeMedians(oppositionRowEchelon);
		this.generatePieceMoveMedians(royalMoves);
	}
}
