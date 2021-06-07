import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../../../store/dataSlice";
import Modal from "../../../../components/Modal";

export default function DeleteTask({ isOpen, closeModal }) {
	const dispatch = useDispatch();
	const id = useSelector((state) => state.data.selectedTask?.id);

	const handleDeleteTask = async () => {
		dispatch(deleteTask(id));
		await closeModal();
	};

	return (
		<Modal isOpen={isOpen} closeModal={closeModal} size="sm">
			<Modal.Header>Eliminar Tarea</Modal.Header>
			<Modal.Content>
				<p>¿Deseas eliminar esta tarea?</p>
			</Modal.Content>
			<Modal.Buttons>
				<Modal.CancelButton />
				<Modal.SubmitButton onSubmit={handleDeleteTask}>
					Eliminar
				</Modal.SubmitButton>
			</Modal.Buttons>
		</Modal>
	);
}
