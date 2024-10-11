import { Request } from 'express';
import Order, { IOrder } from '../../models/orders';
import { serviceResult } from '../interfaces/interfaces';
import Cupon from '../../models/cupon.model';
import { Orders, ProductOrder } from '../interfaces/order.interface';
import { cuponDetail } from '../interfaces/cupon.interface';
import Product from '../../models/products';
import User, { IUserDocument } from '../../models/users';
import {
  NotFoundError,
  ResourceAlreadyExistsError,
} from '../handlers/errorHandler';

export class OrdersService {
  constructor() {}

  async createOrder(req: Request) {
    const idUser = req.body.user._id;
    const order: IOrder = req.body;
    console.log('order: ', order);
    order.email = req.body.user.email;
    const orderModel = new Order(order);

    orderModel.userId = idUser;

    const data: serviceResult = {
      code: 201,
      message: 'order creada',
    };
    const cupon: cuponDetail = req.body.cupon;
    let searcuCupon;
    const idlistProdtcs: string[] = order.products.map(item => String(item.id));
    let searchProducts = [];

    //buscando el numero de order para saber si existe, si existe crearlo de nuevo

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

    orderModel.numberOrder = await this.generateUniqueNumberTrack(); //generando id de seguimiendo
    const savedOrder = await orderModel.save();
    data.data = savedOrder;

    return data;
  }

  async getOrder(req: Request) {
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
  }

  async getOrders(req: Request) {
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
  }

  async updateOrder(req: Request) {
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
  }

  async deleteOrder(req: Request) {
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
  }

  async deleteAllOrder(req: Request) {
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
  generateRandomNumber(length = 6): number {
    return Number(
      Math.floor(Math.random() * Math.pow(10, length))
        .toString()
        .padStart(length, '0'),
    );
  }
  async generateUniqueNumberTrack(maxAttempts = 100): Promise<number> {
    let numbertrack = this.generateRandomNumber();
    let attempts = 0;

    // Continuar generando hasta encontrar un número que no exista en la base de datos
    while (await Order.exists({ numberOrder: numbertrack })) {
      attempts++;

      // Si se alcanza el límite de intentos, lanzar un error
      if (attempts >= maxAttempts) {
        throw new ResourceAlreadyExistsError(
          'No se pudo generar un número de orden único después de varios intentos',
        );
      }

      numbertrack = this.generateRandomNumber();
    }

    return numbertrack;
  }

  async detailUserAndOrders(req: Request) {
    const data: serviceResult = {
      code: 200,
      message: 'detalle user y orders',
    };

    const userId = req.body.user._id;
    let user: IUserDocument;

    const detailUser: { user: IUserDocument; orders: unknown } = {
      user: {} as IUserDocument, // Asigna un valor inicial o usa un tipo "as"
      orders: {},
    };
    const { page = 1, sort = -1 } = req.query;

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

    const orders = await Order.paginate({ userId: userId }, options);
    detailUser.orders = orders;

    data.data = detailUser;
    console.log('order: ', orders);

    return data;
  }
  generateRandomOrderNumber() {
    // Genera un número aleatorio de 7 dígitos
    return Math.floor(1000000 + Math.random() * 9000000);
  }
}
