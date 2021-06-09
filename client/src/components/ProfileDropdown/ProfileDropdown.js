import { useEffect, useRef, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../Avatar";
import { logoutUser } from "../../store/userSlice";
import ConditionalWrapper from "../../hoc/ConditionalWrapper";
import AvatarContainer from "../../hoc/AvatarContainer";

const ProfileDropdown = () => {
	const profileRef = useRef(null);

	const dispatch = useDispatch();

	const user = useSelector((state) => state.user.user);
	const [showProfileMenu, setShowProfileMenu] = useState(false);

	const handleProfile = (e) => {
		if (showProfileMenu && e.target !== profileRef.current) return;
		setShowProfileMenu(!showProfileMenu);
	};

	const handleLogout = () => {
		dispatch(logoutUser());
	};

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (!profileRef.current?.contains(event.target)) {
				if (!showProfileMenu) return;
				setShowProfileMenu(false);
			}
		};

		if (typeof window !== "undefined") {
			window.addEventListener("click", handleOutsideClick);
		}

		if (typeof window !== "undefined") {
			return () =>
				window.removeEventListener("click", handleOutsideClick);
		}
	}, [showProfileMenu, setShowProfileMenu]);

	useEffect(() => {
		const handleEscape = (event) => {
			if (!showProfileMenu) return;

			if (event.key === "Escape") {
				setShowProfileMenu(false);
			}
		};

		document.addEventListener("keyup", handleEscape);
		return () => document.removeEventListener("keyup", handleEscape);
	}, [showProfileMenu, setShowProfileMenu]);

	if (!user) return null;

	return (
		<li className="ProfileDropdown">
			<div
				className="ProfileDropdown__container"
				onClick={handleProfile}
				ref={profileRef}
			>
				<Avatar />

				<div
					className={`ProfileDropdown__content${
						!showProfileMenu ? " hide" : ""
					}`}
				>
					<span className="avatar">
						<ConditionalWrapper
							condition={user.accountType === "email"}
							wrapper={(children) => (
								<AvatarContainer>{children}</AvatarContainer>
							)}
						>
							<Avatar size={45} />
						</ConditionalWrapper>
						<span
							className={`username${
								!user.imageUrl ? " center" : ""
							}`}
						>
							⊚{user.username}
						</span>
					</span>
					<span>{user.email}</span>
					<span className="logout" onClick={handleLogout}>
						salir <FaSignOutAlt />
					</span>
				</div>
			</div>
		</li>
	);
};

export default ProfileDropdown;
