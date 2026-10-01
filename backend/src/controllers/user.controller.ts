import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { getDbPool } from '../config/db';
import { DatabaseError, NotFoundError, BadRequestError } from '../utils/errors';
import { invalidateCache, CACHE_KEYS } from '../utils/cache';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = parseInt(req.query.pageSize as string, 10) || 20;
    const search = req.query.search ? (req.query.search as string).toLowerCase().trim() : '';
    const status = req.query.status as string;
    const plan = req.query.plan as string;
    const pdfScan = req.query.pdfScan as string;
    const paymentType = req.query.paymentType as string;
    const grantedBy = req.query.grantedBy as string;
    const fromDate = req.query.fromDate as string;
    const toDate = req.query.toDate as string;

    const pool = await getDbPool();
    const request = pool.request();
    
    const result = await request.query(`EXEC sp_GetAllUsers`);
    let users: any[] = result.recordset;

    if (search) {
      users = users.filter((u: any) => 
        (u.Username && u.Username.toLowerCase().includes(search)) ||
        (u.FullName && u.FullName.toLowerCase().includes(search)) ||
        (u.Email && u.Email.toLowerCase().includes(search)) ||
        (u.Mobile && u.Mobile.includes(search)) ||
        (u.Profession && u.Profession.toLowerCase().includes(search)) ||
        (u.State && u.State.toLowerCase().includes(search)) ||
        (u.ReferralCode && u.ReferralCode.toLowerCase().includes(search)) ||
        (u.MyReferralCode && u.MyReferralCode.toLowerCase().includes(search))
      );
    }

    if (status) {
      if (status === 'active') users = users.filter((u: any) => u.IsActive);
      else if (status === 'blocked' || status === 'banned') users = users.filter((u: any) => !u.IsActive);
    }

    if (plan) {
      if (plan === 'premium') users = users.filter((u: any) => u.IsPremium && (!u.TrialExpiryDate || new Date(u.TrialExpiryDate) >= new Date()));
      else if (plan === 'trial') users = users.filter((u: any) => !u.IsPremium && (!u.TrialExpiryDate || new Date(u.TrialExpiryDate) >= new Date()));
      else if (plan === 'extended') users = users.filter((u: any) => !u.IsPremium && u.IsTrialExtended && (!u.TrialExpiryDate || new Date(u.TrialExpiryDate) >= new Date()));
      else if (plan === 'expired') users = users.filter((u: any) => u.TrialExpiryDate && new Date(u.TrialExpiryDate) < new Date());
      else if (plan === 'expired_trial') users = users.filter((u: any) => !u.IsPremium && u.TrialExpiryDate && new Date(u.TrialExpiryDate) < new Date());
      else if (plan === 'expired_premium') users = users.filter((u: any) => u.IsPremium && u.TrialExpiryDate && new Date(u.TrialExpiryDate) < new Date());
      else if (!isNaN(parseInt(plan))) users = users.filter((u: any) => u.PlanID === parseInt(plan));
      else users = users.filter((u: any) => u.PlanName && u.PlanName.toLowerCase() === plan.toLowerCase());
    }

    if (paymentType) {
      if (paymentType === 'partial') users = users.filter((u: any) => u.IsPartialPayment);
      else if (paymentType === 'full') users = users.filter((u: any) => u.IsPremium && !u.IsPartialPayment);
    }

    if (grantedBy) {
      users = users.filter((u: any) => 
        (u.GrantorName && u.GrantorName.toLowerCase() === grantedBy.toLowerCase()) ||
        (!isNaN(parseInt(grantedBy)) && u.PremiumGrantedBy === parseInt(grantedBy))
      );
    }

    if (pdfScan) {
      if (pdfScan === 'high') {
        users.sort((a: any, b: any) => {
          if (b.PDFScanned !== a.PDFScanned) return b.PDFScanned - a.PDFScanned;
          const rB = b.PDFScannedLimit > 0 ? b.PDFScanned / b.PDFScannedLimit : 0;
          const rA = a.PDFScannedLimit > 0 ? a.PDFScanned / a.PDFScannedLimit : 0;
          return rB - rA;
        });
      } else if (pdfScan === 'low') {
        users.sort((a: any, b: any) => {
          if (a.PDFScanned !== b.PDFScanned) return a.PDFScanned - b.PDFScanned;
          const rA = a.PDFScannedLimit > 0 ? a.PDFScanned / a.PDFScannedLimit : 0;
          const rB = b.PDFScannedLimit > 0 ? b.PDFScanned / b.PDFScannedLimit : 0;
          return rA - rB;
        });
      } else if (pdfScan === 'over50') {
        users = users.filter((u: any) => u.PDFScannedLimit > 0 && (u.PDFScanned / u.PDFScannedLimit) >= 0.5)
                     .sort((a: any, b: any) => b.PDFScanned - a.PDFScanned);
      } else if (pdfScan === 'under50') {
        users = users.filter((u: any) => u.PDFScannedLimit > 0 && (u.PDFScanned / u.PDFScannedLimit) < 0.5)
                     .sort((a: any, b: any) => a.PDFScanned - b.PDFScanned);
      } else if (pdfScan === 'reached') {
        users = users.filter((u: any) => u.PDFScannedLimit > 0 && u.PDFScanned >= u.PDFScannedLimit)
                     .sort((a: any, b: any) => b.PDFScanned - a.PDFScanned);
      } else if (pdfScan === 'zero') {
        users = users.filter((u: any) => u.PDFScanned === 0);
      }
    }

    if (fromDate) {
      const fd = new Date(fromDate);
      users = users.filter((u: any) => new Date(u.CreatedAt) >= fd);
    }
    if (toDate) {
      const td = new Date(toDate);
      td.setDate(td.getDate() + 1);
      users = users.filter((u: any) => new Date(u.CreatedAt) < td);
    }

    // Add days remaining and isExpired flags for frontend convenience
    users = users.map((u: any) => {
      const isExpired = u.TrialExpiryDate ? new Date(u.TrialExpiryDate) < new Date() : false;
      let daysRemaining = null;
      if (u.TrialExpiryDate && !isExpired) {
        const diffTime = Math.abs(new Date(u.TrialExpiryDate).getTime() - new Date().getTime());
        daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      }
      return { ...u, IsExpired: isExpired, DaysRemaining: daysRemaining };
    });

    const total = users.length;
    const paginated = users.slice((page - 1) * pageSize, page * pageSize);

    res.status(200).json({
      success: true,
      data: paginated,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize) || 1,
      }
    });

  } catch (error: any) {
    next(new DatabaseError('Failed to fetch users: ' + error.message));
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.params.id as string, 10);
    const pool = await getDbPool();
    const result = await pool.request().input('UserID', userId).query(`
      SELECT u.UserID, u.Username, u.Password, u.FullName, u.Email, u.Mobile,
             u.IsPremium, u.IsActive, u.AllowedDeviceLimit,
             u.TrialExpiryDate, u.LastLogin, u.CreatedAt,
             COUNT(d.DeviceID) AS DeviceCount,
             u.PlanID, sp.PlanName, u.Profession,
             a.FullName AS GrantorName,
             u.PDFScanned, u.PDFScannedLimit,
             u.BankPDFScanned, u.BankPDFScannedLimit, u.RazorpayPaymentID,
             u.State, u.ReferralCode, u.MyReferralCode,
             u.PremiumGrantedBy
      FROM Users u
      LEFT JOIN UserDevices d ON u.UserID = d.UserID
      LEFT JOIN SubscriptionPlans sp ON u.PlanID = sp.PlanID
      LEFT JOIN Admins a ON u.PremiumGrantedBy = a.AdminID
      WHERE u.UserID = @UserID
      GROUP BY u.UserID, u.Username, u.Password, u.FullName, u.Email, u.Mobile,
               u.IsPremium, u.IsActive, u.AllowedDeviceLimit,
               u.TrialExpiryDate, u.LastLogin, u.CreatedAt,
               u.PlanID, sp.PlanName, u.Profession, a.FullName,
               u.PDFScanned, u.PDFScannedLimit,
               u.BankPDFScanned, u.BankPDFScannedLimit, u.RazorpayPaymentID,
               u.State, u.ReferralCode, u.MyReferralCode,
               u.PremiumGrantedBy
    `);
    
    if (result.recordset.length === 0) throw new NotFoundError('User not found');
    
    let devicesRecordset: any[] = [];
    try {
      const devicesRes = await pool.request().input('UserID', userId).query(`
        SELECT * FROM [dbo].[UserDevices] WHERE UserID = @UserID ORDER BY AddedAt DESC
      `);
      devicesRecordset = devicesRes.recordset;
    } catch (devErr) {
      console.log('Skipping missing UserDevices table');
    }
    
    let logsRecordset: any[] = [];
    try {
      const logsRes = await pool.request().input('UserID', userId).query(`
        SELECT TOP 50 l.LogID, l.ActionType as Action, l.ToolName, l.ExecutionTimeSeconds as Duration, l.Timestamp as Time, l.Category as Suite
        FROM [dbo].[ToolUsageLogs] l
        WHERE l.UserID = @UserID
        ORDER BY l.Timestamp DESC
      `);
      logsRecordset = logsRes.recordset;
    } catch (logErr) {
      // Table might not exist in legacy schema
      console.log('Skipping missing ToolUsageLogs table');
    }
    
    let user = result.recordset[0];
    const isExpired = user.TrialExpiryDate ? new Date(user.TrialExpiryDate) < new Date() : false;
    let daysRemaining = null;
    if (user.TrialExpiryDate && !isExpired) {
      const diffTime = Math.abs(new Date(user.TrialExpiryDate).getTime() - new Date().getTime());
      daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    user = { ...user, IsExpired: isExpired, DaysRemaining: daysRemaining };
    
    res.status(200).json({
      success: true,
      data: user,
      devices: devicesRecordset,
      recentLogs: logsRecordset
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password, fullName, email, mobile, profession, state, allowedDeviceLimit } = req.body;
    
    if (!username || !password) throw new BadRequestError('Username and password are required');

    const pool = await getDbPool();
    const checkRes = await pool.request()
      .input('Username', username)
      .input('Email', email || '')
      .input('Mobile', mobile || '')
      .query(`SELECT UserID FROM [dbo].[Users] WHERE Username = @Username OR (Email = @Email AND Email != '') OR (Mobile = @Mobile AND Mobile != '')`);
    
    if (checkRes.recordset.length > 0) throw new BadRequestError('Username, Email, or Mobile already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.request()
      .input('Username', username)
      .input('Password', 'MIGRATED')
      .input('PasswordHash', hashedPassword)
      .input('FullName', fullName || null)
      .input('Email', email || null)
      .input('Mobile', mobile || null)
      .input('Profession', profession || null)
      .input('State', state || null)
      .input('AllowedDeviceLimit', allowedDeviceLimit || 1)
      .query(`
        INSERT INTO [dbo].[Users] (Username, Password, PasswordHash, FullName, Email, Mobile, Profession, State, AllowedDeviceLimit, IsActive, IsPremium, CreatedAt, PasswordHashedAt)
        VALUES (@Username, @Password, @PasswordHash, @FullName, @Email, @Mobile, @Profession, @State, @AllowedDeviceLimit, 1, 0, GETDATE(), GETDATE())
      `);

    await invalidateCache(CACHE_KEYS.DASHBOARD_STATS);
    res.status(201).json({ success: true, message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.params.id as string, 10);
    const { username, password, fullName, email, mobile, profession, state, allowedDeviceLimit } = req.body;

    if (!username) throw new BadRequestError('Username is required');

    const pool = await getDbPool();
    const request = pool.request();
    request.input('UserID', userId);

    const checkRes = await request.query(`SELECT UserID FROM [dbo].[Users] WHERE UserID = @UserID`);
    if (checkRes.recordset.length === 0) throw new NotFoundError('User not found');

    const dupCheck = await pool.request()
      .input('UserID', userId)
      .input('Username', username)
      .input('Email', email || '')
      .input('Mobile', mobile || '')
      .query(`
        SELECT UserID FROM [dbo].[Users] 
        WHERE (Username = @Username OR (Email = @Email AND Email != '') OR (Mobile = @Mobile AND Mobile != ''))
        AND UserID != @UserID
      `);
    if (dupCheck.recordset.length > 0) throw new BadRequestError('Username, Email, or Mobile already exists on another account');

    request.input('Username', username);
    request.input('FullName', fullName || null);
    request.input('Email', email || null);
    request.input('Mobile', mobile || null);
    request.input('Profession', profession || null);
    request.input('State', state || null);
    request.input('AllowedDeviceLimit', allowedDeviceLimit || 1);

    let updateSql = `
      UPDATE [dbo].[Users]
      SET Username = @Username, FullName = @FullName, Email = @Email, Mobile = @Mobile,
          Profession = @Profession, State = @State, AllowedDeviceLimit = @AllowedDeviceLimit
    `;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      request.input('PasswordHash', hashedPassword);
      updateSql += `, PasswordHash = @PasswordHash, PasswordHashedAt = GETDATE()`;
    }

    updateSql += ` WHERE UserID = @UserID`;
    await request.query(updateSql);

    res.status(200).json({ success: true, message: 'User updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.params.id as string, 10);
    const pool = await getDbPool();
    await pool.request().input('UserID', userId).query(`EXEC sp_DeleteUserByAdmin @UserID`);
    
    await invalidateCache(CACHE_KEYS.DASHBOARD_STATS);
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const toggleUserStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.params.id as string, 10);
    const pool = await getDbPool();
    await pool.request().input('UserID', userId).query(`EXEC sp_ToggleUserStatus @UserID`);

    res.status(200).json({ success: true, message: 'User status updated' });
  } catch (error) {
    next(error);
  }
};

export const togglePremium = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Only superadmin or admin with CanGrantPremium can do this (handled by middleware if needed)
    const userId = parseInt(req.params.id as string, 10);
    const pool = await getDbPool();
    const adminId = req.user?.id || null;
    
    await pool.request()
      .input('UserID', userId)
      .input('AdminID', adminId)
      .query(`EXEC sp_ToggleUserPremium @UserID, @AdminID`);

    res.status(200).json({ success: true, message: 'Premium status toggled' });
  } catch (error) {
    next(error);
  }
};

