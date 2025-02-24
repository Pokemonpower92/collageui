import { fireEvent, render } from "@testing-library/react";
import { useFocusTrap } from "./UseFocusTrap";
import { useRef } from "react";
import userEvent from "@testing-library/user-event";

const TestContainer = ({ isActive }: { isActive: boolean }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	useFocusTrap({ ref: containerRef, isActive });

	return (
		<div ref={containerRef}>
			<button>First</button>
			<button>Middle</button>
			<button>Last</button>
		</div>
	);
};

describe("useFocusTrap", () => {
	let outsideButton: HTMLButtonElement;

	beforeEach(() => {
		outsideButton = document.createElement("button");
		document.body.appendChild(outsideButton);
		outsideButton.focus();
	});

	afterEach(() => {
		document.body.innerHTML = "";
	});

	it("should focus first focusable element when activated", () => {
		const { getByText } = render(<TestContainer isActive={true} />);
		const firstButton = getByText("First");
		expect(document.activeElement).toBe(firstButton);
	});

	it("should not focus first element when not active", () => {
		render(<TestContainer isActive={false} />);
		expect(document.activeElement).toBe(outsideButton);
	});

	it("should trap Tab key and cycle through elements", async () => {
		const { getByText } = render(<TestContainer isActive={true} />);
		const first = getByText("First");
		const middle = getByText("Middle");
		const last = getByText("Last");

		// Start at first button
		expect(document.activeElement).toBe(first);

		// Simulate tab press
		await userEvent.tab();
		expect(document.activeElement).toBe(middle);

		// Tab to last button
		await userEvent.tab();
		expect(document.activeElement).toBe(last);

		// Tab should cycle back to first button
		await userEvent.tab();
		expect(document.activeElement).toBe(first);
	});

	it("should trap Shift+Tab key and cycle through elements backwards", async () => {
		const { getByText } = render(<TestContainer isActive={true} />);
		const first = getByText("First");
		const middle = getByText("Middle");
		const last = getByText("Last");

		// Start at first button
		expect(document.activeElement).toBe(first);

		// Shift+Tab to last button
		await userEvent.tab({ shift: true });
		expect(document.activeElement).toBe(last);

		// Shift+Tab to middle button
		await userEvent.tab({ shift: true });
		expect(document.activeElement).toBe(middle);

		// Shift+Tab to first button
		await userEvent.tab({ shift: true });
		expect(document.activeElement).toBe(first);
	});

	it("should not trap focus when not active", () => {
		render(<TestContainer isActive={false} />);
		fireEvent.keyDown(outsideButton, { key: "Tab" });
		expect(document.activeElement).toBe(outsideButton);
	});

	it("should restore previous focus when deactivated", () => {
		const { rerender } = render(<TestContainer isActive={true} />);
		const firstButton = document.activeElement;

		// Focus should be on first button
		expect(firstButton?.textContent).toBe("First");

		// Deactivate focus trap
		rerender(<TestContainer isActive={false} />);

		// Focus should return to original element
		expect(document.activeElement).toBe(outsideButton);
	});

	it("should restore previous focus when unmounted", () => {
		const { unmount, getByText } = render(<TestContainer isActive={true} />);
		const firstButton = getByText("First");

		// Focus should be on first button
		expect(document.activeElement).toBe(firstButton);

		// Unmount component
		unmount();

		// Focus should return to original element
		expect(document.activeElement).toBe(outsideButton);
	});
});
