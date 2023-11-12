import { boardDimension } from "@moveGeneration/GameInformation/GameData";
import type { NumericColor, Coordinate } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import type { FENData } from "../FENData/FENData";
import { deadColorIndex, PieceString } from "../GameInformation/GameUnits/PieceString";
import type { VariantHandlerTarget } from "../VariantRules/VariantRuleInterface";
import type { ControlConfiguration } from "@moveGeneration/PieceControl/PieceControlInterface";
import {
	AttackType,
	PieceControlConfiguration,
	PieceControlGeneratedMove,
	PieceControlHooks,
	PieceControlInternalMove
} from "./PieceControlInterface";

export const checkBoardOverflow = (i: number, j: number) => i < 0 || i >= boardDimension || j < 0 || j >= boardDimension;

export class PieceControl implements VariantHandlerTarget<PieceControl> {
	color: NumericColor;
	sliding: Coordinate[];
	jumping: Coordinate[];
	readonly hooks: PieceControlHooks;
	moves: PieceControlGeneratedMove[];
	rayGenCache: Coordinate[];
	baseRankActive: boolean;
	immunePieces: [boolean, boolean, boolean, boolean];
	fenData!: FENData;

	board!: PieceString[][];
	i!: number;
	j!: number;

	__baseClass: PieceControl;
	initDecoratorSettings() {
		/* no-op */
	}
	/*---------------------------------- INITIALIZATION -----------------------------------------*/

	constructor() {
		this.moves = [];
		this.color = 0;
		this.sliding = [];
		this.jumping = [];
		this.rayGenCache = [];
		this.hooks = {
			useTrajectory: undefined,
			usePerspective: undefined,
			usePawnLogic: undefined,
			useHopping: false
		};

		this.baseRankActive = false;
		this.immunePieces = [false, false, false, false];
		this.__baseClass = this;
	}

	configure(configuration: ControlConfiguration) {
		this.color = configuration.color;
		this.immunePieces = configuration.immunePieces;
		[this.i, this.j] = configuration.coordinates;
		const baseRankCalc = [13 - this.i, this.j, this.i, 13 - this.j][this.color] - this.fenData.fenOptions.tag("pawnBaseRank");
		this.baseRankActive = configuration.baseRank ?? (baseRankCalc === -1 || baseRankCalc === -2);
		this.board = configuration.board;
	}

	setFENData(fenData: FENData) {
		this.fenData = fenData;
	}

	private isRayTrace(attackType: AttackType) {
		return attackType === AttackType.RayTrace || attackType === AttackType.RayTraceLimited;
	}

	/*---------------------------------- INITIALIZATION -----------------------------------------*/
	/*-------------------------------------------------------------------------------------------*/
	/*--------------------------------- MOVE GENERATION -----------------------------------------*/

	private modifyDisplacements(i: number, j: number): Coordinate {
		const baseDisplacements: Coordinate[] = [
			[i, j],
			[j, -i],
			[-i, -j],
			[-j, i]
		];
		return baseDisplacements[this.color];
	}

	private pushMove(settings: PieceControlInternalMove): void {
		if (
			!settings.isRayGen &&
			this.hooks.usePawnLogic &&
			this.hooks.usePawnLogic.promotionRanks &&
			this.hooks.usePawnLogic.promotionRanks[this.color] === (this.color % 2 === 0 ? settings.i : settings.j) &&
			this.hooks.usePawnLogic.promotionPieces
		) {
			this.moves.push({
				move: [settings.i, settings.j, this.hooks.usePawnLogic.promotionPieces.join("")],
				irreversible: settings.irreversible ?? false
			});
			return;
		} else {
			this.moves.push({
				move: [settings.i, settings.j],
				irreversible: settings.irreversible ?? false
			});
		}
	}

	protected generateSlidingAttack(settings: PieceControlConfiguration): void {
		let [displacementI, displacementJ] = settings.displacement,
			limit = settings.limit ?? Infinity;
		const rayGenCache = settings.rayGenCache,
			special = settings.special ?? AttackType.Normal;

		let rayTraceLimit = 0;
		if (this.hooks.usePerspective?.[this.color]) {
			[displacementI, displacementJ] = this.modifyDisplacements(displacementI, displacementJ);
		}

		let startI = this.i + displacementI,
			startJ = this.j + displacementJ;
		const iLength = this.board[0].length,
			jLength = this.board.length;
		const isRayGen = rayGenCache ?? this.isRayTrace(special);

		while (limit > 0 && startI >= 0 && startI < iLength && startJ >= 0 && startJ < jLength) {
			// TODO add trajectories?
			if (this.getMovePossibility({ displacement: [startI, startJ], special, rayGenCache })) {
				this.pushMove({ i: startI, j: startJ, isRayGen: Boolean(isRayGen), irreversible: settings.irreversible });
			}

			if (special === AttackType.RayTraceLimited && !this.board[startI][startJ].isEmpty()) {
				rayTraceLimit++;
				if (rayTraceLimit === 2) break;
			}
			if (!this.isRayTrace(special) && !this.board[startI][startJ].isEmpty()) {
				break;
			}

			startI += displacementI;
			startJ += displacementJ;
			limit--;
		}
	}

