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
exports.OrdersService = void 0;
const orders_1 = __importDefault(require("../../models/orders"));
const cupon_model_1 = __importDefault(require("../../models/cupon.model"));
const products_1 = __importDefault(require("../../models/products"));
const users_1 = __importDefault(require("../../models/users"));
const errorHandler_1 = require("../errors/errorHandler");
class OrdersService {
    constructor() { }
    createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idUser = req.body.user._id;
                const order = req.body;
                order.email = req.body.user.email;
                let orderModel = new orders_1.default(order);
                orderModel.userId = idUser;
                let savedOrder;
                const data = {
                    code: 201,
                    message: 'order creada',
                    data: savedOrder,
                };
                const cupon = req.body.cupon;
                let searcuCupon;
                let idlistProdtcs = order.products.map(item => item.id);
                let searchProducts = [];
                let orderNumber;
                let searchOrderNumber;
                let attempts = 0;
                const maxAttempts = 10; // Limitar el número de intentos para evitar un bucle infinito
                //buscando el numero de order para saber si existe, si existe crearlo de nuevo
                do {
                    orderNumber = this.generateRandomOrderNumber();
                    searchOrderNumber = yield orders_1.default.findOne({ numberOrder: orderNumber });
                    attempts++;
                    if (attempts > maxAttempts) {
                        throw new errorHandler_1.ResourceAlreadyExistsError('No se pudo generar un número de orden único después de varios intentos');
                    }
                } while (searchOrderNumber);
                orderModel.numberOrder = orderNumber;
                //buscando los productos para ver el precio
                searchProducts = yield products_1.default.find({
                    _id: { $in: idlistProdtcs },
                });
                if (!searchProducts) {
                    throw new errorHandler_1.NotFoundError('estos pructos ya no estan disponibles');
                }
                // console.log('sear products+++++++++++++++: ', searchProducts);
                if (searchProducts) {
                    order.products.forEach(item => {
                        for (const iterator of searchProducts) {
                            if (iterator._id === item.id) {
                                item.price = iterator.price;
                            }
                        }
                    });
                    order.totalAmount = this.total_pagar(order.products); //calculando el total
                }
                //si el cupon es valido
                if (order.cupon.valid) {
                    searcuCupon = yield cupon_model_1.default.findOne({ codigo: cupon.codigo });
                    if (searcuCupon) {
                        if (searcuCupon.activo) {
                            //si el cupon es valido
                            order.cupon.descuento = searcuCupon.descuento; //actualizar el prcentaje de descuent obtenido de la database
                            //actualizand comoquedara el total con descuento
                            order.totalConDescuento = this.totalConDescuento(order.totalAmount, searcuCupon.descuento);
                            order.cupon.valid = searcuCupon.activo; //actualizando que el codigo es valido
                        }
                        else {
                            ///si el cupon no esta activo, colocarlo invalido
                            order.cupon.valid = false;
                        }
                    }
                    else {
                        //si el cupon no se ha encntrado colocarlo que es invalido
                        order.cupon.valid = false;
                    }
                }
                orderModel.id = yield this.generateUniqueOrderId(); //generando id de seguimiendo
                savedOrder = yield orderModel.save();
                data.data = savedOrder;
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { numberOrder } = req.query;
                const data = {
                    code: 200,
                    message: 'order',
                };
                const orders = yield orders_1.default.findOne({ numberOrder: numberOrder });
                if (!orders) {
                    throw new errorHandler_1.NotFoundError(`orden ${numberOrder} no encontrada`);
                }
                data.data = orders;
                return data;
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.body.user._id;
                const { page = 1, sort = -1, limit = 10, email } = req.query;
                const options = {
                    page: Number(page),
                    limit: Number(limit),
                    sort: { createdAt: Number(sort) },
                };
                const data = {
                    code: 200,
                    message: 'order',
                };
                if (email) {
                    const orders = yield orders_1.default.paginate({ email: email, userId: userId }, options);
                    data.data = orders;
                    return data;
                }
                const orders = yield orders_1.default.paginate({ userId: userId }, options);
                data.data = orders;
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idUser = req.body.user._id;
                const order = yield orders_1.default.findOneAndUpdate({ _id: req.params.id, userId: idUser }, req.body, { new: true });
                if (!order) {
                    throw new errorHandler_1.NotFoundError('order no encontrada para actualizar');
                }
                const data = {
                    code: 200,
                    message: 'order actualizada',
                    data: order,
                };
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idUser = req.body.user._id;
                const order = yield orders_1.default.findOneAndDelete({
                    _id: req.params.id,
                    userId: idUser,
                });
                if (!order) {
                    throw new errorHandler_1.NotFoundError('order no encontrada para eliminar');
                }
                const data = {
                    code: 200,
                    message: 'order eliminada',
                    data: order,
                };
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteAllOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idUser = req.body.user._id;
                const ordersDelete = yield orders_1.default.deleteMany({ userId: idUser });
                if (!ordersDelete) {
                    throw new errorHandler_1.NotFoundError('no se encontaron ordenes para eliminar');
                }
                const data = {
                    code: 200,
                    message: 'todas lasordes eliminadas',
                    data: ordersDelete,
                };
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    total_pagar(list_products) {
        let total = 0;
        list_products.forEach(element => {
            total += Number(element.count) * Number(element.price);
        });
        return Number(total.toFixed(1));
    }
    totalConDescuento(total, porcentajeDescuento) {
        const totalConDescuento = Number((total - (total * porcentajeDescuento) / 100).toFixed(1));
        return totalConDescuento;
    }
    generateRandomNumber(length = 6) {
        return Math.floor(Math.random() * Math.pow(10, length))
            .toString()
            .padStart(length, '0');
    }
    generateUniqueOrderId() {
        return __awaiter(this, void 0, void 0, function* () {
            let orderId = '';
            let orderExists = true;
            while (orderExists) {
                orderId = this.generateRandomNumber();
                const existingOrder = yield orders_1.default.exists({ id: orderId });
                orderExists = existingOrder !== null;
            }
            return orderId;
        });
    }
    detailUserAndOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    code: 200,
                    message: 'detalle user y orders',
                };
                const userId = req.body.user._id;
                let user;
                let orders;
                let detailUser = {
                    user: undefined,
                    orders: undefined,
                };
                const { page = 1, sort = -1 } = req.query;
                let products;
                const options = {
                    limit: 10,
                    page: Number(page) || 1,
                    // Proyección: solo las propiedades 'result' y 'profit'
                    sort: { createdAt: Number(sort) || -1 }, //-1 : desendente 1:asendente
                };
                if (userId) {
                    user = yield users_1.default.findById(userId).select('firstName lastName email ');
                    if (!user) {
                        data.code = 404;
                        data.message = 'usuario no encontrado ';
                        return data;
                    }
                    detailUser.user = user;
                }
                orders = yield orders_1.default.paginate({ userId: userId }, options);
                detailUser.orders = orders;
                data.data = detailUser;
                console.log('order: ', data);
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    generateRandomOrderNumber() {
        // Genera un número aleatorio de 7 dígitos
        return Math.floor(1000000 + Math.random() * 9000000);
    }
}
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.js.map