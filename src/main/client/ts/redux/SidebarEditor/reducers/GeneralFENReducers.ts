import type { Draft, EntityState, PayloadAction } from "@reduxjs/toolkit";
import type { ExtractStateTagByType, SidebarEditorInterface } from "../SidebarEditorInterface";
import type { FENOptionsSerializedState, FENOptionsTags } from "@moveGeneration/FENData/FENOptions/FENOptionsTagsInterface";
import { sidebarEditorsAdapter } from "../SidebarEditorSlice";
import type { PlayerBooleanTuple } from "@moveGeneration/Board/Board";
import { getNeighboringSideToMove } from "@moveGeneration/FENData/FENDataInterface";
import type { NumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { SimplexType, Tuple, createTuple } from "@client/ts/baseTypes";
import { totalPlayers } from "@moveGeneration/GameInformation/GameData";

const baseFalsyColors = createTuple(false, totalPlayers);
export const generalFENReducers = {
	selectCoordinateBasedTag: (state, action: PayloadAction<{ id: number; newTag: keyof FENOptionsTags }>) => {
		const { id, newTag } = action.payload;
		const editor = sidebarEditorsAdapter.getSelectors().selectById(state, id);
		if (!editor) return;

		sidebarEditorsAdapter.updateOne(state, {
			type: "sidebarEditors/selectCoordinateBasedTag",
			payload: {
				id,
				changes: {
					selectedCoordinateFENtag: editor.selectedCoordinateFENtag === newTag ? undefined : newTag
				}
			}
		});
	},
	changeNumericColorValue: (state, action: PayloadAction<{ id: number; option: ExtractStateTagByType<NumericColor> }>) => {
		const { id, option } = action.payload;
		const editor = sidebarEditorsAdapter.getSelectors().selectById(state, id);
		if (!editor?.publicFENSettings) return;

		sidebarEditorsAdapter.updateOne(state, {
			type: "sidebarEditors/changeNumericColorValue",
			payload: {
				id,
				changes: {
					publicFENSettings: {
						...editor.publicFENSettings,
						fenOptions: {
							...editor.publicFENSettings.fenOptions,
							[option]: getNeighboringSideToMove(editor.publicFENSettings.fenOptions[option], baseFalsyColors)
						}
					}
				}
			}
		});
	},
	toggleBooleanValue: (state, action: PayloadAction<{ id: number; option: ExtractStateTagByType<boolean> }>) => {
		const { id, option } = action.payload;
		const editor = sidebarEditorsAdapter.getSelectors().selectById(state, id);
		if (!editor?.publicFENSettings) return;

		sidebarEditorsAdapter.updateOne(state, {
			type: "sidebarEditors/toggleBooleanValue",
			payload: {
				id,
				changes: {
					publicFENSettings: {
						...editor.publicFENSettings,
						fenOptions: {
							...editor.publicFENSettings.fenOptions,
							[option]: !editor.publicFENSettings.fenOptions[option]
						}
					}
				}
			}
		});
	},
	toggleBooleanTupleValue: (
		state,
		action: PayloadAction<{ id: number; index: NumericColor; option: ExtractStateTagByType<PlayerBooleanTuple> }>
	) => {
		const { id, option, index } = action.payload;
		const editor = sidebarEditorsAdapter.getSelectors().selectById(state, id);
		if (!editor?.publicFENSettings) return;

		const newValue: PlayerBooleanTuple = [...editor.publicFENSettings.fenOptions[option]];
		newValue[index] = !newValue[index];
		sidebarEditorsAdapter.updateOne(state, {
			type: "sidebarEditors/toggleBooleanTupleValue",
			payload: {
				id,
				changes: {
					publicFENSettings: {
						...editor.publicFENSettings,
						fenOptions: {
							...editor.publicFENSettings.fenOptions,
							[option]: newValue
						}
					}
				}
			}
		});
	},
	changeParametrizedFENTag: (
		state,
		action: PayloadAction<{
			id: number;
			option: ExtractStateTagByType<Tuple<Exclude<SimplexType, boolean>, typeof totalPlayers>>;
			newValue: FENOptionsSerializedState[ExtractStateTagByType<Tuple<Exclude<SimplexType, boolean>, typeof totalPlayers>>][NumericColor];
			index: NumericColor;
		}>
	) => {
		const { id, option, newValue, index } = action.payload;
		const editor = sidebarEditorsAdapter.getSelectors().selectById(state, id);
		if (!editor?.publicFENSettings) return;

		const newArray: Tuple<Exclude<SimplexType, boolean>, typeof totalPlayers> = [...editor.publicFENSettings.fenOptions[option]];
		newArray[index] = newValue;
		sidebarEditorsAdapter.updateOne(state, {
			type: "sidebarEditors/changeParametrizedFENTag",
			payload: {
				id,
				changes: {
					publicFENSettings: {
						...editor.publicFENSettings,
						fenOptions: {
							...editor.publicFENSettings.fenOptions,
							[option]: newArray
						}
					}
				}
			}
		});
	},
	changeSimpleParametrizedFENTag: (
		state,
		action: PayloadAction<{
			id: number;
			option: ExtractStateTagByType<Exclude<SimplexType, object>>;
			newValue: FENOptionsSerializedState[ExtractStateTagByType<Exclude<SimplexType, object>>];
		}>
	) => {
		const { id, option, newValue } = action.payload;
		const editor = sidebarEditorsAdapter.getSelectors().selectById(state, id);
		if (!editor?.publicFENSettings) return;

		sidebarEditorsAdapter.updateOne(state, {
			type: "sidebarEditors/changeSimpleParametrizedFENTag",
			payload: {
				id,
				changes: {
					publicFENSettings: {
						...editor.publicFENSettings,
						fenOptions: {
							...editor.publicFENSettings.fenOptions,
							[option]: newValue
						}
					}
				}
			}
		});
	}
} satisfies Record<string, (state: Draft<EntityState<SidebarEditorInterface>>, action: never) => void>;
