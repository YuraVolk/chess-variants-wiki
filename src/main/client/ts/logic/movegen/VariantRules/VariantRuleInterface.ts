import type { FunctionType, Tuple } from "@client/ts/baseTypes";
import { createHexColor, IndexedColor } from "@client/ts/interfaces/Colors";
import type { FENOptionsTags } from "@moveGeneration/FENData/FENOptions/FENOptionsTagsInterface";
import type { Coordinate } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import type { Board } from "../Board/Board";
import type { FENData } from "../FENData/FENData";
import type { totalPlayers, VariantType } from "../GameInformation/GameData";
import type { PieceControl } from "../PieceControl/PieceControl";
import type { PieceLetter } from "../PieceControl/PieceControlInterface";
import type { CustomStalemateValue } from "./VariantRuleDefinitions/FENDataDecorators/StalemateOptions";
import type { StripPieceStringObjects } from "@moveGeneration/MoveTree/MoveTreeInterface";

export interface VariantHandlerTarget<C extends AllowedHandlerClasses> {
	__baseClass: C;
	initDecoratorSettings(): void;
}

export type FunctionProperties<T> = Pick<T, { [K in keyof T]: T[K] extends FunctionType ? K : never }[keyof T]>;
export type AllowedHandlerClasses = Board | FENData | PieceControl;
export type AllowedSuperClasses = typeof Board | typeof FENData | typeof PieceControl;

export type VariantRuleHandler<C extends AllowedHandlerClasses> = {
	[K in keyof FunctionProperties<C>]?: C[K];
};

interface BaseVariantRuleInformation<K extends keyof VariantDataRules> {
	name: string;
	description: string;
	tag: K;
}
interface TextualVariantRuleInformation<K extends keyof VariantDataRules> extends BaseVariantRuleInformation<K> {
	textualForm: string;
	color?: never;
	displayIcon?: never;
}
interface StandardVariantRuleInformation<K extends keyof VariantDataRules> extends BaseVariantRuleInformation<K> {
	textualForm?: never;
	color: IndexedColor;
	displayIcon: string;
}
export type VariantRuleInformation<K extends keyof VariantDataRules> =
	| Readonly<StandardVariantRuleInformation<K>>
	| Readonly<TextualVariantRuleInformation<K>>;

export interface VariantRuleAllowedChecks {
	readonly variantDataRules: VariantDataRules | StripPieceStringObjects<VariantDataRules>;
	readonly gameType: VariantType;
	readonly fenTags: FENOptionsTags;
}

export interface VariantDataRules {
	alternativeTeams: number | false;
	blindfold: boolean;
	captureTheKing: boolean;
	chess960: number | false;
	crazyhouse: boolean;
	ghostboard: boolean;
	paradigmChess30: number | false;
	taboo: boolean;
	enPassant: boolean;
	fatalCapture: boolean;
	piecesGoToBanks: boolean;
	anyCapture: boolean;
	promotionPieces: PieceLetter[] | false;
	promotionRank: number | false;
	sideways: boolean;
	stonewall: boolean;
	torpedo: boolean;
	oppositeSideCastling: boolean;
	setupChess: number | false;
	piecesFaceCenter: boolean;
	royalsCannotCapture: boolean;
	seirawanSetup: boolean;
	atomic: boolean;
	fogOfWar: boolean;
	anonymous: boolean;
	semiAnonymous: boolean;
	stalemateOptions: CustomStalemateValue | undefined;
	forcedCapture: boolean;
	giveaway: boolean;
	allowPassing: boolean;
	pointsForMate: number | false;
	takeover: boolean;
	kingOfTheHill: Coordinate[] | false;
	barePieceRule: boolean;
	duckChess: boolean;
	playForMate: boolean;
	oppositeMultiplier: number | false;
	nCheck: Tuple<number, typeof totalPlayers> | false;
	selfCheck: boolean;
	fiftyMoveRule: number | false;
	threefoldRepetition: number | false;
	selfPartner: boolean;
	deadKingWalking: boolean;
	castling: boolean;
}

export const variantRuleColors = {
	minor: createHexColor("#e01492"),
	visual: createHexColor("#ad5709"),
	autogenous: createHexColor("#f2791e"),
	metadata: createHexColor("#89a5d3"),
	startingPosition: createHexColor("#7030a0"),
	extending: createHexColor("#fbaa07"),
	widespread: createHexColor("#d40c0c"),
	pointsAlternation: createHexColor("#00b0f0"),
	phased: createHexColor("#00b050")
} as const;
