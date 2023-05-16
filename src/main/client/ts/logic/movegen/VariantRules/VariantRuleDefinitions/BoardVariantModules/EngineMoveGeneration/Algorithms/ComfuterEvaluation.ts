import { createTuple, Tuple } from "@client/ts/baseTypes";
import { BoardSquares, initializeBoardSquares } from "@client/ts/logic/BaseInterfaces";
import type { Board } from "@moveGeneration/Board/Board";
import { stringifyCoordinate } from "@moveGeneration/Board/BoardInterface";
import type { FENData } from "@moveGeneration/FENData/FENData";
import { totalPlayers, colors, VariantType, boardDimension } from "@moveGeneration/GameInformation/GameData";
import type { NumericColor, Coordinate } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { pawnPieceString, PieceString } from "@moveGeneration/GameInformation/GameUnits/PieceString";
import {
	InternalMoveSignature,
	MoveComponent,
	SpecialMove,
	verifyInternalMove,
	verifyStandardMove
} from "@moveGeneration/MoveTree/MoveTreeInterface";
import type { PieceControlConfigurator } from "@moveGeneration/PieceControl/PieceControlBuilder";
import { pieceControlConfigSettings, PieceLetter } from "@moveGeneration/PieceControl/PieceControlInterface";
import type { VariantDataRules } from "@moveGeneration/VariantRules/VariantRuleInterface";
import { createBotAlgorithm, ZombieMoveGenerationAlgorithm, ZombieType } from "../BotInterface";
import { randomlyPickNextChainedMoves } from "./RandomEvaluation";

const onlyUnique = <T>(value: T, index: number, self: T[]) => self.indexOf(value) === index;
const stringifyKey = (i: number, j: number, color?: NumericColor) => `${i},${j}/${color ?? ""}`;
function getPieceInFront(i: number, j: number, color: NumericColor): [number, number] {
	switch (color) {
		case 0:
			return [i - 1, j];
		case 1:
			return [i, j + 1];
		case 2:
			return [i + 1, j];
		case 3:
			return [i, j - 1];
	}
}

interface ReadonlyFlattenedBoardSettings {
	variantData: VariantDataRules;
	promotionRank: Tuple<number, typeof totalPlayers>;
	isFFA: boolean;
	isTeams: boolean;
	zombieType: Tuple<ZombieType, typeof totalPlayers>;
	defaultSideToMove: NumericColor;
}

interface SquareCoverage {
	attackers: Coordinate[];
	defenders: Coordinate[];
}

interface FlattenedBoardSettings extends Readonly<ReadonlyFlattenedBoardSettings> {
	board: Board;
	boardSquares: PieceString[][];
	data: FENData;
	remainingReal: number;
	remaining: Array<number | false>;
	coverage: BoardSquares<Coordinate[]>;
	pieces: Coordinate[][];
	royal: Tuple<Coordinate | null, typeof totalPlayers>;
	controls: Record<PieceLetter, () => PieceControlConfigurator>;
	coverageCache: Map<string, SquareCoverage>;
	pieceValueCache: Map<string, number>;
	hangingCache: Map<string, number>;
}

