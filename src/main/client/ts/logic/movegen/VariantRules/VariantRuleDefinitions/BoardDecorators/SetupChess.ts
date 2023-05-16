import type { Coordinate, NumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { pieceControlConfigSettings } from "@moveGeneration/PieceControl/PieceControlInterface";
import { createTupleFromCallback, Tuple } from "../../../../../baseTypes";
import { Board, PlayerBooleanTuple } from "../../../Board/Board";
import type { PostMoveResults } from "../../../FENData/FENDataInterface";
import { boardDimension, colors, totalPlayers } from "../../../GameInformation/GameData";
import { PieceString } from "../../../GameInformation/GameUnits/PieceString";
import { DroppingMove, InternalMoveSignature, Move, MoveData, verifyDroppingMove } from "../../../MoveTree/MoveTreeInterface";
import { VariantRule } from "../../VariantRule";
import { variantRuleColors, VariantRuleHandler } from "../../VariantRuleInterface";
import { chessGlyphIndex } from "@client/fonts/chessGlyphIndex";

const tag = "setupChess";
export class SetupChess extends VariantRule<typeof Board, typeof tag> implements VariantRuleHandler<Board> {
	static {
		VariantRule.initVariantRule(SetupChess);
	}

	private disabled = false;
	private setupPoints: number | false;
	private wereBanksEnabled: PlayerBooleanTuple = [false, false, false, false];
	private permutationCoordinates: Tuple<Coordinate[], typeof totalPlayers> = [[], [], [], []];
	private pawnPermutationCoordinates: Tuple<Coordinate[], typeof totalPlayers> = [[], [], [], []];
	constructor(setupPoints?: unknown) {
		super();
		if (typeof setupPoints === "number") {
			this.setupPoints = setupPoints;
		} else {
			this.setupPoints = false;
		}
	}

	getDecoratorType() {
		return Board;
	}

	getPublicProperties() {
		return {
			parameterValue: this.setupPoints,
			information: {
				name: `Setup Material`,
				description: `Set up ${this.setupPoints || 0} points before the game starts`,
				tag,
				color: variantRuleColors.phased,
				displayIcon: chessGlyphIndex.movePawn
			}
		} as const;
	}

	matchesPGNDeclaration(match: string): boolean {
		const matchArray = match.match(/^Setup=(\d+)$/);
		if (matchArray) {
			this.setupPoints = Number(matchArray[1]);
			return true;
		} else {
			return false;
		}
	}

	serializeToParsingForm(): string {
		return `Setup=${this.setupPoints || 0}`;
	}

	isDisabled() {
		return false;
	}

	getInsufficientMaterialData() {
		return {
			isPartiallyDisabled: false,
			isDisabled: true
		} as const;
	}

	getParametrizedOptions() {
		const options = new Map<string, number | false>([["Off", false]]);
		for (let i = 1; i < 50; i++) options.set(String(i), i);
		for (let i = 50; i <= 120; i += 5) options.set(String(i), i);
		return options;
	}

	initDecoratorSettings() {
		const fenOptions = this.decorator.data.fenOptions;
		const areBanksEnabled = fenOptions.tag("areBanksEnabled"),
			dead = fenOptions.tag("dead"),
			setupComplete = fenOptions.tag("setupComplete"),
			setupPoints = fenOptions.tag("setupPoints"),
			pawnBaseRank = fenOptions.tag("pawnBaseRank"),
			royal = fenOptions.tag("royal"),
			castleKingside = fenOptions.tag("castleKingside"),
			castleQueenside = fenOptions.tag("castleQueenside");
		const areSetupPointsUnset = setupPoints === null;

		const modifyDisplacements = (i: number, j: number, color: NumericColor): Coordinate => {
			const baseDisplacements: Coordinate[] = [
				[13 - i, j],
				[j, i],
				[i, j],
				[13 - j, i]
			];
			return baseDisplacements[color];
		};

		for (const color of colors) {
			let bankEnabled = false;
			if (areBanksEnabled[color]) {
				this.wereBanksEnabled[color] = true;
				bankEnabled = true;
			} else if (!setupComplete[color]) {
				areBanksEnabled[color] = true;
				bankEnabled = true;
			}

			if (bankEnabled) {
				const files = createTupleFromCallback((_, i) => i, boardDimension);
				const pawnRanks = [pawnBaseRank, pawnBaseRank + 1].filter((rank) => rank >= 0 && rank <= 13);
				const ranks = [pawnBaseRank - 1, ...pawnRanks];
				this.permutationCoordinates[color] = files.flatMap((file) =>
					ranks.map((rank): Coordinate => modifyDisplacements(rank, file, color))
				);
				this.pawnPermutationCoordinates[color] = files.flatMap((file) =>
					pawnRanks.map((rank): Coordinate => modifyDisplacements(rank, file, color))
				);
			}
			if (!areSetupPointsUnset && !dead[color]) {
				setupPoints[color] = this.setupPoints === false ? 0 : this.setupPoints;
			}

			if (!royal[color]) {
				castleKingside[color] = false;
				castleQueenside[color] = false;
			}
		}

		for (const decorator of this.wrappingDecorators) decorator.initDecoratorSettings?.();
	}

	getLegalMoves(): MoveData[] {
		if (!this.disabled) return [];
		return this.callHandler("getLegalMoves", arguments);
	}

	private getCoordinateList(piece: PieceString) {
		return pieceControlConfigSettings[piece.piece].moveGenerationSettings.isPawn
			? this.pawnPermutationCoordinates
			: this.permutationCoordinates;
	}

	getDroppingMoves(piece: PieceString, color = this.decorator.data.sideToMove): DroppingMove[] {
		if (piece.color !== color) return [];
		if (!this.disabled && !this.decorator.data.fenOptions.tag("setupComplete")[color]) {
			const coordinateList = this.getCoordinateList(piece);
			const resultingMoveDrops: DroppingMove[] = [];

			for (const coordinate of coordinateList[color]) {
				if (this.decorator.board[coordinate[0]][coordinate[1]].isEmpty()) {
					resultingMoveDrops.push({ piece, endCoordinates: coordinate });
				}
			}

			return resultingMoveDrops;
		} else return this.callHandler("getDroppingMoves", arguments);
	}

	makeMove(move: Move, ignoreNextMoves = false): PostMoveResults {
		const fenOptions = this.decorator.data.fenOptions;
		const areBanksEnabled = fenOptions.tag("areBanksEnabled"),
			dead = fenOptions.tag("dead"),
			setupComplete = fenOptions.tag("setupComplete"),
			setupPoints = fenOptions.tag("setupPoints"),
			bank = fenOptions.tag("bank"),
			royal = fenOptions.tag("royal");
		const color = this.decorator.data.sideToMove,
			moveData = move[0];
		const results = this.callHandler("makeMove", arguments);

		if (!this.disabled && !setupComplete[color] && verifyDroppingMove(moveData) && setupPoints) {
			const pointValue = pieceControlConfigSettings[moveData.piece.piece].points.singlesPoints;
			if (moveData.piece.piece === "K") {
				bank[color].delete(moveData.piece);
				royal[color] = moveData.endCoordinates;
			} else {
				setupPoints[color] -= pointValue;
			}

			const pointsLeft = setupPoints[color];
			for (const [piece] of bank[color]) {
				if (piece.piece !== "K" && pointValue > pointsLeft) {
					bank[color].delete(piece);
				}
			}

			if (bank[color].size === 0) {
				setupComplete[color] = true;
			} else {
				const coordinateList = this.getCoordinateList(moveData.piece);

				let anyDrop = false;
				for (const coordinate of coordinateList[color]) {
					if (this.decorator.board[coordinate[0]][coordinate[1]].isEmpty()) {
						anyDrop = true;
						break;
					}
				}

				if (!anyDrop) {
					setupComplete[color] = true;
				}
			}
		}

		if (setupComplete.every((v, i) => v || dead[i])) {
			this.disabled = true;
			for (const color of colors) {
				if (!this.wereBanksEnabled[color]) {
					areBanksEnabled[color] = false;
					bank[color].clear();
				}
			}
		}

		if (!this.disabled && !ignoreNextMoves && setupComplete[this.decorator.data.sideToMove]) {
			Board.prototype.makeMove.call(this.decorator, [{ type: InternalMoveSignature.Pass }]);
		}

		return results;
	}
}
