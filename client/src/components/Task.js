import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTask, archiveTask } from "../redux/dataSlice";
import { FaPen, FaTrash } from "react-icons/fa";
import { useUI } from "../context";

export default function Task({ task }) {
	const [isFadingOut, setIsFadingOut] = useState(false);
	const { setShowEditTask, setShowDeleteTask } = useUI();
	const dispatch = useDispatch();
	const selectedProject = useSelector((state) => state.data.selectedProject);

	const handleDeleteTask = () => {
		dispatch(setTask(task));
		setShowDeleteTask(true);
	};

	const handleEditTask = () => {
		dispatch(setTask(task));
		setShowEditTask(true);
	};

	const handleArchiveTask = () => {
		setIsFadingOut(true);
		setTimeout(() => {
			dispatch(archiveTask(task.id));
			setIsFadingOut(false);
		}, 700);
	};

	return (
		<li key={task.id} className={isFadingOut ? "item-fadeout" : "item"}>
			<div
				aria-label={`¿Marcar ${task.name} como realizada?`}
				className="checkbox-holder"
				onClick={handleArchiveTask}
				onKeyDown={handleArchiveTask}
				role="button"
				tabIndex={0}
			>
				<label className="checkbox-container">
					<input type="checkbox" />
					<span className="checkmark"></span>
				</label>
			</div>
			<span>{task.name}</span>
			{!selectedProject.uuid && (
				<span className="tasks__list-project tasks__list-project-0">
					<small>{task.project?.name}</small>
				</span>
			)}
			<span
				aria-label="Editar Tarea"
				className="tasks__list-edit"
				onClick={handleEditTask}
				onKeyDown={handleEditTask}
				tabIndex={0}
				role="button"
			>
				<FaPen />
			</span>
			<span
				aria-label="Confirmar"
				className="tasks__list-delete"
				onClick={handleDeleteTask}
				onKeyDown={handleDeleteTask}
				tabIndex={0}
				role="button"
			>
				<FaTrash />
			</span>
		</li>
	);
}
