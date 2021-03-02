import { SET_USER, SET_UNAUTHENTICATED } from "../types";

const initialState = {
	user: null,
};

const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_USER:
			const { username, email, imageUrl } = payload;
			return {
				...state,
				user: {
					username,
					email,
					imageUrl,
				},
			};

		case SET_UNAUTHENTICATED:
			return initialState;
		default:
			return state;
	}
};

export default userReducer;
