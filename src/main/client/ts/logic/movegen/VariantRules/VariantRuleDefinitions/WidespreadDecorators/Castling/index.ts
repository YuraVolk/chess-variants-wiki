import { Tuple, assertNonUndefined, createTuple, verifyTupleType } from "@client/ts/baseTypes";
import { getVerticalPlacementModulus, isVerticalPlacement } from "@client/ts/logic/BaseInterfaces";
import { Board } from "@moveGeneration/Board/Board";
import type { FENOptions } from "@moveGeneration/FENData/FENData";
import { totalPlayers } from "@moveGeneration/GameInformation/GameData";
import type { NumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { VariantRule } from "@moveGeneration/VariantRules/VariantRule";
import type { AllowedSuperClasses } from "@moveGeneration/VariantRules/VariantRuleInterface";

const tag = "castling";
export abstract class Castling<T extends AllowedSuperClasses> extends VariantRule<T, typeof tag> {
	protected castlingDisplacement: Tuple<[number, number], typeof totalPlayers>;
	constructor(value?: unknown) {
		super();
		if (
			Array.isArray(value) &&
			verifyTupleType(value, totalPlayers) &&
			value.every<[number, number]>(
				(v): v is [number, number] => Array.isArray(v) && verifyTupleType(v, 2) && v.every((v) => typeof v === "number")
			)
		) {
			this.castlingDisplacement = value;
		} else this.castlingDisplacement = createTuple([0, 0], totalPlayers);
	}

	protected getCastlingEndCoordinate(fenOptions: FENOptions, player: NumericColor, coordinates: number | undefined): [number, number] {
		const royalCoordinate = fenOptions.tag("royal")[player]?.[getVerticalPlacementModulus(player)];
		assertNonUndefined(coordinates);
		assertNonUndefined(royalCoordinate);
		const coordinateA = isVerticalPlacement(player) ? royalCoordinate : coordinates;
		const coordinateB = isVerticalPlacement(player) ? coordinates : royalCoordinate;
		return [coordinateA, coordinateB];
	}

	isDisabled() {
		return false;
	}

	getPublicProperties() {
		return {
			parameterValue: true,
			information: {
				name: "Castling",
				textualForm: "",
				description: "",
				tag
			}
		} as const;
	}

	matchesPGNDeclaration(match: string): boolean {
		const matchArray = match.match(/^Castling(?:=(.+))?$/i);
		if (!matchArray) return false;
		if (matchArray[1]) {
			matchArray[1].split(",").forEach((value, i) => {
				const displacement = Number(value);
				if (isNaN(displacement) || displacement <= 1) return;
				const numericValue = i % 2;
				if (numericValue !== 0 && numericValue !== 1) return;
				this.castlingDisplacement[i][numericValue] = displacement;
			});
		}

		return true;
	}

	serializeToParsingForm(): string {
		if (this.getDecoratorType() === Board) {
			if (this.castlingDisplacement.some((v) => v[0] || v[1])) {
				return `Castling=${this.castlingDisplacement.map((v) => v.join(",")).join(",")}`;
			} else return "Castling";
		} else return "";
	}
}
