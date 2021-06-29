import { useEffect, useState } from "react";
import TaskDate from "../TaskDate";

import { useDispatch, useSelector } from "react-redux";
import { updateTask, cleanErrors } from "../../../../store/dataSlice";

import "react-datepicker/dist/react-datepicker.css";
import Modal from "../../../../components/Modal";
import FormField from "../../../../components/FormField";
import useForm from "../../../../hooks/useForm";
import moment from "moment";
import Tags from "../../../../components/Tags";

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

export default function EditTask({ isOpen, closeModal }) {
	const { projects, selectedTask, error } = useSelector(
		(state) => state.data
	);

	const dispatch = useDispatch();

	const [tags, setTags] = useState(selectedTask?.taglist);

	const [fields, setFields] = useState({
		name: selectedTask?.name,
		project: selectedTask?.project?.id,
	});

	const [date, setDate] = useState(
		Date.parse(moment(new Date(), "DD/MM/YYYY").toISOString())
	);
	const handleCleanErrors = () => {
		if (error) dispatch(cleanErrors());
	};

	const handleUpdateTask = async () => {
		const task = {
			name: values.name,
			projectId: values.project,
			tags,
			date: moment(date).format("DD/MM/YYYY"),
		};
		await dispatch(updateTask({ id: selectedTask.id, data: task }));
		closeModal();
	};

	useEffect(() => {
		if (
			!selectedTask ||
			(fields.name === selectedTask.name &&
				fields.project === selectedTask.project.id)
		)
			return;

		setFields({
			...fields,
			name: selectedTask.name,
			project: selectedTask.project.id,
		});
	}, [fields, selectedTask]);

	const { handleChange, handleSubmit, values, errors } = useForm(
		{ fields, rules },
		handleUpdateTask,
		handleCleanErrors
	);

	return (
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
						onChange={handleChange}
						type="select"
						error={errors.project}
						name="project"
						value={values.project}
					>
						<option value="">Selecciona un Projecto</option>
						{projects?.map((project) => (
							<option key={project.id} value={project.id}>
								{project.name}
							</option>
						))}
					</FormField>

					<Tags
						initialValue={tags}
						selected={(tags) => setTags(tags)}
					/>

					<TaskDate date={date} setDate={setDate} />
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
