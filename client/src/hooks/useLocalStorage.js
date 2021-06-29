import { useEffect, useRef, useState } from "react";

function useLocalStorage(
	key,
	defaultValue = "",
	{ serialize = JSON.stringify, deserialize = JSON.parse } = {}
) {
	const [value, setValue] = useState(() => {
		const valueInLocalStorage = window.localStorage.getItem(key);
		if (valueInLocalStorage) return deserialize(valueInLocalStorage);
		return typeof defaultValue === "function"
			? defaultValue()
			: defaultValue;
	});

	const prevKeyRef = useRef(key);
	useEffect(() => {
		const prevKey = prevKeyRef.current;
		// If the key changed, remove it from localStorage
		if (prevKey !== key) window.localStorage.removeItem(prevKey);

		window.localStorage.setItem(key, serialize(value));
	}, [value, key, serialize]);

	return [value, setValue];
}

export default useLocalStorage;
