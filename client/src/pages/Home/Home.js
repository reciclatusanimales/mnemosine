import Sidebar from "../../components/Sidebar";
import Tasks from "../../pages/Home/components/Tasks";

export default function Home() {
	return (
		<section className="home">
			<Sidebar />
			<Tasks />
		</section>
	);
}
