import { useEffect } from "react";
import Task from "./Task";
import Empty from "./layout/Empty";
import { useDispatch, useSelector } from "react-redux";
import { loadTasks } from "../redux/dataSlice";
import { removeSymbols } from "../utils";
import { defaultIcons } from "../constants";

export default function Tasks() {
	const selectedTasks = useSelector((state) => state.data.selectedTasks);
	const selectedProject = useSelector((state) => state.data.selectedProject);
	const dispatch = useDispatch();

	if (selectedProject)
		document.title = selectedProject.userId
			? `${removeSymbols(selectedProject.name)}: Mnemosine`
			: "Mnemosine";

	useEffect(() => {
		dispatch(loadTasks());
	}, [dispatch]);

	const Icon = defaultIcons[selectedProject.icon];

	return (
		<div className="tasks">
			<h2>
				{!selectedProject.userId && <Icon />}{" "}
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
}
