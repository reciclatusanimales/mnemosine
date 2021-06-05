import "./add-project.scss";
import { useEffect, useRef, useState } from "react";

import { useDispatch } from "react-redux";
import { addProject } from "../../../../store/dataSlice";
import { useUI } from "../../../../context";

export default function AddProject() {
	const modalRef = useRef(null);
	const dispatch = useDispatch();
	const { showAddProject, setShowAddProject } = useUI();
	const [name, setName] = useState("");

	const handleAddProject = () => {
		if (name === "") return;
		dispatch(addProject({ name }));
		setName("");
		setShowAddProject(false);
	};

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (!modalRef.current?.contains(event.target)) {
				if (!showAddProject) return;
				setShowAddProject(false);
			}
		};

		if (typeof window !== "undefined") {
			window.addEventListener("click", handleOutsideClick);
		}

		if (typeof window !== "undefined") {
			return () =>
				window.removeEventListener("click", handleOutsideClick);
		}
	}, [showAddProject, setShowAddProject]);

	useEffect(() => {
		const handleEscape = (event) => {
			if (!showAddProject) return;

			if (event.key === "Escape") {
				setShowAddProject(false);
			}
		};

		document.addEventListener("keyup", handleEscape);
		return () => document.removeEventListener("keyup", handleEscape);
	}, [showAddProject, setShowAddProject]);

	return (
		<>
			<div className="add-project" ref={modalRef}>
				{showAddProject && (
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
								onClick={() => setShowAddProject(false)}
								onKeyDown={() => setShowAddProject(false)}
								role="button"
								tabIndex={0}
							>
								Cancelar
							</span>
							<button
								className="add-project__submit"
								data-type="action"
								type="button"
								onClick={() => handleAddProject()}
								disabled={name === ""}
							>
								Agregar
							</button>
						</div>
					</div>
				)}
			</div>

			{!showAddProject && (
				<div
					aria-label="Nuevo"
					className="add-project__action"
					onClick={() => setShowAddProject(true)}
					onKeyDown={() => setShowAddProject(true)}
					role="button"
					data-type="action"
					tabIndex={0}
				>
					<span className="add-project__plus" data-type="action">
						+
					</span>{" "}
					<span className="add-project__text" data-type="action">
						Proyecto
					</span>
				</div>
			)}
		</>
	);
}
