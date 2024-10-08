"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = require("../controllers/payment.controller");
const sesion_1 = __importDefault(require("../middleware/sesion"));
const roles_1 = require("../middleware/roles");
const router = (0, express_1.Router)();
router.post('/', sesion_1.default, (0, roles_1.checkRole)(['admin']), payment_controller_1.payment_controller.create);
router.get('/:id', payment_controller_1.payment_controller.get);
router.get('/', payment_controller_1.payment_controller.get_all);
router.put('/:id', sesion_1.default, (0, roles_1.checkRole)(['admin']), payment_controller_1.payment_controller.update);
router.delete('/:id', sesion_1.default, (0, roles_1.checkRole)(['admin']), payment_controller_1.payment_controller.delete);
router.delete('/', sesion_1.default, (0, roles_1.checkRole)(['admin']), payment_controller_1.payment_controller.delete_all);
exports.default = router;
//# sourceMappingURL=payment.rutes.js.map