const jwt = require("jsonwebtoken");
const sharp = require("sharp");
const fs = require("fs");

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
