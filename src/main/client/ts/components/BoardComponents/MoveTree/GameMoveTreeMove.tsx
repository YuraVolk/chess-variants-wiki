import { wrapIndexedColor } from "@client/ts/interfaces/Colors";
import type { ProcessSafeMoveWrapper } from "@moveGeneration/MoveTree/MoveTreeInterface";
import { compareArrays } from "@client/ts/utils/ArrayUtils";
import { UserContext } from "@client/ts/services/PersistedStorage/PieceThemeContext";
import React, { Fragment, useCallback, useContext } from "react";
import styles from "./GameMoveTree.module.scss";
import { changeCurrentMove, selectGameBoardCurrentMove, selectGameBoardFENSettings } from "@client/ts/logic/index/GameBoardSlice";
import type { AppDispatch, RootState } from "@client/ts/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { GameDisplayContext } from "../BoardContext";
import { createLoadSnapshotAction } from "@client/ts/redux/WorkerSync/WorkerSaga";

interface GameMoveProps {
	moveWrapper: ProcessSafeMoveWrapper;
}
export const GameMoveDisplay = (props: GameMoveProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const { id, worker } = useContext(GameDisplayContext);
	const currentMove = useSelector<RootState, number[]>((state) => selectGameBoardCurrentMove(state, id));
	const wb = useSelector<RootState, boolean>((state) => selectGameBoardFENSettings(state, id).fenOptions.wb);
	const userContext = useContext(UserContext);
	const onClickCallback = useCallback(() => {
		dispatch(changeCurrentMove({ id, path: props.moveWrapper.path }));
		dispatch(createLoadSnapshotAction({ args: [currentMove], worker, id }));
	}, [currentMove, dispatch, id, props.moveWrapper.path, worker]);

	const isSelected = compareArrays(currentMove, props.moveWrapper.path);
	const stringifiedRepresentation = props.moveWrapper.cachedNames.shortenedMoveNotation;
	const sideToMove = props.moveWrapper.metadata.currentSideToMove;
	const indexedColor = wb ? userContext.colors.whiteBlackColors[0] : userContext.colors.pieceColors[sideToMove];
	const hasAlternativeLines = props.moveWrapper.alternativeLines.length !== 0;
	return (
		<div className={styles["move-tree-move"]}>
			<div className={`${styles["move-tree-move__move-wrap"]} ${isSelected ? styles["move-tree-move__move-wrap--selected"] : ""}`}>
				<span
					className={styles["move-tree-move__move-text"]}
					onClick={() => onClickCallback()}
					style={{ color: wrapIndexedColor(indexedColor) }}>
					{props.moveWrapper.metadata.currentFullMove && `${props.moveWrapper.metadata.currentFullMove}. `}
					{stringifiedRepresentation}
				</span>
				{props.moveWrapper.comment && (
					<span className={`${styles["move-tree-move__move-text"]} ${styles["move-tree-move__move-comment"]}`}>
						{props.moveWrapper.comment}
					</span>
				)}
			</div>
			{hasAlternativeLines && <span className={styles["move-tree-move__move-text"]}>(</span>}
			{props.moveWrapper.alternativeLines.map((line, i) => {
				return (
					<Fragment key={`${line.length}-${i}`}>
						<GameMoveList moves={line} />
					</Fragment>
				);
			})}
			{hasAlternativeLines && <span className={styles["move-tree-move__move-text"]}>)</span>}
		</div>
	);
};

interface GameMoveListProps {
	moves: ProcessSafeMoveWrapper[];
}

export const GameMoveList = (props: GameMoveListProps) => {
	return (
		<div>
			{props.moves.map((moveWrapper) => {
				return (
					<Fragment key={moveWrapper.path.join(",")}>
						<GameMoveDisplay moveWrapper={moveWrapper} />
					</Fragment>
				);
			})}
		</div>
	);
};
