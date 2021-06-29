import Modal from "../../../../components/Modal";

import { useDispatch, useSelector } from "react-redux";
import { addProject, cleanErrors } from "../../../../store/dataSlice";
import FormField from "../../../../components/FormField";
import useForm from "../../../../hooks/useForm";
import useModal from "../../../../hooks/useModal";

const fields = {
	name: "",
};

const rules = {
	name: {
		type: "text",
		required: true,
	},
};

export default function AddProject() {
	const dispatch = useDispatch();
	const { error, projectLoading } = useSelector((state) => state.data);
	const { isOpen, openModal, closeModal } = useModal();

	const handleAddProject = async () => {
		await dispatch(addProject({ name: values.name }));
		closeModal();
	};

	const handleCleanErrors = () => {
		if (error) dispatch(cleanErrors());
	};

	const { handleChange, handleSubmit, values, errors } = useForm(
		{ fields, rules },
		handleAddProject,
		handleCleanErrors
	);

	return (
		<div className="AddProject">
			<div
				aria-label="Nuevo"
				className="AddProject__action"
				onClick={openModal}
				onKeyDown={openModal}
				role="button"
				data-type="action"
				tabIndex={0}
			>
				<span className="AddProject__plus" data-type="action">
					+
				</span>{" "}
				<span className="AddProject__text" data-type="action">
					Proyecto
				</span>
			</div>

			<Modal isOpen={isOpen} size="sm" closeModal={closeModal}>
				<Modal.Header>Nuevo Proyecto</Modal.Header>
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
					<Modal.SubmitButton onSubmit={handleSubmit} />
				</Modal.Buttons>
			</Modal>
		</div>
	);
}
