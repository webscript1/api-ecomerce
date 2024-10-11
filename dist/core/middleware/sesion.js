"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_handller_1 = require("../handlers/jwt.handller");
const users_1 = __importDefault(require("../../models/users"));
const errorHandler_1 = require("../handlers/errorHandler");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Comprobando que haya un token de autorización
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new errorHandler_1.ValidationError('Missing session token');
        }
        const token = authHeader.split(' ')[1]; // Asumiendo que el formato es "Bearer token"
        // Verificando que el token sea válido
        const dataToken = (yield (0, jwt_handller_1.verifyToken)(token));
        // Verificando que el token tenga la id del usuario
        if (!dataToken || !dataToken.id) {
            throw new errorHandler_1.UnauthorizedError('Session invalid');
        }
        if (req.body) {
            // Buscando el usuario
            const user = yield users_1.default.findById(dataToken.id);
            if (!user) {
                throw new errorHandler_1.NotFoundError('Usuario no encontrado');
            }
            // Agregar la propiedad 'user' al objeto req
            req.body.user = user;
        }
        next(); // Llamar a next() para pasar al siguiente middleware o controlador
    }
    catch (error) {
        next(error); // Pasa el error al middleware de manejo de errores
    }
});
exports.default = authMiddleware;
//# sourceMappingURL=sesion.js.map