import { setAuthorizationHeader, unauthenticateUser } from "./auth";
import { getTextColor } from "./colors";
import { arraySort, removeSymbols } from "./misc";
import { getProjectTasks } from "./projects";
import {
	routes,
	defaultProjects,
	defaultProject,
	defaultIcons,
} from "./constants";

export {
	// auth
	setAuthorizationHeader,
	unauthenticateUser,
	// colors
	getTextColor,
	// misc
	arraySort,
	removeSymbols,
	// projects
	getProjectTasks,
	// constants
	routes,
	defaultProjects,
	defaultProject,
	defaultIcons,
};