export const grantPremium = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.params.id as string, 10);
    const { planIds, expiryDate, razorpayPaymentId, isPartialPayment, partialPaymentDetails } = req.body;
    
    const pool = await getDbPool();
    const request = pool.request();
    request.input('UserID', userId);

    const userRes = await request.query(`SELECT UserID FROM [dbo].[Users] WHERE UserID = @UserID`);
    if (userRes.recordset.length === 0) throw new NotFoundError('User not found');

    const safePlanIds = Array.isArray(planIds) ? planIds.map((id: any) => parseInt(id, 10)).filter((id: any) => !isNaN(id)) : [];
    if (safePlanIds.length === 0) throw new NotFoundError('No valid Plan IDs provided');

    const grantedBy = req.user?.id || null;

    // Execute sp_GrantUserPremium matching DbService.cs signature:
    // EXEC sp_GrantUserPremium @UserID, @PlanID, @ExpiryDate, @AdminID, 0, @RazorpayPaymentID
    // The 0 is for "IsPartialPayment" based on DbService.cs line 369. Wait, let's pass the correct values.
    await request
      .input('PlanID', safePlanIds[0])
      .input('ExpiryDate', expiryDate ? new Date(expiryDate) : null)
      .input('AdminID', grantedBy)
      .input('IsPartialPayment', isPartialPayment ? 1 : 0)
      .input('RazorpayPaymentID', razorpayPaymentId || null)
      .query(`EXEC sp_GrantUserPremium @UserID, @PlanID, @ExpiryDate, @AdminID, @IsPartialPayment, @RazorpayPaymentID`);

    await invalidateCache(CACHE_KEYS.DASHBOARD_STATS);
    res.status(200).json({ success: true, message: 'Premium granted successfully' });
  } catch (error) {
    next(error);
  }
};

