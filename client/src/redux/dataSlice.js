import { createSlice } from "@reduxjs/toolkit";
import { defaultProject } from "../constants";
import { getProjectTasks } from "../utils";
import { apiStart } from "./middlewares";

const initialState = {
	projects: [],
	selectedProject: defaultProject,
	projectsLoading: false,
	tasks: [],
	selectedTasks: [],
	selectedTask: null,
	tasksLoading: false,
};

const dataSlice = createSlice({
	name: "data",
	initialState,
	reducers: {
		// Projects
		setProjectLoading: (state) => {
			state.projectsLoading = true;
		},
		projectsReceived: (state, { payload }) => {
			state.projects = payload;
			state.projectsLoading = false;
		},
		setProject: (state, { payload }) => {
			state.selectedProject = payload;
			state.selectedTasks = getProjectTasks(payload, state.tasks);
			state.selectedTask = null;
		},
		projectAdded: (state, { payload }) => {
			state.projects.push(payload);
			state.selectedProject = payload;
			state.projectsLoading = false;
			state.selectedTasks = [];
			state.selectedTask = null;
		},
		projectUpdated: (state, { payload }) => {
			const index = state.projects.findIndex(
				(project) => project.id === payload.id
			);
			state.projects[index] = payload;
			state.selectedProject = payload;
		},
		projectDeleted: (state, { payload }) => {
			state.selectedProject = defaultProject;
			state.projects = state.projects.filter(
				(project) => project.id !== payload
			);
			state.tasks = state.selectedTasks.filter(
				(task) => task.projectId !== payload
			);
			state.selectedTasks = state.selectedTasks.filter(
				(task) => task.projectId !== payload
			);
			state.selectedTask = null;
		},

		// Tasks

		setTaskLoading: (state) => {
			state.tasksLoading = true;
		},
		tasksReceived: (state, { payload }) => {
			state.tasks = payload;
			state.selectedTasks = payload;
			state.selectedTask = null;
			state.tasksLoading = false;
		},
		setTask: (state, { payload }) => {
			state.selectedTask = payload;
		},
		taskAdded: (state, { payload }) => {
			state.tasks.push(payload);
			if (state.selectedProject?.id === payload.projectId) {
				state.selectedTasks.push(payload);
			} else {
				state.selectedTasks = [...state.tasks];
			}
		},
		taskUpdated: (state, { payload }) => {
			let index = state.selectedTasks.findIndex(
				(task) => task.id === payload.id
			);
			state.selectedTasks[index] = payload;
			index = state.tasks.findIndex((task) => task.id === payload.id);
			state.tasks[index] = payload;
			state.selectedTask = null;
		},
		taskArchived: (state, { payload }) => {
			state.tasks = state.tasks.filter((task) => task.id !== payload);
			state.selectedTasks = state.selectedTasks.filter(
				(task) => task.id !== payload
			);
		},
		taskDeleted: (state, { payload }) => {
			state.selectedTask = null;
			state.tasks = state.tasks.filter((task) => task.id !== payload);
			state.selectedTasks = state.selectedTasks.filter(
				(task) => task.id !== payload
			);
		},
	},
});

export const {
	setProjectLoading,
	projectsReceived,
	setProject,
	projectAdded,
	projectUpdated,
	projectDeleted,

	setTaskLoading,
	tasksReceived,
	setTask,
	taskAdded,
	taskUpdated,
	taskArchived,
	taskDeleted,
} = dataSlice.actions;

export default dataSlice.reducer;

const projectsURL = "/projects";

// PROJECTS

export const loadProjects = () => (dispatch) => {
	return dispatch(
		apiStart({
			url: projectsURL,
			onStart: setProjectLoading.type,
			onSuccess: projectsReceived.type,
		})
	);
};

export const addProject = (data) => (dispatch) => {
	return dispatch(
		apiStart({
			url: "/add-project",
			method: "POST",
			data,
			onStart: setProjectLoading.type,
			onSuccess: projectAdded.type,
		})
	);
};

export const updateProject = (data) => (dispatch) => {
	return dispatch(
		apiStart({
			url: "update-project",
			method: "POST",
			data,
			onStart: setProjectLoading.type,
			onSuccess: projectUpdated.type,
		})
	);
};

export const deleteProject = (id) => (dispatch) => {
	return dispatch(
		apiStart({
			url: "/delete-project",
			method: "POST",
			data: { id },
			onStart: setProjectLoading.type,
			onSuccess: projectDeleted.type,
		})
	);
};

// TASKS

const tasksURL = "/tasks";

export const loadTasks = () => (dispatch) => {
	return dispatch(
		apiStart({
			url: tasksURL,
			onStart: setTaskLoading.type,
			onSuccess: tasksReceived.type,
		})
	);
};

export const addTask = (data) => (dispatch) => {
	return dispatch(
		apiStart({
			url: "/add-task",
			method: "POST",
			data,
			onStart: setTaskLoading.type,
			onSuccess: taskAdded.type,
		})
	);
};

export const updateTask = (data) => (dispatch) => {
	return dispatch(
		apiStart({
			url: "/update-task",
			method: "POST",
			data,
			onStart: setTaskLoading.type,
			onSuccess: taskUpdated.type,
		})
	);
};

export const archiveTask = (id) => (dispatch) => {
	return dispatch(
		apiStart({
			url: "/archive-task",
			method: "POST",
			data: { id },
			onStart: setTaskLoading.type,
			onSuccess: taskArchived.type,
		})
	);
};

export const deleteTask = (id) => (dispatch) => {
	return dispatch(
		apiStart({
			url: "/delete-task",
			method: "POST",
			data: { id },
			onStart: setTaskLoading.type,
			onSuccess: taskDeleted.type,
		})
	);
};
