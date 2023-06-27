import { createDeleteMoveAction } from "@client/ts/redux/WorkerSync/WorkerSaga";
import { selectGameBoardCurrentMove, selectGameBoardMoveTree, selectGameBoardPGN } from "@client/ts/logic/index/GameBoardSlice";
import type { AppDispatch, RootState } from "@client/ts/redux/store";
import { stringColorEnum } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { getMoveFromPathAndTree, ProcessSafeMoveWrapper } from "@moveGeneration/MoveTree/MoveTreeInterface";
import { compareArrays } from "@utils/ArrayUtils";
import { downloadFile } from "@utils/BrowserUtils";
import React, { useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GameDisplayContext } from "../BoardContext";
import styles from "./GameMoveTree.module.scss";
import { GameMoveTreeControlButtons } from "./GameMoveTreeButtons";
import { verifyValidMove } from "@moveGeneration/MoveTree/MoveTree";

function getLastCurrentFullMove(moves: ProcessSafeMoveWrapper[], currentMove: number): number | undefined {
	for (let i = currentMove; i >= 0; i--) {
		const lastCurrent = moves[i].metadata.currentFullMove;
		if (lastCurrent) return lastCurrent;
	}
}

export const GameMoveTreeControls = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { id, worker } = useContext(GameDisplayContext);
	const currentMove = useSelector<RootState, number[]>((state) => selectGameBoardCurrentMove(state, id));
	const moveTree = useSelector<RootState, ProcessSafeMoveWrapper[]>((state) => selectGameBoardMoveTree(state, id));
	const pgn = useSelector<RootState, string>((state) => selectGameBoardPGN(state, id).moves);
	const selectedMove = getMoveFromPathAndTree(moveTree, currentMove);
	const moveInformation = verifyValidMove(selectedMove) ? selectedMove.cachedNames.shortenedMoveNotation : "";
	const moveList = getMoveFromPathAndTree(moveTree, currentMove.slice(0, -1));
	if (!Array.isArray(moveList)) throw new Error("Move list is not an array");
	const lastCurrentMove = getLastCurrentFullMove(moveList, currentMove[currentMove.length - 1]);

	const deleteAllMoves = useCallback(() => {
		dispatch(createDeleteMoveAction({ args: [[0]], id, worker }));
	}, [dispatch, id, worker]);
	const deletePreviousMove = useCallback(() => {
		dispatch(createDeleteMoveAction({ args: [currentMove], id, worker }));
	}, [dispatch, id, worker, currentMove]);

	return (
		<div className={styles["move-controls"]}>
			<div className={styles["move-controls-row"]}>
				<div className={styles["move-controls-row__move-information-wrap"]}>
					{verifyValidMove(selectedMove) && lastCurrentMove && (
						<>
							<span className={styles["move-controls-row__move-information"]}>{`${lastCurrentMove}.${
								stringColorEnum[selectedMove.metadata.currentSideToMove]
							}`}</span>
							<span className={styles["move-controls-row__move-information"]}>{moveInformation}</span>
						</>
					)}
				</div>
				<div className={styles["move-controls-row__pgn-information"]}>
					{!compareArrays(currentMove, [-1]) && (
						<span className={styles["move-controls-row__move-information"]}>{`${currentMove[currentMove.length - 1] + 1}/${
							moveList.length
						}`}</span>
					)}
					<span
						className={`${styles["move-controls-row__icon"]} ${styles["move-controls-row__download-pgn-icon"]}`}
						onClick={() => downloadFile("pgnMoves.pgn", pgn)}></span>
					<span
						className={`${styles["move-controls-row__icon"]} ${styles["move-controls-row__delete-pgn-icon"]}`}
						onClick={() => deleteAllMoves()}></span>
				</div>
			</div>
			<div className={styles["move-controls-row"]}>
				<div className={styles["move-controls-row__takebacks-wrap"]}>
					<div className={styles["move-controls-row__takebacks"]}>
						<span
							className={`${styles["move-controls-row__icon"]} ${styles["move-controls-row__takebacks-icon"]}`}
							onClick={() => deletePreviousMove()}></span>
						<span className={styles["move-controls-row__takebacks-text"]}></span>
					</div>
				</div>
				<GameMoveTreeControlButtons />
			</div>
		</div>
	);
};
