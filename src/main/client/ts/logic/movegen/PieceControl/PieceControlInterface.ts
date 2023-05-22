import type { PieceString } from "@moveGeneration/GameInformation/GameUnits/PieceString";
import { Coordinate, nonPlayablePieces, NumericColor } from "../GameInformation/GameUnits/GameUnits";
import type { PieceControl } from "./PieceControl";
import { convertCamelCaseToWording } from "@utils/StringFormatUtils";

export const enum AttackType {
	Normal,
	MoveOnly,
	AttackOnly,
	RayGen,
	RayTrace,
	RayTraceLimited
}
export interface PieceControlHooks {
	useTrajectory: Coordinate[] | undefined;
	usePerspective: boolean[] | undefined;
	usePawnLogic: { promotionRanks?: [number, number, number, number]; promotionPieces?: PieceLetter[] } | undefined;
	useHopping: boolean;
}
export interface PieceControlConfiguration {
	displacement: Coordinate;
	special?: AttackType;
	limit?: number;
	squareBlockingIndex?: number;
	rayGenCache?: Coordinate;
	irreversible?: true;
}

export interface PieceControlConfigSettings {
	points: {
		singlesPoints: number;
		teamsPoints: number;
		botFFAValue: number;
		botTeamsValue: number;
	};
	piece: string;
	moveGenerationSettings: {
		isComplex: boolean;
		isJumping: boolean;
		isSliding: boolean;
		isPawn: boolean;
		isColorBound: boolean;
	};
	naming: {
		name: string;
		shortName: string;
		description?: string;
	};
}

export const nonPlayableValues: string[] = Object.values(nonPlayablePieces);
declare const pieceLetterTag: unique symbol;
export type PieceLetter = string & { _: typeof pieceLetterTag };
export const verifyPieceLetter = (piece: string): piece is PieceLetter =>
	piece in pieceControlConfigSettings || nonPlayableValues.includes(piece);

export const pieceControlConfigSettings = Object.entries(nonPlayablePieces).reduce<Record<PieceLetter, PieceControlSettings>>(
	(p, [name, n]) => ({
		...p,
		[n]: {
			points: {
				singlesPoints: 0,
				teamsPoints: 0,
				botFFAValue: 0,
				botTeamsValue: 0
			},
			piece: n,
			moveGenerationSettings: {
				isComplex: false,
				isJumping: false,
				isSliding: false,
				isPawn: false
			},
			naming: {
				name: convertCamelCaseToWording(name),
				shortName: n
			}
		}
	}),
	{}
);
export interface PieceControlSettings extends PieceControlConfigSettings {
	construct: new () => PieceControl;
}
interface PieceControlDeclarationConfiguration<T extends PieceControl> {
	configuration: PieceControlConfigSettings;
	baseClassRef: new () => T;
}
export const createPieceDeclaration = <T extends PieceControl>(configuration: PieceControlDeclarationConfiguration<T>) => {
	pieceControlConfigSettings[configuration.configuration.piece as PieceLetter] = {
		...configuration.configuration,
		construct: configuration.baseClassRef
	};

	return new configuration.baseClassRef();
};

export interface PieceControlGeneratedMove {
	move: Coordinate;
	irreversible: boolean;
}

export interface PieceControlInternalMove {
	i: number;
	j: number;
	isRayGen?: boolean;
	irreversible?: boolean;
}

export interface ControlConfiguration {
	coordinates: [number, number];
	board: PieceString[][];
	immunePieces: [boolean, boolean, boolean, boolean];
	color: NumericColor;
	baseRank?: boolean;
}

function createPredefinedPieceLetter(letter: string) {
	return letter as PieceLetter;
}

export const pawnPieceLetter = createPredefinedPieceLetter("P");
export const wallPieceLetter = createPredefinedPieceLetter(nonPlayablePieces.wall);
export const grasshopperPieceLetter = createPredefinedPieceLetter("G");
export const defaultPieces = {
	queen: createPredefinedPieceLetter("Q"),
	rook: createPredefinedPieceLetter("R"),
	bishop: createPredefinedPieceLetter("B"),
	knight: createPredefinedPieceLetter("N"),
	king: createPredefinedPieceLetter("K")
} as const;
export const emptyLetter = createPredefinedPieceLetter("");
export const duckLetter = createPredefinedPieceLetter(nonPlayablePieces.duck);
export const dameLetter = createPredefinedPieceLetter("D");
