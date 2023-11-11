import {
	MoveComponent,
	verifyStandardMove,
	SpecialMove,
	verifyInternalMove,
	InternalMoveSignature
} from "@moveGeneration/MoveTree/MoveTreeInterface";
import { pieceControlConfigSettings } from "@moveGeneration/PieceControl/PieceControlInterface";
import { createBotAlgorithm, ZombieMoveGenerationAlgorithm, ZombieType } from "../BotInterface";
import { comfuterAlgorithm, comfuterBaseAlgorithm } from "./ComfuterEvaluation";
import { Board } from "@moveGeneration/Board/Board";

export const createComfuterBasedAlgorithm = (
	algorithm: Omit<ZombieMoveGenerationAlgorithm, "pickPreferredMove">
): ZombieMoveGenerationAlgorithm & { canHaveAlternativeLines(board: Board): boolean } => ({
	...algorithm,
	pickPreferredMove(...args) {
		return comfuterAlgorithm.pickPreferredMove.apply(this, args);
	},
	canHaveAlternativeLines(board) {
		return comfuterBaseAlgorithm.canHaveAlternativeLines.call(this, board);
	}
});

export const comfuterCheckerAlgorithm = createBotAlgorithm(
	createComfuterBasedAlgorithm({
		stringifiedType: ZombieType.F_Checker,
		evaluate(moves, board): Map<MoveComponent, number> {
			const baseEvaluations = comfuterAlgorithm.evaluate.call(this, moves, board);

			for (const [move, evaluation] of baseEvaluations) {
				if (verifyInternalMove(move)) continue;
				const snapshot = board.createSnapshot();
				const { checks, checkmates } = board.makeMove([move]);
				const checksLength = checks.filter(Boolean).length;
				baseEvaluations.set(move, evaluation + (checkmates.includes(true) ? checksLength * 500 : checksLength * 1500));
				board.moves.deleteMove(board.moves.currentMove);
				board.loadSnapshot(snapshot);
			}

			return baseEvaluations;
		},
		getName() {
			return "Futer-Checker";
		}
	})
);

export const comfuterMuncherAlgorithm = createBotAlgorithm(
	createComfuterBasedAlgorithm({
		stringifiedType: ZombieType.F_Muncher,
		evaluate(moves, board): Map<MoveComponent, number> {
			const baseEvaluations = comfuterAlgorithm.evaluate.call(this, moves, board);

			for (const [move, evaluation] of baseEvaluations) {
				if (!verifyStandardMove(move)) continue;
				if (move.specialType === SpecialMove.EnPassant || board.board[move.endCoordinates[0]][move.endCoordinates[1]].isEmpty())
					continue;

				baseEvaluations.set(move, evaluation + 5000);
			}

			return baseEvaluations;
		},
		getName() {
			return "Futer-Muncher";
		}
	})
);

export const comfuterPusherAlgorithm = createBotAlgorithm(
	createComfuterBasedAlgorithm({
		stringifiedType: ZombieType.F_Pusher,
		evaluate(moves, board): Map<MoveComponent, number> {
			const baseEvaluations = comfuterAlgorithm.evaluate.call(this, moves, board);

			for (const [move, evaluation] of baseEvaluations) {
				if (!verifyStandardMove(move)) continue;
				const pieceString = board.board[move.startCoordinates[0]][move.startCoordinates[1]];
				if (pieceString.isPiece() && !pieceControlConfigSettings[pieceString.piece].moveGenerationSettings.isPawn) {
					baseEvaluations.set(move, evaluation + 5000);
				}
			}

			return baseEvaluations;
		},
		getName() {
			return "Futer-Pusher";
		}
	})
);

export const patzerAlgorithm = createBotAlgorithm(
	createComfuterBasedAlgorithm({
		stringifiedType: ZombieType.Patzer,
		evaluate(moves, defaultBoard): Map<MoveComponent, number> {
			const baseEvaluations = comfuterAlgorithm.evaluate.call(this, moves, defaultBoard);

			for (const [move, evaluation] of baseEvaluations) {
				if (
					verifyInternalMove(move) &&
					(move.type === InternalMoveSignature.Resign ||
						move.type === InternalMoveSignature.ClaimWin ||
						move.type === InternalMoveSignature.DrawByAgreement ||
						move.type === InternalMoveSignature.Timeout)
				) {
					baseEvaluations.set(move, -Infinity);
				} else baseEvaluations.set(move, -evaluation);
			}

			return baseEvaluations;
		},
		getName() {
			return "Patzer";
		}
	})
);
