import { chessGlyphIndex } from "@client/fonts/chessGlyphIndex";
import { shuffleArray } from "../../../../../utils/ArrayUtils";
import { Board } from "../../../Board/Board";
import { totalPlayers, VariantType } from "../../../GameInformation/GameData";
import { verifyNumericColor } from "../../../GameInformation/GameUnits/GameUnits";
import { VariantRule } from "../../VariantRule";
import { VariantRuleAllowedChecks, variantRuleColors, VariantRuleHandler } from "../../VariantRuleInterface";

const tag = "anonymous";
export class Anonymous extends VariantRule<typeof Board, typeof tag> implements VariantRuleHandler<Board> {
	static {
		VariantRule.initVariantRule(Anonymous);
	}

	getDecoratorType() {
		return Board;
	}

	getPublicProperties() {
		return {
			parameterValue: true,
			information: {
				name: "Anonymous",
				description: "Players' names and ratings are hidden",
				tag,
				color: variantRuleColors.metadata,
				displayIcon: chessGlyphIndex.userInformation
			}
		} as const;
	}

	matchesPGNDeclaration(match: string): boolean {
		return /^Anonymous$/i.test(match);
	}

	serializeToParsingForm(): string {
		return "Anonymous";
	}

	isDisabled(): boolean {
		return false;
	}

	initDecoratorSettings() {
		for (let i = 0; i < totalPlayers; i++) {
			this.decorator.gameData.players[i].name = "Anonymous";
			this.decorator.gameData.players[i].elo = undefined;
		}

		for (const decorator of this.wrappingDecorators) decorator.initDecoratorSettings?.();
	}
}

const semiAnonTag = "semiAnonymous";
export class SemiAnonymous extends VariantRule<typeof Board, typeof semiAnonTag> implements VariantRuleHandler<Board> {
	static {
		VariantRule.initVariantRule(SemiAnonymous);
	}

	getDecoratorType() {
		return Board;
	}

	getPublicProperties() {
		return {
			parameterValue: true,
			information: {
				name: "Semi-Anonymous",
				description: "Players's colors are hidden",
				tag: semiAnonTag,
				color: variantRuleColors.metadata,
				displayIcon: chessGlyphIndex.userExtraInformation
			}
		} as const;
	}

	matchesPGNDeclaration(match: string): boolean {
		return /^Semi-Anonymous$/i.test(match);
	}

	serializeToParsingForm(): string {
		return "Semi-Anonymous";
	}

	isDisabled(): boolean {
		return false;
	}

	initDecoratorSettings() {
		shuffleArray(this.decorator.gameData.players);
		for (const decorator of this.wrappingDecorators) decorator.initDecoratorSettings?.();
	}
}

const spTag = "selfPartner";
export class SelfPartner extends VariantRule<typeof Board, typeof spTag> implements VariantRuleHandler<Board> {
	static {
		VariantRule.initVariantRule(SelfPartner);
	}

	getDecoratorType() {
		return Board;
	}

	getPublicProperties() {
		return {
			parameterValue: true,
			information: {
				name: "Self-Partner",
				description: "Both sides of the team were played by one player",
				tag: spTag,
				color: variantRuleColors.metadata,
				displayIcon: chessGlyphIndex.selfPartner
			}
		} as const;
	}

	matchesPGNDeclaration(match: string): boolean {
		return /^SelfPartner$/i.test(match);
	}

	serializeToParsingForm(): string {
		return "SelfPartner";
	}

	isDisabled({ gameType, fenTags }: VariantRuleAllowedChecks): boolean {
		return gameType !== VariantType.Teams || fenTags.resigned.value.filter(Boolean).length !== 0;
	}

	initDecoratorSettings() {
		for (const decorator of this.wrappingDecorators) decorator.initDecoratorSettings?.();
		const gameType = this.decorator.gameType;
		const firstTeamPlayer = gameType.teamSettings.firstTeamColors.indexOf(true),
			secondTeamPlayer = gameType.teamSettings.secondTeamColors.indexOf(true);
		if (verifyNumericColor(firstTeamPlayer)) {
			this.decorator.gameData.players[gameType.getTeammateColor(firstTeamPlayer)].name =
				this.decorator.gameData.players[firstTeamPlayer].name;
		}
		if (verifyNumericColor(secondTeamPlayer)) {
			this.decorator.gameData.players[gameType.getTeammateColor(secondTeamPlayer)].name =
				this.decorator.gameData.players[secondTeamPlayer].name;
		}
	}
}
