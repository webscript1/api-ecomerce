import { NextFunction, Request, Response } from 'express';
import User from '../models/users';
import { ResourceAlreadyExistsError } from '../core/errors/errorHandler';

// Middleware para verificar la unicidad del correo electrónico
export const checkUniqueEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      throw new ResourceAlreadyExistsError(
        'El correo electrónico ya está registrado.',
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};
