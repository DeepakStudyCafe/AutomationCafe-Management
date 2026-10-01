import { Router } from 'express';
import { 
  getReferrals, 
  getWithdrawals, 
  approveWithdrawal, 
  rejectWithdrawal, 
  getGlobalSettings, 
  updateGlobalSettings, 
  updateReferrerSettings 
} from '../controllers/referral.controller';
import { requireModulePermission } from '../middleware/auth';

const router = Router();

router.get('/', requireModulePermission('referrals'), getReferrals);
router.get('/withdrawals', requireModulePermission('referrals'), getWithdrawals);
router.post('/withdrawals/:id/approve', requireModulePermission('referrals'), approveWithdrawal);
router.post('/withdrawals/:id/reject', requireModulePermission('referrals'), rejectWithdrawal);

router.get('/settings/global', requireModulePermission('referrals'), getGlobalSettings);
router.post('/settings/global', requireModulePermission('referrals'), updateGlobalSettings);

router.post('/settings/:userId', requireModulePermission('referrals'), updateReferrerSettings);

export default router;
