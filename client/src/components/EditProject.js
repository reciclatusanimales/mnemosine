import { useState } from "react";

import { connect } from "react-redux";
import { updateProject } from "../redux/actions/dataActions";
import { useUI } from "../context";

const EditProject = ({ selectedProject, updateProject }) => {
	const { setShowEditProject } = useUI();
	const [name, setName] = useState(selectedProject?.name);

	const handleUpdateProject = () => {
		if (name === "") return;
		updateProject({ id: selectedProject.id, name });
		setName("");
		setShowEditProject(null);
	};

	return (
		<div className="add-project" data-testid="add-project">
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
					onClick={() => handleUpdateProject()}
					data-testid="add-project-submit"
				>
					Guardar
				</button>
				<span
					aria-label="Cancel adding project"
					className="add-project__cancel"
					data-testid="hide-project-overlay"
					onClick={() => setShowEditProject(null)}
					onKeyDown={() => setShowEditProject(null)}
					role="button"
					tabIndex={0}
				>
					Cancel
				</span>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	selectedProject: state.data.selectedProject,
});

const mapActionsToProps = {
	updateProject,
};

export default connect(mapStateToProps, mapActionsToProps)(EditProject);
