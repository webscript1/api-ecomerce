"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller_cupon = void 0;
const cupon_service_1 = require("../core/services/cupon.service");
const cuponService = new cupon_service_1.CuponService();
exports.controller_cupon = {
    create: (req, res, next) => {
        cuponService
            .createCupon(req, res)
            .then(data => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    get: (req, res, next) => {
        cuponService
            .getCupon(req, res)
            .then(data => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    getAll: (req, res, next) => {
        cuponService
            .getCupones(req, res)
            .then(data => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    update: (req, res, next) => {
        cuponService
            .updateCupon(req, res)
            .then(data => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    delete: (req, res, next) => {
        cuponService
            .deleteCupon(req, res)
            .then(data => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    deleteAll: (req, res, next) => {
        cuponService
            .delete_all(req, res)
            .then(data => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
};
//# sourceMappingURL=cupon.controller.js.map