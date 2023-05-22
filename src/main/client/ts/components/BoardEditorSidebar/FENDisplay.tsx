import React, { useContext, useMemo, useState, useEffect } from "react";
import styles from "./EditorSidebar.module.scss";
import { createSelector } from "@reduxjs/toolkit";
import { loadFEN4fromString, selectEditorBoardSquares, selectEditorFENSettings } from "@client/ts/redux/SidebarEditor/SidebarEditorSlice";
import { FENData } from "@moveGeneration/FENData/FENData";
import { PieceString } from "@moveGeneration/GameInformation/GameUnits/PieceString";
import { createFENDataTag } from "@client/ts/logic/utils/Tags/TagLogic/FENDataTag";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@client/ts/redux/store";
import { GameDisplayContext } from "@components/BoardComponents/BoardContext";

export const selectLimitedFENString = () =>
	createSelector([selectEditorBoardSquares, selectEditorFENSettings], (boardSquares, fenSettings) => {
		const fenData = FENData.toFENDataFromPublicFENSettings(fenSettings);
		const board = boardSquares.map((r) => r.map((s) => PieceString.fromObjectToClass(s)));
		return createFENDataTag().externalSerialize?.(board, fenData) ?? "";
	});

export const FENDisplay = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { id } = useContext(GameDisplayContext);
	const fenStringSelector = useMemo(() => selectLimitedFENString(), []);
	const fenString = useSelector<RootState, string>((state) => fenStringSelector(state, id));
	const [localFEN4, setLocalFEN4] = useState(fenString);

	useEffect(() => {
		setLocalFEN4(fenString);
	}, [fenString]);

	return (
		<div>
			<button className={styles["fen-box__button"]} onClick={() => dispatch(loadFEN4fromString({ id, fen4: localFEN4 }))}>
				Load FEN4
			</button>
			<textarea
				className={styles["fen-box"]}
				spellCheck="false"
				placeholder="FEN4"
				value={localFEN4}
				onChange={(e) => setLocalFEN4(e.target.value)}></textarea>
		</div>
	);
};
