"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
// Definir el esquema del producto
const productSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    path: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
});
// Aplicar el plugin de paginación
productSchema.plugin(mongoose_paginate_v2_1.default);
// Crear y exportar el modelo usando el tipo personalizado
const Product = mongoose_1.default.model('Product', productSchema);
exports.default = Product;
//# sourceMappingURL=products.js.map