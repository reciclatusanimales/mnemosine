import { useState } from "react";
import axios from "axios";
import Content from "./components/layout/Content";
import Header from "./components/layout/Header";
import { useSelector } from "react-redux";
import { UIProvider } from "./context";
import Auth from "./components/Auth";
import jwt from "jwt-decode";
import store from "./redux/store";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("token");

if (token) {
	const decodedToken = jwt(token);
	const expiresAt = new Date(decodedToken.exp * 1000);

	if (new Date() > expiresAt) {
		localStorage.removeItem("token");
	} else {
		store.dispatch({ type: "SET_USER", payload: decodedToken });
		axios.defaults.headers.common["Authorization"] = token;
	}
} else {
	console.log("NO TOKEN");
}

export default function App({ darkModeDefault = false }) {
	const user = useSelector((state: any) => state.user.user);

	const [darkMode, setDarkMode] = useState(darkModeDefault);

	return (
		<UIProvider>
			<main
				data-testid="application"
				className={darkMode ? "darkmode" : undefined}
			>
				{user ? (
					<>
						<Header darkMode={darkMode} setDarkMode={setDarkMode} />

						<Content />
					</>
				) : (
					<Auth />
				)}
			</main>
		</UIProvider>
	);
}
