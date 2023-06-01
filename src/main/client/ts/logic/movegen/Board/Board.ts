import { assertNonUndefined, createTuple, createTupleFromCallback, Tuple } from "../../../baseTypes";
import { BoardSquares, Cloneable, initializeBoardSquares, Memento } from "../../BaseInterfaces";
import { createMoveTree, MoveTreeInterface } from "../MoveTree/MoveTree";
import {
	createBaseMoveWrapper,
	DroppingMove,
	InternalMove,
	InternalMoveSignature,
	Move,
	MoveData
} from "../MoveTree/MoveTreeInterface";
import { FENData } from "../FENData/FENData";
import type { PostMoveResults } from "../FENData/FENDataInterface";
import { boardDimension, colors, GameData, totalPlayers } from "../GameInformation/GameData";
import { NumericColor, Coordinate, nonPlayablePieces } from "../GameInformation/GameUnits/GameUnits";
import { createPieceFromData, deadColorIndex, pawnPieceString, PieceString, wallPieceString } from "../GameInformation/GameUnits/PieceString";
import { PieceControlConfigurator, PieceControlBuilder } from "../PieceControl/PieceControlBuilder";
import { initPieceControlDeclarations } from "../PieceControl/PieceControlDeclarations";
import { AttackType, pieceControlConfigSettings, PieceControlGeneratedMove, PieceLetter } from "../PieceControl/PieceControlInterface";
import { decorateClassWithVariants } from "../VariantRules/VariantRule";
import { copyVariantRules, validateVariantRules, VariantRuleParsingTypes } from "../VariantRules/VariantRuleSetup";
import {
	DisplaySettings,
	createGameTypeSettings,
	createComplexMoveLegalityTracker,
	BoardSnapshot,
	createBasePreGeneratedAttacks,
	compareCoordinates,
	stringifyCoordinate,
	SpecialMoveGenerationSettings
} from "./BoardInterface";
import type { VariantDataRules, VariantHandlerTarget } from "../VariantRules/VariantRuleInterface";
import { copyClass } from "@client/ts/utils/ObjectUtils";
import { parsePGN4 } from "../../utils/Tags/InputOutputProcessing";
import { InsufficientMaterialChecker } from "@moveGeneration/VariantRules/VariantRuleDefinitions/BoardVariantModules/InsufficientMaterial/InsufficientMaterialChecker";

initPieceControlDeclarations();

export const baseImmunes = createTuple(false, totalPlayers);
export type PlayerBooleanTuple = typeof baseImmunes;

export class Board implements VariantHandlerTarget<Board>, Cloneable<Board>, Memento<BoardSnapshot> {
	readonly controls: Record<PieceLetter, () => PieceControlConfigurator> = {};
	data: FENData;
	moves: MoveTreeInterface;
	preGeneratedAttacks = createTupleFromCallback(createBasePreGeneratedAttacks, totalPlayers);
	board: BoardSquares<PieceString>;
	isComplexSetup = createComplexMoveLegalityTracker();
	readonly gameData: GameData;
	readonly gameType = createGameTypeSettings();
	variantRules: VariantRuleParsingTypes;
	variantData: VariantDataRules;
	isTwoPlayer: boolean;
	insufficientMaterialChecker?: InsufficientMaterialChecker;

	__baseClass: Board;
	initDecoratorSettings() {
		/* no-op */
	}

	/*---------------------------------- INITIALIZATION -----------------------------------------*/
	constructor(pgn4: string) {
		this.__baseClass = this;

		const parsingResults = parsePGN4(pgn4);
		this.gameType.type = parsingResults.gameType;
		this.variantRules = parsingResults.variantRules;
		this.gameData = parsingResults.gameData;
		this.board = parsingResults.board;
		this.data = parsingResults.fenData;
		this.data.injectBoard(this);
		this.data = decorateClassWithVariants<typeof FENData>(this.data, FENData, this.variantRules.fenDataDecorators);
		this.data.injectBoard(this);
		this.variantData = parsingResults.variantRuleData;
		this.variantRules = validateVariantRules(this);
		this.isTwoPlayer = this.data.getRealPlayers() === 2;
		this.initPieceControls(parsingResults.pieceSet);

		this.moves = createMoveTree(this.createSnapshot());
		this.moves.moves = parsingResults.moves;
		this.pregenerateAttacks();
	}

