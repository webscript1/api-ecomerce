"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payment_controller = void 0;
const payment__service_1 = require("../core/services/payment,.service");
const payment_service = new payment__service_1.PaymentService();
exports.payment_controller = {
    create: (req, res, next) => {
        payment_service
            .createPayment(req, res)
            .then((data) => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    get: (req, res, next) => {
        payment_service
            .getPayment(req, res)
            .then((data) => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    update: (req, res, next) => {
        payment_service
            .updatePayment(req, res)
            .then((data) => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    delete: (req, res, next) => {
        payment_service
            .deletePayment(req, res)
            .then((data) => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    delete_all: (req, res, next) => {
        payment_service
            .deleteAllPayment(req, res)
            .then((data) => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
};
//# sourceMappingURL=payment.controller.js.map