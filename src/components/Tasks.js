import { useEffect } from "react";
import Checkbox from "./Checkbox";
import { folders } from "../constants";
import { getTitle, getCollatedTitle, collatedTasksExists } from "../helpers";
import AddTask from "./AddTask";

import { connect } from "react-redux";
import { getTasks } from "../redux/actions/dataActions";

const Tasks = ({ projects, tasks, getTasks }) => {
	let projectName = "";

	// if (collatedTasksExists(folder) && folder) {
	// 	projectName = getCollatedTitle(folders, folder).name;
	// }

	// if (projects.length > 0 && folder && !collatedTasksExists(folder)) {
	// 	projectName = getTitle(projects, folder).name;
	// }
	useEffect(() => {
		getTasks();
	}, []);

	document.title = `${projectName}: Todoist`;

	const taskMarkup =
		tasks.length > 0
			? tasks.map((task) => {
					console.log(tasks);
					return (
						<li key={task.id}>
							<Checkbox id={task.id} taskDesc={task.task} />
							<span>{task.name}</span>
						</li>
					);
			  })
			: null;

	return (
		<div className="tasks" data-testid="tasks">
			<h2 data-testid="project-name">{projectName}</h2>

			<ul className="tasks__list">{taskMarkup}</ul>

			<AddTask />
		</div>
	);
};

const mapStateToProps = (state) => ({
	projects: state.data.projects,
	tasks: state.data.tasks,
});

const mapActionsToProps = {
	getTasks,
};
export default connect(mapStateToProps, mapActionsToProps)(Tasks);
