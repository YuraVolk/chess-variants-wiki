import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { DisplaySettings } from "@moveGeneration/Board/BoardInterface";
import { PieceString, PieceStringObject } from "@moveGeneration/GameInformation/GameUnits/PieceString";
import {
	Move,
	MoveComponent,
	StripPieceStringObjects,
	verifyDroppingMove,
	verifyDroppingMoveArray,
	verifyStandardMove
} from "@moveGeneration/MoveTree/MoveTreeInterface";
import styles from "./GameDisplay.module.scss";
import { PromotionDialog } from "./GameDisplayPromotion";
import { GameDisplaySquare } from "./GameDisplaySquare";
import { PieceBankList } from "./GameDisplayBank";
import { ChainedMoveNoticeType, GameDisplayChainedMoveNotice } from "./GameDisplayChainedMoveNotice";
import { PlayerBoxContainer } from "./GameDisplayPlayerBox";
import { initImagesList } from "./GameDisplayPiece";
import { GameDisplaySquareWrap } from "./GameSquareWrap";
import { Coordinate, nonPlayablePieces, NumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@client/ts/redux/store";
import {
	ChainedMoveSettings,
	getChainedDuckDrops,
	getChainedDuckMoves,
	selectChainedMoveSettings,
	selectGameBoardFENSettings,
	selectGameBoardSquares,
	selectGameBoardVariantData,
	selectHighlightedSquares,
	selectSquareVisibility,
	setChainedMoveSettings
} from "@client/ts/logic/index/GameBoardSlice";
import { createLegalMovesAction, createMoveAction } from "@client/ts/redux/WorkerSync/WorkerSaga";
import { GameDisplayContext } from "../BoardContext";
import type { BoardSquares } from "@client/ts/logic/BaseInterfaces";
import type { VariantDataRules } from "@moveGeneration/VariantRules/VariantRuleInterface";
import { boardDimension } from "@moveGeneration/GameInformation/GameData";
import { checkDimensionIntersection } from "@client/ts/logic/utils/Tags/TagLogic/FENDataTag";
import { GameDisplayArrows } from "./Arrows/GameDisplayArrows";

export const cornerArea = 3,
	cornerAreaToPx = 2 << (cornerArea + 1),
	dimensionRegressionConstant = cornerAreaToPx * boardDimension;

interface ExtendedProperties extends React.CSSProperties {
	"--board-piece-size": string;
}

export function getCSSPropertiesFromDimension(dimension: [number, number]): ExtendedProperties {
	const dimensionMax = Math.max(...dimension);
	return {
		"--board-piece-size": `${dimensionRegressionConstant / dimensionMax}px`
	};
}

interface GameDisplayProps {
	currentPerspective: NumericColor;
	locked?: boolean;
}

export function alterCoordinate([i, j]: Coordinate, perspective: NumericColor) {
	const arrayDimension = boardDimension - 1;
	switch (perspective) {
		case 0:
			return [i, j];
		case 1:
			return [j, arrayDimension - i];
		case 2:
			return [arrayDimension - i, j];
		case 3:
			return [arrayDimension - j, i];
	}
}

initImagesList();
export const GameDisplay = (props: GameDisplayProps) => {
	const { worker, id } = useContext(GameDisplayContext);
	const chainedMoveSettings = useSelector<RootState, ChainedMoveSettings>((state) => selectChainedMoveSettings(state, id));
	const boardSquares = useSelector<RootState, BoardSquares<PieceStringObject>>((state) => selectGameBoardSquares(state, id));
	const highlightedSquares = useSelector<RootState, BoardSquares<StripPieceStringObjects<Move> | undefined>>((state) =>
		selectHighlightedSquares(state, id)
	);
	const squareVisibility = useSelector<RootState, BoardSquares<DisplaySettings[]>>((state) => selectSquareVisibility(state, id));
	const variantDataRules = useSelector<RootState, StripPieceStringObjects<VariantDataRules>>((state) => selectGameBoardVariantData(state, id));
	const dimension = useSelector<RootState, [number, number]>((state) => selectGameBoardFENSettings(state, id).fenOptions.dim);
	const [hoveredSquare, setHoveredSquare] = useState<Coordinate | undefined>();
	const dispatch = useDispatch<AppDispatch>();

	const getLegalMoves = useCallback(
		(i: number, j: number) => {
			if (chainedMoveSettings.duck) {
				const pieceString = PieceString.fromObjectToClass(boardSquares[i][j]);
				if (pieceString.isEmpty() || pieceString.piece !== nonPlayablePieces.duck) return;
				dispatch(getChainedDuckMoves({ id }));
			} else {
				dispatch(createLegalMovesAction({ id, worker, args: [i, j] }));
			}
		},
		[boardSquares, chainedMoveSettings.duck, dispatch, id, worker]
	);

	const makeMove = (move: StripPieceStringObjects<Move>) => {
		const currentMove = move[move.length - 1];
		const firstMove: StripPieceStringObjects<MoveComponent> = move[0];

		if (verifyStandardMove(firstMove) && firstMove.promotion && firstMove.promotion.length !== 1) {
			dispatch(
				setChainedMoveSettings({
					id,
					settings: {
						promotionOptions: firstMove
					}
				})
			);
		} else if (currentMove.nextChainedMoves) {
			if (!verifyDroppingMove(currentMove) && variantDataRules.seirawanSetup && verifyDroppingMoveArray(currentMove.nextChainedMoves)) {
				dispatch(
					setChainedMoveSettings({
						id,
						settings: {
							seirawanDrops: { move: currentMove, chainedMoves: currentMove.nextChainedMoves }
						}
					})
				);
			} else if (!verifyDroppingMove(currentMove) && variantDataRules.duckChess) {
				dispatch(getChainedDuckDrops({ id, move: currentMove }));
			}
		} else dispatch(createMoveAction({ id, worker, args: [move] }));
	};

	const handleSquareClick = (i: number, j: number) => {
		const legalMove = highlightedSquares[i][j];
		if (legalMove === undefined) {
			getLegalMoves(i, j);
		} else {
			makeMove(legalMove);
		}
	};

	const obtainNoticeType = useCallback(() => {
		if (chainedMoveSettings.seirawanDrops) {
			return ChainedMoveNoticeType.SEIRAWAN_DROP;
		} else if (chainedMoveSettings.duck?.duckDroppingMove) {
			return ChainedMoveNoticeType.DROP_DUCK;
		} else if (chainedMoveSettings.duck?.duckMove) {
			return ChainedMoveNoticeType.MOVE_DUCK;
		} else {
			return false;
		}
	}, [chainedMoveSettings.duck?.duckDroppingMove, chainedMoveSettings.duck?.duckMove, chainedMoveSettings.seirawanDrops]);
	const noticeType = obtainNoticeType();

	const onSquareHover = useCallback(
		(coordinate: Coordinate) => {
			if (
				!variantDataRules.atomic ||
				!highlightedSquares[coordinate[0]][coordinate[1]] ||
				!PieceString.fromObjectToClass(boardSquares[coordinate[0]][coordinate[1]]).isPiece()
			)
				return;
			setHoveredSquare(coordinate);
		},
		[boardSquares, highlightedSquares, variantDataRules.atomic]
	);
	const onSquareLeaveHover = useCallback(() => {
		if (!variantDataRules.atomic) return;
		setHoveredSquare(undefined);
	}, [variantDataRules.atomic]);
	useEffect(() => {
		setHoveredSquare(undefined);
	}, [highlightedSquares]);

	const cssProperties = getCSSPropertiesFromDimension(dimension),
		dimensionMax = Math.max(...dimension);
	const boardRef = useRef<HTMLDivElement>(null);
	return (
		<div className={styles.wrap} style={cssProperties}>
			<div ref={boardRef}>
				{boardSquares.map((r, initialI) => {
					return (
						<div className={styles.row} key={initialI}>
							{r.map((_, initialIJ) => {
								if (checkDimensionIntersection([dimensionMax, dimensionMax], [initialI, initialIJ])) return null;
								const [i, j] = alterCoordinate([initialI, initialIJ], props.currentPerspective);
								const modificationsArray = squareVisibility[i][j].slice();
								if (highlightedSquares[i][j]) modificationsArray.push(DisplaySettings.Highlighted);
								return (
									<GameDisplaySquareWrap
										onClickHandler={() => handleSquareClick(i, j)}
										key={`${i}${j}`}
										coordinate={[i, j]}
										onMouseEnterHandler={(coordinate) => onSquareHover(coordinate)}
										onMouseLeaveHandler={() => onSquareLeaveHover()}
										atomicHoveredSquare={hoveredSquare}>
										<GameDisplaySquare pieceString={boardSquares[i][j]} displaySettings={modificationsArray} />
									</GameDisplaySquareWrap>
								);
							})}
						</div>
					);
				})}
			</div>
			<div className={styles["dialog-window"]}>
				<PromotionDialog promotionPieceLimit={16} pieceSize={32} onPieceClickCallback={(data) => makeMove([data])} />
				<GameDisplayChainedMoveNotice noticeType={noticeType} />
			</div>
			{!props.locked && (
				<>
					<PieceBankList />
					<PlayerBoxContainer />
					<GameDisplayArrows boardDimension={dimensionMax} baseBoardRef={boardRef} />
				</>
			)}
		</div>
	);
};
