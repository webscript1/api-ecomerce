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
const jwt_1 = require("../core/utils/jwt");
const users_1 = __importDefault(require("../models/users"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //comprobando que halla un token de autorizacion
        if (!req.headers.authorization) {
            return res.status(401).json({ message: 'no autorizado' }); // Enviar una respuesta JSON y luego salir
        }
        const token = req.headers.authorization.split(' ').pop();
        //verificando que el token existe
        if (token) {
            //verificando que el token sea valido
            const dataToken = (yield (0, jwt_1.verifyToken)(token));
            // console.log('data token')
            //veridicando que el token tenga la id del usuario
            if (!dataToken.id) {
                return res.status(401).json({ message: 'Session invalid' }); // Enviar una respuesta JSON y luego salir
            }
            //buscando el usuario
            // const objectId: Types.ObjectId = Types.ObjectId.createFromHexString(dataToken.id);
            const user = yield users_1.default.findById(dataToken.id);
            //sielusuario existe , agregarlo a las respuetas del body
            if (user) {
                // Agregar la propiedad 'user' al objeto req
                req.body.user = user;
                next(); // Llamar a next() para pasar al siguiente middleware o controlador
            }
            else {
                return res.status(401).json({ message: 'Usuario no encontrado' }); // Enviar una respuesta JSON y luego salir
            }
        }
    }
    catch (error) {
        console.error('error token session: ', error);
        return res.status(500).json({ message: 'Error interno del servidor' }); // Enviar una respuesta JSON y luego salir
    }
});
exports.default = authMiddleware;
//# sourceMappingURL=sesion.js.map