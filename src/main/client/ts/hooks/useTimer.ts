import { useCallback, useEffect, useRef, useState } from "react";

interface TimerParameters {
	autoStart?: boolean;
	totalTime?: number;
	decrement?: number;
	interval: number;
	onTimeout?: () => void;
	onUpdate?: () => void;
}

export const useTimer = (parameters: TimerParameters) => {
	const totalTime = parameters.totalTime ?? Infinity,
		decrement = parameters.decrement ?? 1;

	const [secondsLeft, setSeconds] = useState(totalTime);
	const [isRunning, toggleRunning] = useState(Boolean(parameters.autoStart));
	const intervalRef = useRef<number>(NaN);

	const pause = useCallback(() => {
		toggleRunning(false);
	}, []);

	const reset = useCallback(() => {
		setSeconds(totalTime);
	}, [totalTime]);

	const start = useCallback(() => {
		toggleRunning(true);
	}, []);

	const toggle = useCallback(() => {
		if (isRunning) {
			toggleRunning(false);
			setSeconds(totalTime);
		} else toggleRunning(true);
	}, [isRunning, totalTime]);

	const stop = useCallback(() => {
		toggleRunning(false);
		setSeconds(totalTime);
	}, [totalTime]);

	useEffect(() => {
		if (isRunning) {
			intervalRef.current = window.setInterval(() => {
				const newSeconds = secondsLeft - decrement;
				if (newSeconds <= 0) {
					parameters.onTimeout?.();
					toggleRunning(false);
				} else {
					parameters.onUpdate?.();
					setSeconds(newSeconds);
				}
			}, parameters.interval);
		} else {
			window.clearInterval(intervalRef.current);
		}

		return () => window.clearInterval(intervalRef.current);
	}, [decrement, isRunning, parameters, secondsLeft]);

	return { pause, reset, start, toggle, stop, secondsLeft, isRunning };
};
