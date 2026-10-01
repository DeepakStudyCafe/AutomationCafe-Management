import { z } from 'zod';

export const userQuerySchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/).default('1'),
    pageSize: z.string().regex(/^\d+$/).default('20'),
    search: z.string().optional(),
    status: z.enum(['active', 'blocked', 'all']).default('all'),
    premium: z.enum(['premium', 'free', 'all']).default('all'),
    sortBy: z.enum(['CreatedAt', 'LastLogin', 'FullName', 'Email', 'UserID']).default('CreatedAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
  }),
});

export const grantPremiumSchema = z.object({
  body: z.object({
    planIds: z.array(z.number()).min(1, "At least one plan must be selected"),
  }),
  params: z.object({
    id: z.string().regex(/^\d+$/, "Valid User ID is required"),
  }),
});
