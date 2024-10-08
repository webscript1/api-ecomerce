"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validationResults = (req, res, next) => {
    try {
        (0, express_validator_1.validationResult)(req).throw();
        return next();
    }
    catch (error) {
        res.status(400); // o res.status(422);
        res.send({ errors: error.array() });
    }
};
exports.default = validationResults;
//# sourceMappingURL=validator.js.map