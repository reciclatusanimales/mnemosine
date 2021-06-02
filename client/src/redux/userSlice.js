import { createSlice } from "@reduxjs/toolkit";
import { setAuthorizationHeader, unauthenticateUser } from "../utils";
import { apiStart } from "./middlewares";

export const initialState = {
	user: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setAuthenticated: (state, { payload }) => {
			const { token, id, username, email, imageUrl } = payload;
			setAuthorizationHeader(token);
			localStorage.setItem("token", token);
			state.user = { id, username, email, imageUrl };
		},
		setUser: (state, { payload }) => {
			const { id, username, email, imageUrl } = payload;
			state.user = { id, username, email, imageUrl };
		},
		setUnauthenticated: (state) => {
			state.user = null;
		},
	},
});

const { actions, reducer } = userSlice;

export const { setUser, setAuthenticated, setUnauthenticated } = actions;

export default reducer;

export const login = (userData) => (dispatch) => {
	return dispatch(
		apiStart({
			url: "/login",
			method: "POST",
			data: userData,
			onSuccess: setAuthenticated.type,
		})
	);
};

export const loginWithGoogle = (userData) => (dispatch) => {
	return dispatch(
		apiStart({
			url: "/login-with-google",
			method: "POST",
			data: userData,
			onSuccess: setAuthenticated.type,
		})
	);
};

export const register = (userData) => (dispatch) => {
	return dispatch(
		apiStart({
			url: "/register",
			method: "POST",
			data: userData,
			onSuccess: setAuthenticated.type,
		})
	);
};

export const logoutUser = () => (dispatch) => {
	unauthenticateUser();
	dispatch(setUnauthenticated());
};
