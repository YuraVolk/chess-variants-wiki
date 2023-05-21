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
import { VariantType, totalPlayers } from "@moveGeneration/GameInformation/GameData";
import type { Coordinate } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import type { PieceStringObject } from "@moveGeneration/GameInformation/GameUnits/PieceString";
import type { ProcessSafeMoveWrapper, StripPieceStringObjects } from "@moveGeneration/MoveTree/MoveTreeInterface";
import type { VariantDataRules } from "@moveGeneration/VariantRules/VariantRuleInterface";

export interface SidebarEditorInterface {
	id: number;
	variantType: VariantType;
	boardSquares: BoardSquares<PieceStringObject>;
	variantDataRules?: StripPieceStringObjects<VariantDataRules>;
	publicFENSettings?: PublicFENSettings;
	serializedFEN: SerializedBoardStrings;
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
