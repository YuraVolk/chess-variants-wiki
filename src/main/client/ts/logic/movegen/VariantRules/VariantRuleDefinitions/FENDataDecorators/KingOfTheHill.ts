import { compareArrays } from "@client/ts/utils/ArrayUtils";
import { compareCoordinates } from "../../../Board/BoardInterface";
import { FENData } from "../../../FENData/FENData";
import { PostMoveResults } from "../../../FENData/FENDataInterface";
import { colors, convertCoordinateToPGN4, getPlayerNameFromColor } from "../../../GameInformation/GameData";
import { InternalMoveSignature } from "../../../MoveTree/MoveTreeInterface";
import { VariantRule } from "../../VariantRule";
import { variantRuleColors, VariantRuleHandler } from "../../VariantRuleInterface";
import type { Coordinate } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { parseSingleCoordinate } from "@client/ts/logic/utils/Tags/Utils";
import { chessGlyphIndex } from "@client/fonts/chessGlyphIndex";

const tag = "kingOfTheHill";
export class KingOfTheHill extends VariantRule<typeof FENData, typeof tag> implements VariantRuleHandler<FENData> {
	static {
		VariantRule.initVariantRule(KingOfTheHill);
	}
	private static readonly defaultCoordinates: Coordinate[] = [
		[7, 7],
		[7, 6],
		[6, 7],
		[6, 6]
	];
	private static readonly defaultRoyal = "K";

	private hillSquares: Coordinate[];

	constructor(hillSquares?: unknown) {
		super();
		if (
			Array.isArray(hillSquares) &&
			hillSquares.every<Coordinate>((c): c is Coordinate => Array.isArray(c) && c.length === 2 && c.every((n) => typeof n === "number"))
		) {
			this.hillSquares = hillSquares;
		} else {
			this.hillSquares = KingOfTheHill.defaultCoordinates;
		}
	}

	getDecoratorType() {
		return FENData;
	}
	getPublicProperties() {
		return {
			parameterValue: this.hillSquares,
			information: {
				name: "King of the Hill",
				description: "A king reaching the hill will checkmate all opponents",
				tag,
				color: variantRuleColors.autogenous,
				displayIcon: chessGlyphIndex.kingOfTheHill
			}
		} as const;
	}
	matchesPGNDeclaration(match: string): boolean {
		const matchArray = match.toLowerCase().match(/^KotH(?:=(.+))?$/i);
		if (matchArray) {
			if (matchArray[1]) {
				const coordinatesArray: Coordinate[] = [];
				const presumedOption = matchArray[1].split(",");
				for (const coordinate of presumedOption) {
					const parsedCoordinate = parseSingleCoordinate(coordinate);
					if (parsedCoordinate) {
						coordinatesArray.push(parsedCoordinate);
					}
				}

				if (coordinatesArray.length > 0) {
					this.hillSquares = coordinatesArray;
				}
			}

			return true;
		} else {
			return false;
		}
	}
	serializeToParsingForm(): string {
		if (compareArrays(this.hillSquares, KingOfTheHill.defaultCoordinates)) {
			return "KotH";
		} else {
			return `KotH=${this.hillSquares.map((c) => convertCoordinateToPGN4(c)).join(",")}`;
		}
	}
	isDisabled(): boolean {
		return false;
	}

	getInsufficientMaterialData() {
		return {
			isPartiallyDisabled: true,
			isDisabled: true
		} as const;
	}

	affectOptions(): PostMoveResults {
		const { board, sideToMove, fenOptions } = this.decorator;
		const returnValues = this.callHandler("affectOptions", arguments);

		const royal = fenOptions.tag("royal")[sideToMove],
			dead = fenOptions.tag("dead"),
			wb = fenOptions.tag("wb");
		if (
			board.variantData.giveaway &&
			this.hillSquares.some((c) => {
				const pieceString = board.board[c[0]][c[1]];
				return pieceString.isPiece() && pieceString.piece === KingOfTheHill.defaultRoyal;
			})
		) {
			this.decorator.processInternalMove({ type: InternalMoveSignature.Stalemate });
			returnValues.stalemates[sideToMove] = true;
		} else if (royal && this.hillSquares.some((c) => compareCoordinates(c, royal))) {
			const pointsForMate = this.decorator.obtainPointsForMate();
			for (const color of colors) {
				if (color === sideToMove) continue;
				if (!dead[color]) {
					dead[color] = true;
					this.decorator.assignPoints(sideToMove, pointsForMate);
				}
			}

			if (this.decorator.board.variantData.taboo) {
				this.decorator.gameOver = `${getPlayerNameFromColor(sideToMove, wb).toUpperCase()} WON THE RACE!`;
			} else {
				this.decorator.assignGeneralTermination("King of the Hill");
			}
		}

		return returnValues;
	}
}
