import type { RootState } from "@client/ts/redux/store";
import type { ProcessSafeMoveWrapper } from "@moveGeneration/MoveTree/MoveTreeInterface";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { GameDisplayContext } from "../BoardContext";
import styles from "./GameMoveTree.module.scss";
import { GameMoveTreeControls } from "./GameMoveTreeControls";
import { GameMoveList } from "./GameMoveTreeMove";
import { selectGameBoardMoveTree } from "@client/ts/logic/index/GameBoardSlice";

export const GameMoveTreeDisplay = () => {
	const id = useContext(GameDisplayContext).id;
	const moveTree = useSelector<RootState, ProcessSafeMoveWrapper[]>((state) => selectGameBoardMoveTree(state, id));

	return (
		<div className={styles["move-tree-wrap"]}>
			<div className={styles["move-tree"]}>
				<GameMoveList moves={moveTree} />
			</div>
			<GameMoveTreeControls />
		</div>
	);
};
