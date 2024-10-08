export class CustomError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    // Necesario para extender la clase Error en TypeScript
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
export class NotFoundError extends CustomError {
  constructor(message = 'Resource not found', details?: any) {
    let messageError = details ? `${message}': '${details}` : message;
    super(messageError, 404);
  }
}
export class DatabaseError extends CustomError {
  constructor(message = 'Database operation failed', details?: any) {
    let messageError = details ? `${message}': '${details}` : message;
    super(messageError, 500);
  }
}
export class ResourceAlreadyExistsError extends CustomError {
  constructor(message = 'Resource already exists', details?: any) {
    let messageError = details ? `${message}': '${details}` : message;
    super(messageError, 409); // Código de estado 409 (Conflict)
  }
}
export class ValidationError extends CustomError {
  constructor(message = 'Invalid input', details?: any) {
    let messageError = details ? `${message}': '${details}` : message;
    super(messageError, 400); //
  }
}
export class UnauthorizedError extends CustomError {
  constructor(message = 'Authentication required', details?: any) {
    let messageError = details ? `${message}': '${details}` : message;
    super(messageError, 401); // Código de estado 409 (Conflict)
  }
}

export class ForbiddenError extends CustomError {
  constructor(message = 'Access denied', details?: any) {
    let messageError = details ? `${message}': '${details}` : message;
    super(messageError, 403); // Código de estado 409 (Conflict)
  }
}
