import { createBaseParsingTypes, parseVariantRules, VariantRuleParsingTypes } from "@moveGeneration/VariantRules/VariantRuleSetup";
import type { VariantTag } from "../TagInterface";
import { tagNamesEqual, unwrapTag, wrapTag } from "../Utils";

const variantRulesTag = "RuleVariants";
export const createVariantRulesTag = (): VariantTag<VariantRuleParsingTypes> => ({
	tag: "variantRules",
	currentValue: createBaseParsingTypes(),
	verifyTagInParsing(inputTag) {
		return tagNamesEqual(inputTag, variantRulesTag);
	},
	parseTag(tagContents) {
		return parseVariantRules(unwrapTag(tagContents, variantRulesTag));
	},
	serialize(board) {
		const resultingRuleList: string[] = [];
		for (const rule of board.variantRules) {
			const serializedForm = rule.serializeToParsingForm();
			if (serializedForm) {
				resultingRuleList.push(serializedForm);
			}
		}

		return wrapTag(variantRulesTag, resultingRuleList.join(" "));
	}
});
