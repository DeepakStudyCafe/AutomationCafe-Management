import { Router } from 'express';
import { login, logout, register, getMe } from '../controllers/auth.controller';
import { validateRequest } from '../middleware/validateRequest';
import { loginSchema, registerSchema } from '../validators/auth.validator';
import { authLimiter } from '../middleware/rateLimiter';
import { requireAuth, optionalAuth } from '../middleware/auth';

const router = Router();

router.post('/register', authLimiter, validateRequest(registerSchema), register);
router.post('/login', authLimiter, validateRequest(loginSchema), login);
router.post('/logout', logout);

// Fetch session info without throwing 401 on unauthenticated calls
router.get('/me', optionalAuth('user'), getMe);
router.get('/admin/me', optionalAuth('admin'), getMe);

export default router;
