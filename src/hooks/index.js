import { useState, useEffect } from "react";
import moment from "moment";
import { firebase } from "../firebase";
import { collatedTasksExists } from "../helpers";

export const useTasks = (selectedProject) => {
	const [tasks, setTasks] = useState([]);
	const [archivedTasks, setArchivedTasks] = useState([]);

	useEffect(() => {
		let unsubscribe = firebase
			.firestore()
			.collection("tasks")
			.where("userId", "==", "nluAjrw1PLLTYAtn");

		if (selectedProject && !collatedTasksExists(selectedProject)) {
			unsubscribe = unsubscribe.where("projectId", "==", selectedProject);
		} else if (selectedProject === "TODAY") {
			unsubscribe = unsubscribe.where(
				"date",
				"==",
				moment().format("DD/MM/YYYY")
			);
		} else if (selectedProject === "INBOX" || selectedProject === 0) {
			unsubscribe = unsubscribe.where("date", "==", "");
		}
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

		unsubscribe = unsubscribe.onSnapshot((snapshot) => {
			const newTasks = snapshot.docs.map((task) => ({
				id: task.id,
				...task.data(),
			}));
			let taskToAdd;

			if (selectedProject === "NEXT_7") {
				taskToAdd = newTasks.filter(
					(task) =>
						moment(task.date, "DD-MM-YYYY").diff(
							moment(),
							"days"
						) <= 7 && task.archived !== true
				);
			} else {
				taskToAdd = newTasks.filter((task) => task.archived !== true);
			}
			setTasks(taskToAdd);

			// setTasks(
			// 	selectedProject === "NEXT_7"
			// 		? newTasks.filter(
			// 				(task) =>
			// 					moment(task.date, "DD-MM-YYYY").diff(
			// 						moment(),
			// 						"days"
			// 					) <= 7 && task.archived !== true
			// 		  )
			// 		: newTasks.filter((task) => task.archived !== true)
			// );
			setArchivedTasks(newTasks.filter((task) => !!task.archived));
		});

		return () => unsubscribe();
	}, [selectedProject]);

	return { tasks, archivedTasks };
};

export const useProjects = () => {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		firebase
			.firestore()
			.collection("projects")
			.where("userId", "==", "nluAjrw1PLLTYAtn")
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
