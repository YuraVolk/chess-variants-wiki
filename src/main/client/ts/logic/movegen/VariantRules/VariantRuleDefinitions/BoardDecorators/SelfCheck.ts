import type { Tuple } from "@client/ts/baseTypes";
import type { totalPlayers } from "@moveGeneration/GameInformation/GameData";
import { Board } from "../../../Board/Board";
import { compareCoordinates, stringifyCoordinate } from "../../../Board/BoardInterface";
import { VariantRule } from "../../VariantRule";
import { VariantRuleAllowedChecks, variantRuleColors, VariantRuleHandler } from "../../VariantRuleInterface";
import { chessGlyphIndex } from "@client/fonts/chessGlyphIndex";

const tag = "selfCheck";
export class SelfCheck extends VariantRule<typeof Board, typeof tag> implements VariantRuleHandler<Board> {
	static {
		VariantRule.initVariantRule(SelfCheck);
	}

	getDecoratorType() {
		return Board;
	}
	getPublicProperties() {
		return {
			parameterValue: true,
			information: {
				name: "Self-check",
				description: "Self-checks cost lives. Checkmate yourself to earn points",
				tag,
				color: variantRuleColors.minor,
				displayIcon: chessGlyphIndex.donut
			}
		} as const;
	}
	matchesPGNDeclaration(match: string): boolean {
		return /^SelfCheck$/i.test(match);
	}
	serializeToParsingForm(): string {
		return "SelfCheck";
	}
	isDisabled({ variantDataRules }: VariantRuleAllowedChecks): boolean {
		return !variantDataRules.nCheck || !variantDataRules.captureTheKing;
	}

	getCurrentChecks(baseColor = this.decorator.data.sideToMove): Tuple<string[], typeof totalPlayers> {
		const {
			data: { fenOptions, sideToMove },
			preGeneratedAttacks
		} = this.decorator;
		const baseChecks = this.callHandler("getCurrentChecks", arguments);
		const royal = fenOptions.tag("royal")[baseColor];
		const newCoordinates: string[] = [];

		if (royal) {
			for (const [attackingPiece, attackCoordinates] of preGeneratedAttacks[sideToMove].hoppingPieceLines) {
				if (compareCoordinates(attackCoordinates, royal)) {
					newCoordinates.push(stringifyCoordinate(attackingPiece));
				}
			}
			for (const [attackingPiece, attackLine] of preGeneratedAttacks[sideToMove].slidingPiecesLines) {
				for (const attackCoordinates of attackLine) {
					if (compareCoordinates(attackCoordinates, royal)) {
						newCoordinates.push(stringifyCoordinate(attackingPiece));
						break;
					}
				}
			}
		}

		baseChecks[baseColor] = newCoordinates;
		return baseChecks;
	}
}
