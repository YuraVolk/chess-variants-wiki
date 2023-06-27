import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import type { SidebarEditorInterface } from "./SidebarEditorInterface";
import { createNewGameBoard, updateInteractionSettings } from "@client/ts/logic/index/GameBoardSlice";
import { VariantType, totalPlayers } from "@moveGeneration/GameInformation/GameData";
import { emptyPieceString } from "@moveGeneration/GameInformation/GameUnits/PieceString";
import { initializeBoardSquares } from "@client/ts/logic/BaseInterfaces";
import { assertDevOnly, createTuple } from "@client/ts/baseTypes";
import type { RootState } from "../store";
import { createFENDataTag, fenDataTag } from "@client/ts/logic/utils/Tags/TagLogic/FENDataTag";
import { wrapTag } from "@client/ts/logic/utils/Tags/Utils";
import { RequestManager } from "@client/ts/logic/index/GameBoardWorker";
import { fenTagReducers } from "./reducers/ConcreteFENReducers";
import { variantRuleReducers } from "./reducers/VariantRuleReducers";
import { pieceDroppingReducers } from "./reducers/PieceDroppingReducers";
import { generalFENReducers } from "./reducers/GeneralFENReducers";
import { gameMetadataReducers } from "./reducers/GameMetadataReducers";

export const sidebarEditorsAdapter = createEntityAdapter<SidebarEditorInterface>();
export const sidebarEditorsSlice = createSlice({
	name: "sidebarEditors",
	initialState: sidebarEditorsAdapter.getInitialState(),
	reducers: {
		...fenTagReducers,
		...variantRuleReducers,
		...pieceDroppingReducers,
		...generalFENReducers,
		...gameMetadataReducers,
		loadFEN4fromString: (state, action: PayloadAction<{ id: number; fen4: string }>) => {
			const { id, fen4 } = action.payload;
			const editor = sidebarEditorsAdapter.getSelectors().selectById(state, id);
			if (!editor?.publicFENSettings) return;

			const fenTag = createFENDataTag();
			try {
				const { board, fenData } = fenTag.parseTag(wrapTag(fenDataTag, fen4));
				const requestManager = new RequestManager();
				requestManager.setBoardDataFromFENTag(board, fenData);
				const newFENSettings = requestManager.unboundGetFENSettings();
				const boardSquares = requestManager.unboundGetBoard();
				
				sidebarEditorsAdapter.updateOne(state, {
					type: "sidebarEditors/loadFEN4fromString",
					payload: {
						id,
						changes: {
							publicFENSettings: newFENSettings,
							boardSquares
						}
					}
				});
			} catch { /* empty */ }
		}
	},
	extraReducers: (builder) => {
		builder.addCase(createNewGameBoard, (state, action) => {
			const emptyPieceStringObject = emptyPieceString.toObject();
			sidebarEditorsAdapter.addOne(state, {
				type: "sidebarEditors/createNew",
				payload: {
					id: action.payload.id,
					variantType: VariantType.FFA,
					boardSquares: initializeBoardSquares(() => emptyPieceStringObject),
					variantDataRules: undefined,
					publicFENSettings: undefined,
					currentMove: [-1],
					moveTree: [],
					serializedFEN: { board: "", moves: "" },
					isDroppingEnabled: false,
					initiallyAliveColors: createTuple(true, totalPlayers)
				}
			});
		});

		builder.addCase(updateInteractionSettings, (state, action) => {
			const resultingObject: Partial<SidebarEditorInterface> = {};
			const payload = action.payload.settings,
				id = action.payload.id;
			const editor = sidebarEditorsAdapter.getSelectors().selectById(state, id);
			if (!editor) return;

			if (payload.variantType) resultingObject.variantType = payload.variantType;
			if (payload.boardSquares) resultingObject.boardSquares = payload.boardSquares;
			if (payload.variantDataRules) resultingObject.variantDataRules = payload.variantDataRules;
			if (payload.publicFENSettings) resultingObject.publicFENSettings = payload.publicFENSettings;
			if (payload.gameData) resultingObject.gameData = payload.gameData;
			if (payload.initiallyAliveColors) resultingObject.initiallyAliveColors = payload.initiallyAliveColors;
			sidebarEditorsAdapter.updateOne(state, {
				type: "sidebarEditors/syncSettings",
				payload: {
					id,
					changes: resultingObject
				}
			});
		});
	}
});

export const {
	changeDimensionValue,
	changeNumericColorValue,
	toggleBooleanValue,
	toggleBooleanTupleValue,
	toggleBooleanVariantRule,
	changeParametrizedVariantRule,
	dropPiece,
	setCurrentDroppedPiece,
	deleteDroppedPiece,
	toggleEnabledSquares,
	disableEnabledSquares,
	changeSideToMove,
	selectCoordinateBasedTag,
	deleteRoyal,
	setCoordinateBasedTagSquare,
	changeParametrizedFENTag,
	changeSimpleParametrizedFENTag,
	loadFEN4fromString,
	changeGameMetadataID,
	changeTimeControl,
	changePlayerName,
	changePlayerElo,
	changeOriginatingWebsite,
	changePlayingDate,
	setResult,
	changeTermination
} = sidebarEditorsSlice.actions;
export default sidebarEditorsSlice.reducer;

export const selectEditorSidebar = (state: RootState, id: number) => {
	const sidebarEditor = sidebarEditorsAdapter.getSelectors().selectById(state.sidebarEditors, id);
	assertDevOnly(sidebarEditor !== undefined);
	return sidebarEditor;
};
export const selectEditorVariantType = (state: RootState, id: number) => selectEditorSidebar(state, id).variantType;
export const selectEditorBoardSquares = (state: RootState, id: number) => selectEditorSidebar(state, id).boardSquares;
export const selectEditorVariantDataRules = (state: RootState, id: number) => {
	const variantData = selectEditorSidebar(state, id).variantDataRules;
	assertDevOnly(variantData !== undefined);
	return variantData;
};
export const selectEditorFENSettings = (state: RootState, id: number) => {
	const fenSettings = selectEditorSidebar(state, id).publicFENSettings;
	assertDevOnly(fenSettings !== undefined);
	return fenSettings;
};
export const selectEditorGameData = (state: RootState, id: number) => {
	const gameData = selectEditorSidebar(state, id).gameData;
	assertDevOnly(gameData !== undefined);
	return gameData;
};
export const selectEditorInitiallyAliveColors = (state: RootState, id: number) => selectEditorSidebar(state, id).initiallyAliveColors;
