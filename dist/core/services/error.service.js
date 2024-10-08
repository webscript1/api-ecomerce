"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenExpirado = exports.TokenInvalid = exports.TokenError = void 0;
class TokenError extends Error {
    constructor(message) {
        super(message);
        this.name = 'TokenError'; // Nombre específico para este error
    }
}
exports.TokenError = TokenError;
class TokenInvalid extends Error {
    constructor(message) {
        super(message);
        this.name = 'TokenInvalid'; // Nombre específico para este error
    }
}
exports.TokenInvalid = TokenInvalid;
class TokenExpirado extends Error {
    constructor(message) {
        super(message);
        this.name = 'TokenExpirado'; // Nombre específico para este error
    }
}
exports.TokenExpirado = TokenExpirado;
//# sourceMappingURL=error.service.js.map