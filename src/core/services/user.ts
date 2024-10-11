import { Request } from 'express';
import { serviceResult } from '../interfaces/interfaces';
import User from '../../models/users';
import { compare } from '../handlers/password.handler';
import { tokenSing } from '../handlers/jwt.handller';

import { NotFoundError, UnauthorizedError } from '../handlers/errorHandler';

export class User_service {
  async test() {
    const data: serviceResult = {
      code: 200,
      message: 'test user',
    };

    return data;
  }

  async create(req: Request) {
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
  }
  async get(req: Request) {
    const data: serviceResult = {
      code: 200,
      message: 'usuario',
    };
    const { id, page, sort, limit = 10, email } = req.query;
    let users: unknown;
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
  }
  async update(req: Request) {
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
  }
  async delete(req: Request) {
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
  }
  async deleteAll() {
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
  }
  async sing_in(req: Request) {
    const { email, password } = req.body;

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
    const token = await tokenSing(user);
    data.code = 200;
    data.message = 'sesion iniciada';
    data.data = { token: token };
    return data;
  }
}

export { User };
