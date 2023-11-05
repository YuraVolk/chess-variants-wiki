import { assertNonUndefined } from "@client/ts/baseTypes";
import { verifyColorEnumValue, colorEnum } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { duckPieceString, createPieceFromData, deadColorIndex } from "@moveGeneration/GameInformation/GameUnits/PieceString";
import {
	MoveData,
	DroppingMove,
	InternalMove,
	InternalMoveSignature,
	SpecialMove,
	MoveComponent,
	verifyInternalMove,
	MoveWrapper,
	createDummyMoveMetadata,
	verifyMoveWrapperProperties,
	Move,
	verifyRequiredMove
} from "@moveGeneration/MoveTree/MoveTreeInterface";
import { verifyPieceLetter } from "@moveGeneration/PieceControl/PieceControlInterface";
import { parseEnPassantCoordinates, parseSingleCoordinate } from "../Utils";

export const PGN4_SYNTAX = {
	SPLIT: ".",
	PIECE_REGEX: /[xA-ZΑ-ωa-nrbyg0-9-=+#@]/,
	PIECE_REGEX_SIMPLIFIED: /[A-ZΑ-ωa-n0-9-]/,
	MOVE_CAPTURING_REGEX: /^[A-ZΑ-ω]?([a-n]\d{1,2})(?:-|x[A-ZΑ-ω]?)[A-ZΑ-ω]?([a-n]\d{1,2})/,
	DUCK_MOVE_CAPTURING_REGEX: /Θ([a-n]\d{1,2})?-([a-n]\d{1,2})/,
	DROPPING_MOVE_CAPTURING_REGEX: /Θ?@([a-z])([A-ZΑ-ω])-([a-n]\d{1,2})/,
	BRACKETS: {
		COMMENT_START: "{",
		COMMENT_END: "}",
		VARIATION_START: "(",
		VARIATION_END: ")"
	},
	COORDINATE_REGEX: /[a-n](?:(?:1[0-4])|(?:[1-9]))/,
	COMMENT_SYNTAXES: {
		CLOCK: /\[%timestamp (-?\d+?)]/,
		ARROWS: /\[%cal ((?:R|B|Y|G).+?)]/,
		SQUARES: /\[%csl ((?:R|B|Y|G).+?)]/,
		ANNOTATION: /\[%ann (.+?)]/
	}
} as const;

function obtainDuckMove(move: string): MoveData | DroppingMove | undefined {
	const match = move.match(PGN4_SYNTAX.DUCK_MOVE_CAPTURING_REGEX);
	if (match) {
		if (match[1]) {
			const startCoordinates = parseSingleCoordinate(match[1]);
			const endCoordinates = parseSingleCoordinate(match[2]);
			if (!startCoordinates || !endCoordinates) return;
			return { startCoordinates, endCoordinates };
		} else {
			const endCoordinates = parseSingleCoordinate(match[2]);
			if (!endCoordinates) return;
			return { piece: duckPieceString, endCoordinates };
		}
	} else return;
}

function obtainInternalType(type: string): InternalMove | undefined {
	let internalMove: keyof typeof InternalMoveSignature;
	for (internalMove in InternalMoveSignature) {
		if (Object.prototype.hasOwnProperty.call(InternalMoveSignature, internalMove)) {
			if (InternalMoveSignature[internalMove] === type) return { type: InternalMoveSignature[internalMove] };
		}
	}
}

function obtainDroppingMove(move: string): DroppingMove | undefined {
	const match = move.match(PGN4_SYNTAX.DROPPING_MOVE_CAPTURING_REGEX);
	if (match) {
		const [, color, piece, coordinate] = match;
		if (!verifyColorEnumValue(color) || !verifyPieceLetter(piece)) return;
		const endCoordinates = parseSingleCoordinate(coordinate);
		if (!endCoordinates) return;
		return {
			piece: createPieceFromData(colorEnum[color], piece),
			endCoordinates
		};
	} else return;
}

function obtainStandardMove(move: string): MoveData | undefined {
	const moveData: MoveData = { startCoordinates: [-1, -1], endCoordinates: [-1, -1] };
	const promotionMatch = move.match(/.*?=([A-Zx])/);
	if (promotionMatch?.[1]) {
		moveData.promotion = [createPieceFromData(deadColorIndex, promotionMatch[1].charAt(0))];
	}

	const moveCoordinates = move.match(PGN4_SYNTAX.MOVE_CAPTURING_REGEX);
	if (moveCoordinates) {
		const startCoordinate = parseSingleCoordinate(moveCoordinates[1]);
		const endCoordinate = parseSingleCoordinate(moveCoordinates[2]);

		assertNonUndefined(startCoordinate);
		assertNonUndefined(endCoordinate);
		moveData.startCoordinates = startCoordinate;
		moveData.endCoordinates = endCoordinate;

		return moveData;
	} else {
		if (/O-O-O.*/.test(move)) {
			return { ...moveData, specialType: SpecialMove.CastlingQueenside };
		} else if (/O-O.*/.test(move)) {
			return { ...moveData, specialType: SpecialMove.CastlingKingside };
		}
	}
}

function cloneMoveData(move: MoveComponent): MoveComponent {
	if (!verifyInternalMove(move)) {
		if ("startCoordinates" in move) {
			const newMove: MoveData = {
				startCoordinates: [...move.startCoordinates],
				endCoordinates: [...move.endCoordinates]
			};
			if ("specialType" in move) {
				newMove.specialType = move.specialType;
			}
			if ("promotion" in move) {
				newMove.promotion = move.promotion;
			}
			return newMove;
		} else {
			return {
				endCoordinates: move.endCoordinates,
				piece: move.piece
			};
		}
	} else {
		return { type: move.type };
	}
}

export const parsePGN4Moves = (moves: string): MoveWrapper[] => {
	const parseMoves = (selectedMove: string, path: number[]): MoveWrapper[] => {
		const moveList: MoveWrapper[] = [];
		const currentPath = path;

		function getMoveIndexes(mI: number) {
			while (selectedMove[mI] && PGN4_SYNTAX.PIECE_REGEX.test(selectedMove[mI])) mI++;
			return mI;
		}

		function parseComment(mI: number) {
			while (selectedMove[mI] && selectedMove[mI] !== PGN4_SYNTAX.BRACKETS.COMMENT_END) mI++;
			return mI;
		}

		function getEnumeratorIndex(mI: number) {
			while (selectedMove[mI] && /\d|\./.test(selectedMove[mI])) mI++;
			return --mI;
		}

		function findBracketIndex(i: number) {
			let depth = 0;
			for (; i < selectedMove.length; i++) {
				switch (selectedMove[i]) {
					case PGN4_SYNTAX.BRACKETS.COMMENT_START:
						i = parseComment(i);
						break;
					case PGN4_SYNTAX.BRACKETS.VARIATION_START:
						depth++;
						break;
					case PGN4_SYNTAX.BRACKETS.VARIATION_END:
						if (--depth === 0) {
							return i;
						}
						break;
				}
			}

			throw new TypeError("No matching parentheses for input " + selectedMove);
		}

		function processMoveDataInsertion() {
			if (currentMoveData) {
				currentPath.push(++increment);
				currentMove.path = currentPath.slice();
				currentPath.pop();
				currentMove.moveData = currentMoveData.map((m) => cloneMoveData(m));
				currentMove.metadata = createDummyMoveMetadata();
				const clockSyntax = currentMove.comment?.match(PGN4_SYNTAX.COMMENT_SYNTAXES.CLOCK);
				if (clockSyntax && !isNaN(Number(clockSyntax[1]))) {
					currentMove.comment = currentMove.comment?.replace(PGN4_SYNTAX.COMMENT_SYNTAXES.CLOCK, "");
					currentMove.metadata.playerClock = Number(clockSyntax[1]);
				}
				const arrowSyntax = currentMove.comment?.match(PGN4_SYNTAX.COMMENT_SYNTAXES.ARROWS);
				if (arrowSyntax) {
					const arrows = arrowSyntax[1].split(",");
					for (const arrow of arrows) {
						const [color, coordinate] = [arrow[0], arrow.slice(1)];
						const numericColor = color.toLowerCase(),
							arrowCoordinates = parseEnPassantCoordinates(coordinate);
						if (!verifyColorEnumValue(numericColor) || !arrowCoordinates) continue;
						currentMove.metadata.highlightedArrows.push([colorEnum[numericColor], ...arrowCoordinates]);
					}
					currentMove.comment = currentMove.comment?.replace(PGN4_SYNTAX.COMMENT_SYNTAXES.ARROWS, "");
				}
				const squareSyntax = currentMove.comment?.match(PGN4_SYNTAX.COMMENT_SYNTAXES.SQUARES);
				if (squareSyntax) {
					const squares = squareSyntax[1].split(",");
					for (const square of squares) {
						const [color, inputCoordinate] = [square[0], square.slice(1)];
						const numericColor = color.toLowerCase(),
							coordinate = parseSingleCoordinate(inputCoordinate);
						if (!verifyColorEnumValue(numericColor) || !coordinate) continue;
						currentMove.metadata.highlightedSquares.push([colorEnum[numericColor], coordinate]);
					}
					currentMove.comment = currentMove.comment?.replace(PGN4_SYNTAX.COMMENT_SYNTAXES.SQUARES, "");
				}
				const annotationMatch = currentMove.comment?.match(PGN4_SYNTAX.COMMENT_SYNTAXES.ANNOTATION);
				if (annotationMatch) {
					currentMove.metadata.annotation = annotationMatch[1];
					currentMove.comment = currentMove.comment?.replace(PGN4_SYNTAX.COMMENT_SYNTAXES.ANNOTATION, "");
				}

				if (verifyMoveWrapperProperties(currentMove)) {
					moveList.push(Object.assign({}, currentMove));
				} else {
					console.error(`Not all properties of move wrapper are filled out: ${JSON.stringify(currentMove)}`);
				}

				currentMove = {
					alternativeLines: [],
					comment: ""
				};
				currentMoveData = undefined;
			}
		}

		function obtainMoveFromInfo(info: string): Move {
			const currentMove: MoveComponent[] = [];
			const internalType = obtainInternalType(info[0]);
			if (info.length === 1 && internalType !== undefined) {
				return [internalType];
			}

			const standardMove = obtainStandardMove(info);
			if (standardMove) currentMove.push(standardMove);
			const droppingMove = obtainDroppingMove(info);
			if (droppingMove) currentMove.push(droppingMove);
			const duckMove = obtainDuckMove(info);
			if (duckMove) currentMove.push(duckMove);

			if (verifyRequiredMove(currentMove)) {
				return currentMove;
			} else throw new Error(`Move length is 0 for string ${info}`);
		}

		let currentMoveData: Move | undefined;
		let currentMove: Partial<MoveWrapper> = {
			alternativeLines: [],
			comment: ""
		};

		let increment = -1,
			variationIncrement = -1;
		try {
			for (let i = 0; i < selectedMove.length; i++) {
				const isNumNaN = isNaN(Number(selectedMove[i]));
				if (isNumNaN && !/\s/.test(selectedMove[i]) && selectedMove[i] !== PGN4_SYNTAX.SPLIT) {
					if (PGN4_SYNTAX.PIECE_REGEX_SIMPLIFIED.test(selectedMove[i])) {
						const index = getMoveIndexes(i);
						currentMoveData = obtainMoveFromInfo(selectedMove.substring(i, index));
						i = index;
					} else if (selectedMove[i] === PGN4_SYNTAX.BRACKETS.COMMENT_START) {
						const index = parseComment(i);
						currentMove.comment = selectedMove.substring(i + 1, index);
						i = index;
					} else if (selectedMove[i] === PGN4_SYNTAX.BRACKETS.VARIATION_START) {
						const index = findBracketIndex(i);
						const newCurrentPath = currentPath.slice();
						newCurrentPath.push(increment, ++variationIncrement);
						currentMove.alternativeLines?.push([...parseMoves(selectedMove.substring(i + 1, index), newCurrentPath)]);
						i = index;
					}
				} else if (
					(selectedMove[i] === PGN4_SYNTAX.SPLIT && selectedMove[i + 1] && selectedMove[i + 1] === PGN4_SYNTAX.SPLIT) ||
					(selectedMove[i].trim() &&
						!isNumNaN &&
						selectedMove[i + 1] &&
						(selectedMove[i + 1] === PGN4_SYNTAX.SPLIT || !isNaN(Number(selectedMove[i + 1]))))
				) {
					if (!isNumNaN) i = Math.max(i, getEnumeratorIndex(i));
					if (currentMoveData) {
						processMoveDataInsertion();
					}
				}
			}
		} finally {
			processMoveDataInsertion();
			currentPath.push(increment + 1);
			currentMove.path = currentPath.slice();
			if (verifyMoveWrapperProperties(currentMove)) {
				moveList.push(Object.assign({}, currentMove));
			} else if (currentMove.alternativeLines?.length) {
				moveList[moveList.length - 1].alternativeLines = [...currentMove.alternativeLines];
			}
		}

		return moveList;
	};

	return parseMoves(moves, []);
};