	protected generateJumpAttack(settings: PieceControlConfiguration): void {
		let [displacementI, displacementJ] = settings.displacement;
		const rayGenCache = settings.rayGenCache,
			squareBlockingIndex = settings.squareBlockingIndex,
			special = settings.special ?? AttackType.Normal;
		if (this.hooks.usePerspective?.[this.color]) {
			[displacementI, displacementJ] = this.modifyDisplacements(displacementI, displacementJ);
		}

		const startI = this.i + displacementI,
			startJ = this.j + displacementJ;
		const isRayGen = rayGenCache ?? this.isRayTrace(special);
		let isTestPassed = true;

		if (this.hooks.useTrajectory && squareBlockingIndex !== undefined) {
			const trajectory = this.hooks.useTrajectory[squareBlockingIndex];
			let trajectoryX, trajectoryY;
			if (this.hooks.usePerspective?.[this.color]) {
				[trajectoryX, trajectoryY] = this.modifyDisplacements(trajectory[0], trajectory[1]);
			} else {
				(trajectoryX = trajectory[0]), (trajectoryY = trajectory[1]);
			}

			if (!this.getMovePossibility({ displacement: [this.i + trajectoryX, this.j + trajectoryY], special, rayGenCache })) {
				isTestPassed = false;
			}
		}

		if (isTestPassed && this.getMovePossibility({ displacement: [startI, startJ], special, rayGenCache })) {
			this.pushMove({ i: startI, j: startJ, isRayGen: Boolean(isRayGen), irreversible: settings.irreversible });
		}
	}

	getMovePossibility(configuration: PieceControlConfiguration): boolean {
		const {
			displacement: [i, j],
			rayGenCache,
			special
		} = configuration;
		if (checkBoardOverflow(i, j)) return false;

		const piece = this.board[i][j];
		if (!piece.isEmpty() && piece.color !== deadColorIndex && !rayGenCache && !this.isRayTrace(special ?? AttackType.Normal)) {
			if (this.immunePieces[piece.color] || this.fenData.fenOptions.tag("zombieImmune")[piece.color]) return false;
		}

		const pushTo = () => {
			if (rayGenCache) {
				this.rayGenCache.push(rayGenCache);
			}

			return true;
		};

		if (special === undefined || special === AttackType.Normal) {
			if (!piece.isWall()) {
				return pushTo();
			}
		} else if (special === AttackType.RayGen) {
			if (!piece.isEmpty()) {
				return pushTo();
			}
		} else if (special === AttackType.AttackOnly) {
			if (!piece.isEmpty() && !piece.isWall()) {
				return pushTo();
			}
		} else if (special === AttackType.MoveOnly) {
			if (piece.isEmpty()) {
				return pushTo();
			}
		} else if (this.isRayTrace(special)) {
			return pushTo();
		}

		return false;
	}

	/*--------------------------------- MOVE GENERATION -----------------------------------------*/
	/*-------------------------------------------------------------------------------------------*/
	/*------------------------------- OUTPUT GENERATION -----------------------------------------*/

	getPossibleCells(): void {
		if (this.hooks.useHopping) {
			this.sliding.forEach((displacement) =>
				this.generateSlidingAttack({ displacement, special: AttackType.RayGen, rayGenCache: [...displacement] })
			);

			const moves = this.moves.slice();
			this.moves = [];
			moves.forEach((s, i) => {
				const startI = s.move[0] + this.rayGenCache[i][0];
				const startJ = s.move[1] + this.rayGenCache[i][1];
				if (this.getMovePossibility({ displacement: [startI, startJ] })) {
					this.pushMove({ i: startI, j: startJ });
				}
			});
			this.rayGenCache = [];
		} else {
			this.sliding.forEach((a) => this.generateSlidingAttack({ displacement: a }));
			this.jumping.forEach((a) => this.generateJumpAttack({ displacement: a }));
		}
	}

	rayGenJumpingAttacks(): PieceControlGeneratedMove[] {
		this.jumping.forEach((a) => this.generateJumpAttack({ displacement: a, special: AttackType.RayTrace }));
		return this.moves.splice(0);
	}

	rayGenSlidingAttacks(trace?: AttackType): PieceControlGeneratedMove[][] {
		const slidingLines: PieceControlGeneratedMove[][] = [];

		this.sliding.forEach((a) => {
			this.generateSlidingAttack({ displacement: a, special: trace });
			if (this.moves.length !== 0) {
				slidingLines.push(this.moves.splice(0));
			}
		});

		return slidingLines;
	}

	getPseudoLegalMoves(): PieceControlGeneratedMove[] {
		this.getPossibleCells();
		return this.moves.splice(0);
	}
	/*------------------------------- OUTPUT GENERATION -----------------------------------------*/
}
