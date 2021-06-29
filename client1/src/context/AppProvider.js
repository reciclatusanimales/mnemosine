import { Provider } from "react-redux";
import { UIProvider } from "../context";
import store from "../store/configureStore";

function AppProvider({ children }) {
	return (
		<Provider store={store}>
			<UIProvider>{children}</UIProvider>
		</Provider>
	);
}

export default AppProvider;
