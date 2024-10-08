"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carts_1 = require("../controllers/carts");
const sesion_1 = __importDefault(require("../middleware/sesion"));
const carts_validatir_1 = require("../middleware/validators/carts.validatir");
const router = (0, express_1.Router)();
router.post('/', carts_validatir_1.validator_cart, sesion_1.default, carts_1.cars_controller.create);
router.get('/:code', sesion_1.default, carts_1.cars_controller.get);
router.get('/', sesion_1.default, carts_1.cars_controller.get_all);
router.put('/qty', sesion_1.default, carts_1.cars_controller.updateQtyCart);
router.put('/:id', sesion_1.default, carts_1.cars_controller.update);
router.delete('/:id', sesion_1.default, carts_1.cars_controller.delete);
router.delete('/delete/all', sesion_1.default, carts_1.cars_controller.delete_all);
exports.default = router;
//# sourceMappingURL=carts.js.map