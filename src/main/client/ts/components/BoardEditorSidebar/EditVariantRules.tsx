import React, { useCallback, useContext, useId, useMemo, useState } from "react";
import styles from "./EditorSidebar.module.scss";
import type { AppDispatch, RootState } from "@client/ts/redux/store";
import { GameDisplayContext } from "@components/BoardComponents/BoardContext";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import type { StripPieceStringObjects } from "@moveGeneration/MoveTree/MoveTreeInterface";
import {
	AllowedHandlerClasses,
	AllowedSuperClasses,
	VariantDataRules,
	VariantRuleHandler,
	variantRuleColors
} from "@moveGeneration/VariantRules/VariantRuleInterface";
import {
	changeParametrizedVariantRule,
	selectEditorFENSettings,
	selectEditorVariantDataRules,
	selectEditorVariantType,
	toggleBooleanVariantRule
} from "@client/ts/redux/SidebarEditor/SidebarEditorSlice";
import { VariantRule, VariantRulePublicProperties } from "@moveGeneration/VariantRules/VariantRule";
import type { ExtractVariantRuleByType } from "@client/ts/redux/SidebarEditor/SidebarEditorInterface";
import { createSelector } from "@reduxjs/toolkit";
import { assertNonUndefined } from "@client/ts/baseTypes";
import type { VariantType } from "@moveGeneration/GameInformation/GameData";
import { FENOptions } from "@moveGeneration/FENData/FENData";
import type { FENOptionsTags } from "@moveGeneration/FENData/FENOptions/FENOptionsTagsInterface";
import { Tooltip } from "react-tooltip";
import { PromoteTo } from "@moveGeneration/VariantRules/VariantRuleDefinitions/PieceControlDecorators/PromoteTo";

const selectVariantRules = () =>
	createSelector([selectEditorVariantDataRules], (variantData) => {
		return VariantRule.variantRuleList.map((rv) => {
			const variantRule = new rv();
			return new rv(variantData[variantRule.getPublicProperties().information.tag]);
		});
	});
const selectFENOptionTags = () =>
	createSelector([selectEditorFENSettings], (fenSettings) => {
		return FENOptions.loadSerializedState(fenSettings.fenOptions);
	});
const selectPromotionPieces = () =>
	createSelector([selectEditorVariantDataRules], (variantData) => {
		const promotionPieces = variantData.promotionPieces || undefined;
		assertNonUndefined(promotionPieces);
		return promotionPieces.join("");
	});

interface VariantRuleGridItemsProps {
	ruleProperties: Array<VariantRulePublicProperties<ExtractVariantRuleByType<boolean>>>;
	rules: Array<VariantRule<AllowedSuperClasses, keyof VariantDataRules> & VariantRuleHandler<AllowedHandlerClasses>>;
	fenTags: FENOptionsTags;
}

const tooltipID = "variantRuleGridTooltip";
const VariantRuleGridItems = (props: VariantRuleGridItemsProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const { id } = useContext(GameDisplayContext);
	const variantData = useSelector<RootState, StripPieceStringObjects<VariantDataRules>>((state) => selectEditorVariantDataRules(state, id));
	const gameType = useSelector<RootState, VariantType>((state) => selectEditorVariantType(state, id));
	const { ruleProperties, rules, fenTags } = props;
	const toggleVariantRule = useCallback(
		(option: ExtractVariantRuleByType<boolean>) => {
			dispatch(toggleBooleanVariantRule({ id, option }));
		},
		[dispatch, id]
	);

	return (
		<div className={styles["variant-boolean-rules"]}>
			{ruleProperties.map(({ information }) => {
				const isEnabled = variantData[information.tag];
				const rule = rules.find((v) => v.getPublicProperties().information.tag === information.tag);
				assertNonUndefined(rule);
				const isNotAllowed = rule.isDisabled({ variantDataRules: variantData, gameType, fenTags });
				return (
					<div
						data-tooltip-id={tooltipID}
						data-tooltip-content={information.description}
						data-tooltip-position-strategy="fixed"
						key={`${information.tag}${Number(isEnabled)}${Number(isNotAllowed)}`}
						className={`${styles["variant-boolean-rule"]} ${
							isEnabled && !isNotAllowed ? styles["variant-boolean-rule--active"] : ""
						} ${isNotAllowed ? styles["variant-boolean-rule--not-allowed"] : ""}`}
						onClick={() => !isNotAllowed && toggleVariantRule(information.tag)}>
						<span className={styles["variant-boolean-rule__name"]}>{information.name}</span>
						<span className={styles["variant-boolean-rule__icon"]}>{information.displayIcon}</span>
					</div>
				);
			})}
			<Tooltip id={tooltipID} place="top" className={styles["variant-boolean-rules__tooltip"]} />
		</div>
	);
};

interface VariantRuleParametrizedItemsProps {
	rules: Array<VariantRule<AllowedSuperClasses, keyof VariantDataRules> & VariantRuleHandler<AllowedHandlerClasses>>;
	fenTags: FENOptionsTags;
}

const verifyParametrizedPublicProperties = (
	properties: VariantRulePublicProperties<keyof VariantDataRules>,
	rv: VariantRule<AllowedSuperClasses, keyof VariantDataRules>
): properties is VariantRulePublicProperties<Exclude<keyof VariantDataRules, ExtractVariantRuleByType<boolean>>> =>
	properties.parameterValue !== true && rv.getParametrizedOptions !== undefined;
