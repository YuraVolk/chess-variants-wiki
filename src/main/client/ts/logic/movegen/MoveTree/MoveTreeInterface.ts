import { BoardSnapshot, compareCoordinates, PreGeneratedAttacks } from "../Board/BoardInterface";
import type { Coordinate, NumericColor } from "../GameInformation/GameUnits/GameUnits";
import { pawnPieceString, PieceString, PieceStringObject } from "../GameInformation/GameUnits/PieceString";
import { moveNotation } from "./MoveNotationStringifier";

export enum SpecialMove {
	CastlingKingside,
	CastlingQueenside,
	EnPassant
}
export enum InternalMoveSignature {
	Resign = "R",
	Timeout = "T",
	ClaimWin = "C",
	DrawByAgreement = "D",
	Stalemate = "S",
	Pass = "P",
	TeamsCheckmate = "#"
}

export type MoveComponent = InternalMove | MoveData | DroppingMove;
export type Move = [MoveComponent, ...MoveComponent[]];
export const verifyRequiredMove = (move: MoveComponent[]): move is Move => move.length > 0;

export type HighlightArrow = [color: NumericColor, startCoordinate: Coordinate, endCoordinate: Coordinate];
export type HighlightSquare = [color: NumericColor, coordinate: Coordinate];
interface GeneralMetadata {
	currentSideToMove: NumericColor;
	currentFullMove?: number;
	playerClock?: number;
	highlightedArrows: HighlightArrow[];
	highlightedSquares: HighlightSquare[];
}
export interface MoveWrapperMetadata extends GeneralMetadata {
	movingPiece: PieceString;
	isCapture: boolean;
	checks: number;
	checkmates: number;
	annotation?: string;
}

export interface MoveWrapper {
	moveData: Move;
	alternativeLines: MoveWrapper[][];
	comment: string;
	path: number[];
	metadata: MoveWrapperMetadata;
	cachedNames: Record<keyof typeof moveNotation, string>;
}

export function verifyMoveWrapperProperties(moveWrapper: Partial<MoveWrapper>): moveWrapper is MoveWrapper {
	return Boolean(
		moveWrapper.alternativeLines && moveWrapper.comment !== undefined && moveWrapper.path && moveWrapper.metadata && moveWrapper.moveData
	);
}

type DistributiveMove<T> = T extends object ? T[] : never;
export type DistributiveMoveArray = DistributiveMove<MoveComponent>;
interface ChainableMove {
	nextChainedMoves?: DistributiveMoveArray;
	isForcedContinuation?: boolean;
	isIrreversible?: boolean;
}

export interface MoveData extends ChainableMove {
	startCoordinates: Coordinate;
	endCoordinates: Coordinate;
	promotion?: PieceString[];
	specialType?: SpecialMove | undefined;
}

export interface DroppingMove extends ChainableMove {
	piece: PieceString;
	endCoordinates: Coordinate;
}

export interface InternalMove extends ChainableMove {
	type: InternalMoveSignature;
}

type RecursiveHelper<T> = {
	[P in keyof T]: T[P] extends PieceString ? PieceStringObject : StripPieceStringObjects<T[P]>;
};
export type StripPieceStringObjects<T> = T extends object ? RecursiveHelper<T> : T;

export interface ProcessSafeMoveWrapper {
	alternativeLines: this[][];
	comment: string;
	path: number[];
	cachedNames: Record<keyof typeof moveNotation, string>;
	metadata: GeneralMetadata;
}

