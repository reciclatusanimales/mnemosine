import { useState, useEffect } from "react";
import moment from "moment";
import { db } from "../firebase";
import { collatedTasksExists } from "../helpers";

export const useTasks = (selectedProject) => {
	console.log(selectedProject);
	const [tasks, setTasks] = useState([]);
	const [archivedTasks, setArchivedTasks] = useState([]);

	// useEffect(() => {
	// 	console.log("OKOKOO");
	// 	let query = db
	// 		.collection("tasks")
	// 		.where("userId", "==", "X3TRhs7iUQliklfvhIpd");

	// 	if (selectedProject && !collatedTasksExists(selectedProject)) {
	// 		query = query.where("projectId", "==", selectedProject);
	// 	} else if (selectedProject === "TODAY") {
	// 		query = query.where("date", "==", moment().format("DD/MM/YYYY"));
	// 	} else if (selectedProject === "INBOX" || selectedProject === 0) {
	// 		query = query.where("date", "==", "");
	// 	}

	// 	query =
	// 		selectedProject && !collatedTasksExists(selectedProject)
	// 			? (query = query.where("projectId", "==", selectedProject))
	// 			: selectedProject === "TODAY"
	// 			? (query = query.where(
	// 					"date",
	// 					"==",
	// 					moment().format("DD/MM/YYYY")
	// 			  ))
	// 			: selectedProject === "INBOX" || selectedProject === 0
	// 			? (query = query.where("date", "==", ""))
	// 			: query;

	// 	query.get().then((snapshot) => {
	// 		const newTasks = snapshot.docs.map((task) => ({
	// 			id: task.id,
	// 			...task.data(),
	// 		}));
	// 		let taskToAdd;
	// 		if (selectedProject === "NEXT_7") {
	// 			taskToAdd = newTasks.filter(
	// 				(task) =>
	// 					moment(task.date, "DD-MM-YYYY").diff(
	// 						moment(),
	// 						"days"
	// 					) <= 7 && task.archived !== true
	// 			);
	// 		} else {
	// 			taskToAdd = newTasks.filter((task) => task.archived !== true);
	// 		}
	// 		setTasks(taskToAdd);

	// 		setArchivedTasks(newTasks.filter((task) => !!task.archived));
	// 	});

	// unsubscribe = unsubscribe.onSnapshot((snapshot) => {
	// 	const newTasks = snapshot.docs.map((task) => ({
	// 		id: task.id,
	// 		...task.data(),
	// 	}));

	// let unsubscribe = firebase
	// 	.firestore()
	// 	.collection("tasks")
	// 	.where("userId", "==", "X3TRhs7iUQliklfvhIpd");
	// if (selectedProject && !collatedTasksExists(selectedProject)) {
	// 	unsubscribe = unsubscribe.where("projectId", "==", selectedProject);
	// } else if (selectedProject === "TODAY") {
	// 	unsubscribe = unsubscribe.where(
	// 		"date",
	// 		"==",
	// 		moment().format("DD/MM/YYYY")
	// 	);
	// } else if (selectedProject === "INBOX" || selectedProject === 0) {
	// 	unsubscribe = unsubscribe.where("date", "==", "");
	// }
	// unsubscribe =
	// 	selectedProject && !collatedTasksExists(selectedProject)
	// 		? (unsubscribe = unsubscribe.where(
	// 				"projectId",
	// 				"==",
	// 				selectedProject
	// 		  ))
	// 		: selectedProject === "TODAY"
	// 		? (unsubscribe = unsubscribe.where(
	// 				"date",
	// 				"==",
	// 				moment().format("DD/MM/YYYY")
	// 		  ))
	// 		: selectedProject === "INBOX" || selectedProject === 0
	// 		? (unsubscribe = unsubscribe.where("date", "==", ""))
	// 		: unsubscribe;
	// unsubscribe = unsubscribe.onSnapshot((snapshot) => {
	// 	const newTasks = snapshot.docs.map((task) => ({
	// 		id: task.id,
	// 		...task.data(),
	// 	}));
	// 	let taskToAdd;
	// 	if (selectedProject === "NEXT_7") {
	// 		taskToAdd = newTasks.filter(
	// 			(task) =>
	// 				moment(task.date, "DD-MM-YYYY").diff(
	// 					moment(),
	// 					"days"
	// 				) <= 7 && task.archived !== true
	// 		);
	// 	} else {
	// 		taskToAdd = newTasks.filter((task) => task.archived !== true);
	// 	}
	// 	setTasks(taskToAdd);
	// 	// setTasks(
	// 	// 	selectedProject === "NEXT_7"
	// 	// 		? newTasks.filter(
	// 	// 				(task) =>
	// 	// 					moment(task.date, "DD-MM-YYYY").diff(
	// 	// 						moment(),
	// 	// 						"days"
	// 	// 					) <= 7 && task.archived !== true
	// 	// 		  )
	// 	// 		: newTasks.filter((task) => task.archived !== true)
	// 	// );
	// 	setArchivedTasks(newTasks.filter((task) => !!task.archived));
	// });
	// return () => unsubscribe();
	// }, [selectedProject]);

	return { tasks, archivedTasks };
};

export const useProjects = () => {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		db.collection("projects")
			.where("userId", "==", "X3TRhs7iUQliklfvhIpd")
			.orderBy("projectId")
			.get()
			.then((snapshot) => {
				const allProjects = snapshot.docs.map((project) => ({
					...project.data(),
					docId: project.id,
				}));

				if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
					setProjects(allProjects);
				}
			});
	}, [projects]);

	return { projects, setProjects };
};
