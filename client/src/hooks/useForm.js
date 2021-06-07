import { useCallback, useEffect, useState } from "react";
import validate from "../utils/validate";

const useForm = ({ fields, rules }, callback, clearFn) => {
	const [values, setValues] = useState(fields);

	const [errors, setErrors] = useState({});
	const submitCallback = useCallback(() => {
		callback();
	}, [callback]);

	useEffect(() => {
		setValues(fields);
	}, [fields]);

	const handleChange = (e) => {
		const { name, value } = e.target;

		const errorsCopy = { ...errors };
		delete errorsCopy[name];
		setErrors({ ...errorsCopy });

		setValues({ ...values, [name]: value });

		clearFn && clearFn();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const validation = validate(values, rules);
		setErrors(validation);
		if (Object.keys(validation).length === 0) submitCallback();
	};

	return { values, errors, setErrors, handleChange, handleSubmit };
};

export default useForm;
