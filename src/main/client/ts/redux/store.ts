import { configureStore } from "@reduxjs/toolkit";
import gameBoardReducer from "../logic/index/GameBoardSlice";
import sidebarEditorsReducer from "./SidebarEditor/SidebarEditorSlice";
import variantNamesReducer from "./WorkerSync/VariantNameSlice";
import createSagaMiddleware from "@redux-saga/core";
import { all } from "@redux-saga/core/effects";
import * as WorkerSagas from "./WorkerSync/WorkerSaga";

const sagaMiddleware = createSagaMiddleware();
function* rootSaga() {
	yield all([
		WorkerSagas.watchWorkerConstruct(),
		WorkerSagas.watchWorkerChanges(),
		WorkerSagas.trackLegalMovesChanges(),
		WorkerSagas.watchCurrentMoveChanges(),
		WorkerSagas.trackDeleteMoveRequests(),
		WorkerSagas.trackFogOfWarPerspective()
	]);
}

export const store = configureStore({
	reducer: {
		gameBoards: gameBoardReducer,
		sidebarEditors: sidebarEditorsReducer,
		variantNames: variantNamesReducer
	},
	devTools: process.env.NODE_ENV !== "production",
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActionPaths: ["meta.arg", "meta.baseQueryMeta", "payload.worker"]
			}
		}).prepend(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
