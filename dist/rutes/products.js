"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = require("../controllers/products");
const sesion_1 = __importDefault(require("../middleware/sesion"));
const products__validator_1 = require("../middleware/validators/products..validator");
const roles_1 = require("../middleware/roles");
const router = (0, express_1.Router)();
router.get('/test', products_1.controller_product.test);
router.post('/', products__validator_1.validator_create_product, sesion_1.default, (0, roles_1.checkRole)(['admin']), products_1.controller_product.create);
router.get('/', products_1.controller_product.get);
router.put('/:id', sesion_1.default, (0, roles_1.checkRole)(['admin']), products_1.controller_product.update);
router.delete('/:id', sesion_1.default, (0, roles_1.checkRole)(['admin']), products_1.controller_product.delete);
router.delete('/', sesion_1.default, (0, roles_1.checkRole)(['admin']), products_1.controller_product.delete_all);
exports.default = router;
//# sourceMappingURL=products.js.map