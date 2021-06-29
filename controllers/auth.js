const path = require("path");
const { Op } = require("sequelize");

const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const fs = require("fs");

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const { User } = require("../models");
const { resizeImage, sendTokenResponse, sendEmail } = require("../utils/misc");

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
	let { email, username, password, confirmPassword } = req.body;
	let errors = {};
	let user;

	if (username.trim() === "")
		errors.username = "El nombre de usuario no puede estar vacío.";

	if (email.trim() === "") errors.email = "El email no puede estar vacío.";

	if (password.trim() === "")
		errors.password = "La contraseña no puede estar vacía.";

	if (password !== confirmPassword)
		errors.confirmPassword = "Las contraseñas no coinciden.";

	if (Object.keys(errors).length > 0) {
		return next(new ErrorResponse("Datos incorrectos.", 400, errors));
	}

	user = await User.findOne({
		where: { username },
	});

	if (user) {
		return next(new ErrorResponse("El nombre de usuario ya existe.", 401));
	}

	user = await User.findOne({
		where: { email },
	});

	if (user) {
		return next(new ErrorResponse("El correo ya está registrado.", 401));
	}

	password = await bcrypt.hash(password, 6);

	user = await User.create({
		username,
		email,
		password,
	});

	const userObject = {
		id: user.id,
		username: user.username,
		email: user.email,
		imageUrl: user.imageUrl,
		accountType: user.accountType,
	};

	sendTokenResponse(userObject, 200, res);
});

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
	const { username, password } = req.body;
	const errors = {};

	if (username.trim() === "")
		errors.username = "El nombre de usuario no puede estar vacío.";

	if (password.trim() === "")
		errors.password = "La contraseña no puede estar vacía.";

	if (Object.keys(errors).length > 0) {
		return next(new ErrorResponse("Datos incorrectos.", 400, errors));
	}

	const user = await User.findOne({
		where: { username },
	});

	if (!user) {
		return next(
			new ErrorResponse(
				"Nombre de usuario y/o contraseña incorrecta.",
				401
			)
		);
	}

	const correctPassword = await bcrypt.compare(password, user.password);

	if (!correctPassword) {
		return next(
			new ErrorResponse(
				"Nombre de usuario y/o contraseña incorrecta.",
				401
			)
		);
	}

	const userObject = {
		id: user.id,
		username: user.username,
		email: user.email,
		imageUrl: user.imageUrl,
		accountType: user.accountType,
	};

	sendTokenResponse(userObject, 200, res);
});

// @desc      Login user with Google
// @route     POST /api/v1/auth/login-with-google
// @access    Public
exports.loginWithGoogle = asyncHandler(async (req, res, next) => {
	const { displayName, email, photoURL } = req.body;
	const errors = {};
	let user;

	if (displayName.trim() === "")
		errors.displayName = "El nombre de usuario no puede estar vacío.";

	if (email.trim() === "") errors.email = "El correo no puede estar vacío.";

	if (Object.keys(errors).length > 0) {
		return next(new ErrorResponse("Datos incorrectos.", 400, errors));
	}

	user = await User.findOne({
		where: { email },
	});

	if (!user) {
		user = await User.create({
			username: displayName,
			accountType: "google",
			email,
		});
	}

	const userObject = {
		id: user.id,
		username: user.username,
		email: user.email,
		imageUrl: photoURL,
		accountType: user.accountType,
	};

	sendTokenResponse(userObject, 200, res);
});

// @desc      Get current logged in user
// @route     POST /api/v1/auth/me
// @access    Private
exports.me = asyncHandler(async (req, res, next) => {
	const user = res.locals.user;

	res.status(200).json({
		success: true,
		data: user,
	});
});

// @desc      Log User out / clear Cookie
// @route     GET /api/v1/auth/logout
// @access    Private
exports.logout = asyncHandler(async (req, res, next) => {
	res.cookie("token", "none", {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
	});

	res.status(200).json({
		success: true,
		data: {},
	});
});

// @desc      Forgot password
// @route     POST /api/v1/auth/forgot-password
// @access    Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
	const { email } = req.body;
	const user = await User.findOne({ where: { email } });

	if (!user) {
		return next(
			new ErrorResponse(
				"No existe ningún usuario asociado ese correo.",
				404
			)
		);
	}

	if (user.accountType === "google") {
		return next(
			new ErrorResponse(
				"El usuario no posee contraseña. Utiliza la opción entrar con Google.",
				400
			)
		);
	}

	const resetToken = user.getResetPasswordToken();
	console.log(resetToken);

	await user.save();

	const resetUrl = `${process.env.APP_URL}/reset-password/${resetToken}`;

	try {
		await sendEmail({
			email: user.email,
			name: user.username,
			type: "forgot_password",
			params: {
				reset_url: resetUrl,
			},
		});
		res.status(200).json({
			success: true,
			data: "Correo enviado.",
		});
	} catch (err) {
		console.log(err);
		user.resetPasswordToken = null;
		user.resetPasswordExpire = null;
		await user.save();

		return next(new ErrorResponse("El correo no pudo ser enviado.", 500));
	}
});

