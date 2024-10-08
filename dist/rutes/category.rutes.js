"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controllers_1 = require("../controllers/category.controllers");
const router = (0, express_1.Router)();
router.post('/', category_controllers_1.controller_category.create);
router.get('/', category_controllers_1.controller_category.getAll);
router.get('/:id', category_controllers_1.controller_category.get);
router.put('/:id', category_controllers_1.controller_category.update);
router.delete('/:id', category_controllers_1.controller_category.delete);
router.delete('/', category_controllers_1.controller_category.deleteAll);
exports.default = router;
//# sourceMappingURL=category.rutes.js.map