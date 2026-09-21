import { Request, Response, NextFunction } from 'express';
import { SkillService } from '../services/skill.service';

const skillService = new SkillService();

export class SkillController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const skills = await skillService.getAll();
      res.json({ success: true, data: skills });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const skill = await skillService.getById(req.params.id as string);
      res.json({ success: true, data: skill });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const skill = await skillService.create(req.body);
      res.status(201).json({ success: true, data: skill });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const skill = await skillService.update(req.params.id as string, req.body);
      res.json({ success: true, data: skill });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await skillService.delete(req.params.id as string);
      res.json({ success: true, message: 'Skill deleted' });
    } catch (error) {
      next(error);
    }
  }
}
