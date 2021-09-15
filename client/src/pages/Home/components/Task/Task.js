import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTask, archiveTask } from "../../../../store/dataSlice";
import { FaPen, FaTrash } from "react-icons/fa";
import Tooltip from "../../../../components/Tooltip";
import Accordions from "../../../../components/Accordion/Accordions";

export default function Task({ task, setMode }) {
	// const accordionData = [
	// 	{
	// 		question: "Lorem ipsum dolor sit amet 1 ?",
	// 		answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, vero quos doloremque eum quam dolorem.",
	// 	},
	// 	{
	// 		question: "Lorem ipsum dolor sit amet 2 ?",
	// 		answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, vero quos doloremque eum quam dolorem inventore minus ad. Molestias, minima! Doloribus, vero quos doloremque.",
	// 	},
	// 	{
	// 		question: "Lorem ipsum dolor sit amet 3 ?",
	// 		answer: "Doloribus, vero quos doloremque eum quam dolorem inventore minus ad. Molestias, minima!",
	// 	},
	// 	{
	// 		question: "Lorem ipsum dolor sit amet 4 ?",
	// 		answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, vero quos doloremque eum quam dolorem inventore minus ad. Molestias, minima!",
	// 	},
	// ];

	// return <Accordions data={accordionData} duration={400} />;

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
		dispatch(archiveTask(task.id));
	};

	return (
		<li
			key={task.id}
			className={`task task__${isFadingOut ? "item-fadeout" : "item"}`}
		>
			<div className="task__checkbox-holder">
				<Tooltip text="Archivar">
					<label className="task__checkbox-container">
						<input
							type="checkbox"
							aria-label={`¿Marcar ${task.name} como realizada?`}
							onChange={handleArchiveTask}
							onKeyDown={handleArchiveTask}
							checked={task.archived}
						/>
						<span className="task__checkmark"></span>
					</label>
				</Tooltip>
			</div>

			<span>{task.name}</span>

			{!selectedProject.id && (
				<span className="task__project task__project-0">
					<small>{task.project?.name}</small>
				</span>
			)}

			<Tooltip text="Editar">
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
			</Tooltip>

			<Tooltip text="Eliminar">
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
			</Tooltip>
		</li>
	);
}
