import processPieceMedians, { PieceMedianCounterSettings } from "./PieceMedianProcessor";

if (typeof self !== "undefined") {
	self.onmessage = (e: MessageEvent<PieceMedianCounterSettings>) => {
		postMessage(processPieceMedians(e.data));
	};
}
