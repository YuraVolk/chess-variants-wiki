import React from "react";
import { createRoot } from "react-dom/client";
import MarkdownParse from "./Rehype";
import { ToastContainer } from "react-toastify";
import "../scss/Global.scss";
import "../scss/Normalize.scss";
import "../scss/vendor/ChessGlyph.scss";
import "react-tooltip/dist/react-tooltip.css";
import "react-toastify/dist/ReactToastify.css";
import { initImagesList, resetNamesEnum } from "./components/BoardComponents/GameDisplay/GameDisplayPiece";
import { PersistedStorageParameters, usePersistedStorage } from "./hooks/usePersistedStorage";
import {
	PieceThemeContextInterface,
	initBaseUserContext,
	validateUserContext,
	UserContext
} from "./services/PersistedStorage/PieceThemeContext";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import ReactModal from "react-modal";
import { assertNonUndefined } from "./baseTypes";

const themeContextSettings: PersistedStorageParameters<PieceThemeContextInterface> = {
	initialValue: initBaseUserContext(),
	localStorageTag: "userTheme",
	validateValue: validateUserContext,
	stringifyValue: (object) => JSON.stringify(object),
	onStorageChanged: () => {
		resetNamesEnum();
		initImagesList();
	}
};

const Main = () => {
	const [themeContext] = usePersistedStorage(themeContextSettings);

	return (
		<div id="main">
			<ToastContainer />
			<UserContext.Provider value={themeContext}>
				<MarkdownParse></MarkdownParse>
			</UserContext.Provider>
		</div>
	);
};

const mountPoint = document.getElementById("react-mountpoint");
assertNonUndefined(mountPoint);
ReactModal.setAppElement(mountPoint);
createRoot(mountPoint).render(
	<Provider store={store}>
		<Main />
	</Provider>
);
