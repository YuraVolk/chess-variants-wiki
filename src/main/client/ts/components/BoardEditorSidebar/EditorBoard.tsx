import React, { useContext, useCallback, useRef, useEffect } from "react";
import styles from "./EditorSidebar.module.scss";
import { GameDisplayContext } from "@components/BoardComponents/BoardContext";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@client/ts/redux/store";
import type { BoardSquares } from "@client/ts/logic/BaseInterfaces";
import type { PieceStringObject } from "@moveGeneration/GameInformation/GameUnits/PieceString";
import {
	disableEnabledSquares,
	dropPiece,
	selectEditorBoardSquares,
	selectEditorFENSettings,
	selectEditorSidebar,
	setCoordinateBasedTagSquare,
	setCurrentDroppedPiece
} from "@client/ts/redux/SidebarEditor/SidebarEditorSlice";
import type { PublicFENSettings } from "@client/ts/logic/index/GameBoardWorker";
import { alterCoordinate, getCSSPropertiesFromDimension } from "@components/BoardComponents/GameDisplay/GameDisplay";
import { checkDimensionIntersection } from "@client/ts/logic/utils/Tags/TagLogic/FENDataTag";
import { GameDisplaySquareWrap } from "@components/BoardComponents/GameDisplay/GameSquareWrap";
import { GameDisplaySquare } from "@components/BoardComponents/GameDisplay/GameDisplaySquare";
import type { Coordinate, NumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { PlayerBoxContainer } from "@components/BoardComponents/GameDisplay/GameDisplayPlayerBox";
import { assertTargetIsNode } from "@utils/BrowserUtils";
import { sparePieceSelectorsID } from "./SparePieces";
import type { FENOptionsTags } from "@moveGeneration/FENData/FENOptions/FENOptionsTagsInterface";

interface EditorBoardProps {
	currentPerspective: NumericColor;
}

export const EditorBoard = (props: EditorBoardProps) => {
	const { id } = useContext(GameDisplayContext);
	const boardRef = useRef<HTMLDivElement>(null);
	const dispatch = useDispatch<AppDispatch>();
	const boardSquares = useSelector<RootState, BoardSquares<PieceStringObject>>((state) => selectEditorBoardSquares(state, id));
	const fenSettings = useSelector<RootState, PublicFENSettings>((state) => selectEditorFENSettings(state, id));
	const isActive = useSelector<RootState, boolean>((state) => selectEditorSidebar(state, id).isDroppingEnabled);
	const selectedTag = useSelector<RootState, keyof FENOptionsTags | undefined>(
		(state) => selectEditorSidebar(state, id).selectedCoordinateFENtag
	);

	const onDrag = useCallback(
		(e: React.DragEvent<HTMLDivElement>, coordinate: Coordinate) => {
			e.preventDefault();
			if (!isActive) dispatch(setCurrentDroppedPiece({ id, piece: coordinate }));
		},
		[dispatch, id, isActive]
	);
	const onClick = useCallback(
		(i: number, j: number) => {
			if (selectedTag) {
				dispatch(setCoordinateBasedTagSquare({ id, coordinate: [i, j] }));
			} else dispatch(dropPiece({ id, endCoordinate: [i, j] }));
		},
		[dispatch, id, selectedTag]
	);

	useEffect(() => {
		const handleOutsideClick = ({ target }: MouseEvent) => {
			assertTargetIsNode(target);
			if (!boardRef.current?.contains(target) && !(target instanceof HTMLElement && target.closest(`[id|=${sparePieceSelectorsID}]`))) {
				dispatch(disableEnabledSquares({ id }));
			}
		};

		document.addEventListener("click", handleOutsideClick);
		return () => {
			document.removeEventListener("click", handleOutsideClick);
		};
	}, [dispatch, id]);

	const cssProperties = getCSSPropertiesFromDimension(fenSettings.fenOptions.dim),
		dimensionMax = Math.max(...fenSettings.fenOptions.dim);
	return (
		<div
			className={`${styles.board} ${isActive ? styles["board--active"] : ""} ${selectedTag ? styles["board--clickable"] : ""}`}
			style={cssProperties}
			ref={boardRef}>
			{boardSquares.map((r, initialI) => {
				return (
					<div className={styles["board-row"]} key={initialI}>
						{r.map((_, initialJ) => {
							if (checkDimensionIntersection([dimensionMax, dimensionMax], [initialI, initialJ])) return null;
							const [i, j] = alterCoordinate([initialI, initialJ], props.currentPerspective);

							return (
								<div
									draggable={boardSquares[i][j].value.length !== 0}
									onDrag={(e) => onDrag(e, [initialI, initialJ])}
									onDragOver={(e) => e.preventDefault()}
									onDrop={() => dispatch(dropPiece({ id, endCoordinate: [initialI, initialJ] }))}
									onClick={() => onClick(initialI, initialJ)}
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
