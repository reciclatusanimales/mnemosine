import { useState } from "react";
import axios from "axios";
import Content from "./components/layout/Content";
import Header from "./components/layout/Header";
import { Provider } from "react-redux";
import store from "./redux/store";
import { UIProvider } from "./context";

export default function App({ darkModeDefault = false }) {
	const [darkMode, setDarkMode] = useState(darkModeDefault);

	//const host = window.location.host;

	//axios.defaults.baseURL = `https://${host}/api/`;
	axios.defaults.baseURL = `http://localhost:5000/api/`;

	return (
		<Provider store={store}>
			<UIProvider>
				<main
					data-testid="application"
					className={darkMode ? "darkmode" : undefined}
				>
					<Header darkMode={darkMode} setDarkMode={setDarkMode} />

					<Content />
				</main>
			</UIProvider>
		</Provider>
	);
}
