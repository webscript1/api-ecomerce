"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller_product = void 0;
const products_1 = require("../core/services/products");
const produtcs = new products_1.ProductService();
exports.controller_product = {
    test: (req, res, next) => {
        produtcs
            .test()
            .then(data => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    create: (req, res, next) => {
        produtcs
            .create(req)
            .then(data => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    get: (req, res, next) => {
        produtcs
            .get(req)
            .then(data => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    update: (req, res, next) => {
        produtcs
            .update(req)
            .then(data => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    delete: (req, res, next) => {
        produtcs
            .delete(req)
            .then(data => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    delete_all: (req, res, next) => {
        produtcs
            .delete_all()
            .then(data => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
};
//# sourceMappingURL=products.js.map