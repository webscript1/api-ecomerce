import { check } from 'express-validator';
import { validationResults } from '../../handlers/validator.hadler';
import { Request, Response, NextFunction } from 'express';

export const valitador_sing_in = [
  check(
    'email',
    'El correo electrónico es requerido y debe tener un formato válido',
  )
    .exists()
    .notEmpty()
    .isEmail()
    .isLength({ min: 3, max: 100 }),
  check(
    'password',
    'La contraseña es requerida y debe tener al menos 4 caracteres',
  )
    .exists()
    .notEmpty()
    .isString()
    .isLength({ min: 4, max: 100 }),
  (req: Request, res: Response, next: NextFunction) => {
    return validationResults(req, res, next);
  },
];
export const valitador_sing_up = [
  check(
    'firstName',
    'El nombre es requerido y debe ser una cadena de texto de entre 2 y 30 caracteres',
  )
    .exists()
    .notEmpty()
    .isString()
    .isLength({ min: 2, max: 30 }),
  check(
    'lastName',
    'El apellido es requerido y debe ser una cadena de texto de entre 2 y 30 caracteres',
  )
    .exists()
    .notEmpty()
    .isString()
    .isLength({ min: 2, max: 30 }),
  check(
    'email',
    'El correo electrónico es requerido y debe tener un formato válido',
  )
    .exists()
    .notEmpty()
    .isEmail()
    .isLength({ min: 3, max: 100 }),
  check(
    'password',
    'La contraseña es requerida y debe tener entre 4 y 30 caracteres',
  )
    .exists()
    .notEmpty()
    .isString()
    .isLength({ min: 4, max: 30 }),
  check(
    'phone',
    'El número de teléfono es requerido y debe tener entre 4 y 30 caracteres',
  )
    .exists()
    .notEmpty()
    .isString()
    .isLength({ min: 4, max: 30 }),
  (req: Request, res: Response, next: NextFunction) => {
    return validationResults(req, res, next);
  },
];
