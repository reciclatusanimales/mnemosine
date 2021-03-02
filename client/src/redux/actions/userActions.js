import { SET_USER, SET_UNAUTHENTICATED } from "../types";

import axios from "axios";

export const login = (userData) => (dispatch) => {
	return axios
		.post("/login", userData)
		.then((res) => {
			console.log(res);
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
