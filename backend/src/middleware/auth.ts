import { Request, Response, NextFunction } from 'express';
import { verifyToken, JwtPayload } from '../utils/jwt';
import { AuthenticationError, AuthorizationError } from '../utils/errors';
import { env } from '../config/env';
import { getDbPool } from '../config/db';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const extractToken = (req: Request, cookieName: string): string | null => {
  if (req.cookies && req.cookies[cookieName]) {
    return req.cookies[cookieName];
  }
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7, authHeader.length);
  }
  return null;
};

export const optionalAuth = (roleType: 'user' | 'admin' | 'author' = 'user') => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      let cookieName = env.SESSION_COOKIE_USER;
      if (roleType === 'admin') cookieName = env.SESSION_COOKIE_ADMIN;
      if (roleType === 'author') cookieName = env.SESSION_COOKIE_AUTHOR;

      const token = extractToken(req, cookieName);
      if (!token) {
        return res.status(200).json({ success: true, data: null });
      }

      const decoded = verifyToken(token);
      if (roleType === 'admin' && decoded.role !== 'admin' && decoded.role !== 'superadmin') {
        return res.status(200).json({ success: true, data: null });
      }
      
      req.user = decoded;
      next();
    } catch (error) {
      // If token is invalid/expired, just return null instead of 401
      return res.status(200).json({ success: true, data: null });
    }
  };
};

export const requireAuth = (roleType: 'user' | 'admin' | 'author' = 'user') => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      let cookieName = env.SESSION_COOKIE_USER;
      if (roleType === 'admin') cookieName = env.SESSION_COOKIE_ADMIN;
      if (roleType === 'author') cookieName = env.SESSION_COOKIE_AUTHOR;

      const token = extractToken(req, cookieName);
      if (!token) {
        throw new AuthenticationError('Authentication required');
      }

      const decoded = verifyToken(token);
      
      // Ensure the token role matches the required role boundary
      if (roleType === 'admin' && decoded.role !== 'admin' && decoded.role !== 'superadmin') {
        throw new AuthorizationError('Admin access required');
      }
      
      req.user = decoded;
      next();
    } catch (error) {
      next(new AuthenticationError('Invalid or expired token'));
    }
  };
};

export const requireSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
  requireAuth('admin')(req, res, () => {
    if (req.user?.role !== 'superadmin') {
      return next(new AuthorizationError('SuperAdmin privileges required'));
    }
    next();
  });
};

export const requireModulePermission = (moduleKey: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // First require admin auth
      requireAuth('admin')(req, res, async () => {
        if (!req.user) return next(new AuthenticationError());
        
        // SuperAdmin bypasses all module permissions
        if (req.user.role === 'superadmin') {
          return next();
        }

        // For regular admins, check the database for module access
        const pool = await getDbPool();
        const result = await pool.request()
          .input('AdminID', req.user.id)
          .input('PermissionKey', moduleKey)
          .query(`
            SELECT 1 FROM [dbo].[AdminPermissions] 
            WHERE AdminID = @AdminID AND PermissionKey = @PermissionKey
          `);

        if (result.recordset.length === 0) {
          throw new AuthorizationError(`Missing required module permission: ${moduleKey}`);
        }

        next();
      });
    } catch (error) {
      next(error);
    }
  };
};
