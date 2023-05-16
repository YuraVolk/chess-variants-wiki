import type { PieceLetter } from "@moveGeneration/PieceControl/PieceControlInterface";
import type { InsufficientMaterialState } from "./InsufficientMaterialConstructor";
import type { BoardSquares } from "@client/ts/logic/BaseInterfaces";
import type { ImplementInterface, Tuple } from "@client/ts/baseTypes";
import type { totalPlayers } from "@moveGeneration/GameInformation/GameData";

interface SerializedInsufficientMaterialDraft {
	readonly backwardsPieceRegistry: Record<PieceLetter, BoardSquares<number | null>>;
	readonly optimizedPieces: PieceLetter[];
	readonly pieceSquareMedians: Record<PieceLetter, Record<number, Tuple<number | undefined, typeof totalPlayers>>>;
}
export type SerializedInsufficientMaterialState = ImplementInterface<InsufficientMaterialState, SerializedInsufficientMaterialDraft>;

export function serializeInsufficientMaterialState(state: InsufficientMaterialState): SerializedInsufficientMaterialState {
	const backwardsPieceRegistry: Record<PieceLetter, BoardSquares<number | null>> = {};
	const counters: Record<symbol, number> = {};

	let individualCounter = 0;
	let key: PieceLetter;
	for (key in state.backwardsPieceRegistry) {
		if (!Object.prototype.hasOwnProperty.call(state.backwardsPieceRegistry, key)) continue;
		backwardsPieceRegistry[key] = state.backwardsPieceRegistry[key].map((r) =>
			r.map((e) => {
				if (e !== null) {
					if (e in counters) {
						return counters[e];
					} else {
						counters[e] = individualCounter++;
						return counters[e];
					}
				} else return e;
			})
		);
	}

	const pieceSquareMedians: Record<PieceLetter, Record<number, Tuple<number | undefined, typeof totalPlayers>>> = {};
	for (key in state.pieceSquareMedians) {
		if (!Object.prototype.hasOwnProperty.call(state.pieceSquareMedians, key)) continue;
		const result: Record<number, Tuple<number | undefined, typeof totalPlayers>> = {};
		for (const symbol of Object.getOwnPropertySymbols(state.pieceSquareMedians[key])) {
			if (symbol in counters) {
				result[counters[symbol]] = state.pieceSquareMedians[key][symbol];
			} else result[individualCounter--] = state.pieceSquareMedians[key][symbol];
		}
		pieceSquareMedians[key] = result;
	}

	return {
		...state,
		backwardsPieceRegistry,
		pieceSquareMedians,
		optimizedPieces: [...state.optimizedPieces]
	};
}

export function deserializeInsufficientMaterialState(state: SerializedInsufficientMaterialState): InsufficientMaterialState {
	const backwardsPieceRegistry: Record<PieceLetter, BoardSquares<symbol | null>> = {};
	const counters: Record<PieceLetter, Record<number, symbol>> = {};
	let key: PieceLetter;
	for (key in state.backwardsPieceRegistry) {
		if (!Object.prototype.hasOwnProperty.call(state.backwardsPieceRegistry, key)) continue;
		counters[key] = {};
		backwardsPieceRegistry[key] = state.backwardsPieceRegistry[key].map((r) =>
			r.map((e) => {
				if (e !== null) {
					if (!(e in counters[key])) counters[key][e] = Symbol();
					return counters[key][e];
				} else return e;
			})
		);
	}

	const pieceSquareMedians: Record<PieceLetter, Record<symbol, Tuple<number | undefined, typeof totalPlayers>>> = {};
	for (key in state.pieceSquareMedians) {
		if (!Object.prototype.hasOwnProperty.call(state.pieceSquareMedians, key)) continue;
		const result: Record<symbol, Tuple<number | undefined, typeof totalPlayers>> = {};
		for (const numericKey in state.pieceSquareMedians[key]) {
			if (!Object.prototype.hasOwnProperty.call(state.pieceSquareMedians[key], numericKey)) continue;
			const indexingNumber = Number(numericKey);
			if (key in counters && indexingNumber in counters[key]) {
				result[counters[key][indexingNumber]] = state.pieceSquareMedians[key][indexingNumber];
			} else result[Symbol()] = state.pieceSquareMedians[key][indexingNumber];
		}
		pieceSquareMedians[key] = result;
	}

	return {
		...state,
		backwardsPieceRegistry,
		pieceSquareMedians,
		optimizedPieces: new Set(state.optimizedPieces)
	};
}
