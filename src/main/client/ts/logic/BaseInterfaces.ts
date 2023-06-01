import { NumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { assertDevOnly, createTupleFromCallback, Tuple } from "../baseTypes";
import { boardDimension } from "./movegen/GameInformation/GameData";

export interface Cloneable<T> {
	createClone(): T;
}

export interface Memento<S> {
	createSnapshot(): S;
	loadSnapshot(snapshot: S): void;
}

export type BoardSquares<T> = Tuple<Tuple<T, typeof boardDimension>, typeof boardDimension>;
export const initializeBoardSquares = <T>(baseValue: (v: unknown, k: number) => T): BoardSquares<T> =>
	createTupleFromCallback(() => createTupleFromCallback(baseValue, boardDimension), boardDimension);

export const isVerticalPlacement = (color: NumericColor): color is 0 | 2 => color % 2 === 0;
export function getVerticalPlacementModulus(num: number): 0 | 1 {
	const result = num % 2;
	assertDevOnly(result === 0 || result === 1);
	return result;
}
export function getHorizontalPlacementModulus(num: number): 0 | 1 {
	const result = num % 2 ^ 1;
	assertDevOnly(result === 0 || result === 1);
	return result;
}
