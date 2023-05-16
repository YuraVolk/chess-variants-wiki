import { chessGlyphIndex } from "@client/fonts/chessGlyphIndex";
import { BoardSquares, initializeBoardSquares } from "../../../../BaseInterfaces";
import { Board } from "../../../Board/Board";
import { DisplaySettings, unstringifyCoordinate } from "../../../Board/BoardInterface";
import { VariantRule } from "../../VariantRule";
import { VariantRuleAllowedChecks, variantRuleColors, VariantRuleHandler } from "../../VariantRuleInterface";
import { CaptureTheKing } from "./CaptureTheKing";

const tag = "fogOfWar";
export class FogOfWar extends VariantRule<typeof Board, typeof tag> implements VariantRuleHandler<Board> {
	static {
		VariantRule.initVariantRule(FogOfWar);
	}
	readonly dependencies = new Map([[CaptureTheKing, []]]);

	getDecoratorType() {
		return Board;
	}

	getPublicProperties() {
		return {
			parameterValue: true,
			information: {
				name: "Fog of War",
				description: "Players can only see their pieces and the squares they can legally move to",
				tag,
				color: variantRuleColors.widespread,
				displayIcon: chessGlyphIndex.fogOfWar
			}
		} as const;
	}

	matchesPGNDeclaration(match: string): boolean {
		return /^FogOfWar$/i.test(match);
	}

	serializeToParsingForm(): string {
		return "FogOfWar";
	}

	isDisabled({ variantDataRules }: VariantRuleAllowedChecks): boolean {
		return variantDataRules.taboo;
	}

	getSquareVisibility(): BoardSquares<DisplaySettings[]> {
		const currentPlayerMoves: BoardSquares<boolean> = initializeBoardSquares(() => false);
		const preGeneratedAttacks = this.decorator.preGeneratedAttacks[this.decorator.data.sideToMove];
		for (const [piece, moves] of preGeneratedAttacks.pieceMovements) {
			const startingCoordinate = unstringifyCoordinate(piece);
			currentPlayerMoves[startingCoordinate[0]][startingCoordinate[1]] = true;
			for (const { move } of moves) {
				currentPlayerMoves[move[0]][move[1]] = true;
			}
		}
		for (const drop of [...preGeneratedAttacks.pieceDrops.pawn, ...preGeneratedAttacks.pieceDrops.piece]) {
			currentPlayerMoves[drop.endCoordinates[0]][drop.endCoordinates[1]] = true;
		}

		const squareVisibility: BoardSquares<DisplaySettings[]> = this.callHandler("getSquareVisibility", arguments);
		return squareVisibility.map((r, i) =>
			r.map((v, j) => {
				if (this.decorator.board[i][j].isWall() || currentPlayerMoves[i][j]) {
					return v;
				} else {
					return [...v, DisplaySettings.Fogged];
				}
			})
		);
	}
}
