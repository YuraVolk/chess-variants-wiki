import type { SerializedInsufficientMaterialState } from "@moveGeneration/VariantRules/VariantRuleDefinitions/BoardVariantModules/InsufficientMaterial/StateSerializer";
import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface VariantGeneratedData {
	id: string;
	insufficientMaterialData: SerializedInsufficientMaterialState;
}

export const variantNamesAdapter = createEntityAdapter<VariantGeneratedData>();
export const variantNamesSlice = createSlice({
	name: "variantNames",
	initialState: variantNamesAdapter.getInitialState(),
	reducers: {
		addInsufficientMaterialState(state, action: PayloadAction<{ id: string; variantData: SerializedInsufficientMaterialState }>) {
			variantNamesAdapter.upsertOne(state, {
				id: action.payload.id,
				insufficientMaterialData: action.payload.variantData
			});
		}
	}
});
export const getVariantName = (state: RootState, id: string) => variantNamesAdapter.getSelectors().selectById(state.variantNames, id);

export const { addInsufficientMaterialState } = variantNamesSlice.actions;
export default variantNamesSlice.reducer;
