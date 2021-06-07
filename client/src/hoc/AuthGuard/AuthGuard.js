import { useSelector } from "react-redux";
import Auth from "../../pages/Auth";

function AuthGuard({ children }) {
	const user = useSelector((state) => state.user.user);

	return user ? children : <Auth />;
}

export default AuthGuard;
