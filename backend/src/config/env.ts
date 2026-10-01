import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().default('5000'),
  FRONTEND_URL: z.string().default('http://localhost:3000'),
  DB_SERVER: z.string().default('localhost'),
  DB_PORT: z.string().default('1433'),
  DB_NAME: z.string().default('StudyCafeToolsDB'),
  DB_USER: z.string().default('sa'),
  DB_PASSWORD: z.string().default(''),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  SESSION_SECRET: z.string().optional(),
  SESSION_COOKIE_USER: z.string().default('act.auth'),
  SESSION_COOKIE_ADMIN: z.string().default('act.admin'),
  SESSION_COOKIE_AUTHOR: z.string().default('act.author'),
  RAZORPAY_KEY_ID: z.string().optional(),
  RAZORPAY_KEY_SECRET: z.string().optional(),
  RAZORPAY_WEBHOOK_SECRET: z.string().optional(),
  BANNERBUDDY_RAZORPAY_KEY_ID: z.string().optional(),
  BANNERBUDDY_RAZORPAY_KEY_SECRET: z.string().optional(),
  AUTOMATIONCAFE_RAZORPAY_KEY_ID: z.string().optional(),
  AUTOMATIONCAFE_RAZORPAY_KEY_SECRET: z.string().optional(),
  STUDYCAFE_RAZORPAY_KEY_ID: z.string().optional(),
  STUDYCAFE_RAZORPAY_KEY_SECRET: z.string().optional(),
  CODECAMP_RAZORPAY_KEY_ID: z.string().optional(),
  CODECAMP_RAZORPAY_KEY_SECRET: z.string().optional(),
  LEARNLOOP_RAZORPAY_KEY_ID: z.string().optional(),
  LEARNLOOP_RAZORPAY_KEY_SECRET: z.string().optional(),
  ZOHO_EMAIL_API_URL: z.string().optional(),
  ZOHO_EMAIL_API_KEY: z.string().optional(),
  ZOHO_FROM_EMAIL: z.string().optional(),
  GOOGLE_SERVICE_ACCOUNT_JSON: z.string().optional(),
  GOOGLE_CALENDAR_ID: z.string().optional(),
  GOOGLE_CALENDAR_TIMEZONE: z.string().optional(),
  GOOGLE_CALENDAR_STATIC_MEET_LINK: z.string().optional(),
  LOG_LEVEL: z.string().default('info'),
  ADMIN_CONTACT_EMAIL: z.string().optional()
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('Invalid environment variables:', _env.error.format());
  process.exit(1);
}

export const env = _env.data;
