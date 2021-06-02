import AddTask from "../AddTask";
import EditTask from "../EditTask";
import DeleteProject from "../DeleteProject";
import DeleteTask from "../DeleteTask";
import { useUI } from "../../context";
import { FaPalette, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/userSlice";
import { useEffect, useRef } from "react";

export default function Header() {
	const profileRef = useRef(null);
	const { darkMode, setDarkMode } = useUI();
	const user = useSelector((state) => state.user.user);
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

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (!profileRef.current?.contains(event.target)) {
				if (!showProfileMenu) return;
				setShowProfileMenu(false);
			}
		};

		if (typeof window !== "undefined") {
			window.addEventListener("click", handleOutsideClick);
		}

		if (typeof window !== "undefined") {
			return () =>
				window.removeEventListener("click", handleOutsideClick);
		}
	}, [showProfileMenu, setShowProfileMenu]);

	useEffect(() => {
		const handleEscape = (event) => {
			if (!showProfileMenu) return;

			if (event.key === "Escape") {
				setShowProfileMenu(false);
			}
		};

		document.addEventListener("keyup", handleEscape);
		return () => document.removeEventListener("keyup", handleEscape);
	}, [showProfileMenu, setShowProfileMenu]);

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
						{user && (
							<li
								className="settings__avatar"
								onClick={handleProfile}
								ref={profileRef}
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

			<DeleteProject />
			<DeleteTask />
		</header>
	);
}
