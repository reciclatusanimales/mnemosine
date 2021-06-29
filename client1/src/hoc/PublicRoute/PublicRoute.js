import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = (props) => {
	const user = useSelector((state) => state.user.user);

	return user ? <Redirect to="/" /> : <Route {...props} />;
};

export default PublicRoute;
