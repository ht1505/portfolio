import { Request, Response, NextFunction } from 'express';
import { ProjectService } from '../services/project.service';

const projectService = new ProjectService();

export class ProjectController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const projects = await projectService.getAll();
      res.json({ success: true, data: projects });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const project = await projectService.getById(req.params.id as string);
      res.json({ success: true, data: project });
    } catch (error) {
      next(error);
    }
  }

  static async getBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const project = await projectService.getBySlug(req.params.slug as string);
      res.json({ success: true, data: project });
    } catch (error) {
      next(error);
    }
  }

  static async getFeatured(_req: Request, res: Response, next: NextFunction) {
    try {
      const projects = await projectService.getFeatured();
      res.json({ success: true, data: projects });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const project = await projectService.create(req.body);
      res.status(201).json({ success: true, data: project });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const project = await projectService.update(req.params.id as string, req.body);
      res.json({ success: true, data: project });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await projectService.delete(req.params.id as string);
      res.json({ success: true, message: 'Project deleted' });
    } catch (error) {
      next(error);
    }
  }
}
