import type { Draft, EntityState, PayloadAction } from "@reduxjs/toolkit";
import type { ExtractVariantRuleByType, SidebarEditorInterface } from "../SidebarEditorInterface";
import type { StripPieceStringObjects } from "@moveGeneration/MoveTree/MoveTreeInterface";
import type { VariantDataRules } from "@moveGeneration/VariantRules/VariantRuleInterface";
import { sidebarEditorsAdapter } from "../SidebarEditorSlice";

export const variantRuleReducers = {
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
} satisfies Record<string, (state: Draft<EntityState<SidebarEditorInterface>>, action: never) => void>;
