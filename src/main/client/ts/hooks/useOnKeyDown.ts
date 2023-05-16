import { useCallback, useEffect, useMemo, useState } from "react";

export const useOnKeyDown = (keys: string[], callback?: (keys: ReadonlySet<string>) => void) => {
	const keySet = useMemo(() => new Set(keys), [keys]);
	const [currentKeys, setCurrentKeys] = useState<ReadonlySet<string>>(new Set());
	const onKeyDown = useCallback(
		(event: KeyboardEvent) => {
			const newSet = new Set(...currentKeys);
			if (!newSet.has(event.key) && keySet.has(event.key)) {
				newSet.add(event.key);
				callback?.(newSet);
				setCurrentKeys(newSet);
			}
		},
		[callback, currentKeys, keySet]
	);
	const onKeyReleased = useCallback(
		(event: KeyboardEvent) => {
			const newSet = new Set(...currentKeys);
			if (keySet.has(event.key)) {
				newSet.delete(event.key);
				callback?.(newSet);
				setCurrentKeys(newSet);
			}
		},
		[callback, currentKeys, keySet]
	);

	useEffect(() => {
		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("keyup", onKeyReleased);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("keyup", onKeyReleased);
		};
	}, [onKeyDown, onKeyReleased]);

	return currentKeys;
};
