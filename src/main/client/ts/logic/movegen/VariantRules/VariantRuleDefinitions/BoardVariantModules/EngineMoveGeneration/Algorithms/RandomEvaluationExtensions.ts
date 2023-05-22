import { MoveComponent, verifyStandardMove, SpecialMove } from "@moveGeneration/MoveTree/MoveTreeInterface";
import { pieceControlConfigSettings } from "@moveGeneration/PieceControl/PieceControlInterface";
import { createBotAlgorithm, ZombieMoveGenerationAlgorithm, ZombieType } from "../BotInterface";
import { randoBotAlgorithm } from "./RandomEvaluation";

export const createRandomBasedAlgorithm = (
	algorithm: Omit<ZombieMoveGenerationAlgorithm, "pickPreferredMove">
): ZombieMoveGenerationAlgorithm => ({
	...algorithm,
	pickPreferredMove(...args) {
		return randoBotAlgorithm.pickPreferredMove.apply(this, args);
	}
});

export const checkerAlgorithm = createBotAlgorithm(
	createRandomBasedAlgorithm({
		stringifiedType: ZombieType.Checker,
		evaluate(moves, board): Map<MoveComponent, number> {
			const baseEvaluations = randoBotAlgorithm.evaluate.call(this, moves, board);

			for (const [move, evaluation] of baseEvaluations) {
				const snapshot = board.createSnapshot();
				const { checks, checkmates } = board.makeMove([move]);
				if (checks.filter((c, i) => c && !checkmates[i] === c).length === 0) {
					baseEvaluations.set(move, evaluation / (evaluation / 2));
				}
				board.loadSnapshot(snapshot);
			}

			return baseEvaluations;
		},
		getName() {
			return "Checker";
		}
	})
);

export const muncherAlgorithm = createBotAlgorithm(
	createRandomBasedAlgorithm({
		stringifiedType: ZombieType.Muncher,
		evaluate(moves, board): Map<MoveComponent, number> {
			const baseEvaluations = randoBotAlgorithm.evaluate.call(this, moves, board);

			for (const [move, evaluation] of baseEvaluations) {
				if (!verifyStandardMove(move)) continue;
				if (move.specialType === SpecialMove.EnPassant || board.board[move.endCoordinates[0]][move.endCoordinates[1]].isEmpty())
					continue;

				baseEvaluations.set(move, evaluation / (evaluation / 2));
			}

			return baseEvaluations;
		},
		getName() {
			return "Muncher";
		}
	})
);

export const pusherAlgorithm = createBotAlgorithm(
	createRandomBasedAlgorithm({
		stringifiedType: ZombieType.Pusher,
		evaluate(moves, board): Map<MoveComponent, number> {
			const baseEvaluations = randoBotAlgorithm.evaluate.call(this, moves, board);

			for (const [move, evaluation] of baseEvaluations) {
				if (!verifyStandardMove(move)) continue;
				const pieceString = board.board[move.startCoordinates[0]][move.startCoordinates[1]];
				if (pieceString.isPiece() && !pieceControlConfigSettings[pieceString.piece].moveGenerationSettings.isPawn) {
					baseEvaluations.set(move, evaluation / (evaluation / 2));
				}
			}

			return baseEvaluations;
		},
		getName() {
			return "Pusher";
		}
	})
);
