import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { combineReducers } from "redux";
import { UIProvider } from "../context";
import dataReducer from "../store/dataSlice";
import userSlice from "../store/userSlice";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { api } from "../store/middlewares";
import { defaultProject } from ".";

const defaultState = {
	user: {
		user: null,
		config: {
			avatarColor: "light",
		},
		success: false,
		error: null,
		isLoading: false,
	},
	data: {
		projects: [],
		selectedProject: defaultProject,
		projectsLoading: false,
		projectLoading: false,
		tasks: [],
		selectedTasks: [],
		selectedTask: null,
		tasksLoading: false,
		taskLoading: false,
		error: null,
	},
};

function createTestStore(preloadedState = {}) {
	const reducer = combineReducers({
		user: userSlice,
		data: dataReducer,
	});

	return configureStore({
		reducer,
		middleware: [...getDefaultMiddleware(), api],
		preloadedState: { ...defaultState, ...preloadedState },
	});
}

export const renderWithAuthProvider = (
	ui,
	{ initialState, ...renderOptions } = {}
) => {
	const store = createTestStore(initialState);
	function Wrapper({ children }) {
		return (
			<Provider store={store}>
				<UIProvider>{children}</UIProvider>
			</Provider>
		);
	}
	return render(ui, {
		wrapper: Wrapper,
		...renderOptions,
	});
};

export const getSendButton = () =>
	screen.getByRole("button", { name: /send/i });

export const fillInputs = ({
	email = "elliot@ecorp.com",
	password = "a1fdfdfsA#",
} = {}) => {
	userEvent.type(screen.getByLabelText(/email/i), email);
	userEvent.type(screen.getByLabelText(/password/i), password);
};

export const goToPath = (path) => window.history.pushState({}, "", path);

export default {
	renderWithAuthProvider,
	goToPath,
	getSendButton,
	fillInputs,
};
