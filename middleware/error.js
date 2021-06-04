const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
	let error = { ...err };
	let status = err.statusCode;
	let message = err.message;
	const { info } = err;

	if (err.name === "CastError") {
		message = `Resource not found with id of ${err.value}.`;
		status = 404;
	} else if (err.code === 11000) {
		message = "Duplicate resource.";
		status = 400;
	} else if (err.name === "ValidationError") {
		message = Object.values(err.errors).map((e) => e.message);
		status = 400;
	}

	console.log(error);

	error = new ErrorResponse(message, status);
	res.status(status || 500).json({
		success: false,
		error: message || "Server Error",
		info,
	});
};

module.exports = errorHandler;
