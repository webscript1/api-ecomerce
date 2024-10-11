"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orders_controller = void 0;
const orders_1 = require("../core/services/orders");
const user_service = new orders_1.OrdersService();
exports.orders_controller = {
    create: (req, res, next) => {
        user_service
            .createOrder(req)
            .then((data) => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    get: (req, res, next) => {
        user_service
            .getOrder(req)
            .then((data) => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    update: (req, res, next) => {
        user_service
            .updateOrder(req)
            .then((data) => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    delete: (req, res, next) => {
        user_service
            .deleteOrder(req)
            .then((data) => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    get_all: (req, res, next) => {
        user_service
            .getOrders(req)
            .then((data) => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    delete_all: (req, res, next) => {
        user_service
            .deleteAllOrder(req)
            .then((data) => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    detailUserAndOrders: (req, res, next) => {
        user_service
            .detailUserAndOrders(req)
            .then((data) => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
};
//# sourceMappingURL=orders.js.map