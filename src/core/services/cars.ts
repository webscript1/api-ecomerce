import { Request, Response, NextFunction } from 'express';
import Cart from '../../models/cars';
import { serviceResult } from '../interfaces/interfaces';
import { NotFoundError } from '../errors/errorHandler';

export class CartService {
  constructor() {}

  async createCart(req: Request, res: Response): Promise<serviceResult> {
    try {
      const { products } = req.body;
      const userId = req.body.user._id;
      const productId = products.productId;
      const quantity = products.quantity;

      let cart = await Cart.findOne({ userId }).populate('products.productId');

      if (cart) {
        console.log(cart.products);
        // Carrito existe, verificar si el producto ya está en el carrito
        const productIndex = cart.products.findIndex(
          p => p.productId._id.toString() === productId,
        );

        if (productIndex > -1) {
          // Producto ya existe en el carrito, actualizar cantidad
          cart.products[productIndex].quantity += quantity;
        } else {
          // Producto no está en el carrito, agregar nuevo producto
          cart.products.push({ productId, quantity });
        }
      } else {
        // Crear un nuevo carrito si no existe
        cart = new Cart({
          userId,
          products: [{ productId, quantity }],
        });
      }
      //console.log('card :',cart)

      await cart.save();

      const data: serviceResult = {
        code: 200,
        message: 'Producto agregado al carrito exitosamente',
        data: cart,
      };

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getCart(req: Request, res: Response): Promise<serviceResult> {
    try {
      const idUser = req.body.user._id;
      const cart = await Cart.findOne({
        _id: req.params.id,
        userId: idUser,
      }).populate('products.productId');

      if (!cart) {
        throw new NotFoundError('Carrito no encontrado');
      }
      const data: serviceResult = {
        code: 200,
        message: 'Carrito encontrado',
        data: cart,
      };
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getCarts(req: Request, res: Response): Promise<serviceResult> {
    try {
      const { page = 1, limit = 10 } = req.query;
      const idUser = req.body.user._id;
      const options = {
        page: Number(page),
        limit: Number(limit),
        populate: 'products.productId',
      };
      const carts = await Cart.paginate({ userId: idUser }, options);
      const data: serviceResult = {
        code: 200,
        message: 'Carritos encontrados',
        data: carts,
      };
      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateCart(req: Request, res: Response): Promise<serviceResult> {
    try {
      const user_id = req.body.user._id;
      //const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('products.productId');
      const cart = await Cart.findOneAndUpdate(
        { _id: req.params.id, userId: user_id },
        req.body,
        { new: true },
      ).populate('products.productId');

      if (!cart) {
        throw new NotFoundError('Carrito no encontrado para actualizar');
      }
      const data: serviceResult = {
        code: 200,
        message: 'Carrito actualizado',
        data: cart,
      };
      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteCart(req: Request, res: Response): Promise<serviceResult> {
    try {
      const idUser = req.body.user._id;

      const cart = await Cart.findOneAndDelete({
        _id: req.params.id,
        userId: idUser,
      });
      const data: serviceResult = {
        code: 200,
        message: 'Carrito eliminado',
        data: cart,
      };
      if (!cart) {
        throw new NotFoundError('Carrito no encontrado para eliminar');
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteAllCarts(req: Request, res: Response): Promise<serviceResult> {
    try {
      const idUser = req.body.user._id;
      console.log('user id ', idUser);
      const cartsDeleted = await Cart.deleteMany({ userId: idUser });

      if (!cartsDeleted) {
        throw new NotFoundError('No se encontraron carritos para eliminar');
      }
      const data: serviceResult = {
        code: 200,
        message: 'Todos los carritos eliminados',
        data: cartsDeleted,
      };
      return data;
    } catch (error) {
      throw error;
    }
  }
  async updateQtyCart(req: Request): Promise<serviceResult> {
    try {
      const user_id = req.body.user._id;
      const userId = req.body.user._id;
      const { productId } = req.query;
      const quantity: number = Number(req.query.quantity);
      console.log('quantity:', quantity, ' id: ', productId);

      const data: serviceResult = {
        code: 200,
        message: 'Carrito actualizado t5t5t5t5t',
      };

      let cart = await Cart.findOne({ userId: userId });

      if (cart) {
        console.log(cart.products);
        // Carrito existe, verificar si el producto ya está en el carrito
        const productIndex = cart.products.findIndex(
          p => p.productId.toString() === productId,
        );

        if (productIndex > -1) {
          // Producto ya existe en el carrito, actualizar cantidad
          cart.products[productIndex].quantity = quantity;
          let updateCart = await Cart.findByIdAndUpdate(
            cart._id,
            { products: cart.products },
            { new: true },
          );
          data.data = updateCart;
          return data;
        }
      } else {
        data.code = 404;
        data.message = 'nohay productosen carts';
        return data;
      }
      return data;
    } catch (error) {
      throw error;
    }
  }
}
