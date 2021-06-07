import { useDispatch, useSelector } from "react-redux";
import { deleteProject } from "../../../../store/dataSlice";
import Modal from "../../../../components/Modal";

export default function DeleteProject({ isOpen, closeModal }) {
	const dispatch = useDispatch();
	const { selectedProject } = useSelector((state) => state.data);

	const handleDeleteProject = async () => {
		await dispatch(deleteProject(selectedProject.id));
		closeModal();
	};

	return (
		<Modal isOpen={isOpen} closeModal={closeModal}>
			<Modal.Header>Eliminar Proyecto</Modal.Header>
			<Modal.Content>
				<p>¿Deseas eliminar este projecto?</p>
			</Modal.Content>
			<Modal.Buttons>
				<Modal.CancelButton />
				<Modal.SubmitButton onSubmit={handleDeleteProject}>
					Eliminar
				</Modal.SubmitButton>
			</Modal.Buttons>
		</Modal>
	);
}
