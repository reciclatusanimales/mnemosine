const express = require("express");
const {
	login,
	loginWithGoogle,
	register,
	me,
	logout,
	uploadUserImage,
} = require("../controllers/auth");

const { auth } = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/login-with-google", loginWithGoogle);
router.get("/me", auth, me);
router.get("/logout", logout);
router.put("/upload-user-image", auth, uploadUserImage);

module.exports = router;
