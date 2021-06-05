import "./delete-task.scss";
import { useDispatch, useSelector } from "react-redux";
import { useUI } from "../../../../context";
import { deleteTask } from "../../../../store/dataSlice";
import Overlay from "../../../../components/Overlay";

export default function DeleteTask() {
	const { showDeleteTask, setShowDeleteTask } = useUI();
	const dispatch = useDispatch();
	const id = useSelector((state) => state.data.selectedTask?.id);

	const handleDeleteTask = () => {
		dispatch(deleteTask(id));
		setShowDeleteTask(false);
	};

	const hideModal = () => {
		setShowDeleteTask(false);
	};

	return showDeleteTask ? (
		<Overlay onClickOutside={hideModal} onEscape={hideModal}>
			<div className="delete__main">
				<div className="delete__header-options">
					<span
						aria-label="Cancelar"
						className="delete__cancel-x"
						onClick={hideModal}
						onKeyDown={hideModal}
						tabIndex={0}
						role="button"
					>
						X
					</span>
				</div>
				<div className="delete__inner">
					<div className="delete__message">
						<p>¿Deseas eliminar esta tarea?</p>
					</div>
					<div className="delete__btns">
						<span
							aria-label="Cancelar"
							className="delete__cancel"
							onClick={hideModal}
							onKeyDown={hideModal}
							tabIndex={0}
							role="button"
						>
							Cancelar
						</span>

						<button
							className="delete__submit"
							type="button"
							onClick={handleDeleteTask}
						>
							Eliminar
						</button>
					</div>
				</div>
			</div>
		</Overlay>
	) : null;
}
