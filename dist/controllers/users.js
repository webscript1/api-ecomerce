"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_controller = void 0;
const user_1 = require("../core/services/user");
const user_service = new user_1.User_service();
exports.user_controller = {
    test: (req, res, next) => {
        user_service
            .test()
            .then((data) => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    create: (req, res, next) => {
        user_service
            .create(req, res)
            .then((data) => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    get: (req, res, next) => {
        user_service
            .get(req, res)
            .then((data) => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    update: (req, res, next) => {
        user_service
            .update(req, res)
            .then((data) => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    delete: (req, res, next) => {
        user_service
            .delete(req, res)
            .then((data) => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    deleteAll: (req, res, next) => {
        user_service
            .deleteAll(req, res)
            .then((data) => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    sing_in: (req, res, next) => {
        user_service
            .sing_in(req, res)
            .then((data) => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    detailUserAndOrders: (req, res, next) => {
        user_service
            .detailUserAndOrders(req, res)
            .then((data) => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
};
//# sourceMappingURL=users.js.map