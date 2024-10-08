"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.valitador_sing_up = exports.valitador_sing_in = void 0;
const express_validator_1 = require("express-validator");
const validator_1 = __importDefault(require("../../core/utils/validator"));
exports.valitador_sing_in = [
    (0, express_validator_1.check)('email', 'El correo electrónico es requerido y debe tener un formato válido')
        .exists()
        .notEmpty()
        .isEmail()
        .isLength({ min: 3, max: 100 }),
    (0, express_validator_1.check)('password', 'La contraseña es requerida y debe tener al menos 4 caracteres')
        .exists()
        .notEmpty()
        .isString()
        .isLength({ min: 4, max: 100 }),
    (req, res, next) => {
        return (0, validator_1.default)(req, res, next);
    },
];
exports.valitador_sing_up = [
    (0, express_validator_1.check)('firstName', 'El nombre es requerido y debe ser una cadena de texto de entre 2 y 30 caracteres')
        .exists()
        .notEmpty()
        .isString()
        .isLength({ min: 2, max: 30 }),
    (0, express_validator_1.check)('lastName', 'El apellido es requerido y debe ser una cadena de texto de entre 2 y 30 caracteres')
        .exists()
        .notEmpty()
        .isString()
        .isLength({ min: 2, max: 30 }),
    (0, express_validator_1.check)('email', 'El correo electrónico es requerido y debe tener un formato válido')
        .exists()
        .notEmpty()
        .isEmail()
        .isLength({ min: 3, max: 100 }),
    (0, express_validator_1.check)('password', 'La contraseña es requerida y debe tener entre 4 y 30 caracteres')
        .exists()
        .notEmpty()
        .isString()
        .isLength({ min: 4, max: 30 }),
    (0, express_validator_1.check)('phone', 'El número de teléfono es requerido y debe tener entre 4 y 30 caracteres')
        .exists()
        .notEmpty()
        .isString()
        .isLength({ min: 4, max: 30 }),
    (req, res, next) => {
        return (0, validator_1.default)(req, res, next);
    },
];
//# sourceMappingURL=user.validator.js.map