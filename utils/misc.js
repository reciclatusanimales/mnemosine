const jwt = require("jsonwebtoken");
const sharp = require("sharp");
const fs = require("fs");
const axios = require("axios");

// Get token from model, create cookie and send response
exports.sendTokenResponse = (user, statusCode, res) => {
	// Create token
	const token = jwt.sign(user, process.env.JWT_SECRET);

	const options = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
	};

	if (process.env.NODE_ENV === "production") {
		options.secure = true;
	}

	res.status(statusCode)
		.cookie("token", token, options)
		.json({ success: true, data: { user, token } });
};

exports.resizeImage = async (filename, inPath, outPath, remove = true) => {
	try {
		await sharp(inPath).resize({ width: 100, height: 100 }).toFile(outPath);

		if (remove) fs.unlinkSync(inPath);
	} catch (err) {
		console.error(err);
	}
};

exports.sendEmail = async ({ email, name, type, params = {} }) => {
	const template_slug = `mnemosine_${type}`;

	const data = {
		from: email,
		name,
		template_slug,
		type,
		params,
	};

	axios
		.post(`${process.env.EMAIL_SENDER_URL}`, data, {
			headers: {
				"Content-Type": "application/json",
				"api-key": process.env.EMAIL_SENDER_API_KEY,
			},
		})
		.then((response) => {
			if (response.data.success) {
				console.log("SUCCESS");
			} else {
				console.log(response.data);
			}
		})
		.catch((error) => console.log(error.message))
		.finally(() => console.log("ENDED"));
};
