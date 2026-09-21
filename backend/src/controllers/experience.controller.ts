import { Request, Response, NextFunction } from 'express';
import { ExperienceService } from '../services/experience.service';

const experienceService = new ExperienceService();

export class ExperienceController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const experiences = await experienceService.getAll();
      res.json({ success: true, data: experiences });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const experience = await experienceService.getById(req.params.id as string);
      res.json({ success: true, data: experience });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const experience = await experienceService.create(req.body);
      res.status(201).json({ success: true, data: experience });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const experience = await experienceService.update(req.params.id as string, req.body);
      res.json({ success: true, data: experience });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await experienceService.delete(req.params.id as string);
      res.json({ success: true, message: 'Experience deleted' });
    } catch (error) {
      next(error);
    }
  }
}
