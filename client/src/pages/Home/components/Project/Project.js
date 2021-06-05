import "./project.scss";
import { FaPen, FaTrash } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { setProject } from "../../../../store/dataSlice";
import { useUI } from "../../../../context";

export default function Project({ project }) {
	const { name } = project;
	const dispatch = useDispatch();
	const { selectedProject } = useSelector((state) => state.data);
	const { setShowSidebar, setShowEditProject, setShowDeleteProject } =
		useUI();

	const handleDeleteProject = () => {
		dispatch(setProject(project));
		setShowDeleteProject(true);
	};

	const handleEditProject = () => {
		dispatch(setProject(project));
		setShowEditProject(true);
	};

	const handleSelectProject = () => {
		dispatch(setProject(project));
		setShowSidebar(false);
	};

	return (
		<li
			className={
				selectedProject?.id === project.id
					? "active project"
					: "project"
			}
		>
			<span
				className="project__name"
				aria-label={`Select ${project.name}`}
				role="button"
				tabIndex={0}
				onClick={handleSelectProject}
				onKeyDown={handleSelectProject}
			>
				<span className="project__dot">•</span>
				{name}
			</span>
			<span
				aria-label="Editar proyecto"
				className="project__edit"
				onClick={handleEditProject}
				onKeyDown={handleEditProject}
				tabIndex={0}
				role="button"
			>
				<FaPen />
			</span>
			<span
				aria-label="Confirmar"
				className="project__delete"
				onClick={handleDeleteProject}
				onKeyDown={handleDeleteProject}
				tabIndex={0}
				role="button"
			>
				<FaTrash />
			</span>
		</li>
	);
}
