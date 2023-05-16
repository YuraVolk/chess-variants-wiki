import { createTuple, Tuple } from "@client/ts/baseTypes";
import type { Coordinate, NumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import type { ZombieType } from "@moveGeneration/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/BotInterface";
import type { Memento } from "../../../BaseInterfaces";
import type { PlayerBooleanTuple } from "../../Board/Board";
import { totalPlayers } from "../../GameInformation/GameData";
import type { PieceString, PieceStringObject } from "../../GameInformation/GameUnits/PieceString";
import type { PieceLetter } from "../../PieceControl/PieceControlInterface";
import * as Tags from "./FENOptionsTags";

export interface StaticFENOptionTag<T, S = T> {
	value: T;
	parse(value: unknown): T;
	serialize(): string | undefined;
	createSnapshot(): S;
}
export type DynamicFENOptionTag<T, S = T> = StaticFENOptionTag<T, S> & Memento<S>;
export const verifyDynamicFENOptionKey = (
	fenTag: StaticFENOptionTag<unknown> | DynamicFENOptionTag<unknown>,
	key: keyof FENOptionsTags
): key is keyof FENOptionsTagsSnapshot => "loadSnapshot" in fenTag;
export const verifyDynamicTag = (fenTag: StaticFENOptionTag<unknown> | DynamicFENOptionTag<unknown>): fenTag is DynamicFENOptionTag<unknown> =>
	"loadSnapshot" in fenTag;

export interface FENOptionsTags {
	dead: DynamicFENOptionTag<PlayerBooleanTuple>;
	resigned: DynamicFENOptionTag<PlayerBooleanTuple>;

	pawnBaseRank: StaticFENOptionTag<number>;
	enPassant: DynamicFENOptionTag<Tuple<[Coordinate, Coordinate] | null, typeof totalPlayers>>;

	castleKingside: DynamicFENOptionTag<PlayerBooleanTuple>;
	castleQueenside: DynamicFENOptionTag<PlayerBooleanTuple>;
	castleWith: StaticFENOptionTag<string>;

	boxOffset: StaticFENOptionTag<NumericColor>;
	wb: StaticFENOptionTag<boolean>;
	dim: StaticFENOptionTag<[number, number]>;
	noCorners: StaticFENOptionTag<boolean>;

	zombieType: StaticFENOptionTag<Tuple<ZombieType, typeof totalPlayers>>;
	zombieImmune: StaticFENOptionTag<PlayerBooleanTuple>;

	royal: DynamicFENOptionTag<Tuple<Coordinate | null, typeof totalPlayers>>;
	lives: DynamicFENOptionTag<Tuple<number | null, typeof totalPlayers>>;

	bank: DynamicFENOptionTag<
		Tuple<Map<PieceString, number>, typeof totalPlayers>,
		Tuple<Array<[PieceStringObject, number]>, typeof totalPlayers>
	>;
	promotedFrom: DynamicFENOptionTag<Map<Coordinate, PieceLetter>, Array<[Coordinate, PieceLetter]>>;
	setupPoints: DynamicFENOptionTag<Tuple<number, typeof totalPlayers> | null>;
	setupComplete: DynamicFENOptionTag<PlayerBooleanTuple>;
	seirawanDrops: DynamicFENOptionTag<Tuple<Set<string>, typeof totalPlayers>, Tuple<string[], typeof totalPlayers>>;
	areBanksEnabled: DynamicFENOptionTag<PlayerBooleanTuple>;
}

type FENOptionsDynamicTags = Pick<
	FENOptionsTags,
	{
		[K in keyof FENOptionsTags]: FENOptionsTags[K] extends DynamicFENOptionTag<FENOptionsTags[K]["value"]> ? K : never;
	}[keyof FENOptionsTags]
>;
export type FENOptionsTagsSnapshot = {
	[K in keyof FENOptionsDynamicTags]: ReturnType<FENOptionsTags[K]["createSnapshot"]>;
};
export type FENOptionsSerializedState = {
	[K in keyof FENOptionsTags]: ReturnType<FENOptionsTags[K]["createSnapshot"]>;
};

export function createFENOptionsTags(): FENOptionsTags {
	return {
		dead: Tags.createBooleanTupleTag({ key: "dead", defaultValue: createTuple(false, totalPlayers), isStatic: false }),
		resigned: Tags.createBooleanTupleTag({ key: "resigned", defaultValue: createTuple(false, totalPlayers), isStatic: false }),

		pawnBaseRank: Tags.createPawnBaseRankTag(),
		enPassant: Tags.createEnPassantTag(),

		boxOffset: Tags.createBoxOffsetTag(),
		wb: Tags.createBooleanTag({ key: "wb", defaultValue: false, isStatic: true }),
		dim: Tags.createDimensionTag(),
		noCorners: Tags.createBooleanTag({ key: "noCorners", defaultValue: false, isStatic: true }),

		castleKingside: Tags.createBooleanTupleTag({ key: "castleKingside", defaultValue: createTuple(true, totalPlayers), isStatic: false }),
		castleQueenside: Tags.createBooleanTupleTag({ key: "castleQueenside", defaultValue: createTuple(true, totalPlayers), isStatic: false }),
		castleWith: Tags.createCastleWithTag(),

		zombieType: Tags.createZombiesTag(),
		zombieImmune: Tags.createBooleanTupleTag({ key: "zombieImmune", defaultValue: createTuple(false, totalPlayers), isStatic: false }),

		royal: Tags.createRoyalTag(),
		lives: Tags.createLivesTag(),

		bank: Tags.createBankTag(),
		promotedFrom: Tags.createPromotedFromTag(),
		setupPoints: Tags.createSetupPointsTag(),
		setupComplete: Tags.createBooleanTupleTag({ key: "setupComplete", defaultValue: createTuple(true, totalPlayers), isStatic: false }),
		seirawanDrops: Tags.createSeirawanDropsTag(),
		areBanksEnabled: Tags.createBooleanTupleTag({ key: "areBanksEnabled", defaultValue: createTuple(false, totalPlayers), isStatic: false })
	};
}

export function createFENOptionsTagsSnapshot(tags: FENOptionsTags): FENOptionsTagsSnapshot {
	const resultingTags: Partial<FENOptionsTagsSnapshot> = {};
	let fenTag: keyof FENOptionsTags;
	for (fenTag in tags) {
		if (!Object.prototype.hasOwnProperty.call(tags, fenTag)) continue;
		const tag = tags[fenTag];
		if (!verifyDynamicFENOptionKey(tag, fenTag) || !verifyDynamicTag(tag)) continue;
		resultingTags[fenTag] = tag.createSnapshot() as never;
	}

	return resultingTags as FENOptionsTagsSnapshot;
}
