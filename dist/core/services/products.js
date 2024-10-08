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
exports.ProductService = void 0;
const products_1 = __importDefault(require("../../models/products"));
const errorHandler_1 = require("../errors/errorHandler");
class ProductService {
    constructor() { }
    test(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    code: 200,
                    message: 'test products',
                };
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    code: 201,
                    message: 'create product success',
                };
                const productsAtributes = req.body;
                const product = new products_1.default(productsAtributes);
                const pathImage = yield products_1.default.findOne({ path: product.path });
                if (pathImage) {
                    throw new errorHandler_1.ResourceAlreadyExistsError(`path '${productsAtributes.path}' ya existe, debe ser unico`);
                }
                const save_product = yield product.save();
                data.data = save_product;
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, page = 1, sort = -1, path, limit = 10 } = req.query;
                const data = {
                    code: 200,
                    message: 'producto',
                };
                // Buscar por ID
                if (id) {
                    const order = yield products_1.default.findById(id);
                    if (!order) {
                        throw new errorHandler_1.NotFoundError('producto no encontrado');
                    }
                    data.data = order;
                    return data;
                }
                // Buscar por path
                if (path) {
                    const product = yield products_1.default.findOne({ path });
                    if (!product) {
                        throw new errorHandler_1.NotFoundError('producto no encontrado');
                    }
                    data.data = product;
                    return data;
                }
                // Opción de paginación
                const options = {
                    limit: Number(limit), // Aseguramos que limit sea un número
                    page: Number(page), // Aseguramos que page sea un número
                    sort: { createdAt: Number(sort) }, // Sort por fecha de creación
                };
                // Paginación de productos
                const products = yield products_1.default.paginate({}, options);
                data.data = products;
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    code: 200,
                    message: 'producto actualizado',
                };
                const { id } = req.params;
                const proudctUpdate = req.body;
                if (proudctUpdate.path) {
                    const product = yield products_1.default.findOne({
                        path: proudctUpdate.path,
                        _id: { $ne: id }, // Filtra por un _id que sea diferente al valor de id
                    });
                    if (product) {
                        throw new errorHandler_1.ResourceAlreadyExistsError(`el path: ''${proudctUpdate.path}'' ya esta en uso`);
                    }
                }
                const update_product = yield products_1.default.findByIdAndUpdate(id, proudctUpdate, {
                    new: true,
                });
                if (!update_product) {
                    throw new errorHandler_1.NotFoundError(`product ${id}  no encontrado para atualizar`);
                }
                data.data = update_product;
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    code: 200,
                    message: 'producto eliminado',
                };
                const { id } = req.params;
                const delete_product = yield products_1.default.findByIdAndDelete(id);
                if (!delete_product) {
                    throw new errorHandler_1.NotFoundError(`product ${id}  no encontrado para eliminar`);
                }
                data.data = delete_product;
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete_all(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    code: 200,
                    message: 'todos los productos eliminados',
                };
                const delete_product = yield products_1.default.deleteMany();
                data.data = delete_product;
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=products.js.map