import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useProjectsValue, useSelectedProjectValue } from "../context";
import { firebase } from "../firebase";

export default function Project({ project }) {
	const { docId, name } = project;
	const [showConfirm, setShowConfirm] = useState(false);
	const { projects, setProjects } = useProjectsValue();
	const { setSelectedProject } = useSelectedProjectValue();

	const deleteProject = (docId) => {
		firebase
			.firestore()
			.collection("projects")
			.doc(docId)
			.delete()
			.then(() => {
				setProjects([...projects]);
				setSelectedProject("INBOX");
			});
	};

	return (
		<>
			<span className="sidebar__dot">•</span>
			<span className="sidebar__project-name">{name}</span>
			<span
				aria-label="Confirm deletion of project"
				className="sidebar__project-delete"
				data-testid="delete-project"
				onClick={() => setShowConfirm(!showConfirm)}
				onKeyDown={() => setShowConfirm(!showConfirm)}
				tabIndex={0}
				role="button"
			>
				<FaTrash />
				{showConfirm && (
					<div className="project-delete-modal">
						<span className="project-delete-modal__inner">
							<p>Are you sure you want to delete this project?</p>
							<button
								type="button"
								onClick={() => deleteProject(docId)}
								onKeyDown={() => deleteProject(docId)}
							>
								Delete
							</button>
							<span
								aria-label="Cancel adding project, do not delete"
								onClick={() => setShowConfirm(!showConfirm)}
								onKeyDown={() => setShowConfirm(!showConfirm)}
								tabIndex={0}
								role="button"
							>
								Cancel
							</span>
						</span>
					</div>
				)}
			</span>
		</>
	);
}
