import { FENData } from "@moveGeneration/FENData/FENData";
import { EnPassant } from ".";
import type { VariantRuleHandler } from "@moveGeneration/VariantRules/VariantRuleInterface";
import { VariantRule } from "@moveGeneration/VariantRules/VariantRule";
import { assertNonUndefined } from "@client/ts/baseTypes";
import { isVerticalPlacement } from "@client/ts/logic/BaseInterfaces";
import { nonPlayablePieces, Coordinate } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { PieceString, emptyPieceString } from "@moveGeneration/GameInformation/GameUnits/PieceString";
import { MoveData, SpecialMove } from "@moveGeneration/MoveTree/MoveTreeInterface";
import { pieceControlConfigSettings } from "@moveGeneration/PieceControl/PieceControlInterface";

export class FENDataEnPassant extends EnPassant<typeof FENData> implements VariantRuleHandler<FENData> {
	static {
		VariantRule.initVariantRule(FENDataEnPassant);
	}

	getDecoratorType() {
		return FENData;
	}

	processStandardMove(moveData: MoveData): { endPiece: PieceString[] } {
		const enPassants = this.decorator.fenOptions.tag("enPassant");
		const {
			startCoordinates: [startI, startJ],
			endCoordinates: [endI, endJ]
		} = moveData;

		const endPieces: PieceString[] = [];
		if (moveData.specialType === SpecialMove.EnPassant) {
			const eligibleEnPassants: number[] = [];
			enPassants.forEach((e, i) => {
				if (!e) return;
				if (e[0][0] === endI && e[0][1] === endJ) eligibleEnPassants.push(i);
			});
			for (const enPassantCoordinate of eligibleEnPassants) {
				const enPassant = enPassants[enPassantCoordinate];
				assertNonUndefined(enPassant);
				if (this.decorator.board.board[enPassant[1][0]][enPassant[1][1]].isPiece()) {
					endPieces.push(this.decorator.board.board[enPassant[1][0]][enPassant[1][1]]);
				}
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
					Math.abs(isVerticalPlacement(this.decorator.sideToMove) ? startI - endI : startJ - endJ) === EnPassant.JUMP_DISTANCE
				) {
					const enPassantInfo: [Coordinate, Coordinate] = [
						[Math.ceil((startI + endI) / EnPassant.JUMP_DISTANCE), Math.ceil((startJ + endJ) / EnPassant.JUMP_DISTANCE)],
						[endI, endJ]
					];
					enPassants[this.decorator.sideToMove] = enPassantInfo;
				}
			}
		}

		const result = this.callHandler("processStandardMove", arguments);
		if (moveData.specialType === SpecialMove.EnPassant) {
			return { ...result, endPiece: [...endPieces, ...result.endPiece] };
		} else return result;
	}
}
