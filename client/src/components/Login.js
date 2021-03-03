import { useState } from "react";
import { useDispatch } from "react-redux";
import { useUI } from "../context";
import { login, loginWithGoogle } from "../redux/actions/userActions";
import app, { googleAuthProvider } from "../firebase/config";
import { FaGoogle } from "react-icons/fa";

export default function Login() {
	const dispatch = useDispatch();
	const { setShowRegister } = useUI();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (username === "" || password === "") return;

		await dispatch(
			login({
				username,
				password,
			})
		)
			.then((res) => {
				console.log(res);
				localStorage.setItem("token", res.token);
			})
			.catch((err) => {
				console.log(err.error);
				setErrors(err.error);
			});
	};

	const socialLogin = async (provider) => {
		await app
			.auth()
			.signInWithPopup(provider)
			.then(async (result) => {
				const { displayName, email, photoURL } = result.user;
				console.log(result);
				console.log(displayName, email, photoURL);
				await dispatch(
					loginWithGoogle({ displayName, email, photoURL })
				)
					.then((res) => {
						console.log(res);
						localStorage.setItem("token", res.token);
					})
					.catch((err) => {
						console.log(err);
						setErrors(err.response.data.error);
					});
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	const handleRegister = (e) => {
		e.preventDefault();
		setShowRegister(true);
	};

	return (
		<div className="auth__content">
			<h1>Login</h1>

			<form onSubmit={handleSubmit} className="auth__form" noValidate>
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

				<div>
					<button type="submit">Entrar</button>
				</div>

				<span>{errors.general}</span>
			</form>

			<div className="auth__options">
				<button onClick={() => socialLogin(googleAuthProvider)}>
					<FaGoogle /> Entra con Google
				</button>
				<a href="/" onClick={handleRegister}>
					Registrarse
				</a>
			</div>
		</div>
	);
}
