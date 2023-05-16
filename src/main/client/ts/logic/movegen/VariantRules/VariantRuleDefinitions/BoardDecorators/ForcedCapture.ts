import type { NumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { Board } from "../../../Board/Board";
import { stringifyCoordinate } from "../../../Board/BoardInterface";
import type { MoveData } from "../../../MoveTree/MoveTreeInterface";
import { VariantRule } from "../../VariantRule";
import { variantRuleColors, VariantRuleHandler } from "../../VariantRuleInterface";
import { chessGlyphIndex } from "@client/fonts/chessGlyphIndex";

const tag = "forcedCapture";
export class ForcedCapture extends VariantRule<typeof Board, typeof tag> implements VariantRuleHandler<Board> {
	static {
		VariantRule.initVariantRule(ForcedCapture);
	}

	getDecoratorType() {
		return Board;
	}

	getPublicProperties() {
		return {
			parameterValue: true,
			information: {
				name: "Forced Capture",
				description: "Capturing is always compulsory",
				tag,
				color: variantRuleColors.widespread,
				displayIcon: chessGlyphIndex.target
			}
		} as const;
	}

	matchesPGNDeclaration(match: string) {
		return /^ForcedCapture$/i.test(match);
	}

	serializeToParsingForm(): string {
		return "ForcedCapture";
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

	pregenerateAttacks(): void {
		const {
			data: { sideToMove },
			board,
			preGeneratedAttacks
		} = this.decorator;
		this.callHandler("pregenerateAttacks", arguments);

		for (const piece of this.decorator.getPlayerPieces()[sideToMove]) {
			const moves = preGeneratedAttacks[sideToMove].pieceMovements.get(stringifyCoordinate(piece));
			if (moves) {
				for (const { move: coordinate } of moves) {
					if (board[coordinate[0]][coordinate[1]].isPiece()) {
						preGeneratedAttacks[sideToMove].variantRuleCache.hasCaptures = true;
						return;
					}
				}
			}
		}

		preGeneratedAttacks[sideToMove].variantRuleCache.hasCaptures = false;
	}

	isTheMoveLegal(_: NumericColor, moveData: MoveData): boolean {
		const isCapturing = this.decorator.data.getCapturedPieces(moveData).length > 0;
		if (!isCapturing && this.decorator.preGeneratedAttacks[this.decorator.data.sideToMove].variantRuleCache.hasCaptures) return false;
		return this.callHandler("isTheMoveLegal", arguments);
	}
}