	initPieceControls(pieces: Set<PieceLetter>) {
		if (pieces.size === 0) return;

		const builder = new PieceControlBuilder();
		builder.setFENData(this.data);
		builder.setVariantRules(this.variantRules.pieceControlDecorators);

		for (const piece of pieces) {
			const pieceControlConfigurator = builder.createPieceControlWrap(piece);
			this.controls[piece] = pieceControlConfigurator;
		}
	}

	getSquareVisibility(): BoardSquares<DisplaySettings[]> {
		return initializeBoardSquares(() => []);
	}

	createSnapshot(): BoardSnapshot {
		return {
			data: this.data.createSnapshot(),
			board: this.board.map((a) => [...a]),
			isComplexSetup: Object.assign({}, this.isComplexSetup)
		};
	}

	loadSnapshot(snapshot: BoardSnapshot) {
		this.isComplexSetup = { ...snapshot.isComplexSetup };
		this.data.loadSnapshot(snapshot.data);
		this.board = snapshot.board.map((row) => [...row]);
		this.pregenerateAttacks();
		this.runComplexLegalityEvaluationChecks();
	}

	createClone(): Board {
		let targetObject = copyClass(this.__baseClass, Board);
		targetObject.board = this.board.map((a) => [...a]); // PieceStrings are immutable
		targetObject.isComplexSetup = Object.assign({}, this.isComplexSetup);
		targetObject.preGeneratedAttacks = createTupleFromCallback(createBasePreGeneratedAttacks, totalPlayers);
		targetObject.data = this.data.createClone();
		targetObject = decorateClassWithVariants<typeof Board>(
			targetObject,
			Board,
			copyVariantRules(this.__baseClass.variantRules.boardDecorators)
		);
		targetObject.data.injectBoard(targetObject);
		targetObject.data = decorateClassWithVariants<typeof FENData>(
			targetObject.data,
			FENData,
			copyVariantRules(this.__baseClass.variantRules.fenDataDecorators)
		);
		targetObject.data.injectBoard(targetObject);
		const presumedPieceLetters = new Set<PieceLetter>();
		let letter: PieceLetter;
		for (letter in this.controls) {
			if (Object.prototype.hasOwnProperty.call(this.controls, letter)) {
				presumedPieceLetters.add(letter);
			}
		}
		targetObject.initPieceControls(presumedPieceLetters);
		targetObject.pregenerateAttacks();

		return targetObject;
	}

	/*---------------------------------- INITIALIZATION -----------------------------------------*/
	/*-------------------------------------------------------------------------------------------*/
	/*------------------------------------- UTILITIES -------------------------------------------*/

	isKingInCheck(baseColor: NumericColor, fenRoyal = this.data.fenOptions.tag("royal")): boolean {
		const royal = fenRoyal[baseColor];
		if (!royal || this.data.fenOptions.tag("dead")[baseColor]) return false;
		const coordinates = royal;
		return !!(
			this.preGeneratedAttacks[baseColor].slidingPieces[coordinates[0]][coordinates[1]] ||
			this.preGeneratedAttacks[baseColor].hoppingPieces[coordinates[0]][coordinates[1]]
		);
	}

	getPlayerPieces(): Tuple<Coordinate[], typeof totalPlayers> {
		const playerPieces: Tuple<Coordinate[], typeof totalPlayers> = [[], [], [], []];

		for (let i = 0; i < boardDimension; i++) {
			for (let j = 0; j < boardDimension; j++) {
				const square = this.board[i][j];
				if (square.isEmpty()) continue;
				const color = square.color;
				if (color !== deadColorIndex) playerPieces[color].push([i, j]);
			}
		}

		return playerPieces;
	}

