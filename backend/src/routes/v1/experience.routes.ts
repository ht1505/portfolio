import { Router } from 'express';
import { ExperienceController } from '../../controllers/experience.controller';
import { validate } from '../../middlewares/validate';
import { authMiddleware } from '../../middlewares/auth';
import { createExperienceSchema, updateExperienceSchema } from '../../validators/experience.validator';

const router = Router();

// Public
router.get('/', ExperienceController.getAll);
router.get('/:id', ExperienceController.getById);

// Protected
router.post('/', authMiddleware, validate(createExperienceSchema), ExperienceController.create);
router.put('/:id', authMiddleware, validate(updateExperienceSchema), ExperienceController.update);
router.delete('/:id', authMiddleware, ExperienceController.delete);

export default router;
