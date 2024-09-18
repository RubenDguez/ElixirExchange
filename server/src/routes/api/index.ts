import { Router } from 'express';
import { categoryRouter } from './category-routes.js';
import { drinkRouter } from './drink-routes.js';
import { ingredientRouter } from './ingredient-routes.js';
import { userRouter } from './user-routes.js';

const router = Router();

router.use('/categories', categoryRouter);
router.use('/drink', drinkRouter);
router.use('/ingredients', ingredientRouter);
router.use('/users', userRouter);

export default router;
