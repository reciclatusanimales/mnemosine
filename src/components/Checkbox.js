import { firebase } from "../firebase";

export default function Checkbox({ id, taskDesc }) {
	const archiveTask = () => {
		firebase.firestore().collection("tasks").doc(id).update({
			archived: true,
		});
	};

	return (
		<div
			aria-label={`Mark ${taskDesc} as done?`}
			className="checkbox-holder"
			data-testid="checkbox-action"
			onClick={() => archiveTask()}
			onKeyDown={() => archiveTask()}
			role="button"
			tabIndex={0}
		>
			<span className="checkbox" />
		</div>
	);
}
