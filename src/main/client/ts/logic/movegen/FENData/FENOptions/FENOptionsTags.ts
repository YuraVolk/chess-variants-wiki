import { createTuple, createTupleFromCallback, Tuple, verifyTupleType } from "@client/ts/baseTypes";
import { compareArrays } from "@client/ts/utils/ArrayUtils";
import type { PlayerBooleanTuple } from "../../Board/Board";
import { compareCoordinates, stringifyCoordinate, unstringifyCoordinate } from "../../Board/BoardInterface";
import { boardDimension, colors, convertCoordinateToPGN4, totalPlayers } from "../../GameInformation/GameData";
import { Coordinate, verifyNumericColor } from "../../GameInformation/GameUnits/GameUnits";
import { createPieceFromString, PieceString } from "../../GameInformation/GameUnits/PieceString";
import { PieceLetter, verifyPieceLetter } from "../../PieceControl/PieceControlInterface";
import type { DynamicFENOptionTag, FENOptionsTags, StaticFENOptionTag } from "./FENOptionsTagsInterface";
import {
	verifyZombieType,
	ZombieType
} from "@moveGeneration/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/BotInterface";
import { PGN4_SYNTAX } from "@client/ts/logic/utils/Tags/Moves/ParsePGNMoves";
import { parseEnPassantCoordinates, parseSingleCoordinate } from "@client/ts/logic/utils/Tags/Utils";
import { verifyObjectType } from "@client/ts/utils/ObjectUtils";

type ExtractTagsByType<T> = {
	[K in keyof FENOptionsTags]: FENOptionsTags[K] extends StaticFENOptionTag<T> ? K : never;
}[keyof FENOptionsTags];
type ExtractTagKeysByType<T> = keyof Pick<FENOptionsTags, ExtractTagsByType<T>>;

const verifyParameterType = <T>(param: unknown, type: string): param is Tuple<T, typeof totalPlayers> => {
	return Array.isArray(param) && verifyTupleType(param, totalPlayers) && param.every((v) => typeof v === type);
};

interface TagFactoryParameters<K extends keyof FENOptionsTags> {
	key: K;
	defaultValue: FENOptionsTags[K]["value"];
	name: string;
}
interface DynamicTagFactoryParameters<K extends keyof FENOptionsTags> extends TagFactoryParameters<K> {
	isStatic: false;
}
interface StaticTagFactoryParameters<K extends keyof FENOptionsTags> extends TagFactoryParameters<K> {
	isStatic: true;
}
type OverloadTagFactoryParameters<K extends keyof FENOptionsTags> = DynamicTagFactoryParameters<K> | StaticTagFactoryParameters<K>;

type FactoryGeneratedObject<K extends keyof FENOptionsTags> = StaticFENOptionTag<FENOptionsTags[K]["value"]> &
	Partial<DynamicFENOptionTag<FENOptionsTags[K]["value"]>>;

type BooleanTupleTag = ExtractTagKeysByType<PlayerBooleanTuple>;
export function createBooleanTupleTag(parameters: DynamicTagFactoryParameters<BooleanTupleTag>): DynamicFENOptionTag<PlayerBooleanTuple>;
export function createBooleanTupleTag(parameters: StaticTagFactoryParameters<BooleanTupleTag>): StaticFENOptionTag<PlayerBooleanTuple>;
export function createBooleanTupleTag(parameters: OverloadTagFactoryParameters<BooleanTupleTag>) {
	const { defaultValue, key, isStatic, name } = parameters;
	const resultingObject: FactoryGeneratedObject<BooleanTupleTag> = {
		value: [...defaultValue],
		parse(value): PlayerBooleanTuple {
			if (verifyParameterType<boolean>(value, "boolean")) {
				return value;
			} else return this.createSnapshot();
		},
		serialize() {
			if (key === "castleKingside" || key === "castleQueenside" || key === "dead" || key === "areBanksEnabled") return;
			if (!compareArrays(this.value, defaultValue)) {
				return `'${key}':(${this.value.join(",")})`;
			} else return;
		},
		createSnapshot() {
			return [...this.value];
		},
		loadSnapshot(snapshot) {
			const tuple: PlayerBooleanTuple = [...snapshot];
			this.value = tuple;
		},
		getName() {
			return name;
		}
	};

	if (isStatic) delete resultingObject.loadSnapshot;
	return resultingObject;
}

