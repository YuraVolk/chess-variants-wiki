// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FunctionType = (...args: any[]) => any;
export const verifyFunctionType = (func: unknown): func is FunctionType => typeof func === "function";

export type Length<T extends unknown[]> = T extends { length: infer L } ? L : never;
export type Tuple<T, N extends number> = N extends N ? (number extends N ? T[] : _TupleOf<T, N, []>) : never;
type _TupleOf<T, N extends number, R extends unknown[]> = R["length"] extends N ? R : _TupleOf<T, N, [T, ...R]>;

export type Add<A extends number, B extends number> = Length<[...Tuple<unknown, A>, ...Tuple<unknown, B>]>;
export const createTuple = <T, L extends number>(val: T, length: L) => Array.from<L, T>({ length }).fill(val);
export const createTupleFromCallback = <T, L extends number>(val: (v: unknown, k: number) => T, length: L): Tuple<T, L> =>
	Array.from({ length }, val);
export const verifyTupleType = <T, L extends number>(arr: T[], length: L): arr is Tuple<T, L> => arr.length === length;

export type SimplexType = number | boolean | string | symbol | null | undefined | object | bigint;
export type ImplementInterface<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export function assertNonUndefined<T>(data: T): asserts data is NonNullable<T> {
	if (data == null) throw new Error("Expected the data above to be anything but null or undefined");
}
export function assertDevOnly(condition: boolean): asserts condition {
	if (process.env.NODE_ENV === "development") {
		if (!condition) throw new Error("Dev only condition assertion is not satisfied, the condition resulted in false");
	}
}

export function throwOnNever(arg: never): never {
	console.dir(arg);
	throw new TypeError(`Unexpected argument that is supposed to be of type never`);
}

export function importAll(r: __WebpackModuleApi.RequireContext) {
	r.keys().forEach(r);
}

export function getEnumKeys<T extends Record<PropertyKey, unknown>>(object: Record<keyof T, unknown>): Array<keyof T> {
	const resultingArray: Array<keyof T> = [];
	let key: keyof T;
	for (key in object) resultingArray.push(key);
	return resultingArray;
}

type ArrayKeys<T extends unknown[] | readonly unknown[]> = Exclude<Partial<T>["length"], T["length"]> extends never | undefined
	? number
	: Exclude<Partial<T>["length"], T["length"]>;

declare global {
	interface Array<T> {
		indexOf(searchElement: T, fromIndex?: number): ArrayKeys<this> | -1;
		lastIndexOf(searchElement: T, fromIndex?: number): ArrayKeys<this> | -1;
		every<S extends T>(predicate: (value: T, index: ArrayKeys<this>, array: T[]) => value is S): this is { [K in keyof this]: S };
		every(predicate: (value: T, index: ArrayKeys<this>, array: T[]) => unknown, thisArg?: T[]): boolean;
		some(predicate: (value: T, index: ArrayKeys<this>, array: T[]) => unknown, thisArg?: T[]): boolean;
		forEach(callbackfn: (value: T, index: ArrayKeys<this>, array: T[]) => void, thisArg?: T[]): void;
		map<U>(callbackfn: (value: T, index: ArrayKeys<this>, array: T[]) => U): { [K in keyof this]: U };
		filter<S extends T>(predicate: (value: T, index: ArrayKeys<this>, array: T[]) => value is S, thisArg?: T[]): S[];
		filter(predicate: (value: T, index: ArrayKeys<this>, array: T[]) => unknown, thisArg?: T[]): T[];
		reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: ArrayKeys<this>, array: T[]) => T): T;
		reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: ArrayKeys<this>, array: T[]) => T, initialValue: T): T;
		reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: ArrayKeys<this>, array: T[]) => U, initialValue: U): U;
		reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: ArrayKeys<this>, array: T[]) => T): T;
		reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: ArrayKeys<this>, array: T[]) => T, initialValue: T): T;
		reduceRight<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: ArrayKeys<this>, array: T[]) => U, initialValue: U): U;
	}

	interface ReadonlyArray<T> {
		indexOf(searchElement: T, fromIndex?: number): ArrayKeys<this> | -1;
		lastIndexOf(searchElement: T, fromIndex?: number): ArrayKeys<this> | -1;
		every<S extends T>(
			predicate: (value: T, index: ArrayKeys<this>, array: readonly T[]) => value is S,
			thisArg?: T[]
		): this is { readonly [K in keyof this]: S };
		every(predicate: (value: T, index: ArrayKeys<this>, array: readonly T[]) => unknown, thisArg?: T[]): boolean;
		some(predicate: (value: T, index: ArrayKeys<this>, array: readonly T[]) => unknown, thisArg?: T[]): boolean;
		forEach(callbackfn: (value: T, index: ArrayKeys<this>, array: readonly T[]) => void, thisArg?: T[]): void;
		map<U>(callbackfn: (value: T, index: ArrayKeys<this>, array: readonly T[]) => U, thisArg?: T[]): U[];
		filter<S extends T>(predicate: (value: T, index: ArrayKeys<this>, array: readonly T[]) => value is S, thisArg?: T[]): S[];
		filter(predicate: (value: T, index: ArrayKeys<this>, array: readonly T[]) => unknown, thisArg?: T[]): T[];
		reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: ArrayKeys<this>, array: readonly T[]) => T): T;
		reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: ArrayKeys<this>, array: readonly T[]) => T, initialValue: T): T;
		reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: ArrayKeys<this>, array: readonly T[]) => U, initialValue: U): U;
		reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: ArrayKeys<this>, array: readonly T[]) => T): T;
		reduceRight(
			callbackfn: (previousValue: T, currentValue: T, currentIndex: ArrayKeys<this>, array: readonly T[]) => T,
			initialValue: T
		): T;
		reduceRight<U>(
			callbackfn: (previousValue: U, currentValue: T, currentIndex: ArrayKeys<this>, array: readonly T[]) => U,
			initialValue: U
		): U;
	}

	interface ArrayConstructor {
		from<L extends number, T>(arrayLike: { readonly length: L }): Tuple<T, L>;
		from<T, U, L extends number>(iterable: { readonly length: L }, mapfn: (v: T, k: number) => U, thisArg?: T[]): Tuple<U, L>;
	}
}