	getCheckmatesAndStalemates() {
		const dead = this.data.fenOptions.tag("dead"),
			royal = this.data.fenOptions.tag("royal");

		const kingChecks = createTuple(false, totalPlayers);
		const legalMoves = createTuple(false, totalPlayers);
		const playerPieces = this.getPlayerPieces();
		legalMoves[this.data.sideToMove] = true;

		for (const color of colors) {
			if (dead[color]) continue;
			const playerArmy = playerPieces[color];
			if (this.isKingInCheck(color)) {
				kingChecks[color] = true;
			}
			for (const piece of playerArmy) {
				if (this.getLegalMoves(piece[0], piece[1], color).length) {
					legalMoves[color] = true;
					break;
				}
			}

			if (!legalMoves[color]) {
				if (this.preGeneratedAttacks[color].pieceDrops.pawn.length || this.preGeneratedAttacks[color].pieceDrops.piece.length) {
					legalMoves[color] = true;
				}
			}
		}

		const kingCaptures = royal.map((r, i) =>
			!dead[i] && r ? this.board[r[0]][r[1]].isEmpty() || this.board[r[0]][r[1]].color !== i : false
		);
		return {
			checkmates: legalMoves.map((move, i) => kingCaptures[i] || (!move && kingChecks[i])),
			stalemates: legalMoves.map((move, i) => !move && !kingChecks[i]),
			checks: kingChecks
		};
	}

	private runComplexLegalityEvaluationChecks(): void {
		if (this.isComplexSetup.hasComplexRules) return;
		for (let i = 0; i < boardDimension; i++) {
			for (let j = 0; j < boardDimension; j++) {
				const square = this.board[i][j];
				if (square.isPiece() && pieceControlConfigSettings[square.piece].moveGenerationSettings.isComplex) {
					this.isComplexSetup.hasComplexPieces = true;
					return;
				}
			}
		}
	}

	getCurrentChecks(sideToMove = this.data.sideToMove) {
		const dead = this.data.fenOptions.tag("dead"),
			resigned = this.data.fenOptions.tag("resigned"),
			royal = this.data.fenOptions.tag("royal");

		const playerRoyals = royal.map((r, i) => (r && !dead[i] && !resigned[i] ? r : null));
		const attackingCoordinates = createTupleFromCallback<string[], typeof totalPlayers>(() => [], totalPlayers);
		for (const [startingCoordinate, attackList] of this.preGeneratedAttacks[sideToMove].pieceMovements) {
			for (const attack of attackList) {
				for (const color of colors) {
					if (color === sideToMove) continue;
					const royal = playerRoyals[color];
					if (royal && compareCoordinates(royal, attack.move)) {
						attackingCoordinates[color].push(startingCoordinate);
					}
				}
			}
		}

		return attackingCoordinates;
	}

	/*------------------------------------- UTILITIES -------------------------------------------*/
	/*-------------------------------------------------------------------------------------------*/
	/*---------------------------------------- API ----------------------------------------------*/

	makeMove(move: Move, ignoreNextMoves = false): PostMoveResults {
		let returnValues!: PostMoveResults;
		const sideToMove = this.data.sideToMove,
			pregeneratedAttacks = this.preGeneratedAttacks;

		for (let i = 0; i < move.length; i++) {
			if (i === move.length - 1) {
				returnValues = this.data.affectOptions(move[i], {
					ignoreCheckmateChecks: ignoreNextMoves,
					ignoreNextTurn: false
				});
			} else {
				this.data.affectOptions(move[i], {
					ignoreCheckmateChecks: ignoreNextMoves,
					ignoreNextTurn: true
				});
			}
		}
		this.runComplexLegalityEvaluationChecks();
		if (ignoreNextMoves) return returnValues;

		const path = this.moves.currentMove.slice();
		path[path.length - 1]++;
		this.moves.currentMove = this.moves.setNewMove({
			move: createBaseMoveWrapper({ path, moveData: move }),
			snapshot: {
				boardSnapshot: this.createSnapshot(),
				pregeneratedAttacks: pregeneratedAttacks[sideToMove]
			},
			fenDataString: this.moves.constructPreliminaryHashString(this)
		});
		if (this.data.gameOver || this.data.getRealPlayers() === 1) return returnValues;
		if (returnValues.checkmates[this.data.sideToMove]) {
			returnValues = this.makeMove([{ type: InternalMoveSignature.TeamsCheckmate }], true);
		} else if (returnValues.stalemates[this.data.sideToMove]) {
			returnValues = this.makeMove([{ type: InternalMoveSignature.Stalemate }]);
		}

		return returnValues;
	}

