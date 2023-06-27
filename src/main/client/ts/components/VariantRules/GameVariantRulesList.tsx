import { selectGameBoard, selectGameBoardRules, selectGameBoardType, selectGameBoardVariantData } from "@client/ts/logic/index/GameBoardSlice";
import type { RootState } from "@client/ts/redux/store";
import { VariantType } from "@moveGeneration/GameInformation/GameData";
import type { StripPieceStringObjects } from "@moveGeneration/MoveTree/MoveTreeInterface";
import type { VariantRulePublicProperties } from "@moveGeneration/VariantRules/VariantRule";
import { VariantDataRules, variantRuleColors, VariantRuleInformation } from "@moveGeneration/VariantRules/VariantRuleInterface";
import React, { Fragment, useContext } from "react";
import { useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";
import { GameDisplayContext } from "../BoardComponents/BoardContext";
import { GamePromotionRule, GamePromotionRuleProps, GameVariantRule, GameStonewallRule, SpecialTag, tooltipID } from "./GameVariantRule";
import styles from "./GameVariantRules.module.scss";
import { chessGlyphIndex } from "@client/fonts/chessGlyphIndex";

export const verifyParameterValue = <K extends keyof VariantDataRules>(
	parameterValue: unknown,
	properties: VariantRuleInformation<keyof VariantDataRules>,
	tag: K
): parameterValue is Exclude<VariantDataRules[K], false> => properties.tag === tag;

export const GameMetadataRules = () => {
	const id = useContext(GameDisplayContext).id;
	const variantData = useSelector<RootState, StripPieceStringObjects<VariantDataRules>>((state) => selectGameBoardVariantData(state, id));
	const variantRules = useSelector<RootState, Array<VariantRulePublicProperties<keyof VariantDataRules>>>((state) =>
		selectGameBoardRules(state, id)
	);
	const initiallyAlivePlayers = useSelector<RootState, number>(
		(state) => selectGameBoard(state, id).initiallyAliveColors.filter(Boolean).length
	);
	const variantType = useSelector<RootState, VariantType>((state) => selectGameBoardType(state, id));

	const promotionInfo: Partial<GamePromotionRuleProps> = {};
	let isPromotionSet = false;

	const resultingList = variantRules.map((variantRulePublicProperties) => {
		const { parameterValue, information } = variantRulePublicProperties;
		let isSimpleRule = true;

		if (information.tag === "enPassant") {
			return null;
		} else if (verifyParameterValue(parameterValue, information, "stalemateOptions")) {
			if (
				(parameterValue === "draw" && (variantType === VariantType.Teams || initiallyAlivePlayers === 2)) ||
				(parameterValue === "win" && initiallyAlivePlayers > 2)
			) {
				return null;
			}
		} else if (verifyParameterValue(parameterValue, information, "promotionRank")) {
			promotionInfo.promotionRank = { rank: parameterValue, description: information.description };
			isSimpleRule = false;
		} else if (verifyParameterValue(parameterValue, information, "promotionPieces")) {
			promotionInfo.promotionPieces = { pieces: parameterValue, description: information.description };
			isSimpleRule = false;
		} else if (information.tag === "stonewall") {
			return (
				<Fragment key={information.tag}>
					<GameStonewallRule description={information.description} />
				</Fragment>
			);
		}

		if (!isPromotionSet && promotionInfo.promotionPieces && promotionInfo.promotionRank) {
			isPromotionSet = true;
			return (
				<Fragment key={"promotion"}>
					<GamePromotionRule promotionPieces={promotionInfo.promotionPieces} promotionRank={promotionInfo.promotionRank} />
				</Fragment>
			);
		} else if (isSimpleRule) {
			if (information.textualForm === "") return null;
			return (
				<Fragment key={information.tag}>
					<GameVariantRule information={information} />
				</Fragment>
			);
		}
	});

	if (!variantData.enPassant) {
		resultingList.push(
			<Fragment key={"noEnPassant"}>
				<GameVariantRule
					information={
						{
							name: "No En Passant",
							description: "Pawns cannot capture en passant",
							tag: "enPassant",
							color: variantRuleColors.minor,
							displayIcon: chessGlyphIndex.pawnConnection
						} as const
					}
					specialTag={SpecialTag.NoEnPassant}
				/>
			</Fragment>
		);
	}

	return (
		<div className={styles["variant-rules"]}>
			{resultingList}
			<Tooltip id={tooltipID} place="top" className={styles["variant-rule-tooltip"]} />
		</div>
	);
};
