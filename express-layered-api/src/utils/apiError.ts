export class ApiError extends Error {
  statusCode: number;
  constructor(statusCode = 500, message = "Internal Server Error") {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
