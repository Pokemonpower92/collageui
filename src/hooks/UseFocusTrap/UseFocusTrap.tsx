import { useEffect, RefObject } from "react";

// Define the hook's parameters type
type UseFocusTrapProps = {
	ref: RefObject<HTMLElement>;
	isActive: boolean;
};

const FOCUSABLE_ELEMENTS_QUERY = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled])",
	"textarea:not([disabled])",
	"select:not([disabled])",
	"details",
	'[tabindex]:not([tabindex="-1"])',
].join(", ");

export const useFocusTrap = ({ ref, isActive }: UseFocusTrapProps) => {
	useEffect(() => {
		const element = ref.current;
		const previousActiveElement = document.activeElement;

		if (isActive && element) {
			// Find all focusable elements within the container
			const focusableElements = Array.from(
				element.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS_QUERY)
			);

			const firstFocusableElement = focusableElements[0];
			const lastFocusableElement =
				focusableElements[focusableElements.length - 1];

			// Focus the first element when activated
			firstFocusableElement?.focus();

			const handleKeyDown = (e: KeyboardEvent): void => {
				if (e.key !== "Tab") return;

				if (e.shiftKey) {
					// If shift + tab and on first element, move to last
					if (document.activeElement === firstFocusableElement) {
						e.preventDefault();
						lastFocusableElement?.focus();
					}
				} else {
					// If tab and on last element, move to first
					if (document.activeElement === lastFocusableElement) {
						e.preventDefault();
						firstFocusableElement?.focus();
					}
				}
			};

			// Add event listener
			element.addEventListener("keydown", handleKeyDown);

			return () => {
				element.removeEventListener("keydown", handleKeyDown);
				if (previousActiveElement instanceof HTMLElement) {
					previousActiveElement.focus();
				}
			};
		}

		return () => {
			if (previousActiveElement instanceof HTMLElement) {
				previousActiveElement.focus();
			}
		};
	}, [ref, isActive]);
};
