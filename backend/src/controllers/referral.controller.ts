import { Request, Response, NextFunction } from 'express';
import { getDbPool } from '../config/db';
import { DatabaseError } from '../utils/errors';

export const getReferrals = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pool = await getDbPool();
    const result = await pool.request().execute('sp_AdminGetAllReferrers');
    res.status(200).json({ success: true, data: result.recordset });
  } catch (error) {
    next(new DatabaseError('Failed to fetch referrals'));
  }
};

export const getWithdrawals = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.query;
    const pool = await getDbPool();
    const result = await pool.request()
      .input('Status', status || null)
      .execute('sp_AdminGetWithdrawalRequests');
    res.status(200).json({ success: true, data: result.recordset });
  } catch (error) {
    next(new DatabaseError('Failed to fetch withdrawals'));
  }
};

export const approveWithdrawal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const adminId = (req as any).user?.id || null;
    const pool = await getDbPool();
    const result = await pool.request()
      .input('InRequestID', id)
      .input('InAdminID', adminId)
      .execute('sp_AdminApproveWithdrawal');
    res.status(200).json({ success: true, response: result.recordset[0].Response });
  } catch (error) {
    next(new DatabaseError('Failed to approve withdrawal'));
  }
};

export const rejectWithdrawal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const adminId = (req as any).user?.id || null;
    const pool = await getDbPool();
    const result = await pool.request()
      .input('InRequestID', id)
      .input('InAdminID', adminId)
      .execute('sp_AdminRejectWithdrawal');
    res.status(200).json({ success: true, response: result.recordset[0].Response });
  } catch (error) {
    next(new DatabaseError('Failed to reject withdrawal'));
  }
};

export const updateReferrerSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const { customCommissionRate, customMinWithdrawal, programExpiryDate, isActive } = req.body;
    const pool = await getDbPool();
    const result = await pool.request()
      .input('InUserID', userId)
      .input('InCustomCommissionRate', customCommissionRate ?? null)
      .input('InCustomMinWithdrawal', customMinWithdrawal ?? null)
      .input('InProgramExpiryDate', programExpiryDate ?? null)
      .input('InIsActive', isActive)
      .execute('sp_AdminUpdateReferrerSettings');
    res.status(200).json({ success: true, response: result.recordset[0].Response });
  } catch (error) {
    next(new DatabaseError('Failed to update referrer settings'));
  }
};

export const getGlobalSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pool = await getDbPool();
    const result = await pool.request().execute('sp_AdminGetGlobalReferralSettings');
    res.status(200).json({ success: true, data: result.recordset[0] });
  } catch (error) {
    next(new DatabaseError('Failed to fetch global settings'));
  }
};

export const updateGlobalSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { freeCommissionRate, premiumCommissionRate, freeMinWithdrawal, premiumMinWithdrawal, expiryMonths, annualPlanPrice, maskedPlanPrice } = req.body;
    const pool = await getDbPool();
    const result = await pool.request()
      .input('InFreeCommissionRate', freeCommissionRate)
      .input('InPremiumCommissionRate', premiumCommissionRate)
      .input('InFreeMinWithdrawal', freeMinWithdrawal)
      .input('InPremiumMinWithdrawal', premiumMinWithdrawal)
      .input('InExpiryMonths', expiryMonths)
      .input('InAnnualPlanPrice', annualPlanPrice)
      .input('InMaskedPlanPrice', maskedPlanPrice)
      .execute('sp_AdminUpdateGlobalReferralSettings');
    res.status(200).json({ success: true, response: result.recordset[0].Response });
  } catch (error) {
    next(new DatabaseError('Failed to update global settings'));
  }
};
