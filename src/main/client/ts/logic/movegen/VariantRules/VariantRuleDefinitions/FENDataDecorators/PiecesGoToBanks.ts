import { FENData } from "../../../FENData/FENData";
import { PostMoveResults } from "../../../FENData/FENDataInterface";
import { createPieceFromData, PieceString } from "../../../GameInformation/GameUnits/PieceString";
import { VariantRule } from "../../VariantRule";
import { variantRuleColors, VariantRuleHandler } from "../../VariantRuleInterface";
import type { PieceLetter } from "@moveGeneration/PieceControl/PieceControlInterface";
import { MoveComponent, MoveData, verifyInternalMove, verifyStandardMove } from "../../../MoveTree/MoveTreeInterface";
import { chessGlyphIndex } from "@client/fonts/chessGlyphIndex";

const tag = "piecesGoToBanks";
export class PiecesGoToBanks extends VariantRule<typeof FENData, typeof tag> implements VariantRuleHandler<FENData> {
	getDecoratorType() {
		return FENData;
	}
	getPublicProperties() {
		return {
			parameterValue: true,
			information: {
				name: "Bank Captures",
				description: "Captured pieces go to banks",
				tag,
				color: variantRuleColors.extending,
				displayIcon: chessGlyphIndex.copyToClipboard
			}
		} as const;
	}
	matchesPGNDeclaration(match: string): boolean {
		return /^Crazy(?:house|wan)$/i.test(match);
	}
	serializeToParsingForm(): string {
		return "";
	}
	isDisabled(): boolean {
		return false;
	}

	processStandardMove(moveData: MoveData): { endPiece: PieceString[] } {
		const promotedFrom = this.decorator.fenOptions.tag("promotedFrom");

		if (moveData.promotion) {
			const pieceLetter = this.decorator.board.board[moveData.startCoordinates[0]][moveData.startCoordinates[1]].piece;
			promotedFrom.set(moveData.endCoordinates, pieceLetter);
		} else {
			for (const [key, value] of promotedFrom) {
				if (key[0] === moveData.startCoordinates[0] && key[1] === moveData.endCoordinates[1]) {
					promotedFrom.delete(key);
					promotedFrom.set(moveData.endCoordinates, value);
					break;
				}
			}
		}

		return this.callHandler("processStandardMove", arguments);
	}

	affectOptions(move: MoveComponent): PostMoveResults {
		const fenOptions = this.decorator.fenOptions;
		const areBanksEnabled = fenOptions.tag("areBanksEnabled"),
			bank = fenOptions.tag("bank"),
			promotedFrom = fenOptions.tag("promotedFrom");

		if (areBanksEnabled[this.decorator.sideToMove]) {
			if (!verifyInternalMove(move)) {
				if (verifyStandardMove(move)) {
					const captures = this.decorator.getCapturedPieces(move);
					const sideToMove = this.decorator.sideToMove;
					const addPieceToBank = (piece: PieceLetter) => {
						for (const [key, value] of bank[sideToMove]) {
							if (key.piece === piece && key.color === sideToMove) {
								bank[sideToMove].set(key, value + 1);
								return;
							}
						}

						bank[sideToMove].set(createPieceFromData(sideToMove, piece), 1);
					};

					captures.forEach((c) => {
						for (const [key, value] of promotedFrom) {
							if (key[0] === c[0] && key[1] === c[1]) {
								promotedFrom.delete(key);
								addPieceToBank(value);
								return;
							}
						}

						addPieceToBank(this.decorator.board.board[c[0]][c[1]].piece);
					});
				}
			}
		}

		return this.callHandler("affectOptions", arguments);
	}
}
