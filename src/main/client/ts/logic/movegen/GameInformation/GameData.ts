import { throwOnNever, Tuple } from "@client/ts/baseTypes";
import { truncateNumber } from "@utils/NumberUtils";
import type { Coordinate, NumericColor } from "./GameUnits/GameUnits";

export type Termination =
	| `${Uppercase<PlayerName>} ${Uppercase<IndividualTermination>}!`
	| `${Uppercase<GeneralTermination | DrawnResult>} • ${Result}`
	| `${Uppercase<GeneralTermination>}!`
	| `${Uppercase<DrawnResult>}`
	| "½-½ AGREED.";

export interface TimeControl {
	baseTime: number;
	increment: number;
	isDelay: boolean;
}

export const playerNames = ["Red", "Blue", "Yellow", "Green", "White", "Black"] as const;
export type PlayerName = (typeof playerNames)[number];
export const individualTerminations = ["Won the Race", "Checkmated", "Stalemated", "Forfeits on Time", "Claimed the Win", "Resigned"] as const;
export type IndividualTermination = (typeof individualTerminations)[number];
const generalWinningTerminations = ["Checkmate", "King Captured", "King of the Hill", "Stalemate"] as const;
export type GeneralTermination = (typeof generalWinningTerminations)[number];
export const verifyWinningTermination = (termination: string): termination is GeneralTermination => {
	const generalWins: readonly string[] = generalWinningTerminations;
	return generalWins.includes(termination);
};

const generalDrawingTerminations = [
	"50-move Rule",
	"Insufficient Material",
	"Threefold Repetition",
	"Timeout vs Insufficient Material"
] as const;
export type DrawnResult = (typeof generalDrawingTerminations)[number];

export const verifyDrawingTermination = (termination: string): termination is DrawnResult => {
	const generalDraws: readonly string[] = generalDrawingTerminations;
	return generalDraws.includes(termination);
};
const generalTerminations = [
	...generalWinningTerminations,
	...generalDrawingTerminations
] as const;

const results = ["0-1", "1-0", "½-½"] as const;
export type Result = (typeof results)[number];

export interface GamePlayerData {
	elo?: number;
	name?: string;
}
export interface GameData {
	gameNumber: number | undefined;
	timeControl: TimeControl;
	players: Tuple<GamePlayerData, typeof totalPlayers>;
	site: string | undefined;
	date: Date | string | undefined;
	result: string | undefined;
	termination: Termination | undefined;
}

export const validateTerminationString = (termination: string): termination is Termination => {
	const capitalizedTermination = termination.toUpperCase();
	if (
		playerNames.some((str) => capitalizedTermination.startsWith(str.toUpperCase())) &&
		individualTerminations.some((str) => capitalizedTermination.endsWith(str.toUpperCase() + "!"))
	) {
		return true;
	} else if (
		/.*?\s•\s.*/.test(capitalizedTermination) &&
		generalTerminations.some((str) => capitalizedTermination.startsWith(str.toUpperCase())) &&
		results.some((str) => capitalizedTermination.endsWith(str.toUpperCase()))
	) {
		return true;
	} else if (capitalizedTermination === "½-½ AGREED.") {
		return true;
	}

	return false;
};

export const stringifyTimeControl = (timeControl: TimeControl): string => {
	const noIncrement = timeControl.increment === 0;
	let timeControlString = "";
	if (timeControl.baseTime < 60) {
		timeControlString += noIncrement ? `${timeControl.baseTime} sec` : `${timeControl.baseTime * 60}s`;
	} else if (timeControl.baseTime >= 60 && noIncrement) {
		timeControlString += `${truncateNumber(timeControl.baseTime / 60, 1)} min`;
	} else {
		timeControlString += truncateNumber(timeControl.baseTime / 60, 1);
	}

	if (!noIncrement) {
		timeControlString += "|";
		timeControlString += timeControl.increment;
	}
	if (timeControl.isDelay) {
		timeControlString += "D";
	}

	return timeControlString;
};

export const obtainTimeControlType = (timeControl: TimeControl): TimeControlType => {
	const { baseTime, increment, isDelay } = timeControl;
	if (isDelay) {
		const formula = baseTime / 40 + increment;
		if (formula > 11.5) {
			return TimeControlType.Rapid;
		} else if (formula <= 1.375) {
			return TimeControlType.Hyperbullet;
		} else if (formula <= 4.5) {
			return TimeControlType.Bullet;
		} else {
			return TimeControlType.Blitz;
		}
	} else {
		const formula = baseTime / 60 + increment;
		if (formula > 7.5) {
			return TimeControlType.Rapid;
		} else if (formula <= 0.5) {
			return TimeControlType.Hyperbullet;
		} else if (formula <= 3) {
			return TimeControlType.Bullet;
		} else {
			return TimeControlType.Blitz;
		}
	}
};

export const convertCoordinateToPGN4 = (coordinate: Coordinate, dimension = boardDimension): string => {
	if (dimension === boardDimension) {
		return `${String.fromCharCode(coordinate[1] + 97)}${boardDimension - coordinate[0]}`;
	} else {
		const alternation = (boardDimension - dimension) / 2;
		return `${String.fromCharCode(coordinate[1] - alternation + 97)}${boardDimension - coordinate[0] - alternation}`;
	}
};
export const convertCoordinateToPGN4Array = (coordinate: Coordinate, dimension = boardDimension): [string, number] => {
	if (dimension === boardDimension) {
		return [String.fromCharCode(coordinate[1] + 97), boardDimension - coordinate[0]];
	} else {
		const alternation = (boardDimension - dimension) / 2;
		return [String.fromCharCode(coordinate[1] - alternation + 97), boardDimension - coordinate[0] - alternation];
	}
};

export const getOppositePlacedColor = (color: NumericColor) => {
	switch (color) {
		case 0:
			return 2;
		case 1:
			return 3;
		case 2:
			return 0;
		case 3:
			return 1;
		default:
			return throwOnNever(color);
	}
};
export const getPlayerNameFromColor = (color: NumericColor, wb = false): PlayerName => {
	switch (color) {
		case 0:
			return wb ? "White" : "Red";
		case 1:
			return "Blue";
		case 2:
			return wb ? "Black" : "Yellow";
		case 3:
			return "Green";
		default:
			return throwOnNever(color);
	}
};

interface NumericColorAugmentationSettings {
	wb: boolean;
}
export const createDefaultNumericColorAdjustment = (): NumericColorAugmentationSettings => ({
	wb: false
});

export enum TimeControlType {
	Hyperbullet = "Hyperbullet",
	Bullet = "Bullet",
	Blitz = "Blitz",
	Rapid = "Rapid"
}
export enum VariantType {
	FFA = "FFA",
	Teams = "Teams",
	Solo = "Solo"
}

export const totalPlayers = 4;
export const boardDimension = 14;
export const colors: readonly NumericColor[] = [0, 1, 2, 3];
