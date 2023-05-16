import { createTuple, Tuple, verifyTupleType } from "@client/ts/baseTypes";
import { BoardSquares, initializeBoardSquares } from "@client/ts/logic/BaseInterfaces";
import { FENData, FENOptions } from "@moveGeneration/FENData/FENData";
import type { FENOptionsTags } from "@moveGeneration/FENData/FENOptions/FENOptionsTagsInterface";
import { boardDimension, colors, totalPlayers } from "@moveGeneration/GameInformation/GameData";
import {
	verifyColorEnumValue,
	colorEnum,
	Coordinate,
	nonPlayablePieces,
	stringColorEnum
} from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { createPieceFromString, emptyPieceString, PieceString } from "@moveGeneration/GameInformation/GameUnits/PieceString";
import type { PieceLetter } from "@moveGeneration/PieceControl/PieceControlInterface";
import type { VariantTag } from "../TagInterface";
import { tagNamesEqual, unwrapTag, wrapTag } from "../Utils";

export function checkDimensionIntersection(dimension: Coordinate, [i, j]: Coordinate) {
	const dimensionI = (boardDimension - dimension[0]) / 2,
		dimensionJ = (boardDimension - dimension[1]) / 2;
	return i < dimensionI || i >= dimensionI + dimension[0] || j < dimensionJ || j >= dimensionJ + dimension[1];
}

function serializeFENOptions(fenOptions: FENOptions): string {
	const resultingStrings: string[] = [];
	let key: keyof FENOptionsTags;
	for (key in fenOptions.tags) {
		if (!Object.prototype.hasOwnProperty.call(fenOptions.tags, key)) continue;
		const serializedForm = fenOptions.tags[key].serialize();
		if (serializedForm) resultingStrings.push(serializedForm);
	}

	return `{${resultingStrings.join(",")}}`;
}

function modifyFourBooleanParameter(part: string, fenDataArrayRef: Tuple<boolean, typeof totalPlayers>) {
	const booleans = part.split(",").map((e) => Boolean(Number(e)));
	if (verifyTupleType(booleans, totalPlayers)) {
		fenDataArrayRef.forEach((_, i, arr) => (arr[i] = booleans[i]));
	} else {
		console.error("Incorrect amount of arguments for the boolean parameter length in FENData: " + part);
		console.trace(`Expected ${totalPlayers} arguments, but got ${booleans.length}`);
	}
}

