const emailRex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export default function validate(values, fieldRules) {
	const errors = {};

	Object.keys(values).forEach((key) => {
		const value = values[key];
		const rules = fieldRules[key];
		const isInvalidEmail = rules.type === "email" && !emailRex.test(value);
		const isMinLength = rules.min && value.length < rules.min;
		const isMaxLength = rules.max && value.length > rules.max;
		const isNotMatch =
			rules.match &&
			value !== values[rules.match.field] &&
			!errors[rules.match.field];

		if (rules.required) {
			if (value.trim() === "") errors[key] = "Campo requerido.";
			else if (isInvalidEmail) errors[key] = "Ingresa un email válido.";
			else if (isMinLength)
				errors[key] = `Longitud mínima ${rules.min} caracteres.`;
			else if (isMaxLength)
				errors[key] = `Longitud máxima ${rules.max} caracteres.`;
			else if (isNotMatch)
				errors[key] = rules.match.message ?? "Los campos no coinciden.";
		}
	});

	return errors;
}
