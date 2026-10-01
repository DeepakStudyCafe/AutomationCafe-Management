import { Request, Response, NextFunction } from 'express';
import { getDbPool } from '../config/db';
import { redisClient } from '../config/redis';
import { DatabaseError } from '../utils/errors';

export const getDashboardStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cacheKey = 'dashboard:stats:advanced';
    const cachedStats = await redisClient.get(cacheKey);
    
    if (cachedStats) {
      return res.status(200).json({ success: true, data: JSON.parse(cachedStats) });
    }

    const pool = await getDbPool();
    const result = await pool.request().query(`
        DECLARE @TodayDate DATE = CAST(GETDATE() AS DATE);
        DECLARE @FromDate DATETIME = DATEADD(DAY, -6, @TodayDate);
        DECLARE @ToDate DATETIME = DATEADD(DAY, 1, @TodayDate);

        -- 1. KPI Overview Metrics
        SELECT 
            (SELECT COUNT(*) FROM [dbo].[ModuleAnalyticsLogs] WHERE EnteredAt >= @FromDate AND EnteredAt < @ToDate) AS TotalExecutions,
            (SELECT COUNT(DISTINCT UserID) FROM [dbo].[ModuleAnalyticsLogs] WHERE EnteredAt >= @FromDate AND EnteredAt < @ToDate) AS TotalActiveUsers,
            (SELECT ISNULL(SUM(CAST(
                CASE 
                    WHEN DurationSeconds IS NOT NULL AND DurationSeconds > 0 THEN DurationSeconds
                    WHEN ExitedAt IS NOT NULL AND DATEDIFF(SECOND, EnteredAt, ExitedAt) > 0 THEN DATEDIFF(SECOND, EnteredAt, ExitedAt)
                    ELSE 60
                END AS BIGINT)), 0) / 3600.0 
             FROM [dbo].[ModuleAnalyticsLogs]
             WHERE EnteredAt >= @FromDate AND EnteredAt < @ToDate) AS TotalHoursSpent,
            (SELECT COUNT(*) FROM [dbo].[ModuleAnalyticsLogs] WHERE CAST(EnteredAt AS DATE) = @TodayDate) AS TodayExecutions;

        -- 2. Tool-Wise Usage Distribution (Top 10)
        SELECT TOP 10 ISNULL(ToolName, 'Unknown') AS ToolName, COUNT(*) AS UsageCount
        FROM [dbo].[ModuleAnalyticsLogs]
        WHERE EnteredAt >= @FromDate AND EnteredAt < @ToDate
        GROUP BY ToolName ORDER BY UsageCount DESC;

        -- 3. Module Category Distribution
        SELECT ISNULL(ModuleName, 'Unknown') AS ModuleName, COUNT(*) AS UsageCount
        FROM [dbo].[ModuleAnalyticsLogs]
        WHERE EnteredAt >= @FromDate AND EnteredAt < @ToDate
        GROUP BY ModuleName ORDER BY UsageCount DESC;

        -- 4. Daily Activity Trend
        SELECT CONVERT(VARCHAR(10), EnteredAt, 120) AS UsageDate, COUNT(*) AS ExecutionCount
        FROM [dbo].[ModuleAnalyticsLogs]
        WHERE EnteredAt >= DATEADD(DAY, -30, @TodayDate)
        GROUP BY CONVERT(VARCHAR(10), EnteredAt, 120) ORDER BY UsageDate ASC;

        -- 5. Monthly Activity Trend
        SELECT CONVERT(VARCHAR(7), EnteredAt, 120) AS UsageMonth, COUNT(*) AS ExecutionCount
        FROM [dbo].[ModuleAnalyticsLogs]
        WHERE EnteredAt >= DATEADD(MONTH, -12, @TodayDate)
        GROUP BY CONVERT(VARCHAR(7), EnteredAt, 120) ORDER BY UsageMonth ASC;

        -- 6. Top Active Users in Period (Up to 10)
        SELECT TOP 10 UserID, ISNULL(UserEmail, 'anonymous') AS UserEmail, COUNT(*) AS ExecutionCount,
            COUNT(DISTINCT ClientDeviceId) AS DeviceCount,
            SUM(CASE WHEN DurationSeconds IS NOT NULL AND DurationSeconds > 0 THEN DurationSeconds ELSE 60 END) / 60 AS MinutesSpent
        FROM [dbo].[ModuleAnalyticsLogs]
        WHERE EnteredAt >= @FromDate AND EnteredAt < @ToDate
        GROUP BY UserID, UserEmail ORDER BY ExecutionCount DESC;

        -- 7. User Accounts & Membership Status
        SELECT
            COUNT(*) AS TotalUsers,
            SUM(CASE WHEN IsActive = 1 THEN 1 ELSE 0 END) AS ActiveUsers,
            SUM(CASE WHEN IsPremium = 1 THEN 1 ELSE 0 END) AS PremiumUsers,
            SUM(CASE WHEN IsPremium = 0 AND (TrialExpiryDate IS NULL OR TrialExpiryDate >= GETDATE()) THEN 1 ELSE 0 END) AS TrialUsers,
            SUM(CASE WHEN IsPremium = 0 AND TrialExpiryDate IS NOT NULL AND TrialExpiryDate < GETDATE() THEN 1 ELSE 0 END) AS ExpiredTrials,
            (SELECT COUNT(*) FROM Users WHERE CAST(LastLogin AS DATE) = CAST(GETDATE() AS DATE)) AS TodayLogins
        FROM Users;
    `);

    const recordsets = result.recordsets as any[];
    
    const stats = {
      kpi: recordsets[0][0],
      tools: recordsets[1],
      modules: recordsets[2],
      dailyTrend: recordsets[3],
      monthlyTrend: recordsets[4],
      topUsers: recordsets[5],
      usersStatus: recordsets[6][0]
    };
    
    // Cache for 60 seconds
    await redisClient.set(cacheKey, JSON.stringify(stats), { EX: 60 });

    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    console.error(error);
    next(new DatabaseError('Failed to fetch dashboard stats'));
  }
};
