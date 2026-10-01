import * as jwt from 'jsonwebtoken';
import { env } from '../config/env';

const JWT_SECRET = env.SESSION_SECRET || 'fallback-secret-do-not-use-in-prod';

export interface JwtPayload {
  id: number;
  role: 'superadmin' | 'admin' | 'user' | 'author';
  email: string;
}

export const generateToken = (payload: JwtPayload, expiresIn: string = '7d') => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn } as jwt.SignOptions);
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};


