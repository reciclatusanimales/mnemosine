import { FaRegCalendarAlt } from "react-icons/fa";
import moment from "moment";
import { useEffect, useState } from "react";
import TaskDate from "./TaskDate";
import MomentUtils from "@date-io/moment";

import { connect } from "react-redux";
import { updateTask } from "../redux/actions/dataActions";
import { useUI } from "../context";

import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";

const EditTask = ({ projects, selectedProject, selectedTask, updateTask }) => {
	const [taskName, setTaskName] = useState(selectedTask.name);
	const [taskDate, setTaskDate] = useState(selectedTask.date);
	const [readableDate, setReadableDate] = useState(selectedTask.date);
	const [date, setDate] = useState(selectedTask.date);
	const [project, setProject] = useState(selectedTask.projectId);

	const { setShowEditTask } = useUI();
	const [showTaskDate, setShowTaskDate] = useState(false);
	const [showTaskCalendar, setShowTaskCalendar] = useState(false);

	useEffect(() => {
		if (taskDate === "today") {
			setDate(moment().format("YYYY/MM/DD"));
			setReadableDate("Hoy");
		} else if (taskDate === "tomorrow") {
			setDate(moment().add(1, "day").format("YYYY/MM/DD"));
			setReadableDate("Mañana");
		} else if (taskDate === "next_7") {
			setDate(moment().add(7, "day").format("YYYY/MM/DD"));
			setReadableDate("Próxima Semana");
		}
	}, [taskDate]);

	const handleDateChange = (date) => {
		setDate(date.format("YYYY/MM/DD"));
		setTaskDate(date.format("YYYY/MM/DD"));
		setReadableDate(date.format("YYYY/MM/DD"));
	};

	const handleUpdateTask = () => {
		if (taskName.trim() === "") return;

		const task = {
			id: selectedTask.id,
			name: taskName,
			projectId: project,
			date,
		};

		updateTask(task);

		setTaskName("");
		setShowEditTask(false);
	};

	return (
		<div className="add-task add-task__overlay" data-testid="add-task-comp">
			<div className="add-task__main" data-testid="add-task-main">
				<div data-testid="quick-add-task">
					<h2 className="header">Editar Tarea</h2>
					<span
						aria-label="Cancel adding task"
						className="add-task__cancel-x"
						data-testid="add-task-quick-cancel"
						onClick={() => setShowEditTask(false)}
						onKeyDown={() => setShowEditTask(false)}
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
							format="YYYY/MM/DD"
							inputValue={moment(date).format("YYYY/MM/DD")}
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
						onClick={() =>
							handleUpdateTask() && setShowEditTask(false)
						}
					>
						Guardar
					</button>

					<span
						aria-label="Cancelar"
						className="add-task__cancel"
						data-testid="add-task-main-cancel"
						onClick={() => setShowEditTask(false)}
						onKeyDown={() => setShowEditTask(false)}
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
	selectedTask: state.data.selectedTask,
});

const mapActionsToProps = {
	updateTask,
};

export default connect(mapStateToProps, mapActionsToProps)(EditTask);
