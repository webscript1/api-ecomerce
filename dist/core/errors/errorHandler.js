"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = exports.UnauthorizedError = exports.ValidationError = exports.ResourceAlreadyExistsError = exports.DatabaseError = exports.NotFoundError = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        // Necesario para extender la clase Error en TypeScript
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
exports.CustomError = CustomError;
class NotFoundError extends CustomError {
    constructor(message = 'Resource not found', details) {
        let messageError = details ? `${message}': '${details}` : message;
        super(messageError, 404);
    }
}
exports.NotFoundError = NotFoundError;
class DatabaseError extends CustomError {
    constructor(message = 'Database operation failed', details) {
        let messageError = details ? `${message}': '${details}` : message;
        super(messageError, 500);
    }
}
exports.DatabaseError = DatabaseError;
class ResourceAlreadyExistsError extends CustomError {
    constructor(message = 'Resource already exists', details) {
        let messageError = details ? `${message}': '${details}` : message;
        super(messageError, 409); // Código de estado 409 (Conflict)
    }
}
exports.ResourceAlreadyExistsError = ResourceAlreadyExistsError;
class ValidationError extends CustomError {
    constructor(message = 'Invalid input', details) {
        let messageError = details ? `${message}': '${details}` : message;
        super(messageError, 400); //
    }
}
exports.ValidationError = ValidationError;
class UnauthorizedError extends CustomError {
    constructor(message = 'Authentication required', details) {
        let messageError = details ? `${message}': '${details}` : message;
        super(messageError, 401); // Código de estado 409 (Conflict)
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends CustomError {
    constructor(message = 'Access denied', details) {
        let messageError = details ? `${message}': '${details}` : message;
        super(messageError, 403); // Código de estado 409 (Conflict)
    }
}
exports.ForbiddenError = ForbiddenError;
//# sourceMappingURL=errorHandler.js.map