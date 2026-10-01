import { Router } from 'express';
import { 
  createRazorpayOrder, 
  verifyPayment, 
  getPaymentLogs,
  logPaymentEvent,
  getPaymentLogsSummary,
  exportPaymentLogs 
} from '../controllers/payment.controller';
import { requireAuth, requireModulePermission, optionalAuth } from '../middleware/auth';

const router = Router();

// Admin routes
router.get('/logs', requireAuth('admin'), requireModulePermission('payments'), getPaymentLogs);
router.get('/logs/summary', requireAuth('admin'), requireModulePermission('payments'), getPaymentLogsSummary);
router.get('/export', requireAuth('admin'), requireModulePermission('payments'), exportPaymentLogs);

// Public / Guest / User logging
router.post('/log-event', logPaymentEvent);

// User routes (User must be logged in to pay)
router.post('/create-order', requireAuth('user'), createRazorpayOrder);
router.post('/verify', requireAuth('user'), verifyPayment);

export default router;
