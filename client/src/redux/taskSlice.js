import { createSlice } from "@reduxjs/toolkit";
import { setProject } from "./projectSlice";
import { getProjectTasks } from "../utils";
import { apiStart } from "./middlewares";

const initialState = {
	list: [],
	selectedList: [],
	selected: null,
	loading: false,
};

const taskSlice = createSlice({
	name: "task",
	initialState,
	reducers: {
		setLoading: (state) => {
			state.loading = true;
		},
		tasksReceived: (state, { payload }) => {
			state.list = payload;
			state.selectedList = payload;
			state.selected = null;
			state.loading = false;
		},
		setTask: (state, { payload }) => {
			state.selected = payload;
		},
		taskAdded: (state, { payload }) => {
			state.list.push(payload);
			state.selectedList.push(payload);
		},
		taskUpdated: (state, { payload }) => {
			let index = state.selectedList.findIndex(
				(task) => task.id === payload.id
			);
			state.selectedList[index] = payload;
			index = state.list.findIndex((task) => task.id === payload.id);
			state.list[index] = payload;
			state.selected = null;
		},
		taskArchived: (state, { payload }) => {
			state.list = state.list.filter((task) => task.id !== payload);
			state.selectedList = state.selectedList.filter(
				(task) => task.id !== payload
			);
		},
		taskDeleted: (state, { payload }) => {
			state.selected = null;
			state.list = state.list.filter((task) => task.id !== payload);
			state.selectedList = state.selectedList.filter(
				(task) => task.id !== payload
			);
		},
	},
	extraReducers: {
		[setProject]: (state, { payload }) => {
			state.selectedList = getProjectTasks(payload, state.list);
		},
	},
});

export const {
	setLoading,
	tasksReceived,
	setTask,
	taskAdded,
	taskUpdated,
	taskArchived,
	taskDeleted,
} = taskSlice.actions;

export default taskSlice.reducer;

const url = "/tasks";

export const loadTasks = () => (dispatch) => {
	return dispatch(
		apiStart({
			url,
			onStart: setLoading.type,
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
			onStart: setLoading.type,
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
			onStart: setLoading.type,
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
			onStart: setLoading.type,
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
			onStart: setLoading.type,
			onSuccess: taskDeleted.type,
		})
	);
};
