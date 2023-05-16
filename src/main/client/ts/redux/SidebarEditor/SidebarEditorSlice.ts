import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import type { ExtractStateTagByType, ExtractVariantRuleByType, SidebarEditorInterface } from "./SidebarEditorInterface";
import { createNewGameBoard, updateInteractionSettings } from "@client/ts/logic/index/GameBoardSlice";
import { VariantType, totalPlayers } from "@moveGeneration/GameInformation/GameData";
import { emptyPieceString } from "@moveGeneration/GameInformation/GameUnits/PieceString";
import { initializeBoardSquares } from "@client/ts/logic/BaseInterfaces";
import type { NumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { assertNonUndefined, createTuple } from "@client/ts/baseTypes";
import { getNeighboringSideToMove } from "@moveGeneration/FENData/FENDataInterface";
import type { PlayerBooleanTuple } from "@moveGeneration/Board/Board";
import type { RootState } from "../store";
import type { VariantDataRules } from "@moveGeneration/VariantRules/VariantRuleInterface";
import { StripPieceStringObjects } from "@moveGeneration/MoveTree/MoveTreeInterface";

const baseFalsyColors = createTuple(false, totalPlayers);

export const sidebarEditorsAdapter = createEntityAdapter<SidebarEditorInterface>();
export const sidebarEditorsSlice = createSlice({
	name: "sidebarEditors",
	initialState: sidebarEditorsAdapter.getInitialState(),
	reducers: {
		changeDimensionValue: (state, action: PayloadAction<{ id: number; newValue: number; selectedId: 0 | 1 }>) => {
			const editor = sidebarEditorsAdapter.getSelectors().selectById(state, action.payload.id);
			if (!editor?.publicFENSettings) return;

			const newValues: [number, number] =
				action.payload.selectedId === 0
					? [action.payload.newValue, editor.publicFENSettings.fenOptions.dim[1]]
					: [editor.publicFENSettings.fenOptions.dim[0], action.payload.newValue];
			sidebarEditorsAdapter.updateOne(state, {
				type: "sidebarEditors/changeDimension",
				payload: {
					id: action.payload.id,
					changes: {
						publicFENSettings: {
							...editor.publicFENSettings,
							fenOptions: {
								...editor.publicFENSettings.fenOptions,
								dim: newValues
							}
						}
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
		toggleBooleanVariantRule: (state, action: PayloadAction<{ id: number; option: ExtractVariantRuleByType<boolean> }>) => {
			const { id, option } = action.payload;
			const editor = sidebarEditorsAdapter.getSelectors().selectById(state, id);
			if (!editor?.variantDataRules) return;

			sidebarEditorsAdapter.updateOne(state, {
				type: "sidebarEditors/toggleVariantRule",
				payload: {
					id,
					changes: {
						variantDataRules: {
							...editor.variantDataRules,
							[option]: !editor.variantDataRules[option]
						}
					}
				}
			});
		},
		changeParametrizedVariantRule: (
			state,
			action: PayloadAction<{
				id: number;
				option: Exclude<keyof VariantDataRules, ExtractVariantRuleByType<boolean>>;
				newValue: StripPieceStringObjects<VariantDataRules>[keyof VariantDataRules];
			}>
		) => {
			const { id, option, newValue } = action.payload;
			const editor = sidebarEditorsAdapter.getSelectors().selectById(state, id);
			if (!editor?.variantDataRules) return;

			sidebarEditorsAdapter.updateOne(state, {
				type: "sidebarEditors/changeParametrizedRule",
				payload: {
					id,
					changes: {
						variantDataRules: {
							...editor.variantDataRules,
							[option]: newValue
						}
					}
				}
			});
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
					serializedFEN: { board: "", moves: "" }
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

export const { changeDimensionValue, changeNumericColorValue, toggleBooleanValue, toggleBooleanVariantRule, changeParametrizedVariantRule } =
	sidebarEditorsSlice.actions;
export default sidebarEditorsSlice.reducer;

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const selectEditorSidebar = (state: RootState, id: number) => {
	const sidebarEditor = sidebarEditorsAdapter.getSelectors().selectById(state.sidebarEditors, id);
	if (process.env.NODE_ENV === "development") {
		assertNonUndefined(sidebarEditor);
		return sidebarEditor;
	}

	return sidebarEditor!;
};
export const selectEditorVariantType = (state: RootState, id: number) => selectEditorSidebar(state, id).variantType;
export const selectEditorBoardSquares = (state: RootState, id: number) => selectEditorSidebar(state, id).boardSquares;
export const selectEditorVariantDataRules = (state: RootState, id: number) => {
	const variantData = selectEditorSidebar(state, id).variantDataRules;
	if (process.env.NODE_ENV === "development") {
		assertNonUndefined(variantData);
		return variantData;
	}

	return variantData!;
};
export const selectEditorFENSettings = (state: RootState, id: number) => {
	const fenSettings = selectEditorSidebar(state, id).publicFENSettings;
	if (process.env.NODE_ENV === "development") {
		assertNonUndefined(fenSettings);
		return fenSettings;
	}

	return fenSettings!;
};
/* eslint-enable @typescript-eslint/no-non-null-assertion */
