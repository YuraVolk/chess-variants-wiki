import { createLoadSnapshotAction } from "@client/ts/redux/WorkerSync/WorkerSaga";
import {
	goToBeginning,
	goToEnd,
	goToNextMove,
	goToNextPly,
	goToPreviousMove,
	goToPreviousPly,
	selectGameBoardCurrentMove,
	selectGameBoardMoveTree
} from "@client/ts/logic/index/GameBoardSlice";
import type { AppDispatch, RootState } from "@client/ts/redux/store";
import { useTimer } from "@client/ts/hooks/useTimer";
import { getMoveFromPathAndTree, ProcessSafeMoveWrapper } from "@moveGeneration/MoveTree/MoveTreeInterface";
import { compareArrays } from "@utils/ArrayUtils";
import React, { useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GameDisplayContext } from "../BoardContext";
import styles from "./GameMoveTree.module.scss";
import { chessGlyphIndex } from "@client/fonts/chessGlyphIndex";

type IsDisabledFunction = (options: { moveTree: ProcessSafeMoveWrapper[]; currentMove: number[] }) => boolean;
type OnClickFunction = (options: { dispatch: () => void; moveTree: ProcessSafeMoveWrapper[]; currentMove: number[]; id: number }) => void;
interface GameMoveTreeButtonSuperclassProps {
	children: JSX.Element;
	isDisabled: IsDisabledFunction;
	onClick: OnClickFunction;
}
const isPreviousDisabled: IsDisabledFunction = (options) =>
	compareArrays(options.currentMove, [-1]) ||
	(!compareArrays(options.currentMove, [0]) && options.currentMove[options.currentMove.length - 1] === 0);
const isNextDisabled: IsDisabledFunction = (options) => {
	const move = getMoveFromPathAndTree(options.moveTree, options.currentMove.slice(0, -1));
	if (!move || !Array.isArray(move)) return false;
	return move.length === 0 || options.currentMove[options.currentMove.length - 1] === move.length - 1;
};

const MoveTreeButton = (props: GameMoveTreeButtonSuperclassProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const { id, worker } = useContext(GameDisplayContext);
	const currentMove = useSelector<RootState, number[]>((state) => selectGameBoardCurrentMove(state, id));
	const moveTree = useSelector<RootState, ProcessSafeMoveWrapper[]>((state) => selectGameBoardMoveTree(state, id));

	const isDisabled = props.isDisabled({ moveTree, currentMove });

	const dispatchFunction = useCallback(() => {
		if (!isDisabled) dispatch(createLoadSnapshotAction({ args: [currentMove], worker, id }));
	}, [currentMove, dispatch, id, isDisabled, worker]);

	const className = isDisabled
		? `${styles["move-controls-row__navigation-button"]} ${styles["move-controls-row__navigation-button--disabled"]}`
		: `${styles["move-controls-row__navigation-button"]}`;
	return (
		<div className={className} onClick={() => props.onClick({ dispatch: dispatchFunction, moveTree, currentMove, id })}>
			{props.children}
		</div>
	);
};

export const GotoBeginningButton = () => {
	const dispatch = useDispatch<AppDispatch>();
	const onClick: OnClickFunction = useCallback(
		(options) => {
			dispatch(goToBeginning({ id: options.id }));
			options.dispatch();
		},
		[dispatch]
	);

	return (
		<MoveTreeButton isDisabled={isPreviousDisabled} onClick={onClick}>
			<span>{chessGlyphIndex.endBackwardArrow}</span>
		</MoveTreeButton>
	);
};

export const GotoPreviousMoveButton = () => {
	const dispatch = useDispatch<AppDispatch>();
	const onClick: OnClickFunction = useCallback(
		(options) => {
			dispatch(goToPreviousMove({ id: options.id }));
			options.dispatch();
		},
		[dispatch]
	);

	return (
		<MoveTreeButton isDisabled={isPreviousDisabled} onClick={onClick}>
			<span>{chessGlyphIndex.doubleBackwardArrow}</span>
		</MoveTreeButton>
	);
};

export const GotoPreviousPlyButton = () => {
	const dispatch = useDispatch<AppDispatch>();
	const onClick: OnClickFunction = useCallback(
		(options) => {
			dispatch(goToPreviousPly({ id: options.id }));
			options.dispatch();
		},
		[dispatch]
	);

	return (
		<MoveTreeButton isDisabled={isPreviousDisabled} onClick={onClick}>
			<span>{chessGlyphIndex.backwardArrow}</span>
		</MoveTreeButton>
	);
};

export const GotoNextPlyButton = () => {
	const dispatch = useDispatch<AppDispatch>();
	const onClick: OnClickFunction = useCallback(
		(options) => {
			dispatch(goToNextPly({ id: options.id }));
			options.dispatch();
		},
		[dispatch]
	);

	return (
		<MoveTreeButton isDisabled={isNextDisabled} onClick={onClick}>
			<span>{chessGlyphIndex.arrowForwardBoldCompact}</span>
		</MoveTreeButton>
	);
};

export const GotoNextMoveButton = () => {
	const dispatch = useDispatch<AppDispatch>();
	const onClick: OnClickFunction = useCallback(
		(options) => {
			dispatch(goToNextMove({ id: options.id }));
			options.dispatch();
		},
		[dispatch]
	);

	return (
		<MoveTreeButton isDisabled={isNextDisabled} onClick={onClick}>
			<span>{chessGlyphIndex.forwardDoubleArrow}</span>
		</MoveTreeButton>
	);
};

export const GotoEndButton = () => {
	const dispatch = useDispatch<AppDispatch>();
	const onClick: OnClickFunction = useCallback(
		(options) => {
			dispatch(goToEnd({ id: options.id }));
			options.dispatch();
		},
		[dispatch]
	);

	return (
		<MoveTreeButton isDisabled={isNextDisabled} onClick={onClick}>
			<span>{chessGlyphIndex.endForwardArrow}</span>
		</MoveTreeButton>
	);
};

const TIME_BETWEEN_MOVES = 1500;
export const PlayPauseButton = () => {
	const { id, worker } = useContext(GameDisplayContext);
	const dispatch = useDispatch<AppDispatch>();
	const { toggle, stop, isRunning } = useTimer({ interval: TIME_BETWEEN_MOVES, onUpdate: () => playOutNextMove() });
	const currentMove = useSelector<RootState, number[]>((state) => selectGameBoardCurrentMove(state, id));
	const moveTree = useSelector<RootState, ProcessSafeMoveWrapper[]>((state) => selectGameBoardMoveTree(state, id));

	const playOutNextMove = useCallback(() => {
		if (isNextDisabled({ moveTree, currentMove })) {
			stop();
		} else {
			dispatch(goToNextPly({ id }));
			dispatch(createLoadSnapshotAction({ id, worker, args: [currentMove] }));
		}
	}, [currentMove, dispatch, id, moveTree, stop, worker]);
	const onClick: OnClickFunction = useCallback(() => toggle(), [toggle]);

	return (
		<MoveTreeButton isDisabled={() => false} onClick={onClick}>
			<span>{isRunning ? chessGlyphIndex.pause : chessGlyphIndex.play}</span>
		</MoveTreeButton>
	);
};

export const GameMoveTreeControlButtons = () => {
	return (
		<div className={styles["move-controls-row__navigation"]}>
			<GotoBeginningButton />
			<GotoPreviousMoveButton />
			<GotoPreviousPlyButton />
			<PlayPauseButton />
			<GotoNextPlyButton />
			<GotoNextMoveButton />
			<GotoEndButton />
		</div>
	);
};
