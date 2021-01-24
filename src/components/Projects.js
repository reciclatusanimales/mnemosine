import { useState } from "react";
import { useProjectsValue, useSelectedProjectValue } from "../context";
import Project from "./Project";

export default function Projects({ activeValue = null }) {
	const [active, setActive] = useState(activeValue);
	const { setSelectedProject } = useSelectedProjectValue();
	const { projects } = useProjectsValue();

	return (
		projects &&
		projects.map((project) => (
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
						setSelectedProject(project.projectId);
					}}
					onKeyDown={() => {
						setActive(project.projectId);
						setSelectedProject(project.projectId);
					}}
				>
					<Project project={project} />
				</div>
			</li>
		))
	);
}
