import rateLimit from 'express-rate-limit';
import { Response, Request, NextFunction } from 'express';
import { TooManyRequestsError } from '../../handlers/errorHandler';

// Limitar a 100 solicitudes por IP cada 15 minutos
export const limiter = rateLimit({
  windowMs: 60 * 1000, // 15 minutos
  max: 2500, // máximo 100 solicitudes por IP
  message: 'Demasiadas solicitudes desde esta IP, por favor intenta más tarde.',
  handler: (req: Request, res: Response, next: NextFunction) => {
    next(
      new TooManyRequestsError(
        'Demasiadas solicitudes desde esta IP, por favor intenta más tarde.',
      ),
    );
  },
});
