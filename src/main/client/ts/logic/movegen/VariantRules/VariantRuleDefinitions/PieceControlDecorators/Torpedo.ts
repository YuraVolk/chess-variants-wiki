import type { ControlConfiguration } from "@moveGeneration/PieceControl/PieceControlInterface";
import { PieceControl } from "../../../PieceControl/PieceControl";
import { VariantRule } from "../../VariantRule";
import { variantRuleColors, VariantRuleHandler } from "../../VariantRuleInterface";
import { chessGlyphIndex } from "@client/fonts/chessGlyphIndex";

const tag = "torpedo";
export class Torpedo extends VariantRule<typeof PieceControl, typeof tag> implements VariantRuleHandler<PieceControl> {
	static {
		VariantRule.initVariantRule(Torpedo);
	}

	getDecoratorType() {
		return PieceControl;
	}

	getPublicProperties() {
		return {
			parameterValue: true,
			information: {
				name: "Torpedo",
				description: "Pawns can always jump two squares",
				tag,
				color: variantRuleColors.autogenous,
				displayIcon: chessGlyphIndex.torpedo
			}
		} as const;
	}

	matchesPGNDeclaration(match: string): boolean {
		return /^Torpedo$/i.test(match);
	}

	serializeToParsingForm(): string {
		return "Torpedo";
	}

	isDisabled(): boolean {
		return false;
	}

	configure(configuration: ControlConfiguration) {
		const modifiedConfiguration: ControlConfiguration = {
			...configuration,
			baseRank: true
		};

		for (const decorator of this.wrappingDecorators) {
			if (decorator.configure) return decorator.configure(modifiedConfiguration);
		}
		PieceControl.prototype.configure.call(this.decorator, modifiedConfiguration);
	}
}
