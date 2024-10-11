import { verifyToken, TokenData } from '../handlers/jwt.handller';
import { Request, Response, NextFunction } from 'express';
import User from '../../models/users';
import {
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from '../handlers/errorHandler';

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Comprobando que haya un token de autorización
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new ValidationError('Missing session token');
    }

    const token = authHeader.split(' ')[1]; // Asumiendo que el formato es "Bearer token"

    // Verificando que el token sea válido
    const dataToken = (await verifyToken(token)) as TokenData;

    // Verificando que el token tenga la id del usuario
    if (!dataToken || !dataToken.id) {
      throw new UnauthorizedError('Session invalid');
    }
    if (req.body) {
      // Buscando el usuario
      const user = await User.findById(dataToken.id);
      if (!user) {
        throw new NotFoundError('Usuario no encontrado');
      }

      // Agregar la propiedad 'user' al objeto req

      req.body.user = user;
    }

    next(); // Llamar a next() para pasar al siguiente middleware o controlador
  } catch (error) {
    next(error); // Pasa el error al middleware de manejo de errores
  }
};

export default authMiddleware;
