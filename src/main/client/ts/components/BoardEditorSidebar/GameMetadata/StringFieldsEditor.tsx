import React, { useState, useContext, useId } from "react";
import styles from "../EditorSidebar.module.scss";
import { GameDisplayContext } from "@components/BoardComponents/BoardContext";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@client/ts/redux/store";
import { hashString } from "@utils/StringFormatUtils";
import { changeOriginatingWebsite, changePlayingDate, selectEditorGameData } from "@client/ts/redux/SidebarEditor/SidebarEditorSlice";
import { formatToInputLocalDateTime } from "@utils/ObjectUtils";

export const StringFieldsEditor = () => {
	const { id } = useContext(GameDisplayContext);
	const dispatch = useDispatch<AppDispatch>();
	const hash = hashString(useId());
	const [siteName, setSiteName] = useState(useSelector<RootState, string | undefined>((state) => selectEditorGameData(state, id).site));
	const date = useSelector<RootState, string | Date | undefined>((state) => selectEditorGameData(state, id).date);

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
				onBlur={(e) => dispatch(changeOriginatingWebsite({ id, newValue: e.target.value }))}
			/>
			<label className={`${styles["fen-tags__text"]} ${styles["fen-tags__text--compact"]}`} htmlFor={`game-date-${hash}`}>
				Playing date
			</label>
			<input
				className={styles["fen-tags__input"]}
				id={`game-date-${hash}`}
				type="datetime-local"
				value={date instanceof Date ? formatToInputLocalDateTime(date) : date ? formatToInputLocalDateTime(new Date(date)) : ""}
				onChange={(e) => dispatch(changePlayingDate({ id, newValue: e.target.value }))}
			/>
		</>
	);
};
