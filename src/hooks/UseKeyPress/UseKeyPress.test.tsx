import { fireEvent, renderHook } from "@testing-library/react";
import { useKeyPress } from "./UseKeyPress";

describe("UseKeyPress", () => {
	let handlerMock: jest.Mock;

	beforeEach(() => {
		handlerMock = jest.fn();
	});

	afterEach(() => {
		handlerMock.mockReset();
	});

	it("should call handler when specified key is pressed", () => {
		renderHook(() => useKeyPress(" ", handlerMock));
		fireEvent.keyDown(window, { key: " " });
		expect(handlerMock).toHaveBeenCalledTimes(1);
	});

	it("should not call handler when non-specified key is pressed", () => {
		renderHook(() => useKeyPress(" ", handlerMock));
		fireEvent.keyDown(window, { key: "g" });
		expect(handlerMock).toHaveBeenCalledTimes(0);
	});

	it("should not call handler when isActive is false", () => {
		renderHook(() => useKeyPress(" ", handlerMock, false));
		fireEvent.keyDown(window, { key: " " });
		expect(handlerMock).toHaveBeenCalledTimes(0);
	});
});
