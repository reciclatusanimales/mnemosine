import { useState } from "react";
import { FaPizzaSlice } from "react-icons/fa";
import AddTask from "../AddTask";

export default function Header({ darkMode, setDarkMode }) {
	const [shouldShowMain, setShouldShowMain] = useState(false);
	const [showQuickAddTask, setShowQuickAddTask] = useState(false);

	return (
		<header className="header" data-testid="header">
			<nav>
				<div className="logo">
					<img src="/images/logo.png" alt="Todo" />
				</div>
				<div className="settings">
					<ul>
						<li className="settings__add">
							<button
								data-testid="quick-add-task-action"
								aria-label="Quick add task"
								onClick={() => {
									setShowQuickAddTask(true);
									setShouldShowMain(true);
								}}
								onKeyDown={() => {
									setShowQuickAddTask(true);
									setShouldShowMain(true);
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
								<FaPizzaSlice />
							</button>
						</li>
					</ul>
				</div>
			</nav>

			<AddTask
				showAddTaskMain={false}
				shouldShowMain={shouldShowMain}
				showQuickAddTask={showQuickAddTask}
				setShowQuickAddTask={setShowQuickAddTask}
			/>
		</header>
	);
}
