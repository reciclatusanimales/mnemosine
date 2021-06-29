import AddTask from "../../pages/Home/components/AddTask";
import { useUI } from "../../context";
import { useSelector } from "react-redux";
import ProfileDropdown from "../ProfileDropdown";
import ColorPalette from "../ColorPalette";

export default function Header() {
	const user = useSelector((state) => state.user.user);

	const { showSidebar, setShowSidebar } = useUI();

	return (
		<header className="Header">
			<div className="Header__wrapper">
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
			</div>
			<div className="Header__wrapper">
				<nav>
					<ul className="Header__settings">
						{user && <AddTask />}
						<ColorPalette />
						<ProfileDropdown />
					</ul>
				</nav>
			</div>
		</header>
	);
}
