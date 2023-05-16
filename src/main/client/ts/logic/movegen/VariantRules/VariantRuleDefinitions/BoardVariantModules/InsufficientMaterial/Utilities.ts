import { boardDimension } from "@moveGeneration/GameInformation/GameData";
import { PieceLetter, verifyPieceLetter } from "@moveGeneration/PieceControl/PieceControlInterface";
import { bitCount } from "@utils/NumberUtils";

export const binaryMasks = Array(boardDimension)
	.fill(1)
	.map((v, i) => (v << boardDimension) | (v << (boardDimension - 1 - i)));
export const oneBitMask = 1 << boardDimension;

export function countBitsOnBoard(board: Uint16Array): number {
	let setBits = 0;
	for (let x = 0; x < boardDimension; x++) {
		setBits += bitCount(board[x] ^ oneBitMask);
	}

	return setBits;
}

export function findMinimumOnBoardSquares(board: Uint16Array[][]): number {
	let minimum = Infinity;
	for (let i = 0; i < boardDimension; i++) {
		for (let j = 0; j < boardDimension; j++) {
			const setBits = countBitsOnBoard(board[i][j]);
			if (setBits !== 0 && setBits < minimum) {
				minimum = setBits;
			}
		}
	}

	return minimum;
}

export function optimizePieceSet(possiblePieces: string[], maximumTarget: boolean): Set<PieceLetter> {
	const optimalRoyalMoveSets = [
		["β", "W", "R", "E", "M", "Q", "D", "A"],
		["γ", "F", "B", "H", "M", "Q", "D", "A", "Δ"],
		["Y", "Z"],
		["I", "J"],
		["S", "T"],
		["S", "Y"],
		["I", "Y"],
		["U", "N", "O"],
		["H", "A"],
		["E", "A"],
		["Δ", "H"],
		["C", "L"],
		["C", "V"]
	];
	const moveSet = new Set<PieceLetter>();
	for (const optimalMoveSet of optimalRoyalMoveSets) {
		const detractionSet = maximumTarget ? optimalMoveSet.slice().reverse() : optimalMoveSet;
		for (const piece of possiblePieces) {
			if (detractionSet.includes(piece)) {
				const target = detractionSet.slice(0, -detractionSet.indexOf(piece));
				target.forEach((t) => {
					if (possiblePieces.includes(t) && verifyPieceLetter(t)) moveSet.add(t);
				});
				break;
			}
		}
	}

	if (moveSet.size === 0) {
		possiblePieces.forEach((p) => {
			if (verifyPieceLetter(p)) moveSet.add(p);
		});
	}

	return moveSet;
}
