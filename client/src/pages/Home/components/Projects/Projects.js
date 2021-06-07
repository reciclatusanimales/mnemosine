import { useEffect, useState } from "react";
import Project from "../Project";

import { useDispatch, useSelector } from "react-redux";
import { loadProjects } from "../../../../store/dataSlice";
import ProjectSkeleton from "../ProjectsSkeleton";
import AddProject from "../AddProject/AddProject";
import EditProject from "../EditProject/EditProject";
import DeleteProject from "../DeleteProject/DeleteProject";
import useModal from "../../../../hooks/useModal";

export default function Projects({ showProjects }) {
	const dispatch = useDispatch();
	const { projects, projectsLoading } = useSelector((state) => state.data);
	const { isOpen, openModal, closeModal } = useModal();
	const [mode, setMode] = useState(null);

	useEffect(() => {
		dispatch(loadProjects());
	}, [dispatch]);

	const handleCloseModal = () => {
		setMode(null);
		closeModal();
	};

	useEffect(() => {
		if (mode) return openModal();
	}, [mode, openModal]);

	if (!showProjects) return null;

	if (projectsLoading) return <ProjectSkeleton />;

	return (
		<>
			<ul className="projects">
				{projects &&
					projects.map((project) => (
						<Project
							key={project.id}
							project={project}
							setMode={setMode}
						/>
					))}
			</ul>
			<AddProject />

			{mode === "edit" && (
				<EditProject isOpen={isOpen} closeModal={handleCloseModal} />
			)}

			{mode === "delete" && (
				<DeleteProject isOpen={isOpen} closeModal={handleCloseModal} />
			)}
		</>
	);
}
