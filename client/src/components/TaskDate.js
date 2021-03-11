import {
	FaRegCalendarPlus,
	FaRegPaperPlane,
	FaSpaceShuttle,
	FaSun,
} from "react-icons/fa";

export default function TaskDate({
	setTaskDate,
	showTaskDate,
	setShowTaskDate,
	setShowTaskCalendar,
}) {
	return (
		showTaskDate && (
			<div className="task-date" data-testid="task-date-overlay">
				<ul className="task-date__list">
					<li key="today">
						<div
							data-testid="task-date-today"
							aria-label="Select today as the task date"
							onClick={() => {
								setShowTaskDate(false);
								setTaskDate("today");
							}}
							onKeyDown={() => {
								setShowTaskDate(false);
								setTaskDate("today");
							}}
							tabIndex={0}
							role="button"
						>
							<span>
								<FaSpaceShuttle />
							</span>
							<span>Hoy</span>
						</div>
					</li>

					<li key="tomorrow">
						<div
							data-testid="task-date-tomorrow"
							aria-label="Select tomorrow as the task date"
							onClick={() => {
								setShowTaskDate(false);
								setTaskDate("tomorrow");
							}}
							onKeyDown={() => {
								setShowTaskDate(false);
								setTaskDate("tomorrow");
							}}
							tabIndex={0}
							role="button"
						>
							<span>
								<FaSun />
							</span>
							<span>Mañana</span>
						</div>
					</li>
					<li key="next_7">
						<div
							data-testid="task-date-next-week"
							aria-label="Select next week as the task date"
							onClick={() => {
								setShowTaskDate(false);
								setTaskDate("next_7");
							}}
							onKeyDown={() => {
								setShowTaskDate(false);
								setTaskDate("next_7");
							}}
							tabIndex={0}
							role="button"
						>
							<span>
								<FaRegPaperPlane />
							</span>
							<span>Próxima Semana</span>
						</div>
					</li>
					<li key="another">
						<div
							data-testid="task-date-next-week"
							aria-label="Select next week as the task date"
							onClick={() => {
								setShowTaskDate(false);
								setShowTaskCalendar(true);
							}}
							onKeyDown={() => {
								setShowTaskDate(false);
								setShowTaskCalendar(true);
							}}
							tabIndex={0}
							role="button"
						>
							<span>
								<FaRegCalendarPlus />
							</span>
							<span>Más...</span>
						</div>
					</li>
				</ul>
			</div>
		)
	);
}
