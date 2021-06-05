import { useEffect } from "react";
import Project from "../Project";

import { useDispatch, useSelector } from "react-redux";
import { loadProjects } from "../../../../store/dataSlice";
import ProjectSkeleton from "../ProjectsSkeleton";

export default function Projects({ showProjects }) {
	const projects = useSelector((state) => state.data.projects);
	const { projectsLoading, selectedProject } = useSelector(
		(state) => state.data
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadProjects());
	}, [dispatch]);

	if (!showProjects) return null;

	if (projectsLoading) return <ProjectSkeleton />;

	return (
		<ul className="projects">
			{projects &&
				projects.map((project) => (
					<Project key={project.id} project={project} />
				))}
		</ul>
	);
}
