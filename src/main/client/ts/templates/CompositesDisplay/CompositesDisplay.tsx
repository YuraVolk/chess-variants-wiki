import React from "react";
import styles from "./CompositesDisplay.module.scss";
import { addTemplate } from "../TemplateInterface";
import { VariantRule } from "@moveGeneration/VariantRules/VariantRule";
import type { VariantDataRules, VariantRuleInformation } from "@moveGeneration/VariantRules/VariantRuleInterface";
import { verifyObjectType } from "@utils/ObjectUtils";
import { assertNonUndefined } from "@client/ts/baseTypes";
import { GameVariantRule } from "@components/VariantRules/GameVariantRule";
import { createHexColor } from "@client/ts/interfaces/Colors";

const variantRuleTags = new Set<string>(VariantRule.variantRuleList.map((rv) => new rv().getPublicProperties().information.tag));
const variantRuleData = VariantRule.variantRuleList
	.map((rv) => new rv().getPublicProperties())
	.reduce<Partial<Record<keyof VariantDataRules, VariantRuleInformation<keyof VariantDataRules>>>>((p, n) => {
		return {
			...p,
			[n.information.tag]: n.information
		};
	}, {});

const verifyVariantDataRulesKey = (k: string): k is keyof VariantDataRules => variantRuleTags.has(k);
function verifyCompositesDisplayValues(options: unknown): options is Record<keyof VariantDataRules, number> {
	if (!verifyObjectType(options)) return false;
	for (const key in options) {
		if (!Object.prototype.hasOwnProperty.call(options, key)) continue;
		if (!verifyVariantDataRulesKey(key) || typeof options[key] !== "number") return false;
	}

	return true;
}

const blackColor = createHexColor("#222");
const CompositesDisplay = (props: { composites: string }) => {
	const tagDisplays: unknown = JSON.parse(props.composites);
	if (!verifyCompositesDisplayValues(tagDisplays)) return null;
	const resultingOptions: JSX.Element[] = [];

	let key: keyof VariantDataRules;
	for (key in tagDisplays) {
		if (!Object.prototype.hasOwnProperty.call(tagDisplays, key)) continue;
		const ruleInformation = variantRuleData[key];
		assertNonUndefined(ruleInformation);

		const newInformation = { ...ruleInformation };
		if (newInformation.color) newInformation.color = blackColor;
		resultingOptions.push(
			<div className={styles["display-item"]} key={newInformation.tag}>
				<span className={styles["display-item__variant-rule"]}>
					<GameVariantRule information={newInformation} />
				</span>
				<span className={styles["display-item__text"]}>{`${tagDisplays[key]}%`}</span>
			</div>
		);
	}

	return <div className={styles.display}>{resultingOptions}</div>;
};

export default addTemplate("composites-display", CompositesDisplay);
