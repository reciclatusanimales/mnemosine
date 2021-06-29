import { useDispatch, useSelector } from "react-redux";
import { resetPassword, cleanErrors, checkToken } from "../../store/userSlice";
import useForm from "../../hooks/useForm";
import FormField from "../../components/FormField";
import Button from "../../components/Button";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

const fields = {
	password: "",
	confirmPassword: "",
};

const rules = {
	password: { type: "text", required: true, min: 6 },
	confirmPassword: {
		type: "text",
		required: true,
		match: { field: "password", message: "Las contraseñas no coinciden." },
	},
};

export default function ResetPassword({ history }) {
	const dispatch = useDispatch();

	const { token } = useParams();
	const { error, success, isLoading } = useSelector((state) => state.user);

	const handleResetPassword = () => {
		dispatch(resetPassword({ token, data: values }));
	};

	const handleCleanErrors = () => {
		if (error) dispatch(cleanErrors());
	};

	const { handleChange, handleSubmit, values, errors } = useForm(
		{ fields, rules },
		handleResetPassword,
		handleCleanErrors
	);

	useEffect(() => {
		if (token) dispatch(checkToken(token));
	}, [token, dispatch]);

	useEffect(() => {
		if (success) return history.push("/");
	}, [success, history]);

	useEffect(() => {
		dispatch(cleanErrors());
	}, [dispatch]);

	return (
		<section className="ResetPassword">
			<div className="ResetPassword__content">
				<h1>Actualiza tu Contraseña</h1>

				<div className="ResetPassword__container">
					{error ? (
						<div className="info">
							<h3>El link ya expiró. </h3>
							<p>
								Vuelve a solicitar la recuperación de tu
								contraseña.
							</p>
							<div className="recovery">
								<Link to="/forgot-password">
									Recuperar contraseña
								</Link>
							</div>
						</div>
					) : (
						<form onSubmit={handleSubmit} noValidate>
							<FormField
								error={errors.password}
								label="Nueva Contraseña"
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
									actualizar
								</Button>
							</div>

							<span>{errors.general}</span>

							<p
								className={`error-message${
									error ? "" : " hide"
								}`}
							>
								{error}
							</p>
						</form>
					)}
				</div>
			</div>
		</section>
	);
}
