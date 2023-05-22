/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { call, put, take, fork, select, delay, spawn } from "@redux-saga/core/effects";
import { Action, createAction } from "@reduxjs/toolkit";
import { compareArrays } from "@utils/ArrayUtils";
import {
	changeCurrentFogPerspective,
	changeCurrentMove,
	createNewGameBoard,
	GameBoardObject,
	GameBoardObjectSetProperties,
	getCurrentMove,
	resetInteractionSettings,
	restartInitialization,
	setLegalMoves,
	updateInteractionSettings
} from "../../logic/index/GameBoardSlice";
import {
	BoardWorkerArguments,
	BoardWorkerRequest,
	BoardWorkerRequestBody,
	BoardWorkerReturnType,
	dispatchSyncRecord,
	initialDispatches,
	requiredDispatches
} from "../../logic/index/GameBoardWorker";
import { moveTreeActionTypes } from "../../logic/index/reducers/MoveTreeReducers";
import { VariantGeneratedData, addInsufficientMaterialState, getVariantName } from "./VariantNameSlice";

const verifyWorkerRequest = <K extends BoardWorkerRequest>(
	testKey: K,
	returnType: BoardWorkerReturnType<BoardWorkerRequest>
): returnType is BoardWorkerReturnType<K> => returnType[0] === testKey;
const createLocalAction = <K extends BoardWorkerRequest>(request: K) => createAction<WorkerSagaRequest<K>>(`gameBoardWorker/${request}`);

const constructBoard = createLocalAction("construct");
export const createConstructBoardAction = (request: Omit<WorkerSagaRequest<"construct">, "request">) =>
	constructBoard({ ...request, request: "construct" });
const makeMove = createLocalAction("makeMove");
export const createMoveAction = (request: Omit<WorkerSagaRequest<"makeMove">, "request">) => makeMove({ ...request, request: "makeMove" });
const loadSnapshotByPath = createLocalAction("loadSnapshotByPath");
export const createLoadSnapshotAction = (request: Omit<WorkerSagaRequest<"loadSnapshotByPath">, "request">) =>
	loadSnapshotByPath({ ...request, request: "loadSnapshotByPath" });
const deleteMove = createLocalAction("deleteMove");
export const createDeleteMoveAction = (request: Omit<WorkerSagaRequest<"deleteMove">, "request">) =>
	deleteMove({ ...request, request: "deleteMove" });
const getLegalMoves = createLocalAction("getLegalMoves");
export const createLegalMovesAction = (request: Omit<WorkerSagaRequest<"getLegalMoves">, "request">) =>
	getLegalMoves({ ...request, request: "getLegalMoves" });
const getDroppingMoves = createLocalAction("getDroppingMoves");
export const createDroppingMovesAction = (request: Omit<WorkerSagaRequest<"getDroppingMoves">, "request">) =>
	getDroppingMoves({ ...request, request: "getDroppingMoves" });
const playPreferredBotMove = createLocalAction("playPreferredBotMove");
export const createdPreferredBotMoveAction = (request: Omit<WorkerSagaRequest<"playPreferredBotMove">, "request" | "args">) =>
	playPreferredBotMove({ ...request, request: "playPreferredBotMove", args: [] });
const changeFogPerspective = createLocalAction("changeFogPerspective");
export const createFogPerspectiveAction = (request: Omit<WorkerSagaRequest<"changeFogPerspective">, "request" | "args">) =>
	changeFogPerspective({ ...request, request: "changeFogPerspective", args: [] });

const interceptMessage = <K extends BoardWorkerRequest>(request: K, worker: Worker) =>
	new Promise((resolve: (v: BoardWorkerReturnType<K>) => void, reject) => {
		worker.onmessage = (event: MessageEvent<BoardWorkerReturnType<BoardWorkerRequest>>) => {
			const response = event.data;
			if (verifyWorkerRequest(request, response)) {
				resolve(response);
			} else reject();
		};
	});

interface WorkerSagaRequest<K extends BoardWorkerRequest> {
	request: K;
	args: BoardWorkerArguments<K>;
	worker: Worker;
	id: number;
}

async function sendMessage<K extends BoardWorkerRequest>(parameters: WorkerSagaRequest<K>, blocking = false) {
	const { worker, args, request } = parameters;
	const requestBody: BoardWorkerRequestBody<K> = { requestName: request, parameters: args };
	worker.postMessage(requestBody);

	const v = await interceptMessage(request, worker);
	if (!blocking) worker.onmessage = null;
	return v;
}

function* syncWithWorker<K extends BoardWorkerRequest>(request: WorkerSagaRequest<K>, isInitial: boolean) {
	try {
		const results: Partial<GameBoardObjectSetProperties> = {};

		for (const dispatch of isInitial ? initialDispatches : requiredDispatches) {
			const payload: WorkerSagaRequest<typeof dispatch> = {
				...request,
				request: dispatch,
				args: []
			};
			const [requestName, returnType]: BoardWorkerReturnType<BoardWorkerRequest> = yield call(sendMessage, payload, true);
			const syncProperty = dispatchSyncRecord[requestName];
			if (syncProperty) results[syncProperty] = returnType as never;
		}

		yield put(
			updateInteractionSettings({
				id: request.id,
				settings: results
			})
		);
	} catch {
		yield put(resetInteractionSettings({ id: request.id }));
	} finally {
		request.worker.onmessage = null;
	}
}

