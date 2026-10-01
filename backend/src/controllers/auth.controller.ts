import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { getDbPool } from '../config/db';
import { AuthenticationError, DatabaseError } from '../utils/errors';
import { generateToken } from '../utils/jwt';
import { env } from '../config/env';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, role } = req.body;
    const pool = await getDbPool();

    let tableName = 'Users';
    let idColumn = 'UserID';
    let cookieName = env.SESSION_COOKIE_USER;

    if (role === 'admin' || role === 'superadmin') {
      tableName = 'Admins';
      idColumn = 'AdminID';
      cookieName = env.SESSION_COOKIE_ADMIN;
    } else if (role === 'author') {
      tableName = 'Authors';
      idColumn = 'AuthorID';
      cookieName = env.SESSION_COOKIE_AUTHOR;
    }

    // Defensive read handling potentially missing PasswordHash
    const result = await pool.request()
      .input('Email', email)
      .query(`
        SELECT *, 
               COL_LENGTH('${tableName}', 'PasswordHash') as HasHashCol 
        FROM [dbo].[${tableName}] 
        WHERE Email = @Email AND IsActive = 1
      `);

    const user = result.recordset[0];

    if (!user) {
      throw new AuthenticationError('Invalid email or password');
    }

    let isValid = false;

    // Check bcrypt hash if column exists and is populated
    if (user.HasHashCol && user.PasswordHash) {
      isValid = await bcrypt.compare(password, user.PasswordHash);
    } else {
      // Fallback to plaintext for migration compatibility
      isValid = (user.Password === password);

      // Migrate to bcrypt safely on successful plain-text login
      if (isValid && user.HasHashCol) {
        const newHash = await bcrypt.hash(password, 10);
        await pool.request()
          .input('ID', user[idColumn])
          .input('Hash', newHash)
          .query(`
            UPDATE [dbo].[${tableName}] 
            SET PasswordHash = @Hash, PasswordHashedAt = GETDATE() 
            WHERE ${idColumn} = @ID
          `);
      }
    }

    if (!isValid) {
      throw new AuthenticationError('Invalid email or password');
    }

    // Update Last Login
    await pool.request()
      .input('ID', user[idColumn])
      .query(`UPDATE [dbo].[${tableName}] SET LastLogin = GETDATE() WHERE ${idColumn} = @ID`);

    const actualRole = role === 'admin' ? (user.Role?.toLowerCase() === 'superadmin' ? 'superadmin' : 'admin') : role;

    const token = generateToken({
      id: user[idColumn],
      email: user.Email,
      role: actualRole
    });

    res.cookie(cookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: role === 'user' ? 'lax' : 'strict',
      maxAge: role === 'admin' ? 8 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000 // 8h for admin, 7d for others
    });

    res.status(200).json({
      success: true,
      data: {
        id: user[idColumn],
        email: user.Email,
        fullName: user.FullName,
        role: actualRole
      }
    });

  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = req.body?.role || 'user';
    let cookieName = env.SESSION_COOKIE_USER;
    if (role === 'admin' || role === 'superadmin') cookieName = env.SESSION_COOKIE_ADMIN;
    if (role === 'author') cookieName = env.SESSION_COOKIE_AUTHOR;

    res.clearCookie(cookieName, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: role === 'user' ? 'lax' : 'strict'
    });

    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fullName, email, password, mobile, profession } = req.body;
    const pool = await getDbPool();

    // Check if email already exists
    const checkRes = await pool.request()
      .input('Email', email)
      .query(`SELECT UserID FROM [dbo].[Users] WHERE Email = @Email`);

    if (checkRes.recordset.length > 0) {
      throw new AuthenticationError('Email is already registered');
    }

    // To respect the legacy schema, we insert the plaintext password into the Password column
    // The login method dynamically checks if PasswordHash exists, so it will fall back to this Password
    await pool.request()
      .input('FullName', fullName)
      .input('Email', email)
      .input('Mobile', mobile || '')
      .input('Profession', profession || '')
      .input('Password', password)
      .query(`
        INSERT INTO [dbo].[Users] (Username, FullName, Email, Mobile, Profession, Password, CreatedAt, IsActive, IsPremium)
        VALUES (@Email, @FullName, @Email, @Mobile, @Profession, @Password, GETDATE(), 1, 0)
      `);

    res.status(201).json({ success: true, message: 'Registration successful' });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(200).json({ success: true, data: null });
    }
    
    let modules: string[] = [];
    let fullName = 'User';

      let mobile = '';

      if (user?.role === 'admin' || user?.role === 'superadmin') {
        const pool = await getDbPool();
        const result = await pool.request()
          .input('AdminID', user.id)
          .query(`SELECT PermissionKey FROM [dbo].[AdminPermissions] WHERE AdminID = @AdminID`);
        modules = result.recordset.map((r: any) => r.PermissionKey);
  
        const adminRes = await pool.request()
          .input('AdminID', user.id)
          .query(`SELECT FullName FROM [dbo].[Admins] WHERE AdminID = @AdminID`);
        if (adminRes.recordset.length > 0) {
          fullName = adminRes.recordset[0].FullName;
        }
        
        if (user?.role === 'superadmin') {
          modules = ['analytics', 'users', 'coupons', 'devices', 'blogs', 'referrals', 'demo-bookings', 'email-sender', 'authors', 'tally-tools'];
        }
      } else {
        const pool = await getDbPool();
        const userRes = await pool.request()
          .input('UserID', user?.id)
          .query(`SELECT FullName, Mobile FROM [dbo].[Users] WHERE UserID = @UserID`);
        if (userRes.recordset.length > 0) {
          fullName = userRes.recordset[0].FullName;
          mobile = userRes.recordset[0].Mobile;
        }
      }
  
      res.status(200).json({ success: true, data: { ...user, fullName, mobile, modules } });
  } catch (error) {
    next(error);
  }
};

