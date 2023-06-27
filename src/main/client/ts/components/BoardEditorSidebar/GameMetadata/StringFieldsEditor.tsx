import React, { useState, useContext, useId, useMemo } from "react";
import styles from "../EditorSidebar.module.scss";
import { GameDisplayContext } from "@components/BoardComponents/BoardContext";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@client/ts/redux/store";
import { hashString } from "@utils/StringFormatUtils";
import * as SidebarEditor from "@client/ts/redux/SidebarEditor/SidebarEditorSlice";
import { formatToInputLocalDateTime } from "@utils/ObjectUtils";
import { createSelector } from "@reduxjs/toolkit";
import * as GameData from "@moveGeneration/GameInformation/GameData";

const selectAllowedTerminations = () =>
	createSelector(
		[
			SidebarEditor.selectEditorVariantDataRules,
			SidebarEditor.selectEditorFENSettings,
			SidebarEditor.selectEditorInitiallyAliveColors,
			SidebarEditor.selectEditorVariantType
		],
		({ kingOfTheHill, taboo, threefoldRepetition, fiftyMoveRule }, { fenOptions: { wb } }, initiallyAliveColors, variantType) => {
			const terminationArray: Array<GameData.Termination | undefined> = [undefined, "½-½ AGREED."];

			for (const color of GameData.colors) {
				if (!initiallyAliveColors[color]) continue;
				const name = GameData.getPlayerNameFromColor(color, wb).toUpperCase();

				for (const termination of GameData.individualTerminations) {
					if (termination === "Won the Race" && (!kingOfTheHill || !taboo)) continue;
					terminationArray.push(`${name} ${termination.toUpperCase()}!`);
				}
			}

			if (variantType === GameData.VariantType.Teams || initiallyAliveColors.filter(Boolean).length === 2) {
				for (const endResult of GameData.results) {
					for (const winningTermination of GameData.generalWinningTerminations) {
						if (winningTermination === "King of the Hill" && !kingOfTheHill) continue;
						terminationArray.push(`${winningTermination.toUpperCase()} • ${endResult.toUpperCase()}`);
					}

					for (const drawnTermination of GameData.generalDrawingTerminations) {
						if (drawnTermination === "50-move Rule" && fiftyMoveRule === Infinity) continue;
						if (drawnTermination === "Threefold Repetition" && threefoldRepetition === Infinity) continue;
						terminationArray.push(`${drawnTermination.toUpperCase()} • ${endResult.toUpperCase()}`);
					}
				}
			}

			for (const winningTermination of GameData.generalWinningTerminations) {
				if (winningTermination === "King of the Hill" && !kingOfTheHill) continue;
				terminationArray.push(`${winningTermination.toUpperCase()}!`);
			}

			for (const drawnTermination of GameData.generalDrawingTerminations) {
				if (drawnTermination === "50-move Rule" && fiftyMoveRule === Infinity) continue;
				if (drawnTermination === "Threefold Repetition" && threefoldRepetition === Infinity) continue;
				terminationArray.push(drawnTermination.toUpperCase());
			}

			return terminationArray;
		}
	);

export const StringFieldsEditor = () => {
	const { id } = useContext(GameDisplayContext);
	const dispatch = useDispatch<AppDispatch>();
	const hash = hashString(useId());
	const [siteName, setSiteName] = useState(
		useSelector<RootState, string | undefined>((state) => SidebarEditor.selectEditorGameData(state, id).site)
	);
	const date = useSelector<RootState, string | Date | undefined>((state) => SidebarEditor.selectEditorGameData(state, id).date);
	const result = useSelector<RootState, string | undefined>((state) => SidebarEditor.selectEditorGameData(state, id).result);
	const termination = useSelector<RootState, string | undefined>((state) => SidebarEditor.selectEditorGameData(state, id).termination);
	const allowedTerminationsSelector = useMemo(() => selectAllowedTerminations(), []);
	const allowedTerminations = useSelector<RootState, Array<GameData.Termination | undefined>>((state) =>
		allowedTerminationsSelector(state, id)
	);

	return (
		<>
			<label className={`${styles["fen-tags__text"]} ${styles["fen-tags__text--compact"]}`} htmlFor={`game-origin-website-${hash}`}>
				Originating website
			</label>
			<input
				className={styles["fen-tags__input"]}
				id={`game-origin-website-${hash}`}
				type="text"
				value={siteName}
				onChange={(e) => setSiteName(e.target.value)}
				onBlur={(e) => dispatch(SidebarEditor.changeOriginatingWebsite({ id, newValue: e.target.value }))}
			/>
			<label className={`${styles["fen-tags__text"]} ${styles["fen-tags__text--compact"]}`} htmlFor={`game-date-${hash}`}>
				Playing date
			</label>
			<input
				className={styles["fen-tags__input"]}
				id={`game-date-${hash}`}
				type="datetime-local"
				value={date instanceof Date ? formatToInputLocalDateTime(date) : date ? formatToInputLocalDateTime(new Date(date)) : ""}
				onChange={(e) => dispatch(SidebarEditor.changePlayingDate({ id, newValue: e.target.value }))}
			/>
			<label className={`${styles["fen-tags__text"]} ${styles["fen-tags__text--compact"]}`} htmlFor={`game-result-${hash}`}>
				Game Result
			</label>
			<input
				className={styles["fen-tags__input"]}
				id={`game-result-${hash}`}
				type="text"
				value={result}
				onChange={(e) => dispatch(SidebarEditor.setResult({ id, newValue: e.target.value }))}
			/>
			<label className={`${styles["fen-tags__text"]} ${styles["fen-tags__text--compact"]}`} htmlFor={`game-termination-${hash}`}>
				Game Termination
			</label>
			<select
				id={`game-termination-${hash}`}
				className={styles["fen-tags__select"]}
				value={termination}
				onChange={(e) => dispatch(SidebarEditor.changeTermination({ id, newValue: e.target.value }))}>
				{allowedTerminations.map((termination) => {
					if (termination === undefined) {
						return (
							<option key="no-termination" value={""}>
								No Termination
							</option>
						);
					} else {
						return (
							<option key={termination} value={termination}>
								{termination}
							</option>
						);
					}
				})}
			</select>
		</>
	);
};
