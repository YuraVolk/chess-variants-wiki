import type { FENEffectSettings, PostMoveResults } from "../../../FENData/FENDataInterface";
import { VariantRule } from "../../VariantRule";
import type { VariantRuleHandler } from "../../VariantRuleInterface";
import { verifyInternalMove, MoveComponent } from "@moveGeneration/MoveTree/MoveTreeInterface";
import { FENData } from "@moveGeneration/FENData/FENData";

const tag = "threefoldRepetition";
export class ThreefoldRepetition extends VariantRule<typeof FENData, typeof tag> implements VariantRuleHandler<FENData> {
	static {
		VariantRule.initVariantRule(ThreefoldRepetition);
	}
	private totalRepetitionsRequired: number;

	constructor(totalRepetitions?: unknown) {
		super();
		if (typeof totalRepetitions === "number" && totalRepetitions > 0) {
			this.totalRepetitionsRequired = totalRepetitions;
		} else {
			this.totalRepetitionsRequired = 3;
		}
	}

	getDecoratorType() {
		return FENData;
	}

	getPublicProperties() {
		const isDisabled = this.totalRepetitionsRequired === Infinity;
		return {
			parameterValue: this.totalRepetitionsRequired,
			information: {
				name: "N-fold Repetition",
				textualForm: "",
				description: isDisabled
					? "3-fold repetition disabled"
					: `After position repeats ${this.totalRepetitionsRequired} times game is over`,
				tag
			}
		} as const;
	}

	matchesPGNDeclaration(match: string) {
		const matchArray = match.match(/^ThreefoldRepetition=((?:\d+)|(?:Infinity))$/i);
		if (matchArray) {
			this.totalRepetitionsRequired = Number(matchArray[1]);
			return true;
		} else {
			return false;
		}
	}

	serializeToParsingForm(): string {
		return `ThreefoldRepetition=${this.totalRepetitionsRequired}`;
	}

	isDisabled(): boolean {
		return false;
	}

	getParametrizedOptions() {
		const options = new Map<string, number>();
		for (const value of [3, 2, 5]) options.set(`${value}-fold`, value);
		options.set("Unlimited", Infinity);
		return options;
	}

	affectOptions(move: MoveComponent, settings: FENEffectSettings): PostMoveResults {
		const results = this.callHandler("affectOptions", arguments);
		if (!settings.ignoreNextTurn && !verifyInternalMove(move) && !settings.ignoreCheckmateChecks) {
			const repetitions = this.decorator.board.moves.getHash(
				this.decorator.board.moves.constructPreliminaryHashString(this.decorator.board)
			);
			if (repetitions + 1 >= this.totalRepetitionsRequired) {
				this.decorator.assignGeneralTermination("Threefold Repetition");
				this.decorator.spreadPointsBetweenPlayersEvenly();
			}
		}

		return results;
	}
}
