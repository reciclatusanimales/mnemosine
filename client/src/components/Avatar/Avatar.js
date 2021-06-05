import "./avatar.scss";
import { useSelector } from "react-redux";
import { getTextColor } from "../../utils";

const getPercentFromValue = (percent, value) => (value * percent) / 100;
const getInitialLetter = (str) => str[0].toUpperCase();

const Avatar = ({
	size = 30,
	bgColor = "#0a9396",
	onClick = () => {},
	txtColor,
	style,
}) => {
	const user = useSelector((state) => state.user.user);
	const showAvatar = !!user.imageUrl;

	if (showAvatar)
		return (
			<img
				className="avatar-image"
				src={user.imageUrl}
				alt="Avatar"
				width={size}
				height={size}
			/>
		);

	const initialLetter = getInitialLetter(user.username);
	const halfSize = getPercentFromValue(50, size);
	const quarterSize = getPercentFromValue(25, size);
	const textColor = getTextColor(bgColor);

	return (
		<div
			className="avatar-photo"
			style={{
				backgroundColor: bgColor,
				fontSize: halfSize,
				top: quarterSize,
				width: size,
				height: size,
				...style,
			}}
			onClick={onClick}
		>
			<div
				className="avatar-photo__initials"
				style={{
					color: textColor,
				}}
			>
				{initialLetter}
			</div>
		</div>
	);
};

export default Avatar;
