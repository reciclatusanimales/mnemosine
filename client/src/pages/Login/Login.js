import { useDispatch, useSelector } from "react-redux";
import { useUI } from "../../context";
import { login, loginWithGoogle, cleanErrors } from "../../store/userSlice";
import app, { googleAuthProvider } from "../../services/firebase/config";
import { FaGoogle } from "react-icons/fa";
import useForm from "../../hooks/useForm";
import FormField from "../../components/FormField";
import Button from "../../components/Button";

const fields = {
	username: "",
	password: "",
};

const rules = {
	username: {
		type: "text",
		required: true,
	},
	password: { type: "text", required: true },
};

export default function Login() {
	const dispatch = useDispatch();
	const { setShowRegister } = useUI();
	const { error, isLoading } = useSelector((state) => state.user);

	const handleLogin = () => {
		dispatch(login(values));
	};

	const handleCleanErrors = () => {
		if (error) dispatch(cleanErrors());
	};

	const socialLogin = async (provider) => {
		await app
			.auth()
			.signInWithPopup(provider)
			.then(async (result) => {
				const { displayName, email, photoURL } = result.user;
				dispatch(loginWithGoogle({ displayName, email, photoURL }));
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	const { handleChange, handleSubmit, values, errors } = useForm(
		{ fields, rules },
		handleLogin,
		handleCleanErrors
	);

	const handleRegister = (e) => {
		e.preventDefault();
		dispatch(cleanErrors());
		setShowRegister(true);
	};

	return (
		<div className="auth__content">
			<div className="auth__form__container">
				<h1>Login</h1>
				<form onSubmit={handleSubmit} className="auth__form" noValidate>
					<FormField
						error={errors.username}
						label="Nombre de usuario"
						name="username"
						placeholder="Tu nombre de usuario"
						onChange={handleChange}
						value={values.username}
					/>

					<FormField
						error={errors.password}
						label="Contraseña"
						name="password"
						type="password"
						placeholder="••••••"
						onChange={handleChange}
						value={values.password}
					/>

					<div>
						<Button type="submit" isLoading={isLoading}>
							entrar
						</Button>
					</div>

					<span>{errors.general}</span>

					<p className={`error-message${error ? "" : " hide"}`}>
						{error}
					</p>
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
		</div>
	);
}
