import { SET_USER, SET_UNAUTHENTICATED } from "../types";
import axios from "axios";

const setAuthorizationHeader = (token) => {
	const headerToken = `Bearer ${token}`;
	localStorage.setItem("token", headerToken);
	axios.defaults.headers.common["Authorization"] = headerToken;
};

export const login = (userData) => (dispatch) => {
	return axios
		.post("/login", userData)
		.then((res) => {
			setAuthorizationHeader(res.data.token);
			console.log(res);
			localStorage.setItem("token", res.data.token);
			dispatch({ type: SET_USER, payload: res.data });
			return res.data;
		})
		.catch((err) => {
			return Promise.reject(err.response.data);
		});
};

export const loginWithGoogle = (userData) => (dispatch) => {
	return axios
		.post("/login-with-google", userData)
		.then((res) => {
			console.log(res);
			setAuthorizationHeader(res.data.token);
			localStorage.setItem("token", res.data.token);
			dispatch({ type: SET_USER, payload: res.data });
			return res.data;
		})
		.catch((err) => {
			return Promise.reject(err.response.data);
		});
};

export const register = (userData) => (dispatch) => {
	return axios
		.post("/register", userData)
		.then((res) => {
			console.log(res);
			setAuthorizationHeader(res.data.token);
			localStorage.setItem("token", res.data.token);
			dispatch({ type: SET_USER, payload: res.data });
			return res.data;
		})
		.catch((err) => {
			return Promise.reject(err.response.data);
		});
};

export const logoutUser = () => (dispatch) => {
	localStorage.removeItem("token");
	delete axios.defaults.headers.common["Authorization"];
	dispatch({ type: SET_UNAUTHENTICATED });
};
