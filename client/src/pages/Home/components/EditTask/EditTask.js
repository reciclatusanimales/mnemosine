import "./edit-task.scss";
import { FaRegCalendarAlt } from "react-icons/fa";
import moment from "moment";
import { useEffect, useState } from "react";
import TaskDate from "../TaskDate";

import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../../../store/dataSlice";
import { useUI } from "../../../../context";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import Overlay from "../../../../components/Overlay";
registerLocale("es", es);

export default function EditTask() {
	const selectedTask = useSelector((state) => state.data.selectedTask);
	const projects = useSelector((state) => state.data.projects);
	const dispatch = useDispatch();

	const [taskName, setTaskName] = useState(selectedTask.name);
	const [taskDate, setTaskDate] = useState(selectedTask.date);
	const [readableDate, setReadableDate] = useState(selectedTask.date);

	const [date, setDate] = useState(
		Date.parse(moment(selectedTask.date, "DD/MM/YYYY").toISOString())
	);
	const [project, setProject] = useState(selectedTask.projectId);

	const { setShowEditTask } = useUI();

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

	const handleUpdateTask = () => {
		if (taskName.trim() === "") return;

		const task = {
			name: taskName,
			projectId: project,
			date: moment(date).format("DD/MM/YYYY"),
		};

		dispatch(updateTask({ id: selectedTask.id, task }));

		setTaskName("");
		setShowEditTask(false);
	};

	const hideModal = () => {
		setShowEditTask(false);
	};

	return (
		<Overlay onClickOutside={hideModal} onEscape={hideModal}>
			<div className="edit-task__main">
				<div className="edit-task__header-options">
					<h3>Editar Tarea</h3>
					<span
						aria-label="Cancelar"
						className="edit-task__cancel-x"
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
					className="edit-task__content"
					placeholder="Nombre"
					type="text"
					value={taskName}
					onChange={(e) => setTaskName(e.target.value)}
				/>

				<select
					className="edit-task__project"
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

				<div className="edit-task__date-container">
					<span>{readableDate}</span>
					<span
						className="edit-task__date"
						onClick={() => setShowTaskDate(!showTaskDate)}
						onKeyDown={() => setShowTaskDate(!showTaskDate)}
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

				<div className="edit-task__btns">
					<span
						aria-label="Cancelar"
						className="edit-task__cancel"
						onClick={hideModal}
						onKeyDown={hideModal}
						tabIndex={0}
						role="button"
					>
						Cancelar
					</span>
					<button
						className="edit-task__submit"
						type="button"
						disabled={taskName === ""}
						onClick={() =>
							handleUpdateTask() && setShowEditTask(false)
						}
					>
						Guardar
					</button>
				</div>
			</div>
		</Overlay>
	);
}
