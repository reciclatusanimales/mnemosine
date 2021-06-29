import moment from "moment";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addTask, cleanErrors } from "../../../../store/dataSlice";

import Modal from "../../../../components/Modal";
import useForm from "../../../../hooks/useForm";
import useModal from "../../../../hooks/useModal";
import FormField from "../../../../components/FormField";
import TaskDate from "../TaskDate";
import Tags from "../../../../components/Tags";
import Tooltip from "../../../../components/Tooltip";

const rules = {
	name: {
		type: "text",
		required: true,
	},
	project: {
		type: "select",
		required: true,
	},
};

export default function AddTask() {
	const dispatch = useDispatch();

	const { projects, selectedProject, error } = useSelector(
		(state) => state.data
	);
	const [date, setDate] = useState(
		Date.parse(moment(new Date(), "DD/MM/YYYY").toISOString())
	);

	const [tags, setTags] = useState([]);
	const [fields, setFields] = useState({
		name: "",
		project: selectedProject?.id,
	});

	const { isOpen, openModal, closeModal } = useModal();

	useEffect(() => {
		setFields({ ...fields });
	}, [isOpen]);

	useEffect(() => {
		if (fields.project === selectedProject.id) return;
		setFields({ ...fields, project: selectedProject.id });
	}, [fields, selectedProject]);

	const handleCleanErrors = () => {
		if (error) dispatch(cleanErrors());
	};

	const handleAddTask = async () => {
		const task = {
			name: values.name,
			date: moment(date).format("DD/MM/YYYY"),
			tags,
		};

		await dispatch(addTask({ projectId: values.project, data: task }));
		closeModal();
	};

	const { handleChange, handleSubmit, values, errors } = useForm(
		{ fields, rules },
		handleAddTask,
		handleCleanErrors
	);

	return (
		<>
			<li className="AddTask">
				<Tooltip text="Editar">
					<button
						aria-label="Nueva Tarea"
						onClick={openModal}
						onKeyDown={openModal}
						type="button"
					>
						+
					</button>
				</Tooltip>
			</li>
			{isOpen && (
				<Modal isOpen={isOpen} closeModal={closeModal}>
					<Modal.Header>Nueva Tarea</Modal.Header>
					<Modal.Content>
						<form onSubmit={handleSubmit} noValidate>
							<FormField
								error={errors.name}
								name="name"
								placeholder="Nombre"
								onChange={handleChange}
								value={values.name}
							/>

							<FormField
								type="select"
								name="project"
								error={errors.project}
								onChange={handleChange}
								value={values.project}
							>
								<option value="">Selecciona un Projecto</option>
								{projects?.map((project) => (
									<option key={project.id} value={project.id}>
										{project.name}
									</option>
								))}
							</FormField>

							<Tags selected={(tags) => setTags(tags)} />

							<TaskDate date={date} setDate={setDate} />
						</form>
					</Modal.Content>
					<Modal.Buttons>
						<Modal.CancelButton />
						<Modal.SubmitButton onSubmit={handleSubmit} />
					</Modal.Buttons>
				</Modal>
			)}
		</>
	);
}
