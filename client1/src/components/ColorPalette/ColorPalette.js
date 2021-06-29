import { useEffect, useRef, useState } from "react";
import { FaPalette } from "react-icons/fa";

import { useUI } from "../../context";
import Tooltip from "../Tooltip";

function ColorPalette() {
	const dropdownRef = useRef(null);
	const [showDropdown, setShowDropdown] = useState(false);
	const { setTheme } = useUI();

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (!dropdownRef.current?.contains(event.target)) {
				if (!showDropdown) return;
				setShowDropdown(false);
			}
		};

		if (typeof window !== "undefined") {
			window.addEventListener("click", handleOutsideClick);
		}

		if (typeof window !== "undefined") {
			return () =>
				window.removeEventListener("click", handleOutsideClick);
		}
	}, [showDropdown, setShowDropdown]);

	useEffect(() => {
		const handleEscape = (event) => {
			if (!showDropdown) return;

			if (event.key === "Escape") {
				setShowDropdown(false);
			}
		};

		document.addEventListener("keyup", handleEscape);
		return () => document.removeEventListener("keyup", handleEscape);
	}, [showDropdown, setShowDropdown]);

	return (
		<li className="ColorPalette" ref={dropdownRef}>
			<Tooltip text="Colores">
				<button
					aria-label="Theme toggler"
					onClick={() => {
						setShowDropdown(!showDropdown);
					}}
					onKeyDown={() => setShowDropdown(!showDropdown)}
					type="button"
				>
					<FaPalette />
				</button>
			</Tooltip>
			<div
				className={`ColorPalette__dropdown${
					!showDropdown ? " hide" : ""
				}`}
			>
				<div className="theme">
					<div
						className="color light"
						onClick={() => setTheme("light")}
					></div>
					<div
						className="color orange"
						onClick={() => setTheme("orange")}
					></div>
					<div
						className="color green"
						onClick={() => setTheme("green")}
					></div>
					<div
						className="color tomato"
						onClick={() => setTheme("tomato")}
					></div>
					<div
						className="color cuqui"
						onClick={() => setTheme("cuqui")}
					></div>
					<div
						className="color brown"
						onClick={() => setTheme("brown")}
					></div>
				</div>
			</div>
		</li>
	);
}

export default ColorPalette;
