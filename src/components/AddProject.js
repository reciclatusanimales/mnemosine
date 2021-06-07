import { db } from "../firebase";
import { generatePushId } from "../helpers";
import { useState } from "react";

import { connect } from "react-redux";
import { addProject } from "../redux/actions/dataActions";

const AddProject = ({ shouldShow = false, addProject }) => {
	const [show, setShow] = useState(shouldShow);
	const [name, setName] = useState("");

	const handleAddProject = () => {
		if (name === "") return;
		addProject({ name });
		setName("");
		setShow(false);
	};

	return (
		<div className="add-project" data-testid="add-project">
			{show && (
				<div className="add-project__input">
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="add-project__name"
						data-testid="project-name"
						type="text"
						placeholder="Name your project"
					/>
					<button
						className="add-project__submit"
						type="button"
						onClick={() => handleAddProject()}
						data-testid="add-project-submit"
					>
						Add Project
					</button>
					<span
						aria-label="Cancel adding project"
						className="add-project__cancel"
						data-testid="hide-project-overlay"
						onClick={() => setShow(false)}
						onKeyDown={() => setShow(false)}
						role="button"
						tabIndex={0}
					>
						Cancel
					</span>
				</div>
			)}
			<span className="add-project__plus">+</span>
			<span
				aria-label="Add project"
				className="add-project__text"
				data-testid="add-project-action"
				onClick={() => setShow(!show)}
				onKeyDown={() => setShow(!show)}
				role="button"
				tabIndex={0}
			>
				Add Project
			</span>
		</div>
	);
};

const mapActionsToProps = {
	addProject,
};

export default connect(null, mapActionsToProps)(AddProject);
