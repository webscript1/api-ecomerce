"use strict";
'uset strict';
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
exports.verifyToken = exports.tokenSing = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
const timeExpires = process.env.TIME_EXPIRES_SESSION || '60h';
// Asegurarte de que la variable JWT_SECRET nunca sea undefined
if (!JWT_SECRET) {
    throw new Error('La variable JWT_SECRET no está definida');
}
/**
 * firmar data con jwt
 * @param user
 * @returns
 */
//user es el objeto del usuario a firmar
const tokenSing = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //firmar token
        const sign = jsonwebtoken_1.default.sign({
            id: user.id,
            role: user.role,
        }, JWT_SECRET, {
            expiresIn: timeExpires,
        });
        return sign;
    }
    catch (error) {
        console.error('error al firmar token: ', error);
        throw error;
    }
});
exports.tokenSing = tokenSing;
/**
 * veridicar el JWT
 * @param tokenJwt
 * @returns
 */
//Verificar el token de session
const verifyToken = (tokenJwt) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return jsonwebtoken_1.default.verify(tokenJwt, JWT_SECRET);
    }
    catch (e) {
        //console.error('error  al verificar token: ', e);
        return e;
    }
});
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwt.handller.js.map