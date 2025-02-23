import { useEffect } from "react";

/**
 * useKeyPress handles a keypress
 * @param key the name of the key to handle
 * @param handler the function that should run on the key event
 * @param isActive should the hook evaluate events.
 */
export const useKeyPress = (
	key: string,
	handler: () => void,
	isActive = true
) => {
	if (!isActive) return;
	useEffect(() => {
		const listener = (event: KeyboardEvent) => {
			if (event.key === key) {
				handler();
			}
		};
		window.addEventListener("keydown", listener);
		return () => window.removeEventListener("keydown", listener);
	}, [key, handler]);
};
