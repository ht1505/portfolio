import { Router } from 'express';
import { SkillController } from '../../controllers/skill.controller';
import { validate } from '../../middlewares/validate';
import { authMiddleware } from '../../middlewares/auth';
import { createSkillSchema, updateSkillSchema } from '../../validators/skill.validator';

const router = Router();

// Public
router.get('/', SkillController.getAll);
router.get('/:id', SkillController.getById);

// Protected
router.post('/', authMiddleware, validate(createSkillSchema), SkillController.create);
router.put('/:id', authMiddleware, validate(updateSkillSchema), SkillController.update);
router.delete('/:id', authMiddleware, SkillController.delete);

export default router;
