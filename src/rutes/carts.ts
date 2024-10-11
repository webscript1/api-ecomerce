import { Router } from 'express';
import { cars_controller } from '../controllers/carts';
import Auth from '../core/middleware/sesion';
import { validator_cart } from '../core/middleware/validators/carts.validatir';

const router = Router();

router.post('/', validator_cart, Auth, cars_controller.create);
router.get('/count', Auth, cars_controller.countCart);

router.get('/:code', Auth, cars_controller.get);
router.get('/', Auth, cars_controller.get_all);
router.put('/qty', Auth, cars_controller.updateQtyCart);
router.put('/:id', Auth, cars_controller.update);
router.delete('/:id', Auth, cars_controller.delete);
router.delete('/delete/all', Auth, cars_controller.delete_all);

export default router;
