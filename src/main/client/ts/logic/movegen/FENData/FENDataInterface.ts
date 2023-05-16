import type { PlayerBooleanTuple } from "@moveGeneration/Board/Board";
import { NumericColor, verifyNumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { Termination, totalPlayers } from "../GameInformation/GameData";
import type { FENOptionsSnapshot } from "./FENOptions/FENOptions";

export interface FENDataSnapshot {
	points: [number, number, number, number];
	sideToMove: NumericColor;
	fenOptionsSnapshot: FENOptionsSnapshot;
	plyCount: number;
	gameOver: Termination | false;
}

export interface PostMoveResults {
	checks: [boolean, boolean, boolean, boolean];
	checkmates: [boolean, boolean, boolean, boolean];
	stalemates: [boolean, boolean, boolean, boolean];
}

export interface FENEffectSettings {
	ignoreCheckmateChecks: boolean;
	ignoreNextTurn: boolean;
}

export const createDefaultFENEffectSettings = (): FENEffectSettings => ({
	ignoreCheckmateChecks: false,
	ignoreNextTurn: false
});

export interface ArmyDeathSettings {
	excludeRoyals: boolean;
	onlyPawns: boolean;
	doNotSetDead: boolean;
}

export const createDefaultArmyDeathSettings = (): ArmyDeathSettings => ({
	excludeRoyals: false,
	onlyPawns: false,
	doNotSetDead: false
});

export function getNeighboringSideToMove(player: NumericColor, dead: PlayerBooleanTuple) {
	let sideToMove: number = player;
	do {
		sideToMove = sideToMove === totalPlayers - 1 ? 0 : sideToMove + 1;
	} while (dead[sideToMove]);

	if (verifyNumericColor(sideToMove)) {
		return sideToMove;
	} else throw new Error(`Unexpected numeric color: ${sideToMove}`);
}
