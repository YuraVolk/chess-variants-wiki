import { createTuple, Tuple, verifyTupleType } from "@client/ts/baseTypes";
import { compareCoordinates } from "../../../Board/BoardInterface";
import { FENData } from "../../../FENData/FENData";
import { createDefaultFENEffectSettings, PostMoveResults } from "../../../FENData/FENDataInterface";
import { colors, totalPlayers } from "../../../GameInformation/GameData";
import { MoveComponent, verifyStandardMove } from "../../../MoveTree/MoveTreeInterface";
import { VariantRule } from "../../VariantRule";
import type { VariantRuleAllowedChecks, VariantRuleHandler } from "../../VariantRuleInterface";

const tag = "nCheck";
export class NCheck extends VariantRule<typeof FENData, typeof tag> implements VariantRuleHandler<FENData> {
	static {
		VariantRule.initVariantRule(NCheck);
	}
	private defaultChecks: Tuple<number, typeof totalPlayers>;
	constructor(defaultChecks?: unknown) {
		super();
		if (
			Array.isArray(defaultChecks) &&
			verifyTupleType(defaultChecks, totalPlayers) &&
			defaultChecks.every<number>((check): check is number => typeof check === "number")
		) {
			this.defaultChecks = defaultChecks;
		} else {
			this.defaultChecks = createTuple(3, totalPlayers);
		}
	}

	getDecoratorType() {
		return FENData;
	}
	getPublicProperties() {
		const checks = this.defaultChecks
			.filter(Boolean)
			.reduce((p, n, i, arr) => p + (arr[i - 1] === arr[i] ? "" : `-${n}`), "")
			.slice(1);
		return {
			parameterValue: this.defaultChecks,
			information: {
				name: `N-Check`,
				textualForm: `${checks}+`,
				description: `Checking a king ${checks} times is checkmate`,
				tag
			}
		} as const;
	}
	matchesPGNDeclaration(match: string): boolean {
		const matchArray = match.toLowerCase().match(/^(\d\d?\d?(?:-\d\d?\d?){0,3})-check$/i);
		if (matchArray) {
			const checks = matchArray[1].split("-");
			for (let i = 0; i <= checks.length; i++) {
				if (checks[i]) {
					this.defaultChecks[i] = Number(checks[i]);
				} else {
					while (i !== totalPlayers) {
						this.defaultChecks[i] = this.defaultChecks[i - 1];
						i++;
					}
				}
			}
			return true;
		} else {
			return false;
		}
	}
	serializeToParsingForm(): string {
		return `${this.defaultChecks.join("-")}-check`;
	}
	isDisabled({ variantDataRules }: VariantRuleAllowedChecks): boolean {
		return variantDataRules.giveaway;
	}

	getInsufficientMaterialData() {
		return {
			isPartiallyDisabled: true,
			isDisabled: false
		} as const;
	}

	getParametrizedOptions() {
		const resultingMap = new Map<string, Tuple<number, typeof totalPlayers> | false>([["N+ Off", false]]);
		for (let i = 1; i < 10; i++) resultingMap.set(`${i}+`, createTuple(i, totalPlayers));
		for (const value of [12, 15, 20, 30, 50]) resultingMap.set(`${value}+`, createTuple(value, totalPlayers));
		return resultingMap;
	}

	initDecoratorSettings() {
		const lives = this.decorator.fenOptions.tag("lives");
		for (const color of colors) {
			if (lives[color] === null) {
				lives[color] = this.defaultChecks[color];
			}
		}

		for (const decorator of this.wrappingDecorators) decorator.initDecoratorSettings?.();
	}

	affectOptions(move: MoveComponent, settings = createDefaultFENEffectSettings()): PostMoveResults {
		const { board, sideToMove } = this.decorator;
		const currentChecks = board.getCurrentChecks().map((arr) => new Set(arr));
		const isNCheckValidated = !settings.ignoreCheckmateChecks && !settings.ignoreNextTurn;
		const royal = this.decorator.fenOptions.tag("royal"),
			lives = this.decorator.fenOptions.tag("lives");
		const results = this.callHandler("affectOptions", arguments);

		const isStandardMove = verifyStandardMove(move);
		if (isNCheckValidated) {
			const updatedChecks = board.getCurrentChecks(sideToMove);

			const playerChecks = createTuple(0, totalPlayers);
			for (const color of colors) {
				for (const coordinate of updatedChecks[color]) {
					const royalPiece = royal[color];
					if (
						!currentChecks[color].has(coordinate) ||
						(royalPiece && isStandardMove && compareCoordinates(move.endCoordinates, royalPiece))
					) {
						playerChecks[color]++;
					}
				}
			}

			if (lives.every<number>((live): live is number => live !== null)) {
				for (const color of colors) {
					lives[color] -= playerChecks[color];
					if (lives[color] <= 0) {
						this.decorator.assignPoints(sideToMove, this.decorator.obtainPointsForMate());
						this.decorator.turnPiecesDead(color);
						lives[color] = 0;
					}
				}
			}

			if (this.decorator.getRealPlayers() > 1) {
				this.decorator.sideToMove = this.decorator.nextTurn(sideToMove);
				board.pregenerateAttacks();
			}
		}

		return results;
	}
}
