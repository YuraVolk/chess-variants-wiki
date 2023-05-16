import { Board } from "../Board/Board";
import { FENData } from "../FENData/FENData";
import { PieceControl } from "../PieceControl/PieceControl";
import { ForcedCapture } from "./VariantRuleDefinitions/BoardDecorators/ForcedCapture";
import { SeirawanSetup } from "./VariantRuleDefinitions/BoardDecorators/SeirawanSetup";
import { SetupChess } from "./VariantRuleDefinitions/BoardDecorators/SetupChess";
import { Taboo } from "./VariantRuleDefinitions/BoardDecorators/Taboo";
import { FiftyMoveRule } from "./VariantRuleDefinitions/FENDataDecorators/FiftyMoveRule";
import { Giveaway } from "./VariantRuleDefinitions/FENDataDecorators/Giveaway";
import { StalemateOptions } from "./VariantRuleDefinitions/FENDataDecorators/StalemateOptions";
import { ThreefoldRepetition } from "./VariantRuleDefinitions/FENDataDecorators/ThreefoldRepetition";
import { PromoteTo } from "./VariantRuleDefinitions/PieceControlDecorators/PromoteTo";
import { PromotionRank } from "./VariantRuleDefinitions/PieceControlDecorators/PromotionRank";
import { VariantRule, VariantRulePublicProperties } from "./VariantRule";
import type { AllowedSuperClasses, VariantDataRules, VariantRuleAllowedChecks } from "./VariantRuleInterface";

export interface VariantRuleParsingTypes {
	boardDecorators: Array<VariantRule<typeof Board, keyof VariantDataRules>>;
	pieceControlDecorators: Array<VariantRule<typeof PieceControl, keyof VariantDataRules>>;
	fenDataDecorators: Array<VariantRule<typeof FENData, keyof VariantDataRules>>;
	[Symbol.iterator]: () => Generator<VariantRule<AllowedSuperClasses, keyof VariantDataRules>, void>;
}
export const createBaseParsingTypes = (): VariantRuleParsingTypes => ({
	boardDecorators: [],
	pieceControlDecorators: [],
	fenDataDecorators: [],
	*[Symbol.iterator]() {
		for (const rv of [...this.boardDecorators, ...this.pieceControlDecorators, ...this.fenDataDecorators]) {
			const variantRule: VariantRule<AllowedSuperClasses, keyof VariantDataRules> = rv;
			yield variantRule;
		}
	}
});

const variantRulePriorities = [SetupChess, ForcedCapture, Taboo, SeirawanSetup, PromoteTo, PromotionRank, Giveaway].reverse();

function differentiateDecoratorMethods(
	variant: VariantRule<AllowedSuperClasses, keyof VariantDataRules>,
	methods: {
		[K in keyof Omit<VariantRuleParsingTypes, symbol>]: (
			variant: VariantRuleParsingTypes[K] extends Array<VariantRule<infer C, keyof VariantDataRules>>
				? VariantRule<C, keyof VariantDataRules>
				: never
		) => void;
	}
) {
	const verifyDecorator = <C extends typeof Board | typeof PieceControl | typeof FENData>(
		rv: VariantRule<AllowedSuperClasses, keyof VariantDataRules>,
		type: C
	): rv is VariantRule<C, keyof VariantDataRules> => rv.getDecoratorType() === type;

	if (verifyDecorator(variant, Board)) {
		methods.boardDecorators(variant);
	} else if (verifyDecorator(variant, PieceControl)) {
		methods.pieceControlDecorators(variant);
	} else if (verifyDecorator(variant, FENData)) {
		methods.fenDataDecorators(variant);
	}
}

