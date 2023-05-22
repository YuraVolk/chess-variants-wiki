import { Move, MoveComponent, verifyRequiredMove, verifyStandardMove } from "@moveGeneration/MoveTree/MoveTreeInterface";
import { createBotAlgorithm, ZombieType } from "../BotInterface";

export function randomlyPickNextChainedMoves(move: MoveComponent, resultingMove: MoveComponent[] = []): Move {
	const newMove = [...resultingMove, move];
	if (move.nextChainedMoves && !move.isForcedContinuation && Math.random() > 0.5) {
		return randomlyPickNextChainedMoves(move.nextChainedMoves[Math.floor(Math.random() * move.nextChainedMoves.length)], newMove);
	} else {
		if (!verifyRequiredMove(newMove)) throw new Error("Required move length is 0");
		return newMove;
	}
}

export const randoBotAlgorithm = createBotAlgorithm({
	stringifiedType: ZombieType.Rando,
	evaluate(moves, board): Map<MoveComponent, number> {
		const copyOfMoves = moves.slice();
		for (let i = moves.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[copyOfMoves[i], copyOfMoves[j]] = [moves[j], moves[i]];
		}

		const data = board.data,
			boardSquares = board.board;

		const zombieEatZombieMoves: typeof moves = [];
		const otherMoves: typeof moves = [];
		for (const move of copyOfMoves) {
			if (verifyStandardMove(move)) {
				const targetPiece = boardSquares[move.endCoordinates[1]][move.endCoordinates[0]];
				if (targetPiece.isPiece() && data.fenOptions.tag("resigned")[targetPiece.color]) {
					zombieEatZombieMoves.push(move);
					continue;
				}
			}
			otherMoves.push(move);
		}

		let startingEvaluation = 0;
		return new Map([
			...otherMoves.reduce<Array<[MoveComponent, number]>>((p, n) => (p.push([n, --startingEvaluation]), p), []),
			...zombieEatZombieMoves.reduce<Array<[MoveComponent, number]>>((p, n) => (p.push([n, --startingEvaluation / 2]), p), [])
		]);
	},
	pickPreferredMove(evaluations: Map<MoveComponent, number>): Move {
		return randomlyPickNextChainedMoves([...evaluations.entries()].reduce((p, n) => (n[1] > p[1] ? n : p))[0]);
	},
	getName() {
		return "Randobot";
	}
});
