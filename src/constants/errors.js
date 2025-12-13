const ERRORS = {
	// AUTHENTICATION
	INVALID_CREDENTIALS: "Invalid email or password",
	UNAUTHORIZED: "Unauthorized access",
	TOKEN_EXPIRED: "Token expired, please login again",
	TOKEN_INVALID: "Invalid token",
	TOKEN_MISSING: "Token missing",

	// USER
	USER_NOT_FOUND: "User not found",
	EMAIL_ALREADY_EXISTS: "Email is already registered",

	// LIST
	LIST_NOT_FOUND: "List not found",
	LIST_TITLE_REQUIRED: "List title is required",

	// TASK
	TASK_NOT_FOUND: "Task not found",
	TASK_TITLE_REQUIRED: "Task title is required",

	// GENERAL
	INVALID_ID: "Invalid ID",
	VALIDATION_FAILED: "Validation failed",
	BAD_REQUEST: "Bad request",
	INTERNAL_ERROR: "Internal server error",
	MISSING_FIELDS: "Required fields missing",
	DUPLICATE_DATA: "Duplicate data exists",
	INVALID_JSON: "Invalid JSON payload",
};

export default ERRORS;