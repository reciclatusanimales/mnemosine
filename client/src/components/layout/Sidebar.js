import { useState } from "react";
import {
	FaChevronDown,
	FaInbox,
	FaRegCalendarAlt,
	FaRegCalendar,
} from "react-icons/fa";

import AddProject from "../AddProject";
import EditProject from "../EditProject";
import Projects from "../Projects";
import { useUI } from "../../context";
import { connect } from "react-redux";
import { setProject } from "../../redux/actions/dataActions";
import { defaultProjects } from "../../constants";

const Sidebar = ({ selectedProject, setProject }) => {
	const [showProjects, setShowProjects] = useState(true);
	const { showSidebar, setShowSidebar, showEditProject } = useUI();

	const handleChange = (project) => {
		const defaultProject = defaultProjects.find((p) => p.id === project);
		setProject(defaultProject);
		setShowSidebar(false);
	};

	return (
		<div
			className={showSidebar ? "sidebar show-sidebar" : "sidebar"}
			data-testid="sidebar"
		>
			<ul className="sidebar__generic">
				<li
					className={
						selectedProject.id === "all" ? "active" : undefined
					}
				>
					<div
						data-testid="inbox"
						onClick={() => handleChange("all")}
						onKeyDown={() => handleChange("all")}
						tabIndex={0}
						role="button"
					>
						<span>
							<FaInbox />
						</span>
						<span>Todos</span>
					</div>
				</li>
				<li
					className={
						selectedProject.id === "today" ? "active" : undefined
					}
				>
					<div
						data-testid="today"
						aria-label="Show today's tasks"
						onClick={() => handleChange("today")}
						onKeyDown={() => handleChange("today")}
						tabIndex={0}
						role="button"
					>
						<span>
							<FaRegCalendar />
						</span>
						<span>Hoy</span>
					</div>
				</li>
				<li
					className={
						selectedProject.id === "next_7" ? "active" : undefined
					}
				>
					<div
						data-testid="next_7"
						aria-label="Show tasks for the next 7 days"
						onClick={() => handleChange("next_7")}
						onKeyDown={() => handleChange("next_7")}
						tabIndex={0}
						role="button"
					>
						<span>
							<FaRegCalendarAlt />
						</span>
						<span>Póximos 7 días</span>
					</div>
				</li>
				<div
					className="sidebar__middle"
					aria-label="Show/hide projects"
					onClick={() => setShowProjects(!showProjects)}
					onKeyDown={() => setShowProjects(!showProjects)}
					tabIndex={0}
					role="button"
				>
					<span>
						<FaChevronDown
							className={
								!showProjects ? "hidden-projects" : undefined
							}
						/>
					</span>
					<h2>Proyectos</h2>
				</div>

				<ul className="sidebar__projects">
					{showProjects && <Projects />}
				</ul>
			</ul>

			{showProjects && !showEditProject && <AddProject />}

			{showEditProject && <EditProject />}
		</div>
	);
};

const mapStateToProps = (state) => ({
	selectedProject: state.data.selectedProject,
});

const mapActionsToProps = {
	setProject,
};

export default connect(mapStateToProps, mapActionsToProps)(Sidebar);