const predefinedFENpositions = {
	"4PC": "R-0,0,0,0-1,1,1,1-1,1,1,1-0,0,0,0-0-x,x,x,yR,yN,yB,yK,yQ,yB,yN,yR,x,x,x/x,x,x,yP,yP,yP,yP,yP,yP,yP,yP,x,x,x/x,x,x,8,x,x,x/bR,bP,10,gP,gR/bN,bP,10,gP,gN/bB,bP,10,gP,gB/bQ,bP,10,gP,gK/bK,bP,10,gP,gQ/bB,bP,10,gP,gB/bN,bP,10,gP,gN/bR,bP,10,gP,gR/x,x,x,8,x,x,x/x,x,x,rP,rP,rP,rP,rP,rP,rP,rP,x,x,x/x,x,x,rR,rN,rB,rQ,rK,rB,rN,rR,x,x,x",
	"4PCo": "R-0,0,0,0-1,1,1,1-1,1,1,1-0,0,0,0-0-x,x,x,yR,yN,yB,yK,yQ,yB,yN,yR,x,x,x/x,x,x,yP,yP,yP,yP,yP,yP,yP,yP,x,x,x/x,x,x,8,x,x,x/bR,bP,10,gP,gR/bN,bP,10,gP,gN/bB,bP,10,gP,gB/bK,bP,10,gP,gQ/bQ,bP,10,gP,gK/bB,bP,10,gP,gB/bN,bP,10,gP,gN/bR,bP,10,gP,gR/x,x,x,8,x,x,x/x,x,x,rP,rP,rP,rP,rP,rP,rP,rP,x,x,x/x,x,x,rR,rN,rB,rQ,rK,rB,rN,rR,x,x,x",
	"4PCb": "R-0,0,0,0-1,1,1,1-1,1,1,1-0,0,0,0-0-x,x,x,yR,yN,yB,yQ,yK,yB,yN,yR,x,x,x/x,x,x,yP,yP,yP,yP,yP,yP,yP,yP,x,x,x/x,x,x,8,x,x,x/bR,bP,10,gP,gR/bN,bP,10,gP,gN/bB,bP,10,gP,gB/bQ,bP,10,gP,gQ/bK,bP,10,gP,gK/bB,bP,10,gP,gB/bN,bP,10,gP,gN/bR,bP,10,gP,gR/x,x,x,8,x,x,x/x,x,x,rP,rP,rP,rP,rP,rP,rP,rP,x,x,x/x,x,x,rR,rN,rB,rQ,rK,rB,rN,rR,x,x,x",
	"4PCn": "R-0,0,0,0-1,1,1,1-1,1,1,1-0,0,0,0-0-x,x,x,yR,yN,yB,yQ,yK,yB,yN,yR,x,x,x/x,x,x,yP,yP,yP,yP,yP,yP,yP,yP,x,x,x/x,x,x,8,x,x,x/bR,bP,10,gP,gR/bN,bP,10,gP,gN/bB,bP,10,gP,gB/bQ,bP,10,gP,gK/bK,bP,10,gP,gQ/bB,bP,10,gP,gB/bN,bP,10,gP,gN/bR,bP,10,gP,gR/x,x,x,8,x,x,x/x,x,x,rP,rP,rP,rP,rP,rP,rP,rP,x,x,x/x,x,x,rR,rN,rB,rQ,rK,rB,rN,rR,x,x,x",
	"2PC": "R-0,1,0,1-1,1,1,1-1,1,1,1-0,0,0,0-0-{'pawnBaseRank':5,'wb':true,'dim':'8x8'}-x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,yR,yN,yB,yQ,yK,yB,yN,yR,x,x,x/x,x,x,yP,yP,yP,yP,yP,yP,yP,yP,x,x,x/x,x,x,8,x,x,x/x,x,x,8,x,x,x/x,x,x,8,x,x,x/x,x,x,8,x,x,x/x,x,x,rP,rP,rP,rP,rP,rP,rP,rP,x,x,x/x,x,x,rR,rN,rB,rQ,rK,rB,rN,rR,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x"
} as const;
const verifyPredefinedFENPosition = (fenShorthand: string): fenShorthand is keyof typeof predefinedFENpositions =>
	fenShorthand in predefinedFENpositions;

