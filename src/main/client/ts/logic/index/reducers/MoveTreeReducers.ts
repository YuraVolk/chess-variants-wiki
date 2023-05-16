import { totalPlayers } from "@moveGeneration/GameInformation/GameData";
import { assertValidMove, verifyValidMove } from "@moveGeneration/MoveTree/MoveTree";
import { getMoveFromPathAndTree } from "@moveGeneration/MoveTree/MoveTreeInterface";
import type { Draft, EntityState, PayloadAction } from "@reduxjs/toolkit";
import { compareArrays } from "@utils/ArrayUtils";
import { GameBoardObject, gameBoardsAdapter } from "../GameBoardSlice";

export const moveTreeActionTypes = {
	goToBeginning: "gameBoards/goToBeginning",
	goToPreviousMove: "gameBoards/goToPreviousMove",
	goToPreviousPly: "gameBoards/goToPreviousPly",
	goToNextPly: "gameBoards/goToNextPly",
	goToNextMove: "gameBoards/goToNextMove",
	goToEnd: "gameBoards/goToEnd"
} as const;

export const moveTreeReducers = {
	goToBeginning: (state, action) => {
		gameBoardsAdapter.updateOne(state, {
			type: moveTreeActionTypes.goToBeginning,
			payload: { id: action.payload.id, changes: { currentMove: [-1] } }
		});
	},
	goToPreviousMove: (state, action) => {
		const gameBoardObject = gameBoardsAdapter.getSelectors().selectById(state, action.payload.id);
		if (!gameBoardObject) return;
		const { moveTree, currentMove } = gameBoardObject;
		const moveInformation = getMoveFromPathAndTree(moveTree, currentMove);
		assertValidMove(moveInformation);
		if (compareArrays(currentMove, [-1])) return;
		const sideToMove = moveInformation.metadata.currentSideToMove;

		let newCurrentMove = currentMove.slice();
		for (let i = 0; i < totalPlayers; i++) {
			const iteratedCurrentMove = newCurrentMove.slice();
			iteratedCurrentMove[iteratedCurrentMove.length - 1]--;
			if (compareArrays(iteratedCurrentMove, [-1])) {
				newCurrentMove = [-1];
				break;
			} else {
				const selectedMove = getMoveFromPathAndTree(moveTree, iteratedCurrentMove);
				if (!verifyValidMove(selectedMove)) break;
				newCurrentMove = iteratedCurrentMove;
				if (selectedMove.metadata.currentSideToMove === sideToMove) break;
			}
		}

		gameBoardsAdapter.updateOne(state, {
			type: moveTreeActionTypes.goToPreviousMove,
			payload: { id: action.payload.id, changes: { currentMove: newCurrentMove } }
		});
	},
	goToPreviousPly: (state, action) => {
		const gameBoardObject = gameBoardsAdapter.getSelectors().selectById(state, action.payload.id);
		if (!gameBoardObject || compareArrays(gameBoardObject.currentMove, [-1])) return;
		const newCurrentMove = gameBoardObject.currentMove.slice();
		newCurrentMove[newCurrentMove.length - 1]--;

		gameBoardsAdapter.updateOne(state, {
			type: moveTreeActionTypes.goToPreviousPly,
			payload: { id: action.payload.id, changes: { currentMove: newCurrentMove } }
		});
	},
	goToNextPly: (state, action) => {
		const gameBoardObject = gameBoardsAdapter.getSelectors().selectById(state, action.payload.id);
		if (!gameBoardObject) return;
		const { currentMove, moveTree } = gameBoardObject;
		const newCurrentMove = currentMove.slice();
		newCurrentMove[newCurrentMove.length - 1]++;

		if (!getMoveFromPathAndTree(moveTree, newCurrentMove)) return;
		gameBoardsAdapter.updateOne(state, {
			type: moveTreeActionTypes.goToNextPly,
			payload: { id: action.payload.id, changes: { currentMove: newCurrentMove } }
		});
	},
	goToNextMove: (state, action) => {
		const gameBoardObject = gameBoardsAdapter.getSelectors().selectById(state, action.payload.id);
		if (!gameBoardObject) return;
		const { moveTree, currentMove } = gameBoardObject;
		const moveInformation = getMoveFromPathAndTree(moveTree, currentMove);
		assertValidMove(moveInformation);
		const sideToMove = moveInformation.metadata.currentSideToMove;

		let newCurrentMove = currentMove.slice();
		for (let i = 0; i < totalPlayers; i++) {
			const iteratedCurrentMove = newCurrentMove.slice();
			iteratedCurrentMove[iteratedCurrentMove.length - 1]++;
			const selectedMove = getMoveFromPathAndTree(moveTree, iteratedCurrentMove);
			if (!verifyValidMove(selectedMove)) break;
			newCurrentMove = iteratedCurrentMove;
			if (selectedMove.metadata.currentSideToMove === sideToMove) break;
		}

		gameBoardsAdapter.updateOne(state, {
			type: moveTreeActionTypes.goToNextMove,
			payload: { id: action.payload.id, changes: { currentMove: newCurrentMove } }
		});
	},
	goToEnd: (state, action) => {
		const gameBoardObject = gameBoardsAdapter.getSelectors().selectById(state, action.payload.id);
		if (!gameBoardObject) return;
		gameBoardsAdapter.updateOne(state, {
			type: moveTreeActionTypes.goToEnd,
			payload: { id: action.payload.id, changes: { currentMove: [gameBoardObject.moveTree.length - 1] } }
		});
	}
} satisfies Record<string, (state: Draft<EntityState<GameBoardObject>>, action: PayloadAction<{ id: number }>) => void>;
