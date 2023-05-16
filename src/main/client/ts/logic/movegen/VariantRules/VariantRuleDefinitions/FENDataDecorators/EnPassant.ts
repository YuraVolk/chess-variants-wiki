import { MoveData, SpecialMove } from "../../../MoveTree/MoveTreeInterface";
import { FENData } from "../../../FENData/FENData";
import { emptyPieceString, PieceString } from "../../../GameInformation/GameUnits/PieceString";
import { VariantRule } from "../../VariantRule";
import { variantRuleColors, VariantRuleHandler } from "../../VariantRuleInterface";
import { pieceControlConfigSettings } from "@moveGeneration/PieceControl/PieceControlInterface";
import { Coordinate, nonPlayablePieces } from "../../../GameInformation/GameUnits/GameUnits";
import { assertNonUndefined } from "@client/ts/baseTypes";
import { isVerticalPlacement } from "@client/ts/logic/BaseInterfaces";
import { chessGlyphIndex } from "@client/fonts/chessGlyphIndex";

const tag = "enPassant";
export class EnPassant extends VariantRule<typeof FENData, typeof tag> implements VariantRuleHandler<FENData> {
	static {
		VariantRule.initVariantRule(EnPassant);
	}

	getDecoratorType() {
		return FENData;
	}
	getPublicProperties() {
		return {
			parameterValue: true,
			information: {
				name: "En Passant",
				description: "Pawns can capture en passant",
				tag,
				color: variantRuleColors.minor,
				displayIcon: chessGlyphIndex.pawnConnection
			}
		} as const;
	}
	matchesPGNDeclaration(match: string): boolean {
		return /^EnPassant$/i.test(match);
	}
	serializeToParsingForm(): string {
		return "EnPassant";
	}
	isDisabled(): boolean {
		return false;
	}

	processStandardMove(moveData: MoveData): { endPiece: PieceString[] } {
		const enPassants = this.decorator.fenOptions.tag("enPassant");
		const {
			startCoordinates: [startI, startJ],
			endCoordinates: [endI, endJ]
		} = moveData;
		if (moveData.specialType === SpecialMove.EnPassant) {
			const eligibleEnPassants: number[] = [];
			enPassants.forEach((e, i) => {
				if (!e) return;
				if (e[0][0] === endI && e[0][1] === endJ) eligibleEnPassants.push(i);
			});
			for (const enPassantCoordinate of eligibleEnPassants) {
				const enPassant = enPassants[enPassantCoordinate];
				assertNonUndefined(enPassant);
				this.decorator.board.board[enPassant[1][0]][enPassant[1][1]] = emptyPieceString;
				enPassants[enPassantCoordinate] = null;
			}
		} else {
			const pieceString = this.decorator.board.board[startI][startJ];

			if (!pieceString.isEmpty() && pieceString.piece !== nonPlayablePieces.duck) {
				enPassants[this.decorator.sideToMove] = null;
				const setting = pieceControlConfigSettings[pieceString.piece];
				if (
					setting.moveGenerationSettings.isPawn &&
					Math.abs(isVerticalPlacement(this.decorator.sideToMove) ? startI - endI : startJ - endJ) === 2
				) {
					const enPassantInfo: [Coordinate, Coordinate] = [
						[Math.ceil((startI + endI) / 2), Math.ceil((startJ + endJ) / 2)],
						[endI, endJ]
					];
					enPassants[this.decorator.sideToMove] = enPassantInfo;
				}
			}
		}

		return this.callHandler("processStandardMove", arguments);
	}
}
