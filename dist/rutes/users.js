"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const roles_1 = require("../middleware/roles");
const checkUniqueEmail_1 = require("../middleware/checkUniqueEmail ");
const user_validator_1 = require("../middleware/validators/user.validator");
const sesion_1 = __importDefault(require("../middleware/sesion"));
const router = (0, express_1.Router)();
router.get('/test', users_1.user_controller.test);
router.post('/create', user_validator_1.valitador_sing_up, checkUniqueEmail_1.checkUniqueEmail, users_1.user_controller.create);
router.get('/', sesion_1.default, users_1.user_controller.get);
router.put('/:id', sesion_1.default, users_1.user_controller.update);
router.delete('/delete/:id', sesion_1.default, (0, roles_1.checkRole)(['admin']), users_1.user_controller.delete);
router.delete('/delete-all', sesion_1.default, (0, roles_1.checkRole)(['admin']), users_1.user_controller.deleteAll);
router.post('/sing-in', user_validator_1.valitador_sing_in, users_1.user_controller.sing_in);
exports.default = router;
//# sourceMappingURL=users.js.map