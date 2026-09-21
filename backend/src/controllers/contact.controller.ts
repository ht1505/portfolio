import { Request, Response, NextFunction } from 'express';
import { ContactService } from '../services/contact.service';

const contactService = new ContactService();

export class ContactController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const messages = await contactService.getAll();
      res.json({ success: true, data: messages });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const message = await contactService.create(req.body);
      res.status(201).json({
        success: true,
        message: 'Message sent successfully',
        data: message,
      });
    } catch (error) {
      next(error);
    }
  }

  static async markAsRead(req: Request, res: Response, next: NextFunction) {
    try {
      await contactService.markAsRead(req.params.id as string);
      res.json({ success: true, message: 'Message marked as read' });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await contactService.delete(req.params.id as string);
      res.json({ success: true, message: 'Message deleted' });
    } catch (error) {
      next(error);
    }
  }
}
