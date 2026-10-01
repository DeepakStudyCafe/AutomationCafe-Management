import { Router } from 'express';
import { 
    getBlogs, 
    createBlog, 
    getBlogById, 
    getBlogBySlug, 
    updateBlog, 
    deleteBlog, 
    toggleBlogStatus 
} from '../controllers/blog.controller';
import { requireModulePermission } from '../middleware/auth';

const router = Router();

// Public endpoints
router.get('/public', getBlogs);
router.get('/public/:slug', getBlogBySlug);

// Admin endpoints
router.get('/admin', requireModulePermission('blogs'), getBlogs);
router.post('/admin', requireModulePermission('blogs'), createBlog);
router.get('/admin/:id', requireModulePermission('blogs'), getBlogById);
router.put('/admin/:id', requireModulePermission('blogs'), updateBlog);
router.delete('/admin/:id', requireModulePermission('blogs'), deleteBlog);
router.patch('/admin/:id/toggle-status', requireModulePermission('blogs'), toggleBlogStatus);

export default router;
