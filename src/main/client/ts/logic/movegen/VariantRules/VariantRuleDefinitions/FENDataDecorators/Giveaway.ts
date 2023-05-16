import type { NumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { FENData } from "../../../FENData/FENData";
import type { PostMoveResults } from "../../../FENData/FENDataInterface";
import { totalPlayers } from "../../../GameInformation/GameData";
import type { PieceString } from "../../../GameInformation/GameUnits/PieceString";
import type { MoveData } from "../../../MoveTree/MoveTreeInterface";
import { VariantRule } from "../../VariantRule";
import {
	AllowedSuperClasses,
	VariantDataRules,
	VariantRuleAllowedChecks,
	variantRuleColors,
	VariantRuleHandler
} from "../../VariantRuleInterface";
import { ForcedCapture } from "../BoardDecorators/ForcedCapture";
import { StalemateOptions, stalemateOptionsValues } from "./StalemateOptions";
import { chessGlyphIndex } from "@client/fonts/chessGlyphIndex";

const tag = "giveaway";
export class Giveaway extends VariantRule<typeof FENData, typeof tag> implements VariantRuleHandler<FENData> {
	static {
		VariantRule.initVariantRule(Giveaway);
	}
	private static readonly pointsForPiece = 3;
	private static readonly stalematePoints = {
		[1]: 200,
		[2]: 400,
		[3]: 600
	};
	readonly dependencies = new Map<new (...args: unknown[]) => VariantRule<AllowedSuperClasses, keyof VariantDataRules>, unknown[]>([
		[ForcedCapture, []],
		[StalemateOptions, [stalemateOptionsValues.stalemateWins]]
	]);

	private initiallyAliveColors = totalPlayers;

	getDecoratorType() {
		return FENData;
	}
	getPublicProperties() {
		return {
			parameterValue: true,
			information: {
				name: "Giveaway",
				description: "First to lose all pieces or stalemate wins",
				tag,
				color: variantRuleColors.widespread,
				displayIcon: chessGlyphIndex.gift
			}
		} as const;
	}
	matchesPGNDeclaration(match: string) {
		return /^Giveaway$/i.test(match);
	}
	serializeToParsingForm(): string {
		return "Giveaway";
	}
	isDisabled({ variantDataRules }: VariantRuleAllowedChecks): boolean {
		return variantDataRules.taboo;
	}

	initDecoratorSettings() {
		this.decorator.fenOptions.setTag("royal", [null, null, null, null]);
		this.initiallyAliveColors = this.decorator.fenOptions
			.tag("dead")
			.map((d, i) => d || this.decorator.fenOptions.tag("resigned")[i])
			.filter(Boolean).length;

		for (const decorator of this.wrappingDecorators) decorator.initDecoratorSettings?.();
	}

	processStandardMove(moveData: MoveData): { endPiece: PieceString[] } {
		const capturedPieces = this.decorator.getCapturedPieces(moveData);
		const board = this.decorator.board.board;
		for (const capturedPiece of capturedPieces) {
			const pieceString = board[capturedPiece[0]][capturedPiece[1]];
			if (pieceString.isPiece()) {
				this.assignPoints(pieceString.color, Giveaway.pointsForPiece, true);
			}
		}

		this.callHandler("processStandardMove", arguments);
		return { endPiece: [] };
	}

	affectOptions(): PostMoveResults {
		const returnType = this.callHandler("affectOptions", arguments);
		this.decorator.fenOptions.setTag("royal", [null, null, null, null]);
		return returnType;
	}

	obtainPointsForMate(): number {
		// Checkmates do not exist, so the only scenario in which this gets called is stalemate
		const aliveColors = this.decorator.fenOptions.tag("dead").filter(Boolean).length;
		switch (aliveColors) {
			case 1:
				if (this.initiallyAliveColors === totalPlayers) {
					return Giveaway.stalematePoints[1];
				}
			// * Fallthrough
			case 2:
				if (this.initiallyAliveColors >= totalPlayers - 1) {
					return Giveaway.stalematePoints[2];
				}
			// * Fallthrough
			case 3:
				return Giveaway.stalematePoints[3];
			default:
				console.error(`Unexpected players length ${aliveColors}`);
				return 0;
		}
	}

	assignPoints(sideToMove: NumericColor, points: number, isGiveawayAssigned = false) {
		if (isGiveawayAssigned) {
			for (const decorator of this.wrappingDecorators) {
				if (decorator.assignPoints) {
					decorator.assignPoints(sideToMove, points);
					return;
				}
			}
			FENData.prototype.assignPoints.call(this.decorator, sideToMove, points);
		}
	}
}
