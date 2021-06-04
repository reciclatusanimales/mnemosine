import { useDispatch, useSelector } from "react-redux";
import { useUI } from "../context";
import useForm from "../hooks/useForm";
import { register, cleanErrors } from "../redux/userSlice";
import FormField from "./layout/FormField";
import Button from "./layout/Button";

const fields = {
	username: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const rules = {
	username: {
		type: "text",
		required: true,
		min: 3,
	},
	email: { type: "email", required: true },
	password: { type: "text", required: true, min: 6 },
	confirmPassword: {
		type: "text",
		required: true,
		match: { field: "password", message: "Las contraseñas no coinciden." },
	},
};

export default function Register() {
	const dispatch = useDispatch();
	const { setShowRegister } = useUI();
	const { error, isLoading } = useSelector((state) => state.user);

	const handleLogin = (e) => {
		e.preventDefault();
		dispatch(cleanErrors());
		setShowRegister(false);
	};

	const handleRegister = async () => {
		await dispatch(register(values));
	};

	const handleCleanErrors = () => {
		if (error) dispatch(cleanErrors());
	};

	const { handleChange, handleSubmit, values, errors } = useForm(
		{ fields, rules },
		handleRegister,
		handleCleanErrors
	);

	return (
		<div className="auth__content">
			<div className="auth__form__container">
				<h1>Registro</h1>

				<form onSubmit={handleSubmit} className="auth__form" noValidate>
					<FormField
						error={errors.email}
						label="Email"
						name="email"
						onChange={handleChange}
						placeholder="Tu correo"
						type="email"
						value={values.email}
					/>

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
						placeholder="••••••"
						type="password"
						onChange={handleChange}
						value={values.password}
					/>

					<FormField
						error={errors.confirmPassword}
						label="Confirmar Contraseña"
						name="confirmPassword"
						placeholder="••••••"
						type="password"
						onChange={handleChange}
						value={values.confirmPassword}
					/>

					<div>
						<Button type="submit" isLoading={isLoading}>
							registrarse
						</Button>
					</div>

					<span>{errors.general}</span>

					<p className={`error-message${error ? "" : " hide"}`}>
						{error}
					</p>
				</form>

				<div className="auth__options">
					<a href="/" onClick={handleLogin}>
						Login
					</a>
				</div>
			</div>
		</div>
	);
}
