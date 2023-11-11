import { assertNonUndefined, createTuple } from "@client/ts/baseTypes";
import type { Board } from "../Board/Board";
import { SpecialMoveSettings, validateBoardMove } from "../Board/BoardMoveValidator";
import { colors, getPlayerNameFromColor, totalPlayers, VariantType } from "../GameInformation/GameData";
import { createPieceFromData } from "../GameInformation/GameUnits/PieceString";
import { assertValidMove, createMoveTree, MoveTreeInterface, verifyValidMove } from "./MoveTree";
import { createBaseMoveWrapper, MoveWrapper, SpecialMove, verifyStandardMove } from "./MoveTreeInterface";
import type { BoardSnapshot } from "@moveGeneration/Board/BoardInterface";

export function validateMoveTree(board: Board, moves: MoveTreeInterface): MoveTreeInterface {
	const clonedBoard = board.createClone();
	clonedBoard.moves = createMoveTree(clonedBoard.createSnapshot(), board);
	clonedBoard.pregenerateAttacks();

	function traverse(
		current: MoveWrapper[],
		currentFullMove = 0,
		currentTimeOnClocks = createTuple(board.gameData.timeControl.baseTime, totalPlayers)
	): MoveWrapper[] {
		const moves: MoveWrapper[] = [];

		let previousSideToMove = -1;
		for (let i = 0; i < current.length; i++) {
			if (clonedBoard.data.gameOver) break;
			const moveWrapper = current[i];

			const { moveData, path, alternativeLines } = moveWrapper;
			const newMoveWrapper = createBaseMoveWrapper(
				{ moveData, path: path.slice() },
				{
					comment: moveWrapper.comment
				}
			);
			let validationResult: SpecialMoveSettings | undefined;
			try {
				if ((validationResult = validateBoardMove(clonedBoard, moveData) || undefined)) {
					newMoveWrapper.moveData = moveData;
				} else break;
			} catch {
				break;
			}

			let firstStandardMoveSet = false;
			for (const moveComponent of moveData) {
				if (verifyStandardMove(moveComponent)) {
					if (moveComponent.promotion) {
						moveComponent.promotion = moveComponent.promotion.map((p) => {
							if (p.isWall()) return p;
							return createPieceFromData(clonedBoard.data.sideToMove, p.piece);
						});
					}

					if (!firstStandardMoveSet) {
						if (validationResult.hasCastling) newMoveWrapper.moveData[0] = validationResult.hasCastling;
						firstStandardMoveSet = true;
					}

					if (validationResult.hasEnPassant) {
						moveComponent.specialType = SpecialMove.EnPassant;
						validationResult.hasEnPassant = false;
					}
					if (validationResult.isIrreversible) moveComponent.isIrreversible = true;
				}
			}

			previousSideToMove = clonedBoard.data.sideToMove;
			let snapshot: BoardSnapshot | undefined, postMoveSnapshot: BoardSnapshot | undefined;
			if (alternativeLines.length) snapshot = clonedBoard.createSnapshot();
			clonedBoard.makeMove(moveData, false, newMoveWrapper.path.length !== 1);

			let invalidLinesBefore = 0;
			if (alternativeLines.length) {
				assertNonUndefined(snapshot);
				postMoveSnapshot = clonedBoard.createSnapshot();
				clonedBoard.loadSnapshot(snapshot);

				const move = clonedBoard.moves.getMove(clonedBoard.moves.currentMove);
				assertValidMove(move);
				for (const line of alternativeLines) {
					move.alternativeLines.push([...line]);
					clonedBoard.moves.currentMove = line[0].path.slice(0, -1).concat([-1]);
					const result = traverse(line, currentFullMove, [...currentTimeOnClocks]);
					if (result.length) {
						newMoveWrapper.alternativeLines.push(invalidLinesBefore ? result.map(move => {
							move.path[move.path.length - 2] -= invalidLinesBefore;
							return move;
						}) : result);
						invalidLinesBefore = 0;
					} else invalidLinesBefore++;
					clonedBoard.loadSnapshot(snapshot);
					clonedBoard.moves.currentMove = [...move.path];
				}

				clonedBoard.loadSnapshot(postMoveSnapshot);
			}

			if (moveWrapper.metadata.playerClock) currentTimeOnClocks[previousSideToMove] -= moveWrapper.metadata.playerClock;
			newMoveWrapper.metadata = { ...moveWrapper.metadata, ...newMoveWrapper.metadata };
			newMoveWrapper.metadata.playerClock = currentTimeOnClocks[previousSideToMove];
			const currentMove = clonedBoard.moves.getMove(newMoveWrapper.path);
			assertValidMove(currentMove);
			currentMove.metadata = newMoveWrapper.metadata;
			currentMove.comment = moveWrapper.comment;
			currentMove.alternativeLines = newMoveWrapper.alternativeLines;
			moves.push(currentMove);
			i += clonedBoard.moves.currentMove[clonedBoard.moves.currentMove.length - 1] - newMoveWrapper.path[newMoveWrapper.path.length - 1];
		}

		return moves;
	}

	traverse(moves.moves);

	let previousMovePath = [-1];
	const loadSnapshotCallback = (move: MoveWrapper) => {
		previousMovePath = [...move.path];
	};

	for (const move of clonedBoard.moves.parametrizedIterator({
		onAlternativeLineStart: loadSnapshotCallback,
		onAllAlternativeLinesEnd: loadSnapshotCallback
	})) {
		const previousMove = clonedBoard.moves.getMove(previousMovePath);
		const boardSnapshot = clonedBoard.moves.getBoardSnapshot(verifyValidMove(previousMove) ? previousMove : -1);
		assertNonUndefined(boardSnapshot);
		clonedBoard.loadSnapshot(boardSnapshot.boardSnapshot);

		clonedBoard.moves.augmentMoveWithMetadata({
			move: move.moveData,
			board: clonedBoard,
			makeMoveFunction() {
				const currentSnapshot = clonedBoard.moves.getBoardSnapshot(move);
				assertNonUndefined(currentSnapshot);
				clonedBoard.loadSnapshot(currentSnapshot.boardSnapshot);
				clonedBoard.moves.currentMove = [...move.path];
				return currentSnapshot.postMoveResults;
			}
		});
		previousMovePath = move.path;
	}

	return clonedBoard.moves;
}

export function changeGameTermination(board: Board) {
	const currentMove = board.moves.getMove([board.moves.moves.length - 1]);
	const snapshot = board.moves.getBoardSnapshot(verifyValidMove(currentMove) ? currentMove : -1);
	assertNonUndefined(snapshot);

	if (snapshot.boardSnapshot.data.gameOver) {
		board.gameData.termination = snapshot.boardSnapshot.data.gameOver;
		if (board.gameData.result) return;
		if (board.isTwoPlayer || board.gameType.type === VariantType.Teams) {
			const currentSnapshot = board.createSnapshot();
			board.loadSnapshot(snapshot.boardSnapshot);
			board.gameData.result = board.data.getCurrentResult();
			board.loadSnapshot(currentSnapshot);
		} else {
			const currentResults: string[] = [];
			const dead = board.data.fenOptions.tag("dead"),
				resigned = board.data.fenOptions.tag("resigned"),
				wb = board.data.fenOptions.tag("wb"),
				points = snapshot.boardSnapshot.data.points;
			for (const color of colors) {
				if (dead[color] || resigned[color]) continue;
				currentResults.push(`${getPlayerNameFromColor(color, wb)}: ${points[color]}`);
			}
			board.gameData.result = currentResults.join(" – ");
		}
	}
}
