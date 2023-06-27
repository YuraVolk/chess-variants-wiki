import { Tuple } from "../baseTypes";

export function shuffleArray<T>(array: T[]): T[];
export function shuffleArray<T, L extends number>(array: Tuple<T, L>): Tuple<T, L>;
export function shuffleArray<T, L extends number>(array: T[] | Tuple<T, L>): T[] | Tuple<T, L> {
	let i = array.length;
	let r = 0;
	while (i !== 0) {
		r = Math.floor(Math.random() * i--);
		[array[i], array[r]] = [array[r], array[i]];
	}

	return array;
}

export function compareArrays(arr1: unknown[] | readonly unknown[], arr2: unknown[] | readonly unknown[]): boolean {
	if (arr1 === arr2) return true;
	if (arr1.length !== arr2.length) return false;
	for (let i = 0; i < arr1.length; i++) {
		const first = arr1[i],
			second = arr2[i];
		if (Array.isArray(first) && Array.isArray(second)) {
			if (!compareArrays(first, second)) return false;
		} else if (first !== second) {
			return false;
		}
	}

	return true;
}

export function countMinimumOf2DArrayExcludingZero(array: number[][]): number {
	let minimum = Infinity;
	for (const row of array) {
		for (const number of row) {
			if (number !== 0 && number < minimum) {
				minimum = number;
			}
		}
	}

	return minimum;
}

export function findLastIndex<T>(array: T[], callback: (value: T, index: number, arr: T[]) => boolean): number {
	let i = array.length;
	while (i--) {
		if (callback(array[i], i, array)) return i;
	}
	return -1;
}

export function filterDuplicatesByClass<T>(array: T[]) {
	const classes = new Set<unknown>(),
		result: T[] = [];
	for (const object of array) {
		const construct = array.constructor;
		if (!classes.has(construct)) {
			classes.add(construct);
			result.push(object);
		}
	}

	return result;
}
