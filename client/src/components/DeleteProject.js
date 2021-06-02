import { useDispatch, useSelector } from "react-redux";
import { useUI } from "../context";
import { deleteProject } from "../redux/dataSlice";
import Overlay from "./layout/Overlay";

export default function DeleteProject() {
	const { showDeleteProject, setShowDeleteProject } = useUI();
	const dispatch = useDispatch();
	const { id } = useSelector((state) => state.data.selectedProject);

	const handleDeleteProject = () => {
		dispatch(deleteProject(id));
		setShowDeleteProject(false);
	};

	const hideModal = () => {
		setShowDeleteProject(false);
	};

	return showDeleteProject ? (
		<Overlay onClickOutside={hideModal} onEscape={hideModal}>
			<div className="delete__main">
				<div className="delete__header-options">
					<span
						aria-label="Cancelar"
						className="cancel-x"
						onClick={hideModal}
						onKeyDown={hideModal}
						tabIndex={0}
						role="button"
					>
						X
					</span>
				</div>
				<div className="delete__inner">
					<div className="delete__message">
						<p>¿Deseas eliminar este projecto?</p>
					</div>
					<div className="btns">
						<span
							aria-label="Cancelar"
							className="cancel"
							onClick={hideModal}
							onKeyDown={hideModal}
							tabIndex={0}
							role="button"
							data-type="action"
						>
							Cancelar
						</span>

						<button
							className="submit"
							type="button"
							onClick={handleDeleteProject}
							data-type="action"
						>
							Eliminar
						</button>
					</div>
				</div>
			</div>
		</Overlay>
	) : null;
}
