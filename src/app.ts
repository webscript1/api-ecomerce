'use strict';

import express, { Errback, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import rutes_products from './rutes/products';
//import rutes_user from './rutes/users';
//import rutes_orders from './rutes/orders';
//import rutes_carts from './rutes/carts';
//import rutes_cupon from './rutes/cupon.rute';
//import rutes_payment from './rutes/payment.rutes';
//import rutes_category from './rutes/category.rutes';
import { errorHandler } from './middleware/erros/error.middleware';

const subRuta = '/';
const app = express();

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

app.get('/', (req, res: Response) => {
  res.send('Bienvenido a la página principal!');
});
app.use('/products', rutes_products);
//a; //pp.use('/users', rutes_user);
//app.use('/orders', rutes_orders);
//app.use('/carts', rutes_carts);
//app.use('/cupon', rutes_cupon);
//app.use('/payment', rutes_payment);
//app.use('/category', rutes_category);

// Middleware de manejo de errores
app.use(errorHandler);

//exportar
export default app;
