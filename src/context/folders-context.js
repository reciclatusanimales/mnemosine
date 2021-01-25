import { createContext, useContext, useState } from "react";

export const FoldersContext = createContext();

export const FoldersProvider = ({ children }) => {
	const [folder, setFolder] = useState("INBOX");

	return (
		<FoldersContext.Provider value={{ folder, setFolder }}>
			{children}
		</FoldersContext.Provider>
	);
};

export const useFolder = () => useContext(FoldersContext);
