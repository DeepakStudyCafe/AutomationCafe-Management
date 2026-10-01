import cron from 'node-cron';
import { getDbPool } from '../config/db';
import { redisClient } from '../config/redis';
import { sendZohoEmail } from '../integrations/zoho';
import { logger } from '../utils/logger';

const DEDUPLICATION_TTL = 3 * 24 * 60 * 60; // 3 days in seconds

export const checkExpiries = async () => {
  logger.info('Running SubscriptionExpiryWorker...');
  const pool = await getDbPool();

  try {
    // Acquire a distributed lock to prevent multiple instances from running this job
    const lockKey = 'lock:subscription-expiry-job';
    const acquired = await redisClient.set(lockKey, 'locked', { NX: true, EX: 300 });
    
    if (!acquired) {
      logger.info('SubscriptionExpiryWorker: Lock is active by another instance, skipping.');
      return;
    }

    // Fetch users expiring in EXACTLY 1 day or 2 days
    const result = await pool.query(`
      SELECT UserID, FullName, Email, TrialExpiryDate 
      FROM [dbo].[Users] 
      WHERE IsActive = 1 
      AND IsPremium = 1 
      AND TrialExpiryDate IS NOT NULL
      AND (
        CAST(TrialExpiryDate AS DATE) = CAST(DATEADD(day, 1, GETDATE()) AS DATE) OR
        CAST(TrialExpiryDate AS DATE) = CAST(DATEADD(day, 2, GETDATE()) AS DATE)
      )
    `);

    const users = result.recordset;
    let emailsSent = 0;

    for (const user of users) {
      const expiryDate = new Date(user.TrialExpiryDate);
      const today = new Date();
      const diffTime = expiryDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      const emailType = diffDays === 1 ? '1_DAY_WARNING' : '2_DAY_WARNING';
      const dedupKey = `expiry-sent:${user.UserID}:${emailType}:${expiryDate.toISOString().split('T')[0]}`;

      // Check deduplication
      const alreadySent = await redisClient.get(dedupKey);
      if (alreadySent) continue;

      // Send Email
      const htmlBody = `
        <p>Dear ${user.FullName},</p>
        <p>Your StudyCafe premium subscription is expiring in ${diffDays} day(s) on ${expiryDate.toDateString()}.</p>
        <p>Please log in to renew your subscription and avoid interruption to your services.</p>
        <p>Regards,<br>StudyCafe Team</p>
      `;

      const success = await sendZohoEmail({
        to: user.Email,
        subject: `StudyCafe: Subscription Expiring in ${diffDays} Day(s)`,
        htmlBody,
      });

      if (success) {
        await redisClient.set(dedupKey, 'sent', { EX: DEDUPLICATION_TTL });
        emailsSent++;
        logger.info(`Expiry reminder (${emailType}) sent to UserID: ${user.UserID}`);
      }
    }

    logger.info(`SubscriptionExpiryWorker finished. Sent ${emailsSent} emails.`);
  } catch (error) {
    logger.error('Error in SubscriptionExpiryWorker', error);
  }
};

export const startSubscriptionExpiryWorker = () => {
  // Run every 2 hours at the 0th minute
  cron.schedule('0 */2 * * *', checkExpiries);
  logger.info('SubscriptionExpiryWorker scheduled (every 2 hours)');
};
