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
                const product = new products_1.default(req.body);
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
                const { id } = req.params;
                const order = yield products_1.default.findById(id);
                const data = {
                    code: 200,
                    message: 'producto',
                    data: order,
                };
                if (!order) {
                    data.message = 'producto no encontrado';
                    data.code = 404;
                    return data;
                }
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    get_all(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    code: 200,
                    message: 'products',
                };
                const { page = 1, sort = -1, path } = req.query;
                let products;
                let options;
                if (path) {
                    products = yield products_1.default.findOne({ path: path });
                    if (!products) {
                        data.message = 'producto no encontrado';
                        data.code = 404;
                        return data;
                    }
                    data.data = products;
                    return data;
                }
                else {
                    options = {
                        limit: 10,
                        page: page || 1,
                        // Proyección: solo las propiedades 'result' y 'profit'
                        sort: { createdAt: Number(sort) }, //-1 : desendente 1:asendente
                    };
                    products = yield products_1.default.paginate({}, options);
                    data.data = products;
                    return data;
                }
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
                const update_product = yield products_1.default.findByIdAndUpdate(id, req.body, {
                    new: true,
                });
                if (!update_product) {
                    data.code = 404;
                    data.message = `product ${id}  no encontrado para atualizar`;
                    return data;
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
                    data.code = 404;
                    data.message = `product ${id}  no encontrado para eliminar`;
                    return data;
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
                if (!delete_product) {
                    data.code = 404;
                    data.message = `no hay productos`;
                    return data;
                }
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