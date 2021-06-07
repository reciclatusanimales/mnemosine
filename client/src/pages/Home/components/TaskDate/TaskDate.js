import moment from "moment";
import { useEffect, useRef, useState } from "react";
import {
	FaRegCalendarAlt,
	FaRegCalendarPlus,
	FaRegPaperPlane,
	FaSpaceShuttle,
	FaSun,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);

export default function TaskDate({ date, setDate }) {
	const modalRef = useRef(null);
	const [showTaskDate, setShowTaskDate] = useState(false);
	const [showTaskCalendar, setShowTaskCalendar] = useState(false);
	const [taskDate, setTaskDate] = useState("today");
	const [readableDate, setReadableDate] = useState("Hoy");

	useEffect(() => {
		if (taskDate === "today") {
			setDate(Date.parse(moment(new Date(), "DD/MM/YYYY").toISOString()));
			setReadableDate("Hoy");
		} else if (taskDate === "tomorrow") {
			setDate(
				Date.parse(
					moment(new Date(), "DD/MM/YYYY").add(1, "day").toISOString()
				)
			);
			setReadableDate("Mañana");
		} else if (taskDate === "next_7") {
			setDate(
				Date.parse(
					moment(new Date(), "DD/MM/YYYY").add(7, "day").toISOString()
				)
			);
			setReadableDate("Próxima Semana");
		}
		setShowTaskCalendar(false);
	}, [taskDate]);

	const handleDateChange = (date) => {
		const parseDate = Date.parse(moment(date, "DD/MM/YYYY").toISOString());
		setDate(parseDate);
		setTaskDate(moment(date).format("DD/MM/YYYY"));
		setReadableDate(moment(date).format("DD/MM/YYYY"));
		setShowTaskCalendar(false);
	};

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
		<>
			<div className="TaskDate">
				<span>{readableDate}</span>
				<span
					className="TaskDate__date"
					onClick={() => {
						setShowTaskDate(!showTaskDate);
						setShowTaskCalendar(false);
					}}
					onKeyDown={() => {
						setShowTaskDate(!showTaskDate);
						setShowTaskCalendar(false);
					}}
					tabIndex={0}
					role="button"
				>
					<FaRegCalendarAlt />
				</span>
				<DatePicker
					selected={date}
					open={showTaskCalendar}
					locale="es"
					dateFormat="dd/MM/yyyy"
					onChange={(date) => handleDateChange(date)}
				/>
				{showTaskDate && (
					<div className="TaskDate__menu" ref={modalRef}>
						<ul>
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
				)}
			</div>
		</>
	);
}
