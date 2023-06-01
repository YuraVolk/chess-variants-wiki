import { Tuple, createTupleFromCallback, assertNonUndefined } from "@client/ts/baseTypes";
import {
	Cloneable,
	getVerticalPlacementModulus,
	isVerticalPlacement,
	Memento
} from "@client/ts/logic/BaseInterfaces";
import type { NumericColor, Coordinate } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import {
	botAlgorithms,
	ZombieMoveGenerationAlgorithm,
	ZombieType
} from "@moveGeneration/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/BotInterface";
import { copyClass } from "@utils/ObjectUtils";
import type { Board } from "../../Board/Board";
import { totalPlayers } from "../../GameInformation/GameData";
import {
	createFENOptionsTags,
	createFENOptionsTagsSnapshot,
	DynamicFENOptionTag,
	FENOptionsSerializedState,
	FENOptionsTags,
	FENOptionsTagsSnapshot
} from "./FENOptionsTagsInterface";

interface CastlingData {
	endCoordinates: number;
	pieceCoordinates: number;
	pieceEndCoordinates: number;
	checkSquares: number[];
}

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

	private isCastlingAvailable(player: NumericColor, board: Board, checks: number[]): boolean {
		const royal = this.tag("royal")[player];
		if (royal === null) return false;

		const royalCoordinate = royal[getVerticalPlacementModulus(player)];
		const squares = board.board;

		for (const checkSquare of checks) {
			const coordinateA = isVerticalPlacement(player) ? royalCoordinate : checkSquare;
			const coordinateB = isVerticalPlacement(player) ? checkSquare : royalCoordinate;
			if (
				!squares[coordinateA][coordinateB].isEmpty() ||
				board.preGeneratedAttacks[player].hoppingPieces[coordinateA][coordinateB] > 0 ||
				board.preGeneratedAttacks[player].slidingPieces[coordinateA][coordinateB] > 0
			)
				return false;
		}

		if (board.isKingInCheck(player)) return false;

		return true;
	}

	isKingsideCastlingAvailable(player: NumericColor, board: Board): boolean {
		if (!this.tag("castleKingside")[player]) return false;
		if (this.castlingKingsideData[player].endCoordinates === -1) return false;
		return this.isCastlingAvailable(player, board, this.castlingKingsideData[player].checkSquares);
	}

	isQueensideCastlingAvailable(player: NumericColor, board: Board): boolean {
		if (!this.tag("castleQueenside")[player]) return false;
		if (this.castlingQueensideData[player].endCoordinates === -1) return false;
		return this.isCastlingAvailable(player, board, this.castlingQueensideData[player].checkSquares);
	}

	private getCastlingEndCoordinate(player: NumericColor, coordinates: number | undefined): [number, number] {
		const royalCoordinate = this.tag("royal")[player]?.[getVerticalPlacementModulus(player)];
		assertNonUndefined(coordinates);
		assertNonUndefined(royalCoordinate);
		const coordinateA = isVerticalPlacement(player) ? royalCoordinate : coordinates;
		const coordinateB = isVerticalPlacement(player) ? coordinates : royalCoordinate;
		return [coordinateA, coordinateB];
	}

	getKingsideCastlingEndCoordinate(player: NumericColor): [number, number] {
		return this.getCastlingEndCoordinate(player, this.castlingKingsideData[player].endCoordinates);
	}
	getQueensideCastlingEndCoordinate(player: NumericColor): [number, number] {
		return this.getCastlingEndCoordinate(player, this.castlingQueensideData[player].endCoordinates);
	}
	getKingsideCastlingPieceEndCoordinate(player: NumericColor): [number, number] {
		return this.getCastlingEndCoordinate(player, this.castlingKingsideData[player].pieceEndCoordinates);
	}
	getQueensideCastlingPieceEndCoordinate(player: NumericColor): [number, number] {
		return this.getCastlingEndCoordinate(player, this.castlingQueensideData[player].pieceEndCoordinates);
	}
	getKingsideCastlingTandemPiece(player: NumericColor) {
		return this.castlingKingsideData[player].pieceCoordinates;
	}
	getQueensideCastlingTandemPiece(player: NumericColor) {
		return this.castlingQueensideData[player].pieceCoordinates;
	}

	getAvailableEnPassantCaptures(baseColor: NumericColor): Coordinate[] {
		const coordinates: Coordinate[] = [];
		this.tag("enPassant").forEach((enPassant, i) => {
			if (i === baseColor) return;
			if (enPassant) coordinates.push(enPassant[0]);
		});

		return coordinates.map((e) => [...e]);
	}

	getDefaultZombieAlgorithm(baseColor: NumericColor): ZombieMoveGenerationAlgorithm {
		const algorithm = botAlgorithms.get(this.tag("resigned")[baseColor] ? this.tag("zombieType")[baseColor] : ZombieType.F_Checker);
		assertNonUndefined(algorithm);
		return algorithm;
	}
}
