import empty from "./empty.gif";
import { useSelector } from "react-redux";

export default function Empty() {
	const isProjectsLoading = useSelector(
		(state) => state.data.projectsLoading
	);
	const isTasksLoading = useSelector((state) => state.data.tasksLoading);

	return !isProjectsLoading && !isTasksLoading ? (
		<div className="empty-container fadein">
			<figure>
				<img src={empty} alt="empty..." />
				<figcaption>No hay nada pendiente</figcaption>
			</figure>
		</div>
	) : null;
}