export function parseVariantRules(rules: string): VariantRuleParsingTypes {
	type VariantRuleConstructor = new (...args: unknown[]) => VariantRule<AllowedSuperClasses, keyof VariantDataRules>;
	const variantClasses = new Set<VariantRuleConstructor>();
	const variantRuleList = new Set<VariantRule<AllowedSuperClasses, keyof VariantDataRules>>();
	const forcedRules = [PromotionRank, PromoteTo, StalemateOptions, FiftyMoveRule, ThreefoldRepetition];
	for (const variantRule of VariantRule.variantRuleList) {
		const rv = new variantRule();
		variantRuleList.add(rv);
		variantClasses.add(variantRule);
	}

	const finalList = createBaseParsingTypes();
	const rulesStrings = rules.split(/\s+/);

	const insertVariantRule = (variant: VariantRule<AllowedSuperClasses, keyof VariantDataRules>) => {
		differentiateDecoratorMethods(variant, {
			boardDecorators: (variant: VariantRule<typeof Board, keyof VariantDataRules>) => {
				finalList.boardDecorators.push(variant);
			},
			pieceControlDecorators: (variant: VariantRule<typeof PieceControl, keyof VariantDataRules>) => {
				finalList.pieceControlDecorators.push(variant);
			},
			fenDataDecorators: (variant: VariantRule<typeof FENData, keyof VariantDataRules>) => {
				finalList.fenDataDecorators.push(variant);
			}
		});

		for (const [dependency, dependencyArgs] of variant.dependencies) {
			if (
				!Object.values(finalList).some((decorators: Array<VariantRule<AllowedSuperClasses, keyof VariantDataRules>>) =>
					decorators.some((rv) => rv instanceof dependency)
				)
			) {
				insertVariantRule(new dependency(...dependencyArgs));
			}
		}
	};

	for (const variant of variantRuleList) {
		for (const ruleString of rulesStrings) {
			if (variant.matchesPGNDeclaration(ruleString)) {
				insertVariantRule(variant);
				variantRuleList.delete(variant);
			}
		}
	}

	for (const forcedRule of forcedRules) {
		const variant = new forcedRule();
		differentiateDecoratorMethods(variant, {
			boardDecorators: (variant: VariantRule<typeof Board, keyof VariantDataRules>) => {
				if (!finalList.boardDecorators.some((rule) => rule instanceof forcedRule)) {
					finalList.boardDecorators.push(variant);
				}
			},
			pieceControlDecorators: (variant: VariantRule<typeof PieceControl, keyof VariantDataRules>) => {
				if (!finalList.pieceControlDecorators.some((rule) => rule instanceof forcedRule)) {
					finalList.pieceControlDecorators.push(variant);
				}
			},
			fenDataDecorators: (variant: VariantRule<typeof FENData, keyof VariantDataRules>) => {
				if (!finalList.fenDataDecorators.some((rule) => rule instanceof forcedRule)) {
					finalList.fenDataDecorators.push(variant);
				}
			}
		});
	}

	for (const rule of variantRulePriorities) {
		const resultingRule = new rule();
		differentiateDecoratorMethods(resultingRule, {
			boardDecorators: () => {
				const index = finalList.boardDecorators.findIndex((c) => c instanceof rule);
				if (index !== -1) {
					finalList.boardDecorators.unshift(finalList.boardDecorators.splice(index, 1)[0]);
				}
			},
			pieceControlDecorators: () => {
				const index = finalList.pieceControlDecorators.findIndex((c) => c instanceof rule);
				if (index !== -1) {
					finalList.pieceControlDecorators.unshift(finalList.pieceControlDecorators.splice(index, 1)[0]);
				}
			},
			fenDataDecorators: () => {
				const index = finalList.fenDataDecorators.findIndex((c) => c instanceof rule);
				if (index !== -1) {
					finalList.fenDataDecorators.unshift(finalList.fenDataDecorators.splice(index, 1)[0]);
				}
			}
		});
	}

	return finalList;
}

export function compileVariantRuleData(rules: VariantRuleParsingTypes): VariantDataRules {
	const finalObject: Partial<VariantDataRules> = {};
	const variantRuleList = VariantRule.variantRuleList.map((rv) => new rv());
	for (const rule of variantRuleList) {
		finalObject[rule.getPublicProperties().information.tag] = false;
	}

	const setFinalObjectProperty = <K extends keyof VariantDataRules>(properties: VariantRulePublicProperties<K>) => {
		finalObject[properties.information.tag] = properties.parameterValue;
	};

	for (const rule of rules) setFinalObjectProperty(rule.getPublicProperties());
	return finalObject as VariantDataRules;
}

export function copyVariantRules<T extends AllowedSuperClasses>(
	rvs: Array<VariantRule<T, keyof VariantDataRules>>
): Array<VariantRule<T, keyof VariantDataRules>> {
	return rvs.map((rv) => {
		const parameterValue = rv.getPublicProperties().parameterValue;
		const parameterArray = parameterValue !== false ? [parameterValue] : [];
		return new rv.constructor(parameterArray);
	});
}

export function validateVariantRules(board: Board) {
	const configuration: VariantRuleAllowedChecks = {
		variantDataRules: board.variantData,
		gameType: board.gameType.type,
		fenTags: board.data.fenOptions.tags
	};
	return {
		...board.variantRules,
		boardDecorators: board.variantRules.boardDecorators.filter((rv) => !rv.isDisabled(configuration)),
		pieceControlDecorators: board.variantRules.pieceControlDecorators.filter((rv) => !rv.isDisabled(configuration)),
		fenDataDecorators: board.variantRules.fenDataDecorators.filter((rv) => !rv.isDisabled(configuration))
	};
}
