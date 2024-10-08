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
class CategoryService {
    constructor() { }
    createCategory(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = new category_model_1.default(req.body);
                const savedCategory = yield category.save();
                const data = {
                    code: 201,
                    message: 'Categoría creada',
                    data: savedCategory,
                };
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getCategory(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield category_model_1.default.findById(req.params.id);
                const data = {
                    code: 200,
                    message: 'Categoría encontrada',
                    data: category,
                };
                if (!category) {
                    data.message = 'Categoría no encontrada';
                    data.code = 404;
                }
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getCategories(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield category_model_1.default.find();
                const data = {
                    code: 200,
                    message: 'Lista de categorías',
                    data: categories,
                };
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateCategory(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield category_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
                const data = {
                    code: 200,
                    message: 'Categoría actualizada',
                    data: category,
                };
                if (!category) {
                    data.message = 'Categoría no encontrada';
                    data.code = 404;
                }
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteCategory(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield category_model_1.default.findByIdAndDelete(req.params.id);
                const data = {
                    code: 200,
                    message: 'Categoría eliminada',
                    data: category,
                };
                if (!category) {
                    data.message = 'Categoría no encontrada';
                    data.code = 404;
                }
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteAllCategories(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedCategories = yield category_model_1.default.deleteMany();
                const data = {
                    code: 200,
                    message: 'Todas las categorías eliminadas',
                    data: deletedCategories,
                };
                if (!deletedCategories) {
                    data.code = 404;
                    data.message = 'No se encontraron categorías para eliminar';
                }
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map