const defaultPawnBaseRank = 2;
export const createPawnBaseRankTag = (): FENOptionsTags["pawnBaseRank"] => ({
	value: defaultPawnBaseRank,
	parse(value) {
		return typeof value === "number" && value > 0 && value <= boardDimension ? value : this.value;
	},
	serialize() {
		return this.value === defaultPawnBaseRank ? undefined : `'pawnBaseRank':${this.value}`;
	},
	createSnapshot() {
		return this.value;
	},
	getName() {
		return "Pawns Home Rank";
	}
});

export const createEnPassantTag = (): FENOptionsTags["enPassant"] => ({
	value: createTuple(null, totalPlayers),
	parse(input) {
		if (verifyParameterType<string>(input, "string")) {
			return input.map((v) => parseEnPassantCoordinates(v) ?? null);
		} else return this.createSnapshot();
	},
	serialize() {
		if (this.value.some((v) => !v)) {
			return `'enPassant':(${this.value
				.map((enP) => (enP ? `'${convertCoordinateToPGN4(enP[0])}:${convertCoordinateToPGN4(enP[1])}'` : "''"))
				.join(",")})`;
		} else return;
	},
	createSnapshot() {
		return this.value.map((enP) => (enP ? [[...enP[0]], [...enP[1]]] : enP));
	},
	loadSnapshot(snapshot) {
		this.value = snapshot.map((enP) => (enP ? [[...enP[0]], [...enP[1]]] : enP));
	},
	getName() {
		return "En Passant";
	}
});

const defaultCastleWith = "R";
export const createCastleWithTag = (): FENOptionsTags["castleWith"] => ({
	value: defaultCastleWith,
	parse(input) {
		return typeof input === "string" ? input : this.value;
	},
	serialize() {
		return this.value === defaultCastleWith ? undefined : `'castleWith':${this.value}`;
	},
	createSnapshot() {
		return this.value;
	},
	getName() {
		return "Second Castling Piece";
	}
});

const defaultBoxOffset = 0;
export const createBoxOffsetTag = (): FENOptionsTags["boxOffset"] => ({
	value: defaultBoxOffset,
	parse(input) {
		return typeof input === "number" && verifyNumericColor(input) ? input : this.value;
	},
	serialize() {
		return this.value === defaultBoxOffset ? undefined : `'boxOffset':${this.value}`;
	},
	createSnapshot() {
		return this.value;
	},
	getName() {
		return "Box Offset";
	}
});

type BooleanTag = ExtractTagsByType<boolean>;
export function createBooleanTag(parameters: DynamicTagFactoryParameters<BooleanTag>): DynamicFENOptionTag<boolean>;
export function createBooleanTag(parameters: StaticTagFactoryParameters<BooleanTag>): StaticFENOptionTag<boolean>;
export function createBooleanTag(parameters: OverloadTagFactoryParameters<BooleanTag>) {
	const { defaultValue, key, isStatic, name } = parameters;
	const result: FactoryGeneratedObject<BooleanTag> = {
		value: defaultValue,
		parse(input) {
			return typeof input === "boolean" ? input : this.createSnapshot();
		},
		serialize() {
			return this.value === defaultValue ? undefined : `'${key}':${String(this.value)}`;
		},
		createSnapshot() {
			return this.value;
		},
		loadSnapshot(snapshot) {
			this.value = snapshot;
		},
		getName() {
			return name;
		}
	};

	if (isStatic) delete result.loadSnapshot;
	return result;
}

const defaultDimension: [number, number] = [14, 14];
export const createDimensionTag = (): FENOptionsTags["dim"] => ({
	value: [...defaultDimension],
	parse(baseInput) {
		if (typeof baseInput !== "string") return this.createSnapshot();
		const input = baseInput.split("x");
		return Array.isArray(input) &&
			verifyTupleType(input, 2) &&
			input.every((i) => {
				const v = Number(i);
				return !isNaN(v) && v >= 2 && v <= 14 && v % 2 === 0;
			})
			? input.map((v) => Number(v)).reverse()
			: this.createSnapshot();
	},
	serialize() {
		if (compareArrays(this.value, defaultDimension)) return;
		return `'dim':'${this.value.join("x")}'`;
	},
	createSnapshot() {
		return [...this.value];
	},
	getName() {
		return "Board Dimension";
	}
});

