import { Request, Response, NextFunction } from 'express';
import Order, { IOrder } from '../../models/orders';
import { serviceResult } from '../interfaces/interfaces';
import Cupon from '../../models/cupon.model';
import { Orders, ProductOrder } from '../interfaces/order.interface';
import { cuponDetail } from '../interfaces/cupon.interface';
import Product from '../../models/products';
import User from '../../models/users';
import {
  NotFoundError,
  ResourceAlreadyExistsError,
} from '../errors/errorHandler';

export class OrdersService {
  constructor() {}

  async createOrder(req: Request, res: Response) {
    try {
      const idUser = req.body.user._id;
      const order: IOrder = req.body;
      order.email = req.body.user.email;
      let orderModel = new Order(order);

      orderModel.userId = idUser;
      let savedOrder;
      const data: serviceResult = {
        code: 201,
        message: 'order creada',
        data: savedOrder,
      };
      const cupon: cuponDetail = req.body.cupon;
      let searcuCupon;
      let idlistProdtcs: String[] = order.products.map(item => item.id);
      let searchProducts: any[] = [];
      let orderNumber: number;
      let searchOrderNumber: any;
      let attempts = 0;
      const maxAttempts = 10; // Limitar el número de intentos para evitar un bucle infinito

      //buscando el numero de order para saber si existe, si existe crearlo de nuevo
      do {
        orderNumber = this.generateRandomOrderNumber();
        searchOrderNumber = await Order.findOne({ numberOrder: orderNumber });
        attempts++;
        if (attempts > maxAttempts) {
          throw new ResourceAlreadyExistsError(
            'No se pudo generar un número de orden único después de varios intentos',
          );
        }
      } while (searchOrderNumber);
      orderModel.numberOrder = orderNumber;

      //buscando los productos para ver el precio
      searchProducts = await Product.find({
        _id: { $in: idlistProdtcs },
      });
      if (!searchProducts) {
        throw new NotFoundError('estos pructos ya no estan disponibles');
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
        searcuCupon = await Cupon.findOne({ codigo: cupon.codigo });

        if (searcuCupon) {
          if (searcuCupon.activo) {
            //si el cupon es valido
            order.cupon.descuento = searcuCupon.descuento; //actualizar el prcentaje de descuent obtenido de la database

            //actualizand comoquedara el total con descuento
            order.totalConDescuento = this.totalConDescuento(
              order.totalAmount,
              searcuCupon.descuento,
            );
            order.cupon.valid = searcuCupon.activo; //actualizando que el codigo es valido
          } else {
            ///si el cupon no esta activo, colocarlo invalido
            order.cupon.valid = false;
          }
        } else {
          //si el cupon no se ha encntrado colocarlo que es invalido
          order.cupon.valid = false;
        }
      }

      orderModel.id = await this.generateUniqueOrderId(); //generando id de seguimiendo
      savedOrder = await orderModel.save();
      data.data = savedOrder;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getOrder(req: Request, res: Response) {
    try {
      const { numberOrder } = req.query;

      const data: serviceResult = {
        code: 200,
        message: 'order',
      };

      const orders = await Order.findOne({ numberOrder: numberOrder });
      if (!orders) {
        throw new NotFoundError(`orden ${numberOrder} no encontrada`);
      }

      data.data = orders;
      return data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getOrders(req: Request, res: Response) {
    try {
      const userId = req.body.user._id;
      const { page = 1, sort = -1, limit = 10, email } = req.query;
      const options = {
        page: Number(page),
        limit: Number(limit),
        sort: { createdAt: Number(sort) },
      };

      const data: serviceResult = {
        code: 200,
        message: 'order',
      };

      if (email) {
        const orders = await Order.paginate(
          { email: email, userId: userId },
          options,
        );

        data.data = orders;
        return data;
      }

      const orders = await Order.paginate({ userId: userId }, options);
      data.data = orders;
      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateOrder(req: Request, res: Response) {
    try {
      const idUser = req.body.user._id;
      const order = await Order.findOneAndUpdate(
        { _id: req.params.id, userId: idUser },
        req.body,
        { new: true },
      );

      if (!order) {
        throw new NotFoundError('order no encontrada para actualizar');
      }
      const data: serviceResult = {
        code: 200,
        message: 'order actualizada',
        data: order,
      };
      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteOrder(req: Request, res: Response) {
    try {
      const idUser = req.body.user._id;
      const order = await Order.findOneAndDelete({
        _id: req.params.id,
        userId: idUser,
      });

      if (!order) {
        throw new NotFoundError('order no encontrada para eliminar');
      }
      const data: serviceResult = {
        code: 200,
        message: 'order eliminada',
        data: order,
      };
      return data;
    } catch (error) {
      throw error;
    }
  }
  async deleteAllOrder(req: Request, res: Response) {
    try {
      const idUser = req.body.user._id;
      const ordersDelete = await Order.deleteMany({ userId: idUser });

      if (!ordersDelete) {
        throw new NotFoundError('no se encontaron ordenes para eliminar');
      }
      const data: serviceResult = {
        code: 200,
        message: 'todas lasordes eliminadas',
        data: ordersDelete,
      };
      return data;
    } catch (error) {
      throw error;
    }
  }
  total_pagar(list_products: ProductOrder[]) {
    let total = 0;
    list_products.forEach(element => {
      total += Number(element.count) * Number(element.price);
    });
    return Number(total.toFixed(1));
  }
  totalConDescuento(total: number, porcentajeDescuento: number): number {
    const totalConDescuento = Number(
      (total - (total * porcentajeDescuento) / 100).toFixed(1),
    );
    return totalConDescuento;
  }
  generateRandomNumber(length = 6): string {
    return Math.floor(Math.random() * Math.pow(10, length))
      .toString()
      .padStart(length, '0');
  }
  async generateUniqueOrderId(): Promise<string> {
    let orderId = '';
    let orderExists = true;

    while (orderExists) {
      orderId = this.generateRandomNumber();
      const existingOrder = await Order.exists({ id: orderId });

      orderExists = existingOrder !== null;
    }

    return orderId;
  }
  async detailUserAndOrders(req: Request, res: Response) {
    try {
      const data: serviceResult = {
        code: 200,
        message: 'detalle user y orders',
      };

      const userId = req.body.user._id;
      let user: any;
      let orders: any;
      let detailUser: { user: any; orders: any } = {
        user: undefined,
        orders: undefined,
      };
      const { page = 1, sort = -1 } = req.query;
      let products: any;
      const options = {
        limit: 10,
        page: Number(page) || 1,
        // Proyección: solo las propiedades 'result' y 'profit'
        sort: { createdAt: Number(sort) || -1 }, //-1 : desendente 1:asendente
      };

      if (userId) {
        user = await User.findById(userId).select('firstName lastName email ');
        if (!user) {
          data.code = 404;
          data.message = 'usuario no encontrado ';
          return data;
        }
        detailUser.user = user;
      }

      orders = await Order.paginate({ userId: userId }, options);
      detailUser.orders = orders;

      data.data = detailUser;
      console.log('order: ', data);

      return data;
    } catch (error) {
      throw error;
    }
  }
  generateRandomOrderNumber() {
    // Genera un número aleatorio de 7 dígitos
    return Math.floor(1000000 + Math.random() * 9000000);
  }
}
