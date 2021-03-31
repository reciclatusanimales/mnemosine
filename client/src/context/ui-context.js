import { createContext, useContext, useState } from "react";

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
	const [darkMode, setDarkMode] = useState(false);
	const [showSidebar, setShowSidebar] = useState(false);
	const [showProfileMenu, setShowProfileMenu] = useState(false);
	const [showRegister, setShowRegister] = useState(false);
	const [showAddProject, setShowAddProject] = useState(false);
	const [showEditProject, setShowEditProject] = useState(false);
	const [showDeleteProject, setShowDeleteProject] = useState(false);
	const [showAddTask, setShowAddTask] = useState(false);
	const [showEditTask, setShowEditTask] = useState(false);
	const [showDeleteTask, setShowDeleteTask] = useState(false);

	const values = {
		darkMode,
		setDarkMode,

		showSidebar,
		setShowSidebar,

		showProfileMenu,
		setShowProfileMenu,

		showRegister,
		setShowRegister,

		showAddProject,
		setShowAddProject,
		showEditProject,
		setShowEditProject,
		showDeleteProject,
		setShowDeleteProject,

		showAddTask,
		setShowAddTask,
		showEditTask,
		setShowEditTask,
		showDeleteTask,
		setShowDeleteTask,
	};

	return <UIContext.Provider value={values}>{children}</UIContext.Provider>;
};

export const useUI = () => useContext(UIContext);
