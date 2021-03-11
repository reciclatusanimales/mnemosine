import AddTask from "../AddTask";
import EditTask from "../EditTask";
import { useUI } from "../../context";
import { FaPalette, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/userActions";

export default function Header({ darkMode, setDarkMode }) {
	const user = useSelector((state: any) => state.user.user);
	const dispatch = useDispatch();

	const {
		showSidebar,
		setShowSidebar,
		showProfileMenu,
		setShowProfileMenu,
		showAddTask,
		setShowAddTask,
		showEditTask,
	} = useUI();

	const handleProfile = () => {
		setShowProfileMenu(!showProfileMenu);
	};

	const handleLogout = () => {
		dispatch(logoutUser());
	};

	return (
		<header className="header" data-testid="header">
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
						)}
						<li className="settings__darkmode">
							<button
								data-testid="dark-mode-action"
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
						{user && (
							<li
								className="settings__avatar"
								onClick={handleProfile}
							>
								<div className="avatar">
									<img src={user.imageUrl} alt="Avatar" />
									{showProfileMenu && (
										<div className="dropdown-content">
											<span>{user.username}</span>
											<span>{user.email}</span>
											<span
												onClick={() => handleLogout()}
											>
												salir <FaSignOutAlt />
											</span>
										</div>
									)}
								</div>
							</li>
						)}
					</ul>
				</div>
			</nav>

			{showAddTask && <AddTask />}

			{showEditTask && <EditTask />}
		</header>
	);
}
