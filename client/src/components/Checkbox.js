import { connect } from "react-redux";
import { archiveTask } from "../redux/actions/dataActions";

const Checkbox = ({ id, taskDesc, archiveTask }) => {
	const handleArchiveTask = () => {
		archiveTask(id);
	};

	return (
		<div
			aria-label={`¿Marcar ${taskDesc} como realizada?`}
			className="checkbox-holder"
			data-testid="checkbox-action"
			onClick={handleArchiveTask}
			onKeyDown={handleArchiveTask}
			role="button"
			tabIndex={0}
		>
			<span className="checkbox" />
		</div>
	);
};

const mapActionsToProps = {
	archiveTask,
};

export default connect(null, mapActionsToProps)(Checkbox);
