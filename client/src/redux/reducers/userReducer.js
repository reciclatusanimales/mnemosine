import { SET_USER, SET_UNAUTHENTICATED } from "../types";

const initialState = {
	user: null,
};

const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_USER:
			const { id, username, email, imageUrl } = payload;
			return {
				...state,
				user: {
					id,
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
