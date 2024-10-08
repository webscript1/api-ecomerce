import { check } from 'express-validator';
import validationResults from '../../core/utils/validator';

export const validator_create_product = [
  check('name')
    .exists()
    .withMessage('El campo nombre es obligatorio.')
    .notEmpty()
    .withMessage('El nombre no puede estar vacío.')
    .isString()
    .withMessage('El nombre debe ser una cadena de caracteres.')
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres.'),

  check('description')
    .exists()
    .withMessage('El campo descripción es obligatorio.')
    .isString()
    .withMessage('La descripción debe ser una cadena de caracteres.')
    .isLength({ min: 0, max: 500 })
    .withMessage('La descripción no puede exceder los 500 caracteres.'),

  check('price')
    .exists()
    .withMessage('El campo precio es obligatorio.')
    .notEmpty()
    .withMessage('El precio no puede estar vacío.')
    .isNumeric()
    .withMessage('El precio debe ser un número.')
    .isLength({ min: 1, max: 100 })
    .withMessage('El precio debe tener entre 1 y 100 unidades.'),

  check('category')
    .exists()
    .withMessage('El campo categoría es obligatorio.')
    .notEmpty()
    .withMessage('La categoría no puede estar vacía.')
    .isString()
    .withMessage('La categoría debe ser una cadena de caracteres.')
    .isLength({ min: 2, max: 30 })
    .withMessage('La categoría debe tener entre 2 y 30 caracteres.'),

  check('quantity')
    .exists()
    .withMessage('El campo cantidad es obligatorio.')
    .notEmpty()
    .withMessage('La cantidad no puede estar vacía.')
    .isNumeric()
    .withMessage('La cantidad debe ser un número.')
    .isLength({ min: 1, max: 50 })
    .withMessage('La cantidad debe tener entre 1 y 50 unidades.'),

  check('imageUrl')
    .exists()
    .withMessage('El campo URL de la imagen es obligatorio.')
    .notEmpty()
    .withMessage('La URL de la imagen no puede estar vacía.')
    .isString()
    .withMessage('La URL de la imagen debe ser una cadena de caracteres.')
    .isLength({ min: 1, max: 1000 })
    .withMessage('La URL de la imagen debe tener entre 1 y 1000 caracteres.'),

  (req: any, res: any, next: any) => {
    return validationResults(req, res, next);
  },
];
