import { GameDisplayContext } from "@components/BoardComponents/BoardContext";
import { GameDisplay, dimensionRegressionConstant } from "@components/BoardComponents/GameDisplay/GameDisplay";
import { verifyNumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { hashString } from "@utils/StringFormatUtils";
import React, { useState, useId, useEffect } from "react";
import { addTemplate } from "../TemplateInterface";
import styles from "./BoardDisplay.module.scss";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@client/ts/redux/store";
import { createConstructBoardAction } from "@client/ts/redux/WorkerSync/WorkerSaga";
import { gameBoardsAdapter } from "@client/ts/logic/index/GameBoardSlice";
import { BoardPlaceholder } from "@components/BoardComponents/BoardPlaceholder/BoardPlaceholder";
import type { BoardTemplateProps } from "../BoardTemplateInterface";

interface BoardDisplayProps extends BoardTemplateProps {
	pgn4: string;
	perspective?: number;
}

const BoardDisplay = (props: BoardDisplayProps) => {
	const [worker] = useState(() => new Worker(new URL("@client/ts/logic/index/GameBoardWorker.ts", import.meta.url)));
	const id = hashString(useId());
	const initializationComplete = useSelector<RootState, boolean>(
		(state) => gameBoardsAdapter.getSelectors().selectById(state.gameBoards, id)?.initializationComplete ?? false
	);

	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(createConstructBoardAction({ args: [props.variantname ?? String(id), props.pgn4], id, worker }));
	}, [dispatch, id, props, worker]);

	const perspective = props.perspective !== undefined && verifyNumericColor(props.perspective) ? props.perspective : 0;

	return (
		<article
			className={styles["board-display"]}
			style={{
				width: `${dimensionRegressionConstant}px`,
				height: `${dimensionRegressionConstant}px`
			}}>
			<BoardPlaceholder enabled={!initializationComplete} />
			{initializationComplete && (
				<GameDisplayContext.Provider value={{ id, worker, stateController: "gameBoards" }}>
					<GameDisplay currentPerspective={perspective} locked={true} />
				</GameDisplayContext.Provider>
			)}
		</article>
	);
};

export default addTemplate("board-display", BoardDisplay);
