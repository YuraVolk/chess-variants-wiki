import type { BoardSnapshot, PreGeneratedAttacks } from "../Board/BoardInterface";
import {
	MoveWrapper,
	compareMoves,
	getMoveFromPathAndTree,
	MoveTreeSetNewMoveParameters,
	MoveTreeSnapshot,
	Move,
	MoveData,
	verifyStandardMove,
	ProcessSafeMoveWrapper,
	MoveTreeIteratorCallbacks
} from "./MoveTreeInterface";
import { moveNotation } from "./MoveNotationStringifier";
import { compareArrays, findLastIndex } from "@utils/ArrayUtils";
import type { Board, PlayerBooleanTuple } from "@moveGeneration/Board/Board";
import type { PostMoveResults } from "@moveGeneration/FENData/FENDataInterface";
import { pawnPieceString } from "@moveGeneration/GameInformation/GameUnits/PieceString";
import { colors } from "@moveGeneration/GameInformation/GameData";
import { FENOptionsTags, verifyDynamicFENOptionKey } from "@moveGeneration/FENData/FENOptions/FENOptionsTagsInterface";

export function alterCurrentPath(current: number[], path: number[]) {
	let currentMove = [...current];

	for (let i = 0; i < currentMove.length; i++) {
		if (path[i] > currentMove[i]) break;
		if (path[i] === currentMove[i]) {
			if (i === path.length - 1) {
				currentMove = currentMove.slice(0, i + 1);
				currentMove[i]--;
				break;
			}
		} else {
			currentMove = currentMove.slice(0, i + 1);
			currentMove[i] = path[i] - 1;
			break;
		}
	}

	const indexOfMinus = currentMove.indexOf(-1);
	if (indexOfMinus !== -1) {
		currentMove = currentMove.slice(0, indexOfMinus);

		let lastNumber = 0;
		do {
			const popped = currentMove.pop();
			if (popped === undefined) {
				lastNumber = -1;
				break;
			}
			lastNumber = popped;
		} while (lastNumber <= 0);

		if (lastNumber !== -1) currentMove.push(lastNumber);
	}

	return currentMove;
}

export function verifyValidMove<T extends ProcessSafeMoveWrapper>(move: T | T[] | undefined): move is T {
	return move !== undefined && !Array.isArray(move);
}
export function assertValidMove<T extends ProcessSafeMoveWrapper>(move: T | T[] | undefined): asserts move is T {
	if (!move || Array.isArray(move)) {
		throw new Error("The selected move is not a valid move");
	}
}

