'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const products_1 = __importDefault(require("./rutes/products"));
const users_1 = __importDefault(require("./rutes/users"));
const orders_1 = __importDefault(require("./rutes/orders"));
const carts_1 = __importDefault(require("./rutes/carts"));
const cupon_rute_1 = __importDefault(require("./rutes/cupon.rute"));
const payment_rutes_1 = __importDefault(require("./rutes/payment.rutes"));
const category_rutes_1 = __importDefault(require("./rutes/category.rutes"));
const subRuta = '/';
const app = (0, express_1.default)();
//cargar archivos rutas
app.use((0, morgan_1.default)('dev'));
//middlewares: es un metodo que se ejecuta antes, de la accion de un controlador.
app.use((0, compression_1.default)());
// Configuración para analizar el cuerpo de las solicitudes como JSON
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
//CORS
app.use((0, cors_1.default)({
    origin: '*',
}));
//rutas
app.use((req, res, next) => {
    console.log(`Solicitud desde IP: ${req.ip}`);
    next();
});
app.get('/', (req, res) => {
    res.send('Bienvenido a la página principal! _)_');
});
app.use('/products', products_1.default);
app.use('/users', users_1.default);
app.use('/orders', orders_1.default);
app.use('/carts', carts_1.default);
app.use('/cupon', cupon_rute_1.default);
app.use('/payment', payment_rutes_1.default);
app.use('/category', category_rutes_1.default);
// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: process.env.NODE_ENV === 'development' ? err : {},
    });
});
//exportar
exports.default = app;
//# sourceMappingURL=app.js.map