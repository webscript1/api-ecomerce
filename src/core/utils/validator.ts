import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const validationResults = (req: Request, res: Response, next: NextFunction) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (error: any) {
    res.status(400); // o res.status(422);
    res.send({ errors: error.array() });
  }
};

export default validationResults;
