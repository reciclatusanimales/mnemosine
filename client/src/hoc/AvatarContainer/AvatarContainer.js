import { createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadUserImage, setAvatarColor } from "../../store/userSlice";

const AvatarContainer = ({ children }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.user);
	const showTheme = !user.imageUrl;
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

	return (
		<div className="AvatarContainer">
			<div
				className="AvatarContainer__wrapper"
				onClick={() => openFileInput()}
			>
				<input
					type="file"
					hidden={true}
					ref={fileInputRef}
					onChange={uploadImage}
				/>
				<div className="middle" onClick={() => openFileInput()}>
					<div className="text">cambiar</div>
				</div>
				{children}
			</div>

			{showTheme && (
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
