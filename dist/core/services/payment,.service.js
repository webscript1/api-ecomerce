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
exports.PaymentService = void 0;
const payment_model_1 = __importDefault(require("../../models/payment.model"));
class PaymentService {
    constructor() { }
    createPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, wallet, crypto, image, template, red } = req.body;
                const newModel = new payment_model_1.default({
                    name,
                    wallet,
                    crypto,
                    image,
                    template,
                    red,
                });
                yield newModel.save();
                const data = {
                    code: 200,
                    message: 'Modelo creado exitosamente',
                    data: newModel,
                };
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const model = yield payment_model_1.default.findById(req.params.id);
                const data = {
                    code: 200,
                    message: 'Modelo encontrado',
                    data: model,
                };
                if (!model) {
                    data.message = 'Modelo no encontrado';
                    data.code = 404;
                }
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getPayments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const models = yield payment_model_1.default.find();
                const data = {
                    code: 200,
                    message: 'Modelos encontrados',
                    data: models,
                };
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updatePayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const model = yield payment_model_1.default.findByIdAndUpdate(req.params.id, req.body, {
                    new: true,
                });
                const data = {
                    code: 200,
                    message: 'Modelo actualizado',
                    data: model,
                };
                if (!model) {
                    data.message = 'Modelo no encontrado';
                    data.code = 404;
                }
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deletePayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const model = yield payment_model_1.default.findByIdAndDelete(req.params.id);
                const data = {
                    code: 200,
                    message: 'Modelo eliminado',
                    data: model,
                };
                if (!model) {
                    data.code = 404;
                    data.message = 'Modelo no encontrado';
                }
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteAllPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modelsDeleted = yield payment_model_1.default.deleteMany();
                const data = {
                    code: 200,
                    message: 'Todos los modelos eliminados',
                    data: modelsDeleted,
                };
                if (!modelsDeleted) {
                    data.code = 404;
                    data.message = 'No se encontraron modelos para eliminar';
                }
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.PaymentService = PaymentService;
//# sourceMappingURL=payment,.service.js.map