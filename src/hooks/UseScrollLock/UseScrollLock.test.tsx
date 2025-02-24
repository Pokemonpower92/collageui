import { renderHook } from "@testing-library/react";
import { useScrollLock } from "./UseScrollLock";

describe("useScrollLock", () => {
	beforeEach(() => {
		document.body.style.overflow = "";
	});

	it("locks scrolling when isActive is true", () => {
		renderHook(() => useScrollLock(true));
		expect(document.body.style.overflow).toBe("hidden");
	});

	it("doesn't lock scrolling when isActive is false", () => {
		renderHook(() => useScrollLock(false));
		expect(document.body.style.overflow).toBe("visible");
	});

	it("unlocks scrolling when unmounted", () => {
		const { unmount } = renderHook(() => useScrollLock(true));
		expect(document.body.style.overflow).toBe("hidden");
		unmount();
		expect(document.body.style.overflow).toBe("visible");
	});

	it("unlocks scrolling when isActive is set to false", () => {
		const { rerender } = renderHook(({ isActive }) => useScrollLock(isActive), {
			initialProps: { isActive: true },
		});
		expect(document.body.style.overflow).toBe("hidden");
		rerender({ isActive: false });
		expect(document.body.style.overflow).toBe("visible");
	});
});
