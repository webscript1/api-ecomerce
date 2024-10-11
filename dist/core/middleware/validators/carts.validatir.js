"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator_cart = void 0;
const express_validator_1 = require("express-validator");
const mongoose_1 = __importDefault(require("mongoose"));
const validator_hadler_1 = require("../../handlers/validator.hadler");
exports.validator_cart = [
    (0, express_validator_1.body)('products')
        .isObject()
        .withMessage('La propiedad products debe ser un objeto.')
        .custom(products => {
        if (!products.productId) {
            throw new Error('El objeto products debe contener un productId.');
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(products.productId)) {
            throw new Error(`El ID de producto ${products.productId} no es válido.`);
        }
        if (typeof products.quantity !== 'number' || products.quantity <= 0) {
            throw new Error('La cantidad debe ser un número positivo.');
        }
        return true;
    }), //.withMessage('El campo products debe tener una estructura válida.'),
    (req, res, next) => {
        return (0, validator_hadler_1.validationResults)(req, res, next);
    },
];
//# sourceMappingURL=carts.validatir.js.map