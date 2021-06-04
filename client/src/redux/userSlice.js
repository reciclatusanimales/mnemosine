import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { routes } from "../constants";
import { setAuthorizationHeader, unauthenticateUser } from "../utils";
import { apiError, apiStart, apiSuccess } from "./middlewares";

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
				user: { id, username, email, imageUrl, accountType },
			} = payload;
			setAuthorizationHeader(token);
			state.user = { id, username, email, imageUrl, accountType };
		},
		setUser: (state, { payload }) => {
			const { id, username, email, imageUrl, accountType } = payload;
			state.user = { id, username, email, imageUrl, accountType };
		},
		userImageUpdated: (state, { payload }) => {
			state.user.imageUrl = payload.user.imageUrl;
		},
		setUnauthenticated: (state) => {
			state.user = null;
		},
	},
});

const { actions, reducer } = userSlice;

export const {
	setUser,
	setAuthenticated,
	setUnauthenticated,
	userImageUpdated,
} = actions;

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

export const uploadUserImage = (data) => async (dispatch) => {
	try {
		const response = await axios.request({
			url: routes.UPLOAD_USER_IMAGE,
			method: "PUT",
			headers: { "Content-Type": "multipart/form-data" },
			data,
		});

		dispatch(apiSuccess(response.data.data));
		dispatch(userImageUpdated(response.data.data));
	} catch (error) {
		dispatch(apiError(error.message));
	}
};
