import { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { updateProject } from "../redux/dataSlice";
import { useUI } from "../context";

export default function EditProject() {
	const modalRef = useRef(null);
	const dispatch = useDispatch();
	const selectedProject = useSelector((state) => state.data.selectedProject);
	const { showEditProject, setShowEditProject } = useUI();
	const [name, setName] = useState(selectedProject?.name);

	const handleUpdateProject = () => {
		if (name === "") return;
		dispatch(updateProject({ id: selectedProject.id, name }));
		setName("");
		setShowEditProject(null);
	};

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (!modalRef.current?.contains(event.target)) {
				if (!showEditProject) return;
				setShowEditProject(false);
			}
		};

		if (typeof window !== "undefined") {
			window.addEventListener("click", handleOutsideClick);
		}

		if (typeof window !== "undefined") {
			return () =>
				window.removeEventListener("click", handleOutsideClick);
		}
	}, [showEditProject, setShowEditProject]);

	useEffect(() => {
		const handleEscape = (event) => {
			if (!showEditProject) return;

			if (event.key === "Escape") {
				setShowEditProject(false);
			}
		};

		document.addEventListener("keyup", handleEscape);
		return () => document.removeEventListener("keyup", handleEscape);
	}, [showEditProject, setShowEditProject]);

	return (
		<div className="add-project" ref={modalRef}>
			<div className="add-project__input">
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="add-project__name"
					type="text"
					placeholder="Nombre"
				/>
				<div className="add-project__btns">
					<span
						aria-label="Cancelar"
						className="add-project__cancel"
						data-type="action"
						onClick={() => setShowEditProject(null)}
						onKeyDown={() => setShowEditProject(null)}
						role="button"
						tabIndex={0}
					>
						Cancel
					</span>

					<button
						className="add-project__submit"
						type="button"
						data-type="action"
						onClick={() => handleUpdateProject()}
					>
						Guardar
					</button>
				</div>
			</div>
		</div>
	);
}
