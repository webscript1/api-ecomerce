"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.limiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const errorHandler_1 = require("../../handlers/errorHandler");
// Limitar a 100 solicitudes por IP cada 15 minutos
exports.limiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000, // 15 minutos
    max: 2500, // máximo 100 solicitudes por IP
    message: 'Demasiadas solicitudes desde esta IP, por favor intenta más tarde.',
    handler: (req, res, next) => {
        next(new errorHandler_1.TooManyRequestsError('Demasiadas solicitudes desde esta IP, por favor intenta más tarde.'));
    },
});
//# sourceMappingURL=errorLimiter.middleware.js.map