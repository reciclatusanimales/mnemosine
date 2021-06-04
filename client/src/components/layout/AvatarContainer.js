import { createRef } from "react";
import { useDispatch } from "react-redux";
import { uploadUserImage } from "../../redux/userSlice";

const AvatarContainer = ({ children }) => {
	const dispatch = useDispatch();
	const fileInputRef = createRef();
	const openFileInput = () => {
		console.log("CLICK");
		fileInputRef.current.click();
	};

	const uploadImage = async (event) => {
		const file = event.target.files[0];
		const formData = new FormData();
		formData.append("file", file);

		dispatch(uploadUserImage(formData));
	};

	return (
		<div className="avatar-container" onClick={() => openFileInput()}>
			<input
				type="file"
				hidden={true}
				ref={fileInputRef}
				onChange={uploadImage}
			/>
			<div className="avatar-middle" onClick={() => openFileInput()}>
				<div className="avatar-text">cambiar</div>
			</div>
			{children}
		</div>
	);
};

export default AvatarContainer;
