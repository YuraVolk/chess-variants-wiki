import type { PlayerName } from "../GameData";

export type Coordinate = [i: number, j: number] | [i: number, j: number, promotion: string];
export type NumericColor = 0 | 1 | 2 | 3;
export const verifyNumericColor = (num: number): num is NumericColor => num >= 0 && num < 4;
export const nonPlayablePieces = {
	wall: "X",
	transparentWall: "x",
	duck: "Θ"
} as const;

export const colorEnum = {
	r: 0,
	b: 1,
	y: 2,
	g: 3
} as const;
export const verifyColorEnumValue = (value: string): value is keyof typeof colorEnum => value in colorEnum;

export const playerEnum: Record<PlayerName, NumericColor> = {
	Red: 0,
	Blue: 1,
	Yellow: 2,
	Green: 3,
	White: 0,
	Black: 2
} as const;
export const verifyPlayerEnumValue = (player: string): player is PlayerName => player in playerEnum;

export const stringColorEnum = {
	[0]: "r",
	[1]: "b",
	[2]: "y",
	[3]: "g",
	[4]: "d"
} as const;
export type ColorEnum = (typeof stringColorEnum)[keyof typeof stringColorEnum];
