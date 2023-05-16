import { chessGlyphIndex } from "@client/fonts/chessGlyphIndex";
import { PieceControl } from "../../../PieceControl/PieceControl";
import { AttackType, PieceControlConfiguration } from "../../../PieceControl/PieceControlInterface";
import { VariantRule } from "../../VariantRule";
import { variantRuleColors, VariantRuleHandler } from "../../VariantRuleInterface";

const tag = "royalsCannotCapture";
export class RoyalsCannotCapture extends VariantRule<typeof PieceControl, typeof tag> implements VariantRuleHandler<PieceControl> {
	getDecoratorType() {
		return PieceControl;
	}

	getPublicProperties() {
		return {
			parameterValue: true,
			information: {
				name: "Royals Cannot Capture",
				description: "Royal pieces cannot capture pieces.",
				tag,
				color: variantRuleColors.autogenous,
				displayIcon: chessGlyphIndex.handshake
			}
		} as const;
	}

	matchesPGNDeclaration(): boolean {
		return false;
	}

	serializeToParsingForm(): string {
		return "";
	}

	isDisabled(): boolean {
		return false;
	}

	getMovePossibility(configuration: PieceControlConfiguration): boolean {
		const royal = this.decorator.fenData.fenOptions.tag("royal")[this.decorator.color];
		if (royal && royal[0] === this.decorator.i && royal[1] === this.decorator.j) {
			configuration.special = AttackType.MoveOnly;
		}

		for (const decorator of this.wrappingDecorators) {
			if (decorator.getMovePossibility) return decorator.getMovePossibility(configuration);
		}
		return PieceControl.prototype.getMovePossibility.call(this.decorator, configuration);
	}
}
