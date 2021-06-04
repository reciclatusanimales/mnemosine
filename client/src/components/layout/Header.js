import AddTask from "../AddTask";
import EditTask from "../EditTask";
import DeleteProject from "../DeleteProject";
import DeleteTask from "../DeleteTask";
import { useUI } from "../../context";
import { FaPalette } from "react-icons/fa";
import { useSelector } from "react-redux";
import Profile from "./Profile";

export default function Header() {
	const user = useSelector((state) => state.user.user);

	const {
		darkMode,
		setDarkMode,
		showSidebar,
		setShowSidebar,
		showAddTask,
		setShowAddTask,
		showEditTask,
	} = useUI();

	return (
		<header className="header">
			<nav>
				{user && (
					<div
						className={
							showSidebar ? "nav-toggle active" : "nav-toggle"
						}
						onClick={() => setShowSidebar(!showSidebar)}
					>
						<i></i>
					</div>
				)}
				<div className="settings">
					<ul>
						{user && (
							<li className="settings__add">
								<button
									aria-label="Nueva Tarea"
									onClick={() => {
										setShowAddTask(true);
									}}
									onKeyDown={() => {
										setShowAddTask(true);
									}}
									type="button"
								>
									+
								</button>
							</li>
						)}
						<li className="settings__darkmode">
							<button
								aria-label="Darkmode on/off"
								onClick={() => setDarkMode(!darkMode)}
								onKeyDown={() => setDarkMode(!darkMode)}
								type="button"
							>
								<div className="logo">
									<FaPalette />
								</div>
							</button>
						</li>
						<Profile />
					</ul>
				</div>
			</nav>

			{showAddTask && <AddTask />}
			{showEditTask && <EditTask />}

			<DeleteProject />
			<DeleteTask />
		</header>
	);
}
