import { Router } from 'express';
import { controller_category } from '../controllers/category.controllers';

const router = Router();

router.post('/', controller_category.create);
router.get('/', controller_category.getAll);
router.get('/:id', controller_category.get);
router.put('/:id', controller_category.update);
router.delete('/:id', controller_category.delete);
router.delete('/', controller_category.deleteAll);

export default router;
