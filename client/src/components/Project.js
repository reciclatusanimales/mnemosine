import { useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";

import { connect } from "react-redux";
import { setProject, deleteProject } from "../redux/actions/dataActions";
import { useUI } from "../context";

const Project = ({ project, setProject, deleteProject }) => {
	const { id, name } = project;
	const [showConfirm, setShowConfirm] = useState(false);
	const { setShowEditProject, setShowAddProject } = useUI();

	const handleDeleteProject = () => {
		deleteProject(id);
		setShowConfirm(false);
	};

	const handleEditProject = (project) => {
		setProject(project);
		setShowEditProject(true);
	};

	return (
		<>
			<span className="sidebar__project-name">
				<span className="sidebar__dot">•</span>
				{name}
			</span>
			<span
				aria-label="Editar proyecto"
				className="sidebar__project-edit"
				onClick={() => handleEditProject(project)}
				onKeyDown={() => handleEditProject(project)}
				tabIndex={0}
				role="button"
			>
				<FaPen />
			</span>
			<span
				aria-label="Confirmar"
				className="sidebar__project-delete"
				data-testid="delete-project"
				onClick={() => {
					setShowConfirm(!showConfirm);
					setShowAddProject(false);
				}}
				onKeyDown={() => {
					setShowConfirm(!showConfirm);
					setShowAddProject(false);
				}}
				tabIndex={0}
				role="button"
			>
				<FaTrash />
				{showConfirm && (
					<div className="project-delete-modal">
						<span className="project-delete-modal__inner">
							<p>¿Deseas eliminar este projecto?</p>
							<button
								type="button"
								onClick={handleDeleteProject}
								onKeyDown={handleDeleteProject}
							>
								Eliminar
							</button>
							<span
								aria-label="Cancelar"
								onClick={() => setShowConfirm(!showConfirm)}
								onKeyDown={() => setShowConfirm(!showConfirm)}
								tabIndex={0}
								role="button"
							>
								Cancelar
							</span>
						</span>
					</div>
				)}
			</span>
		</>
	);
};

const mapActionsToProps = {
	setProject,
	deleteProject,
};

export default connect(null, mapActionsToProps)(Project);
