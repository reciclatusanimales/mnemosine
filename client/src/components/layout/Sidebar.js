import { useEffect, useRef, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { setProject } from "../../redux/actions/dataActions";
import { defaultProjects } from "../../constants";

export default function Sidebar() {
	const sidebarRef = useRef(null);
	const [showProjects, setShowProjects] = useState(true);
	const { showSidebar, setShowSidebar, showEditProject } = useUI();

	const selectedProject = useSelector((state) => state.data.selectedProject);
	const dispatch = useDispatch();

	const handleChange = (project) => {
		const defaultProject = defaultProjects.find((p) => p.id === project);
		dispatch(setProject(defaultProject));
		setShowSidebar(false);
	};

	useEffect(() => {
		const handleOutsideClick = (event) => {
			console.log(event.target);
			if (
				!sidebarRef.current?.contains(event.target) &&
				event.target.getAttribute("data-type") !== "action"
			) {
				if (!showSidebar) return;
				setShowSidebar(false);
			}
		};

		if (typeof window !== "undefined") {
			window.addEventListener("click", handleOutsideClick);
		}

		if (typeof window !== "undefined") {
			return () =>
				window.removeEventListener("click", handleOutsideClick);
		}
	}, [showSidebar, setShowSidebar]);

	useEffect(() => {
		const handleEscape = (event) => {
			if (!showSidebar) return;
			if (event.key === "Escape") {
				setShowSidebar(false);
			}
		};

		document.addEventListener("keyup", handleEscape);
		return () => document.removeEventListener("keyup", handleEscape);
	}, [showSidebar, setShowSidebar]);

	return (
		<div
			className={showSidebar ? "sidebar show-sidebar" : "sidebar"}
			ref={sidebarRef}
		>
			<ul className="sidebar__generic">
				<li
					className={
						selectedProject.id === "all" ? "active" : undefined
					}
				>
					<div
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
					<Projects showProjects={showProjects} />
				</ul>
			</ul>

			{showProjects && !showEditProject && <AddProject />}

			{showEditProject && <EditProject />}
		</div>
	);
}
