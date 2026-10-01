import { Request, Response, NextFunction } from 'express';
import { getDbPool } from '../config/db';
import { DatabaseError } from '../utils/errors';

export const getDashboard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id;
    const pool = await getDbPool();
    
    // Call the same SP as the legacy project: sp_UserGetReferralDashboard
    const result = await pool.request()
      .input('InUserID', userId)
      .execute('sp_GetUserReferralDashboard');

    // Expected to return Profile in Result 1, and Stats in Result 2
    const recordsets = result.recordsets as any[];
    const profile = recordsets[0] ? recordsets[0][0] : null;
    const stats = recordsets[1] ? recordsets[1][0] : null;

    res.status(200).json({ success: true, data: { profile, stats } });
  } catch (error) {
    next(new DatabaseError('Failed to fetch referral dashboard'));
  }
};

export const getClicks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id;
    const pool = await getDbPool();
    
    const result = await pool.request()
      .input('InUserID', userId)
      .execute('sp_GetUserReferralClicks');

    res.status(200).json({ success: true, data: result.recordset });
  } catch (error) {
    next(new DatabaseError('Failed to fetch referral clicks'));
  }
};

export const joinProgram = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id;
    const pool = await getDbPool();
    
    await pool.request()
      .input('InUserID', userId)
      .execute('sp_JoinReferralProgram');

    res.status(200).json({ success: true, message: "Joined successfully" });
  } catch (error) {
    next(new DatabaseError('Failed to join referral program'));
  }
};

export const getEarnings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id;
    const pool = await getDbPool();
    
    const result = await pool.request()
      .input('InUserID', userId)
      .execute('sp_GetUserReferralEarnings');

    res.status(200).json({ success: true, data: result.recordset });
  } catch (error) {
    next(new DatabaseError('Failed to fetch earnings'));
  }
};

export const getConversions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id;
    const pool = await getDbPool();
    
    const result = await pool.request()
      .input('InUserID', userId)
      .execute('sp_GetUserReferralConversions');

    res.status(200).json({ success: true, data: result.recordset });
  } catch (error) {
    next(new DatabaseError('Failed to fetch conversions'));
  }
};

export const requestWithdrawal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id;
    const pool = await getDbPool();
    
    const result = await pool.request()
      .input('InUserID', userId)
      .execute('sp_CreateWithdrawalRequest');

    res.status(200).json({ success: true, response: result.recordset[0].Response });
  } catch (error) {
    next(new DatabaseError('Failed to request withdrawal'));
  }
};

export const updateBankDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id;
    const { bankAccountName, bankAccountNumber, bankIFSC, pan } = req.body;
    
    const pool = await getDbPool();
    const result = await pool.request()
      .input('InUserID', userId)
      .input('InBankAccountName', bankAccountName)
      .input('InBankAccountNumber', bankAccountNumber)
      .input('InBankIFSC', bankIFSC)
      .input('InPAN', pan)
      .execute('sp_UpdateUserBankDetails');

    res.status(200).json({ success: true, response: result.recordset[0].Response });
  } catch (error) {
    next(new DatabaseError('Failed to update bank details'));
  }
};