const defaultZombies = createTuple(ZombieType.Rando, totalPlayers);
export const createZombiesTag = (): FENOptionsTags["zombieType"] => ({
	value: [...defaultZombies],
	parse(input) {
		if (Array.isArray(input) && verifyTupleType(input, totalPlayers) && input.every<string>((v): v is string => typeof v === "string")) {
			const newZombies = this.createSnapshot();
			for (const color of colors) {
				const zombieType = input[color];
				if (verifyZombieType(zombieType)) newZombies[color] = zombieType;
			}

			return newZombies;
		} else return this.createSnapshot();
	},
	serialize() {
		if (compareArrays(this.value, defaultZombies)) return;
		return `'zombieType':(${this.value.map((t, i) => (t === defaultZombies[i] ? "''" : `'${t}'`)).join(",")})`;
	},
	createSnapshot() {
		return [...this.value];
	},
	getName() {
		return "Zombie Types";
	}
});

export const createRoyalTag = (): FENOptionsTags["royal"] => ({
	value: createTuple(null, totalPlayers),
	parse(input) {
		if (verifyParameterType<string>(input, "string")) {
			return input.map((c) => parseSingleCoordinate(c) ?? null);
		} else return this.createSnapshot();
	},
	serialize() {
		return `'royal':(${this.value.map((r) => (r ? `'${convertCoordinateToPGN4(r)}'` : "''")).join(",")})`;
	},
	createSnapshot() {
		return this.value.map((c) => (c ? [...c] : c));
	},
	loadSnapshot(snapshot) {
		this.value = snapshot.map((c) => (c ? [...c] : c));
	},
	getName() {
		return "Set Royals";
	},
	mapNewEndCoordinate(value, start, end) {
		const currentValue = this.createSnapshot();
		this.loadSnapshot(value);
		const newValue = this.createSnapshot();
		this.loadSnapshot(currentValue);

		const changedIndex = newValue.findIndex((c) => c && compareCoordinates(c, start));
		if (changedIndex !== -1) {
			newValue[changedIndex] = end;
		}
		return newValue;
	}
});

export const createLivesTag = (): FENOptionsTags["lives"] => ({
	value: createTuple(null, totalPlayers),
	parse(input) {
		if (verifyParameterType<number>(input, "number")) {
			return input;
		} else return this.createSnapshot();
	},
	serialize() {
		if (this.value.some((v) => v !== null)) {
			return `'lives':(${this.value.map((l) => (l ? String(l) : "1")).join(",")})`;
		} else return;
	},
	createSnapshot() {
		return [...this.value];
	},
	loadSnapshot(snapshot) {
		this.value = [...snapshot];
	},
	getName() {
		return "Royal Lives";
	}
});

export const createBankTag = (): FENOptionsTags["bank"] => ({
	value: createTupleFromCallback(() => new Map<PieceString, number>(), totalPlayers),
	parse(input) {
		const defaultBanks = createTupleFromCallback(() => new Map<PieceString, number>(), totalPlayers);
		if (verifyParameterType<string>(input, "string")) {
			for (const color of colors) {
				for (const pieceDefinition of input[color].split(",")) {
					const [piece, count = 1] = pieceDefinition.split("x").map((e, i) => (i === 1 ? Number(e) : e));
					if (typeof piece !== "string" || typeof count !== "number") continue;
					if (!/^(?:r|b|y|g).$/.test(piece)) continue;
					const pieceLetter = piece.charAt(1);
					if (verifyPieceLetter(pieceLetter)) {
						defaultBanks[color].set(createPieceFromString(piece), count);
					}
				}
			}
		}

		return defaultBanks;
	},
	serialize() {
		if (this.value.some((b) => b.size !== 0)) {
			return `'bank':(${this.value
				.map((bank) => {
					const resultingStrings: string[] = [];
					for (const [piece, count] of bank) {
						if (count === 1) {
							resultingStrings.push(piece.value);
						} else {
							resultingStrings.push(`${piece.value}x${count}`);
						}
					}

					return `'${resultingStrings.join(",")}'`;
				})
				.join(",")})`;
		} else return;
	},
	createSnapshot() {
		return this.value.map((m) => [...m.entries()].map(([pieceString, count]) => [pieceString.toObject(), count]));
	},
	loadSnapshot(snapshot) {
		this.value = snapshot.map(
			(v) => new Map(v.map(([pieceStringObject, count]) => [PieceString.fromObjectToClass(pieceStringObject), count]))
		);
	},
	getName() {
		return "Piece Banks";
	}
});

