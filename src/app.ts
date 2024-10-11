'use strict';

import express, { Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import rutes_products from './rutes/products';
import rutes_user from './rutes/users';
import rutes_orders from './rutes/orders';
import rutes_carts from './rutes/carts';
import rutes_cupon from './rutes/cupon.rute';
import rutes_payment from './rutes/payment.rutes';
import rutes_category from './rutes/category.rutes';
import { errorHandler } from './core/middleware/erros/error.middleware';
import { limiter } from './core/middleware/erros/errorLimiter.middleware';

const app = express();
const subRuta = '/api';
app.use(limiter); // Aplica el limitador globalmente a todas las rutas

//cargar archivos rutas

app.use(morgan('dev'));

//middlewares: es un metodo que se ejecuta antes, de la accion de un controlador.
app.use(compression());

// Configuración para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));

//CORS
app.use(
  cors({
    origin: '*',
  }),
);

app.get(subRuta + '/', (req, res: Response) => {
  res.send('Bienvenido a la página principal!');
});
app.use(subRuta + '/products', rutes_products);
app.use(subRuta + '/users', rutes_user);
app.use(subRuta + '/orders', rutes_orders);
app.use(subRuta + '/carts', rutes_carts);
app.use(subRuta + '/cupon', rutes_cupon);
app.use(subRuta + '/payment', rutes_payment);
app.use(subRuta + '/category', rutes_category);

// Middleware de manejo de errores
app.use(errorHandler);

//exportar
export default app;
