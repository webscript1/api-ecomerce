import { check, body, validationResult } from 'express-validator';
import mongoose from 'mongoose';
import validationResults from '../../core/utils/validator';

export const validator_cart = [
  body('products')
    .isObject()
    .withMessage('La propiedad products debe ser un objeto.')
    .custom(products => {
      if (!products.productId) {
        throw new Error('El objeto products debe contener un productId.');
      }
      if (!mongoose.Types.ObjectId.isValid(products.productId)) {
        throw new Error(
          `El ID de producto ${products.productId} no es válido.`,
        );
      }
      if (typeof products.quantity !== 'number' || products.quantity <= 0) {
        throw new Error('La cantidad debe ser un número positivo.');
      }
      return true;
    }), //.withMessage('El campo products debe tener una estructura válida.'),

  (req: any, res: any, next: any) => {
    return validationResults(req, res, next);
  },
];
