import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { ApiError } from '../utils/ApiError';

/**
 * DEV-ONLY authentication middleware.
 * ⚠️ NOT production-ready — uses a simple JWT check with no refresh tokens,
 * no bcrypt password hashing, and hardcoded admin credentials.
 * 
 * TODO (before production):
 * - Hash passwords with bcrypt
 * - Implement refresh token rotation
 * - Store admin users in database
 * - Add proper session management
 */
export function authMiddleware(req: Request, _res: Response, next: NextFunction): void {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw ApiError.unauthorized('No token provided');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, env.JWT_SECRET);

    (req as any).user = decoded;
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      next(error);
    } else {
      next(ApiError.unauthorized('Invalid or expired token'));
    }
  }
}
