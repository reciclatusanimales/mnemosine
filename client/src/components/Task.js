import { useState } from "react";
import { connect } from "react-redux";
import { setTask, archiveTask, deleteTask } from "../redux/actions/dataActions";
import { FaPen, FaTrash } from "react-icons/fa";
import { useUI } from "../context";

const Task = ({ task, selectedProject, setTask, archiveTask, deleteTask }) => {
	const [showConfirm, setShowConfirm] = useState(false);
	const { setShowEditTask } = useUI();
	const [isFadingOut, setIsFadingOut] = useState(false);

	const handleDeleteTask = (id) => {
		deleteTask(id);
		setShowConfirm(false);
	};

	const handleEditTask = (task) => {
		setTask(task);
		setShowEditTask(true);
	};

	const handleArchiveTask = (id) => {
		setIsFadingOut(true);
		setTimeout(() => {
			archiveTask(id);
			setIsFadingOut(false);
		}, 700);
	};

	return (
		<li key={task.id} className={isFadingOut ? "item-fadeout" : "item"}>
			<div
				aria-label={`¿Marcar ${task.name} como realizada?`}
				className="checkbox-holder"
				data-testid="checkbox-action"
				onClick={() => handleArchiveTask(task.id)}
				onKeyDown={() => handleArchiveTask(task.id)}
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
				<span className="tasks__list-project">
					<small>{task.project?.name}</small>
				</span>
			)}
			<span
				aria-label="Editar Tarea"
				className="tasks__list-edit"
				onClick={() => handleEditTask(task.id)}
				onKeyDown={() => handleEditTask(task.id)}
				tabIndex={0}
				role="button"
			>
				<FaPen />
			</span>
			<span
				aria-label="Confirmar"
				className="tasks__list-delete"
				data-testid="delete-task"
				onClick={() => setShowConfirm(!showConfirm)}
				onKeyDown={() => setShowConfirm(!showConfirm)}
				tabIndex={0}
				role="button"
			>
				<FaTrash />
				{showConfirm && (
					<div className="task-delete-modal">
						<span className="task-delete-modal__inner">
							<p>¿Deseas eliminar esta tarea?</p>
							<button
								type="button"
								onClick={() => handleDeleteTask(task.id)}
								onKeyDown={() => handleDeleteTask(task.id)}
							>
								Eliminar
							</button>
							<span
								aria-label="Cancelar"
								onClick={() => setShowConfirm(!showConfirm)}
								onKeyDown={() => setShowConfirm(!showConfirm)}
								tabIndex={0}
								role="button"
							>
								Cancelar
							</span>
						</span>
					</div>
				)}
			</span>
		</li>
	);
};

const mapStateToProps = (state) => ({
	selectedProject: state.data.selectedProject,
});

const mapActionsToProps = {
	setTask,
	archiveTask,
	deleteTask,
};

export default connect(mapStateToProps, mapActionsToProps)(Task);
