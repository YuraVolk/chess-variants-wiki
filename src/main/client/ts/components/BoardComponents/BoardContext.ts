import type { StateControllerValue } from "@client/ts/redux/GeneralBoardSelectors";
import { createContext } from "react";

interface GameDisplayContext {
	id: number;
	worker: Worker;
	stateController: StateControllerValue;
}
export const GameDisplayContext = createContext<GameDisplayContext>({} as GameDisplayContext);
