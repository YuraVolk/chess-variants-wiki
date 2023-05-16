import {
	GameData,
	obtainTimeControlType,
	stringifyTimeControl,
	TimeControl,
	TimeControlType,
	VariantType
} from "@moveGeneration/GameInformation/GameData";
import { createHexColor, IndexedColor, wrapIndexedColor } from "@client/ts/interfaces/Colors";
import { throwOnNever } from "@client/ts/baseTypes";
import React, { useContext } from "react";
import styles from "./GameController.module.scss";
import { UserContext } from "@client/ts/services/PersistedStorage/PieceThemeContext";
import { selectGameBoardType, selectGameData } from "@client/ts/logic/index/GameBoardSlice";
import { RootState } from "@client/ts/redux/store";
import { useSelector } from "react-redux";
import { GameDisplayContext } from "@components/BoardComponents/BoardContext";

const TimeControlIcon = (props: { timeControl: TimeControl }) => {
	const userContext = useContext(UserContext);
	const timeControlType = obtainTimeControlType(props.timeControl);
	interface TimeControlConfiguration {
		className: string;
		color: IndexedColor;
	}
	const configuration: TimeControlConfiguration = {
		className: `${styles["time-control-display__icon"]} `,
		color: createHexColor("#fff")
	};
	switch (timeControlType) {
		case TimeControlType.Hyperbullet:
			configuration.className += styles["time-control-display__icon--hyperbullet"];
			configuration.color = userContext.timeControlColors.rapid;
			break;
		case TimeControlType.Bullet:
			configuration.className += styles["time-control-display__icon--bullet"];
			configuration.color = userContext.timeControlColors.blitz;
			break;
		case TimeControlType.Blitz:
			configuration.className += styles["time-control-display__icon--blitz"];
			configuration.color = userContext.timeControlColors.bullet;
			break;
		case TimeControlType.Rapid:
			configuration.className += styles["time-control-display__icon--rapid"];
			configuration.color = userContext.timeControlColors.hyperbullet;
			break;
		default:
			return throwOnNever(timeControlType);
	}

	return <span className={configuration.className} style={{ color: wrapIndexedColor(configuration.color) }}></span>;
};

export const GameMetadataDisplay = () => {
	const id = useContext(GameDisplayContext).id;
	const variantType = useSelector<RootState, VariantType>((state) => selectGameBoardType(state, id));
	const gameData = useSelector<RootState, GameData | undefined>((state) => selectGameData(state, id));
	if (!gameData) return null;

	return (
		<div className={styles["time-control-display"]}>
			<TimeControlIcon timeControl={gameData.timeControl} />
			<span className={styles["metadata-display__game-details"]}>{`${stringifyTimeControl(gameData.timeControl)} ${variantType}`}</span>
		</div>
	);
};
