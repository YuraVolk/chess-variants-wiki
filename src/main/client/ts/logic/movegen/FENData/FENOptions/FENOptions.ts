import { Tuple, createTupleFromCallback, assertNonUndefined, throwOnNever, createTuple } from "@client/ts/baseTypes";
import type { BoardSquares, Cloneable, Memento } from "@client/ts/logic/BaseInterfaces";
import type { NumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import {
	botAlgorithms,
	ZombieMoveGenerationAlgorithm,
	ZombieType
} from "@moveGeneration/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/BotInterface";
import { copyClass } from "@utils/ObjectUtils";
import { Termination, colors, getPlayerNameFromColor, totalPlayers } from "../../GameInformation/GameData";
import {
	createFENOptionsTags,
	createFENOptionsTagsSnapshot,
	DynamicFENOptionTag,
	FENOptionsSerializedState,
	FENOptionsTags,
	FENOptionsTagsSnapshot
} from "./FENOptionsTagsInterface";
import { InternalMoveSignature } from "@moveGeneration/MoveTree/MoveTreeInterface";
import type { CastlingData } from "@moveGeneration/VariantRules/VariantRuleDefinitions/WidespreadDecorators/Castling/fendata";
import type { PieceString } from "@moveGeneration/GameInformation/GameUnits/PieceString";

export interface FENOptionsSnapshot {
	tagsSnapshot: FENOptionsTagsSnapshot;
}

export class FENOptions implements Cloneable<FENOptions>, Memento<FENOptionsSnapshot> {
	static loadSerializedState(state: FENOptionsSerializedState) {
		const newTags = createFENOptionsTags();
		let key: keyof FENOptionsTags;
		for (key in newTags) {
			if (Object.prototype.hasOwnProperty.call(newTags, key)) {
				newTags[key].value = state[key] as never;
			}
		}

		return newTags;
	}

	tags = createFENOptionsTags();
	castlingKingsideData: Tuple<CastlingData, typeof totalPlayers> = createTupleFromCallback(
		() => ({ endCoordinates: -1, pieceCoordinates: -1, pieceEndCoordinates: -1, checkSquares: [] }),
		totalPlayers
	);
	castlingQueensideData: Tuple<CastlingData, typeof totalPlayers> = createTupleFromCallback(
		() => ({ endCoordinates: -1, pieceCoordinates: -1, pieceEndCoordinates: -1, checkSquares: [] }),
		totalPlayers
	);

	createSnapshot(): FENOptionsSnapshot {
		return {
			tagsSnapshot: createFENOptionsTagsSnapshot(this.tags)
		};
	}

	private loadTagSnapshot<V extends FENOptionsTagsSnapshot[keyof FENOptionsTagsSnapshot]>(value: V, tag: DynamicFENOptionTag<V>) {
		tag.loadSnapshot(value);
	}
	loadSnapshot(snapshot: FENOptionsSnapshot): void {
		let key: keyof FENOptionsTagsSnapshot;
		for (key in snapshot.tagsSnapshot) {
			if (!Object.prototype.hasOwnProperty.call(snapshot.tagsSnapshot, key)) continue;
			this.loadTagSnapshot(snapshot.tagsSnapshot[key], this.tags[key]);
		}
	}

	private verifyKeyTag(key: keyof FENOptionsTags, snapshot: FENOptionsTagsSnapshot): key is keyof FENOptionsTagsSnapshot {
		return key in snapshot;
	}
	createClone(): FENOptions {
		const newOptions = copyClass(this, FENOptions);
		const snapshot = this.createSnapshot();
		newOptions.tags = createFENOptionsTags();
		newOptions.loadSnapshot(snapshot);

		let key: keyof FENOptionsTags;
		for (key in this.tags) {
			if (Object.prototype.hasOwnProperty.call(this.tags, key) && !this.verifyKeyTag(key, snapshot.tagsSnapshot)) {
				newOptions.tags[key].value = this.tags[key].value;
			}
		}

		return newOptions;
	}

	tag<K extends keyof FENOptionsTags>(key: K): FENOptionsTags[K]["value"] {
		return this.tags[key].value;
	}
	setTag<K extends keyof FENOptionsTags>(key: K, value: FENOptionsTags[K]["value"]): void {
		this.tags[key].value = value;
	}

	createSerializedState() {
		const serializedState: Partial<FENOptionsSerializedState> = {};
		let fenTag: keyof FENOptionsTags;
		for (fenTag in this.tags) {
			if (!Object.prototype.hasOwnProperty.call(this.tags, fenTag)) continue;
			const tag = this.tags[fenTag];
			serializedState[fenTag] = tag.createSnapshot() as never;
		}

		return serializedState as FENOptionsSerializedState;
	}

	getDefaultZombieAlgorithm(baseColor: NumericColor): ZombieMoveGenerationAlgorithm {
		const algorithm = botAlgorithms.get(this.tag("resigned")[baseColor] ? this.tag("zombieType")[baseColor] : ZombieType.F_Checker);
		assertNonUndefined(algorithm);
		return algorithm;
	}

	branchBetweenResignationMoves(
		move: InternalMoveSignature.Resign | InternalMoveSignature.Timeout | InternalMoveSignature.ClaimWin,
		sideToMove: NumericColor
	): Termination {
		const playerName = getPlayerNameFromColor(sideToMove).toUpperCase();
		switch (move) {
			case InternalMoveSignature.Resign:
				return `${playerName} RESIGNED!`;
			case InternalMoveSignature.Timeout:
				return `${playerName} FORFEITS ON TIME!`;
			case InternalMoveSignature.ClaimWin:
				return `${playerName} CLAIMED THE WIN!`;
			default:
				throwOnNever(move);
		}
	}

	getKingCaptures(board: BoardSquares<PieceString>) {
		const kingCaptures = createTuple(false, totalPlayers);
		for (const color of colors) {
			const royalCoordinate = this.tag("royal")[color];
			if (!royalCoordinate) continue;
			const pieceString = board[royalCoordinate[0]][royalCoordinate[1]];
			if (pieceString.isEmpty() || pieceString.color !== color) {
				kingCaptures[color] = true;
			}
		}

		return kingCaptures;
	}
}
