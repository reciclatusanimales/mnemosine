import {
	GET_PROJECTS,
	SET_PROJECT,
	ADD_PROJECT,
	GET_TASKS,
	SET_TASKS,
	ADD_TASK,
	ARCHIVE_TASK,
} from "../types";
import moment from "moment";
import { db } from "../../firebase";
import { collatedTasksExists } from "../../helpers";

export const getTasks = (selectedProject = "INBOX") => (dispatch) => {
	console.log(selectedProject);
	let query = db
		.collection("tasks")
		.where("userId", "==", "X3TRhs7iUQliklfvhIpd")
		.where("archived", "==", false);
	if (selectedProject === "TODAY") {
		query = query.where("date", "==", moment().format("DD-MM-YYYY"));
	} else if (selectedProject === "NEXT_7") {
		const date = moment().add(7, "days").format("DD-MM-YYYY");
		query = query.where("date", "<", date).orderBy("date");
	} else {
		query = query.where("projectId", "==", selectedProject);
	}

	query
		.orderBy("name")
		.get()
		.then((snapshot) => {
			const newTasks = snapshot.docs.map((task) => ({
				id: task.id,
				...task.data(),
			}));
			dispatch({ type: GET_TASKS, payload: newTasks });
		})
		.catch((error) => {
			console.error(error);
		});
};

export const getProjects = () => (dispatch) => {
	let projects = [];
	db.collection("projects")
		.where("userId", "==", "X3TRhs7iUQliklfvhIpd")
		.get()
		.then((data) => {
			data.forEach((doc) => {
				projects.push({
					...doc.data(),
					projectId: doc.id,
				});
			});
			dispatch({ type: GET_PROJECTS, payload: projects });
		});
};

export const setProject = (selectedProject) => (dispatch) => {
	dispatch({ type: SET_PROJECT, payload: { selectedProject } });
	dispatch(getTasks(selectedProject));
};

export const addProject = (project) => (dispatch) => {
	project.userId = "X3TRhs7iUQliklfvhIpd";
	db.collection("projects")
		.add(project)
		.then((doc) => {
			const newProject = {
				...project,
				projectId: doc.id,
			};
			dispatch({ type: ADD_PROJECT, payload: newProject });
		});
};

export const addTask = ({ task, selectedProject }) => (dispatch) => {
	task.archived = false;
	task.userId = "X3TRhs7iUQliklfvhIpd";
	db.collection("tasks")
		.add(task)
		.then((doc) => {
			const newTask = {
				...task,
				id: doc.id,
			};
			console.log(doc);
			dispatch({ type: ADD_TASK, payload: newTask });
		});
};

export const archiveTask = (id) => (dispatch) => {
	db.collection("tasks").doc(id).update({
		archived: true,
	});

	dispatch({ type: ARCHIVE_TASK, payload: id });
};
