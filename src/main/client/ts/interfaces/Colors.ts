import { throwOnNever, verifyTupleType } from "../baseTypes";

declare const HexColor: unique symbol;
export type HexColor = string & { _: typeof HexColor };
const hexColorRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
export const createHexColor = (color: string): HexColor => {
	if (hexColorRegex.test(color)) {
		return color as HexColor;
	} else throw new TypeError("The supplied hex color is not a hex color: " + color);
};
export const verifyHexColor = (color: IndexedColor): color is HexColor => typeof color === "string";
export const validateHexColor = (color: unknown): color is HexColor => {
	if (typeof color === "string") {
		try {
			createHexColor(color);
			return true;
		} catch {
			return false;
		}
	} else return false;
};

declare const RGBColor: unique symbol;
export type RGBColorValue = number & { _: typeof RGBColor };
export const createRGBColor = (color: number): RGBColorValue => {
	if (color >= 0 || color <= 255) {
		return color as RGBColorValue;
	} else throw new TypeError(`The supplied RGB color value is not an RGB color value: ${color}`);
};
export type RGBColor = [RGBColorValue, RGBColorValue, RGBColorValue];
export const wrapRGBColor = (color: RGBColor): string => `rgb(${color.join(",")})`;
export const verifyRGBColor = (color: IndexedColor): color is RGBColor => Array.isArray(color);
export const validateRGBColor = (color: unknown): color is RGBColor => {
	if (Array.isArray(color) && verifyTupleType(color, 3) && color.every<number>((c): c is number => typeof c === "number")) {
		try {
			color.forEach((c) => createRGBColor(c));
			return true;
		} catch {
			return false;
		}
	} else return false;
};

declare const HSLColor: unique symbol;
export interface HSLColor {
	hue: number;
	saturation: number;
	lightness: number;
	_: typeof HSLColor;
}
export const createHSLColor = (color: { hue: number; saturation: number; lightness: number }): HSLColor => {
	if (
		(color.hue >= 0 || color.hue <= 359) &&
		(color.saturation >= 0 || color.saturation <= 100) &&
		(color.lightness >= 0 || color.lightness <= 100)
	) {
		return color as HSLColor;
	} else throw new TypeError(`The supplied HSL value is not an HSL color: " + color`);
};
export const wrapHSLColor = (color: HSLColor): string => `hsl(${color.hue},${color.saturation}%,${color.lightness}%)`;
export const verifyHSLColor = (color: IndexedColor): color is HSLColor => typeof color === "object";
export const validateHSLColor = (color: unknown): color is HSLColor => {
	const verifyNumberRecord = <K extends PropertyKey>(obj: Record<K, unknown>): obj is Record<K, number> => {
		for (const key in obj) {
			if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
			if (typeof obj[key] !== "number") return false;
		}

		return true;
	};

	if (typeof color === "object" && color && "hue" in color && "saturation" in color && "lightness" in color && verifyNumberRecord(color)) {
		try {
			createHSLColor(color);
			return true;
		} catch {
			return false;
		}
	} else return false;
};

export type IndexedColor = HexColor | RGBColor | HSLColor;
export const wrapIndexedColor = (color: IndexedColor): string => {
	if (verifyHexColor(color)) {
		return color;
	} else if (verifyRGBColor(color)) {
		return wrapRGBColor(color);
	} else if (verifyHSLColor(color)) {
		return wrapHSLColor(color);
	} else {
		return throwOnNever(color);
	}
};
export const validateIndexedColor = (color: unknown): color is IndexedColor => {
	return validateHexColor(color) || validateRGBColor(color) || validateHSLColor(color);
};
