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
exports.CuponService = void 0;
const cupon_model_1 = __importDefault(require("../../models/cupon.model"));
const errorHandler_1 = require("../errors/errorHandler");
class CuponService {
    constructor() { }
    createCupon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const cupon = new cupon_model_1.default(params);
                const savedCupon = yield cupon.save();
                const data = {
                    code: 201,
                    message: 'Cupón creado',
                    data: savedCupon,
                };
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getCupon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cupon = yield cupon_model_1.default.findOne({ codigo: req.params.codigo });
                if (!cupon) {
                    throw new errorHandler_1.NotFoundError('Cupón no encontrado');
                }
                const data = {
                    code: 200,
                    message: `cupon de ${cupon === null || cupon === void 0 ? void 0 : cupon.descuento}% aplicado`,
                    data: cupon,
                };
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getCupones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page = 1, limit = 10 } = req.query;
                const options = {
                    page: Number(page),
                    limit: Number(limit),
                };
                const data = {
                    code: 200,
                    message: 'Lista de cupones',
                };
                const cupones = yield cupon_model_1.default.paginate({}, options);
                data.data = cupones;
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateCupon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cupon = yield cupon_model_1.default.findByIdAndUpdate(req.params.id, req.body, {
                    new: true,
                });
                if (!cupon) {
                    throw new errorHandler_1.NotFoundError('Cupón no encontrado para actualizar');
                }
                const data = {
                    code: 200,
                    message: 'Cupón actualizado',
                    data: cupon,
                };
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteCupon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cupon = yield cupon_model_1.default.findByIdAndDelete(req.params.id);
                const data = {
                    code: 200,
                    message: 'Cupón eliminado',
                    data: cupon,
                };
                if (!cupon) {
                    throw new errorHandler_1.NotFoundError('Cupón no encontrado');
                }
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
                    message: 'todos los cupones eliminados',
                };
                const delete_product = yield cupon_model_1.default.deleteMany();
                data.data = delete_product;
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.CuponService = CuponService;
//# sourceMappingURL=cupon.service.js.map