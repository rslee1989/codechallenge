const BaseResponse = require("./BaseResponse");

class ErrorResponse extends BaseResponse {
  constructor(err) {
    super();
    this.isSuccessful = false;

    if (typeof msg === "string") {
      this.errors = [err];
    }
    if (err instanceof Error) {
      // Output expected TypeErrors.
      this.errors = [
        `${err.message}:${err.stack}
      `
      ];
    } else {
      this.errors = err;
    }
  }
}

module.exports = ErrorResponse;
