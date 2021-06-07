import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setAuthorizationHeader, unauthenticateUser, routes } from "../utils";
import { apiError, apiStart, apiSuccess } from "./middlewares";

export const initialState = {
	user: null,
	config: {
		avatarColor: "light",
	},
	error: null,
	isLoading: false,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setLoading: (state) => {
			state.error = null;
			state.isLoading = true;
		},
		cleanErrors: (state) => {
			state.error = null;
			state.isLoading = false;
		},
		setAuthenticated: (state, { payload }) => {
			const {
				token,
				user: { id, username, email, imageUrl, accountType },
			} = payload;
			setAuthorizationHeader(token);
			state.user = { id, username, email, imageUrl, accountType };
			state.isLoading = false;
			state.error = null;
		},
		setUser: (state, { payload }) => {
			const { id, username, email, imageUrl, accountType } = payload;
			state.user = { id, username, email, imageUrl, accountType };
			state.error = null;
		},
		userImageUpdated: (state, { payload }) => {
			state.user.imageUrl = payload.user.imageUrl;
			state.isLoading = false;
			state.error = null;
		},
		setUnauthenticated: (state) => {
			state.user = null;
			state.isLoading = false;
			state.error = null;
		},
		setErrors: (state, { payload }) => {
			state.error = payload.error;
			state.isLoading = false;
		},

		// Config
		setConfig: (state, { payload }) => {
			state.config = payload;
		},
		setAvatarColor: (state, { payload }) => {
			state.config.avatarColor = payload;
			localStorage.setItem("config", JSON.stringify(state.config));
		},
	},
});

const { actions, reducer } = userSlice;

export const {
	setUser,
	setAuthenticated,
	setUnauthenticated,
	userImageUpdated,
	setErrors,
	setLoading,
	cleanErrors,

	setConfig,
	setAvatarColor,
} = actions;

export default reducer;

export const login = (userData) => (dispatch) => {
	return dispatch(
		apiStart({
			url: routes.LOGIN,
			method: "POST",
			data: userData,
			onSuccess: setAuthenticated.type,
			onStart: setLoading.type,
			onError: setErrors.type,
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
			onStart: setLoading.type,
			onError: setErrors.type,
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
			onStart: setLoading.type,
			onError: setErrors.type,
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
	window.location.reload();
};

export const uploadUserImage = (data) => async (dispatch) => {
	try {
		const response = await axios.request({
			url: routes.UPLOAD_USER_IMAGE,
			method: "PUT",
			headers: { "Content-Type": "multipart/form-data" },
			data,
		});

		dispatch({ type: apiSuccess.type, payload: response.data.data });
		dispatch({ type: setAuthenticated.type, payload: response.data.data });
	} catch (error) {
		dispatch(apiError(error.message));
	}
};