export const extendTrial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.params.id as string, 10);
    const { newExpiryDate, resetScans, pdfScannedLimit, bankPdfScannedLimit } = req.body;

    if (!newExpiryDate) throw new BadRequestError('New expiry date is required');

    const pool = await getDbPool();
    const request = pool.request();
    
    const adminId = req.user?.id || null;

    await request
      .input('UserID', userId)
      .input('NewExpiryDate', new Date(newExpiryDate))
      .input('ResetScans', resetScans ? 1 : 0)
      .input('PDFScannedLimit', pdfScannedLimit ?? null)
      .input('BankPDFScannedLimit', bankPdfScannedLimit ?? null)
      .input('AdminID', adminId)
      .query(`EXEC sp_ExtendTrialUser @UserID, @NewExpiryDate, @ResetScans, @PDFScannedLimit, @BankPDFScannedLimit, @AdminID`);

    res.status(200).json({ success: true, message: 'Trial extended successfully' });
  } catch (error) {
    next(error);
  }
};

export const exportUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const search = req.query.search as string;
    const status = req.query.status as string;
    const premium = req.query.premium as string;
    const idsParam = req.query.ids as string; 
    
    let selectedIds: number[] = [];
    if (idsParam) {
      selectedIds = idsParam.split(',').map(id => parseInt(id, 10)).filter(id => !isNaN(id));
    }

    const pool = await getDbPool();
    const request = pool.request();
    
    let whereClauses = [];
    
    if (selectedIds.length > 0) {
      whereClauses.push(`UserID IN (${selectedIds.join(',')})`);
    } else {
      if (search) {
        whereClauses.push('(FullName LIKE @Search OR Email LIKE @Search OR Mobile LIKE @Search OR Username LIKE @Search)');
        request.input('Search', `%${search}%`);
      }
      if (status === 'active') whereClauses.push('IsActive = 1');
      if (status === 'blocked') whereClauses.push('IsActive = 0');
      if (premium === 'premium') whereClauses.push('IsPremium = 1');
      if (premium === 'free') whereClauses.push('IsPremium = 0');
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    const usersResult = await request.query(`
      SELECT 
        UserID, Username, FullName, Email, Mobile, Profession, State,
        IsActive, IsPremium, TrialExpiryDate, LastLogin, CreatedAt,
        AllowedDeviceLimit, PDFScanned, BankPDFScanned, RazorpayPaymentID, ReferralCode, MyReferralCode
      FROM [dbo].[Users]
      ${whereSql}
      ORDER BY CreatedAt DESC
    `);

    res.status(200).json({
      success: true,
      data: usersResult.recordset,
      totalExported: usersResult.recordset.length
    });
  } catch (error) {
    next(new DatabaseError('Failed to export users'));
  }
};
