import { useEffect } from "react";
import Project from "./Project";

import { useDispatch, useSelector } from "react-redux";
import { getProjects, setProject } from "../redux/actions/dataActions";
import { useUI } from "../context";

export default function Projects({ showProjects }) {
	const { setShowSidebar } = useUI();
	const projects = useSelector((state) => state.data.projects);
	const selectedProject = useSelector((state) => state.data.selectedProject);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProjects());
		// eslint-disable-next-line
	}, []);

	if (!showProjects) return null;

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
					dispatch(setProject(project));
					setShowSidebar(false);
				}}
				onKeyDown={() => {
					dispatch(setProject(project));
					setShowSidebar(false);
				}}
				className={
					selectedProject?.id === project.id
						? "active sidebar__project"
						: "sidebar__project"
				}
			>
				<Project project={project} />
			</li>
		))
	);
}