const VariantRuleParametrizedItems = (props: VariantRuleParametrizedItemsProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const { id } = useContext(GameDisplayContext);
	const variantData = useSelector<RootState, StripPieceStringObjects<VariantDataRules>>((state) => selectEditorVariantDataRules(state, id));
	const gameType = useSelector<RootState, VariantType>((state) => selectEditorVariantType(state, id));
	const promotionPiecesSelector = useMemo(() => selectPromotionPieces(), []);
	const promotionPieces = useSelector<RootState, string>((state) => promotionPiecesSelector(state, id));
	const uniqueId = useId();

	const updatePromotionPieces = useCallback(
		(newValue: string) => {
			const filteredPieces = PromoteTo.filterPromotionPieceString(newValue);
			if (filteredPieces.join("") !== promotionPieces) {
				dispatch(changeParametrizedVariantRule({ id, option: "promotionPieces", newValue: filteredPieces }));
			}
		},
		[dispatch, id, promotionPieces]
	);

	return (
		<div className={styles["parametrized-variant-rules"]}>
			<div className={styles["parametrized-variant-rule"]}>
				<label htmlFor={`${id}promotionPieces`} className={styles["parametrized-variant-rule__name"]}>
					Pawns promote to
				</label>
				<input
					id={`${id}promotionPieces`}
					className={styles["parametrized-variant-rule__input"]}
					value={promotionPieces}
					onChange={(e) => updatePromotionPieces(e.target.value)}
				/>
			</div>
			{props.rules.map((rv) => {
				const publicProperties = rv.getPublicProperties();
				if (
					!verifyParametrizedPublicProperties(publicProperties, rv) ||
					!rv.getParametrizedOptions ||
					rv.isDisabled({ variantDataRules: variantData, fenTags: props.fenTags, gameType })
				) {
					return null;
				}

				const labelId = `${uniqueId}-${publicProperties.information.tag}`;

				const selectOptions: JSX.Element[] = [],
					entries = [...rv.getParametrizedOptions().entries()];
				let selectedIndex = 0;
				for (let i = 0; i < entries.length; i++) {
					selectOptions.push(
						<option key={entries[i][0]} value={i}>
							{entries[i][0]}
						</option>
					);
					if (entries[i][1] === publicProperties.parameterValue) selectedIndex = i;
				}

				return (
					<div key={labelId} className={styles["parametrized-variant-rule"]}>
						<label htmlFor={labelId} className={styles["parametrized-variant-rule__name"]}>
							{publicProperties.information.name}
						</label>
						<select
							id={labelId}
							className={styles["parametrized-variant-rule__select"]}
							value={selectedIndex}
							onChange={(e) =>
								dispatch(
									changeParametrizedVariantRule({
										id,
										option: publicProperties.information.tag,
										newValue: entries[Number(e.target.value)][1]
									})
								)
							}>
							{selectOptions}
						</select>
					</div>
				);
			})}
		</div>
	);
};

export const EditVariantRules = () => {
	const { id } = useContext(GameDisplayContext);
	const [isOpen, toggleOpen] = useState(false);
	const variantRuleSelector = useMemo(() => selectVariantRules(), []);
	const variantRuleList = useSelector<RootState, ReturnType<typeof variantRuleSelector>>((state) => variantRuleSelector(state, id));
	const fenTagsSelector = useMemo(() => selectFENOptionTags(), []);
	const fenTags = useSelector<RootState, FENOptionsTags>((state) => fenTagsSelector(state, id));
	const booleanRuleList = variantRuleList
		.map((rv) => rv.getPublicProperties())
		.filter<VariantRulePublicProperties<ExtractVariantRuleByType<boolean>>>(
			(properties): properties is VariantRulePublicProperties<ExtractVariantRuleByType<boolean>> =>
				typeof properties.parameterValue === "boolean"
		);

	return (
		<div>
			<ReactModal isOpen={isOpen} className={styles["variant-rules-modal"]} overlayClassName={styles["variant-rules-overlay"]}>
				<div className={styles["variant-rules-modal-rounded-header"]}>
					<h2 className={styles["variant-rules-modal-rounded-header__text"]}>Custom Variant Rules</h2>
				</div>
				<button className={styles["variant-rules-modal__button"]} onClick={() => toggleOpen(!isOpen)}>
					<span className={styles["variant-rules-modal__button-icon"]}></span>
					<span className={styles["board-settings__variant-rules-button-text"]}>Close Variant Rules</span>
				</button>
				<VariantRuleParametrizedItems rules={variantRuleList} fenTags={fenTags} />
				<VariantRuleGridItems
					rules={variantRuleList}
					fenTags={fenTags}
					ruleProperties={booleanRuleList.filter((properties) => {
						const type = properties.information.color;
						return type === variantRuleColors.widespread || type === variantRuleColors.minor || type === variantRuleColors.phased;
					})}
				/>
				<VariantRuleGridItems
					rules={variantRuleList}
					fenTags={fenTags}
					ruleProperties={booleanRuleList.filter((properties) => {
						const type = properties.information.color;
						return (
							type === variantRuleColors.autogenous ||
							type === variantRuleColors.extending ||
							type === variantRuleColors.pointsAlternation
						);
					})}
				/>
				<VariantRuleGridItems
					rules={variantRuleList}
					fenTags={fenTags}
					ruleProperties={booleanRuleList.filter((properties) => {
						const type = properties.information.color;
						return (
							type === variantRuleColors.metadata ||
							type === variantRuleColors.visual ||
							type === variantRuleColors.startingPosition
						);
					})}
				/>
			</ReactModal>
			<button
				className={`${styles["board-settings__variant-rules-button"]} ${
					isOpen ? styles["board-settings__variant-rules-button--open"] : ""
				}`}
				onClick={() => toggleOpen(!isOpen)}>
				<span className={styles["board-settings__variant-rules-button-icon"]}></span>
				<span className={styles["board-settings__variant-rules-button-text"]}>
					{isOpen ? "Close Variant Rules" : "Edit Variant Rules"}
				</span>
			</button>
		</div>
	);
};
