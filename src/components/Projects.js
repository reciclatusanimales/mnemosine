import { useEffect, useState } from "react";
import Project from "./Project";

import { connect } from "react-redux";
import { getProjects, setProject } from "../redux/actions/dataActions";

const Projects = ({
	projects,
	getProjects,
	setProject,
	activeValue = null,
}) => {
	const [active, setActive] = useState(activeValue);

	useEffect(() => {
		getProjects();
	}, []);

	const selectProject = (projectId) => {
		console.log("asdf");
		setProject(projectId);
	};

	const projectsMarkup =
		projects.length > 0
			? projects.map((project) => (
					<li
						key={project.projectId}
						data-doc-id={project.docId}
						className={
							active === project.projectId
								? "active sidebar__project"
								: "sidebar__project"
						}
					>
						<div
							data-testid="project-action"
							aria-label={`Select ${project.name} as the task project`}
							role="button"
							tabIndex={0}
							onClick={() => {
								setActive(project.projectId);
								selectProject(project.projectId);
							}}
							onKeyDown={() => {
								setActive(project.projectId);
								selectProject(project.projectId);
							}}
						>
							<Project project={project} />
						</div>
					</li>
			  ))
			: null;

	return <div>{projectsMarkup}</div>;
};

const mapStateToProps = (state) => ({
	projects: state.data.projects,
});

const mapActionsToProps = {
	getProjects,
	setProject,
};
export default connect(mapStateToProps, mapActionsToProps)(Projects);
