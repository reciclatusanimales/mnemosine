import axios from "axios";
import Content from "./components/layout/Content";
import Header from "./components/layout/Header";
import { useSelector } from "react-redux";
import { useUI } from "./context";
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
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	}
} else {
	console.log("NO TOKEN");
}

export default function App() {
	const user = useSelector((state: any) => state.user.user);
	const { darkMode } = useUI();

	return (
		<main className={darkMode ? "darkmode" : undefined}>
			<Header />
			{user ? <Content /> : <Auth />}
		</main>
	);
}
