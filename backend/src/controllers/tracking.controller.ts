import { Request, Response, NextFunction } from 'express';
import { getDbPool } from '../config/db';
import { DatabaseError } from '../utils/errors';

export const getTrackingLogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = parseInt(req.query.pageSize as string, 10) || 20;
    const search = req.query.search as string;
    const moduleName = req.query.moduleName as string;
    const fromDate = req.query.fromDate as string;
    const toDate = req.query.toDate as string;

    const pool = await getDbPool();
    const request = pool.request();
    
    let whereClauses: string[] = [];
    
    if (search) {
      whereClauses.push('(UserEmail LIKE @Search OR ClientDeviceId LIKE @Search OR ToolName LIKE @Search)');
      request.input('Search', `%${search}%`);
    }

    if (moduleName && moduleName !== 'All') {
      whereClauses.push('ModuleName = @ModuleName');
      request.input('ModuleName', moduleName);
    }
    
    if (fromDate) {
      whereClauses.push('EnteredAt >= @FromDate');
      request.input('FromDate', fromDate);
    }

    if (toDate) {
      // Add 1 day to toDate to make it inclusive if it's just a date string (YYYY-MM-DD)
      whereClauses.push('EnteredAt < DATEADD(day, 1, CAST(@ToDate AS DATE))');
      request.input('ToDate', toDate);
    }

    const whereClause = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    const countResult = await request.query(`SELECT COUNT(*) as Total FROM [dbo].[ModuleAnalyticsLogs] ${whereClause}`);
    const total = countResult.recordset[0].Total;
    
    const offset = (page - 1) * pageSize;

    const logsResult = await request.query(`
      SELECT 
        LogID, SessionID, UserID, ISNULL(UserEmail, '') as UserEmail, ClientDeviceId, HostHardwareId, 
        ModuleName, ToolName, PreviousModule, ToolAction, EnteredAt, ExitedAt, DurationSeconds, RecordCountProcessed
      FROM [dbo].[ModuleAnalyticsLogs]
      ${whereClause}
      ORDER BY EnteredAt DESC, LogID DESC
      OFFSET ${offset} ROWS
      FETCH NEXT ${pageSize} ROWS ONLY
    `);

    res.status(200).json({
      success: true,
      data: logsResult.recordset,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      }
    });
  } catch (error) {
    console.error('Tracking logs error:', error);
    next(new DatabaseError('Failed to fetch tracking logs'));
  }
};

export const getRecentTrackingLogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const afterLogId = parseInt(req.query.afterLogId as string, 10) || 0;
    const search = req.query.search as string;
    const moduleName = req.query.moduleName as string;
    const limit = parseInt(req.query.limit as string, 10) || 50;

    const pool = await getDbPool();
    const request = pool.request();
    
    let whereClauses: string[] = ['LogID > @AfterLogId'];
    request.input('AfterLogId', afterLogId);
    
    if (search) {
      whereClauses.push('(UserEmail LIKE @Search OR ClientDeviceId LIKE @Search OR ToolName LIKE @Search)');
      request.input('Search', `%${search}%`);
    }

    if (moduleName && moduleName !== 'All') {
      whereClauses.push('ModuleName = @ModuleName');
      request.input('ModuleName', moduleName);
    }

    const whereClause = `WHERE ${whereClauses.join(' AND ')}`;

    const logsResult = await request.query(`
      SELECT TOP ${limit}
        LogID, SessionID, UserID, ISNULL(UserEmail, '') as UserEmail, ClientDeviceId, HostHardwareId, 
        ModuleName, ToolName, PreviousModule, ToolAction, EnteredAt, ExitedAt, DurationSeconds, RecordCountProcessed
      FROM [dbo].[ModuleAnalyticsLogs]
      ${whereClause}
      ORDER BY EnteredAt DESC, LogID DESC
    `);

    res.status(200).json({
      success: true,
      data: logsResult.recordset,
    });
  } catch (error) {
    console.error('Recent tracking logs error:', error);
    next(new DatabaseError('Failed to fetch recent tracking logs'));
  }
};

export const exportTrackingLogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const search = req.query.search as string;
    const moduleName = req.query.moduleName as string;
    const fromDate = req.query.fromDate as string;
    const toDate = req.query.toDate as string;

    const pool = await getDbPool();
    const request = pool.request();
    
    let whereClauses: string[] = [];
    
    if (search) {
      whereClauses.push('(UserEmail LIKE @Search OR ClientDeviceId LIKE @Search OR ToolName LIKE @Search)');
      request.input('Search', `%${search}%`);
    }

    if (moduleName && moduleName !== 'All') {
      whereClauses.push('ModuleName = @ModuleName');
      request.input('ModuleName', moduleName);
    }
    
    if (fromDate) {
      whereClauses.push('EnteredAt >= @FromDate');
      request.input('FromDate', fromDate);
    }

    if (toDate) {
      whereClauses.push('EnteredAt < DATEADD(day, 1, CAST(@ToDate AS DATE))');
      request.input('ToDate', toDate);
    }

    const whereClause = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    // Export all matching rows without hard limit
    const logsResult = await request.query(`
      SELECT 
        LogID, ISNULL(UserEmail, '') as UserEmail, ClientDeviceId, 
        ModuleName, ToolName, ToolAction, EnteredAt, ISNULL(DurationSeconds, 0) as DurationSeconds
      FROM [dbo].[ModuleAnalyticsLogs]
      ${whereClause}
      ORDER BY EnteredAt DESC, LogID DESC
    `);

    // Stream CSV directly to response
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=TrackingLogs_${new Date().toISOString().replace(/[:.]/g, '')}.csv`);
    
    res.write('Log ID,User Email,Client Device ID,Suite,Tool Name,Action,Time (UTC),Duration (s)\n');
    
    for (const log of logsResult.recordset) {
      const timeUtc = log.EnteredAt ? log.EnteredAt.toISOString().replace('T', ' ').substring(0, 19) : '';
      res.write(`#${log.LogID},"${log.UserEmail}","${log.ClientDeviceId}","${log.ModuleName}","${log.ToolName}","${log.ToolAction}","${timeUtc}",${log.DurationSeconds}\n`);
    }

    res.end();
  } catch (error) {
    console.error('Export tracking logs error:', error);
    next(new DatabaseError('Failed to export tracking logs'));
  }
};
