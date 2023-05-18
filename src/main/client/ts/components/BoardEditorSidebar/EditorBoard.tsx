import React, { useContext, useCallback } from "react";
import styles from "./EditorSidebar.module.scss";
import { GameDisplayContext } from "@components/BoardComponents/BoardContext";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@client/ts/redux/store";
import type { BoardSquares } from "@client/ts/logic/BaseInterfaces";
import type { PieceStringObject } from "@moveGeneration/GameInformation/GameUnits/PieceString";
import {
	dropPiece,
	selectEditorBoardSquares,
	selectEditorFENSettings,
	setCurrentDroppedPiece
} from "@client/ts/redux/SidebarEditor/SidebarEditorSlice";
import { PublicFENSettings } from "@client/ts/logic/index/GameBoardWorker";
import { alterCoordinate, getCSSPropertiesFromDimension } from "@components/BoardComponents/GameDisplay/GameDisplay";
import { checkDimensionIntersection } from "@client/ts/logic/utils/Tags/TagLogic/FENDataTag";
import { GameDisplaySquareWrap } from "@components/BoardComponents/GameDisplay/GameSquareWrap";
import { GameDisplaySquare } from "@components/BoardComponents/GameDisplay/GameDisplaySquare";
import type { Coordinate, NumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { PlayerBoxContainer } from "@components/BoardComponents/GameDisplay/GameDisplayPlayerBox";

interface EditorBoardProps {
	currentPerspective: NumericColor;
}

export const EditorBoard = (props: EditorBoardProps) => {
	const { id } = useContext(GameDisplayContext);
	const dispatch = useDispatch<AppDispatch>();
	const boardSquares = useSelector<RootState, BoardSquares<PieceStringObject>>((state) => selectEditorBoardSquares(state, id));
	const fenSettings = useSelector<RootState, PublicFENSettings>((state) => selectEditorFENSettings(state, id));
	const onDrag = useCallback(
		(e: React.DragEvent<HTMLDivElement>, coordinate: Coordinate) => {
			e.preventDefault();
			dispatch(setCurrentDroppedPiece({ id, piece: coordinate }));
		},
		[dispatch, id]
	);

	const cssProperties = getCSSPropertiesFromDimension(fenSettings.fenOptions.dim),
		dimensionMax = Math.max(...fenSettings.fenOptions.dim);
	return (
		<div className={styles.board} style={cssProperties}>
			{boardSquares.map((r, initialI) => {
				return (
					<div className={styles["board-row"]} key={initialI}>
						{r.map((_, initialJ) => {
							if (checkDimensionIntersection([dimensionMax, dimensionMax], [initialI, initialJ])) return null;
							const [i, j] = alterCoordinate([initialI, initialJ], props.currentPerspective);

							return (
								<div
									draggable
									onDrag={(e) => onDrag(e, [initialI, initialJ])}
									onDragOver={(e) => e.preventDefault()}
									onDrop={() => dispatch(dropPiece({ id, endCoordinate: [initialI, initialJ] }))}
									key={`${i}-${j}`}>
									<GameDisplaySquareWrap>
										<GameDisplaySquare pieceString={boardSquares[i][j]} displaySettings={[]} />
									</GameDisplaySquareWrap>
								</div>
							);
						})}
					</div>
				);
			})}
			<PlayerBoxContainer />
		</div>
	);
};
