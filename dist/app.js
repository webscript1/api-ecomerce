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
//import rutes_user from './rutes/users';
//import rutes_orders from './rutes/orders';
//import rutes_carts from './rutes/carts';
//import rutes_cupon from './rutes/cupon.rute';
//import rutes_payment from './rutes/payment.rutes';
//import rutes_category from './rutes/category.rutes';
const error_middleware_1 = require("./middleware/erros/error.middleware");
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
app.get('/', (req, res) => {
    res.send('Bienvenido a la página principal!');
});
app.use('/products', products_1.default);
//a; //pp.use('/users', rutes_user);
//app.use('/orders', rutes_orders);
//app.use('/carts', rutes_carts);
//app.use('/cupon', rutes_cupon);
//app.use('/payment', rutes_payment);
//app.use('/category', rutes_category);
// Middleware de manejo de errores
app.use(error_middleware_1.errorHandler);
//exportar
exports.default = app;
//# sourceMappingURL=app.js.map