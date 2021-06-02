import { useDispatch } from "react-redux";
import { archiveTask } from "../redux/dataSlice";

export default function Checkbox({ id, taskDesc }) {
	const dispatch = useDispatch();

	const handleArchiveTask = () => {
		dispatch(archiveTask(id));
	};

	return (
		<div
			aria-label={`¿Marcar ${taskDesc} como realizada?`}
			className="checkbox-holder"
			onClick={handleArchiveTask}
			onKeyDown={handleArchiveTask}
			role="button"
			tabIndex={0}
		>
			<span className="checkbox" />
		</div>
	);
}
