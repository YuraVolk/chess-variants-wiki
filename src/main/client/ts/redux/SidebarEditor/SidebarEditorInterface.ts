import { assertDevOnly, assertNonUndefined } from "@client/ts/baseTypes";
import type { BoardSquares } from "@client/ts/logic/BaseInterfaces";
import type { PublicFENSettings } from "@client/ts/logic/index/GameBoardWorker";
import type { SerializedBoardStrings } from "@client/ts/logic/utils/Tags/InputOutputProcessing";
import type { PlayerBooleanTuple } from "@moveGeneration/Board/Board";
import {
	DynamicFENOptionTag,
	FENOptionsSerializedState,
	FENOptionsTags,
	createFENOptionsTags
} from "@moveGeneration/FENData/FENOptions/FENOptionsTagsInterface";
import { GameData, VariantType, totalPlayers } from "@moveGeneration/GameInformation/GameData";
import type { Coordinate } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { PieceStringObject } from "@moveGeneration/GameInformation/GameUnits/PieceString";
import type { ProcessSafeMoveWrapper, StripPieceStringObjects } from "@moveGeneration/MoveTree/MoveTreeInterface";
import { verifyPieceLetter } from "@moveGeneration/PieceControl/PieceControlInterface";
import { VariantRule } from "@moveGeneration/VariantRules/VariantRule";
import type { AllowedSuperClasses, VariantDataRules } from "@moveGeneration/VariantRules/VariantRuleInterface";
import { compileVariantRuleData, parseVariantRules } from "@moveGeneration/VariantRules/VariantRuleSetup";

export interface SidebarEditorInterface {
	id: number;
	variantType: VariantType;
	boardSquares: BoardSquares<PieceStringObject>;
	variantDataRules?: StripPieceStringObjects<VariantDataRules>;
	publicFENSettings?: PublicFENSettings;
	serializedFEN: SerializedBoardStrings;
	gameData?: GameData;
	readonly currentMove: [-1];
	readonly moveTree: ProcessSafeMoveWrapper[];
	currentDroppedPiece?: PieceStringObject | Coordinate;
	isDroppingEnabled: boolean;
	selectedCoordinateFENtag?: keyof FENOptionsTags;
}

export type ExtractStateTagByType<T> = {
	[K in keyof FENOptionsSerializedState]: FENOptionsSerializedState[K] extends T ? K : never;
}[keyof FENOptionsSerializedState];
export type ExtractVariantRuleByType<T> = {
	[K in keyof VariantDataRules]: VariantDataRules[K] extends T ? K : never;
}[keyof VariantDataRules];

export const READONLY_TAGS = createFENOptionsTags();
export const READONLY_MAPPED_TAGS = Object.entries(READONLY_TAGS).filter<[keyof FENOptionsTags, Required<DynamicFENOptionTag<unknown, never>>]>(
	(s: [string, DynamicFENOptionTag<unknown, unknown>]): s is [keyof FENOptionsTags, Required<DynamicFENOptionTag<unknown, never>>] =>
		s[1].mapNewEndCoordinate !== undefined
);

export function verifyBooleanTupleTag(key: keyof FENOptionsSerializedState): key is ExtractStateTagByType<PlayerBooleanTuple> {
	const value: unknown = READONLY_TAGS[key].value;
	return Array.isArray(value) && value.length === totalPlayers && value.every((v) => typeof v === "boolean");
}

function serializeVariantDataToVariantRules(variantDataInput: StripPieceStringObjects<VariantDataRules>) {
	const variantData: VariantDataRules = {
		...variantDataInput,
		promotionPieces: variantDataInput.promotionPieces
			? variantDataInput.promotionPieces.map((p) => {
					const result = String(p);
					assertDevOnly(verifyPieceLetter(result));
					return result;
			  })
			: false
	};

	const currentVariantRules = [...parseVariantRules("")];
	const defaultVariantRules = compileVariantRuleData(parseVariantRules(""));

	const insertVariantRule = (variantRule: VariantRule<AllowedSuperClasses, keyof VariantDataRules>) => {
		for (const [dependency, dependencyArgs] of variantRule.dependencies) {
			if (!currentVariantRules.some((v) => v instanceof dependency)) {
				const dependencyRule = new dependency(...dependencyArgs);
				currentVariantRules.push(dependencyRule);
				insertVariantRule(dependencyRule);
			}
		}
	};

	let key: keyof VariantDataRules;
	for (key in defaultVariantRules) {
		if (!Object.prototype.hasOwnProperty.call(defaultVariantRules, key) || variantData[key] === defaultVariantRules[key]) continue;
		const variantRule = VariantRule.variantRuleList.find((rv) => new rv().getPublicProperties().information.tag === key);
		if (!variantRule) continue;
		const index = currentVariantRules.findIndex((c) => c instanceof variantRule);
		if (index !== -1) currentVariantRules.splice(index, 1);

		const rule = new variantRule(variantData[key]);
		currentVariantRules.push(rule);
		insertVariantRule(rule);
	}

	return currentVariantRules.map((rv) => ({ tag: rv.getPublicProperties().information.tag, value: rv.getPublicProperties().parameterValue }));
}

export const stripUnnecessaryBandwidthFromEditor = (information: SidebarEditorInterface) => {
	assertNonUndefined(information.variantDataRules);
	assertNonUndefined(information.publicFENSettings);
	assertNonUndefined(information.gameData);
	return {
		variantType: information.variantType,
		variantRules: serializeVariantDataToVariantRules(information.variantDataRules),
		boardSquares: information.boardSquares,
		publicFENSettings: information.publicFENSettings,
		gameData: information.gameData
	};
};
export type EditorConstructSettings = ReturnType<typeof stripUnnecessaryBandwidthFromEditor>;
