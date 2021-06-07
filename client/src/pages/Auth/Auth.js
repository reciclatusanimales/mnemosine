import { useUI } from "../../context";
import Login from "./components/Login";
import Register from "./components/Register";

export default function Auth() {
	const { showRegister } = useUI();

	return (
		<section className="auth">
			{showRegister ? <Register /> : <Login />}
		</section>
	);
}
