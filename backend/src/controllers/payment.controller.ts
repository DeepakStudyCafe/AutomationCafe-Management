import { Request, Response, NextFunction } from 'express';
import { createOrder, verifyPaymentSignature, getRazorpayInstance } from '../integrations/razorpay';
import { getDbPool } from '../config/db';
import { DatabaseError, NotFoundError, ExternalServiceError, ValidationError } from '../utils/errors';
import crypto from 'crypto';
import { invalidateCache, CACHE_KEYS } from '../utils/cache';

// 1. Log Payment Event (Called from Public Checkout Page for Funnel Tracking)
export const logPaymentEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pool = await getDbPool();
    const request = pool.request();

    const {
      userId,
      userName,
      userEmail,
      userPhone,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      amount,
      planName,
      couponCode,
      referralCode,
      status,
      step,
      failureReason,
      sourcePage,
    } = req.body;

    const ipAddress = req.ip || req.headers['x-forwarded-for'] || null;
    const userAgent = req.headers['user-agent'] || null;

    request.input('UserID', userId || null);
    request.input('UserName', userName || null);
    request.input('UserEmail', userEmail || null);
    request.input('UserPhone', userPhone || null);
    request.input('RazorpayOrderID', razorpayOrderId || null);
    request.input('RazorpayPaymentID', razorpayPaymentId || null);
    request.input('RazorpaySignature', razorpaySignature || null);
    request.input('Amount', amount || null);
    request.input('PlanName', planName || null);
    request.input('CouponCode', couponCode || null);
    request.input('ReferralCode', referralCode || null);
    request.input('Status', status || null);
    request.input('Step', step || null);
    request.input('FailureReason', failureReason || null);
    request.input('SourcePage', sourcePage || null);
    request.input('IpAddress', (ipAddress as string) || null);
    request.input('UserAgent', (userAgent as string) || null);

    const result = await request.query(`
      INSERT INTO [dbo].[PaymentLogs] (
        UserID, UserName, UserEmail, UserPhone, RazorpayOrderID, RazorpayPaymentID, RazorpaySignature, Amount,
        PlanName, CouponCode, ReferralCode, Status, Step, FailureReason, SourcePage, IpAddress, UserAgent, CreatedAt
      )
      OUTPUT INSERTED.LogID
      VALUES (
        @UserID, @UserName, @UserEmail, @UserPhone, @RazorpayOrderID, @RazorpayPaymentID, @RazorpaySignature, @Amount,
        @PlanName, @CouponCode, @ReferralCode, @Status, @Step, @FailureReason, @SourcePage, @IpAddress, @UserAgent, GETDATE()
      )
    `);

    const logId = result.recordset[0]?.LogID;
    res.status(200).json({ success: true, logId });
  } catch (error) {
    next(error);
  }
};


