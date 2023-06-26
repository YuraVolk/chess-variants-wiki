import type { Draft, EntityState, PayloadAction } from "@reduxjs/toolkit";
import type { SidebarEditorInterface } from "../SidebarEditorInterface";
import { sidebarEditorsAdapter } from "../SidebarEditorSlice";
import type { TimeControl } from "@moveGeneration/GameInformation/GameData";

export const gameMetadataReducers = {
	changeGameMetadataID: (state, action: PayloadAction<{ id: number; value: string }>) => {
		const { id, value } = action.payload;
		const numericValue = value.length ? Number(value) : undefined;
		const editor = sidebarEditorsAdapter.getSelectors().selectById(state, id);
		if (!editor?.gameData || (numericValue !== undefined && (numericValue < 0 || !Number.isSafeInteger(numericValue)))) return;

		sidebarEditorsAdapter.updateOne(state, {
			type: "sidebarEditors/updateGameMetadataID",
			payload: {
				id,
				changes: {
					gameData: {
						...editor.gameData,
						gameNumber: numericValue
					}
				}
			}
		});
	},
	changeTimeControl: (state, action: PayloadAction<{ id: number; timeControl: TimeControl }>) => {
		const { id, timeControl } = action.payload;
		const editor = sidebarEditorsAdapter.getSelectors().selectById(state, id);
		if (
			!editor?.gameData ||
			timeControl.baseTime <= 0 ||
			timeControl.increment < 0 ||
			!Number.isSafeInteger(timeControl.baseTime) ||
			!Number.isSafeInteger(timeControl.baseTime)
		) {
			return;
		}

        sidebarEditorsAdapter.updateOne(state, {
            type: "sidebarEditors/updateTimeControl",
            payload: {
                id,
                changes: {
                    gameData: {
                        ...editor.gameData,
                        timeControl: {
                            baseTime: Number(timeControl.baseTime.toFixed(2)),
                            increment: Number(timeControl.baseTime.toFixed(2)),
                            isDelay: timeControl.isDelay
                        }
                    }
                }
            }
        });
	}
} satisfies Record<string, (state: Draft<EntityState<SidebarEditorInterface>>, action: never) => void>;
