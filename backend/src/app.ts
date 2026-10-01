import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middleware/errorHandler';
import { standardLimiter } from './middleware/rateLimiter';
import { getDbPool } from './config/db';
import { connectRedis } from './config/redis';

const app = express();

// Initialize external connections early
const initializeConnections = async () => {
  try {
    await getDbPool();
    await connectRedis();
  } catch (error) {
    console.error('Failed to initialize connections', error);
  }
};
initializeConnections();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(standardLimiter);

// API Routes will be mounted here
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import planRoutes from './routes/plan.routes';
import analyticsRoutes from './routes/analytics.routes';
import paymentRoutes from './routes/payment.routes';
import demoRoutes from './routes/demo.routes';
import toolsRoutes from './routes/tools.routes';
import couponRoutes from './routes/coupon.routes';
import referralRoutes from './routes/referral.routes';
import userReferralRoutes from './routes/user-referral.routes';
import blogRoutes from './routes/blog.routes';
import adminRoutes from './routes/admin.routes';
import emailRoutes from './routes/email.routes';
import trackingRoutes from './routes/tracking.routes';
import allPaymentsRoutes from './routes/all-payments.routes';

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/plans', planRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/demos', demoRoutes);
app.use('/api/v1/tools', toolsRoutes);
app.use('/api/v1/coupons', couponRoutes);
app.use('/api/v1/referrals', referralRoutes);
app.use('/api/v1/user/referrals', userReferralRoutes);
app.use('/api/v1/blogs', blogRoutes);
app.use('/api/v1/admins', adminRoutes);
app.use('/api/v1/emails', emailRoutes);
app.use('/api/v1/tracking', trackingRoutes);
app.use('/api/v1/all-payments', allPaymentsRoutes);
// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use(errorHandler);

export default app;
