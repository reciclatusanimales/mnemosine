import { useDispatch, useSelector } from "react-redux";
import { updateProject, cleanErrors } from "../../../../store/dataSlice";
import Modal from "../../../../components/Modal";
import useForm from "../../../../hooks/useForm";
import FormField from "../../../../components/FormField";
import { useEffect, useState } from "react";

const rules = {
	name: {
		type: "text",
		required: true,
	},
};

export default function EditProject({ isOpen, closeModal }) {
	const dispatch = useDispatch();
	const { selectedProject, error } = useSelector((state) => state.data);
	const [fields, setFields] = useState({ name: selectedProject?.name });

	const handleUpdateProject = async () => {
		await dispatch(
			updateProject({
				data: { name: values.name },
				id: selectedProject.id,
			})
		);
		closeModal();
	};

	const handleCleanErrors = () => {
		if (error) dispatch(cleanErrors());
	};

	useEffect(() => {
		if (fields.name === selectedProject.name) return;
		setFields({ ...fields, name: selectedProject.name });
	}, [fields, selectedProject]);

	const { handleChange, handleSubmit, values, errors } = useForm(
		{ fields, rules },
		handleUpdateProject,
		handleCleanErrors
	);

	return (
		<Modal isOpen={isOpen} closeModal={closeModal}>
			<Modal.Header>Editar Proyecto</Modal.Header>
			<Modal.Content>
				<form onSubmit={handleSubmit} noValidate>
					<FormField
						error={errors.name}
						name="name"
						placeholder="Nombre del proyecto"
						onChange={handleChange}
						value={values.name}
					/>
				</form>
			</Modal.Content>
			<Modal.Buttons>
				<Modal.CancelButton />
				<Modal.SubmitButton onSubmit={handleSubmit}>
					Guardar
				</Modal.SubmitButton>
			</Modal.Buttons>
		</Modal>
	);
}
