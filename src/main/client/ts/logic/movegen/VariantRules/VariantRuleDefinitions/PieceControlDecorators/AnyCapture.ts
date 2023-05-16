import { createTuple } from "../../../../../baseTypes";
import { totalPlayers } from "../../../GameInformation/GameData";
import { PieceControl } from "../../../PieceControl/PieceControl";
import type { ControlConfiguration } from "@moveGeneration/PieceControl/PieceControlInterface";
import { VariantRule } from "../../VariantRule";
import { variantRuleColors, VariantRuleHandler } from "../../VariantRuleInterface";
import { chessGlyphIndex } from "@client/fonts/chessGlyphIndex";

const tag = "anyCapture";
export class AnyCapture extends VariantRule<typeof PieceControl, typeof tag> implements VariantRuleHandler<PieceControl> {
	static {
		VariantRule.initVariantRule(AnyCapture);
	}

	getDecoratorType() {
		return PieceControl;
	}

	getPublicProperties() {
		return {
			parameterValue: true,
			information: {
				name: "Any Capture",
				description: "You can capture your own pieces",
				tag,
				color: variantRuleColors.autogenous,
				displayIcon: chessGlyphIndex.captureAnything
			}
		} as const;
	}

	matchesPGNDeclaration(match: string): boolean {
		return /^AnyCapture$/i.test(match);
	}

	serializeToParsingForm(): string {
		return "AnyCapture";
	}

	isDisabled(): boolean {
		return false;
	}

	configure(configuration: Required<ControlConfiguration>) {
		const modifiedConfiguration: Required<ControlConfiguration> = {
			...configuration,
			immunePieces: createTuple(false, totalPlayers)
		};

		for (const decorator of this.wrappingDecorators) {
			if (decorator.configure) return decorator.configure(modifiedConfiguration);
		}
		return PieceControl.prototype.configure.call(this.decorator, modifiedConfiguration);
	}
}
