import { wrapIndexedColor } from "@client/ts/interfaces/Colors";
import { playerNames, totalPlayers } from "@moveGeneration/GameInformation/GameData";
import { toast } from "react-toastify";
import React, { useContext, useCallback, useState, useEffect } from "react";
import styles from "./GameController.module.scss";
import { defaultToastSettings } from "@client/ts/services/Toast";
import { UserContext } from "@client/ts/services/PersistedStorage/PieceThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@client/ts/redux/store";
import { createConstructBoardAction, createdPreferredBotMoveAction } from "@client/ts/redux/WorkerSync/WorkerSaga";
import { downloadFile } from "@utils/BrowserUtils";
import type { SerializedBoardStrings } from "@client/ts/logic/utils/Tags/InputOutputProcessing";
import { PublicFENSettings } from "@client/ts/logic/index/GameBoardWorker";
import { GameDisplayContext } from "@components/BoardComponents/BoardContext";
import { chessGlyphIndex } from "@client/fonts/chessGlyphIndex";
import { selectFENSettings, selectSerializedStrings, selectVariantData } from "@client/ts/redux/GeneralBoardSelectors";

export const GameFENDisplay = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { id, worker, stateController } = useContext(GameDisplayContext);
	const userContext = useContext(UserContext);
	const pgn4strings = useSelector<RootState, SerializedBoardStrings>((state) => selectSerializedStrings({ stateController, id, state }));
	const fenSettings = useSelector<RootState, PublicFENSettings>((state) => selectFENSettings({ stateController, id, state }));
	const deadKingWalking = useSelector<RootState, boolean>((state) => selectVariantData({ stateController, id, state }).deadKingWalking);
	const deadPlayers = fenSettings.fenOptions.resigned.reduce((p, n, i) => p + Number(n || fenSettings.fenOptions.dead[i]), 0);
	const pgn4 = `${pgn4strings.board}\n\n${pgn4strings.moves}`;
	const [localPGN4, setLocalPGN4] = useState(pgn4);

	useEffect(() => {
		setLocalPGN4(pgn4);
	}, [pgn4]);

	const copyPGNtoClipboard = useCallback(() => {
		navigator.clipboard.writeText(pgn4).then(
			() => {
				toast("Copied PGN4 to clipboard", {
					...defaultToastSettings,
					type: "success"
				});
			},
			() => {
				toast("Failed to copy PGN4 to clipboard", {
					...defaultToastSettings,
					type: "error"
				});
			}
		);
	}, [pgn4]);

	const loadGameBoard = useCallback(
		(pgn4: string) => {
			dispatch(createConstructBoardAction({ args: [pgn4, ""], worker, id }));
		},
		[dispatch, id, worker]
	);

	const loadFile = useCallback(() => {
		const fileInput = document.createElement("input");
		fileInput.setAttribute("type", "file");
		fileInput.style.display = "none";

		fileInput.onchange = () => {
			const file = fileInput.files?.[0];
			if (!file) return;

			const reader = new FileReader();
			reader.onload = (result) => {
				if (typeof result.target?.result === "string") loadGameBoard(pgn4);
			};
			reader.readAsText(file);
		};

		document.body.appendChild(fileInput);
		fileInput.click();
		document.body.removeChild(fileInput);
	}, [loadGameBoard, pgn4]);

	const playPreferredComputerMove = useCallback(() => {
		dispatch(createdPreferredBotMoveAction({ id, worker }));
	}, [dispatch, id, worker]);

	const sideToMove = fenSettings.sideToMove;
	return (
		<div className={styles["fen-data"]}>
			<div className={styles["fen-data__side-to-move-wrap"]}>
				<span
					className={styles["fen-data__side-to-move"]}
					style={{
						color: wrapIndexedColor(userContext.colors.pieceColors[sideToMove])
					}}>
					{playerNames[sideToMove]}'s move
				</span>
				{deadPlayers < totalPlayers - 1 && (
					<span
						className={`${styles["fen-data__futer-to-move"]} ${
							deadKingWalking && fenSettings.fenOptions.resigned[sideToMove] ? styles["fen-data__futer-to-move--active"] : ""
						}`}
						onClick={() => playPreferredComputerMove()}></span>
				)}
			</div>
			<ul className={styles["fen-data__pgn-button-list"]}>
				<li className={styles["fen-data__pgn-button-wrap"]}>
					<button
						className={styles["fen-data__pgn-button"]}
						onClick={() => {
							loadFile();
						}}>
						Open...
					</button>
				</li>
				<li className={styles["fen-data__pgn-button-wrap"]}>
					<button
						className={styles["fen-data__pgn-button"]}
						onClick={() => {
							loadGameBoard(pgn4);
						}}>
						Load
					</button>
				</li>
				<li className={styles["fen-data__pgn-button-wrap"]}>
					<button
						className={`${styles["fen-data__pgn-button"]} ${styles["fen-data__pgn-button--icon-button"]}`}
						onClick={() => {
							setLocalPGN4("");
						}}>
						{chessGlyphIndex.trashBin}
					</button>
				</li>
				<li className={styles["fen-data__pgn-button-wrap"]}>
					<button
						className={`${styles["fen-data__pgn-button"]} ${styles["fen-data__pgn-button--icon-button"]}`}
						onClick={() => {
							copyPGNtoClipboard();
						}}>
						{chessGlyphIndex.copyToClipboardFromText}
					</button>
				</li>
				<li className={styles["fen-data__pgn-button-wrap"]}>
					<button
						className={`${styles["fen-data__pgn-button"]} ${styles["fen-data__pgn-button--icon-button"]}`}
						onClick={() => downloadFile("pgn4.txt", pgn4)}>
						{chessGlyphIndex.downloadIcon}
					</button>
				</li>
			</ul>
			<textarea
				className={styles["fen-data__pgn-box"]}
				spellCheck="false"
				placeholder="PGN4"
				value={localPGN4}
				onChange={(e) => setLocalPGN4(e.target.value)}></textarea>
		</div>
	);
};
