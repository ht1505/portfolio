import { Router } from 'express';
import projectRoutes from './project.routes';
import experienceRoutes from './experience.routes';
import skillRoutes from './skill.routes';
import contactRoutes from './contact.routes';
import authRoutes from './auth.routes';

const router = Router();

router.use('/projects', projectRoutes);
router.use('/experience', experienceRoutes);
router.use('/skills', skillRoutes);
router.use('/contact', contactRoutes);
router.use('/auth', authRoutes);

export default router;
