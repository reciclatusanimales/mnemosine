import { useEffect } from "react";
import Project from "./Project";

import { useDispatch, useSelector } from "react-redux";
import { loadProjects } from "../redux/dataSlice";

export default function Projects({ showProjects }) {
	const projects = useSelector((state) => state.data.projects);
	const selectedProject = useSelector((state) => state.data.selectedProject);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadProjects());
	}, [dispatch]);

	if (!showProjects) return null;

	return (
		projects &&
		projects.map((project) => (
			<li
				key={project.id}
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