export function compareMoves(move1: MoveComponent, move2: MoveComponent): boolean {
	if (verifyStandardMove(move1)) {
		if (!verifyStandardMove(move2)) return false;
		if (!(
			compareCoordinates(move1.startCoordinates, move2.startCoordinates) &&
			compareCoordinates(move1.endCoordinates, move2.endCoordinates) &&
			(move1.specialType === move2.specialType ||
				move1.specialType === SpecialMove.EnPassant ||
				move2.specialType === SpecialMove.EnPassant)
		)) return false;
		if (move1.promotion && move2.promotion) {
			const secondPromotionArray = move2.promotion.map(p => p.piece);
			if (move1.promotion.filter(p => secondPromotionArray.includes(p.piece)).length === 0) return false;
		} else if ((move1.promotion && !move2.promotion) || (move2.promotion && !move1.promotion)) return false;
		
		return true;
	} else if (verifyDroppingMove(move1)) {
		if (!verifyDroppingMove(move2)) return false;
		return compareCoordinates(move1.endCoordinates, move2.endCoordinates) && PieceString.comparePieceStrings(move1.piece, move2.piece);
	} else if (verifyInternalMove(move1)) {
		if (!verifyInternalMove(move2)) return false;
		return move1.type === move2.type;
	}

	throw new Error(`Unexpected move signature of first move ${JSON.stringify(move1)}`);
}

export function createDummyMoveMetadata(): MoveWrapperMetadata {
	return {
		isCapture: false,
		movingPiece: pawnPieceString,
		checks: 0,
		checkmates: 0,
		currentSideToMove: 0,
		highlightedArrows: [],
		highlightedSquares: []
	};
}

export const createBaseMoveWrapper = (
	requiredSettings: { path: number[]; moveData: Move },
	settings: Partial<MoveWrapper> = {}
): MoveWrapper => {
	const wrapper: MoveWrapper = {
		path: requiredSettings.path,
		moveData: requiredSettings.moveData,
		comment: "",
		alternativeLines: [],
		metadata: createDummyMoveMetadata(),
		cachedNames: {
			fullMoveNotation: "",
			shortenedMoveNotation: ""
		}
	};

	return {
		...wrapper,
		...settings
	};
};

interface MoveTypePredicate<T, S extends T> {
	(move: StripPieceStringObjects<T>): move is StripPieceStringObjects<S>;
	(move: T): move is S;
}
export const verifyInternalMove: MoveTypePredicate<MoveComponent, InternalMove> = (move): move is never => "type" in move;
export const verifyDroppingMove: MoveTypePredicate<MoveComponent, DroppingMove> = (move): move is never => "piece" in move;
export const verifyStandardMove: MoveTypePredicate<MoveComponent, MoveData> = (move): move is never => "startCoordinates" in move;
export const verifyInternalMoveArray: MoveTypePredicate<DistributiveMoveArray, InternalMove[]> = (move): move is never => "type" in move[0];
export const verifyDroppingMoveArray: MoveTypePredicate<DistributiveMoveArray, DroppingMove[]> = (move): move is never => "piece" in move[0];
export const verifyStandardMoveArray: MoveTypePredicate<DistributiveMoveArray, MoveData[]> = (move): move is never =>
	"startCoordinates" in move[0];

export const getMoveFromPathAndTree = <T extends ProcessSafeMoveWrapper>(moves: T[], path: number[]): T[] | T | undefined => {
	if (path.length === 0) return moves;
	const movePath = path.slice();
	if (movePath[0] >= moves.length) return;
	let currentSelection = moves[movePath.shift() ?? 0];
	while (movePath.length > 0) {
		const currentIndex = movePath.shift();
		if (currentIndex !== undefined) {
			if (currentIndex >= currentSelection.alternativeLines.length) return;
			const alternativeLine = currentSelection.alternativeLines[currentIndex];
			const index = movePath.shift();
			if (index === undefined) {
				return alternativeLine;
			}

			if (index >= alternativeLine.length) return;
			currentSelection = alternativeLine[index];
		}
	}

	return currentSelection;
};

export const getLatestChainedMoves = (move: DistributiveMoveArray): MoveComponent[] => {
	if (move.length > 0 && move[0].nextChainedMoves) {
		return getLatestChainedMoves(move[0].nextChainedMoves);
	} else return move;
};

export interface MoveTreeSetNewMoveParameters {
	move: MoveWrapper;
	snapshot: MoveTreeRequiredSnapshotValues;
	fenDataString: string;
	noPathSlice: boolean;
}
export interface MoveTreeSnapshot {
	boardSnapshot: BoardSnapshot;
	hash: string;
	pregeneratedAttacks: PreGeneratedAttacks;
}
export type MoveTreeRequiredSnapshotValues = Omit<MoveTreeSnapshot, "hash">;
