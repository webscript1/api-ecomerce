"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
// Definir el esquema de Order
const orderSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    email: { type: String, required: false },
    products: [
        {
            id: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            imageUrl: {
                type: String,
                required: true,
            },
            path: {
                type: String,
                required: true,
            },
            count: { type: Number, required: true },
        },
    ],
    metodoPago: {
        metodo: { type: String },
        walletReceptora: { type: String },
        walletEmisora: { type: String },
        hash: { type: String },
    },
    totalAmount: { type: Number, required: true },
    totalConDescuento: { type: Number, required: false },
    numberOrder: { type: Number, required: true, unique: true },
    cupon: {
        type: {
            codigo: String,
            descuento: Number,
            count: Number,
            limit: Boolean,
            valid: Boolean,
        },
        required: false,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
// Crear índices
orderSchema.index({ userId: 1 });
orderSchema.index({ createdAt: 1 });
orderSchema.index({ status: 1 });
// Añadir el plugin de paginación
orderSchema.plugin(mongoose_paginate_v2_1.default);
// Crear y exportar el modelo utilizando el tipo personalizado PaginateModel
const Order = mongoose_1.default.model('Order', orderSchema);
exports.default = Order;
//# sourceMappingURL=orders.js.map