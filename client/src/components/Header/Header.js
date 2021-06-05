import "./header.scss";
import AddTask from "../../pages/Home/components/AddTask";
import EditTask from "../../pages/Home/components/EditTask";
import DeleteProject from "../../pages/Home/components/DeleteProject";
import DeleteTask from "../../pages/Home/components/DeleteTask/DeleteTask";
import { useUI } from "../../context";
import { FaPalette } from "react-icons/fa";
import { useSelector } from "react-redux";
import ProfileDropdown from "../ProfileDropdown";

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
						<ProfileDropdown />
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
