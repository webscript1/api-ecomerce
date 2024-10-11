import { Router } from 'express';
import { user_controller } from '../controllers/users';
import { checkRole } from '../core/middleware/roles';
import { checkUniqueEmail } from '../core/middleware/checkUniqueEmail ';
import {
  valitador_sing_in,
  valitador_sing_up,
} from '../core/middleware/validators/user.validator';
import Auth from '../core/middleware/sesion';

const router = Router();

router.get('/test', user_controller.test);
router.post(
  '/create',
  valitador_sing_up,
  checkUniqueEmail,
  user_controller.create,
);
router.get('/', Auth, user_controller.get);
router.put('/:id', Auth, user_controller.update);
router.delete(
  '/delete/:id',
  Auth,
  checkRole(['admin']),
  user_controller.delete,
);
router.delete(
  '/delete-all',
  Auth,
  checkRole(['admin']),
  user_controller.deleteAll,
);
router.post('/sing-in', valitador_sing_in, user_controller.sing_in);

export default router;
