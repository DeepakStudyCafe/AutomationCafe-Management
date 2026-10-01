import { Router } from 'express';
import multer from 'multer';
import { scanBankPdf } from '../controllers/tools.controller';
import { requireAuth } from '../middleware/auth';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(requireAuth('user'));

router.post('/bank-scanner', upload.single('file'), scanBankPdf);

export default router;
