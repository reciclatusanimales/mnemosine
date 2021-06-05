import "./add-task.scss";
import { FaRegCalendarAlt } from "react-icons/fa";
import moment from "moment";
import { useEffect, useState } from "react";
import TaskDate from "../TaskDate";

import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../../../store/dataSlice";
import { useUI } from "../../../../context";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import Overlay from "../../../../components/Overlay";
registerLocale("es", es);

export default function AddTask() {
	const [taskName, setTaskName] = useState("");
	const [taskDate, setTaskDate] = useState("today");
	const [readableDate, setReadableDate] = useState("Hoy");
	const [date, setDate] = useState(
		Date.parse(moment(new Date(), "DD/MM/YYYY").toISOString())
	);

	const selectedProject = useSelector((state) => state.data.selectedProject);
	const projects = useSelector((state) => state.data.projects);

	const [project, setProject] = useState(
		selectedProject && selectedProject.userId ? selectedProject.id : ""
	);

	const dispatch = useDispatch();

	const { setShowAddTask } = useUI();
	const [showTaskDate, setShowTaskDate] = useState(false);
	const [showTaskCalendar, setShowTaskCalendar] = useState(false);

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

	const handleAddTask = () => {
		if (taskName.trim() === "") return;

		const task = {
			name: taskName,
			date: moment(date).format("DD/MM/YYYY"),
		};

		dispatch(addTask({ projectId: project, data: task }));

		setTaskName("");
		setShowAddTask(false);
	};

	const hideModal = () => {
		setShowAddTask(false);
	};

	return (
		<Overlay onClickOutside={hideModal} onEscape={hideModal}>
			<div className="add-task__main">
				<div className="add-task__header-options">
					<h3>Nueva Tarea</h3>
					<span
						aria-label="Cancelar"
						className="add-task__cancel-x"
						onClick={hideModal}
						onKeyDown={hideModal}
						tabIndex={0}
						role="button"
					>
						X
					</span>
				</div>

				<TaskDate
					setTaskDate={setTaskDate}
					showTaskDate={showTaskDate}
					setShowTaskDate={setShowTaskDate}
					setShowTaskCalendar={setShowTaskCalendar}
				/>

				<input
					aria-label="Nombre"
					className="add-task__content"
					placeholder="Nombre"
					type="text"
					value={taskName}
					onChange={(e) => setTaskName(e.target.value)}
				/>

				<select
					className="add-task__project"
					onChange={(e) => setProject(e.target.value)}
					value={project}
				>
					<option value="">Selecciona un Projecto</option>
					{projects?.map((project) => (
						<option key={project.id} value={project.id}>
							{project.name}
						</option>
					))}
				</select>

				<div className="add-task__date-container">
					<span>{readableDate}</span>
					<span
						className="add-task__date"
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
				</div>

				<div className="add-task__btns">
					<span
						aria-label="Cancelar"
						className="add-task__cancel"
						onClick={hideModal}
						onKeyDown={hideModal}
						tabIndex={0}
						role="button"
					>
						Cancelar
					</span>

					<button
						className="add-task__submit"
						type="button"
						disabled={taskName === ""}
						onClick={() => handleAddTask() && setShowAddTask(false)}
					>
						Agregar
					</button>
				</div>
			</div>
		</Overlay>
	);
}
