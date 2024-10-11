import { Router } from 'express';
import { orders_controller } from '../controllers/orders';
import Auth from '../core/middleware/sesion';
import { validator_create_order } from '../core/middleware/validators/orders.validator';

const router = Router();

router.post('/', validator_create_order, Auth, orders_controller.create);
router.get('/', orders_controller.get);
router.get('/all', Auth, orders_controller.get_all);
router.put('/:id', Auth, orders_controller.update);
router.delete('/:id', Auth, orders_controller.delete);
router.delete('/delete/all', Auth, orders_controller.delete_all);
router.get(
  '/detail-user-and-orders',
  Auth,
  orders_controller.detailUserAndOrders,
);
export default router;
