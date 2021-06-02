import axios from "axios";
import moment from "moment";

export const getProjectTasks = (project, tasks) => {
	switch (project.id) {
		case "all":
			return tasks;
		case "today":
			return tasks.filter(
				(task) => task.date === moment().format("DD/MM/YYYY")
			);
		case "next_7":
			return tasks.filter((task) => {
				const diff = moment(task.date, "DD/MM/YYYY").diff(
					moment(),
					"days"
				);
				return diff <= 7 && diff >= 0;
			});
		default:
			return tasks.filter((task) => task.projectId === project.id);
	}
};

export const setAuthorizationHeader = (token) => {
	const headerToken = `Bearer ${token}`;
	localStorage.setItem("token", headerToken);
	axios.defaults.headers.common["Authorization"] = headerToken;
	return;
};

export const unauthenticateUser = () => {
	localStorage.removeItem("token");
	delete axios.defaults.headers.common["Authorization"];
	return;
};
