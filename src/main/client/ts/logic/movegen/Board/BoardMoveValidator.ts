import {
	compareMoves,
	Move,
	MoveComponent,
	SpecialMove,
	verifyDroppingMove,
	verifyInternalMove,
	verifyStandardMove
} from "../MoveTree/MoveTreeInterface";
import type { Board } from "./Board";

export interface SpecialMoveSettings {
	hasEnPassant: boolean;
}

export function validateBoardMove(board: Board, move: Move): SpecialMoveSettings | false {
	let startingMoves: MoveComponent[];
	const firstMove = move[0];
	if (verifyStandardMove(firstMove)) {
		startingMoves = board.getLegalMoves(firstMove.startCoordinates[0], firstMove.startCoordinates[1]);
	} else if (verifyDroppingMove(firstMove)) {
		startingMoves = board.getDroppingMoves(firstMove.piece);
	} else if (verifyInternalMove(firstMove)) {
		startingMoves = board.getAllowedInternalMoves();
	} else throw new Error(`Unexpected move signature encountered: ${JSON.stringify(move)}`);

	const specialMoveSettings: SpecialMoveSettings = {
		hasEnPassant: false
	};
	if (board.variantData.duckChess && move.length === 1) return false;
	for (const moveComponent of move) {
		const move = startingMoves.find((legalMove) => compareMoves(legalMove, moveComponent));
		if (!move) return false;
		if (verifyStandardMove(move) && move.specialType === SpecialMove.EnPassant) {
			specialMoveSettings.hasEnPassant = true;
		}

		if (move.nextChainedMoves) {
			startingMoves = move.nextChainedMoves;
		}
	}

	return specialMoveSettings;
}
