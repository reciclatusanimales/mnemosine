import { useState } from "react";
import {
	FaChevronDown,
	FaInbox,
	FaRegCalendarAlt,
	FaRegCalendar,
} from "react-icons/fa";

import { useSelectedProjectValue } from "../../context";
import AddProject from "../AddProject";
import Projects from "../Projects";

export default function Sidebar() {
	const { setSelectedProject } = useSelectedProjectValue();
	const [active, setActive] = useState("inbox");
	const [showProjects, setShowProjects] = useState(true);

	return (
		<div className="sidebar" data-testid="sidebar">
			<ul className="sidebar__generic">
				<li
					className={active === "inbox" ? "active" : undefined}
					data-testid="inbox"
					onClick={() => {
						setActive("inbox");
						setSelectedProject("INBOX");
					}}
				>
					<div>
						<span>
							<FaInbox />
						</span>
						<span>Inbox</span>
					</div>
				</li>
				<li
					className={active === "today" ? "active" : undefined}
					data-testid="today"
					onClick={() => {
						setActive("today");
						setSelectedProject("TODAY");
					}}
				>
					<div>
						<span>
							<FaRegCalendar />
						</span>
						<span>Today</span>
					</div>
				</li>
				<li
					className={active === "next_7" ? "active" : undefined}
					data-testid="next_7"
					onClick={() => {
						setActive("next_7");
						setSelectedProject("NEXT_7");
					}}
				>
					<div>
						<span>
							<FaRegCalendarAlt />
						</span>
						<span>Next 7 days</span>
					</div>
				</li>
				<div
					className="sidebar__middle"
					onClick={() => setShowProjects(!showProjects)}
				>
					<span>
						<FaChevronDown
							className={
								!showProjects ? "hidden-projects" : undefined
							}
						/>
					</span>
					<h2>Projects</h2>
				</div>

				<ul className="sidebar__projects">
					{showProjects && <Projects />}
				</ul>
			</ul>
			{showProjects && <AddProject />}
		</div>
	);
}
