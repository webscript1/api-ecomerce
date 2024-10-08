"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller_category = void 0;
const category_service_1 = require("../core/services/category.service");
const categoryService = new category_service_1.CategoryService();
exports.controller_category = {
    create: (req, res, next) => {
        categoryService
            .createCategory(req)
            .then(data => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    get: (req, res, next) => {
        categoryService
            .getCategory(req)
            .then(data => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    getAll: (req, res, next) => {
        categoryService
            .getCategories(req)
            .then(data => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    update: (req, res, next) => {
        categoryService
            .updateCategory(req)
            .then(data => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    delete: (req, res, next) => {
        categoryService
            .deleteCategory(req)
            .then(data => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
    deleteAll: (req, res, next) => {
        categoryService
            .deleteAllCategories(req)
            .then(data => {
            return res.status(data.code).send(data);
        })
            .catch(next);
    },
};
//# sourceMappingURL=category.controllers.js.map