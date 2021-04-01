import { FaPen, FaTrash } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { setProject } from "../redux/actions/dataActions";
import { useUI } from "../context";

export default function Project({ project }) {
	const { name } = project;
	const dispatch = useDispatch();
	const {
		setShowSidebar,
		setShowEditProject,
		setShowDeleteProject,
	} = useUI();

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
		<>
			<span
				className="sidebar__project-name"
				aria-label={`Select ${project.name}`}
				role="button"
				tabIndex={0}
				onClick={handleSelectProject}
				onKeyDown={handleSelectProject}
			>
				<span className="sidebar__dot">•</span>
				{name}
			</span>
			<span
				aria-label="Editar proyecto"
				className="sidebar__project-edit"
				onClick={handleEditProject}
				onKeyDown={handleEditProject}
				tabIndex={0}
				role="button"
			>
				<FaPen />
			</span>
			<span
				aria-label="Confirmar"
				className="sidebar__project-delete"
				onClick={handleDeleteProject}
				onKeyDown={handleDeleteProject}
				tabIndex={0}
				role="button"
			>
				<FaTrash />
			</span>
		</>
	);
}
