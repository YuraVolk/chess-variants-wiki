import { createFogPerspectiveAction, createMoveAction } from "@client/ts/redux/WorkerSync/WorkerSaga";
import { selectFogPerspective, selectGameBoardVariantData, selectInternalMoves } from "@client/ts/logic/index/GameBoardSlice";
import { AppDispatch, RootState } from "@client/ts/redux/store";
import { InternalMove, InternalMoveSignature, StripPieceStringObjects } from "@moveGeneration/MoveTree/MoveTreeInterface";
import React, { useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./GameController.module.scss";
import { UserContext } from "@client/ts/services/PersistedStorage/PieceThemeContext";
import { NumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { wrapIndexedColor } from "@client/ts/interfaces/Colors";
import { VariantDataRules } from "@moveGeneration/VariantRules/VariantRuleInterface";
import { GameDisplayContext } from "@components/BoardComponents/BoardContext";
import { chessGlyphIndex } from "@client/fonts/chessGlyphIndex";

interface GameControllerInternalActionsProps {
	changeCurrentPerspective: () => void;
	currentPerspective: NumericColor;
	openSidebar: () => void;
}
export const GameControllerInternalActions = (props: GameControllerInternalActionsProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const themeContext = useContext(UserContext);
	const { worker, id } = useContext(GameDisplayContext);
	const internalMoves = useSelector<RootState, Array<StripPieceStringObjects<InternalMove>>>((state) => selectInternalMoves(state, id));
	const variantDataRules = useSelector<RootState, StripPieceStringObjects<VariantDataRules>>((state) => selectGameBoardVariantData(state, id));
	const fogPerspective = useSelector<RootState, NumericColor | false>((state) => selectFogPerspective(state, id));
	const resign = useCallback(() => {
		dispatch(createMoveAction({ args: [[{ type: InternalMoveSignature.Resign }]], worker, id }));
	}, [dispatch, id, worker]);
	const pass = useCallback(() => {
		dispatch(createMoveAction({ args: [[{ type: InternalMoveSignature.Pass }]], worker, id }));
	}, [dispatch, id, worker]);

	const iconButtonStyle = `${styles["fen-data__pgn-button--icon-button"]} ${styles["fen-data__pgn-button"]}`;
	const perspectiveIconStyle = `${styles["fen-data__pgn-button__icon"]} ${styles["fen-data__pgn-button__change-perspective-icon"]}`;
	return (
		<ul className={styles["fen-data__pgn-button-list"]}>
			<li className={styles["fen-data__pgn-button-wrap"]}>
				{internalMoves.find((move) => move.type === InternalMoveSignature.ClaimWin) ? (
					<button className={`${iconButtonStyle} ${styles["fen-data__pgn-button--claim-win"]}`} onClick={() => resign()}>
						&Dagger;<span className={styles["fen-data__pgn-button--claim-win__text"]}>Claim win</span>
					</button>
				) : (
					internalMoves.length !== 0 && (
						<button className={iconButtonStyle} onClick={() => resign()}>
							{chessGlyphIndex.wavingFlag}
						</button>
					)
				)}
			</li>
			{internalMoves.find((move) => move.type === InternalMoveSignature.Pass) && (
				<li className={styles["fen-data__pgn-button-wrap"]}>
					<button className={iconButtonStyle} onClick={() => pass()}>
						{chessGlyphIndex.pause}
					</button>
				</li>
			)}
			<li className={styles["fen-data__pgn-button-wrap"]} onClick={() => props.changeCurrentPerspective()}>
				<button className={iconButtonStyle}>
					<span
						className={perspectiveIconStyle}
						style={{
							color: wrapIndexedColor(themeContext.colors.pieceColors[props.currentPerspective])
						}}>
						{chessGlyphIndex.circularArrows}
					</span>
				</button>
			</li>
			{variantDataRules.fogOfWar && (
				<li className={styles["fen-data__pgn-button-wrap"]}>
					<button
						className={`${styles["fen-data__pgn-button"]} ${styles["fen-data__pgn-button--fog-of-war"]}`}
						onClick={() => dispatch(createFogPerspectiveAction({ id, worker }))}>
						<span className={styles["fen-data__pgn-button__icon"]}>{chessGlyphIndex.fogOfWar}</span>
						<span className={styles["fen-data__pgn-button__description"]}>Fog</span>
						{fogPerspective === false ? (
							<span className={perspectiveIconStyle}>{chessGlyphIndex.reload}</span>
						) : (
							<span
								className={perspectiveIconStyle}
								style={{
									color: wrapIndexedColor(themeContext.colors.pieceColors[fogPerspective])
								}}>
								{chessGlyphIndex.circularArrows}
							</span>
						)}
					</button>
				</li>
			)}
			<li className={styles["fen-data__pgn-button-wrap"]} onClick={() => props.openSidebar()}>
				<button className={iconButtonStyle}>s</button>
			</li>
		</ul>
	);
};
