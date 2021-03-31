const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (request, response) => {
	const { username, password } = request.body;
	let errors = {};

	try {
		if (username.trim() === "")
			errors.username = "El nombre de usuario no puede estar vacío.";

		if (password.trim() === "")
			errors.password = "La contraseña no puede estar vacía.";

		if (Object.keys(errors).length > 0) throw errors;

		const user = await User.findOne({
			where: { username },
		});

		if (!user) {
			errors.general = "Nombre de usuario y/o contraseña incorrecta.";
			throw errors;
		}

		const correctPassword = await bcrypt.compare(password, user.password);

		if (!correctPassword) {
			errors.general = "Nombre de usuario y/o contraseña incorrecta.";
			throw errors;
		}

		const userObject = {
			id: user.id,
			username: user.username,
			email: user.email,
			imageUrl: user.imageUrl,
		};

		const token = jwt.sign(userObject, process.env.JWT_SECRET);

		return response.status(200).json({
			...userObject,
			token,
		});
	} catch (error) {
		console.log(error);
		return response.status(500).json({ error: error });
	}
};

exports.loginWithGoogle = async (request, response) => {
	const { displayName, email, photoURL } = request.body;
	let errors = {};
	let user;

	try {
		if (displayName.trim() === "")
			errors.displayName = "El nombre de usuario no puede estar vacío.";

		if (email.trim() === "")
			errors.email = "El correo no puede estar vacío.";

		if (Object.keys(errors).length > 0) throw errors;

		user = await User.findOne({
			where: { email },
		});

		if (!user) {
			user = await User.create({
				username: displayName,
				email,
			});
		}

		const userObject = {
			id: user.id,
			username: user.username,
			email: user.email,
			imageUrl: photoURL,
		};

		const token = jwt.sign(userObject, process.env.JWT_SECRET);

		return response.status(200).json({
			...userObject,
			token,
		});
	} catch (error) {
		console.log(error);
		return response.status(500).json({ error: error });
	}
};

exports.register = async (request, response) => {
	let { email, username, password, confirmPassword } = request.body;
	let errors = {};

	try {
		if (username.trim() === "")
			errors.username = "El nombre de usuario no puede estar vacío.";

		if (email.trim() === "")
			errors.email = "El email no puede estar vacío.";

		if (password.trim() === "")
			errors.password = "La contraseña no puede estar vacía.";

		if (password !== confirmPassword)
			errors.confirmPassword = "Las contraseñas no coinciden.";

		if (Object.keys(errors).length > 0) throw errors;

		password = await bcrypt.hash(password, 6);

		const user = await User.create({
			username,
			email,
			password,
		});

		const userObject = {
			id: user.id,
			username: user.username,
			email: user.email,
			imageUrl: user.imageUrl,
		};

		const token = jwt.sign(userObject, process.env.JWT_SECRET);

		return response.status(200).json({
			...userObject,
			token,
		});
	} catch (error) {
		console.log(error);
		return response.status(500).json({ error: error });
	}
};
