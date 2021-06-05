import "./content.scss";
import Sidebar from "../Sidebar";
import Tasks from "../../pages/Home/components/Tasks";

export default function Content() {
	return (
		<section className="content">
			<Sidebar />
			<Tasks />
		</section>
	);
}
