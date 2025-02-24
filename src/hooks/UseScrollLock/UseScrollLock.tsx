import { useEffect } from "react";

/**
 * useScrollLock conditionally locks scrolling by
 * modifying document.body.style.overflow
 * @param isActive should scoll be locked
 */
export const useScrollLock = (isActive: boolean) => {
	useEffect(() => {
		if (isActive) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "visible";
		}
		return () => {
			document.body.style.overflow = "visible";
		};
	}, [isActive]);
};
