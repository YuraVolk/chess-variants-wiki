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
	hasCastling?: MoveComponent;
	isIrreversible: boolean;
}

export function validateBoardMove(board: Board, move: Move): SpecialMoveSettings | false {
	let startingMoves: MoveComponent[],
		isCastling = false;
	const firstMove = move[0],
		royal = board.data.fenOptions.tag("royal")[board.data.sideToMove];
	if (verifyStandardMove(firstMove)) {
		if (royal && (firstMove.specialType === SpecialMove.CastlingKingside || firstMove.specialType === SpecialMove.CastlingQueenside)) {
			isCastling = true;
			startingMoves = board.getLegalMoves(royal[0], royal[1]);
		} else startingMoves = board.getLegalMoves(firstMove.startCoordinates[0], firstMove.startCoordinates[1]);
	} else if (verifyDroppingMove(firstMove)) {
		startingMoves = board.getDroppingMoves(firstMove.piece);
	} else if (verifyInternalMove(firstMove)) {
		startingMoves = board.getAllowedInternalMoves();
	} else throw new Error(`Unexpected move signature encountered: ${JSON.stringify(move)}`);

	const specialMoveSettings: SpecialMoveSettings = {
		hasEnPassant: false,
		isIrreversible: false
	};
	if (board.variantData.duckChess && move.length === 1) return false;
	for (const moveComponent of move) {
		const move =
			isCastling && moveComponent === firstMove
				? startingMoves.find(
						(legalMove) =>
							verifyStandardMove(legalMove) &&
							verifyStandardMove(moveComponent) &&
							legalMove.specialType === moveComponent.specialType
				  )
				: startingMoves.find((legalMove) => compareMoves(legalMove, moveComponent));
		if (!move) return false;

		if (isCastling && moveComponent === firstMove && royal && verifyStandardMove(move)) {
			specialMoveSettings.hasCastling = {
				...moveComponent,
				startCoordinates: [...move.startCoordinates],
				endCoordinates: [...move.endCoordinates]
			};
		}

		if (verifyStandardMove(move) && move.specialType === SpecialMove.EnPassant) specialMoveSettings.hasEnPassant = true;
		if (move.isIrreversible) specialMoveSettings.isIrreversible = true;
		if (move.nextChainedMoves) startingMoves = move.nextChainedMoves;
	}

	return specialMoveSettings;
}
