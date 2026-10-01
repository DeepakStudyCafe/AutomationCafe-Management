import { Router } from 'express';
import { requestDemo, getDemoBookings, cancelDemo, getSlots, getSettings, saveSettings, updateDemo } from '../controllers/demo.controller';
import { requireModulePermission } from '../middleware/auth';

const router = Router();

// Public endpoints
router.get('/slots', getSlots);
router.post('/book', requestDemo); // Same as /request but mapped to /book to match frontend
router.get('/settings', getSettings); // Public to allow booking page to read holidays

// Admin only endpoints
router.get('/', requireModulePermission('demo-bookings'), getDemoBookings);
router.post('/settings', requireModulePermission('demo-bookings'), saveSettings);
router.post('/:id/update', requireModulePermission('demo-bookings'), updateDemo);
router.post('/:id/cancel', requireModulePermission('demo-bookings'), cancelDemo);

export default router;
