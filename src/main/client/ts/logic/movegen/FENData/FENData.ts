import { Cloneable, isVerticalPlacement, Memento } from "../../BaseInterfaces";
import type { Board, PlayerBooleanTuple } from "../Board/Board";
import {
	createDefaultArmyDeathSettings,
	createDefaultFENEffectSettings,
	FENDataSnapshot,
	getNeighboringSideToMove,
	PostMoveResults
} from "./FENDataInterface";
import {
	DroppingMove,
	InternalMove,
	InternalMoveSignature,
	MoveComponent,
	MoveData,
	SpecialMove,
	verifyDroppingMove,
	verifyInternalMove,
	verifyStandardMove
} from "../MoveTree/MoveTreeInterface";
import { Tuple, createTuple, throwOnNever } from "../../../baseTypes";
import {
	colors,
	DrawnResult,
	GeneralTermination,
	getPlayerNameFromColor,
	Result,
	Termination,
	totalPlayers,
	verifyDrawingTermination,
	verifyWinningTermination
} from "../GameInformation/GameData";
import { PieceString, createPieceFromData, emptyPieceString, deadColorIndex } from "../GameInformation/GameUnits/PieceString";
import { pieceControlConfigSettings } from "@moveGeneration/PieceControl/PieceControlInterface";
import { compareCoordinates } from "../Board/BoardInterface";
import { Coordinate, nonPlayablePieces, NumericColor, verifyNumericColor } from "../GameInformation/GameUnits/GameUnits";
import type { VariantHandlerTarget } from "../VariantRules/VariantRuleInterface";
import { FENOptions } from "./FENOptions/FENOptions";
import { PublicFENSettings } from "../../index/GameBoardWorker";

const defaultPointsForMate = 20;
class FENData implements VariantHandlerTarget<FENData>, Cloneable<FENData>, Memento<FENDataSnapshot> {
	points: [number, number, number, number];
	sideToMove: NumericColor;
	fenOptions: FENOptions;
	plyCount: number;
	board!: Board;
	private privateGameOver: Termination | false = false;

	static toFENDataFromPublicFENSettings(settings: PublicFENSettings) {
		const data = new FENData();
		data.fenOptions.tags = FENOptions.loadSerializedState(settings.fenOptions);
		data.points = [...settings.points];
		data.sideToMove = settings.sideToMove;
		data.plyCount = settings.plyCount;
		return data;
	}

	__baseClass: FENData;
	initDecoratorSettings() {
		/* no-op */
	}

	constructor() {
		this.points = [0, 0, 0, 0];
		this.sideToMove = 0;
		this.fenOptions = new FENOptions();
		this.plyCount = 0;
		this.__baseClass = this;
	}

	get gameOver() {
		return this.privateGameOver;
	}

	set gameOver(gameOver: Termination | false) {
		if (gameOver === false || this.privateGameOver === false) {
			this.privateGameOver = gameOver;
		}
	}

	injectBoard(board: Board) {
		this.board = board;
	}

	createClone(): FENData {
		const newFENData = new FENData();
		newFENData.fenOptions = this.fenOptions.createClone();
		newFENData.points = [...this.points];
		newFENData.sideToMove = this.sideToMove;
		newFENData.plyCount = this.plyCount;
		return newFENData;
	}

	createSnapshot(): FENDataSnapshot {
		return {
			points: [...this.points],
			sideToMove: this.sideToMove,
			fenOptionsSnapshot: this.fenOptions.createSnapshot(),
			plyCount: this.plyCount,
			gameOver: this.gameOver
		};
	}

	loadSnapshot(snapshot: FENDataSnapshot): void {
		this.fenOptions.loadSnapshot(snapshot.fenOptionsSnapshot);
		this.points = [...snapshot.points];
		this.sideToMove = snapshot.sideToMove;
		this.plyCount = snapshot.plyCount;
		this.privateGameOver = snapshot.gameOver;
	}

	getCapturedPieces(moveData: MoveData): Coordinate[] {
		const pieceString = this.board.board[moveData.endCoordinates[0]][moveData.endCoordinates[1]];
		return pieceString.isEmpty() || pieceString.isDead() ? [] : [[...moveData.endCoordinates]];
	}

