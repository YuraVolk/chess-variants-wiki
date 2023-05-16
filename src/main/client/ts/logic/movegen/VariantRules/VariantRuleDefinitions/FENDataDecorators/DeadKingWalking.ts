import type { PlayerBooleanTuple } from "@moveGeneration/Board/Board";
import { FENData } from "@moveGeneration/FENData/FENData";
import { totalPlayers, VariantType } from "@moveGeneration/GameInformation/GameData";
import { verifyNumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { createPieceFromData, deadColorIndex } from "@moveGeneration/GameInformation/GameUnits/PieceString";
import { InternalMove, InternalMoveSignature } from "@moveGeneration/MoveTree/MoveTreeInterface";
import { pieceControlConfigSettings } from "@moveGeneration/PieceControl/PieceControlInterface";
import { VariantRule } from "@moveGeneration/VariantRules/VariantRule";
import { VariantRuleAllowedChecks, variantRuleColors, VariantRuleHandler } from "@moveGeneration/VariantRules/VariantRuleInterface";

const tag = "deadKingWalking";
export class DeadKingWalking extends VariantRule<typeof FENData, typeof tag> implements VariantRuleHandler<FENData> {
	static {
		VariantRule.initVariantRule(DeadKingWalking);
	}

	getDecoratorType() {
		return FENData;
	}
	getPublicProperties() {
		return {
			parameterValue: true,
			information: {
				name: "Zombies",
				description: "Resigned players are controlled by a bot",
				tag,
				color: variantRuleColors.autogenous,
				displayIcon: ""
			}
		} as const;
	}
	matchesPGNDeclaration(match: string): boolean {
		return /^DeadKingWalking$/i.test(match);
	}
	serializeToParsingForm(): string {
		return "DeadKingWalking";
	}
	isDisabled({ variantDataRules, gameType, fenTags }: VariantRuleAllowedChecks): boolean {
		return (
			gameType === VariantType.Teams ||
			fenTags.dead.value.reduce((p, n, i) => p + Number(n || fenTags.resigned.value[i]), 0) <= totalPlayers - 1 ||
			(variantDataRules.pointsForMate !== false && variantDataRules.pointsForMate < 6)
		);
	}

	processInternalMove(internalMove: InternalMove): { stalemates: PlayerBooleanTuple } {
		if (
			internalMove.type === InternalMoveSignature.Resign ||
			internalMove.type === InternalMoveSignature.ClaimWin ||
			internalMove.type === InternalMoveSignature.Timeout
		) {
			const { sideToMove, fenOptions, board } = this.decorator;
			const dead = fenOptions.tag("dead"),
				resigned = fenOptions.tag("resigned");

			resigned[sideToMove] = true;
			dead[sideToMove] = true;

			for (const coordinate of board.getPlayerPieces()[sideToMove]) {
				const piece = board.board[coordinate[0]][coordinate[1]].piece;
				if (pieceControlConfigSettings[piece].moveGenerationSettings.isPawn) {
					board.board[coordinate[0]][coordinate[1]] = createPieceFromData(deadColorIndex, piece);
				}
			}

			const deadPlayers = dead.map((d, i) => d || resigned[i]).filter(Boolean);
			if (deadPlayers.length === totalPlayers - 1) {
				const alivePlayer = deadPlayers.findIndex((d) => !d);
				if (verifyNumericColor(alivePlayer)) {
					this.decorator.assignPoints(
						alivePlayer,
						this.decorator.countTotalPointsOnBoard().reduce((p, n, i) => p + (i === alivePlayer ? n : 0), 0)
					);
				}
			}

			return { stalemates: [false, false, false, false] };
		} else return this.callHandler("processInternalMove", arguments);
	}
}
