import { VariantType } from "@moveGeneration/GameInformation/GameData";
import { Board } from "../../../Board/Board";
import { VariantRule } from "../../VariantRule";
import { VariantRuleAllowedChecks, variantRuleColors, VariantRuleHandler } from "../../VariantRuleInterface";

const tag = "alternativeTeams";
export class AlternativeTeams extends VariantRule<typeof Board, typeof tag> implements VariantRuleHandler<Board> {
	static {
		VariantRule.initVariantRule(AlternativeTeams);
	}

	private teammate: number;
	constructor(teammate?: unknown) {
		super();
		if (typeof teammate === "number") {
			this.teammate = teammate;
		} else {
			this.teammate = 2;
		}
	}

	getDecoratorType() {
		return Board;
	}

	getPublicProperties() {
		const rbTeams = this.teammate === 1;
		const teamOne = rbTeams ? "Red & Blue" : "Red & Green";
		const teamTwo = rbTeams ? "Yellow & Green" : "Blue & Yellow";
		return {
			parameterValue: this.teammate,
			information: {
				name: `Teams`,
				description: `Alternative Teams: ${teamOne} form a team against ${teamTwo}`,
				tag,
				color: variantRuleColors.autogenous,
				displayIcon: "Đ"
			}
		} as const;
	}

	matchesPGNDeclaration(match: string): boolean {
		const matchArray = match.match(/^Teammate=(1|3)$/);
		if (matchArray) {
			this.teammate = Number(matchArray[1]);
			return true;
		} else {
			return false;
		}
	}

	serializeToParsingForm(): string {
		return `Teammate=${this.teammate}`;
	}

	isDisabled({ gameType }: VariantRuleAllowedChecks): boolean {
		return gameType !== VariantType.Teams;
	}

	getParametrizedOptions() {
		return new Map([
			["Red & Yellow v Blue & Green", 2],
			["Red & Blue v Yellow & Green", 1],
			["Red & Green v Blue & Yellow", 3]
		]);
	}

	initDecoratorSettings() {
		const teamSettings = this.decorator.gameType.teamSettings;
		if (this.teammate === 1) {
			teamSettings.firstTeamColors = [true, true, false, false];
			teamSettings.secondTeamColors = [false, false, true, true];
		} else if (this.teammate === 3) {
			teamSettings.firstTeamColors = [true, false, false, true];
			teamSettings.secondTeamColors = [false, true, true, false];
		}

		for (const decorator of this.wrappingDecorators) decorator.initDecoratorSettings?.();
	}
}
