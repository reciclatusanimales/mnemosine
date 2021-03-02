import { useState } from "react";
import { useDispatch } from "react-redux";
import { useUI } from "../context";
import { register } from "../redux/actions/userActions";

export default function Register() {
	const { setShowRegister } = useUI();
	const dispatch = useDispatch();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [email, setEmail] = useState("");
	const [errors, setErrors] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (
			email === "" ||
			username === "" ||
			password === "" ||
			confirmPassword === ""
		)
			return;

		await dispatch(
			register({
				email,
				username,
				password,
				confirmPassword,
			})
		)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
				setErrors(err.response.data.error);
			});
	};

	const handleLogin = (e) => {
		e.preventDefault();
		setShowRegister(false);
	};

	return (
		<div>
			<h1>Register</h1>

			<form onSubmit={handleSubmit} noValidate>
				<label>{errors.email ?? "Email"}</label>
				<input
					type="email"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<label>{errors.username ?? "Nombre de usuario"}</label>
				<input
					type="text"
					name="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>

				<label>{errors.password ?? "Contraseña"}</label>
				<input
					type="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<label>
					{errors.confirmPassword ?? "Confirmar Contraseña"}
				</label>
				<input
					type="password"
					name="confirmPassword"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>

				<button type="submit">Registrarse</button>
			</form>

			<span className="text-danger">{errors.general}</span>

			<a href="/" onClick={handleLogin}>
				Login
			</a>
		</div>
	);
}
