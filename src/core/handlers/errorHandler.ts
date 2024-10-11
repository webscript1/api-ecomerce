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
  constructor(message = 'Resource not found', details?: string) {
    const messageError = details ? `${message}': '${details}` : message;
    super(messageError, 404);
  }
}
export class DatabaseError extends CustomError {
  constructor(message = 'Database operation failed', details?: string) {
    const messageError = details ? `${message}': '${details}` : message;
    super(messageError, 500);
  }
}
export class ResourceAlreadyExistsError extends CustomError {
  constructor(message = 'Resource already exists', details?: string) {
    const messageError = details ? `${message}': '${details}` : message;
    super(messageError, 409); // Código de estado 409 (Conflict)
  }
}
export class ValidationError extends CustomError {
  constructor(message = 'Invalid input', details?: string) {
    const messageError = details ? `${message}': '${details}` : message;
    super(messageError, 400); //
  }
}
export class UnauthorizedError extends CustomError {
  constructor(message = 'Authentication required', details?: string) {
    const messageError = details ? `${message}': '${details}` : message;
    super(messageError, 401); // Código de estado 409 (Conflict)
  }
}

export class ForbiddenError extends CustomError {
  constructor(message = 'Access denied', details?: string) {
    const messageError = details ? `${message}': '${details}` : message;
    super(messageError, 403); // Código de estado 409 (Conflict)
  }
}
export class TooManyRequestsError extends CustomError {
  constructor(
    message = 'Demasiadas solicitudes desde esta IP, por favor intenta más tarde.',
    details?: string,
  ) {
    const messageError = details ? `${message}': '${details}` : message;
    super(messageError, 429); // Código de estado 409 (Conflict)
  }
}
