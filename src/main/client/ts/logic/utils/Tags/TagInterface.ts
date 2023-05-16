import type { Board } from "@moveGeneration/Board/Board";
import { createFENDataTag } from "./TagLogic/FENDataTag";
import * as GenericTags from "./TagLogic/GameMetadataTags";
import { createVariantRulesTag } from "./TagLogic/VariantRulesTag";

export const createDefaultVariantTags = () => ({
	variantType: GenericTags.createVariantTypeTag(),
	startingPosition: createFENDataTag(),
	variantRules: createVariantRulesTag(),
	date: GenericTags.createDateTag(),
	site: GenericTags.createSiteTag(),
	timeControl: GenericTags.createTimeControlTag(),
	termination: GenericTags.createTerminationTag(),
	gameNumber: GenericTags.createGameNumberTag(),
	playerData: GenericTags.createPlayerDataTag(),
	results: GenericTags.createResultsTag()
});
export type VariantTags = ReturnType<typeof createDefaultVariantTags>;

export interface VariantTag<T> {
	currentValue: T;
	readonly tag: keyof VariantTags;
	verifyTagInParsing(inputTag: string): boolean;
	parseTag(tagContents: string): T;
	serialize(board: Board): string | undefined;
}
