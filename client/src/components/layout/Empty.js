import empty from "../../assets/empty.gif";
import { connect } from "react-redux";

const Empty = ({ isProjectsLoading, isTasksLoading }) => {
	return !isProjectsLoading && !isTasksLoading ? (
		<div className="empty-container fadein">
			<figure>
				<img src={empty} alt="empty..." />
				<figcaption>No hay nada pendiente</figcaption>
			</figure>
		</div>
	) : null;
};

const mapStateToProps = (state) => ({
	isProjectsLoading: state.data.isProjectsLoading,
	isTasksLoading: state.data.isTasksLoading,
});

export default connect(mapStateToProps)(Empty);
