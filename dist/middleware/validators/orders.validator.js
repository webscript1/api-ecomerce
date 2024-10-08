"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator_create_order = void 0;
const express_validator_1 = require("express-validator");
const validator_1 = __importDefault(require("../../core/utils/validator"));
exports.validator_create_order = [
    (0, express_validator_1.check)('products')
        .exists()
        .withMessage('Los productos son requeridos.')
        .notEmpty()
        .withMessage('Los productos no pueden estar vacíos.')
        .isArray({ min: 1 })
        .withMessage('Debe haber al menos un producto.')
        .custom(products => {
        for (let product of products) {
            if (typeof product.name !== 'string' || product.name.trim() === '') {
                throw new Error('El ID del producto no es válido.');
            }
            if (typeof product.name !== 'string' || product.name.trim() === '') {
                throw new Error('El nombre del producto es requerido y debe ser una cadena no vacía.');
            }
            if (typeof product.price !== 'number' || product.price <= 0) {
                throw new Error('El precio del producto debe ser un número positivo.');
            }
            if (typeof product.imageUrl !== 'string' ||
                product.imageUrl.trim() === '') {
                throw new Error('La URL de la imagen del producto es requerida y debe ser una cadena no vacía.');
            }
            if (typeof product.path !== 'string' || product.path.trim() === '') {
                throw new Error('La ruta del producto es requerida y debe ser una cadena no vacía.');
            }
        }
        return true;
    }),
    (0, express_validator_1.check)('metodoPago')
        .optional()
        .custom(metodoPago => {
        if (metodoPago) {
            if (typeof metodoPago.metodo !== 'string' ||
                metodoPago.metodo.trim() === '') {
                throw new Error('El método de pago es requerido y debe ser una cadena no vacía.');
            }
            if (typeof metodoPago.walletReceptora !== 'string' ||
                metodoPago.walletReceptora.trim() === '') {
                throw new Error('La wallet receptora es requerida y debe ser una cadena no vacía.');
            }
            if (typeof metodoPago.walletEmisora !== 'string' ||
                metodoPago.walletEmisora.trim() === '') {
                throw new Error('La wallet emisora es requerida y debe ser una cadena no vacía.');
            }
            if (typeof metodoPago.hash !== 'string' ||
                metodoPago.hash.trim() === '') {
                throw new Error('El hash es requerido y debe ser una cadena no vacía.');
            }
        }
        return true;
    }),
    (0, express_validator_1.check)('totalAmount')
        .exists()
        .withMessage('El monto total es requerido.')
        .isNumeric()
        .withMessage('El monto total debe ser un número.')
        .custom(value => {
        if (value <= 0) {
            throw new Error('El monto total debe ser un número positivo.');
        }
        return true;
    }),
    (0, express_validator_1.check)('totalConDescuento')
        .optional()
        .isNumeric()
        .withMessage('El monto total con descuento debe ser un número.')
        .custom((value, { req }) => {
        if (value && value > req.body.totalAmount) {
            throw new Error('El monto total con descuento no puede ser mayor que el monto total.');
        }
        return true;
    }),
    (0, express_validator_1.check)('cupon')
        .optional()
        .custom(cupon => {
        if (cupon) {
            console.log('cupon: ', cupon);
            if (typeof cupon.codigo !== 'string') {
                throw new Error('El código del cupón es requerido y debe ser una cadena ');
            }
            if (typeof cupon.descuento !== 'number' || cupon.descuento < 0) {
                throw new Error('El descuento del cupón debe ser un número positivo.');
            }
            if (typeof cupon.count !== 'number' || cupon.count < 0) {
                throw new Error('El conteo del cupón debe ser un número positivo.');
            }
            if (typeof cupon.limit !== 'boolean') {
                throw new Error('El límite del cupón debe ser un valor booleano.');
            }
        }
        return true;
    }),
    (0, express_validator_1.check)('porcentajeDescuentoCupon')
        .optional()
        .isNumeric()
        .withMessage('El porcentaje de descuento del cupón debe ser un número.')
        .custom(value => {
        if (value < 0 || value > 100) {
            throw new Error('El porcentaje de descuento del cupón debe estar entre 0 y 100.');
        }
        return true;
    }),
    (0, express_validator_1.check)('status')
        .optional()
        .isIn(['pending', 'completed', 'cancelled'])
        .withMessage('El estado de la orden no es válido.'),
    (req, res, next) => {
        return (0, validator_1.default)(req, res, next);
    },
];
//# sourceMappingURL=orders.validator.js.map