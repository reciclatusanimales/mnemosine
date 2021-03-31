import { useEffect, useRef } from "react";
import {
	FaRegCalendarPlus,
	FaRegPaperPlane,
	FaSpaceShuttle,
	FaSun,
} from "react-icons/fa";

export default function TaskDate({
	setTaskDate,
	showTaskDate,
	setShowTaskDate,
	setShowTaskCalendar,
}) {
	const modalRef = useRef(null);

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (!modalRef.current?.contains(event.target)) {
				if (!showTaskDate) return;
				setShowTaskDate(false);
			}
		};

		if (typeof window !== "undefined") {
			window.addEventListener("click", handleOutsideClick);
		}

		if (typeof window !== "undefined") {
			return () =>
				window.removeEventListener("click", handleOutsideClick);
		}
	}, [showTaskDate, setShowTaskDate]);

	useEffect(() => {
		const handleEscape = (event) => {
			if (!showTaskDate) return;

			if (event.key === "Escape") {
				setShowTaskDate(false);
			}
		};

		document.addEventListener("keyup", handleEscape);
		return () => document.removeEventListener("keyup", handleEscape);
	}, [showTaskDate, setShowTaskDate]);

	return (
		showTaskDate && (
			<div className="task-date" ref={modalRef}>
				<ul className="task-date__list">
					<li
						key="today"
						aria-label="Selecciona"
						onClick={() => {
							setShowTaskDate(false);
							setTaskDate("today");
						}}
						onKeyDown={() => {
							setShowTaskDate(false);
							setTaskDate("today");
						}}
						tabIndex={0}
						role="button"
					>
						<div>
							<span>
								<FaSpaceShuttle />
							</span>
							<span>Hoy</span>
						</div>
					</li>

					<li
						key="tomorrow"
						aria-label="Selecciona"
						onClick={() => {
							setShowTaskDate(false);
							setTaskDate("tomorrow");
						}}
						onKeyDown={() => {
							setShowTaskDate(false);
							setTaskDate("tomorrow");
						}}
						tabIndex={0}
						role="button"
					>
						<div>
							<span>
								<FaSun />
							</span>
							<span>Mañana</span>
						</div>
					</li>
					<li
						key="next_7"
						aria-label="Selecciona"
						onClick={() => {
							setShowTaskDate(false);
							setTaskDate("next_7");
						}}
						onKeyDown={() => {
							setShowTaskDate(false);
							setTaskDate("next_7");
						}}
						tabIndex={0}
						role="button"
					>
						<div>
							<span>
								<FaRegPaperPlane />
							</span>
							<span>Próxima Semana</span>
						</div>
					</li>
					<li
						key="another"
						aria-label="Selecciona"
						onClick={() => {
							setShowTaskDate(false);
							setShowTaskCalendar(true);
						}}
						onKeyDown={() => {
							setShowTaskDate(false);
							setShowTaskCalendar(true);
						}}
						tabIndex={0}
						role="button"
					>
						<div>
							<span>
								<FaRegCalendarPlus />
							</span>
							<span>Más...</span>
						</div>
					</li>
				</ul>
			</div>
		)
	);
}