// @desc      Reset password
// @route     POST /api/v1/auth/reset-password/:resettoken
// @access    Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
	// Get hashed token
	const resetPasswordToken = crypto
		.createHash("sha256")
		.update(req.params.resettoken)
		.digest("hex");

	const user = await User.findOne({
		where: {
			resetPasswordToken,
			resetPasswordExpire: {
				[Op.gt]: Date.now(),
			},
		},
	});

	if (!user) {
		return next(new ErrorResponse("Token inválido", 400));
	}

	user.password = await bcrypt.hash(req.body.password, 6);
	user.resetPasswordToken = null;
	user.resetPasswordExpire = null;
	await user.save();

	try {
		await sendEmail({
			email: user.email,
			name: user.username,
			type: "reset_password",
		});
		const userObject = {
			id: user.id,
			username: user.username,
			email: user.email,
			imageUrl: user.imageUrl,
			accountType: user.accountType,
		};

		sendTokenResponse(userObject, 200, res);
	} catch (err) {
		console.log(err);

		return next(new ErrorResponse("El correo no pudo ser enviado.", 500));
	}
});

// @desc      Check password token
// @route     POST /api/v1/auth/check-password-token/:resettoken
// @access    Public
exports.checkPasswordToken = asyncHandler(async (req, res, next) => {
	// Get hashed token
	const resetPasswordToken = crypto
		.createHash("sha256")
		.update(req.params.resettoken)
		.digest("hex");

	const user = await User.findOne({
		where: {
			resetPasswordToken,
			resetPasswordExpire: {
				[Op.gt]: Date.now(),
			},
		},
	});

	if (!user) {
		return next(new ErrorResponse("Token inválido", 400));
	}

	res.status(200).json({
		success: true,
		data: {},
	});
});

// @desc    Upload profile photo
// @route   PUT /api/v1/auth/upload-user-image
// @access  Private
exports.uploadUserImage = asyncHandler(async (req, res, next) => {
	if (!req.files) {
		return next(new ErrorResponse("Archivo no encontrado.", 400));
	}

	const { file } = req.files;

	if (!file.mimetype.startsWith("image"))
		return next(new ErrorResponse("El archivo no es una imagen.", 400));

	if (file.size > process.env.MAX_FILE_UPLOAD) {
		return next(
			new ErrorResponse(
				`El máximo de ${process.env.MAX_FILE_UPLOAD} permitido ha sido excedido.`,
				400
			)
		);
	}

	file.name = `photo_${res.locals.user.id}${path.parse(file.name).ext}`;

	const tempFilepath = `${process.env.FILE_UPLOAD_PATH}/temp/${file.name}`;
	const filepath = `${process.env.FILE_UPLOAD_PATH}/profile_photos/${file.name}`;

	file.mv(tempFilepath, async (err) => {
		if (err) {
			console.error(err);
			return next(
				new ErrorResponse("Hubo un problema con la carga.", 500)
			);
		}

		const user = await User.findByPk(res.locals.user.id);
		user.imageUrn = file.name;
		user.save();

		await resizeImage(file.name, tempFilepath, filepath);

		const userObject = {
			id: user.id,
			username: user.username,
			email: user.email,
			imageUrl: user.imageUrl,
			accountType: user.accountType,
		};

		sendTokenResponse(userObject, 200, res);
	});
});

// @desc    Delete profile photo
// @route   GET /api/v1/auth/delete-user-image
// @access  Private
exports.deleteUserImage = asyncHandler(async (req, res, next) => {
	const user = await User.findByPk(res.locals.user.id);

	const currentFilePath = `${process.env.FILE_UPLOAD_PATH}/profile_photos/${user.imageUrn}`;

	fs.unlinkSync(currentFilePath);

	user.imageUrn = null;
	user.save();

	const userObject = {
		id: user.id,
		username: user.username,
		email: user.email,
		imageUrl: user.imageUrl,
		accountType: user.accountType,
	};

	sendTokenResponse(userObject, 200, res);
});
