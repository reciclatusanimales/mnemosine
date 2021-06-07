import "./form-field.scss";

function FormField({
	name,
	label,
	placeholder = "",
	type = "text",
	value,
	error,
	onChange,
	children,
	style,
}) {
	function getInput() {
		if (type === "select") {
			return (
				<select
					onChange={onChange}
					className={`form-field${error ? " input-error" : ""}`}
					value={value}
					name={name}
					id={name}
				>
					{children}
				</select>
			);
		}
		return (
			<input
				type={type}
				name={name}
				id={name}
				className={`form-field${error ? " input-error" : ""}`}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				{...style}
			/>
		);
	}

	return (
		<>
			{label && (
				<label className={`${error ? "error" : ""}`} htmlFor={name}>
					{error ?? label}
				</label>
			)}
			{getInput()}
		</>
	);
}

export default FormField;