const fenDataTag = "StartFen4";
export const createFENDataTag = (): VariantTag<{
	board: BoardSquares<PieceString>;
	fenData: FENData;
	pieceSet: Set<PieceLetter>;
}> => ({
	tag: "startingPosition",
	currentValue: {
		board: initializeBoardSquares((): PieceString => emptyPieceString),
		fenData: new FENData(),
		pieceSet: new Set<PieceLetter>()
	},
	verifyTagInParsing(inputTag) {
		return tagNamesEqual(inputTag, fenDataTag);
	},
	parseTag(inputTag) {
		const tagContents = unwrapTag(inputTag, fenDataTag);
		const fenDataString = verifyPredefinedFENPosition(tagContents) ? predefinedFENpositions[tagContents] : tagContents;

		const fenData = new FENData();
		const board: BoardSquares<PieceString> = initializeBoardSquares(() => emptyPieceString);
		const pieceSet = new Set<PieceLetter>();

		const transparentWall = createPieceFromString("x");
		const parts = fenDataString.split("-");
		if (parts.length < 7 || parts[parts.length - 1].split("/").length !== boardDimension) {
			console.warn("FEN has less than 7 parts: " + fenDataString);
		} else {
			const sideToMove = parts[0].charAt(0).toLowerCase();
			if (verifyColorEnumValue(sideToMove)) {
				fenData.sideToMove = colorEnum[sideToMove];
			} else {
				console.warn("FEN option 1: side to move is not an alphabetic color: " + sideToMove);
			}

			modifyFourBooleanParameter(parts[1], fenData.fenOptions.tag("dead"));
			modifyFourBooleanParameter(parts[2], fenData.fenOptions.tag("castleKingside"));
			modifyFourBooleanParameter(parts[3], fenData.fenOptions.tag("castleQueenside"));

			const points = parts[4].split(",").map((e) => Number(e));
			if (verifyTupleType(points, totalPlayers)) {
				fenData.points = points;
			} else {
				console.warn(`FEN option 5: points is of incorrect length: ${points.join(",")}`);
			}

			fenData.plyCount = Number(parts[5]);

			const royals: Tuple<Coordinate | null, typeof totalPlayers> = createTuple(null, totalPlayers);
			const verifyKeyInTags = (key: string): key is keyof FENOptionsTags => key in fenData.fenOptions.tags;

			if (parts[6].startsWith("{")) {
				const initialParsing: unknown = JSON.parse(parts[6].replaceAll("(", "[").replaceAll(")", "]").replaceAll("'", '"'));
				if (typeof initialParsing !== "object" || initialParsing === null)
					throw new Error("Unexpected object definition syntax for " + String(initialParsing));
				for (const [key, value] of Object.entries(initialParsing)) {
					if (!verifyKeyInTags(key)) continue;
					const tag = fenData.fenOptions.tags[key];
					tag.value = tag.parse(value);
				}
			}

			const position = parts[parts.length - 1].split("/"),
				dimension = fenData.fenOptions.tag("dim");
			position.forEach((line, i) => {
				let j = 0;
				for (let pieceStr of line.split(",")) {
					if (pieceStr.endsWith('"')) pieceStr = pieceStr.slice(0, -1);
					if (isNaN(Number(pieceStr))) {
						try {
							if (!checkDimensionIntersection(dimension, [i, j])) {
								const pieceString = createPieceFromString(pieceStr);
								board[i][j] = pieceString;
								if (pieceString.isPiece()) {
									if (pieceString.piece === "K" && !royals[pieceString.color]) {
										royals[pieceString.color] = [i, j];
									}

									pieceSet.add(pieceString.piece);
								}
							}
						} finally {
							j++;
						}
					} else j += Number(pieceStr);
				}
			});

			for (const color of colors) {
				for (const [piece] of fenData.fenOptions.tag("bank")[color]) {
					if (piece.piece in nonPlayablePieces) continue;
					pieceSet.add(piece.piece);
				}
			}
			fenData.fenOptions.setTag("royal", royals);

			for (let i = 0; i < boardDimension; i++) {
				for (let j = 0; j < boardDimension; j++) {
					if (checkDimensionIntersection(dimension, [i, j])) board[i][j] = transparentWall;
				}
			}
		}

		if (!fenData.fenOptions.tag("noCorners")) {
			const cornerAreaSize = 3,
				arrayDimension = boardDimension - 1;
			baseLoop: for (let i = 0; i < cornerAreaSize; i++) {
				for (let j = 0; j < cornerAreaSize; j++) {
					const squares: Coordinate[] = [
						[i, j],
						[arrayDimension - i, j],
						[i, arrayDimension - j],
						[arrayDimension - i, arrayDimension - j]
					];
					for (const square of squares) {
						const pieceString = board[square[0]][square[1]];
						if (!pieceString.isWall() || pieceString.piece !== transparentWall.piece) {
							fenData.fenOptions.setTag("noCorners", true);
							break baseLoop;
						}
					}
				}
			}
		}

		return { fenData, board, pieceSet };
	},
	serialize(baseBoard) {
		const { board, data } = baseBoard;
		let resultingString = "";
		resultingString += `${stringColorEnum[data.sideToMove].toUpperCase()}-`;
		resultingString += `${data.fenOptions
			.tag("dead")
			.map((d) => Number(d))
			.join(",")}-`;
		resultingString += `${data.fenOptions
			.tag("castleKingside")
			.map((d) => Number(d))
			.join(",")}-`;
		resultingString += `${data.fenOptions
			.tag("castleQueenside")
			.map((d) => Number(d))
			.join(",")}-`;
		resultingString += `${data.points.join(",")}-`;
		resultingString += `${data.plyCount}-`;
		resultingString += `${serializeFENOptions(data.fenOptions)}-`;

		let currentEmptySquares = 0;
		for (const row of board) {
			for (const pieceString of row) {
				if (pieceString.isEmpty()) {
					currentEmptySquares++;
					continue;
				}

				if (currentEmptySquares !== 0) {
					resultingString += `${currentEmptySquares},`;
					currentEmptySquares = 0;
				}
				resultingString += `${pieceString.value},`;
			}

			if (currentEmptySquares !== 0) {
				resultingString += `${currentEmptySquares}/`;
				currentEmptySquares = 0;
			} else {
				resultingString = resultingString.slice(0, -1);
				resultingString += "/";
			}
		}
		resultingString = resultingString.slice(0, -1);

		return wrapTag(fenDataTag, resultingString);
	}
});
