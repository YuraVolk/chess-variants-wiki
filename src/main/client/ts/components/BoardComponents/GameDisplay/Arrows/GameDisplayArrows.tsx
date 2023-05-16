import React, { useContext, useState, useRef, useEffect } from "react";
import styles from "../GameDisplay.module.scss";
import type { RootState } from "@client/ts/redux/store";
import { GameDisplayContext } from "@components/BoardComponents/BoardContext";
import { useSelector } from "react-redux";
import { selectGameBoardCurrentMove, selectGameBoardMoveTree } from "@client/ts/logic/index/GameBoardSlice";
import { getMoveFromPathAndTree, ProcessSafeMoveWrapper } from "@moveGeneration/MoveTree/MoveTreeInterface";
import { verifyValidMove } from "@moveGeneration/MoveTree/MoveTree";
import { ArrowsCanvas } from "./GameArrowsCanvas";
import { useOnKeyDown } from "@client/ts/hooks/useOnKeyDown";

interface GameDisplayArrowsProps {
	boardDimension: number;
	baseBoardRef: React.Ref<HTMLElement>;
}
export const GameDisplayArrows = (props: GameDisplayArrowsProps) => {
	const { id } = useContext(GameDisplayContext);
	const currentMove = useSelector<RootState, number[]>((state) => selectGameBoardCurrentMove(state, id));
	const moveTree = useSelector<RootState, ProcessSafeMoveWrapper[]>((state) => selectGameBoardMoveTree(state, id));
	const selectedMove = getMoveFromPathAndTree(moveTree, currentMove);

	const mainCanvasRef = useRef<HTMLCanvasElement>(null);
	const drawingCanvasRef = useRef<HTMLCanvasElement>(null);
	const [arrowsManager, setCanvasArrowsManager] = useState<ArrowsCanvas>();
	useEffect(() => {
		if (
			!mainCanvasRef.current ||
			!drawingCanvasRef.current ||
			!verifyValidMove(selectedMove) ||
			!props.baseBoardRef ||
			typeof props.baseBoardRef === "function"
		)
			return;
		const arrowsManager = new ArrowsCanvas(mainCanvasRef.current, drawingCanvasRef.current, props.boardDimension);
		arrowsManager.clearCanvas();

		for (const arrow of selectedMove.metadata.highlightedArrows) arrowsManager.drawArrow(arrow);
		for (const square of selectedMove.metadata.highlightedSquares) arrowsManager.drawSquare(square);
		arrowsManager.setKeysPressed(new Set());

		const baseBoard = props.baseBoardRef.current;
		const pointerDownListener = (event: PointerEvent) => {
			event.preventDefault();
			arrowsManager.onPointerDown(event);
		};
		const pointerUpListener = (event: PointerEvent) => {
			event.preventDefault();
			arrowsManager.onPointerUp(event);
		};
		const pointerMoveListener = (event: PointerEvent) => {
			event.preventDefault();
			arrowsManager.onPointerMove(event);
		};
		const contextMenuListener = (event: MouseEvent) => {
			event.preventDefault();
		};
		if (baseBoard) {
			baseBoard.addEventListener("pointerdown", pointerDownListener);
			baseBoard.addEventListener("pointerup", pointerUpListener);
			baseBoard.addEventListener("pointermove", pointerMoveListener);
			baseBoard.addEventListener("contextmenu", contextMenuListener);
		}

		setCanvasArrowsManager(arrowsManager);
		return () => {
			baseBoard?.removeEventListener("pointerdown", pointerDownListener);
			baseBoard?.removeEventListener("pointerup", pointerUpListener);
			baseBoard?.removeEventListener("pointermove", pointerMoveListener);
			baseBoard?.removeEventListener("contextmenu", contextMenuListener);
		};
	}, [props, selectedMove, currentMove]);
	useOnKeyDown(["Shift", "Alt", "Control"], (keys) => {
		arrowsManager?.setKeysPressed(keys);
	});

	return (
		<div className={styles["arrows-wrap"]}>
			<canvas className={styles["arrows-wrap__canvas"]} ref={mainCanvasRef}></canvas>
			<canvas className={styles["arrows-wrap__canvas"]} ref={drawingCanvasRef}></canvas>
		</div>
	);
};
