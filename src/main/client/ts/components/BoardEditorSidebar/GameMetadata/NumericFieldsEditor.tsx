import React, { useContext, useId, useReducer } from "react";
import styles from "../EditorSidebar.module.scss";
import { GameDisplayContext } from "@components/BoardComponents/BoardContext";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@client/ts/redux/store";
import { hashString } from "@utils/StringFormatUtils";
import { changeGameMetadataID, changeTimeControl, selectEditorGameData } from "@client/ts/redux/SidebarEditor/SidebarEditorSlice";
import { stringifyTimeControl, type TimeControl } from "@moveGeneration/GameInformation/GameData";
import { throwOnNever } from "@client/ts/baseTypes";

function timeControlReducer(
	state: TimeControl,
	action: { type: "changeBase"; newValue: string } | { type: "changeIncrement"; newValue: string } | { type: "toggleDelay" }
) {
	switch (action.type) {
		case "changeBase":
		case "changeIncrement": {
			const numericValue = Number(action.newValue);
			if (!Number.isSafeInteger(numericValue) || numericValue < 0) return state;
			return { ...state, [action.type === "changeBase" ? "baseTime" : "increment"]: numericValue };
		}
		case "toggleDelay":
			return { ...state, isDelay: !state.isDelay };
		default:
			return throwOnNever(action);
	}
}

export const NumericFields = () => {
	const { id } = useContext(GameDisplayContext);
	const dispatch = useDispatch<AppDispatch>();
	const hash = hashString(useId());
	const gameNumber = useSelector<RootState, number | undefined>((state) => selectEditorGameData(state, id).gameNumber);
	const stateTimeControl = useSelector<RootState, TimeControl>((state) => selectEditorGameData(state, id).timeControl);
	const [timeControl, timeControlDispatch] = useReducer(timeControlReducer, stateTimeControl);

	return (
		<>
			<label className={`${styles["fen-tags__text"]} ${styles["fen-tags__text--compact"]}`} htmlFor={`game-number-${hash}`}>
				Game ID
			</label>
			<input
				className={styles["fen-tags__input"]}
				id={`game-number-${hash}`}
				type="number"
				min="0"
				value={gameNumber}
				onChange={(e) => dispatch(changeGameMetadataID({ id, value: e.target.value }))}
			/>
			<fieldset className={`${styles["fen-tags__fieldset"]} ${styles["fen-tags__fieldset--compact"]}`}>
				<legend className={styles["fen-tags__text"]}>Time Control</legend>
				<label htmlFor={`time-control-base-${hash}`} className={styles["fen-tags__description-label"]}>
					Base Time
				</label>
				<label htmlFor={`time-control-increment-${hash}`} className={styles["fen-tags__description-label"]}>
					{timeControl.isDelay ? "Delay" : "Increment"}
				</label>
				<label htmlFor={`time-control-is-delay-${hash}`} className={styles["fen-tags__description-label"]}>
					{`Switch to ${timeControl.isDelay ? "Delay" : "Increment"}`}
				</label>
				<label htmlFor={`time-control-finish-${hash}`} className={styles["fen-tags__description-label"]}>
					{`Change to: ${stringifyTimeControl(timeControl)}`}
				</label>

				<input
					id={`time-control-base-${hash}`}
					className={styles["fen-tags__input"]}
					type="number"
					min="0"
					step="0.001"
					value={timeControl.baseTime}
					onChange={(e) => timeControlDispatch({ type: "changeBase", newValue: e.target.value })}
				/>
				<input
					id={`time-control-increment-${hash}`}
					className={styles["fen-tags__input"]}
					type="number"
					min="0"
					step="0.001"
					value={timeControl.increment}
					onChange={(e) => timeControlDispatch({ type: "changeIncrement", newValue: e.target.value })}
				/>
				<div className={styles["fen-tags__checkbox-wrap"]}>
					<div className={styles["fen-tags__checkbox"]}>
						<input
							id={`time-control-is-delay-${hash}`}
							type="checkbox"
							checked={timeControl.isDelay}
							readOnly
							onClick={() => timeControlDispatch({ type: "toggleDelay" })}
							className={styles["fen-tags__fake-checkbox"]}
						/>
						<label htmlFor={`time-control-is-delay-${hash}`} className={styles["fen-tags__label"]}>
							<div className={styles["fen-tags__label-checkbox"]}></div>
						</label>
					</div>
				</div>
				<input
					id={`time-control-finish-${hash}`}
					type="button"
					className={styles["fen-tags__button"]}
					value="Finish"
					onClick={() => dispatch(changeTimeControl({ id, timeControl }))}
				/>
			</fieldset>
		</>
	);
};
