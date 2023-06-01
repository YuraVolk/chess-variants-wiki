import { chessGlyphIndex } from "@client/fonts/chessGlyphIndex";
import { Board } from "../../../Board/Board";
import type { PieceString } from "../../../GameInformation/GameUnits/PieceString";
import { VariantRule } from "../../VariantRule";
import { variantRuleColors, VariantRuleHandler } from "../../VariantRuleInterface";
import { formatOrdinalNumber } from "@utils/StringFormatUtils";

const tag = "paradigmChess30";
export class ParadigmChess30 extends VariantRule<typeof Board, typeof tag> implements VariantRuleHandler<Board> {
	static {
		VariantRule.initVariantRule(ParadigmChess30);
	}

	private static readonly paradigmRanges = [...Array.from({ length: 14 }, (_, i) => [30 * (i + 1) + 1, 30 + 30 * (i + 1)])];
	// 0 = color bound, 1 = minor, 2 = major
	private static readonly permutations = [
		[0, 0, 1, 1, 2],
		[0, 0, 1, 2, 1],
		[0, 0, 2, 1, 1],
		[0, 1, 0, 1, 2],
		[0, 1, 0, 2, 1],
		[0, 1, 1, 0, 2],
		[0, 1, 1, 2, 0],
		[0, 1, 2, 0, 1],
		[0, 1, 2, 1, 0],
		[0, 2, 0, 1, 1],
		[0, 2, 1, 0, 1],
		[0, 2, 1, 1, 0],
		[1, 0, 0, 1, 2],
		[1, 0, 0, 2, 1],
		[1, 0, 1, 0, 2],
		[1, 0, 1, 2, 0],
		[1, 0, 2, 0, 1],
		[1, 0, 2, 1, 0],
		[1, 1, 0, 0, 2],
		[1, 1, 0, 2, 0],
		[1, 1, 2, 0, 0],
		[1, 2, 0, 0, 1],
		[1, 2, 0, 1, 0],
		[1, 2, 1, 0, 0],
		[2, 0, 0, 1, 1],
		[2, 0, 1, 0, 1],
		[2, 0, 1, 1, 0],
		[2, 1, 0, 0, 1],
		[2, 1, 0, 1, 0],
		[2, 1, 1, 0, 0]
	];
	private static readonly legacy = {
		twoPlayerRank: 3,
		twoPlayerAdjustment: 30 * 4
	} as const;

	readonly preMethodExecution: boolean = false;
	private positionId: number;
	constructor(positionId?: unknown) {
		super();
		if (typeof positionId === "number") {
			this.positionId = positionId;
		} else {
			this.positionId = -1;
		}
	}

	getPublicProperties() {
		return {
			parameterValue: this.positionId,
			information: {
				name: "Paradigm Chess30",
				description:
					"Paradigm Chess30: Dragon bishops combine the movement of bishop and xiangqi horse. 30 semi-random starting positions",
				tag,
				color: variantRuleColors.startingPosition,
				displayIcon: chessGlyphIndex.bishop
			}
		} as const;
	}

	getDecoratorType() {
		return Board;
	}

	matchesPGNDeclaration(match: string): boolean {
		const matchArray = match.match(/^ParadigmChess30=((\d{1,3}))$/i);
		if (matchArray) {
			const newID = Number(matchArray[1]);
			if (newID < 0 || newID > 450) return false;
			this.positionId = newID;
			return true;
		} else return false;
	}

	serializeToParsingForm(): string {
		return `ParadigmChess30=${this.positionId}`;
	}

	isDisabled(): boolean {
		return false;
	}

	getInformation() {
		return {
			name: "Paradigm Chess30",
			description: "Paradigm Chess30: Dragon bishops combine the movement of bishop and xiangqi horse. 30 semi-random starting positions",
			tag
		} as const;
	}

	getParametrizedOptions() {
		const options = new Map<string, number | false>([["Off", false]]);
		for (let i = 0; i < ParadigmChess30.paradigmRanges.length; i++) {
			const [rangeStart, rangeEnd] = ParadigmChess30.paradigmRanges[i];
			options.set(`${formatOrdinalNumber(i + 1)} rank`, Math.floor(Math.random() * (rangeEnd - rangeStart) + rangeStart));
		}
		return options;
	}

	initDecoratorSettings() {
		if (this.positionId === -1) {
			for (const decorator of this.wrappingDecorators) decorator.initDecoratorSettings?.();
			return;
		}
		let nr = this.positionId;
		const boardSquares = this.decorator.board;
		const data = this.decorator.data;

		let rank = ParadigmChess30.paradigmRanges.findIndex((r) => nr >= r[0] && nr <= r[1]);
		if (rank === -1) {
			rank = ParadigmChess30.legacy.twoPlayerRank;
			nr += ParadigmChess30.legacy.twoPlayerAdjustment;
		}
		const calcNr = nr - ParadigmChess30.paradigmRanges[rank][0];
		const ranks = [13 - rank, rank, rank, 13 - rank];
		const pieceArrays: PieceString[][] = [[], [], [], []];
		pieceArrays[0] = boardSquares[ranks[0]].slice(4, 10);
		pieceArrays[1] = boardSquares.map((row) => row[ranks[1]]).slice(4, 10);
		pieceArrays[2] = boardSquares[ranks[2]].slice(4, 10);
		pieceArrays[3] = boardSquares.map((row) => row[ranks[3]]).slice(4, 10);

		const royalPieces = data.fenOptions.tag("royal"),
			dead = data.fenOptions.tag("dead");
		const replaceRow = (player: number): void => {
			const r = royalPieces[player]?.[player % 2 === 0 ? 1 : 0];
			const pieceCoordinates = [[5, 8], [4, 9], [r === undefined || r >= 7 ? 6 : 7]];

			const moveCoordinate = (i: number, iter: number) => {
				if (dead[player]) return;
				const coordinateA = player % 2 === 0 ? ranks[player] : iter;
				const coordinateB = player % 2 === 0 ? iter : ranks[player];

				if (pieceArrays[player][pieceCoordinates[i][0] - 4].isWall() || boardSquares[coordinateA][coordinateB].isWall()) return;
				royalPieces.some((r) => {
					if (r && r[0] === coordinateA && r[1] === coordinateB) {
						(r[0] = coordinateB), (r[1] = coordinateA);
						return true;
					}
					return false;
				});

				boardSquares[coordinateA][coordinateB] = pieceArrays[player][(pieceCoordinates[i].shift() ?? 4) - 4];
			};

			let c = 0;
			const rp = r === undefined || r >= 7 ? 7 : 6;
			const permutations = rp === 6 ? ParadigmChess30.permutations[calcNr].slice().reverse() : ParadigmChess30.permutations[calcNr];
			for (let i = 4; i < 10; i++) {
				if (i === rp) continue;
				moveCoordinate(permutations[c++], i);
			}
		};

		for (let i = 0; i < 4; i++) replaceRow(i);
		for (const decorator of this.wrappingDecorators) decorator.initDecoratorSettings?.();
	}
}
