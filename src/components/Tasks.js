import Checkbox from "./Checkbox";
import { useTasks } from "../hooks";

export default function Tasks() {
	const { tasks } = useTasks("nJVYAtAjrw1PLLTp0Ilu");

	let projectName = "";

	console.log(tasks);

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
