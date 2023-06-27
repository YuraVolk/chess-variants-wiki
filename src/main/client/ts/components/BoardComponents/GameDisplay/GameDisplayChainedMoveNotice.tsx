import { createMoveAction } from "@client/ts/redux/WorkerSync/WorkerSaga";
import { ChainedMoveSettings, resetInteractionSettings, selectChainedMoveSettings } from "@client/ts/logic/index/GameBoardSlice";
import type { AppDispatch, RootState } from "@client/ts/redux/store";
import { useTimer } from "@client/ts/hooks/useTimer";
import { StripPieceStringObjects, MoveComponent, DroppingMove } from "@moveGeneration/MoveTree/MoveTreeInterface";
import React, { useCallback, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import arrowStyles from "../../../../scss/Arrows.module.scss";
import { throwOnNever } from "../../../baseTypes";
import { GameDisplayContext } from "../BoardContext";
import styles from "./GameDisplay.module.scss";

export const enum ChainedMoveNoticeType {
	SEIRAWAN_DROP,
	MOVE_DUCK,
	DROP_DUCK
}
export interface GameDisplayChainedMoveNoticeProps {
	noticeType: ChainedMoveNoticeType | false;
}

const seirawanCountdownNumbers = {
	START_SECONDS: 25,
	BLINKING_START: 15,
	WARNING_START: 5
};
const duckCountdownNumbers = {
	START_SECONDS: 20,
	BLINKING_START: 10,
	WARNING_START: 5
};
export const GameDisplayChainedMoveNotice = (props: GameDisplayChainedMoveNoticeProps) => {
	const { id, worker } = useContext(GameDisplayContext);
	const chainedMoveSettings = useSelector<RootState, ChainedMoveSettings>((state) => selectChainedMoveSettings(state, id));
	const { secondsLeft, stop, start } = useTimer({
		totalTime: (props.noticeType === ChainedMoveNoticeType.SEIRAWAN_DROP ? seirawanCountdownNumbers : duckCountdownNumbers).START_SECONDS,
		interval: 1000,
		onTimeout: () => {
			if (props.noticeType === ChainedMoveNoticeType.SEIRAWAN_DROP) {
				cancelSeirawanDrop();
			} else cancelDuckDrop();
		}
	});
	const dispatch = useDispatch<AppDispatch>();

	const cancelSeirawanDrop = useCallback(() => {
		if (!chainedMoveSettings.seirawanDrops) return;
		stop();

		const { ...copiedMove } = chainedMoveSettings.seirawanDrops.move;
		delete copiedMove.nextChainedMoves;
		const newMove: StripPieceStringObjects<MoveComponent> = copiedMove;
		if (chainedMoveSettings.seirawanDrops.chainedMoves.length > 0) {
			const chainedMovesIterator: Iterator<
				StripPieceStringObjects<DroppingMove>,
				StripPieceStringObjects<DroppingMove>
			> = chainedMoveSettings.seirawanDrops.chainedMoves.values();
			const yieldedDrop = chainedMovesIterator.next().value;
			if (yieldedDrop.nextChainedMoves) {
				newMove.nextChainedMoves = yieldedDrop.nextChainedMoves;
			}
		}

		dispatch(createMoveAction({ id, worker, args: [[copiedMove]] }));
	}, [chainedMoveSettings.seirawanDrops, dispatch, id, worker, stop]);

	const cancelDuckDrop = useCallback(() => {
		stop();
		dispatch(resetInteractionSettings({ id }));
	}, [id, dispatch, stop]);

	useEffect(() => {
		if (props.noticeType !== false) start();
	}, [props.noticeType, start]);
	if (props.noticeType === false) return null;

	switch (props.noticeType) {
		case ChainedMoveNoticeType.SEIRAWAN_DROP: {
			let className = `${styles["chained-move-notice"]} ${styles["chained-move-notice--seirawan-drop"]}`;
			if (secondsLeft <= seirawanCountdownNumbers.BLINKING_START) {
				className += " " + styles["chained-move-notice--blink"];
			}

			return (
				<div className={className} onClick={() => cancelSeirawanDrop()}>
					<span className={styles["chained-move-notice__description"]}>Continue without placing a piece</span>
					{secondsLeft <= seirawanCountdownNumbers.WARNING_START ? (
						<span className={styles["chained-move-notice__countdown"]}>{secondsLeft}</span>
					) : (
						<div className={styles["chained-move-notice__arrow"]}>
							<div className={arrowStyles["prolonged-concave-arrow-wrap"]}>
								<div className={arrowStyles["prolonged-concave-arrow"]}></div>
							</div>
						</div>
					)}
				</div>
			);
		}
		case ChainedMoveNoticeType.DROP_DUCK:
		case ChainedMoveNoticeType.MOVE_DUCK: {
			let className = `${styles["chained-move-notice"]}`;
			if (secondsLeft <= duckCountdownNumbers.WARNING_START) {
				className += " " + styles["chained-move-notice--duck-move"];
			} else if (secondsLeft <= seirawanCountdownNumbers.BLINKING_START) {
				className += ` ${styles["chained-move-notice--duck-move"]} ${styles["chained-move-notice--blink"]}`;
			}

			return (
				<div className={className}>
					<span className={styles["chained-move-notice__description"]}>
						{props.noticeType === ChainedMoveNoticeType.MOVE_DUCK ? "Move the duck!" : "Click on a square to place the duck!"}
					</span>
					<span className={styles["chained-move-notice__takeback-icon"]} onClick={() => cancelDuckDrop()}></span>
				</div>
			);
		}
		default:
			return throwOnNever(props.noticeType);
	}
};
