import {
	GET_PROJECTS,
	SET_PROJECT,
	ADD_PROJECT,
	UPDATE_PROJECT,
	DELETE_PROJECT,
	SET_SHOW_EDIT_PROJECT,
	GET_TASKS,
	ADD_TASK,
	ARCHIVE_TASK,
	UPDATE_TASK,
	SET_TASK,
	DELETE_TASK,
} from "../types";

import axios from "axios";

export const getProjects = () => (dispatch) => {
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

export const setShowEditProject = (show) => (dispatch) => {
	dispatch({ type: SET_SHOW_EDIT_PROJECT, payload: show });
};

export const getTasks = () => (dispatch) => {
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
