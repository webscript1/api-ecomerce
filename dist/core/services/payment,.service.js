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
const errorHandler_1 = require("../handlers/errorHandler");
class PaymentService {
    constructor() { }
    createPayment(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = req.body;
            const newModel = new payment_model_1.default(params);
            yield newModel.save();
            // Devolver el resultado exitoso
            const data = {
                code: 201, // Código HTTP 201: Recurso creado
                message: 'Payment creado exitosamente',
                data: newModel,
            };
            return data;
        });
    }
    getPayment(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                code: 200,
                message: 'Modelo encontrado',
            };
            const { id, page = 1, sort = -1, limit = 10 } = req.query;
            if (id) {
                const payment = yield payment_model_1.default.findById(id);
                if (!payment) {
                    throw new errorHandler_1.NotFoundError('payment no encontrado');
                }
                data.data = payment;
                return data;
            }
            // Opción de paginación
            const options = {
                limit: Number(limit), // Aseguramos que limit sea un número
                page: Number(page), // Aseguramos que page sea un número
                sort: { createdAt: Number(sort) }, // Sort por fecha de creación
            };
            // Paginación de productos
            const payment = yield payment_model_1.default.paginate({}, options);
            data.data = payment;
            return data;
        });
    }
    updatePayment(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const paramsUpdate = req.body;
            // Actualizar el Payment
            const payment = yield payment_model_1.default.findByIdAndUpdate(req.params.id, paramsUpdate, {
                new: true, // Retorna el nuevo documento actualizado
            });
            if (!payment) {
                throw new errorHandler_1.NotFoundError('Payment no encontrado para actualizar');
            }
            // Devolver la respuesta solo si se actualizó correctamente
            const data = {
                code: 200,
                message: 'Payment actualizado',
                data: payment,
            };
            return data;
        });
    }
    deletePayment(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const payment = yield payment_model_1.default.findByIdAndDelete(req.params.id);
            if (!payment) {
                throw new errorHandler_1.NotFoundError('Payment no encontrado para eliminar');
            }
            const data = {
                code: 200,
                message: 'Payment eliminado eliminado',
                data: payment,
            };
            return data;
        });
    }
    deleteAllPayment() {
        return __awaiter(this, void 0, void 0, function* () {
            const paymentDeleted = yield payment_model_1.default.deleteMany();
            const data = {
                code: 200,
                message: 'Todos los modelos eliminados',
                data: paymentDeleted,
            };
            return data;
        });
    }
}
exports.PaymentService = PaymentService;
//# sourceMappingURL=payment,.service.js.map