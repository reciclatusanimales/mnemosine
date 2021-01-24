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
				>
					<div
						onClick={() => {
							setActive("inbox");
							setSelectedProject("INBOX");
						}}
						onKeyDown={() => {
							setActive("inbox");
							setSelectedProject("INBOX");
						}}
						tabIndex={0}
						role="button"
					>
						<span>
							<FaInbox />
						</span>
						<span>Inbox</span>
					</div>
				</li>
				<li
					className={active === "today" ? "active" : undefined}
					data-testid="today"
				>
					<div
						onClick={() => {
							setActive("today");
							setSelectedProject("TODAY");
						}}
						onKeyDown={() => {
							setActive("today");
							setSelectedProject("TODAY");
						}}
						tabIndex={0}
						role="button"
					>
						<span>
							<FaRegCalendar />
						</span>
						<span>Today</span>
					</div>
				</li>
				<li
					className={active === "next_7" ? "active" : undefined}
					data-testid="next_7"
				>
					<div
						onClick={() => {
							setActive("next_7");
							setSelectedProject("NEXT_7");
						}}
						onKeyDown={() => {
							setActive("next_7");
							setSelectedProject("NEXT_7");
						}}
						tabIndex={0}
						role="button"
					>
						<span>
							<FaRegCalendarAlt />
						</span>
						<span>Next 7 days</span>
					</div>
				</li>
				<div
					className="sidebar__middle"
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
