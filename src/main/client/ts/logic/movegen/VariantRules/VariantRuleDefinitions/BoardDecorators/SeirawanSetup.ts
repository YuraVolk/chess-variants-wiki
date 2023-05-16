import type { Coordinate } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { Board } from "../../../Board/Board";
import { stringifyCoordinate } from "../../../Board/BoardInterface";
import type { PostMoveResults } from "../../../FENData/FENDataInterface";
import { colors } from "../../../GameInformation/GameData";
import { DroppingMove, Move, MoveData, verifyRequiredMove, verifyStandardMove } from "../../../MoveTree/MoveTreeInterface";
import { VariantRule } from "../../VariantRule";
import { VariantRuleAllowedChecks, VariantRuleHandler, variantRuleColors } from "../../VariantRuleInterface";
import { chessGlyphIndex } from "@client/fonts/chessGlyphIndex";

const tag = "seirawanSetup";
export class SeirawanSetup extends VariantRule<typeof Board, typeof tag> implements VariantRuleHandler<Board> {
	static {
		VariantRule.initVariantRule(SeirawanSetup);
	}

	getDecoratorType() {
		return Board;
	}
	getPublicProperties() {
		return {
			parameterValue: true,
			information: {
				name: "Seirawan Setup",
				description:
					"When moving a piece for the first time, a piece from the bank can be placed on the vacated square, as part of the move",
				tag,
				color: variantRuleColors.extending,
				displayIcon: chessGlyphIndex.pieceMeal
			}
		} as const;
	}
	matchesPGNDeclaration(match: string) {
		return /^SeirawanSetup$/i.test(match);
	}
	serializeToParsingForm(): string {
		return "SeirawanSetup";
	}
	isDisabled({ variantDataRules }: VariantRuleAllowedChecks): boolean {
		return variantDataRules.crazyhouse || variantDataRules.setupChess !== false;
	}

	initDecoratorSettings() {
		const fenOptions = this.decorator.data.fenOptions;
		const areBanksEnabled = fenOptions.tag("areBanksEnabled"),
			dead = fenOptions.tag("dead"),
			seirawanDrops = fenOptions.tag("seirawanDrops"),
			bank = fenOptions.tag("bank");
		for (const color of colors) {
			if (!dead[color] && seirawanDrops[color].size > 0 && bank[color].size > 0) {
				areBanksEnabled[color] = true;
			}
		}

		for (const decorator of this.wrappingDecorators) decorator.initDecoratorSettings?.();
	}

	makeMove(move: Move): PostMoveResults {
		const { fenOptions, sideToMove } = this.decorator.data;
		const areBanksEnabled = fenOptions.tag("areBanksEnabled"),
			seirawanDrops = fenOptions.tag("seirawanDrops"),
			bank = fenOptions.tag("bank");
		let disabledIndex = false;
		if (verifyStandardMove(move[0])) {
			seirawanDrops[sideToMove].delete(stringifyCoordinate(move[0].startCoordinates));

			if (seirawanDrops[sideToMove].size === 0 || bank[sideToMove].size === 0) {
				disabledIndex = true;
			}
		}

		const returnValue = this.callHandler("makeMove", arguments);
		if (disabledIndex) {
			seirawanDrops[sideToMove].clear();
			bank[sideToMove].clear();
			areBanksEnabled[sideToMove] = false;
		}

		return returnValue;
	}

	getLegalMoves(i: number, j: number): MoveData[] {
		const { fenOptions, sideToMove } = this.decorator.data;
		const seirawanDrops = fenOptions.tag("seirawanDrops"),
			bank = fenOptions.tag("bank");

		const startCoordinates: Coordinate = [i, j];
		const stringifiedCoordinate = stringifyCoordinate(startCoordinates);
		const coordinate = [...seirawanDrops[sideToMove]].find((c) => c === stringifiedCoordinate);

		const validateWithDrops = bank[sideToMove].size !== 0 && coordinate !== undefined;
		const moves = this.callHandler("getLegalMoves", arguments);

		const continuations: DroppingMove[] = [];
		for (const piece of bank[sideToMove].keys()) {
			continuations.push({ piece, endCoordinates: startCoordinates });
		}

		if (validateWithDrops && verifyRequiredMove(continuations)) {
			for (const move of moves) {
				move.nextChainedMoves = continuations;
			}
		}

		return moves;
	}
}
