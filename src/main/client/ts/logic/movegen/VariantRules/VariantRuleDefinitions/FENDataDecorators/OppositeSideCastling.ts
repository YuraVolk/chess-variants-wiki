import { MoveData, SpecialMove } from "../../../MoveTree/MoveTreeInterface";
import type { PlayerBooleanTuple } from "../../../Board/Board";
import { FENData } from "../../../FENData/FENData";
import { VariantRule } from "../../VariantRule";
import { variantRuleColors, VariantRuleHandler } from "../../VariantRuleInterface";
import { getOppositePlacedColor } from "../../../GameInformation/GameData";
import { PieceString } from "@moveGeneration/GameInformation/GameUnits/PieceString";

const tag = "oppositeSideCastling";
export class OppositeSideCastling extends VariantRule<typeof FENData, typeof tag> implements VariantRuleHandler<FENData> {
	static {
		VariantRule.initVariantRule(OppositeSideCastling);
	}

	getDecoratorType() {
		return FENData;
	}
	getPublicProperties() {
		return {
			parameterValue: true,
			information: {
				name: "Opposite-side Castling",
				description: "Once your opponent has castled, you can only castle to the opposite side",
				tag,
				color: variantRuleColors.minor,
				displayIcon: "ὸ"
			}
		} as const;
	}
	matchesPGNDeclaration(match: string) {
		return /^OppositeSideCastling$/i.test(match);
	}
	serializeToParsingForm(): string {
		return "OppositeSideCastling";
	}
	isDisabled(): boolean {
		return false;
	}

	processStandardMove(moveData: MoveData): { endPiece: PieceString[] } {
		const result = this.callHandler("processStandardMove", arguments);

		if ("specialType" in moveData) {
			let castlingDataReference: PlayerBooleanTuple | undefined;
			if (moveData.specialType === SpecialMove.CastlingKingside) {
				castlingDataReference = this.decorator.fenOptions.tag("castleKingside");
			} else if (moveData.specialType === SpecialMove.CastlingQueenside) {
				castlingDataReference = this.decorator.fenOptions.tag("castleQueenside");
			}

			if (castlingDataReference) {
				castlingDataReference[getOppositePlacedColor(this.decorator.sideToMove)] = false;
			}
		}

		return result;
	}
}
