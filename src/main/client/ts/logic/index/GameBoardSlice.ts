import { assertNonUndefined, createTuple } from "@client/ts/baseTypes";
import { BoardSquares, initializeBoardSquares } from "@client/ts/logic/BaseInterfaces";
import type { RootState } from "@client/ts/redux/store";
import type { PlayerBooleanTuple } from "@moveGeneration/Board/Board";
import type { DisplaySettings } from "@moveGeneration/Board/BoardInterface";
import { GameData, totalPlayers, VariantType } from "@moveGeneration/GameInformation/GameData";
import type { NumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { emptyPieceString, PieceStringObject } from "@moveGeneration/GameInformation/GameUnits/PieceString";
import type {
	MoveData,
	InternalMove,
	DroppingMove,
	Move,
	StripPieceStringObjects,
	ProcessSafeMoveWrapper
} from "@moveGeneration/MoveTree/MoveTreeInterface";
import type { VariantRulePublicProperties } from "@moveGeneration/VariantRules/VariantRule";
import type { VariantDataRules } from "@moveGeneration/VariantRules/VariantRuleInterface";
import { createEntityAdapter, createSlice, EntityState, PayloadAction } from "@reduxjs/toolkit";
import type { SerializedBoardStrings } from "../utils/Tags/InputOutputProcessing";
import type { PublicFENSettings } from "./GameBoardWorker";
import { boardReducers } from "./reducers/BoardReducers";
import { moveTreeReducers } from "./reducers/MoveTreeReducers";

export interface ChainedMoveSettings {
	promotionOptions?: StripPieceStringObjects<MoveData>;
	selectedPieceDrop?: PieceStringObject;
	seirawanDrops?: {
		move: StripPieceStringObjects<MoveData | InternalMove>;
		chainedMoves: Array<StripPieceStringObjects<DroppingMove>>;
	};
	duck?: StripPieceStringObjects<{
		move: MoveData | InternalMove;
		duckDroppingMove?: DroppingMove[];
		duckMove?: MoveData[];
	}>;
}

export interface GameBoardObjectSetProperties {
	currentMove: number[];
	moveTree: ProcessSafeMoveWrapper[];
	boardSquares: BoardSquares<PieceStringObject>;
	squareVisibility: BoardSquares<DisplaySettings[]>;
	serializedPGN: SerializedBoardStrings;
	variantType: VariantType;
	variantRules: Array<VariantRulePublicProperties<keyof VariantDataRules>>;
	allowedInternalMoves: Array<StripPieceStringObjects<InternalMove>>;
	publicFENSettings?: PublicFENSettings;
	variantDataRules?: StripPieceStringObjects<VariantDataRules>;
	gameData?: GameData;
	initiallyAliveColors: PlayerBooleanTuple;
}

export interface GameBoardObject extends GameBoardObjectSetProperties {
	id: number;
	currentFogPerspective: NumericColor | false;
	highlightedSquares: BoardSquares<StripPieceStringObjects<Move> | undefined>;
	chainedMoveSettings: ChainedMoveSettings;
	initializationComplete: boolean;
}

export const gameBoardsAdapter = createEntityAdapter<GameBoardObject>();
export const gameBoardsSlice = createSlice({
	name: "gameBoards",
	initialState: gameBoardsAdapter.getInitialState(),
	reducers: {
		...boardReducers,
		...moveTreeReducers,
		createNewGameBoard: (state: EntityState<GameBoardObject>, action: PayloadAction<{ id: number }>) => {
			const pieceStringObject = emptyPieceString.toObject();
			const newGameBoard: GameBoardObject = {
				id: action.payload.id,
				currentMove: [0],
				moveTree: [],
				boardSquares: initializeBoardSquares(() => pieceStringObject),
				highlightedSquares: initializeBoardSquares(() => undefined),
				squareVisibility: initializeBoardSquares(() => []),
				chainedMoveSettings: {},
				initializationComplete: false,
				serializedPGN: { board: "", moves: "" },
				variantRules: [],
				initiallyAliveColors: createTuple(true, totalPlayers),
				variantType: VariantType.FFA,
				allowedInternalMoves: [],
				currentFogPerspective: false
			};

			gameBoardsAdapter.addOne(state, newGameBoard);
		},
		resetInteractionSettings: (state: EntityState<GameBoardObject>, action: PayloadAction<{ id: number }>) => {
			const gameBoard = gameBoardsAdapter.getSelectors().selectById(state, action.payload.id);
			if (!gameBoard?.chainedMoveSettings.seirawanDrops) return;

			gameBoardsAdapter.updateOne(state, {
				type: "gameBoard/performResetInteractionSettings",
				payload: {
					id: action.payload.id,
					changes: {
						chainedMoveSettings: {},
						highlightedSquares: initializeBoardSquares(() => undefined)
					}
				}
			});
		},
		setChainedMoveSettings: (state: EntityState<GameBoardObject>, action: PayloadAction<{ id: number; settings: ChainedMoveSettings }>) => {
			const gameBoard = gameBoardsAdapter.getSelectors().selectById(state, action.payload.id);
			if (!gameBoard) return;

			gameBoardsAdapter.updateOne(state, {
				type: "gameBoard/performResetInteractionSettings",
				payload: {
					id: action.payload.id,
					changes: { chainedMoveSettings: action.payload.settings }
				}
			});
		},
		updateInteractionSettings: (
			state: EntityState<GameBoardObject>,
			action: PayloadAction<{ id: number; settings: Partial<GameBoardObjectSetProperties> }>
		) => {
			const gameBoard = gameBoardsAdapter.getSelectors().selectById(state, action.payload.id);
			if (!gameBoard) return;

			gameBoardsAdapter.updateOne(state, {
				type: "gameBoard/updateBoardInteractionSettings",
				payload: {
					id: action.payload.id,
					changes: {
						...action.payload.settings,
						highlightedSquares: initializeBoardSquares(() => undefined),
						chainedMoveSettings: {},
						initializationComplete: true
					}
				}
			});
		},
		changeCurrentMove: (state: EntityState<GameBoardObject>, action: PayloadAction<{ id: number; path: number[] }>) => {
			const { id, path } = action.payload;
			gameBoardsAdapter.updateOne(state, {
				type: "gameBoard/switchCurrentMove",
				payload: { id, changes: { currentMove: path } }
			});
		},
		changeCurrentFogPerspective: (
			state: EntityState<GameBoardObject>,
			action: PayloadAction<{ id: number; perspective: NumericColor | false; visibility: BoardSquares<DisplaySettings[]> }>
		) => {
			const { id, perspective, visibility } = action.payload;
			gameBoardsAdapter.updateOne(state, {
				type: "gameBoard/changeCurrentFogPerspective",
				payload: {
					id,
					changes: {
						currentFogPerspective: perspective,
						squareVisibility: visibility
					}
				}
			});
		}
	}
});
export const getCurrentMove = (state: RootState, id: number) => gameBoardsAdapter.getSelectors().selectById(state.gameBoards, id);

export const {
	createNewGameBoard,
	getChainedDuckMoves,
	getChainedSeirawanMoves,
	resetInteractionSettings,
	setChainedMoveSettings,
	getChainedDuckDrops,
	updateInteractionSettings,
	setLegalMoves,
	changeCurrentMove,
	goToBeginning,
	goToEnd,
	goToNextMove,
	goToNextPly,
	goToPreviousMove,
	goToPreviousPly,
	changeCurrentFogPerspective
} = gameBoardsSlice.actions;

export const selectGameBoard = (state: RootState, id: number) => {
	const gameBoard = gameBoardsAdapter.getSelectors().selectById(state.gameBoards, id);
	if (process.env.NODE_ENV === "development") {
		assertNonUndefined(gameBoard);
		return gameBoard;
	}

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return gameBoard!;
};
export const selectGameBoardCurrentMove = (state: RootState, id: number) => selectGameBoard(state, id).currentMove;
export const selectGameBoardMoveTree = (state: RootState, id: number) => selectGameBoard(state, id).moveTree;
export const selectGameBoardSquares = (state: RootState, id: number) => selectGameBoard(state, id).boardSquares;
export const selectGameBoardPGN = (state: RootState, id: number) => selectGameBoard(state, id).serializedPGN;
export const selectGameBoardType = (state: RootState, id: number) => selectGameBoard(state, id).variantType;
export const selectGameBoardRules = (state: RootState, id: number) => selectGameBoard(state, id).variantRules;
export const selectGameBoardFENSettings = (state: RootState, id: number) => {
	const fenSettings = selectGameBoard(state, id).publicFENSettings;
	if (process.env.NODE_ENV === "development") {
		assertNonUndefined(fenSettings);
		return fenSettings;
	}

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return fenSettings!;
};

export const selectSquareVisibility = (state: RootState, id: number) => selectGameBoard(state, id).squareVisibility;
export const selectInternalMoves = (state: RootState, id: number) => selectGameBoard(state, id).allowedInternalMoves;
export const selectGameBoardVariantData = (state: RootState, id: number) => {
	const variantDataRules = selectGameBoard(state, id).variantDataRules;
	if (process.env.NODE_ENV === "development") {
		assertNonUndefined(variantDataRules);
		return variantDataRules;
	}

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return variantDataRules!;
};
export const selectGameData = (state: RootState, id: number) => {
	const gameData = selectGameBoard(state, id).gameData;
	if (process.env.NODE_ENV === "development") {
		assertNonUndefined(gameData);
		return gameData;
	}

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return gameData!;
};
export const selectInitiallyAliveColors = (state: RootState, id: number) => selectGameBoard(state, id).initiallyAliveColors;
export const selectFogPerspective = (state: RootState, id: number) => selectGameBoard(state, id).currentFogPerspective;
export const selectHighlightedSquares = (state: RootState, id: number) => selectGameBoard(state, id).highlightedSquares;
export const selectChainedMoveSettings = (state: RootState, id: number) => selectGameBoard(state, id).chainedMoveSettings;

export default gameBoardsSlice.reducer;
