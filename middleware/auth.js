const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("./async");

exports.auth = asyncHandler(async (req, res, next) => {
	let token;

	if (req.headers.authorization) {
		token = req.headers.authorization.split("Bearer ")[1];
	}

	if (!token) {
		return next(
			new ErrorResponse("No estás autorizado para ver esta ruta.", 401)
		);
	}

	try {
		jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
			res.locals.user = decodedToken;
		});

		next();
	} catch (error) {
		return next(
			new ErrorResponse("No estás autorizado para ver esta ruta.", 401)
		);
	}
});
