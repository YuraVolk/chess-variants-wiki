import { boardDimension } from "@moveGeneration/GameInformation/GameData";
import type { Coordinate } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { pieceControlConfigSettings } from "@moveGeneration/PieceControl/PieceControlInterface";
import { FENData } from "../../../FENData/FENData";
import type { MoveData } from "../../../MoveTree/MoveTreeInterface";
import { VariantRule } from "../../VariantRule";
import { variantRuleColors, VariantRuleHandler } from "../../VariantRuleInterface";
import { RoyalsCannotCapture } from "../PieceControlDecorators/RoyalsCannotCapture";
import { chessGlyphIndex } from "@client/fonts/chessGlyphIndex";

const tag = "atomic";
export class Atomic extends VariantRule<typeof FENData, typeof tag> implements VariantRuleHandler<FENData> {
	static {
		VariantRule.initVariantRule(Atomic);
	}
	readonly dependencies = new Map([[RoyalsCannotCapture, []]]);

	static readonly atomicCoordinates: Coordinate[] = [
		[-1, -1],
		[-1, 0],
		[0, -1],
		[-1, 1],
		[1, -1],
		[1, 0],
		[0, 1],
		[1, 1]
	];

	getDecoratorType() {
		return FENData;
	}
	getPublicProperties() {
		return {
			parameterValue: true,
			information: {
				name: "Atomic",
				description: "Captures cause all surrounding pieces except pawns to explode",
				tag,
				color: variantRuleColors.extending,
				displayIcon: chessGlyphIndex.atomic
			}
		} as const;
	}
	matchesPGNDeclaration(match: string): boolean {
		return /^Atomic$/i.test(match);
	}
	serializeToParsingForm(): string {
		return "Atomic";
	}
	isDisabled(): boolean {
		return false;
	}

	isComplexEvaluation(): boolean {
		return true;
	}

	getCapturedPieces(moveData: MoveData): Coordinate[] {
		const baseCoordinates = this.callHandler("getCapturedPieces", arguments);
		const addCoordinate = (disI: number, disJ: number) => {
			const coordinateI = moveData.endCoordinates[0] + disI;
			const coordinateJ = moveData.endCoordinates[1] + disJ;
			if (coordinateI >= 0 && coordinateI <= boardDimension && coordinateJ >= 0 && coordinateJ <= boardDimension) {
				const pieceString = this.decorator.board.board[coordinateI][coordinateJ];
				if (
					(pieceString.isPiece() || pieceString.isDead()) &&
					!pieceControlConfigSettings[pieceString.piece].moveGenerationSettings.isPawn
				) {
					baseCoordinates.push([coordinateI, coordinateJ]);
				}
			}
		};

		if (baseCoordinates.length !== 0) {
			for (const [i, j] of Atomic.atomicCoordinates) {
				addCoordinate(i, j);
			}
			baseCoordinates.push([...moveData.startCoordinates]);
		}

		return baseCoordinates;
	}
}
