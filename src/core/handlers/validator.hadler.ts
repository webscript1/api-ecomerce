import { Request, Response, NextFunction } from 'express';
import { validationResult, Result } from 'express-validator';

export const validationResults = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (error: unknown) {
    if (error instanceof Result) {
      // Verifica si el error es una instancia de Result (express-validator)
      res.status(400); // o res.status(422) dependiendo de tu caso
      return res.json({ errors: error.array() });
    } else {
      // En caso de otro tipo de error, manejar de forma genérica
      res.status(500).json({ message: 'Error desconocido en la validación' });
    }
  }
};
