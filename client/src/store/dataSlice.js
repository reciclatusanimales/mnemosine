import { createSlice } from "@reduxjs/toolkit";
import { arraySort, getProjectTasks, defaultProject, routes } from "../utils";
import { apiStart } from "./middlewares";

const initialState = {
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
};

const dataSlice = createSlice({
	name: "data",
	initialState,
	reducers: {
		// Projects

		setProjectsLoading: (state) => {
			state.error = null;
			state.projectsLoading = true;
		},

		setProjectLoading: (state) => {
			state.projectLoading = true;
			state.error = null;
		},
		projectsReceived: (state, { payload }) => {
			state.projects = arraySort(payload, "name");
			state.projectsLoading = false;
			state.error = null;
		},
		setProject: (state, { payload }) => {
			state.selectedProject = payload;
			state.selectedTasks = getProjectTasks(payload, state.tasks);
			state.selectedTask = null;
			state.error = null;
		},
		projectAdded: (state, { payload }) => {
			state.projects = arraySort([...state.projects, payload], "name");
			state.selectedProject = payload;
			state.selectedTasks = [];
			state.selectedTask = null;
			state.projectLoading = false;
			state.error = null;
		},
		projectUpdated: (state, { payload }) => {
			const index = state.projects.findIndex(
				(project) => project.id === payload.id
			);
			state.projects[index] = payload;
			arraySort(state.projects, "name");
			state.selectedProject = payload;
			state.projectLoading = false;
			state.error = null;
		},
		projectDeleted: (state, { payload }) => {
			state.selectedProject = defaultProject;
			state.projects = state.projects.filter(
				(project) => project.id !== payload
			);
			state.tasks = state.tasks.filter(
				(task) => task.projectId !== payload
			);
			state.selectedTasks = state.tasks.filter(
				(task) => task.projectId !== payload
			);
			state.selectedTask = null;
			state.projectLoading = false;
			state.error = null;
		},

		// Tasks

		setTasksLoading: (state) => {
			state.tasksLoading = true;
			state.error = null;
		},
		setTaskLoading: (state) => {
			state.taskLoading = true;
			state.error = null;
		},
		tasksReceived: (state, { payload }) => {
			arraySort(payload, "name");
			state.tasks = payload;
			state.selectedTasks = payload;
			state.selectedTask = null;
			state.tasksLoading = false;
			state.error = null;
		},
		setTask: (state, { payload }) => {
			state.selectedTask = payload;
		},
		taskAdded: (state, { payload }) => {
			state.tasks = arraySort([...state.tasks, payload], "name");
			if (state.selectedProject?.id === payload.projectId) {
				state.selectedTasks = arraySort(
					[...state.selectedTasks, payload],
					"name"
				);
			} else {
				state.selectedTasks = [...state.tasks];
			}
			state.taskLoading = false;
			state.error = null;
		},
		taskUpdated: (state, { payload }) => {
			let index = state.selectedTasks.findIndex(
				(task) => task.id === payload.id
			);
			state.selectedTasks[index] = payload;
			index = state.tasks.findIndex((task) => task.id === payload.id);
			state.tasks[index] = payload;
			arraySort(state.selectedTasks, "name");
			arraySort(state.tasks, "name");
			state.selectedTask = null;
			state.taskLoading = false;
			state.error = null;
		},
		taskArchived: (state, { payload }) => {
			state.tasks = state.tasks.filter((task) => task.id !== payload.id);
			state.selectedTasks = state.selectedTasks.filter(
				(task) => task.id !== payload.id
			);
			state.taskLoading = false;
			state.error = null;
		},
		taskDeleted: (state, { payload }) => {
			state.selectedTask = null;
			state.tasks = state.tasks.filter((task) => task.id !== payload);
			state.selectedTasks = state.selectedTasks.filter(
				(task) => task.id !== payload
			);
			state.taskLoading = false;
			state.error = null;
		},

		// Error
		cleanErrors: (state) => {
			state.error = null;
			state.projectsLoading = false;
			state.projectLoading = false;
			state.tasksLoading = false;
			state.taskLoading = false;
		},
	},
});

export const {
	setProjectsLoading,
	setProjectLoading,
	projectsReceived,
	setProject,
	projectAdded,
	projectUpdated,
	projectDeleted,

	setTasksLoading,
	setTaskLoading,
	tasksReceived,
	setTask,
	taskAdded,
	taskUpdated,
	taskArchived,
	taskDeleted,

	cleanErrors,
} = dataSlice.actions;

export default dataSlice.reducer;

// PROJECTS

export const loadProjects = () => (dispatch) => {
	return dispatch(
		apiStart({
			url: routes.PROJECTS,
			onStart: setProjectsLoading.type,
			onSuccess: projectsReceived.type,
		})
	);
};

export const addProject = (data) => (dispatch) => {
	return dispatch(
		apiStart({
			url: routes.PROJECTS,
			method: "POST",
			data,
			onStart: setProjectLoading.type,
			onSuccess: projectAdded.type,
		})
	);
};

export const updateProject =
	({ id, data }) =>
	(dispatch) => {
		return dispatch(
			apiStart({
				url: `${routes.PROJECTS}/${id}`,
				method: "PUT",
				data,
				onStart: setProjectLoading.type,
				onSuccess: projectUpdated.type,
			})
		);
	};

export const deleteProject = (id) => (dispatch) => {
	return dispatch(
		apiStart({
			url: `${routes.PROJECTS}/${id}`,
			method: "DELETE",
			data: { id },
			onStart: setProjectLoading.type,
			onSuccess: projectDeleted.type,
		})
	);
};

// TASKS

export const loadTasks = () => (dispatch) => {
	return dispatch(
		apiStart({
			url: routes.TASKS,
			onStart: setTasksLoading.type,
			onSuccess: tasksReceived.type,
		})
	);
};

export const addTask =
	({ projectId, data }) =>
	(dispatch) => {
		return dispatch(
			apiStart({
				url: `${routes.PROJECTS}/${projectId}/${routes.TASKS}`,
				method: "POST",
				data,
				onStart: setTaskLoading.type,
				onSuccess: taskAdded.type,
			})
		);
	};

export const updateTask =
	({ id, data }) =>
	(dispatch) => {
		return dispatch(
			apiStart({
				url: `${routes.TASKS}/${id}`,
				method: "PUT",
				data,
				onStart: setTaskLoading.type,
				onSuccess: taskUpdated.type,
			})
		);
	};

export const archiveTask = (id) => (dispatch) => {
	return dispatch(
		apiStart({
			url: `${routes.TASKS}/${id}/archive`,
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
			url: `${routes.TASKS}/${id}`,
			method: "DELETE",
			data: { id },
			onStart: setTaskLoading.type,
			onSuccess: taskDeleted.type,
		})
	);
};
