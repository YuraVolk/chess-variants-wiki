import { throwOnNever } from "@client/ts/baseTypes";
import type { Coordinate } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { compareArrays } from "../../../utils/ArrayUtils";
import { isVerticalPlacement } from "../../BaseInterfaces";
import { unstringifyCoordinate } from "../Board/BoardInterface";
import { convertCoordinateToPGN4Array, convertCoordinateToPGN4 } from "../GameInformation/GameData";
import { deadColorIndex, pawnPieceString } from "../GameInformation/GameUnits/PieceString";
import {
	MoveData,
	MoveTreeSnapshot,
	MoveWrapper,
	MoveWrapperMetadata,
	SpecialMove,
	verifyDroppingMove,
	verifyInternalMove,
	verifyStandardMove
} from "./MoveTreeInterface";

export type MoveNotationStringify = (moveWrapper: MoveWrapper, snapshot: MoveTreeSnapshot, dimension: number) => string;

function generateCastlingString(moveData: MoveData): string {
	switch (moveData.specialType) {
		case SpecialMove.CastlingKingside:
			return "O-O";
		case SpecialMove.CastlingQueenside:
			return "O-O-O";
		default:
			return "";
	}
}

function extractPiece(metadata: MoveWrapperMetadata): string {
	return metadata.movingPiece.piece !== pawnPieceString.piece ? metadata.movingPiece.piece : "";
}

function obtainAmbiguousOrthogonality(parameters: {
	moveMetadata: MoveWrapperMetadata;
	move: MoveData;
	snapshot: MoveTreeSnapshot;
	isCapture: boolean;
}) {
	const {
		moveMetadata,
		move,
		snapshot: {
			boardSnapshot: { board },
			pregeneratedAttacks: { pieceMovements }
		},
		isCapture
	} = parameters;
	const { piece, color } = moveMetadata.movingPiece;
	const isPawn = piece === pawnPieceString.piece;
	const registeredPieces: Coordinate[] = [];
	for (const [piece, movements] of pieceMovements) {
		const parsedCoordinate = unstringifyCoordinate(piece);
		const boardPiece = board[parsedCoordinate[0]][parsedCoordinate[1]];
		if (boardPiece.isEmpty() || boardPiece.color !== color || boardPiece.piece !== piece) continue;
		if (movements.find((m) => compareArrays(move.endCoordinates, m.move)) !== undefined) {
			registeredPieces.push(parsedCoordinate);
		}
	}

	if (color === deadColorIndex) return [false, false];
	const ambiguousRank =
		(isCapture && isPawn && isVerticalPlacement(color)) ||
		registeredPieces.some((c, i) => registeredPieces.some((c2, j) => i !== j && c[0] === c2[0]));
	const ambiguousFile =
		(isCapture && isPawn && !isVerticalPlacement(color)) ||
		registeredPieces.some((c, i) => registeredPieces.some((c2, j) => i !== j && c[1] === c2[1]));

	return [ambiguousRank, ambiguousFile];
}

function extractPromotion(move: MoveData): string {
	return move.promotion ? `=${move.promotion[0].piece}` : "";
}

function extractChecksAndCheckmates(metadata: MoveWrapperMetadata): string {
	return "+".repeat(metadata.checks) + "#".repeat(metadata.checkmates);
}

export const shortenedMoveNotationStringify: MoveNotationStringify = (moveWrapper, snapshot, dimension) => {
	let resultingString = "";
	let isFirstCapturingMoveSet = false;
	for (const move of moveWrapper.moveData) {
		if (verifyStandardMove(move)) {
			if ((resultingString += generateCastlingString(move))) continue;
			resultingString += extractPiece(moveWrapper.metadata);
			const isCapture = !isFirstCapturingMoveSet && moveWrapper.metadata.isCapture;
			const [ambiguousRank, ambiguousFile] = obtainAmbiguousOrthogonality({
				isCapture,
				move,
				snapshot,
				moveMetadata: moveWrapper.metadata
			});

			if (ambiguousFile && !ambiguousRank) {
				resultingString += convertCoordinateToPGN4Array(move.startCoordinates, dimension)[1];
			} else if (!ambiguousFile && ambiguousRank) {
				resultingString += convertCoordinateToPGN4Array(move.startCoordinates, dimension)[0];
			} else if (ambiguousFile && ambiguousRank) {
				resultingString += convertCoordinateToPGN4(move.startCoordinates, dimension);
			}

			if (isCapture) {
				resultingString += "x";
				isFirstCapturingMoveSet = true;
			}
			resultingString += convertCoordinateToPGN4(move.endCoordinates, dimension);
			resultingString += extractPromotion(move);
		} else if (verifyDroppingMove(move)) {
			resultingString += `@${move.piece.piece}`;
			resultingString += `${convertCoordinateToPGN4(move.endCoordinates, dimension)}`;
		} else if (verifyInternalMove(move)) {
			resultingString += move.type;
		} else throwOnNever(move);
	}

	resultingString += extractChecksAndCheckmates(moveWrapper.metadata);
	resultingString += moveWrapper.metadata.annotation ?? "";
	return resultingString;
};

export const fullMoveNotationStringify: MoveNotationStringify = (moveWrapper) => {
	let resultingString = "";
	let firstStandardMoveCaptureSet = false;
	for (const move of moveWrapper.moveData) {
		if (verifyStandardMove(move)) {
			if ((resultingString += generateCastlingString(move))) continue;
			resultingString += extractPiece(moveWrapper.metadata);
			resultingString += convertCoordinateToPGN4(move.startCoordinates);
			if (!firstStandardMoveCaptureSet && moveWrapper.metadata.isCapture) {
				resultingString += "x";
				firstStandardMoveCaptureSet = true;
			} else resultingString += "-";
			resultingString += convertCoordinateToPGN4(move.endCoordinates);
			resultingString += extractPromotion(move);
		} else if (verifyDroppingMove(move)) {
			resultingString += `@${move.piece.piece}`;
			resultingString += `-${convertCoordinateToPGN4(move.endCoordinates)}`;
		} else if (verifyInternalMove(move)) {
			resultingString += move.type;
		} else throwOnNever(move);
	}

	resultingString += extractChecksAndCheckmates(moveWrapper.metadata);
	return resultingString;
};

export const moveNotation = {
	fullMoveNotation: fullMoveNotationStringify,
	shortenedMoveNotation: shortenedMoveNotationStringify
} as const;
