import { VariantType } from "@moveGeneration/GameInformation/GameData";
import { FENData } from "../../../FENData/FENData";
import { VariantRule } from "../../VariantRule";
import type { VariantRuleAllowedChecks, VariantRuleHandler } from "../../VariantRuleInterface";

const tag = "pointsForMate";
export class PointsForMate extends VariantRule<typeof FENData, typeof tag> implements VariantRuleHandler<FENData> {
	static {
		VariantRule.initVariantRule(PointsForMate);
	}
	private pointsForMate: number;
	constructor(pointsForMate?: unknown) {
		super();
		if (typeof pointsForMate === "number") {
			this.pointsForMate = pointsForMate;
		} else {
			this.pointsForMate = 20;
		}
	}

	getDecoratorType() {
		return FENData;
	}

	getPublicProperties() {
		return {
			parameterValue: this.pointsForMate,
			information: {
				name: `Points for Mate`,
				textualForm: `+${this.pointsForMate}`,
				description: `Checkmates & king captures are worth ${this.pointsForMate} points`,
				tag
			}
		} as const;
	}

	matchesPGNDeclaration(match: string) {
		const matchArray = match.match(/^PointsForMate=(3|5|10|40)$/i);
		if (matchArray) {
			this.pointsForMate = Number(matchArray[1]);
			return true;
		} else {
			return false;
		}
	}

	serializeToParsingForm(): string {
		return `PointsForMate=${this.pointsForMate}`;
	}

	isDisabled({ variantDataRules, gameType }: VariantRuleAllowedChecks): boolean {
		return variantDataRules.giveaway || variantDataRules.playForMate || gameType === VariantType.Teams;
	}

	getParametrizedOptions() {
		const options = new Map<string, number>();
		for (const value of [20, 3, 5, 10, 40]) options.set(`+${value}`, value);
		return options;
	}

	obtainPointsForMate() {
		return this.pointsForMate;
	}
}
