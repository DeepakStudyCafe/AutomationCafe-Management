import { Router } from 'express';
import { sendEmail, getRecipients } from '../controllers/email.controller';
import { requireModulePermission } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';
import { z } from 'zod';

const router = Router();

const sendEmailSchema = z.object({
  body: z.object({
    recipient: z.string().refine(val => val === 'ALL' || z.string().email().safeParse(val).success, {
      message: "Invalid email address or 'ALL'"
    }),
    subject: z.string().min(1),
    message: z.string().min(1)
  })
});

router.post('/send', requireModulePermission('email'), validateRequest(sendEmailSchema), sendEmail);
router.get('/recipients', requireModulePermission('email'), getRecipients);

export default router;
