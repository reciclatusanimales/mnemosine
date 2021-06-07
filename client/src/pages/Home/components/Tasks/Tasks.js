import { useEffect, useState } from "react";
import Task from "../Task";
import Empty from "../../../../components/Empty";
import { useDispatch, useSelector } from "react-redux";
import { loadTasks } from "../../../../store/dataSlice";
import { removeSymbols, defaultIcons } from "../../../../utils";
import TasksSkeleton from "../TasksSkeleton";
import useModal from "../../../../hooks/useModal";
import DeleteTask from "../DeleteTask";
import EditTask from "../EditTask";

export default function Tasks() {
	const { selectedTasks, selectedProject, tasksLoading } = useSelector(
		(state) => state.data
	);
	const dispatch = useDispatch();
	const { isOpen, openModal, closeModal } = useModal();
	const [mode, setMode] = useState(null);

	if (selectedProject)
		document.title = selectedProject.userId
			? `${removeSymbols(selectedProject.name)}: Mnemosine`
			: "Mnemosine";

	useEffect(() => {
		dispatch(loadTasks());
	}, [dispatch]);

	const handleCloseModal = () => {
		setMode(null);
		closeModal();
	};

	useEffect(() => {
		if (mode) return openModal();
	}, [mode, openModal]);

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
								<Task
									key={task.id}
									task={task}
									setMode={setMode}
								/>
							))}
						</ul>
					) : (
						<Empty />
					)}
				</>
			)}

			{mode === "edit" && (
				<EditTask isOpen={isOpen} closeModal={handleCloseModal} />
			)}

			{mode === "delete" && (
				<DeleteTask isOpen={isOpen} closeModal={handleCloseModal} />
			)}
		</div>
	);
}
