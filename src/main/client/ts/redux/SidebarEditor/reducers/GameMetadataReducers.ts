import type { Draft, EntityState, PayloadAction } from "@reduxjs/toolkit";
import type { SidebarEditorInterface } from "../SidebarEditorInterface";
import { sidebarEditorsAdapter } from "../SidebarEditorSlice";
import type { TimeControl } from "@moveGeneration/GameInformation/GameData";
import type { NumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { URL_REGEX } from "@utils/BrowserUtils";
import { formatToInputLocalDateTime } from "@utils/ObjectUtils";

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
	},
	changePlayerName: (state, action: PayloadAction<{ id: number; index: NumericColor; newValue: string }>) => {
		const { id, index, newValue } = action.payload;
		const editor = sidebarEditorsAdapter.getSelectors().selectById(state, id);
		if (!editor?.gameData) return;

		sidebarEditorsAdapter.updateOne(state, {
			type: "sidebarEditors/updatePlayerName",
			payload: {
				id,
				changes: {
					gameData: {
						...editor.gameData,
						players: editor.gameData.players.map((playerData, i) => {
							if (i !== index) return playerData;
							const playerDataCopy = { ...playerData };
							if (newValue.length) {
								playerDataCopy.name = newValue;
							} else delete playerDataCopy.name;

							return playerDataCopy;
						})
					}
				}
			}
		});
	},
	changePlayerElo: (state, action: PayloadAction<{ id: number; index: NumericColor; newValue: string }>) => {
		const { id, index } = action.payload,
			newValue = Number(action.payload.newValue);
		const editor = sidebarEditorsAdapter.getSelectors().selectById(state, id);
		if (!editor?.gameData || (action.payload.newValue.length && (!Number.isSafeInteger(newValue)) || newValue <= 0 || newValue > 9999)) {
			return;
		}

		sidebarEditorsAdapter.updateOne(state, {
			type: "sidebarEditors/updatePlayerName",
			payload: {
				id,
				changes: {
					gameData: {
						...editor.gameData,
						players: editor.gameData.players.map((playerData, i) => {
							if (i !== index) return playerData;
							const playerDataCopy = { ...playerData };
							if (action.payload.newValue.length) {
								playerDataCopy.elo = newValue;
							} else delete playerDataCopy.elo;

							return playerDataCopy;
						})
					}
				}
			}
		});
	},
	changeOriginatingWebsite: (state, action: PayloadAction<{ id: number; newValue: string }>) => {
		const { id, newValue } = action.payload;
		const editor = sidebarEditorsAdapter.getSelectors().selectById(state, id);
		if (!editor?.gameData || (newValue.length && !URL_REGEX.test(newValue))) return;

		const newEditorGameData = { ...editor.gameData };
		if (newValue.length) {
			newEditorGameData.site = newValue;
		} else delete newEditorGameData.site;
		 
		sidebarEditorsAdapter.updateOne(state, {
			type: "sidebarEditors/updateOriginatingWebsite",
			payload: {
				id,
				changes: {
					gameData: newEditorGameData
				}
			}
		});
	},
	changePlayingDate: (state, action: PayloadAction<{ id: number, newValue: string }>) => {
		const { id, newValue } = action.payload;
		const editor = sidebarEditorsAdapter.getSelectors().selectById(state, id);
		if (!editor?.gameData || isNaN(Date.parse(newValue))) return;

		const newEditorGameData = { ...editor.gameData };
		if (newValue.length) {
			newEditorGameData.date = formatToInputLocalDateTime(new Date(newValue));
		} else delete newEditorGameData.date;

		sidebarEditorsAdapter.updateOne(state, {
			type: "sidebarEditors/updateOriginatingWebsite",
			payload: {
				id,
				changes: {
					gameData: newEditorGameData
				}
			}
		});
	}
} satisfies Record<string, (state: Draft<EntityState<SidebarEditorInterface>>, action: never) => void>;
