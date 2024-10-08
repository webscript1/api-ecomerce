"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const Schema = mongoose_1.default.Schema;
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
productSchema.plugin(mongoose_paginate_v2_1.default);
// Definición de índices
productSchema.index({ name: 1 }); // Índice en el campo 'symbol'
productSchema.index({ createdAt: 1 }); // Índice en el campo 'date'
productSchema.index({ category: 1 }); // Índice en el campo 'status'
productSchema.index({ price: 1 }); // Índice en el campo 'status'
//productSchema.index({ path: 1 });
const nameCollecction = 'Product';
// Crear y exportar el modelo utilizando la interfaz personalizada
const Product = mongoose_1.default.model(nameCollecction, productSchema);
exports.default = Product;
//# sourceMappingURL=products.js.map