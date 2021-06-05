import axios from "axios";
import Content from "./components/Content";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import { useUI } from "./context";
import Auth from "./pages/Auth";
import jwt from "jwt-decode";
import store from "./store/configureStore";
import { setUser } from "./store/userSlice";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("token");

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

export default function App() {
	const user = useSelector((state) => state.user.user);
	const { darkMode } = useUI();

	return (
		<main className={darkMode ? "darkmode" : undefined}>
			<Header />
			{user ? <Content /> : <Auth />}
		</main>
	);
}
