import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { getDbPool } from '../config/db';
import { DatabaseError, NotFoundError, AuthorizationError, BadRequestError } from '../utils/errors';
import { invalidateCache, CACHE_KEYS } from '../utils/cache';

export const getAdmins = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = parseInt(req.query.pageSize as string, 10) || 20;
    const search = req.query.search as string;
    const role = req.query.role as string;
    const status = req.query.status as string;

    const pool = await getDbPool();
    const request = pool.request();
    
    let whereClauses: string[] = [];
    
    if (search) {
      whereClauses.push('(Username LIKE @Search OR FullName LIKE @Search OR Email LIKE @Search)');
      request.input('Search', `%${search}%`);
    }

    if (role && role !== 'all') {
      whereClauses.push('Role = @Role');
      request.input('Role', role);
    }

    if (status && status !== 'all') {
      whereClauses.push('IsActive = @IsActive');
      request.input('IsActive', status === 'active' ? 1 : 0);
    }

    const whereClause = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    const countResult = await request.query(`SELECT COUNT(*) as Total FROM [dbo].[Admins] ${whereClause}`);
    const total = countResult.recordset[0].Total;
    
    const offset = (page - 1) * pageSize;

    const adminsResult = await request.query(`
      SELECT 
        AdminID, Username, FullName, Email, Role, IsActive, CreatedAt, LastLogin, CreatedBy, CanGrantPremium
      FROM [dbo].[Admins]
      ${whereClause}
      ORDER BY CreatedAt DESC
      OFFSET ${offset} ROWS
      FETCH NEXT ${pageSize} ROWS ONLY
    `);

    res.status(200).json({
      success: true,
      data: adminsResult.recordset,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      }
    });
  } catch (error) {
    next(new DatabaseError('Failed to fetch admins'));
  }
};

export const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password, fullName, email, role, canGrantPremium, modulePermissions } = req.body;

    const pool = await getDbPool();
    const request = pool.request();
    request.input('Username', username);
    request.input('Email', email || null);
    
    const existCheck = await request.query(`SELECT AdminID FROM [dbo].[Admins] WHERE Username = @Username OR (Email = @Email AND Email IS NOT NULL)`);
    if (existCheck.recordset.length > 0) {
      throw new BadRequestError('Username or Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdBy = req.user?.id || null;

    request.input('Password', password);
    request.input('FullName', fullName || null);
    request.input('Role', role === 'superadmin' ? 'superadmin' : 'admin');
    request.input('CanGrantPremium', canGrantPremium ? 1 : 0);
    request.input('CreatedBy', createdBy);

    const result = await request.query(`
      INSERT INTO [dbo].[Admins] (Username, Password, FullName, Email, Role, IsActive, CreatedAt, CreatedBy, CanGrantPremium)
      OUTPUT INSERTED.AdminID
      VALUES (@Username, @Password, @FullName, @Email, @Role, 1, GETDATE(), @CreatedBy, @CanGrantPremium)
    `);
    
    const newAdminId = result.recordset[0].AdminID;

    // Handle Module Permissions
    if (role !== 'superadmin' && Array.isArray(modulePermissions)) {
      for (const mod of modulePermissions) {
        await pool.request()
          .input('AdminID', newAdminId)
          .input('PermissionKey', mod)
          .query(`INSERT INTO [dbo].[AdminPermissions] (AdminID, PermissionKey) VALUES (@AdminID, @PermissionKey)`);
      }
    }

    await invalidateCache(CACHE_KEYS.DASHBOARD_STATS);
    res.status(201).json({ success: true, message: 'Admin created successfully' });
  } catch (error) {
    next(error);
  }
};

