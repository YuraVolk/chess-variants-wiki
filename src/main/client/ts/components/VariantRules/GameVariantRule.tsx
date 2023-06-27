import React, { Fragment } from "react";
import styles from "./GameVariantRules.module.scss";
import type { PieceLetter } from "@moveGeneration/PieceControl/PieceControlInterface";
import { createHexColor, wrapIndexedColor } from "@client/ts/interfaces/Colors";
import { createPieceFromData, deadColorIndex } from "@moveGeneration/GameInformation/GameUnits/PieceString";
import { PieceImage } from "../BoardComponents/GameDisplay/GameDisplayPiece";
import type { VariantRuleInformation, VariantDataRules } from "@moveGeneration/VariantRules/VariantRuleInterface";
import { convertCamelCaseToKebabCase, formatOrdinalNumber } from "@utils/StringFormatUtils";
import { assertNonUndefined } from "@client/ts/baseTypes";

interface GameVariantRuleProps {
	information: VariantRuleInformation<keyof VariantDataRules>;
	specialTag?: SpecialTag;
}
export const enum SpecialTag {
	NoEnPassant = "noEnPassant",
	NoZombies = "noZombies"
}

export const tooltipID = "variantRuleTooltip";

const convertToCSScase = (tag: keyof VariantDataRules | SpecialTag) => `variant-rule--${convertCamelCaseToKebabCase(tag)}`;
const verifyVariantRuleStylesString = (str: string): str is keyof typeof styles => str in styles;

export const GameVariantRule = (props: GameVariantRuleProps) => {
	const { description, textualForm, tag, color, displayIcon } = props.information;
	if (textualForm === undefined) {
		assertNonUndefined(color);
		const extraClassName = convertToCSScase(tag);
		const extraClass = verifyVariantRuleStylesString(extraClassName) ? ` ${extraClassName}` : "";
		return (
			<span
				data-tooltip-id={tooltipID}
				data-tooltip-content={description}
				className={styles["variant-rule"] + extraClass}
				data-content={displayIcon}
				style={{ color: wrapIndexedColor(color) }}></span>
		);
	} else {
		return (
			<span
				data-tooltip-id={tooltipID}
				data-tooltip-content={description}
				className={`${styles["variant-rule"]} ${styles["variant-rule--textual-rule"]}`}>
				{textualForm}
			</span>
		);
	}
};

export interface GamePromotionRuleProps {
	promotionRank: {
		rank: number;
		description: string;
	};
	promotionPieces: {
		pieces: PieceLetter[];
		description: string;
	};
}
export const GamePromotionRule = (props: GamePromotionRuleProps) => {
	return (
		<span
			className={`${styles["variant-rule"]} ${styles["variant-rule--promotion-wrap"]}`}
			data-tooltip-id={tooltipID}
			data-tooltip-content={`${props.promotionPieces.description} ${props.promotionRank.description}`}>
			<span className={styles["variant-rule--textual-rule"]}>{`${formatOrdinalNumber(props.promotionRank.rank)}=`}</span>
			<span className={`${styles["variant-rule--promotion"]}`}>
				{props.promotionPieces.pieces.map((letter) => {
					return (
						<Fragment key={letter}>
							<PieceImage
								pieceString={createPieceFromData(deadColorIndex, letter)}
								configuration={{
									size: "22px",
									customColor: createHexColor("#FF8C00"),
									className: styles["variant-rule--promotion__promotion-piece"]
								}}
							/>
						</Fragment>
					);
				})}
			</span>
		</span>
	);
};

export const GameStonewallRule = (props: { description: string }) => {
	return (
		<span
			className={`${styles["variant-rule"]} ${styles["variant-rule--stonewall"]}`}
			data-tooltip-id={tooltipID}
			data-tooltip-content={props.description}>
			<PieceImage
				pieceString={createPieceFromData(deadColorIndex, "R")}
				configuration={{
					size: "22px"
				}}
				renderWithStonewall
			/>
		</span>
	);
};
