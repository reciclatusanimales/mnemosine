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

import axios from "axios";

export const getProjects = () => (dispatch) => {
	dispatch({ type: SET_LOADING_PROJECTS, payload: true });
	axios
		.get("/projects")
		.then((response) => {
			dispatch({ type: GET_PROJECTS, payload: response.data });
		})
		.catch((error) => {
			console.error(error);
		});
};

export const setProject = (selectedProject) => (dispatch) => {
	dispatch({ type: SET_PROJECT, payload: selectedProject });
};

export const addProject = (project) => (dispatch) => {
	axios
		.post("/add-project", project)
		.then((response) => {
			dispatch({ type: ADD_PROJECT, payload: response.data });
		})
		.catch((error) => {
			console.error(error);
		});
};

export const updateProject = (project) => (dispatch) => {
	axios
		.post("/update-project", project)
		.then((response) => {
			dispatch({ type: UPDATE_PROJECT, payload: response.data });
		})
		.catch((error) => {
			console.error(error);
		});
};

export const deleteProject = (id) => (dispatch) => {
	axios
		.post("/delete-project", { id })
		.then((response) => {
			dispatch({ type: DELETE_PROJECT, payload: response.data });
		})
		.catch((error) => {
			console.error(error);
		});
};

export const getTasks = () => (dispatch) => {
	dispatch({ type: SET_LOADING_TASKS, payload: true });
	axios
		.get("/tasks")
		.then((response) => {
			dispatch({ type: GET_TASKS, payload: response.data });
		})
		.catch((error) => {
			console.error(error);
		});
};

export const addTask = (task) => (dispatch) => {
	axios
		.post("/add-task", task)
		.then((response) => {
			console.log(response.data);
			dispatch({ type: ADD_TASK, payload: response.data });
		})
		.catch((error) => {
			console.error(error);
		});
};

export const updateTask = (task) => (dispatch) => {
	axios
		.post("/update-task", task)
		.then((response) => {
			dispatch({ type: UPDATE_TASK, payload: response.data });
		})
		.catch((error) => {
			console.error(error);
		});
};

export const archiveTask = (id) => (dispatch) => {
	axios
		.post("/archive-task", { id })
		.then((response) => {
			dispatch({ type: ARCHIVE_TASK, payload: response.data });
		})
		.catch((error) => {
			console.error(error);
		});
};

export const setTask = (selectedTask) => (dispatch) => {
	dispatch({ type: SET_TASK, payload: selectedTask });
};

export const deleteTask = (id) => (dispatch) => {
	axios
		.post("/delete-task", { id })
		.then((response) => {
			dispatch({ type: DELETE_TASK, payload: response.data });
		})
		.catch((error) => {
			console.error(error);
		});
};
