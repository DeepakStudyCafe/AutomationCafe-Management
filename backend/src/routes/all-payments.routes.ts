import { Router } from 'express';
import { syncAllPayments, getAllPaymentsLogs, exportAllPaymentsLogs } from '../controllers/all-payments.controller';
import { requireAuth, requireModulePermission } from '../middleware/auth';

const router = Router();

// Ensure admin only accesses these endpoints
// 'payments' or a general 'admin' permission could be used
router.post('/sync', requireAuth('admin'), requireModulePermission('payments'), syncAllPayments);
router.get('/', requireAuth('admin'), requireModulePermission('payments'), getAllPaymentsLogs);
router.get('/export', requireAuth('admin'), requireModulePermission('payments'), exportAllPaymentsLogs);

export default router;
