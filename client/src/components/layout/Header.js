import AddTask from "../AddTask";
import EditTask from "../EditTask";
import { useUI } from "../../context";
import { FaRegListAlt } from "react-icons/fa";

export default function Header({ darkMode, setDarkMode }) {
	const {
		showSidebar,
		setShowSidebar,
		showAddTask,
		setShowAddTask,
		showEditTask,
	} = useUI();

	return (
		<header className="header" data-testid="header">
			<nav>
				<div
					className={
						showSidebar
							? "colorlib-nav-toggle active"
							: "colorlib-nav-toggle"
					}
					onClick={() => setShowSidebar(!showSidebar)}
				>
					<i></i>
				</div>

				<div className="settings">
					<ul>
						<li className="settings__add">
							<button
								data-testid="quick-add-task-action"
								aria-label="Quick add task"
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
						<li className="settings__darkmode">
							<button
								data-testid="dark-mode-action"
								aria-label="Darkmode on/off"
								onClick={() => setDarkMode(!darkMode)}
								onKeyDown={() => setDarkMode(!darkMode)}
								type="button"
							>
								<div className="logo">
									<FaRegListAlt />
								</div>
							</button>
						</li>
					</ul>
				</div>
			</nav>

			{showAddTask && <AddTask />}

			{showEditTask && <EditTask />}
		</header>
	);
}
