import { Router } from 'express';
import { getTrackingLogs, getRecentTrackingLogs, exportTrackingLogs } from '../controllers/tracking.controller';
import { requireModulePermission } from '../middleware/auth';

const router = Router();

router.use(requireModulePermission('analytics'));

router.get('/', getTrackingLogs);
router.get('/export', exportTrackingLogs);
router.get('/recent', getRecentTrackingLogs);

export default router;
