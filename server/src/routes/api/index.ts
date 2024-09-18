import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { categoryRouter } from './category-routes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/categories', categoryRouter )

export default router;
