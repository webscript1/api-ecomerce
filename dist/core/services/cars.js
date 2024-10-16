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
exports.CartService = void 0;
const cars_1 = __importDefault(require("../../models/cars"));
const errorHandler_1 = require("../handlers/errorHandler");
class CartService {
    constructor() { }
    createCart(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { products } = req.body;
            const userId = req.body.user._id;
            const productId = products.productId;
            const quantity = products.quantity;
            let cart = yield cars_1.default.findOne({ userId }).populate('products.productId');
            if (cart) {
                console.log(cart.products);
                // Carrito existe, verificar si el producto ya está en el carrito
                const productIndex = cart.products.findIndex(p => p.productId._id.toString() === productId);
                if (productIndex > -1) {
                    // Producto ya existe en el carrito, actualizar cantidad
                    cart.products[productIndex].quantity += quantity;
                }
                else {
                    // Producto no está en el carrito, agregar nuevo producto
                    cart.products.push({ productId, quantity });
                }
            }
            else {
                // Crear un nuevo carrito si no existe
                cart = new cars_1.default({
                    userId,
                    products: [{ productId, quantity }],
                });
            }
            //console.log('card :',cart)
            yield cart.save();
            const data = {
                code: 200,
                message: 'Producto agregado al carrito exitosamente',
                data: cart,
            };
            return data;
        });
    }
    getCart(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const idUser = req.body.user._id;
            const cart = yield cars_1.default.findOne({
                _id: req.params.id,
                userId: idUser,
            }).populate('products.productId');
            if (!cart) {
                throw new errorHandler_1.NotFoundError('Carrito no encontrado');
            }
            const data = {
                code: 200,
                message: 'Carrito encontrado',
                data: cart,
            };
            return data;
        });
    }
    getCarts(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page = 1, limit = 10 } = req.query;
            const idUser = req.body.user._id;
            const options = {
                page: Number(page),
                limit: Number(limit),
                populate: 'products.productId',
            };
            const carts = yield cars_1.default.paginate({ userId: idUser }, options);
            const data = {
                code: 200,
                message: 'Carritos encontrados',
                data: carts,
            };
            return data;
        });
    }
    updateCart(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = req.body.user._id;
            //const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('products.productId');
            const cart = yield cars_1.default.findOneAndUpdate({ _id: req.params.id, userId: user_id }, req.body, { new: true }).populate('products.productId');
            if (!cart) {
                throw new errorHandler_1.NotFoundError('Carrito no encontrado para actualizar');
            }
            const data = {
                code: 200,
                message: 'Carrito actualizado',
                data: cart,
            };
            return data;
        });
    }
    deleteCart(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const idUser = req.body.user._id;
            const cart = yield cars_1.default.findOneAndDelete({
                _id: req.params.id,
                userId: idUser,
            });
            const data = {
                code: 200,
                message: 'Carrito eliminado',
                data: cart,
            };
            if (!cart) {
                throw new errorHandler_1.NotFoundError('Carrito no encontrado para eliminar');
            }
            return data;
        });
    }
    deleteAllCarts(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const idUser = req.body.user._id;
            console.log('user id ', idUser);
            const cartsDeleted = yield cars_1.default.deleteMany({ userId: idUser });
            if (!cartsDeleted) {
                throw new errorHandler_1.NotFoundError('No se encontraron carritos para eliminar');
            }
            const data = {
                code: 200,
                message: 'Todos los carritos eliminados',
                data: cartsDeleted,
            };
            return data;
        });
    }
    updateQtyCart(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.body.user._id;
            const { productId } = req.query;
            const quantity = Number(req.query.quantity);
            console.log('quantity:', quantity, ' id: ', productId);
            const data = {
                code: 200,
                message: 'Carrito actualizado t5t5t5t5t',
            };
            const cart = yield cars_1.default.findOne({ userId: userId });
            if (cart) {
                console.log(cart.products);
                // Carrito existe, verificar si el producto ya está en el carrito
                const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
                if (productIndex > -1) {
                    // Producto ya existe en el carrito, actualizar cantidad
                    cart.products[productIndex].quantity = quantity;
                    const updateCart = yield cars_1.default.findByIdAndUpdate(cart._id, { products: cart.products }, { new: true });
                    data.data = updateCart;
                    return data;
                }
            }
            else {
                data.code = 404;
                data.message = 'nohay productosen carts';
                return data;
            }
            return data;
        });
    }
    countOrdersCart(req) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.body.user) === null || _a === void 0 ? void 0 : _a._id;
            const result = yield cars_1.default.aggregate([
                { $match: { userId: userId } }, // Asegúrate de que el userId sea ObjectId
                { $unwind: '$products' },
                {
                    $group: { _id: '', totalQuantity: { $sum: '$products.quantity' } },
                },
            ]);
            // console.log('rese ', result);
            const count = result.length > 0 ? result[0].totalQuantity : 0;
            return {
                code: 200,
                message: 'Items en el carrito',
                data: count,
            };
        });
    }
}
exports.CartService = CartService;
//# sourceMappingURL=cars.js.map