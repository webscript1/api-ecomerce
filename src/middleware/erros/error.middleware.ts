// middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../../core/errors/errorHandler';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err instanceof CustomError) {
    console.log('dddddddddddddddddddddddddddddddddddddddddddddd');
    // Errores personalizados
    res.status(err.statusCode).send({ message: err.message });
  } else {
    // Errores generales
    console.error(err); // Loguea el error para referencia interna
    res.status(500).send({
      message: 'Internal Server Error',
      error: process.env.NODE_ENV === 'development' ? err : {},
    });
  }
};
