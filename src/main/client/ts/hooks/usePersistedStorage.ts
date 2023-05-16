import { useState, useEffect, useCallback, useMemo } from "react";

export interface PersistedStorageParameters<T> {
	initialValue: T;
	localStorageTag: string;
	validateValue: (input: unknown) => T;
	stringifyValue: (object: T) => string;
	onStorageChanged: () => void;
}
export const usePersistedStorage = <T>(
	parameters: PersistedStorageParameters<T>
): [T, (value: T | ((defaultValue?: T | undefined) => T)) => void] => {
	const [persistedState, setPersistedState] = useState(parameters.initialValue);

	useEffect(() => {
		const suppliedState = localStorage.getItem(parameters.localStorageTag);
		setPersistedState(suppliedState ? parameters.validateValue(suppliedState) : parameters.initialValue);
	}, [parameters]);
	useEffect(() => {
		localStorage.setItem(parameters.localStorageTag, parameters.stringifyValue(persistedState));
	}, [parameters, persistedState]);

	const handleOnChange = useCallback(
		(e: StorageEvent) => {
			if (e.key === parameters.localStorageTag) {
				parameters.onStorageChanged();
				setPersistedState(e.newValue ? parameters.validateValue(e.newValue) : parameters.initialValue);
			}
		},
		[parameters]
	);
	useEffect(() => {
		window.addEventListener("storage", handleOnChange);
		return () => {
			window.removeEventListener("storage", handleOnChange);
		};
	}, [handleOnChange]);

	return useMemo(() => {
		const verifyFunctionType = (value: T | ((defaultValue?: T) => T)): value is (defaultValue?: T) => T => typeof value === "function";
		const updateValue = (value: T | ((defaultValue?: T) => T)) => {
			const updated = verifyFunctionType(value) ? value(persistedState) : value;
			if (updated !== persistedState) {
				setPersistedState(updated);
				window.localStorage.setItem(parameters.localStorageTag, parameters.stringifyValue(updated));
			}
		};

		return [persistedState, updateValue];
	}, [parameters, persistedState]);
};