	pregenerateAttacks(exclusiveSideToMoveGeneration: NumericColor | false = false): void {
		const royal = this.data.fenOptions.tag("royal");

		this.preGeneratedAttacks = createTupleFromCallback(createBasePreGeneratedAttacks, totalPlayers);
		this.getPlayerPieces().forEach((army, armyColor) => {
			if (exclusiveSideToMoveGeneration !== false && exclusiveSideToMoveGeneration !== armyColor) return;
			const preGeneratedAttacks = this.preGeneratedAttacks[armyColor];
			for (const coordinate of army) {
				const square = this.board[coordinate[0]][coordinate[1]];
				if (!square.isPiece()) continue;
				const color = square.color;
				const letter = square.piece;
				const controlBuilder = this.controls[letter]().setColor(color).setCoordinates(coordinate[0], coordinate[1]).setBoard(this.board);
				const setting = pieceControlConfigSettings[square.piece];
				const resultingMoves: PieceControlGeneratedMove[] = [];

				let control = controlBuilder.setBaseImmunePieces(this.gameType.getBaseColors(color)).constructPieceControl();
				resultingMoves.push(...control.getPseudoLegalMoves());

				control = controlBuilder.setBaseImmunePieces(baseImmunes).constructPieceControl();
				if (setting.moveGenerationSettings.isJumping) {
					const attacks = control.rayGenJumpingAttacks();
					for (const { move: attack } of attacks) {
						for (const color of colors) {
							if (color === armyColor) continue;
							const preGeneratedAttacks = this.preGeneratedAttacks[color];
							preGeneratedAttacks.hoppingPieces[attack[0]][attack[1]]++;
							preGeneratedAttacks.hoppingPieceLines.push([coordinate, attack]);
							const l = preGeneratedAttacks.attackingColors[attack[0]][attack[1]];
							if (~l && preGeneratedAttacks.attackingColors[attack[0]][attack[1]] !== color + 1) {
								preGeneratedAttacks.attackingColors[attack[0]][attack[1]] = l === 0 ? 1 + color : -1;
							}
						}
					}
				}

				if (setting.moveGenerationSettings.isSliding) {
					const attacks = control.rayGenSlidingAttacks();
					for (const attack of attacks) {
						for (const color of colors) {
							if (color === armyColor) continue;
							const preGeneratedAttacks = this.preGeneratedAttacks[color];

							for (const { move: subAttack } of attack) {
								preGeneratedAttacks.slidingPieces[subAttack[0]][subAttack[1]]++;
								const l = preGeneratedAttacks.attackingColors[subAttack[0]][subAttack[1]];
								if (~l && preGeneratedAttacks.attackingColors[subAttack[0]][subAttack[1]] !== color + 1) {
									preGeneratedAttacks.attackingColors[subAttack[0]][subAttack[1]] = l === 0 ? 1 + color : -1;
								}
							}

							if (attack.length !== 0) {
								preGeneratedAttacks.slidingPiecesLines.push([coordinate, attack.map((m) => m.move)]);
							} else {
								const coordinateArray: Coordinate[] = [];
								preGeneratedAttacks.slidingPiecesLines.push([coordinate, coordinateArray]);
							}
						}
					}

					const rayGen = control.rayGenSlidingAttacks(AttackType.RayTraceLimited);
					for (const attack of rayGen) {
						for (const color of colors) {
							if (color === armyColor) continue;
							const preGeneratedAttacks = this.preGeneratedAttacks[color];

							if (attack.length !== 0) {
								let isRoyalOnLine = false;
								const resultingAttack: Coordinate[] = [];
								for (const { move } of attack) {
									resultingAttack.push(move);
									if (isRoyalOnLine) {
										preGeneratedAttacks.slidingPieces[move[0]][move[1]]++;
									} else if (compareCoordinates(royal[color] ?? [-1, -1], move)) {
										isRoyalOnLine = true;
									}
								}
								preGeneratedAttacks.slidingPiecesRayTracing.push([coordinate, attack.map((m) => m.move)]);
							} else {
								preGeneratedAttacks.slidingPiecesLines.push([coordinate, []]);
							}
						}
					}
				}

				preGeneratedAttacks.pieceMovements.set(stringifyCoordinate(coordinate), resultingMoves);
			}

			preGeneratedAttacks.pieceDrops.piece = this.getDroppingMoves(createPieceFromData(armyColor, nonPlayablePieces.wall));
			preGeneratedAttacks.pieceDrops.pawn = this.getDroppingMoves(createPieceFromData(armyColor, pawnPieceString.piece));
		});
	}

	isSetupComplex() {
		return this.isComplexSetup.hasComplexPieces || this.isComplexSetup.hasComplexRules || this.data.isComplexEvaluation();
	}

