import React, { useContext } from "react";
import styles from "./GameDisplay.module.scss";
import { initializeComponentWithDirections } from "./GameDisplayBank";
import { wrapIndexedColor } from "../../../interfaces/Colors";
import defaultPlayerIcon from "@client/img/playerIcons/user-image.svg";
import { UserContext } from "@client/ts/services/PersistedStorage/PieceThemeContext";
import { convertSecondsToFlexibleHoursMinutesSeconds } from "@utils/StringFormatUtils";
import { selectGameData } from "@client/ts/logic/index/GameBoardSlice";
import type { RootState } from "@client/ts/redux/store";
import { useSelector } from "react-redux";
import { GameData, boardDimension, colors, getPlayerNameFromColor, playerNames, totalPlayers } from "@moveGeneration/GameInformation/GameData";
import { GameDisplayContext } from "../BoardContext";
import { NumericColor, verifyNumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { PublicFENSettings } from "@client/ts/logic/index/GameBoardWorker";
import { ProcessSafeMoveWrapper, getMoveFromPathAndTree } from "@moveGeneration/MoveTree/MoveTreeInterface";
import { verifyValidMove } from "@moveGeneration/MoveTree/MoveTree";
import { isVerticalPlacement } from "@client/ts/logic/BaseInterfaces";
import { selectCurrentMove, selectFENSettings, selectMoveTree } from "@client/ts/redux/GeneralBoardSelectors";

export interface PlayerBoxProps {
	color: NumericColor;
	timeInSeconds: number;
}
export const PlayerBox = (props: PlayerBoxProps) => {
	const { id, stateController } = useContext(GameDisplayContext);
	const {
		fenOptions: { wb, dim, noCorners },
		points,
		sideToMove
	} = useSelector<RootState, PublicFENSettings>((state) => selectFENSettings({ stateController, id, state }));
	const gameData = useSelector<RootState, GameData>((state) => selectGameData(state, id));
	const userContext = useContext(UserContext);

	const wrappedColor =
		isVerticalPlacement(props.color) && wb
			? wrapIndexedColor(userContext.colors.whiteBlackColors[props.color === 0 ? 0 : 1])
			: wrapIndexedColor(userContext.colors.pieceColors[props.color]);
	const { name = getPlayerNameFromColor(props.color, wb), elo } = gameData.players[props.color];

	const isPossibleToPlaceInCorner = Math.max(...dim) === boardDimension && !noCorners;

	const component = (
		<div className={`${styles["player-box"]} ${!isPossibleToPlaceInCorner ? styles["player-box--no-corners"] : ""}`}>
			<div
				className={styles["player-box__clock"]}
				style={{
					backgroundColor: wrappedColor
				}}>
				<div className={styles["player-box__clock-icon"]}></div>
				<span className={styles["player-box__clock-seconds"]}>{convertSecondsToFlexibleHoursMinutesSeconds(props.timeInSeconds)}</span>
			</div>
			<div className={styles["player-box__player-data"]}>
				<div
					className={styles["player-box__player-icon"]}
					style={{
						borderColor: wrappedColor,
						backgroundColor: wrappedColor
					}}>
					<img src={defaultPlayerIcon} alt="Default player icon" />
				</div>
				<div className={styles["player-box__player-info"]}>
					<p className={styles["player-box__player-text"]}>{name}</p>
					{elo !== undefined && <p className={styles["player-box__player-text"]}>({elo})</p>}
				</div>
			</div>
			<div className={styles["player-box__player-points-wrap"]}>
				<span className={styles["player-box__player-points"]}>{points[props.color] ?? 0}</span>
			</div>
		</div>
	);

	const configuration = {
		color: props.color,
		component,
		styles: {
			base: `${styles["player-box-wrap"]} ${sideToMove === props.color ? styles["player-box-wrap--active"] : ""} ${
				!isPossibleToPlaceInCorner ? styles["player-box-wrap--no-corners"] : ""
			}`,
			top: styles["player-box-wrap--top"],
			left: styles["player-box-wrap--left"],
			bottom: styles["player-box-wrap--bottom"],
			right: styles["player-box-wrap--right"]
		}
	};

	return initializeComponentWithDirections(configuration);
};

export const PlayerBoxContainer = () => {
	const { id, stateController } = useContext(GameDisplayContext);
	const {
		fenOptions: { boxOffset, dead }
	} = useSelector<RootState, PublicFENSettings>((state) => selectFENSettings({ stateController, id, state }));
	const moveTree = useSelector<RootState, ProcessSafeMoveWrapper[]>((state) => selectMoveTree({ stateController, id, state }));
	const currentMove = useSelector<RootState, number[]>((state) => selectCurrentMove({ stateController, id, state }));
	const gameData = useSelector<RootState, GameData>((state) => selectGameData(state, id));

	const playerBoxes: JSX.Element[] = [];
	for (const color of colors) {
		if (dead[color]) continue;
		let newColor = color;
		for (let i = 0; i < boxOffset; i++) {
			newColor++;
			if (newColor === totalPlayers) newColor = 0;
		}
		if (!verifyNumericColor(newColor)) continue;
		const selectedMove = getMoveFromPathAndTree(moveTree, currentMove);
		const currentTime = !verifyValidMove(selectedMove)
			? gameData.timeControl.baseTime
			: selectedMove.metadata.playerClock ?? gameData.timeControl.baseTime;
		playerBoxes.push(
			<PlayerBox color={newColor} timeInSeconds={currentTime} key={playerNames[color]} />
		);
	}

	return <div className={styles["player-box-container"]}>{playerBoxes}</div>;
};
