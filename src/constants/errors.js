const ERRORS = {
	// AUTHENTICATION
	INVALID_CREDENTIALS: "Invalid email or password",
	UNAUTHORIZED: "Unauthorized access",
	TOKEN_EXPIRED: "Token expired, please login again",
	TOKEN_INVALID: "Invalid token",
	TOKEN_MISSING: "Token missing",

	// USER
	USER_NOT_FOUND: "User not found",
	EMAIL_ALREADY_EXISTS: "An account with this email already exists. Try logging in.",

	// LIST
	LIST_NOT_FOUND: "This list no longer exists or you don't have permission to access it.",
	LIST_TITLE_REQUIRED: "Add a title before adding the list.",
	LIST_ALREADY_EXISTS: "A list with this title already exists in your account.",

	// TASK
	TASK_NOT_FOUND: "This task no longer exists or you don't have permission to access it.",
	TASK_TITLE_REQUIRED: "Add a title before adding the task.",
	TASK_ALREADY_EXISTS: "A task with this title already exists in the list.",

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