import { Router } from 'express';
import { categoryRouter } from './category-routes.js';
import { drinkRouter } from './drink-routes.js';
import { userRouter } from './user-routes.js';

const router = Router();

router.use('/categories', categoryRouter);
router.use('/drink', drinkRouter);
router.use('/users', userRouter);

export default router;
