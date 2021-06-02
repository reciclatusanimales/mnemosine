import { createAction } from "@reduxjs/toolkit";
import axios from "axios";

export const apiStart = createAction("api/start");
export const apiSuccess = createAction("api/success");
export const apiError = createAction("api/error");

export const api =
	({ dispatch }) =>
	(next) =>
	async (action) => {
		if (action.type !== apiStart.type) return next(action);

		const { url, method, data, onStart, onSuccess, onError } =
			action.payload;

		if (onStart) dispatch({ type: onStart });

		next(action);

		try {
			const response = await axios.request({ url, method, data });
			dispatch(apiSuccess(response.data.data));

			if (onSuccess)
				dispatch({ type: onSuccess, payload: response.data.data });
		} catch (error) {
			dispatch(apiError(error.message));

			if (onError) dispatch({ type: onError, payload: error.message });
		}
	};
