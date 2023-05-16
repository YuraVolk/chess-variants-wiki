import type { Tuple } from "@client/ts/baseTypes";
import { compareCoordinates } from "../../../Board/BoardInterface";
import { FENData } from "../../../FENData/FENData";
import { PostMoveResults } from "../../../FENData/FENDataInterface";
import { colors, totalPlayers, VariantType } from "../../../GameInformation/GameData";
import { createPieceFromData } from "../../../GameInformation/GameUnits/PieceString";
import { pieceControlConfigSettings } from "../../../PieceControl/PieceControlInterface";
import { VariantRule } from "../../VariantRule";
import { VariantRuleAllowedChecks, variantRuleColors, VariantRuleHandler } from "../../VariantRuleInterface";
import { DeadKingWalking } from "./DeadKingWalking";
import { chessGlyphIndex } from "@client/fonts/chessGlyphIndex";

const tag = "takeover";
export class Takeover extends VariantRule<typeof FENData, typeof tag> implements VariantRuleHandler<FENData> {
	static {
		VariantRule.initVariantRule(Takeover);
	}
	readonly dependencies = new Map([[DeadKingWalking, []]]);

	getDecoratorType() {
		return FENData;
	}
	getPublicProperties() {
		return {
			parameterValue: true,
			information: {
				name: "Takeover",
				description: "Checkmate players to take control of their pieces",
				tag,
				color: variantRuleColors.phased,
				displayIcon: chessGlyphIndex.exchange
			}
		} as const;
	}
	matchesPGNDeclaration(match: string) {
		return /^Takeover$/i.test(match);
	}
	serializeToParsingForm(): string {
		return "Takeover";
	}
	isDisabled({ gameType }: VariantRuleAllowedChecks): boolean {
		return gameType === VariantType.Teams;
	}

	affectOptions(): PostMoveResults {
		const sideToMove = this.decorator.sideToMove,
			detectedPieces = this.decorator.board.getPlayerPieces();
		const results = this.callHandler("affectOptions", arguments);
		for (const color of colors) {
			if (!results.checkmates[color]) continue;
			for (const piece of detectedPieces[sideToMove]) {
				const pieceString = this.decorator.board.board[piece[0]][piece[1]];
				if (!pieceString.isDead() || pieceControlConfigSettings[pieceString.piece].moveGenerationSettings.isPawn) continue;
				this.decorator.board.board[piece[0]][piece[1]] = createPieceFromData(sideToMove, pieceString.piece);
			}
		}

		return results;
	}

	countTotalPointsOnBoard(): [number, number, number, number] {
		const zombieImmune = this.decorator.fenOptions.tag("zombieImmune"),
			royals = this.decorator.fenOptions.tag("royal");
		const resultingPoints: Tuple<number, typeof totalPlayers> = [0, 0, 0, 0];
		this.decorator.board.getPlayerPieces().forEach((army, color) => {
			if (zombieImmune[color]) return;
			const royal = royals[color];
			for (const coordinate of army) {
				if (royal && compareCoordinates(coordinate, royal)) {
					resultingPoints[color] += this.decorator.obtainPointsForMate();
				} else {
					const piece = this.decorator.board.board[coordinate[0]][coordinate[1]].piece;
					resultingPoints[color] += pieceControlConfigSettings[piece].points.singlesPoints;
				}
			}
		});

		return resultingPoints;
	}
}
