import { useEffect, useRef } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useUI } from "../../context";
import Avatar from "./Avatar";
import { logoutUser } from "../../redux/userSlice";
import ConditionalWrapper from "./ConditionalWrapper";
import AvatarContainer from "./AvatarContainer";

const Profile = () => {
	const profileRef = useRef(null);

	const dispatch = useDispatch();

	const user = useSelector((state) => state.user.user);
	const { showProfileMenu, setShowProfileMenu, setShowRegister } = useUI();

	const handleProfile = (e) => {
		if (showProfileMenu && e.target !== profileRef.current) return;

		setShowProfileMenu(!showProfileMenu);
	};

	const handleLogout = () => {
		setShowRegister(false);
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
		<li className="settings__avatar">
			<div className="avatar" onClick={handleProfile} ref={profileRef}>
				<Avatar />

				<div
					className={`dropdown-content${
						!showProfileMenu ? " hide" : ""
					}`}
				>
					<span>
						<ConditionalWrapper
							condition={user.accountType === "email"}
							wrapper={(children) => (
								<AvatarContainer>{children}</AvatarContainer>
							)}
						>
							<Avatar size={45} />
						</ConditionalWrapper>
						⊚{user.username}
					</span>
					<span>{user.email}</span>
					<span onClick={() => handleLogout()}>
						salir <FaSignOutAlt />
					</span>
				</div>
			</div>
		</li>
	);
};

export default Profile;
