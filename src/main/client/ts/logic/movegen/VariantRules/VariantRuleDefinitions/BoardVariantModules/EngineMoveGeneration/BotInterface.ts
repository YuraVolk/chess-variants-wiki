import { Board } from "@moveGeneration/Board/Board";
import { Move, MoveComponent } from "@moveGeneration/MoveTree/MoveTreeInterface";

export enum ZombieType {
	Rando = "rando",
	Futer = "comfuter",
	Ranter = "ranter",
	Patzer = "patzer",
	Pusher = "pusher",
	Checker = "checker",
	Muncher = "muncher",
	F_Pusher = "pusher_comfuter",
	F_Checker = "checker_comfuter",
	F_Muncher = "muncher_comfuter"
}

export const verifyZombieType = (zombieType: string): zombieType is ZombieType => zombieType in ZombieType;

export interface ZombieMoveGenerationAlgorithm {
	readonly stringifiedType: ZombieType;
	evaluate(moves: MoveComponent[], board: Board): Map<MoveComponent, number>;
	pickPreferredMove(evaluations: Map<MoveComponent, number>): Move;
}

export const botAlgorithms = new Map<ZombieType, ZombieMoveGenerationAlgorithm>();

export function createBotAlgorithm(algorithm: ZombieMoveGenerationAlgorithm) {
	botAlgorithms.set(algorithm.stringifiedType, algorithm);
	return algorithm;
}
