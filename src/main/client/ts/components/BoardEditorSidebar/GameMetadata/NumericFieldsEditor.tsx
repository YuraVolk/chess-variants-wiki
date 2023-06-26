import React, { useContext, useId } from "react";
import styles from "../EditorSidebar.module.scss";
import { GameDisplayContext } from "@components/BoardComponents/BoardContext";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@client/ts/redux/store";
import { hashString } from "@utils/StringFormatUtils";
import { changeGameMetadataID, selectEditorGameData } from "@client/ts/redux/SidebarEditor/SidebarEditorSlice";

export const NumericFields = () => {
	const { id } = useContext(GameDisplayContext);
	const dispatch = useDispatch<AppDispatch>();
	const hash = hashString(useId());
	const gameNumber = useSelector<RootState, number | undefined>((state) => selectEditorGameData(state, id).gameNumber);

	return (
		<>
			<label className={`${styles["fen-tags__text"]} ${styles["fen-tags__text--compact"]}`} htmlFor={`game-number-${hash}`}>
				Game ID
			</label>
			<input
				className={styles["parametrized-variant-rule__input"]}
				id={`game-number-${hash}`}
				type="number"
				min="0"
				value={gameNumber}
				onChange={(e) => dispatch(changeGameMetadataID({ id, value: e.target.value }))}
			/>
		</>
	);
};
