import { Board } from "@moveGeneration/Board/Board";
import type { PostMoveResults } from "../../../FENData/FENDataInterface";
import { VariantRule } from "../../VariantRule";
import type { VariantRuleHandler } from "../../VariantRuleInterface";
import { verifyInternalMove, Move } from "@moveGeneration/MoveTree/MoveTreeInterface";

const tag = "threefoldRepetition";
export class ThreefoldRepetition extends VariantRule<typeof Board, typeof tag> implements VariantRuleHandler<Board> {
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
		return Board;
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

	makeMove(move: Move, ignoreNextMoves = false): PostMoveResults {
		const results = this.callHandler("makeMove", arguments);
		if (!verifyInternalMove(move[0]) && !ignoreNextMoves) {
			const repetitions = this.decorator.moves.getHash(this.decorator.moves.constructPreliminaryHashString(this.decorator));
			if (repetitions >= this.totalRepetitionsRequired) {
				this.decorator.data.assignGeneralTermination("Threefold Repetition");
				this.decorator.data.spreadPointsBetweenPlayersEvenly();
			}
		}
		
		return results;
	}
}
