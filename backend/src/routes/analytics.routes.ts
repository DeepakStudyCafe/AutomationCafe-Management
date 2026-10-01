import { Router } from 'express';
import { getDashboardStats } from '../controllers/analytics.controller';
import { requireModulePermission } from '../middleware/auth';

const router = Router();

router.use(requireModulePermission('analytics'));

router.get('/dashboard', getDashboardStats);

export default router;
