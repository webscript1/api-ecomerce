"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler_1 = require("../../core/errors/errorHandler");
const errorHandler = (err, req, res, next) => {
    if (err instanceof errorHandler_1.CustomError) {
        console.log('dddddddddddddddddddddddddddddddddddddddddddddd');
        // Errores personalizados
        res.status(err.statusCode).send({ message: err.message });
    }
    else {
        // Errores generales
        console.error(err); // Loguea el error para referencia interna
        res.status(500).send({
            message: 'Internal Server Error',
            error: process.env.NODE_ENV === 'development' ? err : {},
        });
    }
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map