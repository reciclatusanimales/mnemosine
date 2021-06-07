import { useState } from "react";
import Content from "./components/layout/Content";
import Header from "./components/layout/Header";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function App({ darkModeDefault = false }) {
	const [darkMode, setDarkMode] = useState(darkModeDefault);

	return (
		<Provider store={store}>
			<main
				data-testid="application"
				className={darkMode ? "darkmode" : undefined}
			>
				<Header darkMode={darkMode} setDarkMode={setDarkMode} />

				<Content />
			</main>
		</Provider>
	);
}
