import {
	cloneElement,
	createContext,
	useContext,
	useEffect,
	useRef,
} from "react";

const ModalContext = createContext();

const callAll =
	(...fns) =>
	(...args) =>
		fns.forEach(async (fn) => fn && (await fn(...args)));

function Modal({ isOpen, closeModal, size = "md", children, otherProps }) {
	const value = {
		isOpen,
		closeModal,
	};

	return (
		<ModalContext.Provider value={value}>
			{isOpen && <ModalContainer size={size}>{children}</ModalContainer>}
		</ModalContext.Provider>
	);
}

function ModalContainer({ size, children }) {
	return (
		<Overlay>
			<div className={`Modal__base ${size}`}>{children}</div>
		</Overlay>
	);
}

function Overlay({ children }) {
	const { closeModal } = useContext(ModalContext);
	const modalRef = useRef(null);

	const handleOutsideClick = (event) => {
		if (!modalRef.current?.contains(event.target)) {
			closeModal();
		}
	};

	useEffect(() => {
		const handleEscape = (event) => {
			if (event.key === "Escape") {
				closeModal();
			}
		};

		document.addEventListener("keyup", handleEscape);
		return () => document.removeEventListener("keyup", handleEscape);
	}, [closeModal]);

	return (
		<div className="Modal__overlay" onClick={handleOutsideClick}>
			<div ref={modalRef}>{children}</div>
		</div>
	);
}

function ModalDismissButton({ children: child }) {
	const { closeModal } = useContext(ModalContext);

	return cloneElement(child, {
		onClick: callAll(() => closeModal(), child.props.onClick),
	});
}

function ModalOpenButton({ children: child }) {
	const { closeModal } = useContext(ModalContext);

	return cloneElement(child, {
		onClick: callAll(() => closeModal(), child.props.onClick),
	});
}

function ModalHeader({ children }) {
	return (
		<div className="Modal__header">
			{children && <h3>{children}</h3>}
			<ModalDismissButton>
				<button className="Modal__close-button">
					<span aria-hidden>x</span>
				</button>
			</ModalDismissButton>
		</div>
	);
}

function ModalCancelButton({ onCancel, children }) {
	const { closeModal } = useContext(ModalContext);
	return (
		<span
			onClick={() => callAll(onCancel && onCancel(), closeModal())}
			aria-label="Cancelar"
			className="Modal__cancel"
			role="button"
		>
			{children ?? "Cancelar"}
		</span>
	);
}

function ModalSubmitButton({ onSubmit, children }) {
	return (
		<button onClick={onSubmit} className="Modal__submit" type="button">
			{children ?? "Agregar"}
		</button>
	);
}

function ModalButtons({ children }) {
	return <div className="Modal__btns">{children}</div>;
}

function ModalContent({ title, children, ...props }) {
	return <div className="Modal__content">{children}</div>;
}

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Buttons = ModalButtons;
Modal.CancelButton = ModalCancelButton;
Modal.SubmitButton = ModalSubmitButton;

export default Modal;
