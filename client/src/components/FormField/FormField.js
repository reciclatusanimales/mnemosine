function FormField({
	name,
	label,
	placeholder = "",
	type = "text",
	value,
	error,
	onChange,
	style,
}) {
	return (
		<>
			<label className={`${error ? "error" : ""}`} htmlFor={name}>
				{error ?? label ?? name}
			</label>
			<input
				type={type}
				name={name}
				id={name}
				className={`${error ? "input-error" : ""}`}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				{...style}
			/>
		</>
	);
}

export default FormField;
