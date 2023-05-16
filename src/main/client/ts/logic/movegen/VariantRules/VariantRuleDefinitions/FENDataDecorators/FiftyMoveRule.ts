import { FENData } from "../../../FENData/FENData";
import type { PostMoveResults } from "../../../FENData/FENDataInterface";
import { totalPlayers } from "../../../GameInformation/GameData";
import type { PieceString } from "../../../GameInformation/GameUnits/PieceString";
import type { MoveComponent, MoveData } from "../../../MoveTree/MoveTreeInterface";
import { VariantRule } from "../../VariantRule";
import type { VariantRuleHandler } from "../../VariantRuleInterface";

const tag = "fiftyMoveRule";
export class FiftyMoveRule extends VariantRule<typeof FENData, typeof tag> implements VariantRuleHandler<FENData> {
	static {
		VariantRule.initVariantRule(FiftyMoveRule);
	}
	private totalFullMoves: number;

	constructor(fullMoves?: unknown) {
		super();
		if (typeof fullMoves === "number" && fullMoves > 0) {
			this.totalFullMoves = fullMoves;
		} else {
			this.totalFullMoves = 50;
		}
	}

	getDecoratorType() {
		return FENData;
	}

	getPublicProperties() {
		const isDisabled = this.totalFullMoves === Infinity;
		return {
			parameterValue: this.totalFullMoves,
			information: {
				name: "N Move Rule",
				textualForm: "",
				description: isDisabled
					? "50 move rule disabled"
					: `After ${this.totalFullMoves} full moves without captures or pawn pushes game is over`,
				tag
			}
		} as const;
	}

	matchesPGNDeclaration(match: string) {
		const matchArray = match.match(/^FiftyMoveRule=((?:\d+)|(?:Infinity))$/i);
		if (matchArray) {
			this.totalFullMoves = Number(matchArray[1]);
			return true;
		} else {
			return false;
		}
	}

	serializeToParsingForm(): string {
		return `FiftyMoveRule=${this.totalFullMoves}`;
	}

	isDisabled(): boolean {
		return false;
	}

	getParametrizedOptions() {
		const options = new Map<string, number>();
		for (const value of [50, 150, 200, 25, 10]) options.set(`${value} Move rule`, value);
		options.set("Unlimited", Infinity);
		return options;
	}

	processStandardMove(moveData: MoveData): { endPiece: PieceString[] } {
		if (this.decorator.getCapturedPieces(moveData).length > 0) {
			this.decorator.plyCount = 0;
		}

		return this.callHandler("processStandardMove", arguments);
	}

	affectOptions(move: MoveComponent): PostMoveResults {
		const results = this.callHandler("affectOptions", arguments);
		if (move.isIrreversible) {
			this.decorator.plyCount = 0;
		} else {
			this.decorator.plyCount++;
		}

		const alivePlayers = totalPlayers - this.decorator.fenOptions.tag("dead").filter(Boolean).length;
		if (alivePlayers > 0 && Math.floor(this.decorator.plyCount / alivePlayers) > this.totalFullMoves) {
			this.decorator.assignGeneralTermination("50-move Rule");
			this.injectIntoBaseClass(function (this: FENData) {
				this.spreadPointsBetweenPlayersEvenly();
			})();
		}

		return results;
	}
}
