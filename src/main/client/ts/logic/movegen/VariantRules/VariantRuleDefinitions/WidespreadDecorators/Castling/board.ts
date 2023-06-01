import type { VariantRuleHandler } from "@moveGeneration/VariantRules/VariantRuleInterface";
import { Castling } from ".";
import { Board } from "@moveGeneration/Board/Board";
import { VariantRule } from "@moveGeneration/VariantRules/VariantRule";
import type { SpecialMoveGenerationSettings } from "@moveGeneration/Board/BoardInterface";
import { MoveData, SpecialMove } from "@moveGeneration/MoveTree/MoveTreeInterface";

export class BoardCastling extends Castling<typeof Board> implements VariantRuleHandler<Board> {
    static {
        VariantRule.initVariantRule(BoardCastling);
    }

    getDecoratorType() {
        return Board;
    }
    
    getSpecialMoves(parameters: SpecialMoveGenerationSettings): MoveData[] {
        const { i, j, baseColor } = parameters;
		const specialMoves: MoveData[] = [];
		const royal = this.decorator.data.fenOptions.tag("royal")[baseColor];

        if (royal && royal[0] === i && royal[1] === j) {
			if (this.decorator.data.fenOptions.isKingsideCastlingAvailable(baseColor, this.decorator)) {
				specialMoves.push({
					startCoordinates: [i, j],
					endCoordinates: this.decorator.data.fenOptions.getKingsideCastlingEndCoordinate(baseColor),
					specialType: SpecialMove.CastlingKingside
				});
			}

			if (this.decorator.data.fenOptions.isQueensideCastlingAvailable(baseColor, this.decorator)) {
				specialMoves.push({
					startCoordinates: [i, j],
					endCoordinates: this.decorator.data.fenOptions.getQueensideCastlingEndCoordinate(baseColor),
					specialType: SpecialMove.CastlingQueenside
				});
			}
		}

		return [...specialMoves, ...this.callHandler("getSpecialMoves", arguments)];
    }
}
