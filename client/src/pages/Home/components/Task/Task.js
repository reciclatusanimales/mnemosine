import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTask, archiveTask } from "../../../../store/dataSlice";
import { FaPen, FaTrash } from "react-icons/fa";

export default function Task({ task, setMode }) {
	const [isFadingOut, setIsFadingOut] = useState(false);
	const dispatch = useDispatch();
	const selectedProject = useSelector((state) => state.data.selectedProject);

	const handleDeleteTask = async () => {
		await dispatch(setTask(task));
		setMode("delete");
	};

	const handleEditTask = async () => {
		await dispatch(setTask(task));
		setMode("edit");
	};

	const handleArchiveTask = () => {
		setIsFadingOut(true);
		setTimeout(() => {
			dispatch(archiveTask(task.id));
		}, 500);
	};

	return (
		<li
			key={task.id}
			className={`task task__${isFadingOut ? "item-fadeout" : "item"}`}
		>
			<div className="task__checkbox-holder">
				<label className="task__checkbox-container">
					<input
						type="checkbox"
						aria-label={`¿Marcar ${task.name} como realizada?`}
						onClick={handleArchiveTask}
						onKeyDown={handleArchiveTask}
					/>
					<span className="task__checkmark"></span>
				</label>
			</div>
			<span>{task.name}</span>
			{!selectedProject.id && (
				<span className="task__project task__project-0">
					<small>{task.project?.name}</small>
				</span>
			)}
			<span
				aria-label="Editar Tarea"
				className="task__edit"
				onClick={handleEditTask}
				onKeyDown={handleEditTask}
				tabIndex={0}
				role="button"
			>
				<FaPen />
			</span>
			<span
				aria-label="Confirmar"
				className="task__delete"
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
