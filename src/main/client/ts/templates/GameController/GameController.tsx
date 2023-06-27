import React, { useState, useEffect, useCallback, useId } from "react";
import styles from "./GameController.module.scss";
import { hashString } from "@utils/StringFormatUtils";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@client/ts/redux/store";
import { gameBoardsAdapter } from "@client/ts/logic/index/GameBoardSlice";
import { createBoardFromSettingsAction, createConstructBoardAction } from "@client/ts/redux/WorkerSync/WorkerSaga";
import { GameFENDisplay } from "./GameFENDisplay";
import { GameControllerInternalActions } from "./GameControllerInternalActions";
import type { NumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { getNeighboringSideToMove } from "@moveGeneration/FENData/FENDataInterface";
import type { PublicFENSettings } from "@client/ts/logic/index/GameBoardWorker";
import { GameDisplayContext } from "@components/BoardComponents/BoardContext";
import { GameDisplay } from "@components/BoardComponents/GameDisplay/GameDisplay";
import { GameMoveTreeDisplay } from "@components/BoardComponents/MoveTree/GameMoveTree";
import { GameMetadataRules } from "@components/VariantRules/GameVariantRulesList";
import { GameMetadataDisplay } from "./GameVariantTypeDisplay";
import { addTemplate } from "../TemplateInterface";
import { GameControllerPlaceholder } from "@components/BoardComponents/BoardPlaceholder/GameControllerPlaceholder";
import type { BoardTemplateProps } from "../BoardTemplateInterface";
import { EditorBoard } from "@components/BoardEditorSidebar/EditorBoard";
import { EditorSidebar } from "@components/BoardEditorSidebar/EditorSidebar";
import { SidebarEditorInterface, stripUnnecessaryBandwidthFromEditor } from "@client/ts/redux/SidebarEditor/SidebarEditorInterface";
import { sidebarEditorsAdapter } from "@client/ts/redux/SidebarEditor/SidebarEditorSlice";

interface GameControllerProps extends BoardTemplateProps {
	pgn4: string;
}

const GameController = (props: GameControllerProps) => {
	const [isSidebarOpened, setOpenSidebar] = useState(false);
	const [currentPerspective, setCurrentPerspective] = useState<NumericColor>(0);
	const boardId = hashString(useId());
	const dispatch = useDispatch<AppDispatch>();
	const [worker] = useState(() => new Worker(new URL("@client/ts/logic/index/GameBoardWorker.ts", import.meta.url)));
	useEffect(() => {
		dispatch(createConstructBoardAction({ args: [props.variantname ?? String(boardId), props.pgn4], id: boardId, worker }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const initializationComplete = useSelector<RootState, boolean>(
		(state) => gameBoardsAdapter.getSelectors().selectById(state.gameBoards, boardId)?.initializationComplete ?? false
	);
	const fenSettings = useSelector<RootState, PublicFENSettings | undefined>(
		(state) => gameBoardsAdapter.getSelectors().selectById(state.gameBoards, boardId)?.publicFENSettings
	);
	const editorBoard = useSelector<RootState, SidebarEditorInterface | undefined>((state) =>
		sidebarEditorsAdapter.getSelectors().selectById(state.sidebarEditors, boardId)
	);

	const changePerspective = useCallback(() => {
		if (fenSettings) setCurrentPerspective(getNeighboringSideToMove(currentPerspective, fenSettings.fenOptions.resigned));
	}, [currentPerspective, fenSettings]);

	const onApplyChanges = useCallback(() => {
		if (!editorBoard) return;
		dispatch(createBoardFromSettingsAction({ id: boardId, worker, args: [stripUnnecessaryBandwidthFromEditor(editorBoard)] }));
		setOpenSidebar(false);
	}, [boardId, dispatch, editorBoard, worker]);

	return (
		<GameDisplayContext.Provider value={{ id: boardId, worker, stateController: isSidebarOpened ? "sidebarEditors" : "gameBoards" }}>
			<article className={styles["game-control-root"]}>
				<GameControllerPlaceholder enabled={!initializationComplete} />
				{initializationComplete && (
					<div className={styles["game-control-wrap"]}>
						<section className={styles["game-board-wrap"]}>
							{isSidebarOpened ? (
								<EditorBoard currentPerspective={currentPerspective} />
							) : (
								<GameDisplay key={boardId} currentPerspective={currentPerspective} />
							)}
						</section>
						{isSidebarOpened ? (
							<EditorSidebar onDiscardChanges={() => setOpenSidebar(false)} onApplyChanges={() => onApplyChanges()} />
						) : (
							<section className={styles["game-board-sidebar"]}>
								<div className={styles["metadata-display"]}>
									<GameMetadataDisplay />
									<GameMetadataRules />
								</div>
								<GameMoveTreeDisplay />
								<GameFENDisplay />
								<GameControllerInternalActions
									currentPerspective={currentPerspective}
									changeCurrentPerspective={() => changePerspective()}
									openSidebar={() => setOpenSidebar(true)}
								/>
							</section>
						)}
					</div>
				)}
			</article>
		</GameDisplayContext.Provider>
	);
};

export default addTemplate("game-controller", GameController);
