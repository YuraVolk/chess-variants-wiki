import { FENData } from "../../../FENData/FENData";
import { getOppositePlacedColor, totalPlayers, VariantType } from "../../../GameInformation/GameData";
import type { PieceString } from "../../../GameInformation/GameUnits/PieceString";
import { pieceControlConfigSettings } from "../../../PieceControl/PieceControlInterface";
import { VariantRule } from "../../VariantRule";
import type { VariantRuleAllowedChecks, VariantRuleHandler } from "../../VariantRuleInterface";

const tag = "oppositeMultiplier";

export class OppositeMultiplier extends VariantRule<typeof FENData, typeof tag> implements VariantRuleHandler<FENData> {
	private static readonly MAXIMUM_MULTIPLIER = 6;
	static {
		VariantRule.initVariantRule(OppositeMultiplier);
	}
	private oppositeMultiplierValue = 2;

	getDecoratorType() {
		return FENData;
	}

	getPublicProperties() {
		return {
			parameterValue: this.oppositeMultiplierValue,
			information: {
				name: "Opposite's piece value",
				textualForm: `Ox${this.oppositeMultiplierValue}`,
				description: `Opposite's pieces are worth ${this.oppositeMultiplierValue} times their normal points value until one player is eliminated`,
				tag
			}
		} as const;
	}

	matchesPGNDeclaration(match: string): boolean {
		const matchArray = match.toLowerCase().match(/^OppX=(\d)$/i);
		if (matchArray) {
			const numericValue = Number(matchArray[1]);
			if (numericValue <= 0 || numericValue > OppositeMultiplier.MAXIMUM_MULTIPLIER) return false;
			this.oppositeMultiplierValue = numericValue;
			return true;
		} else {
			return false;
		}
	}

	serializeToParsingForm(): string {
		return `OppX=${this.oppositeMultiplierValue}`;
	}

	isDisabled({ variantDataRules, gameType, fenTags }: VariantRuleAllowedChecks): boolean {
		return (
			gameType === VariantType.Teams ||
			variantDataRules.giveaway ||
			fenTags.dead.value.reduce((p, n, i) => p + Number(n || fenTags.resigned.value[i]), 0) <= totalPlayers - 1
		);
	}

	getParametrizedOptions() {
		const options = new Map<string, number | false>([["Ox Off", false]]);
		for (let i = 1; i <= OppositeMultiplier.MAXIMUM_MULTIPLIER; i++) options.set(`Ox${i}`, i);
		return options;
	}

	getPointsForPiece(pieceString: PieceString): number {
		const dead = this.decorator.fenOptions.tag("dead"),
			resigned = this.decorator.fenOptions.tag("resigned");
		const aliveColors = dead.map((d, i) => d || resigned[i]).filter(Boolean).length;
		if (aliveColors === totalPlayers && pieceString.isPiece() && pieceString.color === getOppositePlacedColor(this.decorator.sideToMove)) {
			return pieceControlConfigSettings[pieceString.piece].points.singlesPoints * this.oppositeMultiplierValue;
		} else return this.callHandler("getPointsForPiece", arguments);
	}
}
