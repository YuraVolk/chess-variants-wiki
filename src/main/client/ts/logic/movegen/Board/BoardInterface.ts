import { createTupleFromCallback, Tuple, verifyTupleType } from "../../../baseTypes";
import { BoardSquares, initializeBoardSquares } from "../../BaseInterfaces";
import type { FENDataSnapshot } from "../FENData/FENDataInterface";
import { totalPlayers, VariantType } from "../GameInformation/GameData";
import { Coordinate, NumericColor, verifyNumericColor } from "../GameInformation/GameUnits/GameUnits";
import type { PieceString } from "../GameInformation/GameUnits/PieceString";
import type { DroppingMove } from "../MoveTree/MoveTreeInterface";
import type { PieceControlGeneratedMove, PieceLetter } from "../PieceControl/PieceControlInterface";
import type { Board, PlayerBooleanTuple } from "./Board";

export const enum DisplaySettings {
	Highlighted,
	Fogged,
	Ghosted,
	Blindfolded,
	PieceFacesCenter
}

export interface BoardSnapshot {
	data: FENDataSnapshot;
	board: BoardSquares<PieceString>;
	isComplexSetup: Board["isComplexSetup"];
}

export interface PreGeneratedAttacks {
	hoppingPieces: BoardSquares<number>;
	slidingPieces: BoardSquares<number>;
	hoppingPieceLines: Array<[Coordinate, Coordinate]>;
	slidingPiecesLines: Array<readonly [startCoordinate: Coordinate, destinations: Coordinate[]]>;
	slidingPiecesRayTracing: Array<readonly [startCoordinate: Coordinate, destinations: Coordinate[]]>;
	attackingColors: BoardSquares<number>;
	variantRuleCache: {
		hasCaptures?: boolean;
	};
	pieceMovements: Map<string, PieceControlGeneratedMove[]>;
	pieceCoverage: Map<string, PieceControlGeneratedMove[]>;
	pieceDrops: {
		pawn: DroppingMove[];
		piece: DroppingMove[];
	};
}

export interface SpecialMoveGenerationSettings {
	i: number;
	j: number;
	baseColor: NumericColor;
	pieceLetter: PieceLetter;
}

const baseTeams: Tuple<boolean, typeof totalPlayers> = [true, false, true, false];
export const stringifyCoordinate = (coordinate: Coordinate) => `${coordinate[0]}:${coordinate[1]}`;
export const unstringifyCoordinate = (coordinate: string): Coordinate => {
	const result = coordinate.split(":").map((v) => Number(v));
	if (verifyTupleType(result, 2) && result.every((n) => !Number.isNaN(n))) {
		return result;
	} else throw new Error(`Unexpected stringified coordinate: ${coordinate}`);
};
export const createGameTypeSettings = () => ({
	type: VariantType.FFA,
	teamSettings: {
		firstTeamColors: baseTeams.map((e) => e),
		secondTeamColors: baseTeams.map((e) => !e)
	},
	getBaseColors(color: NumericColor): PlayerBooleanTuple {
		if (this.isFFA()) {
			return createTupleFromCallback((_, i) => i === color, totalPlayers);
		} else {
			return this.teamSettings.firstTeamColors[color] ? this.teamSettings.firstTeamColors : this.teamSettings.secondTeamColors;
		}
	},
	isFFA() {
		return this.type === VariantType.FFA || this.type === VariantType.Solo;
	},
	isSameTeam(colorA: NumericColor, colorB: NumericColor) {
		if (colorA === colorB) return true;
		if (this.isFFA()) {
			return false;
		} else {
			return this.teamSettings.firstTeamColors[colorA]
				? this.teamSettings.firstTeamColors[colorA] && this.teamSettings.firstTeamColors[colorA]
				: this.teamSettings.secondTeamColors[colorA] && this.teamSettings.secondTeamColors[colorB];
		}
	},
	getTeammateColor(color: NumericColor): NumericColor {
		if (this.isFFA()) return color;
		const teammateIndex = this.teamSettings.firstTeamColors[color]
			? this.teamSettings.firstTeamColors.map((b, i) => b && i !== color).indexOf(true)
			: this.teamSettings.secondTeamColors.map((b, i) => b && i !== color).indexOf(true);
		return verifyNumericColor(teammateIndex) ? teammateIndex : color;
	}
});

export const createComplexMoveLegalityTracker = () => ({
	hasComplexPieces: false,
	hasComplexRules: false
});

export interface PreGeneratedAttacksSettings {
	exclusiveSideToMoveGeneration?: NumericColor;
	generateCoverage?: boolean;
}

export const createBasePreGeneratedAttacks = (): PreGeneratedAttacks => {
	return {
		hoppingPieces: initializeBoardSquares(() => 0),
		slidingPieces: initializeBoardSquares(() => 0),
		hoppingPieceLines: [],
		slidingPiecesLines: [],
		slidingPiecesRayTracing: [],
		attackingColors: initializeBoardSquares(() => 0),
		pieceMovements: new Map<string, PieceControlGeneratedMove[]>(),
		pieceCoverage: new Map<string, PieceControlGeneratedMove[]>(),
		pieceDrops: {
			pawn: [],
			piece: []
		},
		variantRuleCache: {}
	};
};

export const compareCoordinates = (coordinate1: Coordinate, coordinate2: Coordinate): boolean =>
	coordinate1[0] === coordinate2[0] && coordinate1[1] === coordinate2[1];
