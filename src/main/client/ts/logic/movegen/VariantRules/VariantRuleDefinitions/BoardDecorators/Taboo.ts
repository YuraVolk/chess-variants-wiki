import type { MoveData } from "../../../MoveTree/MoveTreeInterface";
import { Board } from "../../../Board/Board";
import { colors } from "../../../GameInformation/GameData";
import { VariantRule } from "../../VariantRule";
import { variantRuleColors, VariantRuleHandler } from "../../VariantRuleInterface";
import type { NumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { chessGlyphIndex } from "@client/fonts/chessGlyphIndex";

export interface Test {
	taboo: boolean | false;
}

const tag = "taboo";
export class Taboo extends VariantRule<typeof Board, typeof tag> implements VariantRuleHandler<Board> {
	static {
		VariantRule.initVariantRule(Taboo);
	}

	getDecoratorType() {
		return Board;
	}
	getPublicProperties() {
		return {
			parameterValue: true,
			information: {
				name: "Taboo",
				description: "Giving check is forbidden",
				tag,
				color: variantRuleColors.widespread,
				displayIcon: chessGlyphIndex.equal
			}
		} as const;
	}
	matchesPGNDeclaration(match: string): boolean {
		return /^Taboo$/i.test(match);
	}
	serializeToParsingForm(): string {
		return "Taboo";
	}
	isDisabled(): boolean {
		return false;
	}

	isSetupComplex(): boolean {
		return true;
	}

	isTheMoveLegal(_: NumericColor, moveData: MoveData): boolean {
		const initialDead = this.decorator.data.fenOptions.tag("dead").slice();
		const snapshot = this.decorator.createSnapshot();

		try {
			this.decorator.makeMove([moveData], true);
			const newDead = this.decorator.data.fenOptions.tag("dead").slice();

			for (const color of colors) {
				if ((!initialDead[color] && newDead[color]) || this.decorator.isKingInCheck(color)) return false;
			}

			return true;
		} finally {
			this.decorator.loadSnapshot(snapshot);
		}
	}
}
