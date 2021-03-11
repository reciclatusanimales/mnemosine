const jwt = require("jsonwebtoken");

exports.auth = (request, response, next) => {
	try {
		let token;

		if (request.headers.authorization) {
			token = request.headers.authorization.split("Bearer ")[1];
		}

		if (token) {
			jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
				response.locals.user = decodedToken;
			});
		}

		if (!response.locals.user) throw new Error("Unauthenticated.");

		return next();
	} catch (error) {
		console.error(error);
		return response.status(401).json({ error: "Unauthenticated." });
	}
};
