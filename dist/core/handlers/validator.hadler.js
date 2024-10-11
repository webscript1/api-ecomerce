"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationResults = void 0;
const express_validator_1 = require("express-validator");
const validationResults = (req, res, next) => {
    try {
        (0, express_validator_1.validationResult)(req).throw();
        return next();
    }
    catch (error) {
        if (error instanceof express_validator_1.Result) {
            // Verifica si el error es una instancia de Result (express-validator)
            res.status(400); // o res.status(422) dependiendo de tu caso
            return res.json({ errors: error.array() });
        }
        else {
            // En caso de otro tipo de error, manejar de forma genérica
            res.status(500).json({ message: 'Error desconocido en la validación' });
        }
    }
};
exports.validationResults = validationResults;
//# sourceMappingURL=validator.hadler.js.map