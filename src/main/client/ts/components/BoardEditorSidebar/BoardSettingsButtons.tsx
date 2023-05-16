import React, { useContext } from "react";
import styles from "./EditorSidebar.module.scss";
import type { AppDispatch, RootState } from "@client/ts/redux/store";
import { GameDisplayContext } from "@components/BoardComponents/BoardContext";
import { useDispatch, useSelector } from "react-redux";
import { changeNumericColorValue, selectEditorFENSettings, toggleBooleanValue } from "@client/ts/redux/SidebarEditor/SidebarEditorSlice";
import { UserContext } from "@client/ts/services/PersistedStorage/PieceThemeContext";
import { wrapIndexedColor } from "@client/ts/interfaces/Colors";
import { deadColorIndex } from "@moveGeneration/GameInformation/GameUnits/PieceString";
import { PublicFENSettings } from "@client/ts/logic/index/GameBoardWorker";

export const BoardSettingsButtons = () => {
	const { id } = useContext(GameDisplayContext),
		themeContext = useContext(UserContext);
	const dispatch = useDispatch<AppDispatch>();
	const {
		fenOptions: { wb, noCorners, boxOffset }
	} = useSelector<RootState, PublicFENSettings>((state) => selectEditorFENSettings(state, id));
	return (
		<>
			<button className={styles["board-settings-button"]} onClick={() => dispatch(toggleBooleanValue({ id, option: "noCorners" }))}>
				<span
					className={`${styles["board-settings-button__icon"]} ${
						noCorners ? styles["board-settings-button__icon--no-corners-on"] : styles["board-settings-button__icon--no-corners-off"]
					}`}></span>
			</button>
			<button className={styles["board-settings-button"]} onClick={() => dispatch(toggleBooleanValue({ id, option: "wb" }))}>
				{wb ? (
					<>
						<span style={{ color: wrapIndexedColor(themeContext.colors.pieceColors[0]) }}>4</span>
						<span style={{ color: wrapIndexedColor(themeContext.colors.pieceColors[1]) }}>P</span>
						<span style={{ color: wrapIndexedColor(themeContext.colors.pieceColors[2]) }}>C</span>
					</>
				) : (
					<>
						<span style={{ color: wrapIndexedColor(themeContext.colors.whiteBlackColors[0]) }}>B</span>
						<span style={{ color: wrapIndexedColor(themeContext.colors.pieceColors[deadColorIndex]) }}>&</span>
						<span style={{ color: wrapIndexedColor(themeContext.colors.whiteBlackColors[0]) }}>W</span>
					</>
				)}
			</button>
			<button className={styles["board-settings-button"]} onClick={() => dispatch(changeNumericColorValue({ id, option: "boxOffset" }))}>
				<span
					className={`${styles["board-settings-button__icon"]} ${styles["board-settings-button__icon--box-offset"]}`}
					style={{
						color: wrapIndexedColor(themeContext.colors.pieceColors[boxOffset]),
						transform: `rotate(${boxOffset * 90}deg)`
					}}></span>
			</button>
		</>
	);
};