export function* watchWorkerConstruct() {
	const currentVariantNames = new Set<string>();

	for (;;) {
		const { payload }: ReturnType<typeof constructBoard> = yield take(constructBoard);
		yield spawn(function* () {
			if (payload.worker.onmessage) return;
			yield put(restartInitialization({ id: payload.id }));
			const [variantName] = payload.args;
			if (currentVariantNames.has(variantName)) {
				while (currentVariantNames.has(variantName)) yield delay(200);
			}

			const generatedName: VariantGeneratedData = yield select(getVariantName, variantName);
			yield put(createNewGameBoard({ id: payload.id }));
			if (typeof generatedName !== "undefined") {
				yield call(sendMessage, {
					request: "constructWithGeneratedData",
					args: [payload.args[1], generatedName.insufficientMaterialData],
					worker: payload.worker,
					id: payload.id
				});
				yield fork(syncWithWorker, payload, true);
			} else {
				if (variantName) currentVariantNames.add(variantName);
				const result: BoardWorkerReturnType<"construct"> = yield call(sendMessage, payload, true);
				yield fork(syncWithWorker, payload, true);
				if (variantName) {	
					yield put(addInsufficientMaterialState({ id: variantName, variantData: result[1] }));
					currentVariantNames.delete(variantName);
				}
			}
		});
	}
}

export function* watchWorkerChanges() {
	for (;;) {
		const { payload }: ReturnType<typeof makeMove | typeof playPreferredBotMove> = yield take([makeMove, playPreferredBotMove]);
		if (!payload.worker.onmessage) {
			const result: BoardWorkerReturnType<"makeMove" | "playPreferredBotMove"> = yield call(sendMessage, payload, true);
			if (verifyWorkerRequest("playPreferredBotMove", result)) {
				const move = result[1];
				if (move) yield call(sendMessage, { ...payload, request: "makeMove", args: [move] }, true);
			}
			yield fork(syncWithWorker, payload, false);
		}
	}
}

export function* trackLegalMovesChanges() {
	for (;;) {
		const { payload }: ReturnType<typeof getLegalMoves | typeof getDroppingMoves> = yield take([getLegalMoves, getDroppingMoves]);
		if (!payload.worker.onmessage) {
			const results: BoardWorkerReturnType<BoardWorkerRequest> = yield call(sendMessage, payload);
			payload.worker.onmessage = null;
			if (verifyWorkerRequest("getLegalMoves", results) || verifyWorkerRequest("getDroppingMoves", results)) {
				yield put(setLegalMoves({ id: payload.id, legalMoves: results[1] }));
			}
		}
	}
}

function* attemptWorkerSync(payload: WorkerSagaRequest<BoardWorkerRequest>) {
	while (payload.worker.onmessage) yield delay(60);
	yield call(sendMessage, payload, true);
	yield fork(syncWithWorker, payload, false);
}

export function* watchCurrentMoveChanges() {
	for (;;) {
		yield take([(pattern?: Action<string>) => Object.values(moveTreeActionTypes).some((t) => t === pattern?.type), changeCurrentMove]);
		const { payload }: ReturnType<typeof loadSnapshotByPath> = yield take(loadSnapshotByPath);
		const currentMove: number[] = yield call(sendMessage, {
			id: payload.id,
			request: "getCurrentMove",
			args: [],
			worker: payload.worker
		});
		const gameBoardObject: GameBoardObject | undefined = yield select(getCurrentMove, payload.id);
		if (!gameBoardObject || compareArrays(currentMove, gameBoardObject.currentMove)) continue;
		yield* attemptWorkerSync({ ...payload, args: [gameBoardObject.currentMove] });
	}
}

export function* trackDeleteMoveRequests() {
	for (;;) {
		const { payload }: ReturnType<typeof deleteMove> = yield take(deleteMove);
		yield call(sendMessage, payload);

		const [, currentMove]: BoardWorkerReturnType<"getCurrentMove"> = yield call(sendMessage, {
			...payload,
			request: "getCurrentMove",
			args: []
		});
		const gameBoardObject: GameBoardObject | undefined = yield select(getCurrentMove, payload.id);
		if (!gameBoardObject) continue;
		if (compareArrays(gameBoardObject.currentMove, currentMove)) {
			const [, moveTree]: BoardWorkerReturnType<"getMoveTree"> = yield call(sendMessage, {
				...payload,
				request: "getMoveTree",
				args: []
			});
			yield put(updateInteractionSettings({ id: payload.id, settings: { moveTree } }));
		} else {
			yield* attemptWorkerSync({ ...payload, request: "loadSnapshotByPath", args: [currentMove] });
		}
	}
}

export function* trackFogOfWarPerspective() {
	for (;;) {
		const { payload }: ReturnType<typeof changeFogPerspective> = yield take(changeFogPerspective);
		const [, perspective]: BoardWorkerReturnType<"changeFogPerspective"> = yield call(sendMessage, payload);
		const [, visibility]: BoardWorkerReturnType<"getSquareVisibility"> = yield call(sendMessage, {
			...payload,
			request: "getSquareVisibility",
			args: []
		});
		yield put(changeCurrentFogPerspective({ id: payload.id, perspective, visibility }));
	}
}
