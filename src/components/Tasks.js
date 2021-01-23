import Checkbox from "./Checkbox";
import { collatedTasks } from "../constants";
import { getTitle, getCollatedTitle, collatedTasksExists } from "../helpers";
import { useTasks } from "../hooks";
import { useSelectedProjectValue, useProjectsValue } from "../context";
import { useEffect } from "react";

export default function Tasks() {
	const { selectedProject } = useSelectedProjectValue();
	const { projects } = useProjectsValue();
	const { tasks } = useTasks(selectedProject);

	let projectName = "";

	if (collatedTasksExists(selectedProject) && selectedProject) {
		projectName = getCollatedTitle(collatedTasks, selectedProject).name;
		console.log("afd");
	}

	if (
		projects &&
		projects.length > 0 &&
		selectedProject &&
		!collatedTasksExists(selectedProject)
	) {
		projectName = getTitle(projects, selectedProject).name;
	}

	useEffect(() => {
		document.title = `${projectName}: Todoist`;
	});

	return (
		<div className="tasks" data-testid="tasks">
			<h2 data-testid="project-name">{projectName}</h2>

			<ul className="tasks__list">
				{tasks.map((task) => (
					<li key={task.id}>
						<Checkbox id={task.id} />
						<span>{task.task}</span>
					</li>
				))}
			</ul>
		</div>
	);
}
