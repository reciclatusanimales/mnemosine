import { FaRegCalendarAlt } from "react-icons/fa";
import moment from "moment";
import { useEffect, useState } from "react";
import TaskDate from "./TaskDate";

import { connect } from "react-redux";
import { addTask } from "../redux/actions/dataActions";
import { useUI } from "../context";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);

const AddTask = ({ projects, selectedProject, addTask }) => {
	const [taskName, setTaskName] = useState("");
	const [taskDate, setTaskDate] = useState("today");
	const [readableDate, setReadableDate] = useState("Hoy");
	const [date, setDate] = useState(
		Date.parse(moment(new Date(), "DD/MM/YYYY").toISOString())
	);
	const [project, setProject] = useState(
		selectedProject && selectedProject.uuid ? selectedProject.id : ""
	);

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
			projectId: project,
			date: moment(date).format("DD/MM/YYYY"),
		};

		addTask(task);

		setTaskName("");
		setShowAddTask(false);
	};

	return (
		<div className="add-task add-task__overlay" data-testid="add-task-comp">
			<div className="add-task__main" data-testid="add-task-main">
				<div data-testid="quick-add-task">
					<h2 className="header">Nueva Tarea</h2>
					<span
						aria-label="Cancel adding task"
						className="add-task__cancel-x"
						data-testid="add-task-quick-cancel"
						onClick={() => {
							setShowAddTask(false);
						}}
						onKeyDown={() => {
							setShowAddTask(false);
						}}
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
					data-testid="add-task-content"
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

				<span>{readableDate}</span>
				<span
					className="add-task__date"
					data-testid="show-task-date-overlay"
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

				<div className="add-task__btns">
					<button
						className="add-task__submit"
						data-testid="add-task"
						type="button"
						disabled={taskName === ""}
						onClick={() => handleAddTask() && setShowAddTask(false)}
					>
						Agregar
					</button>

					<span
						aria-label="Cancelar"
						className="add-task__cancel"
						data-testid="add-task-main-cancel"
						onClick={() => {
							setShowAddTask(false);
						}}
						onKeyDown={() => {
							setShowAddTask(false);
						}}
						tabIndex={0}
						role="button"
					>
						Cancelar
					</span>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	projects: state.data.projects,
	selectedProject: state.data.selectedProject,
});

const mapActionsToProps = {
	addTask,
};

export default connect(mapStateToProps, mapActionsToProps)(AddTask);
