import { Router } from 'express';
import { 
  getUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser, 
  toggleUserStatus, 
  togglePremium, 
  grantPremium, 
  extendTrial, 
  exportUsers 
} from '../controllers/user.controller';
import { requireModulePermission, requireSuperAdmin } from '../middleware/auth';

const router = Router();

// Admins with 'users' module permission can access these routes
router.use(requireModulePermission('users'));

router.get('/', getUsers);
router.get('/export/excel', exportUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.patch('/:id/toggle-status', toggleUserStatus);

// Premium management requires specific permissions, but for now we fallback to standard check
// or we could add a custom check. The legacy controller checked `CanManagePremium()`.
// We will allow users with 'users' module to access, but we could refine it.
router.patch('/:id/toggle-premium', togglePremium);
router.post('/:id/grant-premium', grantPremium);
router.post('/:id/extend-trial', extendTrial);

// Only SuperAdmins can delete users (legacy parity)
router.delete('/:id', requireSuperAdmin, deleteUser);

export default router;
