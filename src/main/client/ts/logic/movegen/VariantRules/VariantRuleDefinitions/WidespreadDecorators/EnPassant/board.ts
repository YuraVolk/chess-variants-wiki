import { Board } from "@moveGeneration/Board/Board";
import { EnPassant } from ".";
import type { VariantRuleHandler } from "@moveGeneration/VariantRules/VariantRuleInterface";
import { VariantRule } from "@moveGeneration/VariantRules/VariantRule";
import { SpecialMoveGenerationSettings, compareCoordinates } from "@moveGeneration/Board/BoardInterface";
import { MoveData, SpecialMove } from "@moveGeneration/MoveTree/MoveTreeInterface";
import { pieceControlConfigSettings } from "@moveGeneration/PieceControl/PieceControlInterface";
import type { Coordinate, NumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";

export class BoardEnPassant extends EnPassant<typeof Board> implements VariantRuleHandler<Board> {
	static {
		VariantRule.initVariantRule(BoardEnPassant);
	}

	getDecoratorType() {
		return Board;
	}

	private getAvailableEnPassantCaptures(baseColor: NumericColor): Coordinate[] {
		const coordinates: Coordinate[] = [];
		this.decorator.data.fenOptions.tag("enPassant").forEach((enPassant, i) => {
			if (i === baseColor) return;
			if (enPassant) coordinates.push(enPassant[0]);
		});

		return coordinates.map((e) => [...e]);
	}

	getSpecialMoves(parameters: SpecialMoveGenerationSettings): MoveData[] {
		const { i, j, baseColor, pieceLetter } = parameters;
		const specialMoves: MoveData[] = [];
		if (pieceControlConfigSettings[pieceLetter].moveGenerationSettings.isPawn) {
			const enPassantCaptures = this.getAvailableEnPassantCaptures(baseColor);
			const pawnAttacks = this.decorator.controls[pieceLetter]()
				.setBaseImmunePieces(this.decorator.gameType.getBaseColors(baseColor))
				.setBoard(this.decorator.board)
				.setCoordinates(i, j)
				.setColor(baseColor)
				.constructPieceControl()
				.rayGenJumpingAttacks();
			if (enPassantCaptures.length !== 0) {
				for (const attack of pawnAttacks) {
					for (const enP of enPassantCaptures) {
						if (compareCoordinates(attack.move, enP)) {
							const snapshot = this.decorator.createSnapshot();
							const move: [MoveData] = [
								{
									startCoordinates: [i, j],
									endCoordinates: attack.move,
									specialType: SpecialMove.EnPassant,
									isIrreversible: attack.irreversible
								}
							];

							this.decorator.makeMove(move, true);
							this.decorator.pregenerateAttacks();
							if (!this.decorator.isKingInCheck(baseColor)) specialMoves.push(move[0]);
							this.decorator.loadSnapshot(snapshot);
						}
					}
				}
			}
		}

		return [...specialMoves, ...this.callHandler("getSpecialMoves", arguments)];
	}
}
