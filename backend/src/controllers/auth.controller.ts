import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { ApiError } from '../utils/ApiError';
import { ProjectService } from '../services/project.service';
import { ExperienceService } from '../services/experience.service';
import { SkillService } from '../services/skill.service';
import { ContactService } from '../services/contact.service';

/**
 * DEV-ONLY auth controller.
 * ⚠️ NOT production-ready — uses plaintext password comparison.
 *
 * TODO (before production):
 * - Store admin users in database with bcrypt-hashed passwords
 * - Implement refresh token rotation
 * - Add proper session management
 */
export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw ApiError.badRequest('Email and password are required');
      }

      // DEV-ONLY: Compare against env vars (NOT production-ready)
      if (email !== env.ADMIN_EMAIL || password !== env.ADMIN_PASSWORD) {
        throw ApiError.unauthorized('Invalid credentials');
      }

      const token = jwt.sign(
        { email, role: 'admin' },
        env.JWT_SECRET,
        { expiresIn: '1h' as any }
      );

      res.json({
        success: true,
        data: { token, expiresIn: env.JWT_EXPIRES_IN },
      });
    } catch (error) {
      next(error);
    }
  }

  static async me(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      res.json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  }

  static async dashboardStats(_req: Request, res: Response, next: NextFunction) {
    try {
      const projectService = new ProjectService();
      const experienceService = new ExperienceService();
      const skillService = new SkillService();
      const contactService = new ContactService();

      const [projects, experiences, skills, messages, unreadMessages] = await Promise.all([
        projectService.count(),
        experienceService.count(),
        skillService.count(),
        contactService.count(),
        contactService.countUnread(),
      ]);

      res.json({
        success: true,
        data: { projects, experiences, skills, messages, unreadMessages },
      });
    } catch (error) {
      next(error);
    }
  }
}
