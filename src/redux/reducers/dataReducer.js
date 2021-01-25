import moment from "moment";

import {
	GET_PROJECTS,
	SET_PROJECT,
	ADD_PROJECT,
	GET_TASKS,
	SET_TASKS,
	ADD_TASK,
	ARCHIVE_TASK,
} from "../types";

const initialState = {
	projects: [],
	selectedProject: "INBOX",
	tasks: [],
};

let index;

const dataReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_PROJECTS:
			return {
				...state,
				projects: payload,
			};
		case SET_PROJECT:
			return {
				...state,
				selectedProject: payload.selectedProject,
			};
		case ADD_PROJECT:
			return {
				...state,
				projects: [payload, ...state.projects],
			};
		case GET_TASKS:
			return {
				...state,
				tasks: payload,
			};
		case SET_TASKS:
			return {
				...state,
				tasks: payload,
			};
		case ADD_TASK:
			if (
				state.selectedProject === "INBOX" ||
				state.selectedProject === payload.projectId ||
				(state.selectedProject === "TODAY" &&
					payload.date === moment().format("DD/MM/YYYY")) ||
				(state.selectedProject === "NEXT_7" &&
					payload.date < moment().add(7, "days").format("DD-MM-YYYY"))
			) {
				state.tasks = [...state.tasks, payload];
			}
			return {
				...state,
			};
		case ARCHIVE_TASK:
			let taskCopy = state.tasks;

			return {
				...state,
				tasks: taskCopy.filter((task) => task.id !== payload),
			};
		default:
			return state;
	}
};

export default dataReducer;
