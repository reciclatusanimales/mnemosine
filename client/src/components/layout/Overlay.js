import { useEffect, useRef } from "react";

export default function Overlay({ children, onClickOutside, onEscape }) {
	const modalRef = useRef(null);

	const handleOutsideClick = (event) => {
		if (!modalRef.current?.contains(event.target)) {
			onClickOutside();
		}
	};

	useEffect(() => {
		const handleEscape = (event) => {
			if (event.key === "Escape") {
				onEscape();
			}
		};

		document.addEventListener("keyup", handleEscape);
		return () => document.removeEventListener("keyup", handleEscape);
	}, [onEscape]);

	return (
		<div className="overlay" onClick={handleOutsideClick}>
			<div ref={modalRef}>{children}</div>
		</div>
	);
}
