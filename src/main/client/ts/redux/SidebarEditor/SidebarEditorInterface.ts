import type { BoardSquares } from "@client/ts/logic/BaseInterfaces";
import type { PublicFENSettings } from "@client/ts/logic/index/GameBoardWorker";
import type { SerializedBoardStrings } from "@client/ts/logic/utils/Tags/InputOutputProcessing";
import type { FENOptionsSerializedState } from "@moveGeneration/FENData/FENOptions/FENOptionsTagsInterface";
import type { VariantType } from "@moveGeneration/GameInformation/GameData";
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
}

export type ExtractStateTagByType<T> = {
	[K in keyof FENOptionsSerializedState]: FENOptionsSerializedState[K] extends T ? K : never;
}[keyof FENOptionsSerializedState];
export type ExtractVariantRuleByType<T> = {
	[K in keyof VariantDataRules]: VariantDataRules[K] extends T ? K : never;
}[keyof VariantDataRules];
