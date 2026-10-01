import { Router } from 'express';
import { getAdmins, createAdmin, updateAdmin, deleteAdmin, toggleAdminStatus, getAdminPermissions } from '../controllers/admin.controller';
import { requireSuperAdmin } from '../middleware/auth';

const router = Router();

router.use(requireSuperAdmin);

router.get('/', getAdmins);
router.post('/', createAdmin);
router.put('/:id', updateAdmin);
router.delete('/:id', deleteAdmin);
router.patch('/:id/toggle', toggleAdminStatus);
router.get('/:id/permissions', getAdminPermissions);

export default router;
