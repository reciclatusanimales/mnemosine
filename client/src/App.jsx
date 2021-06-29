import AppProvider from "./context/AppProvider";
import AppRouter from "./routes/AppRouter";

export default function App() {
	return (
		<AppProvider>
			<AppRouter />
		</AppProvider>
	);
}
