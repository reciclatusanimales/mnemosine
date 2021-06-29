import { BrowserRouter as Router, Switch } from "react-router-dom";
import ProtectedRoute from "../hoc/ProtectedRoute";
import Layout from "../hoc/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import PublicRoute from "../hoc/PublicRoute";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import axios from "axios";

import jwt from "jwt-decode";
import store from "../store/configureStore";
import { setUser, setConfig } from "../store/userSlice";

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

function AppRouter() {
	return (
		<Router>
			<Switch>
				<Layout>
					<ProtectedRoute exact path="/profile" component={Profile} />
					<ProtectedRoute exact path="/" component={Home} />

					<PublicRoute exact path="/login" component={Login} />
					<PublicRoute exact path="/register" component={Register} />

					<PublicRoute
						exact
						path="/forgot-password"
						component={ForgotPassword}
					/>

					<PublicRoute
						exact
						path="/reset-password/:token"
						component={ResetPassword}
					/>
				</Layout>
			</Switch>
		</Router>
	);
}

export default AppRouter;
