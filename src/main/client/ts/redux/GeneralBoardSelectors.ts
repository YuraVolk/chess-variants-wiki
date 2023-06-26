import {
	selectGameBoardCurrentMove,
	selectGameBoardFENSettings,
	selectGameBoardMoveTree,
	selectGameBoardPGN,
	selectGameBoardSquares,
	selectGameBoardType,
	selectGameBoardVariantData,
	selectGameData
} from "../logic/index/GameBoardSlice";
import {
	selectEditorBoardSquares,
	selectEditorFENSettings,
	selectEditorSidebar,
	selectEditorVariantDataRules,
	selectEditorVariantType
} from "./SidebarEditor/SidebarEditorSlice";
import type { RootState } from "./store";

export type StateControllerValue = "gameBoards" | "sidebarEditors";
interface GeneralSelectorParameters {
	state: RootState;
	id: number;
	stateController: StateControllerValue;
}
export const selectVariantType = (parameters: GeneralSelectorParameters) =>
	parameters.stateController === "gameBoards"
		? selectGameBoardType(parameters.state, parameters.id)
		: selectEditorVariantType(parameters.state, parameters.id);
export const selectVariantData = (parameters: GeneralSelectorParameters) =>
	parameters.stateController === "gameBoards"
		? selectGameBoardVariantData(parameters.state, parameters.id)
		: selectEditorVariantDataRules(parameters.state, parameters.id);
export const selectFENSettings = (parameters: GeneralSelectorParameters) =>
	parameters.stateController === "gameBoards"
		? selectGameBoardFENSettings(parameters.state, parameters.id)
		: selectEditorFENSettings(parameters.state, parameters.id);
export const selectCurrentMove = (parameters: GeneralSelectorParameters) =>
	parameters.stateController === "gameBoards"
		? selectGameBoardCurrentMove(parameters.state, parameters.id)
		: selectEditorSidebar(parameters.state, parameters.id).currentMove;
export const selectMoveTree = (parameters: GeneralSelectorParameters) =>
	parameters.stateController === "gameBoards"
		? selectGameBoardMoveTree(parameters.state, parameters.id)
		: selectEditorSidebar(parameters.state, parameters.id).moveTree;
export const selectBoardSquares = (parameters: GeneralSelectorParameters) =>
	parameters.stateController === "gameBoards"
		? selectGameBoardSquares(parameters.state, parameters.id)
		: selectEditorBoardSquares(parameters.state, parameters.id);
export const selectSerializedStrings = (parameters: GeneralSelectorParameters) =>
	parameters.stateController === "gameBoards"
		? selectGameBoardPGN(parameters.state, parameters.id)
		: selectEditorSidebar(parameters.state, parameters.id).serializedFEN;
export const selectGeneralGameData = (parameters: GeneralSelectorParameters) =>
	parameters.stateController === "gameBoards"
		? selectGameData(parameters.state, parameters.id)
		: selectEditorSidebar(parameters.state, parameters.id);
