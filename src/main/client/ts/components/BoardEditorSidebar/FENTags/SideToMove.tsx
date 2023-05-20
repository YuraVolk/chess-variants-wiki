import React, { useContext } from "react";
import styles from "../EditorSidebar.module.scss";
import { GameDisplayContext } from "@components/BoardComponents/BoardContext";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@client/ts/redux/store";
import { colors } from "@moveGeneration/GameInformation/GameData";
import { useContextualPlayerColor } from "@client/ts/hooks/useContextualPlayerColor";
import { changeSideToMove, selectEditorFENSettings } from "@client/ts/redux/SidebarEditor/SidebarEditorSlice";
import type { PublicFENSettings } from "@client/ts/logic/index/GameBoardWorker";
import { wrapIndexedColor } from "@client/ts/interfaces/Colors";

export const SideToMove = () => {
	const { id } = useContext(GameDisplayContext);
	const dispatch = useDispatch<AppDispatch>();
	const colorSelector = useContextualPlayerColor();
	const {
		sideToMove,
		fenOptions: { dead }
	} = useSelector<RootState, PublicFENSettings>((state) => selectEditorFENSettings(state, id));

	return (
		<>
			<span className={styles["fen-tags__text"]}>Side to move</span>
			{colors.map((c) => {
				if (dead[c]) return <div key={c} className={`${styles["side-to-move"]} ${styles["side-to-move--disabled"]}`}></div>;
				const [name, indexedColor] = colorSelector(c);
				return (
					<div key={name} onClick={() => dispatch(changeSideToMove({ id, newSideToMove: c }))} className={styles["side-to-move"]}>
						<button
							className={`${styles["side-to-move__button"]} ${sideToMove === c ? styles["side-to-move__button--active"] : ""}`}
							style={{ color: wrapIndexedColor(indexedColor) }}>
							{name[0].toUpperCase()}
						</button>
					</div>
				);
			})}
		</>
	);
};
