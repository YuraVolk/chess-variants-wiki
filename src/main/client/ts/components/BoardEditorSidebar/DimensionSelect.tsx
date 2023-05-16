import React, { useCallback, useContext } from "react";
import styles from "./EditorSidebar.module.scss";
import { boardDimension } from "@moveGeneration/GameInformation/GameData";
import { GameDisplayContext } from "@components/BoardComponents/BoardContext";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@client/ts/redux/store";
import { changeDimensionValue, selectEditorFENSettings } from "@client/ts/redux/SidebarEditor/SidebarEditorSlice";

const dimensionValues = [...Array(boardDimension).keys()].map((k) => k + 1).filter((k) => k % 2 === 0);
export const DimensionSelect = () => {
	const { id } = useContext(GameDisplayContext);
	const dispatch = useDispatch<AppDispatch>();
	const dimension = useSelector<RootState, [number, number]>(state => selectEditorFENSettings(state, id).fenOptions.dim);
	const onValueChanged = useCallback(
		(selectedId: 0 | 1, newValue: string) => {
			dispatch(changeDimensionValue({ id, selectedId, newValue: Number(newValue) }));
		},
		[dispatch, id]
	);

	return (
		<div className={styles["board-settings__dimension"]}>
			<select
				className={styles["board-settings__dimension-select"]}
				value={dimension[0]}
				onChange={(e) => onValueChanged(0, e.target.value)}>
				{dimensionValues.map((v) => (
					<option value={v} key={v} className={styles["board-settings__dimension-select-option"]}>
						{v}
					</option>
				))}
			</select>
			<span>x</span>
			<select
				className={styles["board-settings__dimension-select"]}
				value={dimension[1]}
				onChange={(e) => onValueChanged(1, e.target.value)}>
				{dimensionValues.map((v) => (
					<option value={v} key={v} className={styles["board-settings__dimension-select-option"]}>
						{v}
					</option>
				))}
			</select>
		</div>
	);
};
