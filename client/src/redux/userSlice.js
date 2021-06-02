import { createSlice } from "@reduxjs/toolkit";
import { routes } from "../constants";
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
			const {
				token,
				user: { id, username, email, imageUrl },
			} = payload;
			setAuthorizationHeader(token);
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
			url: routes.LOGIN,
			method: "POST",
			data: userData,
			onSuccess: setAuthenticated.type,
		})
	);
};

export const loginWithGoogle = (userData) => (dispatch) => {
	return dispatch(
		apiStart({
			url: routes.LOGIN_WITH_GOOGLE,
			method: "POST",
			data: userData,
			onSuccess: setAuthenticated.type,
		})
	);
};

export const register = (userData) => (dispatch) => {
	return dispatch(
		apiStart({
			url: routes.REGISTER,
			method: "POST",
			data: userData,
			onSuccess: setAuthenticated.type,
		})
	);
};

export const logoutUser = () => async (dispatch) => {
	await dispatch(
		apiStart({
			url: routes.LOGOUT,
			onSuccess: setUnauthenticated.type,
		})
	);
	unauthenticateUser();
	window.location.reload();
};
