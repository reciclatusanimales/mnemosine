import { FaInbox, FaRegCalendar, FaRegCalendarAlt } from "react-icons/fa";

export const routes = Object.freeze({
	// AUTH

	LOGIN: "auth/login",
	LOGIN_WITH_GOOGLE: "auth/login-with-google",
	REGISTER: "auth/register",
	LOGOUT: "auth/logout",

	// PROJECTS
	PROJECTS: "projects",

	// TASKS
	TASKS: "tasks",
});

export const defaultProjects = [
	{ id: "all", name: "Todos", icon: "FaInbox" },
	{ id: "today", name: "Hoy", icon: "FaRegCalendar" },
	{ id: "next_7", name: "Próximos 7 días", icon: "FaRegCalendarAlt" },
];

export const defaultIcons = { FaInbox, FaRegCalendar, FaRegCalendarAlt };

export const defaultProject = defaultProjects[0];
