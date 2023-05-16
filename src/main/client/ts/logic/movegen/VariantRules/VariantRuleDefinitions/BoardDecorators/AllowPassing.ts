import type { NumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { Board } from "../../../Board/Board";
import { InternalMove, InternalMoveSignature } from "../../../MoveTree/MoveTreeInterface";
import { VariantRule } from "../../VariantRule";
import { VariantRuleAllowedChecks, variantRuleColors, VariantRuleHandler } from "../../VariantRuleInterface";
import { chessGlyphIndex } from "@client/fonts/chessGlyphIndex";

const tag = "allowPassing";
export class AllowPassing extends VariantRule<typeof Board, typeof tag> implements VariantRuleHandler<Board> {
	static {
		VariantRule.initVariantRule(AllowPassing);
	}

	getDecoratorType() {
		return Board;
	}

	getPublicProperties() {
		return {
			parameterValue: true,
			information: {
				name: "Allow Passing",
				description: "Players can pass instead of making a move",
				tag,
				color: variantRuleColors.minor,
				displayIcon: chessGlyphIndex.pause
			}
		} as const;
	}

	matchesPGNDeclaration(match: string): boolean {
		return /^AllowPassing$/i.test(match);
	}

	serializeToParsingForm(): string {
		return "AllowPassing";
	}

	isDisabled({ variantDataRules }: VariantRuleAllowedChecks): boolean {
		return variantDataRules.giveaway;
	}

	getAllowedInternalMoves(sideToMove: NumericColor = this.decorator.data.sideToMove): InternalMove[] {
		const passingMoves = this.decorator.isKingInCheck(sideToMove) ? [] : [{ type: InternalMoveSignature.Pass }];
		for (const decorator of this.wrappingDecorators) {
			if (decorator.getAllowedInternalMoves) {
				return [...passingMoves, ...decorator.getAllowedInternalMoves(sideToMove)];
			}
		}
		return [...passingMoves, ...Board.prototype.getAllowedInternalMoves.call(this.decorator, sideToMove)];
	}
}
