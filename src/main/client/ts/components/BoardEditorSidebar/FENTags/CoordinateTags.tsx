import React, { useContext } from "react";
import styles from "../EditorSidebar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@client/ts/redux/store";
import { GameDisplayContext } from "@components/BoardComponents/BoardContext";
import { colors, convertCoordinateToPGN4 } from "@moveGeneration/GameInformation/GameData";
import type { FENOptionsSerializedState, FENOptionsTags } from "@moveGeneration/FENData/FENOptions/FENOptionsTagsInterface";
import {
	deleteRoyal,
	selectCoordinateBasedTag,
	selectEditorFENSettings,
	selectEditorSidebar
} from "@client/ts/redux/SidebarEditor/SidebarEditorSlice";

export const CoordinateTags = () => {
	const { id } = useContext(GameDisplayContext);
	const dispatch = useDispatch<AppDispatch>();
	const fenOptions = useSelector<RootState, FENOptionsSerializedState>((state) => selectEditorFENSettings(state, id).fenOptions);
	const selectedTag = useSelector<RootState, keyof FENOptionsTags | undefined>(
		(state) => selectEditorSidebar(state, id).selectedCoordinateFENtag
	);
	const dimension = Math.max(...fenOptions.dim);

	return (
		<>
			<div className={styles["fen-tags__board-selection"]}>
				<button
					className={`${styles["fen-tags__board-selection-button"]} ${
						selectedTag === "royal" ? styles["fen-tags__board-selection-button--active"] : ""
					}`}
					onClick={() => dispatch(selectCoordinateBasedTag({ id, newTag: "royal" }))}>
					Set Royals
				</button>
				{colors.map((c) => {
					const royal = fenOptions.royal[c];
					return (
						<div className={styles["royal-coordinate-wrap"]} key={c}>
							{royal && !fenOptions.dead[c] && (
								<span className={styles["royal-coordinate-wrap"]}>{convertCoordinateToPGN4(royal, dimension)}</span>
							)}
							<span className={styles["royal-coordinate-icon"]} onClick={() => dispatch(deleteRoyal({ id, index: c }))}></span>
						</div>
					);
				})}
			</div>
		</>
	);
};
