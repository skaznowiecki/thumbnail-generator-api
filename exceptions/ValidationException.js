class ValidationException extends Error {
  constructor(message) {
    super(message);
    this.status = 422
  }

  statusCode() {
    return this.status
  }
}



module.exports = ValidationException;