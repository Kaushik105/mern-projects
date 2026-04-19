class ApiError extends Error {
	constructor(
		statusCode,
		message = "something went wrong",
		errors = [],
		stack = ""
	) {
		super(message);
		this.data = null;
		this.message = message;
		this.statusCode = statusCode;
		this.errors = errors;
		this.success = false;

		if (stack) {
			this.stack = stack;
		} else {
			Error.captureStackTrace(this, this, constructor);
		}

    Object.defineProperty(this, "message", {
			value: message,
			enumerable: true, // 👈 Key change
			writable: true,
			configurable: true,
		});
	}
}

export { ApiError };
