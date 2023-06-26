import React, { useContext } from "react";
import styles from "../EditorSidebar.module.scss";
import { GameDisplayContext } from "@components/BoardComponents/BoardContext";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@client/ts/redux/store";
import type { Tuple } from "@client/ts/baseTypes";
import { colors, type GamePlayerData, type totalPlayers } from "@moveGeneration/GameInformation/GameData";
import { changePlayerElo, changePlayerName, selectEditorGameData } from "@client/ts/redux/SidebarEditor/SidebarEditorSlice";

export const PlayerFieldsEditor = () => {
	const { id } = useContext(GameDisplayContext);
	const dispatch = useDispatch<AppDispatch>();
	const players = useSelector<RootState, Tuple<GamePlayerData, typeof totalPlayers>>((state) => selectEditorGameData(state, id).players);

	return (
		<>
			<fieldset className={styles["fen-tags__fieldset"]}>
				<legend className={styles["fen-tags__text"]}>Player Names</legend>
				{colors.map((index) => {
					return (
						<input
                            key={index}
							className={styles["fen-tags__input"]}
							value={players[index].name}
							onChange={(e) => dispatch(changePlayerName({ id, index, newValue: e.target.value }))}
						/>
					);
				})}
			</fieldset>
            <fieldset className={styles["fen-tags__fieldset"]}>
				<legend className={styles["fen-tags__text"]}>Player Elo Ratings</legend>
				{colors.map((index) => {
					return (
						<input
                            key={index}
                            type="number"
                            min="1"
                            max="9999"
                            className={styles["fen-tags__input"]}
							value={players[index].elo}
							onChange={(e) => dispatch(changePlayerElo({ id, index, newValue: e.target.value }))}
						/>
					);
				})}
			</fieldset>
		</>
	);
};