export const updateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const { fullName, email, role, canGrantPremium, modulePermissions, password } = req.body;
    
    const pool = await getDbPool();
    const request = pool.request();
    request.input('AdminID', id);

    const adminRes = await request.query(`SELECT Role, IsActive FROM [dbo].[Admins] WHERE AdminID = @AdminID`);
    if (adminRes.recordset.length === 0) throw new NotFoundError('Admin not found');
    const existingAdmin = adminRes.recordset[0];

    // Prevent demoting the last active superadmin
    if (existingAdmin.Role === 'superadmin' && role !== 'superadmin') {
      const superCount = await pool.request().query(`SELECT COUNT(*) as Cnt FROM [dbo].[Admins] WHERE Role = 'superadmin' AND IsActive = 1`);
      if (superCount.recordset[0].Cnt <= 1) {
        throw new BadRequestError('Cannot demote the last active SuperAdmin');
      }
    }

    request.input('FullName', fullName || null);
    request.input('Email', email || null);
    request.input('Role', role === 'superadmin' ? 'superadmin' : 'admin');
    request.input('CanGrantPremium', canGrantPremium ? 1 : 0);

    let updateSql = `
      UPDATE [dbo].[Admins] 
      SET FullName = @FullName, Email = @Email, Role = @Role, CanGrantPremium = @CanGrantPremium
    `;

    if (password) {
      request.input('Password', password);
      updateSql += `, Password = @Password`;
    }

    updateSql += ` WHERE AdminID = @AdminID`;
    await request.query(updateSql);

    // Update Module Permissions
    if (role !== 'superadmin') {
      await pool.request().input('AdminID', id).query(`DELETE FROM [dbo].[AdminPermissions] WHERE AdminID = @AdminID`);
      if (Array.isArray(modulePermissions)) {
        for (const mod of modulePermissions) {
          await pool.request()
            .input('AdminID', id)
            .input('PermissionKey', mod)
            .query(`INSERT INTO [dbo].[AdminPermissions] (AdminID, PermissionKey) VALUES (@AdminID, @PermissionKey)`);
        }
      }
    }

    res.status(200).json({ success: true, message: 'Admin updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const deleteAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const pool = await getDbPool();
    const request = pool.request();
    request.input('AdminID', id);

    const adminRes = await request.query(`SELECT Role, IsActive FROM [dbo].[Admins] WHERE AdminID = @AdminID`);
    if (adminRes.recordset.length === 0) throw new NotFoundError('Admin not found');
    const existingAdmin = adminRes.recordset[0];

    if (existingAdmin.Role === 'superadmin') {
      const superCount = await pool.request().query(`SELECT COUNT(*) as Cnt FROM [dbo].[Admins] WHERE Role = 'superadmin' AND IsActive = 1 AND AdminID != @AdminID`);
      if (superCount.recordset[0].Cnt === 0) {
        throw new BadRequestError('Cannot delete the last active SuperAdmin');
      }
    }

    await request.query(`DELETE FROM [dbo].[AdminPermissions] WHERE AdminID = @AdminID`);
    await request.query(`DELETE FROM [dbo].[Admins] WHERE AdminID = @AdminID`);

    await invalidateCache(CACHE_KEYS.DASHBOARD_STATS);
    res.status(200).json({ success: true, message: 'Admin deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const toggleAdminStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const pool = await getDbPool();
    const request = pool.request();
    request.input('AdminID', id);

    const adminRes = await request.query(`SELECT Role, IsActive FROM [dbo].[Admins] WHERE AdminID = @AdminID`);
    if (adminRes.recordset.length === 0) throw new NotFoundError('Admin not found');
    const existingAdmin = adminRes.recordset[0];

    if (existingAdmin.Role === 'superadmin' && existingAdmin.IsActive) {
      const superCount = await pool.request().query(`SELECT COUNT(*) as Cnt FROM [dbo].[Admins] WHERE Role = 'superadmin' AND IsActive = 1 AND AdminID != @AdminID`);
      if (superCount.recordset[0].Cnt === 0) {
        throw new BadRequestError('Cannot disable the last active SuperAdmin');
      }
    }

    const newStatus = existingAdmin.IsActive ? 0 : 1;
    request.input('IsActive', newStatus);
    await request.query(`UPDATE [dbo].[Admins] SET IsActive = @IsActive WHERE AdminID = @AdminID`);

    await invalidateCache(CACHE_KEYS.DASHBOARD_STATS);
    res.status(200).json({ success: true, message: `Admin status toggled to ${newStatus ? 'active' : 'disabled'}` });
  } catch (error) {
    next(error);
  }
};

export const getAdminPermissions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const pool = await getDbPool();
    const result = await pool.request()
      .input('AdminID', id)
      .query(`SELECT PermissionKey FROM [dbo].[AdminPermissions] WHERE AdminID = @AdminID`);
    
    res.status(200).json({
      success: true,
      data: result.recordset.map(r => r.PermissionKey)
    });
  } catch (error) {
    next(error);
  }
};
