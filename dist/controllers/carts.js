"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cars_controller = void 0;
const cars_1 = require("../core/services/cars");
const cart_service = new cars_1.CartService();
exports.cars_controller = {
    create: (req, res, next) => {
        cart_service
            .createCart(req, res)
            .then((data) => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    get: (req, res, next) => {
        cart_service
            .getCart(req, res)
            .then((data) => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    update: (req, res, next) => {
        cart_service
            .updateCart(req, res)
            .then((data) => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    delete: (req, res, next) => {
        cart_service
            .deleteCart(req, res)
            .then((data) => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    get_all: (req, res, next) => {
        cart_service
            .getCarts(req, res)
            .then((data) => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    delete_all: (req, res, next) => {
        cart_service
            .deleteAllCarts(req, res)
            .then((data) => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    updateQtyCart: (req, res, next) => {
        cart_service
            .updateQtyCart(req)
            .then((data) => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
};
//# sourceMappingURL=carts.js.map