import { useRef } from "react";
import { createPortal } from "react-dom";
import { useKeyPress } from "../../../hooks/UseKeyPress/UseKeyPress";
import { useScrollLock } from "../../../hooks/UseScrollLock/UseScrollLock";
import { useFocusTrap } from "../../../hooks/UseFocusTrap/UseFocusTrap";

import styles from "./Modal.module.css";

interface ModalProps {
	title: string;
	children: React.ReactNode;
	size?: "sm" | "md" | "lg";
	isOpen: boolean;
	onClose: () => void;
}

export const Modal = ({
	title,
	children,
	size = "sm",
	isOpen,
	onClose,
}: ModalProps) => {
	const modalRef = useRef<HTMLDivElement>(null);
	useKeyPress("Escape", onClose, isOpen);
	useScrollLock(isOpen);
	useFocusTrap({ ref: modalRef, isActive: isOpen });

	if (!isOpen) return null;

	return createPortal(
		<div
			className={`${styles.overlay} ${isOpen ? styles.visible : styles.hidden}`}
			onClick={onClose}
			aria-hidden={!isOpen}
		>
			<div
				ref={modalRef}
				className={`${styles.modal} ${styles[size]}`}
				onClick={(e) => e.stopPropagation()}
				role="dialog"
				aria-modal="true"
				aria-labelledby="modal-title"
			>
				<div className={styles.header}>
					<h2 id="modal-title" className={styles.title}>
						{title}
					</h2>
					<button
						className={styles.closeButton}
						onClick={onClose}
						aria-label="Close modal"
					>
						×
					</button>
				</div>
				<div className={styles.content}>{children}</div>
			</div>
		</div>,
		document.body
	);
};
