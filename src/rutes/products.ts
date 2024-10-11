import { Router } from 'express';
import { controller_product } from '../controllers/products';
import Auth from '../core/middleware/sesion';
import { validator_create_product } from '../core/middleware/validators/products..validator';
import { checkRole } from '../core/middleware/roles';

const router = Router();

router.get('/test', controller_product.test);
router.post(
  '/',
  validator_create_product,
  Auth,
  checkRole(['admin']),
  controller_product.create,
);
router.get('/', controller_product.get);
router.put('/:id', Auth, checkRole(['admin']), controller_product.update);
router.delete('/:id', Auth, checkRole(['admin']), controller_product.delete);
router.delete('/', Auth, checkRole(['admin']), controller_product.delete_all);

export default router;
