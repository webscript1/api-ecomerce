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
const cuponSchema = new mongoose_1.Schema({
    codigo: {
        type: String,
        required: true,
        unique: true,
    },
    descuento: {
        type: Number,
        required: true,
    },
    tipoDescuento: {
        type: String,
        enum: ['porcentaje', 'montoFijo'],
        required: true,
    },
    cantidadMinimaCompra: {
        type: Number,
        default: 0,
    },
    productosAplicables: {
        type: [String], // Array de IDs de productos a los que aplica el cupón
    },
    fechaExpiracion: {
        type: Date,
        required: true,
    },
    activo: {
        type: Boolean,
        default: true,
    },
    fechaCreacion: {
        type: Date,
        default: Date.now,
    },
    count: { type: Number, required: false },
    limit: { type: Boolean, default: false },
});
cuponSchema.plugin(mongoose_paginate_v2_1.default);
// Definir el modelo utilizando la interfaz extendida
const Cupon = mongoose_1.default.model('Cupon', cuponSchema);
exports.default = Cupon;
//# sourceMappingURL=cupon.model.js.map