import { useState, useEffect } from "react";
import { firebase } from "../firebase";
import { collatedTasksExists } from "../helpers";
import moment from "moment";

export const useTasks = (selectedProject) => {
	const [tasks, setTasks] = useState([]);
	const [archivedTasks, setArchivedTasks] = useState([]);

	useEffect(() => {
		let unsubscribe = firebase
			.firestore()
			.collection("tasks")
			.where("userId", "==", "nJVYAtAjrw1PLLTp0Ilu");

		unsubscribe =
			selectedProject && !collatedTasksExists(selectedProject)
				? (unsubscribe = unsubscribe.where(
						"projectId",
						"==",
						selectedProject
				  ))
				: selectedProject === "TODAY"
				? (unsubscribe = unsubscribe.where(
						"date",
						"==",
						moment().format("DD/MM/YYYY")
				  ))
				: selectedProject === "INBOX" || selectedProject === 0
				? (unsubscribe = unsubscribe.where("date", "==", ""))
				: unsubscribe;

		unsubscribe = unsubscribe.onSnapshot((snapshot) => {
			const newTasks = snapshot.docs.map((task) => ({
				id: task.id,
				...task.data(),
			}));

			setTasks(
				selectedProject === "NEXT_7"
					? newTasks.filter(
							(task) =>
								moment(task.date, "DD-MM-YYYY").dif(
									moment(),
									"days"
								) <= 7 && !task.archived
					  )
					: newTasks.filter((task) => !task.archived)
			);

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
				const allProjects = snapshot.doc.map((project) => ({
					...project.data(),
					docId: project.id,
				}));

				if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
					setProjects(allProjects);
				}
			});

		return { projects, setProjects };
	}, [projects]);
};
