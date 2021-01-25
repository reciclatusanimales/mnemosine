import { connect } from "react-redux";

const ProjectOverlay = ({
	projects,
	setProject,
	showProjectOverlay,
	setShowProjectOverlay,
}) => {
	return (
		projects &&
		showProjectOverlay && (
			<div className="project-overlay" data-testid="project-overlay">
				<ul className="project-overlay__list">
					{projects.map((project) => (
						<li key={project.projectId}>
							<div
								data-testid="project-overlay-action"
								aria-label="Select the task project"
								onClick={() => {
									setProject(project.projectId);
									setShowProjectOverlay(false);
								}}
								onKeyDown={() => {
									setProject(project.projectId);
									setShowProjectOverlay(false);
								}}
								tabIndex={0}
								role="button"
							>
								{project.name}
							</div>
						</li>
					))}
				</ul>
			</div>
		)
	);
};

const mapStateToProps = (state) => ({
	projects: state.data.projects,
});

export default connect(mapStateToProps)(ProjectOverlay);
