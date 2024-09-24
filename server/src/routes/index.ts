import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';
import { signupRoutes } from './api/signup-routes.js';
import { drinksRouter } from './drinks-routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/api', authenticateToken, apiRoutes);
router.use('/signup', signupRoutes);
router.use('/drinks', drinksRouter);
export default router;
