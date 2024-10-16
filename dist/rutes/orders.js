"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_1 = require("../controllers/orders");
const sesion_1 = __importDefault(require("../core/middleware/sesion"));
const orders_validator_1 = require("../core/middleware/validators/orders.validator");
const router = (0, express_1.Router)();
router.post('/', orders_validator_1.validator_create_order, sesion_1.default, orders_1.orders_controller.create);
router.get('/', orders_1.orders_controller.get);
router.get('/all', sesion_1.default, orders_1.orders_controller.get_all);
router.put('/:id', sesion_1.default, orders_1.orders_controller.update);
router.delete('/:id', sesion_1.default, orders_1.orders_controller.delete);
router.delete('/delete/all', sesion_1.default, orders_1.orders_controller.delete_all);
router.get('/detail-user-and-orders', sesion_1.default, orders_1.orders_controller.detailUserAndOrders);
exports.default = router;
//# sourceMappingURL=orders.js.map