	isTheMoveLegal(color: NumericColor, moveData: MoveData, isSeirawanDrop = false): boolean {
		const royals = this.data.fenOptions.tag("royal");
		const {
			startCoordinates: [pieceI, pieceJ],
			endCoordinates: [attackI, attackJ]
		} = moveData;
		const royal = royals[color];
		if (!this.board[attackI][attackJ].isEmpty() && royal && attackI === royal[0] && attackJ === royal[1]) return false;

		if (this.isSetupComplex()) {
			const snapshot = this.createSnapshot();
			const moveArray: Move = [
				{
					startCoordinates: [pieceI, pieceJ],
					endCoordinates: [attackI, attackJ]
				}
			];
			if (isSeirawanDrop) moveArray.push({ piece: wallPieceString, endCoordinates: [pieceI, pieceJ] });
			const { checks, checkmates } = this.makeMove(moveArray, true);

			let isKingInCheck = checks[color] || checkmates[color];
			if (!isKingInCheck) {
				this.pregenerateAttacks(color);
				isKingInCheck = this.isKingInCheck(color);
			}
			this.loadSnapshot(snapshot);
			return !isKingInCheck;
		} else {
			const [royalI, royalJ] = royal ?? [null, null];
			const preGeneratedAttacks = this.preGeneratedAttacks[color];
			if (royalI === null) return true;
			const isRoyalMove = royalI === pieceI && royalJ === pieceJ;
			const attackers = preGeneratedAttacks.hoppingPieces[royalI][royalJ] + preGeneratedAttacks.slidingPieces[royalI][royalJ];
			const targetSafety = preGeneratedAttacks.slidingPieces[attackI][attackJ] + preGeneratedAttacks.hoppingPieces[attackI][attackJ] === 0;
			const legalitySettings: { canKingCapture: number | undefined } = {
				canKingCapture: undefined
			};

			for (const kingCaptureColor of colors) {
				const royal = royals[kingCaptureColor];
				if (kingCaptureColor !== color && royal && royal[0] === attackI && royal[1] === attackJ) {
					const royalDefendedSquare = preGeneratedAttacks.attackingColors[royal[1]][royal[0]];
					if (
						(royalDefendedSquare === kingCaptureColor + 1 || royalDefendedSquare === 0) &&
						(isRoyalMove || preGeneratedAttacks.attackingColors[royalI][royalJ] === kingCaptureColor + 1)
					) {
						legalitySettings.canKingCapture = kingCaptureColor + 1;
					}
				}
			}
			if (!this.gameType.isFFA() && legalitySettings.canKingCapture !== undefined) return true;

			for (const [attackingPiece, attackLine] of preGeneratedAttacks.slidingPiecesRayTracing) {
				let isPieceUnderAttack = false,
					isRoyalUnderAttack = false,
					isTheTargetSquarePinListed = false;
				for (const [attackedX, attackedY] of attackLine) {
					if (!isPieceUnderAttack && attackedX === pieceI && attackedY === pieceJ) isPieceUnderAttack = true;
					else if (!isTheTargetSquarePinListed && !isRoyalUnderAttack && attackedX === attackI && attackedY === attackJ)
						isTheTargetSquarePinListed = true;
					if (!isRoyalUnderAttack && attackedX === royalI && attackedY === royalJ) isRoyalUnderAttack = true;

					if (isRoyalMove) {
						if (isRoyalUnderAttack && attackedX === attackI && attackedY === attackJ) {
							if (
								legalitySettings.canKingCapture &&
								legalitySettings.canKingCapture > 0 &&
								this.board[attackedX][attackedY].color + 1 === legalitySettings.canKingCapture
							)
								continue;
							return false;
						}
					} else {
						if (
							isPieceUnderAttack &&
							isRoyalUnderAttack &&
							!compareCoordinates(attackingPiece, moveData.endCoordinates) &&
							!isTheTargetSquarePinListed
						) {
							if (
								legalitySettings.canKingCapture &&
								legalitySettings.canKingCapture > 0 &&
								this.board[attackedX][attackedY].color + 1 === legalitySettings.canKingCapture
							)
								continue;
							return false;
						}
					}
				}
			}

			if (attackers > 1) {
				return isRoyalMove ? targetSafety || Boolean(legalitySettings.canKingCapture) : Boolean(legalitySettings.canKingCapture);
			} else if (attackers === 1) {
				if (!isRoyalMove) {
					if (preGeneratedAttacks.hoppingPieces[royalI][royalJ] === 1) {
						for (const [attackingPiece, attackCoordinates] of preGeneratedAttacks.hoppingPieceLines) {
							if (
								attackCoordinates[0] === royalI &&
								attackCoordinates[1] === royalJ &&
								attackingPiece[0] === attackI &&
								attackingPiece[1] === attackJ
							) {
								return true;
							}
						}

						return Boolean(legalitySettings.canKingCapture);
					} else {
						for (const [attackingPiece, attackLine] of preGeneratedAttacks.slidingPiecesLines) {
							let isRoyalUnderAttack = false,
								isTheTargetSquareBlocked = false;
							for (const [attackedX, attackedY] of attackLine) {
								if (!isRoyalUnderAttack && attackedX === royalI && attackedY === royalJ) isRoyalUnderAttack = true;
								else if (!isTheTargetSquareBlocked && !isRoyalUnderAttack && attackedX === attackI && attackedY === attackJ)
									isTheTargetSquareBlocked = true;

								if (
									isRoyalUnderAttack &&
									!compareCoordinates(attackingPiece, moveData.endCoordinates) &&
									!isTheTargetSquareBlocked
								) {
									if (
										legalitySettings.canKingCapture &&
										legalitySettings.canKingCapture > 0 &&
										this.board[attackedX][attackedY].color + 1 === legalitySettings.canKingCapture
									)
										continue;
									return Boolean(legalitySettings.canKingCapture);
								}
							}
						}

						return true;
					}
				} else {
					return targetSafety || Boolean(legalitySettings.canKingCapture);
				}
			} else {
				return isRoyalMove ? targetSafety || Boolean(legalitySettings.canKingCapture) : true;
			}
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getSpecialMoves(_: SpecialMoveGenerationSettings): MoveData[] {
		return [];
	}

	getLegalMoves(i: number, j: number, baseColor = this.data.sideToMove, isSeirawanDrop = false): MoveData[] {
		const pieceString = this.board[i]?.[j],
			royal = this.data.fenOptions.tag("royal")[baseColor];
		if (pieceString.isPiece()) {
			const color = pieceString.color;
			if (color !== baseColor) return [];
			const pseudoLegalMoves = this.preGeneratedAttacks[color].pieceMovements.get(stringifyCoordinate([i, j]));
			assertNonUndefined(pseudoLegalMoves);

			const specialMoves = this.getSpecialMoves({ i, j, baseColor, pieceLetter: pieceString.piece });
			return [
				...pseudoLegalMoves
					.map((generatedMove) => {
						const moveData: MoveData = {
							startCoordinates: [i, j],
							endCoordinates: generatedMove.move,
							isIrreversible: generatedMove.irreversible
						};
						if (generatedMove.move[2]) {
							moveData.promotion = generatedMove.move[2].split("").map((piece) => createPieceFromData(color, piece));
						}

						return moveData;
					})
					.filter((m) => {
						const capturedPieces = this.data.getCapturedPieces(m);
						const isKingCapture = royal && capturedPieces.find((c) => royal[0] === c[0] && royal[1] === c[1]);
						return this.isTheMoveLegal(color, m, isSeirawanDrop) && !isKingCapture;
					}),
				...specialMoves
			];
		} else {
			return [];
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getDroppingMoves(_piece: PieceString, _sideToMove = this.data.sideToMove): DroppingMove[] {
		return [];
	}

	getAllowedInternalMoves(sideToMove = this.data.sideToMove): InternalMove[] {
		const currentMoves = [InternalMoveSignature.DrawByAgreement];

		const currentSnapshot = this.createSnapshot();
		this.makeMove([{ type: InternalMoveSignature.Resign }], true);
		const maximum = Math.max(...this.data.points);
		const pointIndexes = this.data.points.reduce<number[]>((p, n, i) => (n === maximum ? [...p, i] : p), []);
		this.loadSnapshot(currentSnapshot);
		if (pointIndexes.length === 1 && pointIndexes[0] === sideToMove) {
			currentMoves.push(InternalMoveSignature.ClaimWin);
		} else {
			currentMoves.push(InternalMoveSignature.Resign, InternalMoveSignature.Timeout);
		}

		return currentMoves.map((type) => ({ type }));
	}

	/*---------------------------------------- API ----------------------------------------------*/
}
