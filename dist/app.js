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
const error_middleware_1 = require("./core/middleware/erros/error.middleware");
const errorLimiter_middleware_1 = require("./core/middleware/erros/errorLimiter.middleware");
const app = (0, express_1.default)();
const subRuta = '/api';
app.use(errorLimiter_middleware_1.limiter); // Aplica el limitador globalmente a todas las rutas
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
app.get(subRuta + '/', (req, res) => {
    res.send('Bienvenido a la página principal!');
});
app.use(subRuta + '/products', products_1.default);
app.use(subRuta + '/users', users_1.default);
app.use(subRuta + '/orders', orders_1.default);
app.use(subRuta + '/carts', carts_1.default);
app.use(subRuta + '/cupon', cupon_rute_1.default);
app.use(subRuta + '/payment', payment_rutes_1.default);
app.use(subRuta + '/category', category_rutes_1.default);
// Middleware de manejo de errores
app.use(error_middleware_1.errorHandler);
//exportar
exports.default = app;
//# sourceMappingURL=app.js.map