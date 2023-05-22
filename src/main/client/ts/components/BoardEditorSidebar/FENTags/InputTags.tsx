import React, { useContext, useId, useMemo } from "react";
import styles from "../EditorSidebar.module.scss";
import { createSelector } from "@reduxjs/toolkit";
import { changeSimpleParametrizedFENTag, selectEditorFENSettings } from "@client/ts/redux/SidebarEditor/SidebarEditorSlice";
import { boardDimension } from "@moveGeneration/GameInformation/GameData";
import { checkDimensionIntersection } from "@client/ts/logic/utils/Tags/TagLogic/FENDataTag";
import { formatOrdinalNumber, hashString } from "@utils/StringFormatUtils";
import { GameDisplayContext } from "@components/BoardComponents/BoardContext";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@client/ts/redux/store";
import type { PublicFENSettings } from "@client/ts/logic/index/GameBoardWorker";
import { pieceControlConfigSettings, verifyPieceLetter } from "@moveGeneration/PieceControl/PieceControlInterface";

const centralSquare = boardDimension / 2;
const selectAllowedPawnHomeRanks = () =>
	createSelector([selectEditorFENSettings], ({ fenOptions: { dim } }) => {
		const results: Array<[string, number]> = [];
		for (let i = 0; i < boardDimension; i++) {
			if (checkDimensionIntersection(dim, [i, centralSquare]) && checkDimensionIntersection(dim, [centralSquare, i])) continue;
			results.push([formatOrdinalNumber(i + 1 - (boardDimension - Math.max(...dim)) / 2), i + 1]);
		}

		return results;
	});

const SORTED_PIECE_SETTINGS = Object.values(pieceControlConfigSettings).sort((a, b) => a.naming.name.localeCompare(b.naming.name));

export const InputTags = () => {
	const { id } = useContext(GameDisplayContext);
	const dispatch = useDispatch<AppDispatch>();
	const pawnHomeRankSelector = useMemo(() => selectAllowedPawnHomeRanks(), []);
	const pawnHomeRanks = useSelector<RootState, Array<[string, number]>>((state) => pawnHomeRankSelector(state, id));
	const publicFENSettings = useSelector<RootState, PublicFENSettings>((state) => selectEditorFENSettings(state, id));
	const hash = hashString(useId());

	return (
		<>
			<label className={`${styles["fen-tags__text"]} ${styles["fen-tags__text--compact"]}`} htmlFor={`castle-with-tag-${hash}`}>
				Castling piece
			</label>
			<select
				id={`castle-with-tag-${hash}`}
				className={styles["fen-tags__select"]}
				value={publicFENSettings.fenOptions.castleWith}
				onChange={(e) => {
					if (verifyPieceLetter(e.target.value)) {
						dispatch(changeSimpleParametrizedFENTag({ id, option: "castleWith", newValue: e.target.value }));
					}
				}}>
				{SORTED_PIECE_SETTINGS.map((setting) => {
					return (
						<option key={setting.naming.shortName} value={setting.piece}>
							{setting.naming.name}
						</option>
					);
				})}
			</select>
			<label className={`${styles["fen-tags__text"]} ${styles["fen-tags__text--compact"]}`} htmlFor={`pawns-base-rank-tag-${hash}`}>
				Pawns home rank
			</label>
			<select
				id={`pawns-base-rank-tag-${hash}`}
				className={styles["fen-tags__select"]}
				value={publicFENSettings.fenOptions.pawnBaseRank}
				onChange={(v) => dispatch(changeSimpleParametrizedFENTag({ id, option: "pawnBaseRank", newValue: Number(v.target.value) }))}>
				{pawnHomeRanks.map(([name, value]) => {
					return (
						<option key={value} value={value}>
							{name}
						</option>
					);
				})}
			</select>
		</>
	);
};
