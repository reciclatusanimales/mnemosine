import { useEffect } from "react";
import Project from "./Project";

import { useDispatch, useSelector } from "react-redux";
import { loadProjects } from "../redux/dataSlice";
import ProjectSkeleton from "./layout/ProjectsSkeleton";

export default function Projects({ showProjects }) {
	const projects = useSelector((state) => state.data.projects);
	const { selectedProject, projectsLoading } = useSelector(
		(state) => state.data
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadProjects());
	}, [dispatch]);

	if (!showProjects) return null;

	if (projectsLoading) return <ProjectSkeleton />;

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
