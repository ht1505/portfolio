import { Router } from 'express';
import { AuthController } from '../../controllers/auth.controller';
import { authMiddleware } from '../../middlewares/auth';

const router = Router();

router.post('/login', AuthController.login);
router.get('/me', authMiddleware, AuthController.me);
router.get('/dashboard-stats', authMiddleware, AuthController.dashboardStats);

export default router;
