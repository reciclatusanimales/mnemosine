import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, cleanErrors } from "../../store/userSlice";
import useForm from "../../hooks/useForm";
import FormField from "../../components/FormField";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const fields = {
	email: "",
};

const rules = {
	email: { type: "email", required: true },
};

export default function ForgotPassword() {
	const dispatch = useDispatch();
	const { error, success, isLoading } = useSelector((state) => state.user);
	const [submitted, setSubmitted] = useState(false);

	const handleForgotPassword = async () => {
		await dispatch(forgotPassword(values));
	};

	const handleCleanErrors = () => {
		if (error) dispatch(cleanErrors());
	};

	const { handleChange, handleSubmit, values, errors } = useForm(
		{ fields, rules },
		handleForgotPassword,
		handleCleanErrors
	);

	useEffect(() => {
		if (success) return setSubmitted(true);
	}, [success]);

	useEffect(() => {
		dispatch(cleanErrors());
	}, [dispatch]);

	return (
		<section className="ForgotPassword">
			<div className="ForgotPassword__content">
				<h1>Recuperar Contraseña</h1>

				<div className="ForgotPassword__container">
					{submitted ? (
						<div className="info">
							<h3>¡Te hemos enviado un enlace seguro!</h3>
							<p>
								Revisa el correo electrónico{" "}
								<b>{values.email}</b> y sigue las instrucciones
								para crear una nueva contraseña.
							</p>
						</div>
					) : (
						<form onSubmit={handleSubmit} noValidate>
							<FormField
								error={errors.email}
								label="Email"
								name="email"
								onChange={handleChange}
								placeholder="Tu correo"
								type="email"
								value={values.email}
							/>

							<div>
								<Button type="submit" isLoading={isLoading}>
									entrar
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

					{!submitted && (
						<div className="ForgotPassword__options">
							<Link to="/login">Login</Link>
							<Link to="/register">Registrarse</Link>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