export const createMoveTree = (baseSnapshot: BoardSnapshot, board: Board) => {
	const snapshots = new WeakMap<MoveWrapper, MoveTreeSnapshot>();
	const boardHashes = new Map<string, Array<readonly number[]>>([[constructPreliminaryHashString(board), [[-2]]]]);
	const moves: MoveWrapper[] = [];
	const startingSnapshot: MoveTreeSnapshot = {
		boardSnapshot: baseSnapshot,
		get postMoveResults(): PostMoveResults {
			throw new Error("Should not access post move results on base move");
		},
		get hash(): string {
			throw new Error("Should not access hash on base move");
		},
		get pregeneratedAttacks(): PreGeneratedAttacks {
			throw new Error("Should not access pregenerated attacks on base move");
		}
	};

	function constructPreliminaryHashString(boardObject: Board) {
		const { board, data } = boardObject;
		let builder = "";
		builder += data.sideToMove;
		let key: keyof FENOptionsTags;
		for (key in data.fenOptions.tags) {
			const tag = data.fenOptions.tags[key];
			if (!verifyDynamicFENOptionKey(tag, key)) continue;
			const serializedForm = tag.serialize();
			if (serializedForm) builder += serializedForm;
		}
		builder = board.reduce((p, n) => p + n.map((ps) => ps.value || "-").join(""), builder);
		return builder;
	}

	function obtainMatchingAlternativeLine(baseMoveWrapper: MoveWrapper, newMoveWrapper: MoveWrapper) {
		for (const [alternativeFirstMove] of baseMoveWrapper.alternativeLines) {
			if (alternativeFirstMove.moveData.length !== newMoveWrapper.moveData.length) continue;
			if (alternativeFirstMove.moveData.every((m, i) => compareMoves(m, newMoveWrapper.moveData[i]))) {
				return alternativeFirstMove.path;
			}
		}

		return baseMoveWrapper.moveData.every((m, i) => compareMoves(m, newMoveWrapper.moveData[i])) ? baseMoveWrapper.path : false;
	}

	function stripEmptyAlternativeLines(current = moves) {
		for (const moveWrapper of current) {
			for (let i = 0; i < moveWrapper.alternativeLines.length; i++) {
				if (moveWrapper.alternativeLines[i].length === 0) {
					moveWrapper.alternativeLines.splice(i, 1);
				} else stripEmptyAlternativeLines(moveWrapper.alternativeLines[i]);
			}
		}
	}

	function stripDeletedMoveHashes(current: MoveWrapper[]) {
		for (const moveWrapper of current) {
			const snapshot = snapshots.get(moveWrapper);
			if (!snapshot) continue;

			const { hash } = snapshot;
			const boardHash = boardHashes.get(hash);
			if (boardHash) {
				if (boardHash.length === 1) {
					boardHashes.delete(hash);
				} else {
					const newPath = moveWrapper.path.map((v, i, p) => (i === p.length - 1 ? v - 1 : v));
					const currentLine = boardHash.findIndex((p) => compareArrays(p, newPath));
					if (currentLine === -1) {
						console.error("Current line for move wrapper not found in board hashes");
					} else {
						boardHash.splice(currentLine, 1);
					}
				}
			}

			for (const line of moveWrapper.alternativeLines) stripDeletedMoveHashes(line);
		}
	}

	function addBoardSnapshot(parameters: MoveTreeSetNewMoveParameters, currentMove: number[]) {
		const { move, snapshot, fenDataString } = parameters;
		snapshots.set(move, {
			...snapshot,
			hash: fenDataString
		});

		const boardHash = boardHashes.get(fenDataString);
		if (boardHash) {
			const hasAdditionalPath = boardHash.find((p) => compareArrays(p, currentMove));
			boardHashes.set(fenDataString, hasAdditionalPath ? boardHash : [...boardHash, currentMove.slice()]);
		} else boardHashes.set(fenDataString, [currentMove.slice()]);
	}

	function* iterateMovesDFS(moveWrapper: MoveWrapper, callbacks: MoveTreeIteratorCallbacks): Generator<MoveWrapper, void, undefined> {
		yield moveWrapper;

		if (moveWrapper.alternativeLines.length) callbacks.onAllAlternativeLinesStart?.(moveWrapper);
		for (const alternativeLine of moveWrapper.alternativeLines) {
			callbacks.onAlternativeLineStart?.(moveWrapper, alternativeLine);
			for (const move of alternativeLine) yield* iterateMovesDFS(move, callbacks);
			callbacks.onAlternativeLineEnd?.(moveWrapper, alternativeLine);
		}

		if (moveWrapper.alternativeLines.length) callbacks.onAllAlternativeLinesEnd?.(moveWrapper);
	}

	const assignMoveWrapperKey = <K extends keyof MoveWrapper>(object: MoveWrapper, key: K, value: MoveWrapper[K]) => {
		object[key] = value;
	};

	return {
		moves,
		currentMove: [-1],
		getMove(path: number[]): MoveWrapper | MoveWrapper[] | undefined {
			return getMoveFromPathAndTree(moves, path);
		},
		setNewMove(parameters: MoveTreeSetNewMoveParameters): number[] {
			const { move } = parameters;
			const moveWrapper = this.getMove(parameters.noPathSlice ? move.path : move.path.slice(0, -1));
			let path = move.path.slice();

			if (!moveWrapper) return path;
			if (Array.isArray(moveWrapper)) {
				if (moveWrapper.length > move.path[move.path.length - 1]) {
					const currentMove = this.getMove(move.path);
					if (Array.isArray(currentMove)) {
						this.setNewMove({ ...parameters, move: { ...move, path: [...move.path, currentMove.length] } });
					} else if (currentMove) {
						const alternativeLine = obtainMatchingAlternativeLine(currentMove, move);
						if (alternativeLine) {
							return alternativeLine;
						} else {
							currentMove.alternativeLines.push([]);
							const newMove = { ...move, path: [...move.path, currentMove.alternativeLines.length - 1, 0] };
							path = newMove.path.slice();
							return this.setNewMove({ ...parameters, move: newMove });
						}
					}
				} else {
					moveWrapper.push(move);
					addBoardSnapshot(parameters, this.currentMove);
				}
			} else {
				let key: keyof MoveWrapper;
				for (key in move) {
					if (Object.prototype.hasOwnProperty.call(move, key)) assignMoveWrapperKey(moveWrapper, key, move[key]);
				}
				addBoardSnapshot(
					{
						...parameters,
						move: moveWrapper
					},
					this.currentMove
				);
			}

			return path;
		},
		getBoardSnapshot(move: MoveWrapper | -1) {
			if (move === -1) {
				return startingSnapshot;
			} else {
				return snapshots.get(move);
			}
		},
		deleteMove(path: number[]) {
			let items: MoveWrapper[] = [];
			const moveWrapper = this.getMove(path.slice(0, -1));
			if (!moveWrapper) return;
			const finalIndex = path[path.length - 1];
			if (Array.isArray(moveWrapper)) {
				items = [...moveWrapper.splice(finalIndex, moveWrapper.length - finalIndex)];
			} else {
				if (moveWrapper.alternativeLines.length > 0) {
					items = moveWrapper.alternativeLines.splice(path[path.length - 1], 1)[0];
				}
			}

			stripDeletedMoveHashes(items);
			stripEmptyAlternativeLines();
			const newCurrentMove = alterCurrentPath(this.currentMove, path);
			this.currentMove = newCurrentMove.length === 0 ? [-1] : newCurrentMove;
		},
		getHash(preliminaryHashString: string): number {
			const hash = boardHashes.get(preliminaryHashString);
			if (hash === undefined) return 0;

			let totalCount = 0;
			for (const line of hash) {
				for (let i = 0; i < line.length; i++) {
					if (i === line.length - 1) {
						totalCount++;
					} else if (line[i] !== this.currentMove[i]) break;
				}
			}

			return totalCount;
		},
		stringifyMove(moveWrapper: MoveWrapper, dimension: number) {
			const snapshot = this.getBoardSnapshot(moveWrapper);
			if (!snapshot) {
				console.error("No snapshot assigned when moveWrapper is called");
				return "";
			}

			let key: keyof typeof moveNotation;
			for (key in moveNotation) {
				if (!Object.prototype.hasOwnProperty.call(moveNotation, key)) continue;
				moveWrapper.cachedNames[key] = moveNotation[key](moveWrapper, snapshot, dimension);
			}
		},
		augmentMoveWithMetadata(parameters: { move: Move; board: Board; makeMoveFunction: () => PostMoveResults }) {
			const { move, board, makeMoveFunction } = parameters;
			const standardMove = move.find<MoveData>((m): m is MoveData => verifyStandardMove(m));
			const movingPiece = standardMove ? board.board[standardMove.startCoordinates[0]][standardMove.startCoordinates[1]] : pawnPieceString;
			const capturedPieces = standardMove ? board.data.getCapturedPieces(standardMove).length !== 0 : false;
			const postMoveResults = makeMoveFunction();
			const deadColors: PlayerBooleanTuple = [...board.data.fenOptions.tag("dead")];
			const currentSideToMove = board.data.sideToMove,
				currentMove = board.moves.getMove(board.moves.currentMove);
			assertValidMove(currentMove);
			if (currentMove.metadata.currentFullMove && currentMove.metadata.currentSideToMove) return;

			if (
				board.moves.currentMove[board.moves.currentMove.length - 1] === 0 ||
				findLastIndex(deadColors, (b) => !b) === currentSideToMove
			) {
				const lastCurrentMoves = board.moves.getMove(board.moves.currentMove.slice(0, -1));
				if (!Array.isArray(lastCurrentMoves)) throw new Error("The selected move is not within an array");
				for (let i = lastCurrentMoves.length - 1; i >= 0; i--) {
					const lastCurrent = lastCurrentMoves[i].metadata.currentFullMove;
					if (lastCurrent) {
						currentMove.metadata.currentFullMove = lastCurrent + 1;
						break;
					} else if (i === 0) {
						if (currentMove.path.length === 1) {
							currentMove.metadata.currentFullMove = 1;
						} else {
							const alternativeLineContainer = board.moves.getMove(board.moves.currentMove.slice(0, -3));
							if (!Array.isArray(alternativeLineContainer)) throw new Error("The selected move is not within an array");
							currentMove.metadata.currentFullMove =
								alternativeLineContainer[
									alternativeLineContainer.findIndex((m) => Boolean(m.metadata.currentFullMove))
								].metadata.currentFullMove;
						}
					}
				}
			}
			currentMove.metadata.currentSideToMove = currentSideToMove;
			currentMove.metadata.isCapture = capturedPieces;
			currentMove.metadata.movingPiece = movingPiece;
			for (const color of colors) {
				if (postMoveResults.checkmates[color]) {
					currentMove.metadata.checkmates++;
				} else if (postMoveResults.checks[color]) {
					currentMove.metadata.checks++;
				}
			}

			this.stringifyMove(currentMove, Math.max(...board.data.fenOptions.tag("dim")));
		},
		constructPreliminaryHashString(boardObject: Board) {
			return constructPreliminaryHashString(boardObject);
		},
		*parametrizedIterator(callbacks: MoveTreeIteratorCallbacks) {
			for (const move of moves) yield* iterateMovesDFS(move, callbacks);
		},
		*[Symbol.iterator]() {
			for (const move of moves) yield* iterateMovesDFS(move, {});
		}
	};
};

export type MoveTreeInterface = ReturnType<typeof createMoveTree>;
