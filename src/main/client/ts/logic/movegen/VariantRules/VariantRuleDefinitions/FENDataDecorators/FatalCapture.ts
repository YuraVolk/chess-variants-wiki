import { createTuple } from "../../../../../baseTypes";
import { FENData } from "../../../FENData/FENData";
import type { PostMoveResults } from "../../../FENData/FENDataInterface";
import { totalPlayers } from "../../../GameInformation/GameData";
import { createPieceFromData, deadColorIndex } from "../../../GameInformation/GameUnits/PieceString";
import { VariantRule } from "../../VariantRule";
import { variantRuleColors, VariantRuleHandler } from "../../VariantRuleInterface";
import { RoyalsCannotCapture } from "../PieceControlDecorators/RoyalsCannotCapture";
import { pieceControlConfigSettings } from "@moveGeneration/PieceControl/PieceControlInterface";
import { MoveComponent, verifyStandardMove } from "../../../MoveTree/MoveTreeInterface";
import type { Coordinate } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { chessGlyphIndex } from "@client/fonts/chessGlyphIndex";

const tag = "fatalCapture";
export class FatalCapture extends VariantRule<typeof FENData, typeof tag> implements VariantRuleHandler<FENData> {
	static {
		VariantRule.initVariantRule(FatalCapture);
	}
	readonly dependencies = new Map([[RoyalsCannotCapture, []]]);

	getDecoratorType() {
		return FENData;
	}
	getPublicProperties() {
		return {
			parameterValue: true,
			information: {
				name: "Fatal Capture",
				description: "Pieces (but not pawns) die when they capture",
				tag,
				color: variantRuleColors.extending,
				displayIcon: chessGlyphIndex.trashBin
			}
		} as const;
	}
	matchesPGNDeclaration(match: string): boolean {
		return /^FatalCapture$/i.test(match);
	}
	serializeToParsingForm(): string {
		return "FatalCapture";
	}
	isDisabled(): boolean {
		return false;
	}

	affectOptions(move: MoveComponent): PostMoveResults {
		let endCaptureCoordinates: Coordinate | undefined;
		if (verifyStandardMove(move)) {
			const {
				startCoordinates: [startI, startJ],
				endCoordinates: [endI, endJ]
			} = move;
			const isCapture = this.decorator.board.board[endI][endJ].isPiece();
			const royal = this.decorator.fenOptions.tag("royal")[this.decorator.sideToMove];
			if (royal && startI === royal[0] && startJ === royal[1] && isCapture) {
				return {
					checkmates: this.decorator.board.gameType.getBaseColors(this.decorator.sideToMove),
					checks: createTuple(false, totalPlayers),
					stalemates: createTuple(false, totalPlayers)
				};
			}

			endCaptureCoordinates = isCapture ? move.endCoordinates : undefined;
		}

		const returnType = this.callHandler("affectOptions", arguments);
		if (endCaptureCoordinates) {
			const pieceString = this.decorator.board.board[endCaptureCoordinates[0]][endCaptureCoordinates[1]];
			if (!pieceControlConfigSettings[pieceString.piece].moveGenerationSettings.isPawn) {
				this.decorator.board.board[endCaptureCoordinates[0]][endCaptureCoordinates[1]] = createPieceFromData(
					deadColorIndex,
					this.decorator.board.board[endCaptureCoordinates[0]][endCaptureCoordinates[1]].piece
				);
			}
		}

		return returnType;
	}
}
