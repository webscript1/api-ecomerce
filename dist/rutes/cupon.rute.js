"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cupon_controller_1 = require("../controllers/cupon.controller");
const sesion_1 = __importDefault(require("../middleware/sesion"));
const roles_1 = require("../middleware/roles");
const router = (0, express_1.Router)();
router.post('/', sesion_1.default, (0, roles_1.checkRole)(['admin']), cupon_controller_1.controller_cupon.create);
router.get('/:codigo', cupon_controller_1.controller_cupon.get);
router.get('/', cupon_controller_1.controller_cupon.getAll);
router.put('/:id', sesion_1.default, (0, roles_1.checkRole)(['admin']), cupon_controller_1.controller_cupon.update);
router.delete('/:id', sesion_1.default, (0, roles_1.checkRole)(['admin']), cupon_controller_1.controller_cupon.delete);
router.delete('/', sesion_1.default, (0, roles_1.checkRole)(['admin']), cupon_controller_1.controller_cupon.deleteAll);
exports.default = router;
//# sourceMappingURL=cupon.rute.js.map