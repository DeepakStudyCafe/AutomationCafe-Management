import { Router } from 'express';
import { getCoupons, createCoupon, deleteCoupon, toggleStatus, toggleLive } from '../controllers/coupon.controller';
import { requireModulePermission } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';
import { z } from 'zod';

const router = Router();

const createCouponSchema = z.object({
    body: z.object({
        code: z.string().min(3),
        discountPercent: z.number().positive().max(100),
        expiryDate: z.string().optional().nullable(),
        isLive: z.boolean().optional()
    })
});

// Admin management endpoints
router.get('/', requireModulePermission('coupons'), getCoupons);
router.post('/', requireModulePermission('coupons'), validateRequest(createCouponSchema), createCoupon);
router.delete('/:id', requireModulePermission('coupons'), deleteCoupon);
router.patch('/:id/toggle-status', requireModulePermission('coupons'), toggleStatus);
router.patch('/:id/toggle-live', requireModulePermission('coupons'), toggleLive);

export default router;
