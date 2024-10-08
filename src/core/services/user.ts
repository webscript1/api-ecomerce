import { Request, Response } from 'express';
import { serviceResult } from '../interfaces/interfaces';
import User from '../../models/users';
import { compare } from '../utils/password';
import { tokenSing } from '../utils/jwt';
import Order from '../../models/orders';
import { NotFoundError, UnauthorizedError } from '../errors/errorHandler';

export class User_service {
  async test() {
    try {
      const data: serviceResult = {
        code: 200,
        message: 'test user',
      };

      return data;
    } catch (error) {
      throw error;
    }
  }
  async create(req: Request, res: Response) {
    try {
      const data: serviceResult = {
        code: 201,
        message: 'usuario creado',
      };

      const user = new User(req.body);
      user.role = 'user';
      console.log('user ', user);

      const user_save = await user.save();
      data.data = user_save;

      return data;
    } catch (error) {
      throw error;
    }
  }
  async get(req: Request, res: Response) {
    try {
      const data: serviceResult = {
        code: 200,
        message: 'usuario',
      };
      const { id, page, sort, limit = 10, email } = req.query;
      let users: any;
      const options = {
        limit: limit,
        page: page || 1,
        // Proyección: solo las propiedades 'result' y 'profit'
        sort: { createdAt: Number(sort) || -1 }, //-1 : desendente 1:asendente
        select: '-password',
      };

      if (id) {
        users = await User.findById(id).select('-password');
        if (!users) {
          throw new NotFoundError('usuario no encontrado');
        }
        data.data = users;
        return data;
      }
      if (email) {
        users = await User.findOne({ email: email }).select('-password');
        if (!users) {
          throw new NotFoundError('usuario no encontrado');
        }
        data.data = users;
        return data;
      }

      users = await User.paginate({}, options);

      data.data = users;

      return data;
    } catch (error) {
      throw error;
    }
  }
  async update(req: Request, res: Response) {
    try {
      const data: serviceResult = {
        code: 200,
        message: 'usuario actualizado',
      };
      const { id } = req.params;

      const user_update = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      }).select('-password');

      if (!user_update) {
        throw new NotFoundError('usuario no encontrado para actualizar');
      }
      data.data = user_update;

      return data;
    } catch (error) {
      throw error;
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const data: serviceResult = {
        code: 200,
        message: 'usuario eliminado',
      };
      const { id } = req.params;

      const user_delete = await User.findByIdAndDelete(id).select('-password');

      if (!user_delete) {
        throw new NotFoundError('usuario no encontrado para eliminar');
      }
      data.data = user_delete;

      return data;
    } catch (error) {
      throw error;
    }
  }
  async deleteAll(req: Request, res: Response) {
    try {
      const data: serviceResult = {
        code: 200,
        message: 'todos los usuarios eliminados',
      };

      const user_delete = await User.deleteMany();

      if (!user_delete) {
        throw new NotFoundError('no hay usuarios para eliminar');
      }
      data.data = user_delete;

      return data;
    } catch (error) {
      throw error;
    }
  }
  async sing_in(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      let token;
      const data: serviceResult = {
        code: 0,
        message: '',
      };

      // Buscar el usuario por su correo electrónico
      const user = await User.findOne({ email });

      // Verificar si el usuario existe
      if (!user) {
        throw new NotFoundError('Email no existe');
      }

      // Verificar la contraseña
      const passwordMatch = await compare(password, user.password);
      if (!passwordMatch) {
        throw new UnauthorizedError('contraseña incorrecta.');
      }

      // Generar token de acceso (JWT) para el usuario
      token = await tokenSing(user);
      data.code = 200;
      data.message = 'sesion iniciada';
      data.data = { token: token };
      return data;
    } catch (error) {
      throw error;
    }
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

      return data;
    } catch (error) {
      throw error;
    }
  }
}

export { User };
