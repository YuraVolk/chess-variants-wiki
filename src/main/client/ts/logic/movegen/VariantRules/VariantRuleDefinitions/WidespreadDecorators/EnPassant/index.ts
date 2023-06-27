import { Board } from "@moveGeneration/Board/Board";
import { VariantRule } from "@moveGeneration/VariantRules/VariantRule";
import type { AllowedSuperClasses } from "@moveGeneration/VariantRules/VariantRuleInterface";

const tag = "enPassant";
export abstract class EnPassant<T extends AllowedSuperClasses> extends VariantRule<T, typeof tag> {
	static readonly JUMP_DISTANCE = 2;
	isDisabled() {
		return false;
	}

	getPublicProperties() {
		return {
			parameterValue: true,
			information: {
				name: "En Passant",
				textualForm: "",
				description: "",
				tag
			}
		} as const;
	}

	matchesPGNDeclaration(match: string): boolean {
		return /^EnPassant$/i.test(match);
	}

	serializeToParsingForm(): string {
		if (this.getDecoratorType() === Board) {
			return "EnPassant";
		} else return "";
	}
}
