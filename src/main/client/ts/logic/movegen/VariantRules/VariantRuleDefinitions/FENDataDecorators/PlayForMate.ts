import { chessGlyphIndex } from "@client/fonts/chessGlyphIndex";
import { FENData } from "../../../FENData/FENData";
import { totalPlayers, VariantType } from "../../../GameInformation/GameData";
import { VariantRule } from "../../VariantRule";
import { VariantRuleAllowedChecks, variantRuleColors, VariantRuleHandler } from "../../VariantRuleInterface";

const tag = "playForMate";
export class PlayForMate extends VariantRule<typeof FENData, typeof tag> implements VariantRuleHandler<FENData> {
	static {
		VariantRule.initVariantRule(PlayForMate);
	}
	private initiallyAliveColors = totalPlayers;
	private static readonly checkmatePoints = {
		[1]: 24,
		[2]: 32,
		[3]: 48
	};

	getDecoratorType() {
		return FENData;
	}
	getPublicProperties() {
		return {
			parameterValue: true,
			information: {
				name: "Play for mate",
				description: "No points for pieces, only checkmates matter",
				tag,
				color: variantRuleColors.pointsAlternation,
				displayIcon: chessGlyphIndex.hashtag
			}
		} as const;
	}
	matchesPGNDeclaration(match: string) {
		return /^Play4Mate$/i.test(match);
	}
	serializeToParsingForm(): string {
		return "Play4Mate";
	}
	isDisabled({ gameType }: VariantRuleAllowedChecks): boolean {
		return gameType === VariantType.Teams;
	}

	initDecoratorSettings() {
		this.initiallyAliveColors = this.decorator.fenOptions
			.tag("dead")
			.map((d, i) => d || this.decorator.fenOptions.tag("resigned")[i])
			.filter(Boolean).length;

		for (const decorator of this.wrappingDecorators) decorator.initDecoratorSettings?.();
	}

	obtainPointsForMate(): number {
		const aliveColors = this.decorator.fenOptions.tag("dead").filter(Boolean).length;
		switch (aliveColors) {
			case 1:
				if (this.initiallyAliveColors === totalPlayers) {
					return PlayForMate.checkmatePoints[1];
				}
			// * Fallthrough
			case 2:
				if (this.initiallyAliveColors >= totalPlayers - 1) {
					return PlayForMate.checkmatePoints[2];
				}
			// * Fallthrough
			case 3:
				return PlayForMate.checkmatePoints[3];
			default:
				console.error(`Unexpected players length ${aliveColors}`);
				return 0;
		}
	}

	getPointsForPiece(): number {
		return 0;
	}
}