	processStandardMove(moveData: MoveData): { endPiece: PieceString[] } {
		const {
			startCoordinates: [startI, startJ],
			endCoordinates: [endI, endJ],
			promotion
		} = moveData;
		const endPiece = this.board.board[endI][endJ];

		const piece = promotion?.[0] ?? this.board.board[startI][startJ];
		const capturedPieces = this.getCapturedPieces(moveData);
		this.board.board[endI][endJ] = piece;
		this.board.board[startI][startJ] = emptyPieceString;
		for (const coordinate of capturedPieces) {
			if (compareCoordinates(coordinate, moveData.startCoordinates)) {
				this.board.board[endI][endJ] = emptyPieceString;
			} else if (!compareCoordinates(coordinate, moveData.endCoordinates)) {
				this.board.board[coordinate[0]][coordinate[1]] = emptyPieceString;
			}
		}

		const [kingsidePiece, queensidePiece] = this.fenOptions.getCastlingPieceEndCoordinates(moveData.startCoordinates, this.sideToMove);
		if ("specialType" in moveData) {
			const type = moveData.specialType;

			switch (type) {
				case SpecialMove.CastlingKingside: {
					const secondKPiece = isVerticalPlacement(this.sideToMove)
						? this.board.board[startI][this.fenOptions.getKingsideCastlingTandemPiece(this.sideToMove)]
						: this.board.board[this.fenOptions.getKingsideCastlingTandemPiece(this.sideToMove)][startJ];
					const [kI, kJ] = this.fenOptions.getKingsideCastlingPieceEndCoordinate(this.sideToMove);

					this.board.board[kI][kJ] = secondKPiece;
					this.board.board[kingsidePiece[0]][kingsidePiece[1]] = emptyPieceString;
					break;
				}
				case SpecialMove.CastlingQueenside: {
					const secondQPiece = isVerticalPlacement(this.sideToMove)
						? this.board.board[startI][this.fenOptions.getQueensideCastlingTandemPiece(this.sideToMove)]
						: this.board.board[this.fenOptions.getQueensideCastlingTandemPiece(this.sideToMove)][startJ];
					const [qI, qJ] = this.fenOptions.getQueensideCastlingPieceEndCoordinate(this.sideToMove);
					this.board.board[qI][qJ] = secondQPiece;
					this.board.board[queensidePiece[0]][queensidePiece[1]] = emptyPieceString;
					break;
				}
				default:
					if (type === undefined || !(type in SpecialMove)) {
						console.error(`Unknown special move constant: ${String(type)}`);
					}
			}
		}

		const castleKingside = this.fenOptions.tag("castleKingside"),
			castleQueenside = this.fenOptions.tag("castleQueenside"),
			royal = this.fenOptions.tag("royal");
		this.fenOptions.setTag(
			"royal",
			this.fenOptions.tag("royal").map((r, i): Coordinate | null => {
				if (r) {
					if (r[0] === startI && r[1] === startJ) {
						castleKingside[i] = false;
						castleQueenside[i] = false;
						return [endI, endJ];
					} else return [...r];
				} else return null;
			})
		);

		for (const color of colors) {
			const royalPiece = royal[color];
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

		return { endPiece: endPiece.isEmpty() ? [] : [endPiece] };
	}

	protected spreadPointsBetweenPlayersEvenly() {
		const resigned = this.fenOptions.tag("resigned"),
			dead = this.fenOptions.tag("dead");
		const realPlayers = resigned.reduce((p, n, i) => p + Number(n || dead[i]), 0);
		const individualPoints = Math.ceil(this.obtainPointsForMate() / realPlayers);
		for (const color of colors) {
			if (!dead[color]) {
				this.assignPoints(color, individualPoints);
			}
		}
	}

	processInternalMove(internalMove: InternalMove): { stalemates: PlayerBooleanTuple } {
		const resigned = this.fenOptions.tag("resigned"),
			dead = this.fenOptions.tag("dead");
		const stalemates = createTuple(false, totalPlayers);
		const insufficientMaterial = this.board.insufficientMaterialChecker?.checkCurrentState(this.board).every((b, i) => {
			if (i === this.sideToMove) {
				return b;
			} else {
				return b || dead[i];
			}
		});

		switch (internalMove.type) {
			case InternalMoveSignature.Stalemate:
				dead[this.sideToMove] = true;
				stalemates[this.sideToMove] = true;
				break;
			case InternalMoveSignature.Resign:
			case InternalMoveSignature.Timeout:
				if (insufficientMaterial) {
					this.assignGeneralTermination("Timeout vs Insufficient Material");
				}
			// * Fallthrough
			case InternalMoveSignature.ClaimWin: {
				resigned[this.sideToMove] = true;
				this.turnPiecesDead(this.sideToMove, { ...createDefaultArmyDeathSettings(), excludeRoyals: true, doNotSetDead: true });
				const deadPlayers = dead.map((d, i) => d || resigned[i]).filter(Boolean);

				let isResignationOver = deadPlayers.length === totalPlayers - 1;
				if (insufficientMaterial) {
					this.spreadPointsBetweenPlayersEvenly();
				} else if (deadPlayers.length === totalPlayers - 1) {
					const alivePlayer = deadPlayers.findIndex((d) => !d);
					if (verifyNumericColor(alivePlayer)) {
						this.assignPoints(
							alivePlayer,
							this.countTotalPointsOnBoard().reduce((p, n, i) => p + (i === alivePlayer ? n : 0), 0)
						);
						isResignationOver = true;
					}
				} else if (!this.board.gameType.isFFA()) {
					isResignationOver = true;
				}

				if (isResignationOver) {
					this.gameOver = this.fenOptions.branchBetweenResignationMoves(internalMove.type, this.sideToMove);
				}
				break;
			}
			case InternalMoveSignature.DrawByAgreement:
				this.gameOver = "½-½ AGREED.";
				break;
			case InternalMoveSignature.Pass:
				break;
			case InternalMoveSignature.TeamsCheckmate: {
				this.gameOver = `CHECKMATE • ${this.getCurrentResult()}`;
				this.turnPiecesDead(this.sideToMove);
				this.turnPiecesDead(this.board.gameType.getTeammateColor(this.sideToMove));
				break;
			}
			default:
				throwOnNever(internalMove.type);
		}

		return { stalemates };
	}

	private processDroppingMove(move: DroppingMove) {
		const bank = this.fenOptions.tag("bank"),
			areBanksEnabled = this.fenOptions.tag("areBanksEnabled"),
			setupComplete = this.fenOptions.tag("setupComplete");
		if (!this.board.variantData.duckChess && !areBanksEnabled[this.sideToMove]) return;
		const playerBank = bank[this.sideToMove];
		const pieceStringReference = [...playerBank.keys()].find((pieceString) => pieceString.piece === move.piece.piece);
		if (!pieceStringReference && !this.board.variantData.duckChess && move.piece.piece !== nonPlayablePieces.duck) return;
		const safeReference = pieceStringReference ?? move.piece;

		this.board.board[move.endCoordinates[0]][move.endCoordinates[1]] = move.piece;

		if (!setupComplete[this.sideToMove]) return;
		const bankPieceCount = playerBank.get(safeReference);
		if (bankPieceCount == 1) {
			playerBank.delete(safeReference);
		} else if (bankPieceCount) {
			playerBank.set(safeReference, bankPieceCount - 1);
		}
	}

	turnPiecesDead(color: NumericColor, settings = createDefaultArmyDeathSettings()) {
		const royal = this.fenOptions.tag("royal"),
			dead = this.fenOptions.tag("dead");
		const royalPiece = royal[color];
		if (!settings.doNotSetDead) {
			dead[color] = true;
			royal[color] = null;
		}

		for (const coordinate of this.board.getPlayerPieces()[color]) {
			if (settings.excludeRoyals && royalPiece && compareCoordinates(coordinate, royalPiece)) continue;
			const piece = this.board.board[coordinate[0]][coordinate[1]].piece;
			if (settings.onlyPawns && !pieceControlConfigSettings[piece].moveGenerationSettings.isPawn) continue;
			this.board.board[coordinate[0]][coordinate[1]] = createPieceFromData(
				deadColorIndex,
				this.board.board[coordinate[0]][coordinate[1]].piece
			);
		}
	}

	private getKingCaptures() {
		const kingCaptures = createTuple(false, totalPlayers);
		for (const color of colors) {
			const royalCoordinate = this.fenOptions.tag("royal")[color];
			if (!royalCoordinate) continue;
			const pieceString = this.board.board[royalCoordinate[0]][royalCoordinate[1]];
			if (pieceString.isEmpty() || pieceString.color !== color) {
				kingCaptures[color] = true;
			}
		}

		return kingCaptures;
	}

	private processPointsForChecks(currentChecks: Tuple<Set<string>, typeof totalPlayers>) {
		const sideToMove = this.sideToMove;
		const updatedChecks = this.board.getCurrentChecks(),
			playerChecks = createTuple(false, totalPlayers);
		for (const color of colors) {
			for (const coordinate of updatedChecks[color]) {
				if (!currentChecks[color].has(coordinate)) {
					playerChecks[color] = true;
					break;
				}
			}
		}

		const checkedPlayers = playerChecks.filter(Boolean).length;
		if (checkedPlayers === 2) {
			this.assignPoints(sideToMove, 1);
		} else if (checkedPlayers === 3) {
			this.assignPoints(sideToMove, 5);
		}
	}

	affectOptions(move: MoveComponent, settings = createDefaultFENEffectSettings()): PostMoveResults {
		let moveStalemates: PlayerBooleanTuple | undefined;
		let endSquare: PieceString[] | undefined;
		const currentChecks = this.board.getCurrentChecks().map((arr) => new Set(arr));

		if (verifyInternalMove(move)) {
			moveStalemates = this.processInternalMove(move).stalemates;
		} else if (verifyStandardMove(move)) {
			endSquare = this.processStandardMove(move).endPiece;
		} else if (verifyDroppingMove(move)) {
			this.processDroppingMove(move);
		}

		if (!settings.ignoreCheckmateChecks) this.board.pregenerateAttacks();
		const { checkmates, stalemates, checks } = settings.ignoreCheckmateChecks
			? {
					checkmates: createTuple(false, totalPlayers),
					checks: createTuple(false, totalPlayers),
					stalemates: createTuple(false, totalPlayers)
			  }
			: this.board.getCheckmatesAndStalemates();
		if (moveStalemates) {
			for (let i = 0; i < totalPlayers; i++) {
				if (moveStalemates[i]) {
					stalemates[i] = true;
				}
			}
		}

		const totalMateSum = checkmates.reduce((p, n) => (n ? p + this.obtainPointsForMate() : p), 0);
		const boardAlternations = {
			pointDistribution: {
				checkmatePoints: checkmates.map((_, i) => (i === this.sideToMove ? totalMateSum : 0)),
				pieceCapturingPoints: createTuple(0, totalPlayers)
			}
		};

		if (endSquare) {
			for (const piece of endSquare) {
				boardAlternations.pointDistribution.pieceCapturingPoints[this.sideToMove] = this.getPointsForPiece(piece);
			}
		}

		const kingCaptures = this.getKingCaptures();
		const dead = this.fenOptions.tag("dead"),
			resigned = this.fenOptions.tag("resigned");
		if (this.board.gameType.isFFA()) {
			for (const color of colors) {
				if (dead[color] || resigned[color]) {
					continue;
				}
				if (checkmates[color] || (color === this.sideToMove && stalemates[color])) {
					this.turnPiecesDead(color);
					continue;
				}
				this.assignPoints(
					color,
					boardAlternations.pointDistribution.checkmatePoints[color] + boardAlternations.pointDistribution.pieceCapturingPoints[color]
				);
			}
		} else {
			for (const color of colors) {
				if (kingCaptures[color]) {
					this.turnPiecesDead(color);
					this.assignGeneralTermination("King Captured");
				}
			}
		}
		const realPlayers = this.getRealPlayers();
		const isOver = this.board.gameType.isFFA() ? realPlayers === 1 : realPlayers !== totalPlayers;
		if (isOver) this.assignGeneralTermination("Checkmate");

		if (!settings.ignoreNextTurn && !isOver) {
			this.processPointsForChecks(currentChecks);

			const insufficientPieces = this.board.insufficientMaterialChecker?.checkCurrentState(this.board);
			if (!this.gameOver && insufficientPieces?.every((insufficient, i) => dead[i] || insufficient)) {
				this.gameOver = `INSUFFICIENT MATERIAL • ${this.getCurrentResult()}`;
				this.spreadPointsBetweenPlayersEvenly();
			}
			if (this.getRealPlayers() > 1) {
				this.sideToMove = this.nextTurn();
			}
		}

		return { checkmates, stalemates, checks };
	}

	getRealPlayers() {
		const dead = this.fenOptions.tag("dead"),
			resigned = this.fenOptions.tag("resigned");

		let totalPlayers = 0;
		for (const color of colors) {
			if (resigned[color] || dead[color]) continue;
			totalPlayers++;
		}
		return totalPlayers;
	}

	nextTurn(player: NumericColor = this.sideToMove): NumericColor {
		if (this.getRealPlayers() <= 1) throw new Error("Next turn called while the game is terminated");
		return getNeighboringSideToMove(player, this.fenOptions.tag("dead"));
	}

	previousTurn(player: NumericColor = this.sideToMove): NumericColor {
		const dead = this.fenOptions.tag("dead");

		if (this.getRealPlayers() <= 1) throw new Error("Previous turn called while the game is terminated");
		let sideToMove: number = player;
		do {
			sideToMove = sideToMove === 0 ? totalPlayers - 1 : sideToMove - 1;
		} while (dead[sideToMove]);

		if (verifyNumericColor(sideToMove)) {
			return sideToMove;
		} else throw new Error(`Unexpected numeric color: ${sideToMove}`);
	}

	isComplexEvaluation() {
		return false;
	}

	obtainPointsForMate() {
		return defaultPointsForMate;
	}

	assignPoints(sideToMove: NumericColor, points: number) {
		if (points > 0) {
			this.points[sideToMove] += points;
		}
	}

	getPointsForPiece(pieceString: PieceString) {
		if (pieceString.isPiece() && this.board.gameType.isFFA()) {
			return pieceControlConfigSettings[pieceString.piece].points.singlesPoints;
		} else return 0;
	}

	countTotalPointsOnBoard(): Tuple<number, typeof totalPlayers> {
		const royal = this.fenOptions.tag("royal"),
			resigned = this.fenOptions.tag("resigned"),
			zombieImmune = this.fenOptions.tag("zombieImmune");

		const resultingPoints: Tuple<number, typeof totalPlayers> = [0, 0, 0, 0];
		this.board.getPlayerPieces().forEach((army, color) => {
			if (zombieImmune[color]) return;

			const royalPiece = royal[color];
			for (const coordinate of army) {
				if (royalPiece && compareCoordinates(coordinate, royalPiece)) {
					resultingPoints[color] += this.obtainPointsForMate();
				} else if (resigned[color]) {
					const piece = this.board.board[coordinate[0]][coordinate[1]].piece;
					resultingPoints[color] += pieceControlConfigSettings[piece].points.singlesPoints;
				}
			}
		});

		return resultingPoints;
	}

	getCurrentResult(): Result {
		if (this.board.gameType.isFFA()) {
			const dead = this.fenOptions.tag("dead"),
				resigned = this.fenOptions.tag("resigned");

			if (!this.board.isTwoPlayer) throw new Error("Result can only get called for 2P and teams");
			const max = Math.max(...this.points);
			let firstAlivePlayer: NumericColor | undefined, maximumIndex: NumericColor | undefined;
			for (const color of colors) {
				if (dead[color] || resigned[color]) continue;
				if (this.points[color] === max) {
					if (maximumIndex === undefined) {
						maximumIndex = color;
					} else return "½-½";
				}
				if (firstAlivePlayer === undefined) firstAlivePlayer = color;
			}

			return firstAlivePlayer === maximumIndex ? "1-0" : "0-1";
		} else {
			let result: Result = "½-½";
			for (const color of colors) {
				if (this.points[color] > 0) {
					result = this.board.gameType.teamSettings.firstTeamColors[color] ? "1-0" : "0-1";
					break;
				}
			}

			return result;
		}
	}

	assignGeneralTermination(generalTermination: GeneralTermination | DrawnResult, sideToMove?: NumericColor): void {
		if (this.board.gameType.isFFA() && !this.board.isTwoPlayer) {
			if (sideToMove !== undefined) {
				switch (generalTermination) {
					case "Stalemate":
						this.gameOver = `${getPlayerNameFromColor(sideToMove).toUpperCase()} STALEMATED!`;
						return;
				}
			}

			if (verifyWinningTermination(generalTermination)) {
				this.gameOver = `${generalTermination.toUpperCase()}!`;
			} else if (verifyDrawingTermination(generalTermination)) {
				this.gameOver = generalTermination.toUpperCase();
			} else {
				throwOnNever(generalTermination);
			}
		} else {
			this.gameOver = `${generalTermination.toUpperCase()} • ${this.getCurrentResult()}`;
		}
	}
}

export { FENData, FENOptions };
