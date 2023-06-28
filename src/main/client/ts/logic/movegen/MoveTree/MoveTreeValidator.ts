import { assertNonUndefined, createTuple } from "@client/ts/baseTypes";
import { findLastIndex } from "@utils/ArrayUtils";
import type { Board } from "../Board/Board";
import { SpecialMoveSettings, validateBoardMove } from "../Board/BoardMoveValidator";
import { colors, getPlayerNameFromColor, totalPlayers, VariantType } from "../GameInformation/GameData";
import { createPieceFromData } from "../GameInformation/GameUnits/PieceString";
import { assertValidMove, createMoveTree, MoveTreeInterface, verifyValidMove } from "./MoveTree";
import { createBaseMoveWrapper, MoveWrapper, SpecialMove, verifyStandardMove } from "./MoveTreeInterface";

export function validateMoveTree(board: Board, moves: MoveTreeInterface): MoveTreeInterface {
	const clonedBoard = board.createClone();
	clonedBoard.moves = createMoveTree(clonedBoard.createSnapshot());
	clonedBoard.pregenerateAttacks();

	const dimension = Math.max(...clonedBoard.data.fenOptions.tag("dim"));
	function traverse(
		current: MoveWrapper[],
		currentFullMove = 0,
		currentTimeOnClocks = createTuple(board.gameData.timeControl.baseTime, totalPlayers)
	): MoveWrapper[] {
		const moves: MoveWrapper[] = [];

		let previousSideToMove = -1;
		for (let i = 0; i < current.length; i++) {
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
						if (validationResult.hasCastling) {
							newMoveWrapper.moveData[0] = validationResult.hasCastling;
						} else {
							newMoveWrapper.metadata.movingPiece =
								clonedBoard.board[moveComponent.startCoordinates[0]][moveComponent.startCoordinates[1]];
						}

						firstStandardMoveSet = true;
					}

					if (validationResult.hasEnPassant) {
						moveComponent.specialType = SpecialMove.EnPassant;
						validationResult.hasEnPassant = false;
						newMoveWrapper.metadata.isCapture = true;
					}

					if (!validationResult.hasCastling && clonedBoard.data.getCapturedPieces(moveComponent).length > 0) {
						newMoveWrapper.metadata.isCapture = true;
					}
				}
			}

			if (i === 0 || findLastIndex(clonedBoard.data.fenOptions.tag("dead"), (b) => !b) === previousSideToMove) {
				newMoveWrapper.metadata.currentFullMove = ++currentFullMove;
			}
			newMoveWrapper.metadata.currentSideToMove = previousSideToMove = clonedBoard.data.sideToMove;
			const results = clonedBoard.makeMove(moveData);
			for (let i = 0; i < totalPlayers; i++) {
				if (results.checkmates[i]) {
					newMoveWrapper.metadata.checkmates++;
				} else if (results.checks[i]) {
					newMoveWrapper.metadata.checks++;
				}
			}

			for (const line of alternativeLines) {
				newMoveWrapper.alternativeLines.push(traverse(line, currentFullMove, [...currentTimeOnClocks]));
			}

			if (moveWrapper.metadata.playerClock) {
				currentTimeOnClocks[previousSideToMove] -= moveWrapper.metadata.playerClock;
			}
			newMoveWrapper.metadata = { ...moveWrapper.metadata, ...newMoveWrapper.metadata };
			newMoveWrapper.metadata.playerClock = currentTimeOnClocks[previousSideToMove];
			const currentMove = clonedBoard.moves.getMove(newMoveWrapper.path);
			assertValidMove(currentMove);
			currentMove.metadata = newMoveWrapper.metadata;
			currentMove.comment = moveWrapper.comment;
			clonedBoard.moves.stringifyMove(currentMove, dimension);
		}

		return moves;
	}

	traverse(moves.moves);
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
