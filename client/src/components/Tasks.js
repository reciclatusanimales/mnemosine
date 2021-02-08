import { useEffect } from "react";
import { connect } from "react-redux";
import { getTasks } from "../redux/actions/dataActions";
import Task from "./Task";
import Empty from "./layout/Empty";

const Tasks = ({
	selectedTasks,
	selectedProject,
	getTasks,
	setTask,
	archiveTask,
	deleteTask,
}) => {
	if (selectedProject) document.title = `${selectedProject.name}: Todoist`;

	useEffect(() => {
		getTasks();

		// eslint-disable-next-line
	}, []);

	return (
		<div className="tasks" data-testid="tasks">
			<h2 data-testid="project-name">
				{selectedProject && selectedProject.name}
			</h2>

			{selectedTasks.length ? (
				<ul className="tasks__list">
					{selectedTasks.map((task) => (
						<Task key={task.id} task={task} />
					))}
				</ul>
			) : (
				<Empty />
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	selectedTasks: state.data.selectedTasks,
	selectedProject: state.data.selectedProject,
});

const mapActionsToProps = {
	getTasks,
};

export default connect(mapStateToProps, mapActionsToProps)(Tasks);