function createComfuterAlgorithm(): ZombieMoveGenerationAlgorithm {
	let boardAccessors: FlattenedBoardSettings;
	function augmentBoardAccessorsFromBoard(board: Board): Omit<FlattenedBoardSettings, keyof ReadonlyFlattenedBoardSettings> {
		return {
			board,
			boardSquares: board.board,
			data: board.data,
			remainingReal: board.data.getRealPlayers(),
			remaining: board.data.fenOptions
				.tag("dead")
				.map((v, i) => (v ? false : i))
				.filter((v) => v === false),
			coverage: initializeBoardSquares(() => []),
			pieces: board.getPlayerPieces(),
			controls: board.controls,
			royal: board.data.fenOptions.tag("royal"),
			hangingCache: new Map(),
			coverageCache: new Map(),
			pieceValueCache: new Map()
		};
	}

	function initializeBoardAccessorsFromBoard(board: Board) {
		const promotionRank: Tuple<number, typeof totalPlayers> =
			board.variantData.promotionRank !== false
				? [
						boardDimension - board.variantData.promotionRank,
						board.variantData.promotionRank - 1,
						board.variantData.promotionRank - 1,
						boardDimension - board.variantData.promotionRank
				  ]
				: createTuple(99, totalPlayers);
		boardAccessors = {
			...augmentBoardAccessorsFromBoard(board),
			variantData: board.variantData,
			promotionRank,
			isFFA: board.gameType.isFFA(),
			isTeams: !board.gameType.isFFA(),
			zombieType: board.data.fenOptions.tag("zombieType"),
			defaultSideToMove: board.data.sideToMove
		};
	}

	function getDistanceFromPromotion(color: NumericColor, i: number, j: number): number {
		if (i === -1) return 99;
		return Math.abs(boardAccessors.promotionRank[color] - (color & 1 ? i : j)) || 99;
	}

	function getDistanceFromKing(i: number, j: number, color: NumericColor): number {
		if (i === -1) return 999;
		const royalPiece = boardAccessors.royal[color];
		if (!royalPiece) return 999;
		const x = Math.abs(i - royalPiece[0]),
			y = Math.abs(j - royalPiece[1]);
		if (x === 0 && y === 0) return 999;
		return Math.max(x, y);
	}

	function inspectCoverage(): void {
		const { board, boardSquares, pieces, coverage } = boardAccessors;

		for (const color of colors) {
			for (const coordinate of pieces[color]) {
				const pc = boardSquares[coordinate[0]][coordinate[1]];
				if (!pc.isPiece()) continue;
				const destinations = board.preGeneratedAttacks[color].pieceMovements.get(stringifyCoordinate(coordinate));
				if (!destinations) continue;

				for (const dest of destinations) {
					coverage[dest.move[0]][dest.move[1]].push(coordinate);
				}
			}
		}
	}

	function getCoverage(i: number, j: number, color: NumericColor): SquareCoverage {
		const { coverageCache, coverage, boardSquares, data, board, zombieType, defaultSideToMove } = boardAccessors;
		const resigned = data.fenOptions.tag("resigned");

		const key = stringifyKey(i, j, color);
		if (coverageCache.has(key)) return coverageCache.get(key)!;
		const attackers: Coordinate[] = [],
			defenders: Coordinate[] = [];
		const cvg = coverage[i][j];
		if (cvg.length) {
			for (const pieceC of cvg) {
				const piece = boardSquares[pieceC[0]][pieceC[1]];
				if (!piece.isPiece()) continue;
				const pieceColor = piece.color;
				if (resigned[pieceColor] && zombieType[pieceColor] === ZombieType.Rando) continue;
				if (board.gameType.isSameTeam(pieceColor, defaultSideToMove)) {
					defenders.push(pieceC);
				} else {
					attackers.push(pieceC);
				}
			}
		}

		const cache = color === defaultSideToMove ? { attackers, defenders } : { defenders: attackers, attackers: defenders };
		coverageCache.set(key, cache);
		return cache;
	}

	function getPieceValue(i: number, j: number): number {
		const { boardSquares, pieceValueCache, isFFA, isTeams, remainingReal, royal, board } = boardAccessors;

		const coordinates: [number, number] = [i, j];
		const pieceString = boardSquares[i][j];
		if (!pieceString.isPiece()) return 0;
		const piece = pieceString.piece;
		const key = `${coordinates[0]},${coordinates[1]}/${pieceString.color}`;
		if (pieceValueCache.has(key)) return pieceValueCache.get(key)!;

		let value = 0;
		const controlSetting = pieceControlConfigSettings[piece];
		if (!controlSetting.moveGenerationSettings.isPawn) {
			value = isTeams ? controlSetting.points.botTeamsValue : controlSetting.points.botFFAValue;
		} else {
			value = isFFA ? 1 : 0.4;
			const promotionDistance = getDistanceFromPromotion(pieceString.color, ...coordinates);
			value += (2 / (getDistanceFromKing(...coordinates, pieceString.color) * 3)) * (remainingReal / 4);
			value += 3 / (promotionDistance * 3);

			if (promotionDistance < 2) {
				const inFront = getPieceInFront(...coordinates, pieceString.color);
				const { attackers, defenders } = getCoverage(...inFront, pieceString.color);
				if (!defenders.length) {
					value += 3 / promotionDistance;
				}
				if (attackers.length < defenders.length) {
					value += 2 / promotionDistance;
				}
			}
		}

		let isRoyal = false;
		for (const royalPiece of royal) {
			if (!royalPiece) continue;
			if (royalPiece[0] === coordinates[0] && royalPiece[1] === coordinates[1]) {
				isRoyal = true;
				break;
			}
		}

		if (!isRoyal && piece !== pawnPieceString.piece) {
			for (const color of colors) {
				if (!board.gameType.isSameTeam(color, pieceString.color)) {
					let d = getDistanceFromKing(...coordinates, color);
					if (d < 3) d = 2;
					value += (5 - remainingReal) / d;
				}
			}
		}

		pieceValueCache.set(key, value);
		return value;
	}

	function getCoordinationEval(player: NumericColor): number {
		const { pieces, remainingReal } = boardAccessors;

		let e = 0;
		for (const piece of pieces[player]) {
			const { defenders } = getCoverage(piece[0], piece[1], player);
			for (const d of defenders) e += 30 / (getPieceValue(d[0], d[1]) * 2);
		}
		if (remainingReal === 2) {
			e *= 0.4;
		} else if (remainingReal === 3) {
			e *= 0.7;
		}

		return e / 55;
	}

	function firstPlayerMovesBefore(p1: NumericColor, p2: NumericColor): boolean {
		const { data, defaultSideToMove } = boardAccessors;

		let next = data.nextTurn();
		do {
			if (p1 === next) return true;
			if (p2 === next) return false;
			next = data.nextTurn(next);
		} while (next !== defaultSideToMove);

		return true;
	}

	function canRespondDirectlyToThreat(player: NumericColor, attackers: Coordinate[]): boolean {
		const { boardSquares } = boardAccessors;

		let attackingPlayers: NumericColor[] = [];
		for (const pc of attackers) {
			const square = boardSquares[pc[0]][pc[1]];
			if (!square.isPiece()) continue;
			attackingPlayers.push(square.color);
		}
		attackingPlayers = attackingPlayers.filter(onlyUnique);

		for (const a of attackingPlayers) {
			if (firstPlayerMovesBefore(player, a)) return false;
		}
		return true;
	}

	function hanging(i: number, j: number, pieceValue = getPieceValue(i, j)): number {
		const { hangingCache, boardSquares, remaining, data } = boardAccessors;

		const key = stringifyKey(i, j);
		if (hangingCache.has(key)) return hangingCache.get(key)!;
		const square = boardSquares[i][j];
		if (!square.isPiece()) return 0;
		const { attackers, defenders } = getCoverage(i, j, square.color);

		let attackerValue = 999;
		for (const pc of attackers) {
			attackerValue = Math.min(attackerValue, getPieceValue(pc[0], pc[1]));
		}
		let attackedFromLeft = false;
		const nextTurn = data.nextTurn(square.color);
		if (remaining.length > 2) {
			for (const pc of attackers) {
				if (boardSquares[pc[0]][pc[1]].color === nextTurn) {
					attackedFromLeft = true;
					break;
				}
			}
		}

		const threatened = pieceValue - attackerValue;
		let pawnDefends: Coordinate | undefined;
		for (const pc of defenders) {
			if (boardSquares[pc[0]][pc[1]].piece === pawnPieceString.piece) {
				pawnDefends = pc;
				break;
			}
		}

		let h = 0;
		const underDefended = attackers.length - defenders.length > 0;
		if (underDefended) h = pieceValue;
		if (underDefended && pawnDefends) h = 0;
		if (pawnDefends && attackers.length - defenders.length > 1) {
			h = getPieceValue(pawnDefends[0], pawnDefends[1]);
		}
		if (!h && threatened > 0) h = threatened;
		if (!h && attackedFromLeft && threatened >= -2) {
			h = -threatened;
		}
		if (h && canRespondDirectlyToThreat(square.color, attackers)) {
			h /= 6;
		}

		hangingCache.set(key, h);
		return h;
	}

	function getMobilityEval(player: NumericColor): number {
		const { pieces, boardSquares, isTeams, royal, defaultSideToMove, board } = boardAccessors;

		let e = 0;
		for (const coordinate of pieces[player]) {
			if (hanging(coordinate[0], coordinate[1]) > 2) continue;
			const piece = boardSquares[coordinate[0]][coordinate[1]];
			if (!piece.isPiece()) continue;

			let destinations = board.preGeneratedAttacks[player].pieceMovements.get(stringifyCoordinate(coordinate))?.length ?? 0;
			if (/[QDAEHΔ]/.test(piece.piece)) destinations /= isTeams ? 2 : 3;
			if (/[RBV]]/.test(piece.piece)) destinations /= isTeams ? 1.5 : 2;
			e += destinations / (isTeams ? 10 : board.gameType.type === VariantType.Solo ? 21 : 16);

			let isRoyal = false;
			for (const royalPiece of royal) {
				if (!royalPiece) continue;
				if (royalPiece[0] === coordinate[0] && royalPiece[1] === coordinate[1]) {
					isRoyal = true;
					break;
				}
			}

			if (!isRoyal && !isTeams && piece.piece === pawnPieceString.piece) {
				const blockedBy = getPieceInFront(coordinate[0], coordinate[1], player);
				const bSqr = boardSquares[blockedBy[0]][blockedBy[1]];
				if (bSqr.isEmpty()) continue;

				if (!bSqr.isPiece()) {
					e -= 2;
				} else if (board.gameType.isSameTeam(bSqr.color, defaultSideToMove)) {
					e -= 0.5;
				} else if (bSqr.piece === pawnPieceString.piece) {
					e -= 1.8;
				} else if (player === bSqr.color) {
					e -= 0.5;
				}
			}
		}

		return e;
	}

	function getDistFromHill(player: NumericColor): number {
		const royalPiece = boardAccessors.royal[player];
		if (!royalPiece) return 999;
		const x = Math.abs(6.5 - royalPiece[0]);
		const y = Math.abs(6.5 - royalPiece[1]);
		const d = (x + y) / 2 + Math.max(x, y) / 2;
		if (!d) return 999;
		return d;
	}

	function getMatesEval(): number {
		const { board, variantData, data, pieces, remainingReal } = boardAccessors;
		board.data.sideToMove = board.data.previousTurn();
		const { checkmates, stalemates, checks } = board.getCheckmatesAndStalemates();
		board.data.sideToMove = board.data.nextTurn();
		let e = 0;
		for (const color of colors) {
			if (checkmates[color]) {
				e += 500;
			} else if (stalemates[color]) e -= 300;
		}

		const checksLength = checks.filter(Boolean).length;
		if (checksLength === 3) {
			e += 10;
		} else if (checksLength === 2) {
			e += 1;
		} else if (checksLength === 1) {
			const prev = data.previousTurn();
			if (remainingReal > 2 && checks[prev]) {
				e += 1.2;
			} else if (remainingReal === 2) {
				e += 0.1;
			} else {
				e += 0.4;
			}
		}

		if (checksLength && variantData.nCheck) {
			for (const color of colors) {
				const lives = data.fenOptions.tag("lives")[color];
				if (lives && checks[color]) e += 4 / (lives + 1);
			}
			e += 0.3;
		}
		if (variantData.barePieceRule) {
			for (const color of colors) {
				if (pieces[color].length <= 1) e += 300;
			}
		}

		return e;
	}

	function getMaterialEval(): { myMaterial: number; oppMaterial: number } {
		const { board, pieces, isTeams, remainingReal, defaultSideToMove, variantData } = boardAccessors;
		let myMaterial = 0,
			oppMaterial = 0;

		for (const color of colors) {
			if (board.gameType.isSameTeam(color, defaultSideToMove)) {
				for (const pc of pieces[color]) {
					let pieceValue = getPieceValue(pc[0], pc[1]);
					pieceValue -= hanging(pc[0], pc[1]);
					myMaterial += pieceValue;
				}
			} else {
				for (const pc of pieces[color]) {
					let pcVal = getPieceValue(pc[0], pc[1]);
					if (!isTeams && remainingReal === 4 && Math.abs(color - defaultSideToMove) === 2 && !variantData.giveaway) {
						pcVal /= board.gameType.type === VariantType.Solo ? 2 : 3;
					}
					pcVal -= hanging(pc[0], pc[1], pcVal);
					oppMaterial -= pcVal;
				}
			}
		}

		if (!isTeams && remainingReal === 4) {
			oppMaterial /= 1.4;
			myMaterial *= 1.2;
		}
		if (!isTeams && remainingReal === 3) {
			oppMaterial /= 1.25;
			myMaterial *= 1.1;
		}
		myMaterial *= 2;
		oppMaterial *= 2;

		return { myMaterial, oppMaterial };
	}

	function getPinsEval(): { pinnedEval: number; discovsEval: number } {
		const { board, royal, pieces, defaultSideToMove, remainingReal } = boardAccessors;

		let pinnedEval = 0,
			discovsEval = 0;
		for (const i of colors) {
			const discovered: Coordinate[] = [];
			const pins: Coordinate[] = [];

			for (const piece of pieces[i]) {
				const royalPiece = royal[i];
				if (!royalPiece) break;
				if (royalPiece[0] === piece[0] && royalPiece[1] === piece[1]) continue;
				const [royalX, royalY] = royalPiece;
				const pieceX = piece[0],
					pieceY = piece[1];

				for (const [attackPiece, attackLine] of board.preGeneratedAttacks[i].slidingPiecesRayTracing) {
					let isPieceUnderAttack = false,
						isRoyalUnderAttack = false;
					for (const [attackedX, attackedY] of attackLine) {
						if (!isPieceUnderAttack && attackedX === pieceX && attackedY === pieceY) isPieceUnderAttack = true;
						if (!isRoyalUnderAttack && attackedX === royalX && attackedY === royalY) isRoyalUnderAttack = true;

						if (isPieceUnderAttack && isRoyalUnderAttack) {
							pins.push(piece);
						} else if (isRoyalUnderAttack && !isPieceUnderAttack) {
							discovered.push([attackPiece[0], attackPiece[1]]);
						}
					}
				}
			}

			for (const coordinate of pins) {
				if (hanging(coordinate[0], coordinate[1]) > 2) continue;
				const pieceValue = Math.sqrt(getPieceValue(coordinate[0], coordinate[1]));
				if (!board.gameType.isSameTeam(i, defaultSideToMove)) {
					pinnedEval += pieceValue / 2;
				} else {
					pinnedEval -= pieceValue;
				}
			}

			for (const coordinate of discovered) {
				if (hanging(coordinate[0], coordinate[1]) > 2) continue;
				const pieceValue = Math.sqrt(getPieceValue(coordinate[0], coordinate[1]));
				if (board.gameType.isSameTeam(i, defaultSideToMove)) {
					discovsEval += pieceValue / 2;
				} else {
					discovsEval -= pieceValue;
				}
			}
		}

		pinnedEval *= remainingReal / 6;
		discovsEval *= remainingReal / 6;
		if (discovsEval < 0) discovsEval /= 10;

		return { pinnedEval, discovsEval };
	}

	function getKingSafetyEval(player: NumericColor): { kingEval: number; checkableEval: number; exposedEval: number } {
		const { board, royal, boardSquares, remainingReal, data, variantData, defaultSideToMove } = boardAccessors;
		let kingEval = 0,
			checkableEval = 0,
			exposedEval = 0;
		if (variantData.giveaway) return { kingEval, checkableEval, exposedEval };
		const baseReferences: Coordinate[][][] = initializeBoardSquares(() => []);

		for (const [coordinate, attack] of board.preGeneratedAttacks[player].hoppingPieceLines) {
			baseReferences[attack[0]][attack[1]].push([coordinate[0], coordinate[1]]);
		}
		for (const [coordinate, line] of board.preGeneratedAttacks[player].slidingPiecesLines) {
			for (const attack of line) {
				baseReferences[attack[0]][attack[1]].push([coordinate[0], coordinate[1]]);
			}
		}

		const royalPiece = royal[player];
		const squareAccessDefinitions = new Set<string>();
		if (royalPiece) {
			const isChecked = Boolean(
				board.preGeneratedAttacks[player].slidingPieces[royalPiece[0]][royalPiece[1]] ||
					board.preGeneratedAttacks[player].hoppingPieces[royalPiece[0]][royalPiece[1]]
			);
			for (let i = 0; i < boardDimension; i++) {
				for (let j = 0; j < boardDimension; j++) {
					if (isChecked) {
						let checkableSq = 0;
						if (remainingReal === 2) {
							checkableSq -= 0.8;
						} else {
							const players = baseReferences[i][j].map((coord) => {
								const piece = boardSquares[coord[0]][coord[1]];
								if (!piece.isPiece()) return player;
								return piece.color;
							});

							const prev = data.nextTurn(player);
							const next = data.previousTurn(player);
							for (const player of players) {
								if (remainingReal === 3) {
									checkableSq -= player === next ? 3 : 2;
								} else if (remainingReal === 4) {
									checkableSq -= player === next ? 5 : player === prev ? 2 : 3;
								}
							}
						}

						const { defenders } = getCoverage(i, j, player);
						if (defenders.length) checkableSq += 2.5;
						if (checkableSq > 0) checkableSq = 0;

						const accessKey = stringifyKey(i, j);
						if (!squareAccessDefinitions.has(accessKey)) {
							exposedEval -= 0.123;
							squareAccessDefinitions.add(accessKey);
						}
						checkableEval += checkableSq;
					}
				}
			}

			const ki = royalPiece[0],
				kj = royalPiece[1];
			for (let d = 1; d < 3; d++) {
				const x = [ki, ki + d, ki - d];
				const y = [kj, kj + d, kj - d];
				for (const i of x) {
					for (const j of y) {
						// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
						if (!boardSquares[i]?.[j]) continue;
						if (i === ki && j === kj) continue;
						const pieceString = boardSquares[i][j];
						if (!pieceString.isPiece()) continue;
						if (board.gameType.isSameTeam(pieceString.color, player)) {
							kingEval += pieceString.piece === pawnPieceString.piece ? 2 : 1;
						} else {
							kingEval -= getPieceValue(i, j);
						}
					}
				}
			}

			for (let k = -1; k < 2; k++) {
				for (let h = -1; h < 2; h++) {
					const i = ki + k;
					const j = kj + h;
					// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
					if (!boardSquares[i]?.[j]) continue;
					const { attackers, defenders } = getCoverage(i, j, player);
					kingEval -= 2 * attackers.length;
					kingEval += 1 * defenders.length;
				}
			}
			kingEval /= 10;
		}

		if (variantData.nCheck && !board.gameType.isSameTeam(board.data.sideToMove, defaultSideToMove)) {
			const lives = data.fenOptions.tag("lives")[board.data.sideToMove];
			switch (lives) {
				case null:
					break;
				case 2:
					checkableEval *= 1.5;
					break;
				case 1:
					checkableEval *= 3;
					break;
				default:
					checkableEval *= 1.3;
			}
		}

		return { kingEval, checkableEval, exposedEval };
	}

	function isZombieEatZombie(move: MoveComponent): boolean {
		if (!verifyStandardMove(move)) return false;
		const { data, defaultSideToMove, boardSquares, variantData } = boardAccessors;
		if (variantData.giveaway) return false;
		const resigned = data.fenOptions.tag("resigned");

		if (!resigned[defaultSideToMove]) return false;
		const targetPiece = boardSquares[move.endCoordinates[0]][move.endCoordinates[1]];
		if (!targetPiece.isPiece()) return false;
		if (resigned[targetPiece.color]) return true;
		return false;
	}

	function getEval(move: MoveComponent): number {
		let totalEval = 0;
		const { board, data, defaultSideToMove, variantData, royal, isTeams } = boardAccessors;
		const snapshot = board.createSnapshot();

		const isKingsideCastle = data.fenOptions.isKingsideCastlingAvailable(data.sideToMove, board),
			isQueensideCastle = data.fenOptions.isQueensideCastlingAvailable(data.sideToMove, board);
		board.makeMove([move], true);
		board.pregenerateAttacks();
		boardAccessors = { ...boardAccessors, ...augmentBoardAccessorsFromBoard(board) };
		inspectCoverage();

		const { myMaterial, oppMaterial } = getMaterialEval();
		const hillEval = variantData.kingOfTheHill ? 416 / (3 * getDistFromHill(defaultSideToMove)) : 0;

		if (variantData.giveaway) {
			totalEval = -3 * myMaterial - oppMaterial - getCoordinationEval(defaultSideToMove) * 10 + hillEval;
		} else {
			totalEval += getMatesEval();

			const royalPiece = royal[defaultSideToMove];
			if (royalPiece) {
				const { attackers } = getCoverage(royalPiece[0], royalPiece[1], defaultSideToMove);
				if (attackers.length) totalEval -= 700;
			}

			totalEval += getMobilityEval(defaultSideToMove);
			totalEval += getCoordinationEval(defaultSideToMove);

			if (isTeams) {
				const partner = colors.find((v) => v !== defaultSideToMove && board.gameType.isSameTeam(defaultSideToMove, v));
				if (partner) Object.values(getKingSafetyEval(partner)).forEach((v) => (totalEval += v));
			}

			Object.values(getPinsEval()).forEach((v) => (totalEval += v));
			Object.values(getKingSafetyEval(defaultSideToMove)).forEach((v) => (totalEval += v));
			totalEval += myMaterial + oppMaterial + hillEval;
		}

		const isCastling =
			"specialType" in move && (move.specialType === SpecialMove.CastlingKingside || move.specialType === SpecialMove.CastlingQueenside);
		if (!isCastling && (isKingsideCastle || isQueensideCastle)) totalEval -= 0.5;
		if (isZombieEatZombie(move)) {
			totalEval -= 10000;
		}
		switch (board.moves.getHash(board.moves.constructPreliminaryHashString(board))) {
			case 1:
				totalEval -= 10000;
				break;
			case 2:
				totalEval -= 20000;
				break;
		}
		if (variantData.fiftyMoveRule && variantData.fiftyMoveRule - board.data.plyCount < 8) totalEval -= 150000;

		board.loadSnapshot(snapshot);
		return totalEval;
	}

	return {
		stringifiedType: ZombieType.Futer,
		evaluate(moves, board): Map<MoveComponent, number> {
			initializeBoardAccessorsFromBoard(board.createClone());

			const moveValues = new Map<MoveComponent, number>();
			for (const move of moves) {
				if (verifyInternalMove(move)) {
					switch (move.type) {
						case InternalMoveSignature.Resign:
						case InternalMoveSignature.Timeout:
							moveValues.set(move, -Infinity);
							break;
						case InternalMoveSignature.ClaimWin:
							moveValues.set(move, Infinity);
							break;
					}
				} else moveValues.set(move, getEval(move));
			}

			return moveValues;
		},
		pickPreferredMove(evaluations: Map<MoveComponent, number>) {
			const sorted = [...evaluations.entries()].sort((a, b) => b[1] - a[1]);
			const best: MoveComponent[] = [];

			for (const [move, evaluated] of sorted) {
				if (sorted[0][1] - evaluated > 0.5) break;
				best.push(move);
			}

			if (best.length > 5) best.length = 5;
			let pick = Math.floor(Math.random() * best.length);
			if (pick > 0 && Math.random() > 0.8) pick = 0;
			if (pick > 1 && Math.random() > 0.8) pick = 1;
			if (pick > 2 && Math.random() > 0.8) pick = 2;
			return randomlyPickNextChainedMoves(best[pick]);
		}
	};
}
export const comfuterAlgorithm = createBotAlgorithm(createComfuterAlgorithm());
