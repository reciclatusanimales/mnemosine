import { useState } from "react";

import { connect } from "react-redux";
import { addProject } from "../redux/actions/dataActions";
import { useUI } from "../context";

const AddProject = ({ addProject }) => {
	const { showAddProject, setShowAddProject } = useUI();
	const [name, setName] = useState("");

	const handleAddProject = () => {
		if (name === "") return;
		addProject({ name });
		setName("");
		setShowAddProject(false);
	};

	return (
		<div className="add-project" data-testid="add-project">
			{showAddProject ? (
				<div className="add-project__input">
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="add-project__name"
						data-testid="project-name"
						type="text"
						placeholder="Nombre"
					/>
					<button
						className="add-project__submit"
						type="button"
						onClick={() => handleAddProject()}
						data-testid="add-project-submit"
					>
						Agregar
					</button>
					<span
						aria-label="Cancelar"
						className="add-project__cancel"
						data-testid="hide-project-overlay"
						onClick={() => setShowAddProject(false)}
						onKeyDown={() => setShowAddProject(false)}
						role="button"
						tabIndex={0}
					>
						Cancelar
					</span>
				</div>
			) : (
				<>
					<span className="add-project__plus">+</span>
					<span
						aria-label="Nuevo"
						className="add-project__text"
						data-testid="add-project-action"
						onClick={() => setShowAddProject(true)}
						onKeyDown={() => setShowAddProject(true)}
						role="button"
						tabIndex={0}
					>
						Proyecto
					</span>
				</>
			)}
		</div>
	);
};

const mapActionsToProps = {
	addProject,
};

export default connect(null, mapActionsToProps)(AddProject);
