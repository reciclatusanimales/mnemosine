class ErrorResponse extends Error {
	constructor(message, statusCode, info) {
		super(message);
		this.statusCode = statusCode;
		this.info = info;
	}
}

module.exports = ErrorResponse;
