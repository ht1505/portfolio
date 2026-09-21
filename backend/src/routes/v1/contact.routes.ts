import { Router } from 'express';
import { ContactController } from '../../controllers/contact.controller';
import { validate } from '../../middlewares/validate';
import { authMiddleware } from '../../middlewares/auth';
import { createContactSchema } from '../../validators/contact.validator';

const router = Router();

// Public — anyone can submit a message
router.post('/', validate(createContactSchema), ContactController.create);

// Protected — admin reads/manages messages
router.get('/', authMiddleware, ContactController.getAll);
router.patch('/:id/read', authMiddleware, ContactController.markAsRead);
router.delete('/:id', authMiddleware, ContactController.delete);

export default router;
