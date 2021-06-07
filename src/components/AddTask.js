import { FaRegListAlt, FaRegCalendarAlt } from "react-icons/fa";
import moment from "moment";
import { useState } from "react";
import ProjectOverlay from "./ProjectOverlay";
import TaskDate from "./TaskDate";

import { connect } from "react-redux";
import { selectedProject, addTask } from "../redux/actions/dataActions";

const AddTask = ({
	showAddTaskMain = true,
	shouldShowMain = false,
	showQuickAddTask,
	setShowQuickAddTask,
	selectedProject,
	addTask,
}) => {
	const [name, setName] = useState("");
	const [taskDate, setTaskDate] = useState("");
	const [project, setProject] = useState("");
	const [showMain, setShowMain] = useState(shouldShowMain);
	const [showProjectOverlay, setShowProjectOverlay] = useState(false);
	const [showTaskDate, setShowTaskDate] = useState(false);

	const handleAddTask = () => {
		const projectId = project;
		let collatedDate = "";

		if (projectId === "TODAY") {
			collatedDate = moment().format("DD-MM-YYYY");
		} else if (project === "NEXT_7") {
			collatedDate = moment().add(7, "days").format("DD-MM-YYYY");
		}

		if (name === "" || projectId === "") return;

		const task = {
			projectId,
			name,
			date: collatedDate || taskDate,
		};

		addTask({ task, selectedProject });

		setName("");
		setProject("");
		setShowMain(false);
		setShowProjectOverlay(false);
		setShowQuickAddTask(false);
	};

	return (
		<div
			className={
				showQuickAddTask ? "add-task add-task__overlay" : "add-task"
			}
			data-testid="add-task-comp"
		>
			{showAddTaskMain && (
				<div
					aria-label="Add task"
					className="add-task__shallow"
					data-testid="show-main-action"
					onClick={() => {
						setShowMain(!showMain);
					}}
					onKeyDown={() => {
						setShowMain(!showMain);
					}}
					tabIndex={0}
					role="button"
				>
					<span className="add-task__plus">+</span>
					<span className="add-task__text">Add Task</span>
				</div>
			)}

			{(showMain || showQuickAddTask) && (
				<div className="add-task__main" data-testid="add-task-main">
					{showQuickAddTask && (
						<>
							<div data-testid="quick-add-task">
								<h2 className="header">Quick Add Task</h2>
								<span
									aria-label="Cancel adding task"
									className="add-task__cancel-x"
									data-testid="add-task-quick-cancel"
									onClick={() => {
										setShowMain(false);
										setShowProjectOverlay(false);
										setShowQuickAddTask(false);
									}}
									onKeyDown={() => {
										setShowMain(false);
										setShowProjectOverlay(false);
										setShowQuickAddTask(false);
									}}
									tabIndex={0}
									role="button"
								>
									X
								</span>
							</div>
						</>
					)}

					<ProjectOverlay
						setProject={setProject}
						showProjectOverlay={showProjectOverlay}
						setShowProjectOverlay={setShowProjectOverlay}
					/>

					<TaskDate
						setTaskDate={setTaskDate}
						showTaskDate={showTaskDate}
						setShowTaskDate={setShowTaskDate}
					/>

					<input
						aria-label="Enter your task"
						className="add-task__content"
						data-testid="add-task-content"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>

					<button
						className="add-task__submit"
						data-testid="add-task"
						type="button"
						onClick={() => {
							showQuickAddTask
								? handleAddTask() && setShowQuickAddTask(false)
								: handleAddTask();
						}}
					>
						Add Task
					</button>

					{!showQuickAddTask && (
						<span
							aria-label="Cancel adding a task"
							className="add-task__cancel"
							data-testid="add-task-main-cancel"
							onClick={() => {
								setShowMain(false);
								setShowProjectOverlay(false);
							}}
							onKeyDown={() => {
								setShowMain(false);
								setShowProjectOverlay(false);
							}}
							tabIndex={0}
							role="button"
						>
							Cancel
						</span>
					)}

					<span
						className="add-task__project"
						data-testid="show-project-overlay"
						onClick={() =>
							setShowProjectOverlay(!showProjectOverlay)
						}
						onKeyDown={() =>
							setShowProjectOverlay(!showProjectOverlay)
						}
						tabIndex={0}
						role="button"
					>
						<FaRegListAlt />
					</span>

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
				</div>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	selectedProject: state.data.selectedProject,
});

const mapActionsToProps = {
	addTask,
};

export default connect(mapStateToProps, mapActionsToProps)(AddTask);
