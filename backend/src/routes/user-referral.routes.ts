import { Router } from 'express';
import { 
  getDashboard, 
  getClicks, 
  joinProgram, 
  getEarnings, 
  getConversions, 
  requestWithdrawal, 
  updateBankDetails 
} from '../controllers/user-referral.controller';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.use(requireAuth('user'));

router.get('/dashboard', getDashboard);
router.get('/clicks', getClicks);
router.post('/join', joinProgram);
router.get('/earnings', getEarnings);
router.get('/conversions', getConversions);
router.post('/withdraw', requestWithdrawal);
router.put('/bank', updateBankDetails);

export default router;
