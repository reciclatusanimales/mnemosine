import { useState } from "react";
import { useProjectsValue, useSelectedProjectValue } from "../context";
import Project from "./Project";

export default function Projects({ activeValue = true }) {
	const [active, setActive] = useState(activeValue);
	const { setSelectedProject } = useSelectedProjectValue();
	const { projects } = useProjectsValue();

	return (
		projects &&
		projects.map((project) => (
			<li
				key={project.projectId}
				data-doc-id={project.docId}
				data-testid="project-action"
				className={
					active === project.projectId
						? "active sidebar__project"
						: "sidebar__project"
				}
			>
				<div
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
