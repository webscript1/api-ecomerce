import { Router } from 'express';
import { controller_cupon } from '../controllers/cupon.controller';
import Auth from '../middleware/sesion';

import { checkRole } from '../middleware/roles';

const router = Router();

router.post('/', Auth, checkRole(['admin']), controller_cupon.create);
router.get('/:codigo', controller_cupon.get);
router.get('/', controller_cupon.getAll);
router.put('/:id', Auth, checkRole(['admin']), controller_cupon.update);
router.delete('/:id', Auth, checkRole(['admin']), controller_cupon.delete);
router.delete('/', Auth, checkRole(['admin']), controller_cupon.deleteAll);

export default router;
