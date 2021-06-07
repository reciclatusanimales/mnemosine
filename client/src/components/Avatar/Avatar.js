import { useSelector } from "react-redux";
import { getTextColor, getBgColor } from "../../utils";

const getPercentFromValue = (percent, value) => (value * percent) / 100;
const getInitialLetter = (str) => str[0].toUpperCase();

const Avatar = ({ size = 30, onClick = () => {}, txtColor, style }) => {
	const {
		user,
		config: { avatarColor },
	} = useSelector((state) => state.user);
	const showAvatarImage = !!user.imageUrl;

	if (showAvatarImage)
		return (
			<img
				className="Avatar__image"
				src={user.imageUrl}
				alt="Avatar"
				width={size}
				height={size}
			/>
		);

	const initialLetter = getInitialLetter(user.username);
	const halfSize = getPercentFromValue(50, size);
	const quarterSize = getPercentFromValue(25, size);
	const bgColor = getBgColor(avatarColor);
	const textColor = getTextColor(bgColor);

	return (
		<div className="Avatar">
			<div
				className="Avatar__placeholder"
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
					className="initials"
					style={{
						color: textColor,
					}}
				>
					{initialLetter}
				</div>
			</div>
		</div>
	);
};

export default Avatar;
