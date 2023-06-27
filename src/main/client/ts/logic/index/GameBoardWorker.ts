import "reflect-metadata";
import { Board } from "@moveGeneration/Board/Board";
import { totalPlayers } from "@moveGeneration/GameInformation/GameData";
import type { PieceStringObject } from "@moveGeneration/GameInformation/GameUnits/PieceString";
import { PieceString } from "@moveGeneration/GameInformation/GameUnits/PieceString";
import type { InternalMove, StripPieceStringObjects } from "@moveGeneration/MoveTree/MoveTreeInterface";
import {
	MoveWrapper,
	ProcessSafeMoveWrapper,
	Move,
	MoveData,
	verifyStandardMove,
	MoveComponent,
	verifyDroppingMove,
	MoveTreeSnapshot,
	verifyRequiredMove
} from "@moveGeneration/MoveTree/MoveTreeInterface";
import { decorateClassWithVariants, VariantRule, VariantRulePublicProperties } from "@moveGeneration/VariantRules/VariantRule";
import type { VariantDataRules } from "@moveGeneration/VariantRules/VariantRuleInterface";
import { compareArrays } from "@utils/ArrayUtils";
import type { NumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { serializeBoard } from "../utils/Tags/InputOutputProcessing";
import { assertNonUndefined, createTuple, FunctionType, Tuple } from "@client/ts/baseTypes";
import type { GameBoardObjectSetProperties } from "./GameBoardSlice";
import { stringifyCoordinate } from "@moveGeneration/Board/BoardInterface";
import { changeGameTermination, validateMoveTree } from "@moveGeneration/MoveTree/MoveTreeValidator";
import { assertValidMove } from "@moveGeneration/MoveTree/MoveTree";
import { InsufficientMaterialConstructor } from "@moveGeneration/VariantRules/VariantRuleDefinitions/BoardVariantModules/InsufficientMaterial/InsufficientMaterialConstructor";
import { InsufficientMaterialChecker } from "@moveGeneration/VariantRules/VariantRuleDefinitions/BoardVariantModules/InsufficientMaterial/InsufficientMaterialChecker";
import * as StateSerializer from "@moveGeneration/VariantRules/VariantRuleDefinitions/BoardVariantModules/InsufficientMaterial/StateSerializer";
import { deserializeInsufficientMaterialState } from "@moveGeneration/VariantRules/VariantRuleDefinitions/BoardVariantModules/InsufficientMaterial/StateSerializer";
import type { BoardSquares } from "../BaseInterfaces";
import { FENData } from "@moveGeneration/FENData/FENData";
import type { EditorConstructSettings } from "@client/ts/redux/SidebarEditor/SidebarEditorInterface";
import { compileVariantRuleData, parseVariantRules, validateVariantRules } from "@moveGeneration/VariantRules/VariantRuleSetup";
import { createFENDataTag } from "../utils/Tags/TagLogic/FENDataTag";
import { wrapTag } from "../utils/Tags/Utils";
import { fenDataTag } from "../utils/Tags/TagLogic/FENDataTag";

export const requiredDispatches: Array<keyof RequestManager> = [];
export const initialDispatches: Array<keyof RequestManager> = [];
export const dispatchSyncRecord: Partial<Record<keyof RequestManager, keyof GameBoardObjectSetProperties>> = {};

function withWorkerResult() {
	return function (_: RequestManager, propertyKey: string, descriptor: TypedPropertyDescriptor<FunctionType>) {
		const originalMethod = descriptor.value;
		assertNonUndefined(originalMethod);
		descriptor.value = function (...args: unknown[]) {
			try {
				postMessage([propertyKey, originalMethod.apply(this, args)]);
			} catch {
				postMessage(["", undefined]);
			}
		};
	};
}

function workerDataSync(type: "required" | "initial", gameObjectPropertySync: keyof GameBoardObjectSetProperties) {
	return function (_: RequestManager, propertyKey: keyof RequestManager) {
		if (type === "required") {
			initialDispatches.push(propertyKey);
			requiredDispatches.push(propertyKey);
		} else {
			initialDispatches.push(propertyKey);
		}
		dispatchSyncRecord[propertyKey] = gameObjectPropertySync;
	};
}

export class RequestManager {
	private board = new Board("");
	private initiallyAliveColors = createTuple(true, totalPlayers);
	private internalMoves: InternalMove[] = [];
	private legalMoves = new Map<string, MoveData[]>();
	private fogOfWarPerspective: NumericColor | false = false;

	private stripPieceStrings<T>(object: T): StripPieceStringObjects<T> {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return JSON.parse(JSON.stringify(object));
	}

	private generateInitiallyAliveColors() {
		this.initiallyAliveColors = this.board.data.fenOptions
			.tag("dead")
			.map((d) => !d);
	}

	private generateCurrentMoves() {
		(this.internalMoves = this.board.getAllowedInternalMoves()), (this.legalMoves = new Map());
		for (const piece of this.board.getPlayerPieces()[this.board.data.sideToMove]) {
			this.legalMoves.set(stringifyCoordinate(piece), this.board.getLegalMoves(piece[0], piece[1]));
		}
	}

	construct(_variantName: string, pgn4: string, messageName = "construct") {
		try {
			let newBoard = new Board(pgn4);
			newBoard = decorateClassWithVariants(newBoard, Board, newBoard.variantRules.boardDecorators);
			this.generateInitiallyAliveColors();

			const insufficientMaterialModule = new InsufficientMaterialConstructor(newBoard, (state) => {
				newBoard.insufficientMaterialChecker = new InsufficientMaterialChecker(state, newBoard);
				newBoard.moves = validateMoveTree(newBoard, newBoard.moves);
				newBoard.moves.currentMove = [-1];
				changeGameTermination(newBoard);
				this.board = newBoard;
				this.generateCurrentMoves();
				postMessage([messageName, StateSerializer.serializeInsufficientMaterialState(state)]);
			});
			insufficientMaterialModule.generateInsufficientMaterialState();
		} catch (e) {
			console.trace(e);
			postMessage([messageName, undefined]);
		}

		return StateSerializer.serializeInsufficientMaterialState(
			new InsufficientMaterialConstructor(this.board, () => {
				/* empty */
			}).state
		);
	}

	@withWorkerResult()
	constructWithGeneratedData(pgn4: string, insufficientMaterialState: StateSerializer.SerializedInsufficientMaterialState) {
		const clone = this.board.createClone();
		try {
			this.board = new Board(pgn4);
			this.board = decorateClassWithVariants(this.board, Board, this.board.variantRules.boardDecorators);
			this.generateInitiallyAliveColors();

			this.board.insufficientMaterialChecker = new InsufficientMaterialChecker(
				deserializeInsufficientMaterialState(insufficientMaterialState),
				this.board
			);
			this.board.moves = validateMoveTree(this.board, this.board.moves);
			this.board.moves.currentMove = [-1];
			changeGameTermination(this.board);
			this.generateCurrentMoves();
		} catch {
			this.board = clone;
		}
	}

	unboundGetFENSettings() {
		const board = this.board;
		const royalCount = createTuple(0, totalPlayers);
		let isCustomRoyals = false;
		for (const row of this.board.board) {
			for (const square of row) {
				if (square.isPiece() && square.piece === "K" && ++royalCount[square.color] > 1) {
					isCustomRoyals = true;
					break;
				}
			}
			if (isCustomRoyals) break;
		}

		const points: Tuple<number, typeof totalPlayers> = [...board.data.points];
		return {
			sideToMove: board.data.sideToMove,
			points,
			isCustomRoyals,
			plyCount: board.data.plyCount,
			fenOptions: board.data.fenOptions.createSerializedState()
		};
	}

	setBoardDataFromFENTag(board: BoardSquares<PieceString>, data: FENData) {
		this.board.board = board;
		this.board.data = data;
	}

	@workerDataSync("required", "publicFENSettings")
	@withWorkerResult()
	getFENSettings() {
		return this.unboundGetFENSettings();
	}

	@workerDataSync("initial", "initiallyAliveColors")
	@withWorkerResult()
	getInitiallyAliveColors() {
		return this.initiallyAliveColors;
	}

	@workerDataSync("required", "moveTree")
	@withWorkerResult()
	getMoveTree() {
		const traverse = (moves: MoveWrapper[], fullMoveCounter = 0): ProcessSafeMoveWrapper[] => {
			const results: ProcessSafeMoveWrapper[] = [];

			for (const moveWrapper of moves) {
				const resultingWrapper: ProcessSafeMoveWrapper = {
					alternativeLines: [],
					comment: moveWrapper.comment,
					path: moveWrapper.path.slice(),
					cachedNames: { ...moveWrapper.cachedNames },
					metadata: {
						currentSideToMove: moveWrapper.metadata.currentSideToMove,
						playerClock: moveWrapper.metadata.playerClock,
						highlightedArrows: moveWrapper.metadata.highlightedArrows,
						highlightedSquares: moveWrapper.metadata.highlightedSquares
					}
				};
				if (moveWrapper.metadata.currentFullMove) resultingWrapper.metadata.currentFullMove = moveWrapper.metadata.currentFullMove;

				for (const alternativeLine of moveWrapper.alternativeLines) {
					resultingWrapper.alternativeLines.push(traverse(alternativeLine, fullMoveCounter - 1));
				}

				results.push(resultingWrapper);
			}

			return results;
		};

		return traverse(this.board.moves.moves);
	}

	@withWorkerResult()
	loadSnapshotByPath(path: number[]) {
		let snapshot: MoveTreeSnapshot;
		if (compareArrays(path, [-1])) {
			const preliminarySnapshot = this.board.moves.getBoardSnapshot(-1);
			assertNonUndefined(preliminarySnapshot);
			snapshot = preliminarySnapshot;
		} else {
			const currentMove = this.board.moves.getMove(path);
			assertValidMove(currentMove);
			const preliminarySnapshot = this.board.moves.getBoardSnapshot(currentMove);
			if (!preliminarySnapshot) return false;
			snapshot = preliminarySnapshot;
		}

		this.board.loadSnapshot(snapshot.boardSnapshot);
		this.board.moves.currentMove = [...path];
		this.generateCurrentMoves();

		return true;
	}

	private verifyNextChainedMovesAreDeleted(
		move: Partial<StripPieceStringObjects<MoveComponent>>
	): move is StripPieceStringObjects<MoveComponent> & { nextChainedMoves: never } {
		return !("nextChainedMoves" in move);
	}

	private convertStrippedMoveToNormal(move: StripPieceStringObjects<Move>): Move {
		const newMove: MoveComponent[] = [];
		for (const moveComponent of move) {
			delete moveComponent.nextChainedMoves;
			if (!this.verifyNextChainedMovesAreDeleted(moveComponent)) throw new Error("Could not delete nextChainedMoves in move component");

			if (verifyStandardMove(moveComponent)) {
				newMove.push({ ...moveComponent, promotion: moveComponent.promotion?.map((p) => PieceString.fromObjectToClass(p)) });
			} else if (verifyDroppingMove(moveComponent)) {
				newMove.push({ ...moveComponent, piece: PieceString.fromObjectToClass(moveComponent.piece) });
			} else newMove.push(moveComponent);
		}

		if (!verifyRequiredMove(newMove)) throw new Error("Supplied move object had 0 move components");
		return newMove;
	}

	@withWorkerResult()
	makeMove(passedMove: StripPieceStringObjects<Move>) {
		const board = this.board,
			move = this.convertStrippedMoveToNormal(passedMove);
		board.moves.augmentMoveWithMetadata({
			move,
			board,
			makeMoveFunction: () => {
				return board.makeMove(move);
			}
		});

		this.generateCurrentMoves();
	}

	@workerDataSync("required", "serializedPGN")
	@withWorkerResult()
	serializeBoardToPGN() {
		return serializeBoard(this.board);
	}

	@withWorkerResult()
	getDroppingMoves(pieceString: PieceStringObject) {
		if (this.board.data.gameOver) return [];
		return this.stripPieceStrings(this.board.getDroppingMoves(PieceString.fromObjectToClass(pieceString)));
	}

	@withWorkerResult()
	getLegalMoves(i: number, j: number) {
		if (this.board.data.gameOver) return [];
		return this.stripPieceStrings(this.legalMoves.get(stringifyCoordinate([i, j])) ?? this.board.getLegalMoves(i, j));
	}

	@workerDataSync("required", "allowedInternalMoves")
	@withWorkerResult()
	getInternalMoves() {
		if (this.board.data.gameOver) return [];
		return this.stripPieceStrings(this.internalMoves);
	}

	@workerDataSync("initial", "variantDataRules")
	@withWorkerResult()
	getVariantData() {
		return this.stripPieceStrings(this.board.variantData);
	}

	unboundGetBoard() {
		return this.board.board.map((r) => r.map((p) => p.toObject()));
	}

	@workerDataSync("required", "boardSquares")
	@withWorkerResult()
	getBoard() {
		return this.unboundGetBoard();
	}

	@workerDataSync("required", "gameData")
	@withWorkerResult()
	getGameData() {
		const newGameData = { ...this.board.gameData };
		if (typeof newGameData.date === "object") {
			newGameData.date = newGameData.date.toUTCString();
		}
		return newGameData;
	}

	@workerDataSync("required", "currentMove")
	@withWorkerResult()
	getCurrentMove() {
		return this.board.moves.currentMove;
	}

	@workerDataSync("initial", "variantRules")
	@withWorkerResult()
	getVariantRules() {
		const resultingRules: Array<VariantRulePublicProperties<keyof VariantDataRules>> = [];
		for (const variantRule of this.board.variantRules) {
			resultingRules.push(variantRule.getPublicProperties());
		}

		return resultingRules;
	}

	@workerDataSync("initial", "variantType")
	@withWorkerResult()
	getVariantType() {
		return this.board.gameType.type;
	}

	@withWorkerResult()
	deleteMove(path: number[]) {
		if (this.board.moves.moves.length !== 0) this.board.moves.deleteMove(path);
	}

	@withWorkerResult()
	playPreferredBotMove() {
		if (this.board.data.getRealPlayers() <= 1) return;
		const legalMoves: MoveComponent[] = [];
		for (const piece of this.board.getPlayerPieces()[this.board.data.sideToMove]) {
			legalMoves.push(...(this.legalMoves.get(stringifyCoordinate(piece)) ?? this.board.getLegalMoves(piece[0], piece[1])));
		}
		// TODO Pick strongest piece
		legalMoves.push(...this.board.preGeneratedAttacks[this.board.data.sideToMove].pieceDrops.piece);
		legalMoves.push(...this.board.preGeneratedAttacks[this.board.data.sideToMove].pieceDrops.pawn);
		legalMoves.push(...this.internalMoves);

		const algorithm = this.board.data.fenOptions.getDefaultZombieAlgorithm(this.board.data.sideToMove);
		const moves = algorithm.evaluate(legalMoves, this.board);
		return this.stripPieceStrings(algorithm.pickPreferredMove(moves));
	}

	@withWorkerResult()
	changeFogPerspective() {
		if (!this.board.variantData.fogOfWar || this.board.data.getRealPlayers() <= 1) return this.fogOfWarPerspective;
		if (this.fogOfWarPerspective === false) {
			this.fogOfWarPerspective = this.board.data.sideToMove;
		} else {
			const newPerspective = this.board.data.nextTurn(this.fogOfWarPerspective);
			if (newPerspective === this.board.data.sideToMove) {
				this.fogOfWarPerspective = false;
			} else this.fogOfWarPerspective = newPerspective;
		}

		return this.fogOfWarPerspective;
	}

	@workerDataSync("required", "squareVisibility")
	@withWorkerResult()
	getSquareVisibility() {
		if (this.fogOfWarPerspective === false) {
			return this.board.getSquareVisibility();
		} else {
			const sideToMove = this.board.data.sideToMove;
			this.board.data.sideToMove = this.fogOfWarPerspective;
			const squareVisibility = this.board.getSquareVisibility();
			this.board.data.sideToMove = sideToMove;
			return squareVisibility;
		}
	}

	createBoardFromSettings(settings: EditorConstructSettings) {
		const clone = this.board.createClone();
		try {
			clone.gameType.type = settings.variantType;
			clone.board = settings.boardSquares.map((r) => r.map((p) => PieceString.fromObjectToClass(p)));
			clone.gameData = settings.gameData;
			clone.data = FENData.toFENDataFromPublicFENSettings(settings.publicFENSettings);
			const fenTag = createFENDataTag();
			const dataReParsing = fenTag.parseTag(wrapTag(fenDataTag, fenTag.externalSerialize?.(clone.board, clone.data) ?? ""));
			(clone.board = dataReParsing.board), (clone.data = dataReParsing.fenData);

			const resultingRuleList: string[] = [];
			for (const rule of settings.variantRules.map(({ tag, value }) => {
				const variantRule = VariantRule.variantRuleList.find((rv) => new rv().getPublicProperties().information.tag === tag);
				assertNonUndefined(variantRule);
				return new variantRule(value);
			})) {
				const serializedForm = rule.serializeToParsingForm();
				if (serializedForm) {
					resultingRuleList.push(serializedForm);
				}
			}
			clone.variantRules = parseVariantRules(resultingRuleList.join(" "));
			clone.variantData = compileVariantRuleData(clone.variantRules);
			clone.variantRules = validateVariantRules(clone);

			this.construct("", serializeBoard(clone).board, "createBoardFromSettings");
		} catch {
			postMessage(["createBoardFromSettings", undefined]);
		}
	}
}

export type BoardWorkerRequest = keyof RequestManager;
export interface BoardWorkerRequestBody<K extends BoardWorkerRequest> {
	requestName: K;
	parameters: BoardWorkerArguments<K>;
}
export type PublicFENSettings = ReturnType<RequestManager["getFENSettings"]>;
export type BoardWorkerReturnType<K extends BoardWorkerRequest> = [K, ReturnType<RequestManager[K]>];
export type BoardWorkerArguments<K extends BoardWorkerRequest> = Parameters<RequestManager[K]>;

const requestManager = new RequestManager();
self.onmessage = <K extends BoardWorkerRequest>(e: MessageEvent<BoardWorkerRequestBody<K>>) => {
	if (!(e.data.requestName in RequestManager.prototype)) return;
	const method: FunctionType = RequestManager.prototype[e.data.requestName];
	method.apply(requestManager, e.data.parameters);
};
