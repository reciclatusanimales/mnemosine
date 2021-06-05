import "./tasks-skeleton.scss";

const TasksSkeleton = () => {
	return (
		<div className="tasks-skeleton">
			<div className="tasks-skeleton__body">
				<div className="tasks-skeleton__title">
					<span className="li"></span>
					<span className="title"></span>
				</div>

				<div className="tasks-skeleton__box">
					<span className="li"></span>
					<span className="medium"></span>
				</div>

				<div className="tasks-skeleton__box">
					<span className="li"></span>
					<span className="small"></span>
				</div>

				<div className="tasks-skeleton__box">
					<span className="li"></span>
					<span className="large"></span>
				</div>

				<div className="tasks-skeleton__box">
					<span className="li"></span>
					<span className="medium"></span>
				</div>

				<div className="tasks-skeleton__box">
					<span className="li"></span>
					<span className="small"></span>
				</div>

				<div className="tasks-skeleton__box">
					<span className="li"></span>
					<span className="medium"></span>
				</div>
			</div>
		</div>
	);
};

export default TasksSkeleton;
