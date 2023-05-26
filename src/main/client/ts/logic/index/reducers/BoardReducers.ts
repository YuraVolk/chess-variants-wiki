import { PieceStringObject, PieceString } from "@moveGeneration/GameInformation/GameUnits/PieceString";
import {
	StripPieceStringObjects,
	Move,
	MoveData,
	InternalMove,
	verifyDroppingMoveArray,
	verifyStandardMoveArray,
	DroppingMove
} from "@moveGeneration/MoveTree/MoveTreeInterface";
import type { Draft, EntityState, PayloadAction } from "@reduxjs/toolkit";
import { initializeBoardSquares } from "../../BaseInterfaces";
import { ChainedMoveSettings, GameBoardObject, gameBoardsAdapter } from "../GameBoardSlice";

export const boardReducers = {
	getChainedDuckMoves: (state: Draft<EntityState<GameBoardObject>>, action: PayloadAction<{ id: number }>) => {
		const { id } = action.payload;
		const gameBoard = gameBoardsAdapter.getSelectors().selectById(state, id);
		if (!gameBoard?.chainedMoveSettings.duck?.duckMove) return;
		const highlightedSquares = initializeBoardSquares<StripPieceStringObjects<Move> | undefined>(() => undefined);

		for (const move of gameBoard.chainedMoveSettings.duck.duckMove) {
			highlightedSquares[move.endCoordinates[0]][move.endCoordinates[1]] = [gameBoard.chainedMoveSettings.duck.move, move];
		}

		gameBoardsAdapter.updateOne(state, {
			type: "gameBoard/updateChainedDuckMoves",
			payload: {
				id: action.payload.id,
				changes: { highlightedSquares }
			}
		});
	},
	getChainedDuckDrops: (
		state: Draft<EntityState<GameBoardObject>>,
		action: PayloadAction<{ id: number; move: StripPieceStringObjects<MoveData | InternalMove> }>
	) => {
		const { id, move } = action.payload;
		const gameBoard = gameBoardsAdapter.getSelectors().selectById(state, id);
		if (!move.nextChainedMoves || !gameBoard) return;

		if (verifyDroppingMoveArray(move.nextChainedMoves)) {
			const newSettings: Partial<ChainedMoveSettings> = {
				duck: { duckDroppingMove: move.nextChainedMoves, move }
			};

			const highlightedSquares = initializeBoardSquares<StripPieceStringObjects<Move> | undefined>(() => undefined);
			for (const drop of move.nextChainedMoves) {
				highlightedSquares[drop.endCoordinates[0]][drop.endCoordinates[1]] = [move, drop];
			}

			gameBoardsAdapter.updateOne(state, {
				type: "gameBoard/updateChainedDuckDrops",
				payload: {
					id: action.payload.id,
					changes: { highlightedSquares, chainedMoveSettings: newSettings }
				}
			});
		} else if (verifyStandardMoveArray(move.nextChainedMoves)) {
			gameBoardsAdapter.updateOne(state, {
				type: "gameBoard/updateChainedDuckDropsSettings",
				payload: {
					id: action.payload.id,
					changes: {
						chainedMoveSettings: {
							duck: { duckMove: move.nextChainedMoves, move }
						}
					}
				}
			});
		}
	},
	getChainedSeirawanMoves: (state: Draft<EntityState<GameBoardObject>>, action: PayloadAction<{ piece: PieceStringObject; id: number }>) => {
		const { id, piece } = action.payload;
		const gameBoard = gameBoardsAdapter.getSelectors().selectById(state, id);
		if (!gameBoard?.chainedMoveSettings.seirawanDrops) return;
		const highlightedSquares = initializeBoardSquares<StripPieceStringObjects<Move> | undefined>(() => undefined);

		for (const drop of gameBoard.chainedMoveSettings.seirawanDrops.chainedMoves) {
			if (PieceString.comparePieceStringObjects(drop.piece, piece)) {
				highlightedSquares[drop.endCoordinates[0]][drop.endCoordinates[1]] = [gameBoard.chainedMoveSettings.seirawanDrops.move, drop];
				break;
			}
		}

		gameBoardsAdapter.updateOne(state, {
			type: "gameBoard/updateChainedSeirawanMoves",
			payload: { id, changes: { highlightedSquares } }
		});
	},
	setLegalMoves: (
		state: Draft<EntityState<GameBoardObject>>,
		action: PayloadAction<{ legalMoves: StripPieceStringObjects<MoveData[] | DroppingMove[]>; id: number }>
	) => {
		const highlightedSquares = initializeBoardSquares<StripPieceStringObjects<Move> | undefined>(() => undefined);
		const { legalMoves, id } = action.payload;

		for (const legalMove of legalMoves) {
			highlightedSquares[legalMove.endCoordinates[0]][legalMove.endCoordinates[1]] = [legalMove];
		}

		gameBoardsAdapter.updateOne(state, {
			type: "gameBoard/setLegalMoves",
			payload: { id, changes: { highlightedSquares } }
		});
	}
};
