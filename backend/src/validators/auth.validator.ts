import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
    role: z.enum(['user', 'admin', 'superadmin', 'author']).default('user'),
  }),
});

export const registerSchema = z.object({
  body: z.object({
    fullName: z.string().min(2, 'Full name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    mobile: z.string().optional(),
    profession: z.string().optional(),
  }),
});
