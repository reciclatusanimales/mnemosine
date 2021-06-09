import Header from "../../components/Header";

function Layout({ children }) {
	return (
		<main>
			<Header />
			{children}
		</main>
	);
}

export default Layout;
