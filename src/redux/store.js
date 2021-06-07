import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import dataReducer from "./reducers/dataReducer";

const initialState = {};

const middleware = [thunk];
const isDevelopment = process.env.NODE_ENV === "development";

const reducers = combineReducers({
	data: dataReducer,
});

const store = createStore(
	reducers,
	initialState,
	compose(
		applyMiddleware(...middleware),
		isDevelopment &&
			typeof window === "object" &&
			typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
			? window.__REDUX_DEVTOOLS_EXTENSION__()
			: (f) => f
	)
);

export default store;
