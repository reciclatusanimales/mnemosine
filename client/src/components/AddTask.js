import { FaRegCalendarAlt } from "react-icons/fa";
import moment from "moment";
import { useEffect, useState } from "react";
import TaskDate from "./TaskDate";
import MomentUtils from "@date-io/moment";

import { connect } from "react-redux";
import { addTask } from "../redux/actions/dataActions";
import { useUI } from "../context";

import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";

const AddTask = ({ projects, selectedProject, addTask }) => {
	const [taskName, setTaskName] = useState("");
	const [taskDate, setTaskDate] = useState("today");
	const [readableDate, setReadableDate] = useState("Hoy");
	const [date, setDate] = useState(new Date());
	const [project, setProject] = useState(
		selectedProject && selectedProject.uuid ? selectedProject.id : ""
	);

	const { setShowAddTask } = useUI();
	const [showTaskDate, setShowTaskDate] = useState(false);
	const [showTaskCalendar, setShowTaskCalendar] = useState(false);

	useEffect(() => {
		if (taskDate === "today") {
			setDate(moment().format("DD/MM/YYYY"));
			setReadableDate("Hoy");
		} else if (taskDate === "tomorrow") {
			setDate(moment().add(1, "day").format("DD/MM/YYYY"));
			setReadableDate("Mañana");
		} else if (taskDate === "next_7") {
			setDate(moment().add(7, "day").format("DD/MM/YYYY"));
			setReadableDate("Próxima Semana");
		}
	}, [taskDate]);

	const handleDateChange = (date) => {
		setDate(date.format("DD/MM/YYYY"));
		setTaskDate(date.format("DD/MM/YYYY"));
		setReadableDate(date.format("DD/MM/YYYY"));
	};

	const handleAddTask = () => {
		if (taskName.trim() === "") return;

		const task = {
			name: taskName,
			projectId: project,
			date,
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
					onClick={() => setShowTaskDate(!showTaskDate)}
					onKeyDown={() => setShowTaskDate(!showTaskDate)}
					tabIndex={0}
					role="button"
				>
					<FaRegCalendarAlt />
				</span>

				<MuiPickersUtilsProvider
					libInstance={moment}
					utils={MomentUtils}
				>
					<Grid container>
						<KeyboardDatePicker
							autoOk={true}
							open={showTaskCalendar}
							onOpen={() => setShowTaskCalendar(true)}
							onClose={() => setShowTaskCalendar(false)}
							disableToolbar
							variant="inline"
							format="DD/MM/YYYY"
							inputValue={moment().format("DD/MM/YYYY")}
							margin="normal"
							id="date-picker-inline"
							label="Fecha"
							value={date}
							onChange={handleDateChange}
							KeyboardButtonProps={{
								"aria-label": "change date",
							}}
							InputProps={{
								disableUnderline: true,
							}}
							TextFieldComponent={() => null}
						/>
					</Grid>
				</MuiPickersUtilsProvider>

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