export const createRazorpayOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { planId, couponCode } = req.body;
    const userId = req.user?.id;
    if (!userId || !planId) throw new ValidationError('Plan ID is required');

    const pool = await getDbPool();
    const planRes = await pool.request()
      .input('PlanID', planId)
      .query(`SELECT Price, PlanName FROM [dbo].[SubscriptionPlans] WHERE PlanID = @PlanID AND IsActive = 1`);
    
    if (planRes.recordset.length === 0) throw new NotFoundError('Plan not found or inactive');
    
    let amount = planRes.recordset[0].Price;
    let planName = planRes.recordset[0].PlanName;
    
    if (couponCode) {
      const couponRes = await pool.request()
        .input('Code', couponCode)
        .query(`SELECT DiscountType, DiscountValue, ExpiryDate, UsageLimit, UsedCount, IsActive FROM [dbo].[Coupons] WHERE Code = @Code`);
      
      const coupon = couponRes.recordset[0];
      if (coupon && coupon.IsActive && (!coupon.ExpiryDate || new Date(coupon.ExpiryDate) > new Date()) && coupon.UsedCount < coupon.UsageLimit) {
        if (coupon.DiscountType === 'percentage') {
          amount = amount - (amount * (coupon.DiscountValue / 100));
        } else if (coupon.DiscountType === 'flat') {
          amount = Math.max(0, amount - coupon.DiscountValue);
        }
      } else {
        throw new ValidationError('Invalid or expired coupon');
      }
    }
    
    if (amount <= 0) {
      amount = 0.1;
    }

    const receipt = `rcpt_${crypto.randomBytes(4).toString('hex')}_${userId}`;
    const order = await createOrder(amount, receipt);
    
    // Log Order Created in Funnel (PaymentLogs)
    try {
      const reqUser = req.user as any;
      await pool.request()
        .input('UserID', userId)
        .input('UserName', reqUser?.fullName || null)
        .input('UserEmail', reqUser?.email || null)
        .input('Amount', amount)
        .input('PlanName', planName)
        .input('CouponCode', couponCode || null)
        .input('RazorpayOrderID', order.id)
        .input('Status', 'ORDER_CREATED')
        .input('Step', 'Razorpay Order Generated')
        .input('SourcePage', '/api/v1/payment/create-order')
        .input('IpAddress', (req.ip || req.headers['x-forwarded-for']) as string || null)
        .input('UserAgent', req.headers['user-agent'] as string || null)
        .query(`
          INSERT INTO [dbo].[PaymentLogs] (
            UserID, UserName, UserEmail, Amount, PlanName, CouponCode, RazorpayOrderID, Status, Step, SourcePage, IpAddress, UserAgent, CreatedAt
          ) VALUES (
            @UserID, @UserName, @UserEmail, @Amount, @PlanName, @CouponCode, @RazorpayOrderID, @Status, @Step, @SourcePage, @IpAddress, @UserAgent, GETDATE()
          )
        `);
    } catch(e) {
      console.log('Failed to write funnel log for order creation', e);
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

export const verifyPayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planId, couponCode } = req.body;
    const userId = req.user?.id;

    const pool = await getDbPool();
    const reqUser = req.user as any;

    if (!verifyPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)) {
      // Log Failure in Funnel
      try {
        await pool.request()
          .input('UserID', userId)
          .input('RazorpayOrderID', razorpay_order_id)
          .input('RazorpayPaymentID', razorpay_payment_id)
          .input('Status', 'VERIFICATION_FAILED')
          .input('FailureReason', 'Signature verification failed')
          .query(`INSERT INTO [dbo].[PaymentLogs] (UserID, RazorpayOrderID, RazorpayPaymentID, Status, FailureReason, CreatedAt) VALUES (@UserID, @RazorpayOrderID, @RazorpayPaymentID, @Status, @FailureReason, GETDATE())`);
      } catch(e){}
      throw new ExternalServiceError('Payment signature verification failed');
    }
    
    // Idempotency Check
    const existingPayment = await pool.request()
      .input('OrderID', razorpay_order_id)
      .query(`SELECT PaymentID FROM [dbo].[Payments] WHERE OrderID = @OrderID`);
      
    if (existingPayment.recordset.length > 0) {
      return res.status(200).json({ success: true, message: 'Payment already processed' });
    }

    // Fetch plan details
    const planRes = await pool.request()
      .input('PlanID', planId)
      .query(`SELECT AllowedModules, Price, PlanName FROM [dbo].[SubscriptionPlans] WHERE PlanID = @PlanID`);
      
    const allowedModules = planRes.recordset[0]?.AllowedModules || '[]';
    const basePrice = planRes.recordset[0]?.Price || 0;
    const planName = planRes.recordset[0]?.PlanName || 'Unknown Plan';

    // Begin transaction for safe multi-table insert
    const transaction = pool.transaction();
    await transaction.begin();
    
    try {
      const request = transaction.request();
      // Update user to premium
      await request
        .input('UserID', userId)
        .input('PlanID', planId)
        .input('Modules', allowedModules)
        .query(`
          UPDATE [dbo].[Users] 
          SET IsPremium = 1, PlanID = @PlanID, CustomAllowedModules = @Modules 
          WHERE UserID = @UserID
        `);

      // Log the transaction in standard Payments table
      await request
        .input('LogUserID', userId)
        .input('OrderID', razorpay_order_id)
        .input('PaymentID', razorpay_payment_id)
        .input('Amount', basePrice)
        .query(`
          INSERT INTO [dbo].[Payments] (UserID, OrderID, PaymentID, PaymentStatus, Amount)
          VALUES (@LogUserID, @OrderID, @PaymentID, 'Success', @Amount)
        `);
        
      // Also log SUCCESS in PaymentLogs funnel
      await request
        .input('FunnelUserID', userId)
        .input('FunnelUserName', reqUser?.fullName || null)
        .input('FunnelUserEmail', reqUser?.email || null)
        .input('FunnelAmount', basePrice)
        .input('FunnelPlanName', planName)
        .input('FunnelCouponCode', couponCode || null)
        .input('FunnelRazorpayOrderID', razorpay_order_id)
        .input('FunnelRazorpayPaymentID', razorpay_payment_id)
        .input('FunnelStatus', 'SUCCESS')
        .input('FunnelStep', 'Payment Succeeded & Verified')
        .query(`
          INSERT INTO [dbo].[PaymentLogs] (
            UserID, UserName, UserEmail, Amount, PlanName, CouponCode, RazorpayOrderID, RazorpayPaymentID, Status, Step, CreatedAt
          ) VALUES (
            @FunnelUserID, @FunnelUserName, @FunnelUserEmail, @FunnelAmount, @FunnelPlanName, @FunnelCouponCode, @FunnelRazorpayOrderID, @FunnelRazorpayPaymentID, @FunnelStatus, @FunnelStep, GETDATE()
          )
        `);

      await transaction.commit();
    } catch (txnErr) {
      await transaction.rollback();
      throw txnErr;
    }

    await invalidateCache(CACHE_KEYS.DASHBOARD_STATS);

    res.status(200).json({ success: true, message: 'Payment verified and plan activated' });
  } catch (error) {
    next(error);
  }
};