export const createPromotedFromTag = (): FENOptionsTags["promotedFrom"] => ({
	value: new Map(),
	parse(input) {
		const promotedFromMap = new Map<Coordinate, PieceLetter>();
		if (!verifyObjectType(input)) return promotedFromMap;
		for (const key in input) {
			if (!Object.prototype.hasOwnProperty.call(promotedFromMap, key)) continue;
			const parsedCoordinate = parseSingleCoordinate(key);
			const pieceLetter = input[key];
			if (!parsedCoordinate || typeof pieceLetter !== "string" || !verifyPieceLetter(pieceLetter)) continue;

			promotedFromMap.set(parsedCoordinate, pieceLetter);
		}

		return promotedFromMap;
	},
	serialize() {
		if (this.value.size === 0) return;
		const promotedFromStrings: string[] = [];
		for (const [coordinate, piece] of this.value) {
			promotedFromStrings.push(`'${convertCoordinateToPGN4(coordinate)}':'${piece}'`);
		}

		return `'promotedFrom':{${promotedFromStrings.join(",")}}`;
	},
	createSnapshot() {
		const newMap: Array<[Coordinate, PieceLetter]> = [];
		for (const [coordinate, pieceLetter] of this.value.entries()) {
			newMap.push([[...coordinate], pieceLetter]);
		}

		return newMap;
	},
	loadSnapshot(snapshot) {
		this.value.clear();
		for (const [coordinate, pieceLetter] of snapshot) {
			this.value.set([...coordinate], pieceLetter);
		}
	},
	getName() {
		return "Promoted From";
	},
	mapNewEndCoordinate(value, start, end) {
		const currentValue = this.createSnapshot();
		this.loadSnapshot(value);
		const newValue = this.createSnapshot();
		this.loadSnapshot(currentValue);

		const changedIndex = newValue.find(([c, ]) => compareCoordinates(c, start));
		if (changedIndex) changedIndex[0] = end;
		return newValue;
	}
});

export const createSetupPointsTag = (): FENOptionsTags["setupPoints"] => ({
	value: null,
	parse(input) {
		if (verifyParameterType<number>(input, "number")) {
			return input;
		} else return this.createSnapshot();
	},
	serialize() {
		if (this.value) {
			return `'setupPoints':(${this.value.join(",")})`;
		} else return;
	},
	createSnapshot() {
		return this.value ? [...this.value] : this.value;
	},
	loadSnapshot(snapshot) {
		this.value = snapshot ? [...snapshot] : snapshot;
	},
	getName() {
		return "Setup Points";
	}
});

export const createSeirawanDropsTag = (): FENOptionsTags["seirawanDrops"] => ({
	value: createTupleFromCallback(() => new Set<string>(), totalPlayers),
	parse(input) {
		const defaultValue = createTupleFromCallback(() => new Set<string>(), totalPlayers);
		if (
			Array.isArray(input) &&
			(verifyTupleType(input, totalPlayers) || verifyTupleType(input, totalPlayers + 1)) &&
			input.every<unknown[]>((v): v is unknown[] => Array.isArray(v))
		) {
			for (const color of colors) {
				const seirawanDropsArray = input[color];
				if (!seirawanDropsArray.every<string>((v): v is string => typeof v === "string")) continue;

				for (const pieceDefinition of seirawanDropsArray) {
					if (!PGN4_SYNTAX.COORDINATE_REGEX.test(pieceDefinition)) continue;
					const coordinate = parseSingleCoordinate(pieceDefinition);
					if (coordinate) {
						defaultValue[color].add(stringifyCoordinate(coordinate));
					}
				}
			}
		}

		return defaultValue;
	},
	serialize() {
		if (this.value.every((m) => m.size === 0)) return;
		return `'seirawanDrops':(${this.value
			.map((coordinates) => {
				return `(${[...coordinates].map((coord) => `'${convertCoordinateToPGN4(unstringifyCoordinate(coord))}'`).join(",")})`;
			})
			.join(",")})`;
	},
	createSnapshot() {
		return this.value.map((s) => [...s.values()]);
	},
	loadSnapshot(snapshot) {
		this.value = snapshot.map((s) => new Set(s));
	},
	getName() {
		return "Set Seirawan Drops";
	}
});
