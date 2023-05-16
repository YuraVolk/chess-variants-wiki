export function copyClass<T, P extends unknown[]>(instance: T, baseClass: new (...args: P) => T, customProperties = false): T {
	const prototype: unknown = Object.getPrototypeOf(instance);
	if (typeof prototype !== "object") throw new Error("Expected prototype to be an object");
	const properties: unknown = Object.create(prototype);
	if (typeof properties !== "object" || properties === null) throw new Error("Expected prototype to be an object");
	const copy: unknown = Object.assign(properties, customProperties ? {} : instance);
	if (!(copy instanceof baseClass)) throw new Error("Expected prototype to not be overridden");
	return copy;
}

export const verifyObjectType = (v: unknown): v is Record<PropertyKey, unknown> => typeof v === "object" && v !== null;
export function verifyPropertiesInObject<K extends string>(obj: Record<PropertyKey, unknown>, keys: readonly K[]): obj is Record<K, unknown> {
	for (const key of keys) {
		if (!Object.prototype.hasOwnProperty.call(obj, key)) return false;
	}
	return true;
}
