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
class OrdersService {
    constructor() { }
    createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idUser = req.body.user._id;
                const order = req.body;
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
                //buscando los productos para ver el precio
                searchProducts = yield products_1.default.find({
                    _id: { $in: idlistProdtcs },
                });
                console.log('sear products+++++++++++++++: ', searchProducts);
                if (searchProducts) {
                    order.products.forEach(item => {
                        for (const iterator of searchProducts) {
                            if (iterator._id === item.id) {
                                item.price = iterator.price;
                                break;
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
                const userId = req.body.user._id;
                const order = yield orders_1.default.findOne({ _id: req.params.id, userId: userId });
                const data = {
                    code: 200,
                    message: 'order',
                    data: order,
                };
                if (!order) {
                    data.message = 'order no encontrada';
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
    getOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idUser = req.body.user._id;
                const { page = 1, limit = 10, email } = req.query;
                console.log('email: ', email);
                const options = {
                    page: Number(page),
                    limit: Number(limit),
                };
                const data = {
                    code: 200,
                    message: 'orders',
                };
                if (email) {
                    const orders = yield orders_1.default.paginate({ email: email }, options);
                    console.log('ha entrado en email: ', email, orders);
                    data.data = orders;
                }
                else {
                    const orders = yield orders_1.default.paginate({ userId: idUser }, options);
                    console.log('ha entrado en sesion: ', email, orders, ' user id:', idUser);
                    data.data = orders;
                }
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
                const data = {
                    code: 200,
                    message: 'order actualizada',
                    data: order,
                };
                if (!order) {
                    data.message = 'order no encontrada';
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
    deleteOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idUser = req.body.user._id;
                const order = yield orders_1.default.findOneAndDelete({
                    _id: req.params.id,
                    userId: idUser,
                });
                const data = {
                    code: 200,
                    message: 'order eliminada',
                    data: order,
                };
                if (!order) {
                    data.code = 404;
                    data.message = 'order no encontrada';
                }
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
                const data = {
                    code: 200,
                    message: 'todas lasordes eliminadas',
                    data: ordersDelete,
                };
                if (!ordersDelete) {
                    data.code = 404;
                    data.message = 'order no encontrada';
                }
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
}
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.js.map