import axios from "axios";
import Home from "./pages/Home";
import Header from "./components/Header";
import jwt from "jwt-decode";
import store from "./store/configureStore";
import { setUser, setConfig } from "./store/userSlice";
import AuthGuard from "./hoc/AuthGuard";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("token");
const config = localStorage.getItem("config");

if (token) {
	const decodedToken = jwt(token);
	const expiresAt = new Date(decodedToken.exp * 1000);

	if (new Date() > expiresAt) {
		localStorage.removeItem("token");
	} else {
		store.dispatch({ type: setUser.type, payload: decodedToken });
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	}
} else {
	console.log("NO TOKEN");
}

if (config) {
	store.dispatch({ type: setConfig.type, payload: JSON.parse(config) });
}

export default function App() {
	return (
		<main>
			<Header />
			<AuthGuard>
				<Home />
			</AuthGuard>
		</main>
	);
}
