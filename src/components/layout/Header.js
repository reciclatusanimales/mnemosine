import { FaPizzaSlice } from "react-icons/fa";

export default function Header() {
	return (
		<header className="header" data-testid="header">
			<nav>
				<div className="logo">
					<img src="/images/logo.png" alt="Todo" />
				</div>
				<div className="settings">
					<ul>
						<li>+</li>
						<li>
							<FaPizzaSlice />
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
}
