import { Router } from 'express';
import { payment_controller } from '../controllers/payment.controller';
import Auth from '../core/middleware/sesion';

import { checkRole } from '../core/middleware/roles';

const router = Router();

router.post('/', Auth, checkRole(['admin']), payment_controller.create);
router.get('/', payment_controller.get);
router.put('/:id', Auth, checkRole(['admin']), payment_controller.update);
router.delete('/:id', Auth, checkRole(['admin']), payment_controller.delete);
router.delete('/', Auth, checkRole(['admin']), payment_controller.delete_all);

export default router;
