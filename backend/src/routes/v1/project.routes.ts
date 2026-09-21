import { Router } from 'express';
import { ProjectController } from '../../controllers/project.controller';
import { validate } from '../../middlewares/validate';
import { authMiddleware } from '../../middlewares/auth';
import { createProjectSchema, updateProjectSchema } from '../../validators/project.validator';

const router = Router();

// Public routes
router.get('/', ProjectController.getAll);
router.get('/featured', ProjectController.getFeatured);
router.get('/slug/:slug', ProjectController.getBySlug);
router.get('/:id', ProjectController.getById);

// Protected routes (admin only)
router.post('/', authMiddleware, validate(createProjectSchema), ProjectController.create);
router.put('/:id', authMiddleware, validate(updateProjectSchema), ProjectController.update);
router.delete('/:id', authMiddleware, ProjectController.delete);

export default router;
