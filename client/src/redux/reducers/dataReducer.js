import {
	GET_PROJECTS,
	SET_PROJECT,
	ADD_PROJECT,
	UPDATE_PROJECT,
	DELETE_PROJECT,
	GET_TASKS,
	ADD_TASK,
	ARCHIVE_TASK,
	UPDATE_TASK,
	SET_TASK,
	DELETE_TASK,
	SET_LOADING_PROJECTS,
	SET_LOADING_TASKS,
} from "../types";
import moment from "moment";
import { defaultProjects } from "../../constants";

const initialState = {
	projects: [],
	selectedProject: defaultProjects[0],
	tasks: [],
	selectedTasks: [],
	selectedTask: null,
	isProjectsLoading: false,
	isTasksLoading: false,
};

let index, projectsCopy, tasksCopy, selectedTasksCopy;

const getProjectTasks = (project, tasks) => {
	switch (project.id) {
		case "all":
			return tasks;
		case "today":
			return tasks.filter(
				(task) => task.date === moment().format("DD/MM/YYYY")
			);
		case "next_7":
			return tasks.filter(
				(task) =>
					moment(task.date, "DD/MM/YYYY").diff(moment(), "days") <= 7
			);
		default:
			return tasks.filter((task) => task.projectId === project.id);
	}
};

const dataReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_LOADING_PROJECTS:
			return {
				...state,
				isProjectsLoading: payload,
			};
		case GET_PROJECTS:
			return {
				...state,
				projects: payload,
				isProjectsLoading: false,
			};
		case SET_PROJECT:
			return {
				...state,
				selectedProject: payload,
				selectedTasks: getProjectTasks(payload, state.tasks),
				selectedTask: null,
			};
		case ADD_PROJECT:
			return {
				...state,
				projects: [...state.projects, payload],
			};
		case UPDATE_PROJECT:
			projectsCopy = state.projects;
			index = state.projects.findIndex(
				(project) => project.id === payload.id
			);
			projectsCopy[index] = payload;
			return {
				...state,
				projects: projectsCopy,
				selectedProject: payload,
			};
		case DELETE_PROJECT:
			return {
				...state,
				selectedProject: null,
				projects: state.projects.filter(
					(project) => project.id !== payload
				),
			};
		case SET_LOADING_TASKS:
			return {
				...state,
				isTasksLoading: payload,
			};
		case GET_TASKS:
			return {
				...state,
				tasks: payload,
				selectedTasks: payload,
				selectedTask: null,
				isTasksLoading: false,
			};
		case ADD_TASK:
			if (
				state.selectedProject &&
				state.selectedProject.id === payload.projectId
			) {
				tasksCopy = [...state.selectedTasks, payload];
			} else {
				tasksCopy = [...state.tasks, payload];
			}
			return {
				...state,
				tasks: [...state.tasks, payload],
				selectedTasks: tasksCopy,
			};
		case UPDATE_TASK:
			tasksCopy = state.tasks;
			index = state.tasks.findIndex((task) => task.id === payload.id);
			tasksCopy[index] = payload;
			selectedTasksCopy = state.selectedTasks;
			index = state.selectedTasks.findIndex(
				(task) => task.id === payload.id
			);
			selectedTasksCopy[index] = payload;
			return {
				...state,
				tasks: tasksCopy,
				selectedTasks: selectedTasksCopy,
				selectedTask: null,
			};
		case ARCHIVE_TASK:
			return {
				...state,
				tasks: state.tasks.filter((task) => task.id !== payload),
				selectedTasks: state.selectedTasks.filter(
					(task) => task.id !== payload
				),
			};
		case SET_TASK:
			index = state.tasks.findIndex((task) => task.id === payload);
			return {
				...state,
				selectedTask: state.tasks[index],
			};
		case DELETE_TASK:
			return {
				...state,
				selectedTask: null,
				tasks: state.tasks.filter((task) => task.id !== payload),
				selectedTasks: state.selectedTasks.filter(
					(task) => task.id !== payload
				),
			};
		default:
			return state;
	}
};

export default dataReducer;
