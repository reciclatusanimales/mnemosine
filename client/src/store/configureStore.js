import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { api } from "./middlewares";
import dataReducer from "./dataSlice";
import userSlice from "./userSlice";

const reducer = combineReducers({
	user: userSlice,
	data: dataReducer,
});

export default configureStore({
	reducer,
	middleware: [...getDefaultMiddleware(), api],
});
