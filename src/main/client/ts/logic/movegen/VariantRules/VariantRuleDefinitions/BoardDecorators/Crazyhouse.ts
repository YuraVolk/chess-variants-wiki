import type { DroppingMove } from "../../../MoveTree/MoveTreeInterface";
import { Board } from "../../../Board/Board";
import { boardDimension } from "../../../GameInformation/GameData";
import type { PieceString } from "../../../GameInformation/GameUnits/PieceString";
import { VariantRule } from "../../VariantRule";
import { VariantRuleHandler, variantRuleColors } from "../../VariantRuleInterface";
import { pieceControlConfigSettings } from "@moveGeneration/PieceControl/PieceControlInterface";
import { FiftyMoveRule } from "../FENDataDecorators/FiftyMoveRule";
import { isVerticalPlacement } from "@client/ts/logic/BaseInterfaces";
import { chessGlyphIndex } from "@client/fonts/chessGlyphIndex";

const tag = "crazyhouse";
export class Crazyhouse extends VariantRule<typeof Board, typeof tag> implements VariantRuleHandler<Board> {
	static {
		VariantRule.initVariantRule(Crazyhouse);
	}
	readonly dependencies = new Map([[FiftyMoveRule, [Infinity]]]);

	getDecoratorType() {
		return Board;
	}

	getPublicProperties() {
		return {
			parameterValue: true,
			information: {
				name: "Crazyhouse",
				description: "You can drop pieces from banks",
				tag,
				color: variantRuleColors.extending,
				displayIcon: chessGlyphIndex.crazyhouse
			}
		} as const;
	}

	matchesPGNDeclaration(match: string): boolean {
		return /^Crazyhouse$/i.test(match);
	}

	serializeToParsingForm(): string {
		return "Crazyhouse";
	}

	isDisabled(): boolean {
		return false;
	}

	getInsufficientMaterialData() {
		return {
			isPartiallyDisabled: false,
			isDisabled: true
		} as const;
	}

	initDecoratorSettings() {
		this.decorator.data.fenOptions.setTag("areBanksEnabled", [true, true, true, true]);
		for (const decorator of this.wrappingDecorators) decorator.initDecoratorSettings?.();
	}

	getDroppingMoves(piece: PieceString, color = this.decorator.data.sideToMove): DroppingMove[] {
		if (piece.color !== color) return [];
		const royal = this.decorator.data.fenOptions.tag("royal")[color];
		if (royal && this.decorator.preGeneratedAttacks[color].hoppingPieces[royal[0]][royal[1]]) return [];

		const isPawn = pieceControlConfigSettings[piece.piece].moveGenerationSettings.isPawn;
		const resultingMoveDrops: DroppingMove[] = [];

		const isRY = isVerticalPlacement(color);
		const pawnPromotionRank = this.decorator.variantData.promotionRank === false ? -1 : this.decorator.variantData.promotionRank;
		const pawnBaseRank = this.decorator.data.fenOptions.tag("pawnBaseRank");

		for (let i = 0; i < boardDimension; i++) {
			if (isPawn && isRY && (pawnPromotionRank === i || pawnBaseRank === i)) {
				continue;
			}
			for (let j = 0; j < boardDimension; j++) {
				if (isPawn && !isRY && (pawnPromotionRank === j || pawnBaseRank === j)) {
					continue;
				}
				const square = this.decorator.board[i][j];
				if (!square.isEmpty()) continue;

				resultingMoveDrops.push({ piece, endCoordinates: [i, j] });
			}
		}

		if (this.decorator.isKingInCheck(color)) {
			return resultingMoveDrops.filter((moveDrop) => {
				const { checks, checkmates } = this.decorator.makeMove([moveDrop], true);
				return !checks[color] || checkmates[color] || this.decorator.isKingInCheck(color);
			});
		} else {
			return resultingMoveDrops;
		}
	}
}
