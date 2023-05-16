import { PieceThemeContextInterface, UserContext } from "@client/ts/services/PersistedStorage/PieceThemeContext";
import React, { useCallback, useContext, useState } from "react";
import { createHexColor, IndexedColor, validateIndexedColor, wrapIndexedColor } from "../../interfaces/Colors";
import styles from "./PercentageDisplay.module.scss";
import { verifyObjectType, verifyPropertiesInObject } from "@utils/ObjectUtils";
import { colors, getPlayerNameFromColor, TimeControlType } from "@moveGeneration/GameInformation/GameData";
import { addTemplate } from "../TemplateInterface";

interface PercentageDisplayOption {
	name: string;
	color: IndexedColor;
	value: number | null;
}

const defaultPlayerNames = colors.map((c) => getPlayerNameFromColor(c));
const defaultDrawNames = [
	"RB Ties",
	"RY Ties",
	"RG Ties",
	"BY Ties",
	"BG Ties",
	"YG Ties",
	"RBY Ties",
	"RBG Ties",
	"RYG Ties",
	"BYG Ties",
	"Four-Way Ties"
];
const drawColors = ["#d3d3d3", "#6a6a6a", "#bebebe", "#545454", "#a9a9a9", "#7f7f7f", "#949494", "#c0c0c0", "#a7a7a7", "#dadada", "#3f3f3f"].map(
	(c) => createHexColor(c)
);

function verifyPercentageDisplayOption(value: unknown): value is PercentageDisplayOption {
	if (!verifyObjectType(value) || !verifyPropertiesInObject(value, ["name", "color", "value"])) return false;
	if (typeof value.color !== "string" || !validateIndexedColor(value.color) || (typeof value.value !== "number" && value.value !== null))
		return false;
	return true;
}

function getDefaultColorsAndNames(values: Array<number | null>, context: PieceThemeContextInterface): PercentageDisplayOption[] {
	const contextPieceColors = [...context.colors.pieceColors.slice(0, -1), ...context.colors.drawColor, ...context.colors.abortsColor];
	const timeControlColors = [
		context.timeControlColors.hyperbullet,
		context.timeControlColors.bullet,
		context.timeControlColors.blitz,
		context.timeControlColors.rapid
	];

	switch (values.length) {
		case contextPieceColors.length:
			return [...defaultPlayerNames, "Draws", "Aborts"].map((name, i) => ({
				name,
				color: contextPieceColors[i],
				value: values[i]
			}));
		case timeControlColors.length:
			return Object.values(TimeControlType).map((name, i) => ({
				name,
				color: timeControlColors[i],
				value: values[i]
			}));
		default:
			return defaultDrawNames.map((name, i) => ({
				name,
				color: drawColors[i],
				value: values.length <= i ? null : values[i]
			}));
	}
}

function obtainDisplayOptions(options: string, context: PieceThemeContextInterface): PercentageDisplayOption[] {
	const resultingOptions: PercentageDisplayOption[] = [],
		inputOptions = options.split(","),
		values: Array<number | null> = [];
	for (const option of inputOptions) {
		try {
			const displayOption: unknown = JSON.parse(option);
			if (!verifyPercentageDisplayOption(displayOption)) {
				if (verifyObjectType(displayOption) && verifyPropertiesInObject(displayOption, ["value"])) {
					const value = displayOption.value;
					if (typeof value === "number" || value === null) values.push(value);
				}
			} else {
				values.push(displayOption.value);
				resultingOptions.push(displayOption);
			}
		} catch {
			resultingOptions.length = 0;
			break;
		}
	}

	if (resultingOptions.length === 0) {
		return getDefaultColorsAndNames(values, context);
	} else return resultingOptions;
}

const PercentageDisplay = (props: { options: string }) => {
	const context = useContext(UserContext);
	const values = obtainDisplayOptions(props.options, context);
	const sum = values.reduce((p, n) => p + (n.value ?? 0), 0);
	const percentages = values.map((v) => Number.parseFloat((((v.value ?? 0) / sum) * 100).toFixed(1)));
	const checked = values.map((v) => v.value !== null);

	const [selected, setSelected] = useState({
		checked: checked.slice(),
		transitions: Array.from<string>({ length: values.length }).fill("visible"),
		percentages
	});

	const handleOnCheck = useCallback(
		(i: number) => {
			const newValues = { ...selected };
			newValues.checked[i] = !newValues.checked[i];
			if (!newValues.checked[i]) newValues.transitions[i] = "hidden";
			const filtered = newValues.checked.map((c, i) => (c ? values[i].value ?? 0 : 0));
			const sum = filtered.reduce((p, n) => p + n, 0);
			const percentages = filtered.map((v) => Number.parseFloat(((v / sum) * 100).toFixed(1)));

			newValues.percentages = percentages;

			setSelected(newValues);
		},
		[selected, values]
	);

	return (
		<div>
			<div className={styles.sections}>
				{values.map((v, i) => (
					<div
						className={`${styles.section} ${selected.checked[i] ? "" : styles["section--unchecked"]}`}
						key={v.name + String(v.value)}
						style={{
							flexBasis: `${selected.percentages[i]}%`,
							backgroundColor: wrapIndexedColor(values[i].color)
						}}>
						<span className={styles.section__tooltip}>{`${values[i].name}: ${values[i].value ?? 0}`}</span>
						<span className={styles.section__text}>{`${selected.percentages[i]}%`}</span>
					</div>
				))}
			</div>
			<ul className={styles["checkbox-list"]}>
				{values.map((v, i) => (
					<li className={styles["checkbox-wrap"]} key={v.name + String(v.value)}>
						<span
							onClick={() => handleOnCheck(i)}
							style={{ borderColor: wrapIndexedColor(values[i].color) }}
							className={`${styles["fake-checkbox-label"]} ${
								values[i].value === null ? styles["fake-checkbox-label--disabled"] : ""
							}`}>
							<span className={`${styles.checkbox} ${selected.checked[i] ? styles["checkbox--checked"] : ""}`}></span>
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default addTemplate("percentage-display", PercentageDisplay);
