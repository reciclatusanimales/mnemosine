import { createRef } from "react";
import { FaCloudUploadAlt, FaPencilAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
	uploadUserImage,
	deleteUserImage,
	setAvatarColor,
} from "../../store/userSlice";

const AvatarContainer = ({ children }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.user);
	const isAvatar = user.imageUrl;
	const fileInputRef = createRef();

	const openFileInput = () => {
		fileInputRef.current.click();
	};

	const updateAvatarColor = (color) => {
		dispatch(setAvatarColor(color));
	};

	const uploadImage = async (event) => {
		const file = event.target.files[0];
		const formData = new FormData();
		formData.append("file", file);

		dispatch(uploadUserImage(formData));
	};

	const handleDelete = (event) => {
		event.stopPropagation();
		dispatch(deleteUserImage());
	};

	return (
		<div className="AvatarContainer">
			<div
				className="AvatarContainer__wrapper"
				onClick={() => openFileInput()}
			>
				{isAvatar && (
					<button
						className="close"
						type="button"
						onClick={handleDelete}
					/>
				)}
				<input
					type="file"
					style={{ display: "none" }}
					ref={fileInputRef}
					onChange={uploadImage}
				/>
				<div className="middle" onClick={() => openFileInput()}>
					{isAvatar ? (
						<FaPencilAlt size={20} />
					) : (
						<FaCloudUploadAlt size={20} />
					)}
				</div>
				{children}
			</div>

			{!isAvatar && (
				<div className="AvatarContainer__theme">
					<div
						className="color light"
						onClick={() => updateAvatarColor("light")}
					></div>
					<div
						className="color blue"
						onClick={() => updateAvatarColor("blue")}
					></div>
					<div
						className="color red"
						onClick={() => updateAvatarColor("red")}
					></div>
					<div
						className="color dark"
						onClick={() => updateAvatarColor("dark")}
					></div>
				</div>
			)}
		</div>
	);
};

export default AvatarContainer;
