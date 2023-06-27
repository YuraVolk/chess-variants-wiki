import { throwOnNever } from "@client/ts/baseTypes";
import { FENData } from "../../../FENData/FENData";
import { InternalMove, InternalMoveSignature } from "../../../MoveTree/MoveTreeInterface";
import { VariantRule } from "../../VariantRule";
import { variantRuleColors, VariantRuleHandler } from "../../VariantRuleInterface";
import { chessGlyphIndex } from "@client/fonts/chessGlyphIndex";

const tag = "stalemateOptions";
export const stalemateOptionsValues = {
	stalemateLoses: "loss",
	stalemateWins: "win",
	stalemateDraws: "draw"
} as const;
export type CustomStalemateValue = (typeof stalemateOptionsValues)[keyof typeof stalemateOptionsValues];
export const verifyCustomStalemateValue = (v: string): v is CustomStalemateValue => Object.values<string>(stalemateOptionsValues).includes(v);

export class StalemateOptions extends VariantRule<typeof FENData, typeof tag> implements VariantRuleHandler<FENData> {
	static {
		VariantRule.initVariantRule(StalemateOptions);
	}
	private type: CustomStalemateValue | undefined;
	private isFFA = false;

	constructor(type?: unknown) {
		super();
		if (typeof type === "string" && verifyCustomStalemateValue(type)) {
			this.type = type;
		} else {
			this.type = undefined;
		}
	}

	getDecoratorType() {
		return FENData;
	}

	getPublicProperties() {
		const description =
			this.type === "draw"
				? `Stalemate is a draw`
				: this.isFFA
				? `The remaining players share the points`
				: `The stalemated player ${this.type === "loss" ? "loses" : "wins"}`;
		return {
			parameterValue: this.type,
			information: {
				name: "Stalemate",
				description,
				tag,
				color: variantRuleColors.minor,
				displayIcon: chessGlyphIndex.dollarSign
			}
		} as const;
	}

	matchesPGNDeclaration(match: string): boolean {
		const matchArray = match.toLowerCase().match(/^Stalemate=(.+)$/i);
		if (matchArray) {
			const presumedOption = matchArray[1];
			if (verifyCustomStalemateValue(presumedOption)) {
				this.type = presumedOption;
			}

			return true;
		} else {
			return false;
		}
	}

	serializeToParsingForm(): string {
		return `Stalemate=${this.type ?? "draw"}`;
	}

	isDisabled(): boolean {
		return false;
	}

	getParametrizedOptions() {
		return new Map<string, CustomStalemateValue>([
			["Draw", stalemateOptionsValues.stalemateDraws],
			["The stalemated player loses", stalemateOptionsValues.stalemateLoses],
			["The stalemated player wins", stalemateOptionsValues.stalemateWins]
		]);
	}

	initDecoratorSettings() {
		if (this.type === undefined) {
			if (this.decorator.board.gameType.isFFA() && this.decorator.fenOptions.tag("dead").filter(Boolean).length > 2) {
				this.type = "win";
				this.isFFA = true;
			} else {
				this.type = "draw";
				this.isFFA = false;
			}
		}

		for (const decorator of this.wrappingDecorators) decorator.initDecoratorSettings?.();
	}

	processInternalMove(internalMove: InternalMove): { stalemates: [boolean, boolean, boolean, boolean] } {
		const currentTurn = this.decorator.sideToMove;
		const returnValues = this.callHandler("processInternalMove", arguments);
		if (internalMove.type === InternalMoveSignature.Stalemate) {
			const pointsForMate = this.decorator.obtainPointsForMate();
			switch (this.type) {
				case "loss":
					if (!this.isFFA) {
						this.decorator.points[currentTurn] += pointsForMate;
						break;
					}
				// * Fallthrough
				case "draw":
					this.injectIntoBaseClass(function (this: FENData) {
						this.spreadPointsBetweenPlayersEvenly();
					})();
					break;
				case "win":
					this.decorator.points[this.decorator.sideToMove] += pointsForMate;
					break;
				case undefined:
					break;
				default:
					throwOnNever(this.type);
			}

			if (this.decorator.getRealPlayers() === 1) {
				this.decorator.assignGeneralTermination("Stalemate", currentTurn);
			}
		}

		return returnValues;
	}
}