export const getPaymentLogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pool = await getDbPool();
    const request = pool.request();

    const status = req.query.status as string;
    const search = req.query.search as string;
    const fromDate = req.query.fromDate as string;
    const toDate = req.query.toDate as string;
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 50;

    let whereClauses: string[] = [];

    if (status && status !== 'ALL') {
      whereClauses.push('Status = @Status');
      request.input('Status', status);
    }

    if (search) {
      whereClauses.push(`(UserEmail LIKE @Search OR UserName LIKE @Search OR RazorpayPaymentID LIKE @Search OR RazorpayOrderID LIKE @Search OR CouponCode LIKE @Search OR ReferralCode LIKE @Search)`);
      request.input('Search', `%${search}%`);
    }

    if (fromDate) {
      whereClauses.push('CAST(CreatedAt AS DATE) >= CAST(@FromDate AS DATE)');
      request.input('FromDate', fromDate);
    }
    
    if (toDate) {
      whereClauses.push('CAST(CreatedAt AS DATE) <= CAST(@ToDate AS DATE)');
      request.input('ToDate', toDate);
    }

    const whereClause = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';
    const offset = (page - 1) * limit;

    const countQuery = `
      SELECT COUNT(*) as Total
      FROM [dbo].[PaymentLogs] WITH (NOLOCK)
      ${whereClause}
    `;

    const dataQuery = `
      SELECT *
      FROM [dbo].[PaymentLogs] WITH (NOLOCK)
      ${whereClause}
      ORDER BY LogID DESC
      OFFSET ${offset} ROWS
      FETCH NEXT ${limit} ROWS ONLY
    `;

    const countRes = await request.query(countQuery);
    const totalRecords = countRes.recordset[0].Total;
    const totalPages = Math.ceil(totalRecords / limit);

    const dataRes = await request.query(dataQuery);

    res.status(200).json({
      success: true,
      data: dataRes.recordset,
      pagination: {
        page,
        limit,
        totalPages,
        totalRecords,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getPaymentLogsSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pool = await getDbPool();
    const request = pool.request();

    // Use the exact summary procedure
    const result = await request.query(`EXEC sp_GetPaymentLogsSummary`);
    
    if (result.recordset && result.recordset.length > 0) {
       res.status(200).json({ success: true, summary: result.recordset[0] });
    } else {
       res.status(200).json({ success: true, summary: null });
    }
  } catch (error) {
    next(error);
  }
};

export const exportPaymentLogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pool = await getDbPool();
    const request = pool.request();

    const status = req.query.status as string;
    const search = req.query.search as string;
    const fromDate = req.query.fromDate as string;
    const toDate = req.query.toDate as string;

    let whereClauses: string[] = [];

    if (status && status !== 'ALL') {
      whereClauses.push('Status = @Status');
      request.input('Status', status);
    }

    if (search) {
      whereClauses.push(`(UserEmail LIKE @Search OR UserName LIKE @Search OR RazorpayPaymentID LIKE @Search OR RazorpayOrderID LIKE @Search OR CouponCode LIKE @Search OR ReferralCode LIKE @Search)`);
      request.input('Search', `%${search}%`);
    }

    if (fromDate) {
      whereClauses.push('CAST(CreatedAt AS DATE) >= CAST(@FromDate AS DATE)');
      request.input('FromDate', fromDate);
    }
    
    if (toDate) {
      whereClauses.push('CAST(CreatedAt AS DATE) <= CAST(@ToDate AS DATE)');
      request.input('ToDate', toDate);
    }

    const whereClause = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    const dataQuery = `
      SELECT *
      FROM [dbo].[PaymentLogs] WITH (NOLOCK)
      ${whereClause}
      ORDER BY LogID DESC
    `;

    const dataRes = await request.query(dataQuery);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=PaymentLogs.csv');
    
    res.write('LogID,UserID,UserName,UserEmail,UserPhone,Amount,PlanName,CouponCode,ReferralCode,Status,Step,RazorpayOrderID,RazorpayPaymentID,FailureReason,SourcePage,IpAddress,CreatedAt\\n');
    
    for (const l of dataRes.recordset) {
      const line = [
        l.LogID,
        l.UserID || '',
        `"\${(l.UserName || '').replace(/"/g, '""')}"`,
        l.UserEmail || '',
        l.UserPhone || '',
        l.Amount || 0,
        `"\${(l.PlanName || '').replace(/"/g, '""')}"`,
        l.CouponCode || '',
        l.ReferralCode || '',
        l.Status || '',
        `"\${(l.Step || '').replace(/"/g, '""')}"`,
        `"\${(l.RazorpayOrderID || '').replace(/"/g, '""')}"`,
        `"\${(l.RazorpayPaymentID || '').replace(/"/g, '""')}"`,
        `"\${(l.FailureReason || '').replace(/"/g, '""')}"`,
        l.SourcePage || '',
        l.IpAddress || '',
        l.CreatedAt ? new Date(l.CreatedAt).toLocaleString() : ''
      ].join(',');
      res.write(line + '\\n');
    }
    
    res.end();
  } catch (error) {
    next(error);
  }
};
