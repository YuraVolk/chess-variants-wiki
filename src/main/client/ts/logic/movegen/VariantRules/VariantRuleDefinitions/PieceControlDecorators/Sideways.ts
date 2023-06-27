import { AttackType } from "@moveGeneration/PieceControl/PieceControlInterface";
import { PieceControl } from "../../../PieceControl/PieceControl";
import { VariantRule } from "../../VariantRule";
import { variantRuleColors, VariantRuleHandler } from "../../VariantRuleInterface";
import { chessGlyphIndex } from "@client/fonts/chessGlyphIndex";

const tag = "sideways";
export class Sideways extends VariantRule<typeof PieceControl, typeof tag> implements VariantRuleHandler<PieceControl> {
	static {
		VariantRule.initVariantRule(Sideways);
	}

	getDecoratorType() {
		return PieceControl;
	}

	getPublicProperties() {
		return {
			parameterValue: true,
			information: {
				name: "Sideways",
				description: "Pawns can also move one square sideways",
				tag,
				color: variantRuleColors.autogenous,
				displayIcon: chessGlyphIndex.pawnSideways
			}
		} as const;
	}

	matchesPGNDeclaration(match: string): boolean {
		return /^Sideways$/i.test(match);
	}

	serializeToParsingForm(): string {
		return "Sideways";
	}

	isDisabled(): boolean {
		return false;
	}

	getPossibleCells() {
		if (this.decorator.hooks.usePawnLogic) {
			this.injectIntoBaseClass(function (this: PieceControl) {
				this.generateJumpAttack({ displacement: [0, -1], special: AttackType.MoveOnly });
				this.generateJumpAttack({ displacement: [0, 1], special: AttackType.MoveOnly });
			})();
		}

		for (const decorator of this.wrappingDecorators) {
			if (decorator.getPossibleCells) return decorator.getPossibleCells();
		}
		
		const prototype = Object.getPrototypeOf(this.decorator) as PieceControl;
		prototype.getPossibleCells.call(this.decorator);
	}
}
