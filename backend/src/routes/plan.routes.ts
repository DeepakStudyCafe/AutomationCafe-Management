import { Router } from 'express';
import { getPlans, getPlanById, createPlan, updatePlan, deletePlan, togglePlanStatus } from '../controllers/plan.controller';
import { requireSuperAdmin } from '../middleware/auth';

const router = Router();

// GET is public/authenticated for general listing
router.get('/', getPlans);

// Mutations require SuperAdmin
router.get('/:id', requireSuperAdmin, getPlanById);
router.post('/', requireSuperAdmin, createPlan);
router.put('/:id', requireSuperAdmin, updatePlan);
router.delete('/:id', requireSuperAdmin, deletePlan);
router.patch('/:id/toggle-status', requireSuperAdmin, togglePlanStatus);

export default router;
