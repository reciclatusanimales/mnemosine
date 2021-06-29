import { useDispatch, useSelector } from "react-redux";
import { login, loginWithGoogle, cleanErrors } from "../../store/userSlice";
import app, { googleAuthProvider } from "../../services/firebase/config";
import { FaGoogle } from "react-icons/fa";
import useForm from "../../hooks/useForm";
import FormField from "../../components/FormField";
import Button from "../../components/Button";
import { Link, Redirect } from "react-router-dom";

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

export default function Login({ history }) {
	const dispatch = useDispatch();
	const { error, isLoading } = useSelector((state) => state.user);

	const handleLogin = async () => {
		await dispatch(login(values));
		history.push("/");
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

	return (
		<section className="Login">
			<div className="Login__content">
				<div className="Login__form__container">
					<h1>Login</h1>
					<form
						onSubmit={handleSubmit}
						className="Login__form"
						noValidate
					>
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

						<div className="recovery">
							<Link to="/forgot-password">
								Recuperar contraseña
							</Link>
						</div>
					</form>
					<div className="Login__options">
						<button onClick={() => socialLogin(googleAuthProvider)}>
							<FaGoogle /> Entra con Google
						</button>
						<Link to="/register">Registrarse</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
