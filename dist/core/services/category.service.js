"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const category_model_1 = __importDefault(require("../../models/category.model"));
const errorHandler_1 = require("../handlers/errorHandler");
class CategoryService {
    constructor() { }
    createCategory(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = new category_model_1.default(req.body);
            const savedCategory = yield category.save();
            const data = {
                code: 201,
                message: 'Categoría creada',
                data: savedCategory,
            };
            return data;
        });
    }
    getCategory(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield category_model_1.default.findById(req.params.id);
            if (!category) {
                throw new errorHandler_1.NotFoundError('Categoría no encontrada');
            }
            const data = {
                code: 200,
                message: 'Categoría encontrada',
                data: category,
            };
            return data;
        });
    }
    getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield category_model_1.default.find();
            const data = {
                code: 200,
                message: 'Lista de categorías',
                data: categories,
            };
            return data;
        });
    }
    updateCategory(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield category_model_1.default.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            });
            if (!category) {
                throw new errorHandler_1.NotFoundError('Categoría no encontrada para actualizar');
            }
            const data = {
                code: 200,
                message: 'Categoría actualizada',
                data: category,
            };
            return data;
        });
    }
    deleteCategory(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield category_model_1.default.findByIdAndDelete(req.params.id);
            const data = {
                code: 200,
                message: 'Categoría eliminada',
                data: category,
            };
            if (!category) {
                throw new errorHandler_1.NotFoundError('Categoría no encontrada para eliminar');
            }
            return data;
        });
    }
    deleteAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedCategories = yield category_model_1.default.deleteMany();
            const data = {
                code: 200,
                message: 'Todas las categorías eliminadas',
                data: deletedCategories,
            };
            return data;
        });
    }
}
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map