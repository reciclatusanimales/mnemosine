import moment from "moment";
import { FaRegPaperPlane, FaSpaceShuttle, FaSun } from "react-icons/fa";
export default function TaskDate({
	setTaskDate,
	showTaskDate,
	setShowTaskDate,
}) {
	return (
		showTaskDate && (
			<div className="task-date" data-testid="task-date-overlay">
				<ul className="task-date__list">
					<li>
						<div
							data-testid="task-date-today"
							aria-label="Select today as the task date"
							onClick={() => {
								setShowTaskDate(false);
								setTaskDate(moment().format("DD-MM-YYYY"));
							}}
							onKeyDown={() => {
								setShowTaskDate(false);
								setTaskDate(moment().format("DD-MM-YYYY"));
							}}
							tabIndex={0}
							role="button"
						>
							<span>
								<FaSpaceShuttle />
							</span>
							<span>Today</span>
						</div>
					</li>

					<li>
						<div
							data-testid="task-date-tomorrow"
							aria-label="Select tomorrow as the task date"
							onClick={() => {
								setShowTaskDate(false);
								setTaskDate(
									moment().add(1, "day").format("DD-MM-YYYY")
								);
							}}
							onKeyDown={() => {
								setShowTaskDate(false);
								setTaskDate(
									moment().add(1, "day").format("DD-MM-YYYY")
								);
							}}
							tabIndex={0}
							role="button"
						>
							<span>
								<FaSun />
							</span>
							<span>Tomorrow</span>
						</div>
					</li>
					<li>
						<div
							data-testid="task-date-next-week"
							aria-label="Select next week as the task date"
							onClick={() => {
								setShowTaskDate(false);
								setTaskDate(
									moment().add(7, "day").format("DD-MM-YYYY")
								);
							}}
							onKeyDown={() => {
								setShowTaskDate(false);
								setTaskDate(
									moment().add(7, "day").format("DD-MM-YYYY")
								);
							}}
							tabIndex={0}
							role="button"
						>
							<span>
								<FaRegPaperPlane />
							</span>
							<span>Next week</span>
						</div>
					</li>
				</ul>
			</div>
		)
	);
}
