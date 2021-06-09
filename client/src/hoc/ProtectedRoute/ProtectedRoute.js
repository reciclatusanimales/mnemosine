import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...otherProps }) => {
	const user = useSelector((state) => state.user.user);

	return (
		<Route
			{...otherProps}
			render={(props) => {
				if (user) {
					return <Component {...otherProps} {...props} />;
				} else {
					return <Redirect to="/login" />;
				}
			}}
		/>
	);
};

export default ProtectedRoute;
