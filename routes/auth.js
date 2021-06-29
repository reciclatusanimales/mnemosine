const express = require("express");
const {
	login,
	loginWithGoogle,
	register,
	me,
	logout,
	forgotPassword,
	resetPassword,
	checkPasswordToken,
	uploadUserImage,
	deleteUserImage,
} = require("../controllers/auth");

const { auth } = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/login-with-google", loginWithGoogle);
router.get("/me", auth, me);
router.get("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:resettoken", resetPassword);
router.post("/check-password-token/:resettoken", checkPasswordToken);

router.put("/upload-user-image", auth, uploadUserImage);
router.get("/delete-user-image", auth, deleteUserImage);

module.exports = router;
