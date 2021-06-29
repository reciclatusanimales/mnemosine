import axios from "axios";

export const setAuthorizationHeader = (token) => {
	const headerToken = `Bearer ${token}`;
	localStorage.setItem("token", token);
	axios.defaults.headers.common["Authorization"] = headerToken;
	return;
};

export const unauthenticateUser = () => {
	localStorage.removeItem("token");
	delete axios.defaults.headers.common["Authorization"];
	return;
};
