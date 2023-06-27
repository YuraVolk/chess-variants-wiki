import { useContext } from "react";
import { UserContext } from "../services/PersistedStorage/PieceThemeContext";
import { GameDisplayContext } from "@components/BoardComponents/BoardContext";
import { useSelector } from "react-redux";
import { selectEditorFENSettings } from "../redux/SidebarEditor/SidebarEditorSlice";
import type { RootState } from "../redux/store";
import type { NumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { PlayerName, playerNames } from "@moveGeneration/GameInformation/GameData";
import type { IndexedColor } from "../interfaces/Colors";
import { throwOnNever } from "../baseTypes";

export const useContextualPlayerColor = () => {
	const userContext = useContext(UserContext),
		{ id } = useContext(GameDisplayContext);
	const wb: boolean = useSelector<RootState, boolean>((state) => selectEditorFENSettings(state, id).fenOptions.wb);

	return (color: NumericColor): [PlayerName, IndexedColor] => {
		switch (color) {
			case 0:
				if (wb) {
					return ["White", userContext.colors.whiteBlackColors[0]];
				}
			// * Fallthrough
			case 2:
				if (wb) {
					return ["Black", userContext.colors.whiteBlackColors[1]];
				}
			// * Fallthrough
			case 1:
			case 3:
				return [playerNames[color], userContext.colors.pieceColors[color]];
			default:
				return throwOnNever(color);
		}
	};
};
