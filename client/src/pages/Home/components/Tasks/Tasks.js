import "./tasks.scss";
import { useEffect } from "react";
import Task from "../Task";
import Empty from "../../../../components/Emtpy";
import { useDispatch, useSelector } from "react-redux";
import { loadTasks } from "../../../../store/dataSlice";
import { removeSymbols, defaultIcons } from "../../../../utils";
import TasksSkeleton from "../TasksSkeleton";

export default function Tasks() {
	const { selectedTasks, selectedProject, tasksLoading } = useSelector(
		(state) => state.data
	);
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
			{tasksLoading ? (
				<TasksSkeleton />
			) : (
				<>
					<h2>
						{!selectedProject.userId && <Icon />}{" "}
						{selectedProject && selectedProject.name}
					</h2>

					{selectedTasks.length ? (
						<ul>
							{selectedTasks.map((task) => (
								<Task key={task.id} task={task} />
							))}
						</ul>
					) : (
						<Empty />
					)}
				</>
			)}
		</div>
	);
}
