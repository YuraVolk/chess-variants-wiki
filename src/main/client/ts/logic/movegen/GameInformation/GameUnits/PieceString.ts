import {
	duckLetter,
	emptyLetter,
	pawnPieceLetter,
	PieceLetter,
	verifyPieceLetter,
	wallPieceLetter
} from "@moveGeneration/PieceControl/PieceControlInterface";
import { colorEnum, nonPlayablePieces, NumericColor, stringColorEnum } from "./GameUnits";
import { assertDevOnly } from "@client/ts/baseTypes";

export const deadColorIndex = 4;
interface PieceStringInterface {
	readonly value: string;
	isDead(): boolean;
	isEmpty(): boolean;
	isWall(): boolean;
	isPiece(): boolean;
	getStringifiedColor(): keyof typeof colorEnum;
	readonly color: NumericColor | typeof deadColorIndex;
	readonly piece: PieceLetter;
}

interface EmptyPieceStringInterface extends PieceStringInterface {
	isDead(): false;
	isEmpty(): true;
	isWall(): false;
	isPiece(): false;
	readonly color: never;
	readonly piece: never;
}
export type EmptyPieceString = PieceString & EmptyPieceStringInterface;

interface WallPieceStringInterface extends PieceStringInterface {
	isDead(): true;
	isEmpty(): false;
	isWall(): true;
	isPiece(): false;
	readonly color: typeof deadColorIndex;
	readonly piece: PieceLetter & (typeof nonPlayablePieces)[keyof typeof nonPlayablePieces];
}
export type WallPieceString = PieceString & WallPieceStringInterface;

interface DeadPieceStringInterface extends PieceStringInterface {
	isDead(): true;
	isEmpty(): false;
	isWall(): false;
	isPiece(): true;
	readonly color: typeof deadColorIndex;
}
export type DeadPieceString = PieceString & DeadPieceStringInterface;

interface ActivePieceStringInterface extends PieceStringInterface {
	isDead(): false;
	isEmpty(): false;
	isWall(): false;
	isPiece(): true;
	readonly color: NumericColor;
}
export type ActivePieceString = PieceString & ActivePieceStringInterface;

export interface PieceStringObject {
	readonly _color: NumericColor | typeof deadColorIndex;
	readonly _piece: PieceLetter;
	readonly value: string;
}

export class PieceString implements PieceStringInterface {
	static comparePieceStrings(pieceString1: PieceString, pieceString2: PieceString) {
		return pieceString1._piece === pieceString2._piece && pieceString1._color === pieceString2._color;
	}

	static comparePieceStringObjects(pieceString1: PieceStringObject, pieceString2: PieceStringObject) {
		return pieceString1._piece === pieceString2._piece && pieceString1._color === pieceString2._color;
	}

	static fromObjectToClass(object: PieceStringObject) {
		return new PieceString(object._color, object._piece);
	}

	readonly value: string;
	constructor(private readonly _color: NumericColor | typeof deadColorIndex, private readonly _piece: PieceLetter) {
		this.value = _piece.length ? (/[xXΘ]/.test(_piece) ? _piece : stringColorEnum[_color] + _piece) : "";
	}

	isDead(): this is DeadPieceStringInterface {
		return this._color === deadColorIndex && !this.isWall();
	}
	isEmpty(): this is EmptyPieceStringInterface {
		return this._piece.length === 0;
	}
	isWall(): this is WallPieceStringInterface {
		return this.value.length === 1;
	}
	isPiece(): this is ActivePieceStringInterface {
		return this.value.length === 2 && this._color !== deadColorIndex;
	}

	get piece() {
		if (this.isEmpty()) throw new TypeError("Accessing a piece string piece value while the piece string is empty.");
		return this._piece;
	}

	get color() {
		if (this.isEmpty()) throw new TypeError("Accessing a piece string color value while the piece string is empty.");
		return this._color;
	}

	getStringifiedColor(): keyof typeof colorEnum {
		return this.value.charAt(0) as keyof typeof colorEnum;
	}

	toObject(): PieceStringObject {
		return {
			_piece: this._piece,
			_color: this._color,
			value: this.value
		};
	}
}

export const createPieceFromData = (color: NumericColor | typeof deadColorIndex, piece: string) => {
	if (verifyPieceLetter(piece)) {
		return new PieceString(color, piece);
	}
	throw new Error("Wrong color signature for the piece provided");
};
export const createPieceFromString = (piece: string) => {
	const verifyColorEnum = (p: string): p is keyof typeof colorEnum => p in colorEnum;

	if (piece.length === 1 && verifyPieceLetter(piece)) {
		return new PieceString(deadColorIndex, piece);
	} else {
		const color = piece.charAt(0);
		const pieceLetter = piece.charAt(1);
		if (!verifyPieceLetter(pieceLetter)) throw new Error("Wrong signature for the piece provided");
		if (color === "d") {
			return new PieceString(deadColorIndex, pieceLetter);
		} else {
			if (verifyColorEnum(color)) {
				return new PieceString(colorEnum[color], pieceLetter);
			} else throw new Error("Wrong color signature for the piece provided");
		}
	}
};

const testEmptyPieceString = new PieceString(0, emptyLetter);
assertDevOnly(testEmptyPieceString.isEmpty());
export const emptyPieceString: EmptyPieceString = testEmptyPieceString;

const testWallPieceString = new PieceString(deadColorIndex, wallPieceLetter);
assertDevOnly(testWallPieceString.isWall());
export const wallPieceString: WallPieceString = testWallPieceString;

const testActivePieceString = new PieceString(0, pawnPieceLetter);
assertDevOnly(testActivePieceString.isPiece());
export const pawnPieceString: ActivePieceString = testActivePieceString;

const testDuckPieceString = new PieceString(deadColorIndex, duckLetter);
assertDevOnly(testDuckPieceString.isWall());
export const duckPieceString: ActivePieceString = testActivePieceString;
