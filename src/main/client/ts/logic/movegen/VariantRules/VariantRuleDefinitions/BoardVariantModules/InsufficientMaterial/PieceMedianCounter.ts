import { createTupleFromCallback, Tuple } from "@client/ts/baseTypes";
import { BoardSquares, initializeBoardSquares } from "@client/ts/logic/BaseInterfaces";
import { boardDimension, colors, totalPlayers } from "@moveGeneration/GameInformation/GameData";
import type { PieceLetter } from "@moveGeneration/PieceControl/PieceControlInterface";
import { countMinimumOf2DArrayExcludingZero } from "@client/ts/utils/ArrayUtils";
import { countBitsOnBoard } from "./Utilities";

export type PieceMedianCounterReturnType = Tuple<number | undefined, typeof totalPlayers>;
interface PieceMedianCounterSettings {
	walls: BoardSquares<boolean>;
	moveRegistryArray: ArrayBufferLike[][];
	royalPieceSet: Tuple<PieceLetter[], typeof totalPlayers>;
	royalMoves: Tuple<ArrayBufferLike[][], typeof totalPlayers>;
}

self.onmessage = (e: MessageEvent<PieceMedianCounterSettings>) => {
	const { walls, royalPieceSet, royalMoves, moveRegistryArray } = e.data;
	const resultingMedianArray = createTupleFromCallback<BoardSquares<number> | undefined, typeof totalPlayers>(
		() => initializeBoardSquares(() => 0),
		totalPlayers
	);
	for (let i = 0; i < boardDimension; i++) {
		for (let j = 0; j < boardDimension; j++) {
			if (walls[i][j]) continue;
			const moves = new Uint16Array(moveRegistryArray[i][j]);
			for (const color of colors) {
				if (royalPieceSet[color].length === 0) {
					resultingMedianArray[color] = undefined;
					continue;
				} else {
					let resultingSquares = 0;
					for (let royalI = 0; royalI < boardDimension; royalI++) {
						for (let royalJ = 0; royalJ < boardDimension; royalJ++) {
							const royalMoveSet = new Uint16Array(royalMoves[color][royalI][royalJ]);
							const result = moves.map((e, x) => e & royalMoveSet[x]);
							const newResultingSquares = countBitsOnBoard(result);

							if (newResultingSquares > resultingSquares) {
								resultingSquares = newResultingSquares;
							}
						}
					}

					const resultingMedian = resultingMedianArray[color];
					if (resultingMedian) resultingMedian[i][j] = resultingSquares;
				}
			}
		}
	}

	postMessage(
		resultingMedianArray.map((arr) => {
			if (arr) {
				const minimum = countMinimumOf2DArrayExcludingZero(arr);
				return minimum === Infinity ? 0 : minimum;
			} else return arr;
		})
	);
};
