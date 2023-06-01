import { chessGlyphIndex } from "@client/fonts/chessGlyphIndex";
import { Board } from "../../../Board/Board";
import { stringifyCoordinate } from "../../../Board/BoardInterface";
import type { PostMoveResults } from "../../../FENData/FENDataInterface";
import { InternalMoveSignature } from "../../../MoveTree/MoveTreeInterface";
import { VariantRule } from "../../VariantRule";
import { variantRuleColors, VariantRuleHandler } from "../../VariantRuleInterface";

const tag = "barePieceRule";
export class BarePieceRule extends VariantRule<typeof Board, typeof tag> implements VariantRuleHandler<Board> {
	static {
		VariantRule.initVariantRule(BarePieceRule);
	}

	getDecoratorType() {
		return Board;
	}

	getPublicProperties() {
		return {
			parameterValue: true,
			information: {
				name: "Bare piece rule",
				description: "Players with only one remaining piece are forfeit",
				tag,
				color: variantRuleColors.minor,
				displayIcon: chessGlyphIndex.filter
			}
		} as const;
	}

	matchesPGNDeclaration(match: string): boolean {
		return /^BarePieceLoses$/i.test(match);
	}

	isDisabled(): boolean {
		return false;
	}

	getInsufficientMaterialData() {
		return {
			isPartiallyDisabled: true,
			isDisabled: false
		} as const;
	}

	serializeToParsingForm(): string {
		return "BarePieceLoses";
	}

	makeMove(): PostMoveResults {
		const {
			data: { sideToMove, fenOptions },
			board,
			preGeneratedAttacks
		} = this.decorator;
		const results = this.callHandler("makeMove", arguments);

		const playerPieces = this.decorator.getPlayerPieces()[sideToMove];
		if (playerPieces.length === 1 && !fenOptions.tag("resigned")[sideToMove]) {
			const pieceMovements = preGeneratedAttacks[sideToMove].pieceMovements.get(stringifyCoordinate(playerPieces[0]));
			if (pieceMovements) {
				for (const { move: coordinate } of pieceMovements) {
					if (board[coordinate[0]][coordinate[1]].isPiece()) {
						return results;
					}
				}

				return this.decorator.makeMove([{ type: InternalMoveSignature.Resign }]);
			}
		}

		return results;
	}
}
