import { FENData } from "@moveGeneration/FENData/FENData";
import { Castling } from ".";
import type { VariantRuleHandler } from "@moveGeneration/VariantRules/VariantRuleInterface";
import { VariantRule } from "@moveGeneration/VariantRules/VariantRule";
import type { Board } from "@moveGeneration/Board/Board";
import type { Tuple } from "@client/ts/baseTypes";
import { boardDimension, totalPlayers } from "@moveGeneration/GameInformation/GameData";
import { getVerticalPlacementModulus, getHorizontalPlacementModulus } from "@client/ts/logic/BaseInterfaces";

export class FENDataCastling extends Castling<typeof FENData> implements VariantRuleHandler<FENData> {
	static {
		VariantRule.initVariantRule(FENDataCastling);
	}

	getDecoratorType() {
		return FENData;
	}

	private extractDimensions(): Tuple<number, typeof totalPlayers> {
		let [dimensionRY, dimensionBG] = this.decorator.fenOptions.tag("dim");
		if (!this.decorator.fenOptions.tag("noCorners")) {
			if (dimensionRY > 8) dimensionRY = 8;
			if (dimensionBG > 8) dimensionBG = 8;
		}
		return [dimensionRY, dimensionBG, dimensionRY, dimensionBG];
	}

	injectBoard(board: Board): void {
		const dimensions = this.extractDimensions();
		const royalRanks = this.decorator.fenOptions.tag("royal").map((r, i) => (r ? r[getVerticalPlacementModulus(i)] : r));
		const royalCoordinates = this.decorator.fenOptions.tag("royal").map((r, i) => (r ? r[getHorizontalPlacementModulus(i)] : r));
		const kingsideCastlePieceCoordinate: number[] = [],
			queensideCastlePieceCoordinate: number[] = [];

		const boardSquares = board.board,
			castleWith = this.decorator.fenOptions.tag("castleWith");
		for (let i = 0; i < totalPlayers; i++) {
			const royalCoordinateI = royalCoordinates[i];
			const royalRanksI = royalRanks[i];
			if (royalCoordinateI === null || royalRanksI === null) {
				kingsideCastlePieceCoordinate.push(-1);
				queensideCastlePieceCoordinate.push(-1);
				continue;
			}

			const condition = i % 2 === 0;
			for (let j = royalCoordinateI; j < boardDimension; j++) {
				const pieceString = boardSquares[condition ? royalRanksI : j][condition ? j : royalRanksI];
				if (!pieceString.isEmpty() && pieceString.piece === castleWith) {
					kingsideCastlePieceCoordinate.push(j);
					break;
				} else if (j === boardDimension - 1) {
					kingsideCastlePieceCoordinate.push(-1);
				}
			}

			for (let j = royalCoordinateI; j > -1; j--) {
				const pieceString = boardSquares[condition ? royalRanksI : j][condition ? j : royalRanksI];
				if (!pieceString.isEmpty() && pieceString.piece === castleWith) {
					queensideCastlePieceCoordinate.push(j);
					break;
				} else if (j === 0) {
					queensideCastlePieceCoordinate.push(-1);
				}
			}
		}

		for (let i = 0; i < totalPlayers; i++) {
			const royalCoordinate = royalCoordinates[i];
			if (royalCoordinate === null) continue;

			try {
				if (kingsideCastlePieceCoordinate[i] === -1) {
					this.decorator.fenOptions.tag("castleKingside")[i] = false;
				} else {
					const d = this.castlingDisplacement[i][0] || dimensions[i] - 6 < 1 ? 1 : dimensions[i] - 6;
					const kArr = [...Array(d).keys()];
					const endCoordinates = royalCoordinate + d;
					const castlingData = {
						endCoordinates,
						checkSquares: kArr.map((j) => j + royalCoordinate + 1),
						pieceCoordinates: kingsideCastlePieceCoordinate[i],
						pieceEndCoordinates: endCoordinates - 1
					};
					if (royalCoordinate <= 6) {
						this.decorator.fenOptions.castlingQueensideData[i] = castlingData;
					} else {
						this.decorator.fenOptions.castlingKingsideData[i] = castlingData;
					}
				}
			} catch {
				this.decorator.fenOptions.tag("castleKingside")[i] = false;
			}
			
			try {
				if (queensideCastlePieceCoordinate[i] === -1) {
					this.decorator.fenOptions.tag("castleQueenside")[i] = false;
				} else {
					const d = this.castlingDisplacement[i][1] || dimensions[i] - 6 < 1 ? 1 : dimensions[i] - 6;
					const qArr = [...Array(d).keys()];
					const endCoordinates = royalCoordinate - d;
					const castlingData = {
						endCoordinates,
						checkSquares: royalCoordinate <= 6 ? qArr.map((j) => j + royalCoordinate - 2) : qArr.map((j) => j + royalCoordinate - 3),
						pieceCoordinates: queensideCastlePieceCoordinate[i],
						pieceEndCoordinates: endCoordinates + 1
					};
					if (royalCoordinate <= 6) {
						this.decorator.fenOptions.castlingKingsideData[i] = castlingData;
					} else {
						this.decorator.fenOptions.castlingQueensideData[i] = castlingData;
					}
				}
			} catch {
				this.decorator.fenOptions.tag("castleQueenside")[i] = false;
			}
		}

		for (const decorator of this.wrappingDecorators) decorator.injectBoard?.(board);
	}
}
