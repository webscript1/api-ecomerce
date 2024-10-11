"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator_create_product = void 0;
const express_validator_1 = require("express-validator");
const validator_hadler_1 = require("../../handlers/validator.hadler");
exports.validator_create_product = [
    (0, express_validator_1.check)('name')
        .exists()
        .withMessage('El campo nombre es obligatorio.')
        .notEmpty()
        .withMessage('El nombre no puede estar vacío.')
        .isString()
        .withMessage('El nombre debe ser una cadena de caracteres.')
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres.'),
    (0, express_validator_1.check)('description')
        .exists()
        .withMessage('El campo descripción es obligatorio.')
        .isString()
        .withMessage('La descripción debe ser una cadena de caracteres.')
        .isLength({ min: 0, max: 500 })
        .withMessage('La descripción no puede exceder los 500 caracteres.'),
    (0, express_validator_1.check)('price')
        .exists()
        .withMessage('El campo precio es obligatorio.')
        .notEmpty()
        .withMessage('El precio no puede estar vacío.')
        .isNumeric()
        .withMessage('El precio debe ser un número.')
        .isLength({ min: 1, max: 100 })
        .withMessage('El precio debe tener entre 1 y 100 unidades.'),
    (0, express_validator_1.check)('category')
        .exists()
        .withMessage('El campo categoría es obligatorio.')
        .notEmpty()
        .withMessage('La categoría no puede estar vacía.')
        .isString()
        .withMessage('La categoría debe ser una cadena de caracteres.')
        .isLength({ min: 2, max: 30 })
        .withMessage('La categoría debe tener entre 2 y 30 caracteres.'),
    (0, express_validator_1.check)('quantity')
        .exists()
        .withMessage('El campo cantidad es obligatorio.')
        .notEmpty()
        .withMessage('La cantidad no puede estar vacía.')
        .isNumeric()
        .withMessage('La cantidad debe ser un número.')
        .isLength({ min: 1, max: 50 })
        .withMessage('La cantidad debe tener entre 1 y 50 unidades.'),
    (0, express_validator_1.check)('imageUrl')
        .exists()
        .withMessage('El campo URL de la imagen es obligatorio.')
        .notEmpty()
        .withMessage('La URL de la imagen no puede estar vacía.')
        .isString()
        .withMessage('La URL de la imagen debe ser una cadena de caracteres.')
        .isLength({ min: 1, max: 1000 })
        .withMessage('La URL de la imagen debe tener entre 1 y 1000 caracteres.'),
    (req, res, next) => {
        return (0, validator_hadler_1.validationResults)(req, res, next);
    },
];
//# sourceMappingURL=products..validator.js.map