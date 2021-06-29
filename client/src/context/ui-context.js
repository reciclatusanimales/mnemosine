import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
	const [theme, setTheme] = useLocalStorage("theme", "light");
	const [config, setConfig] = useLocalStorage("config", {
		avatarColor: "light",
	});
	const [showSidebar, setShowSidebar] = useState(false);

	useEffect(() => {
		document.documentElement.className = "";
		document.documentElement.classList.add(`theme-${theme}`);
	}, [theme]);

	const values = {
		theme,
		setTheme,

		showSidebar,
		setShowSidebar,

		config,
		setConfig,
	};

	return <UIContext.Provider value={values}>{children}</UIContext.Provider>;
};

export const useUI = () => useContext(UIContext);
