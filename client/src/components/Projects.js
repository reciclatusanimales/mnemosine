import { useEffect } from "react";
import Project from "./Project";

import { connect } from "react-redux";
import { getProjects, setProject } from "../redux/actions/dataActions";
import { useUI } from "../context";

const Projects = ({ projects, selectedProject, setProject, getProjects }) => {
	const { setShowSidebar, setShowAddProject } = useUI();

	useEffect(() => {
		getProjects();

		// eslint-disable-next-line
	}, []);

	return (
		projects &&
		projects.map((project) => (
			<li
				key={project.id}
				data-doc-id={project.docId}
				aria-label={`Select ${project.name}`}
				role="button"
				tabIndex={0}
				onClick={() => {
					setProject(project);
					setShowSidebar(false);
					setShowAddProject(false);
				}}
				onKeyDown={() => {
					setProject(project);
					setShowSidebar(false);
					setShowAddProject(false);
				}}
				className={
					selectedProject?.id === project.id
						? "active sidebar__project"
						: "sidebar__project"
				}
			>
				<div>
					<Project project={project} />
				</div>
			</li>
		))
	);
};

const mapStateToProps = (state) => ({
	projects: state.data.projects,
	selectedProject: state.data.selectedProject,
});

const mapActionsToProps = {
	getProjects,
	setProject,
};

export default connect(mapStateToProps, mapActionsToProps)(Projects);
