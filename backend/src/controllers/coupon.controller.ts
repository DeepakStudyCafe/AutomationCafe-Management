import { Request, Response, NextFunction } from 'express';
import { getDbPool } from '../config/db';
import { DatabaseError, NotFoundError, BadRequestError } from '../utils/errors';

export const getCoupons = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pool = await getDbPool();
    const result = await pool.query(`
      SELECT CouponID, Code as Code, DiscountPercent, ExpiryDate, 
             IsActive, CreatedAt, IsLive
      FROM [dbo].[Coupons] 
      ORDER BY CreatedAt DESC
    `);
    res.status(200).json({ success: true, data: result.recordset });
  } catch (error) {
    next(new DatabaseError('Failed to fetch coupons'));
  }
};

export const createCoupon = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, discountPercent, expiryDate, isLive } = req.body;
    const pool = await getDbPool();

    const existing = await pool.request().input('Code', code).query(`SELECT 1 FROM [dbo].[Coupons] WHERE Code = @Code`);
    if (existing.recordset.length > 0) throw new BadRequestError('Coupon code already exists');

    await pool.request()
      .input('Code', code)
      .input('DiscountPercent', discountPercent)
      .input('ExpiryDate', expiryDate || null)
      .input('IsActive', 1)
      .input('IsLive', isLive ? 1 : 0)
      .query(`
        INSERT INTO [dbo].[Coupons] (Code, DiscountPercent, ExpiryDate, IsActive, CreatedAt, IsLive)
        VALUES (@Code, @DiscountPercent, @ExpiryDate, @IsActive, GETDATE(), @IsLive)
      `);

    res.status(201).json({ success: true, message: 'Coupon created successfully' });
  } catch (error) {
    next(error);
  }
};

export const deleteCoupon = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const pool = await getDbPool();
    const result = await pool.request().input('CouponID', id).query(`DELETE FROM [dbo].[Coupons] WHERE CouponID = @CouponID`);
    if (result.rowsAffected[0] === 0) throw new NotFoundError('Coupon not found');
    res.status(200).json({ success: true, message: 'Coupon deleted' });
  } catch (error) {
    next(error);
  }
};

export const toggleStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const pool = await getDbPool();
    await pool.request().input('CouponID', id).query(`UPDATE [dbo].[Coupons] SET IsActive = IsActive ^ 1 WHERE CouponID = @CouponID`);
    res.status(200).json({ success: true, message: 'Coupon status toggled' });
  } catch (error) {
    next(error);
  }
};

export const toggleLive = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const pool = await getDbPool();
    await pool.request().input('CouponID', id).query(`UPDATE [dbo].[Coupons] SET IsLive = IsLive ^ 1 WHERE CouponID = @CouponID`);
    res.status(200).json({ success: true, message: 'Coupon live status toggled' });
  } catch (error) {
    next(error);
  }
};
