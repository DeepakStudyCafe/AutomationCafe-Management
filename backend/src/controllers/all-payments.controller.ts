import { Request, Response, NextFunction } from 'express';
import { getDbPool } from '../config/db';
import Razorpay from 'razorpay';
import { env } from '../config/env';

const GATEWAYS = [
  {
    id: 'BannerBuddy',
    key_id: env.BANNERBUDDY_RAZORPAY_KEY_ID,
    key_secret: env.BANNERBUDDY_RAZORPAY_KEY_SECRET,
  },
  {
    id: 'AutomationCafe',
    key_id: env.AUTOMATIONCAFE_RAZORPAY_KEY_ID,
    key_secret: env.AUTOMATIONCAFE_RAZORPAY_KEY_SECRET,
  },
  {
    id: 'StudyCafe',
    key_id: env.STUDYCAFE_RAZORPAY_KEY_ID,
    key_secret: env.STUDYCAFE_RAZORPAY_KEY_SECRET,
  },
  {
    id: 'CodeCamp',
    key_id: env.CODECAMP_RAZORPAY_KEY_ID,
    key_secret: env.CODECAMP_RAZORPAY_KEY_SECRET,
  },
  {
    id: 'LearnLoop',
    key_id: env.LEARNLOOP_RAZORPAY_KEY_ID,
    key_secret: env.LEARNLOOP_RAZORPAY_KEY_SECRET,
  }
];

export const syncAllPayments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pool = await getDbPool();

    for (const gateway of GATEWAYS) {
      if (!gateway.key_id || !gateway.key_secret) {
        console.warn(`Skipping gateway ${gateway.id} due to missing credentials.`);
        continue;
      }

      const rzp = new Razorpay({
        key_id: gateway.key_id,
        key_secret: gateway.key_secret
      });

      let skip = 0;
      const count = 100;
      let hasMore = true;

      while (hasMore) {
        try {
          const paymentsRes = await rzp.payments.all({ skip, count });
          const payments = paymentsRes.items || [];
          
          if (payments.length === 0) {
            hasMore = false;
            break;
          }

          for (const p of payments as any[]) {
            const reqQuery = pool.request();
            reqQuery.input('Gateway', gateway.id);
            reqQuery.input('PaymentId', p.id);
            reqQuery.input('OrderId', p.order_id || null);
            reqQuery.input('Amount', (Number(p.amount) / 100)); // convert paise to currency unit
            reqQuery.input('Currency', p.currency);
            reqQuery.input('Status', p.status);
            reqQuery.input('PaymentDate', new Date(p.created_at * 1000));
            reqQuery.input('CustomerEmail', p.email || null);
            reqQuery.input('CustomerContact', p.contact || null);
            reqQuery.input('Method', p.method || null);
            reqQuery.input('RawData', JSON.stringify(p));

            await reqQuery.query(`
              IF NOT EXISTS (SELECT 1 FROM [dbo].[AllGatewayPayments] WHERE Gateway = @Gateway AND PaymentId = @PaymentId)
              BEGIN
                INSERT INTO [dbo].[AllGatewayPayments] (
                  Gateway, PaymentId, OrderId, Amount, Currency, Status, PaymentDate, CustomerEmail, CustomerContact, Method, RawData
                ) VALUES (
                  @Gateway, @PaymentId, @OrderId, @Amount, @Currency, @Status, @PaymentDate, @CustomerEmail, @CustomerContact, @Method, @RawData
                )
              END
              ELSE
              BEGIN
                UPDATE [dbo].[AllGatewayPayments]
                SET Status = @Status,
                    OrderId = @OrderId,
                    Amount = @Amount,
                    Currency = @Currency,
                    CustomerEmail = @CustomerEmail,
                    CustomerContact = @CustomerContact,
                    Method = @Method,
                    RawData = @RawData
                WHERE Gateway = @Gateway AND PaymentId = @PaymentId
              END
            `);
          }

          skip += count;
          if (payments.length < count) {
            hasMore = false;
          }
        } catch (gatewayErr: any) {
          console.error(`Error fetching payments for ${gateway.id}:`, gatewayErr.message);
          hasMore = false; // Stop paginating for this gateway on error
        }
      }
    }

    res.status(200).json({ success: true, message: 'All gateways synchronized successfully.' });
  } catch (error) {
    next(error);
  }
};

export const getAllPaymentsLogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pool = await getDbPool();
    const request = pool.request();

    const gateway = req.query.gateway as string;
    const status = req.query.status as string;
    const search = req.query.search as string;
    const fromDate = req.query.fromDate as string;
    const toDate = req.query.toDate as string;
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 50;

    let whereClauses: string[] = [];

    if (gateway && gateway !== 'ALL') {
      whereClauses.push('Gateway = @Gateway');
      request.input('Gateway', gateway);
    }

    if (status && status !== 'ALL') {
      whereClauses.push('Status = @Status');
      request.input('Status', status);
    }

    if (search) {
      whereClauses.push(`(CustomerEmail LIKE @Search OR PaymentId LIKE @Search OR OrderId LIKE @Search OR CustomerContact LIKE @Search)`);
      request.input('Search', `%${search}%`);
    }

    if (fromDate) {
      whereClauses.push('CAST(PaymentDate AS DATE) >= CAST(@FromDate AS DATE)');
      request.input('FromDate', fromDate);
    }
    
    if (toDate) {
      whereClauses.push('CAST(PaymentDate AS DATE) <= CAST(@ToDate AS DATE)');
      request.input('ToDate', toDate);
    }

    const whereClause = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';
    const offset = (page - 1) * limit;

    const countQuery = `
      SELECT COUNT(*) as Total
      FROM [dbo].[AllGatewayPayments] WITH (NOLOCK)
      ${whereClause}
    `;

    const dataQuery = `
      SELECT *
      FROM [dbo].[AllGatewayPayments] WITH (NOLOCK)
      ${whereClause}
      ORDER BY PaymentDate DESC
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

export const exportAllPaymentsLogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pool = await getDbPool();
    const request = pool.request();

    const gateway = req.query.gateway as string;
    const status = req.query.status as string;
    const search = req.query.search as string;
    const fromDate = req.query.fromDate as string;
    const toDate = req.query.toDate as string;

    let whereClauses: string[] = [];

    if (gateway && gateway !== 'ALL') {
      whereClauses.push('Gateway = @Gateway');
      request.input('Gateway', gateway);
    }

    if (status && status !== 'ALL') {
      whereClauses.push('Status = @Status');
      request.input('Status', status);
    }

    if (search) {
      whereClauses.push(`(CustomerEmail LIKE @Search OR PaymentId LIKE @Search OR OrderId LIKE @Search OR CustomerContact LIKE @Search)`);
      request.input('Search', `%${search}%`);
    }

    if (fromDate) {
      whereClauses.push('CAST(PaymentDate AS DATE) >= CAST(@FromDate AS DATE)');
      request.input('FromDate', fromDate);
    }
    
    if (toDate) {
      whereClauses.push('CAST(PaymentDate AS DATE) <= CAST(@ToDate AS DATE)');
      request.input('ToDate', toDate);
    }

    const whereClause = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    const dataQuery = `
      SELECT *
      FROM [dbo].[AllGatewayPayments] WITH (NOLOCK)
      ${whereClause}
      ORDER BY PaymentDate DESC
    `;

    const dataRes = await request.query(dataQuery);

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename=AllGatewayPayments.csv');
    
    // Write UTF-8 BOM for Excel
    res.write('\uFEFF');
    res.write('Gateway,PaymentId,OrderId,Amount,Currency,Status,PaymentDate,CustomerEmail,CustomerContact,Method\n');
    
    for (const l of dataRes.recordset) {
      const line = [
        `"${String(l.Gateway || '').replace(/"/g, '""')}"`,
        `"${String(l.PaymentId || '').replace(/"/g, '""')}"`,
        `"${String(l.OrderId || '').replace(/"/g, '""')}"`,
        l.Amount || 0,
        `"${String(l.Currency || '').replace(/"/g, '""')}"`,
        `"${String(l.Status || '').replace(/"/g, '""')}"`,
        `"${l.PaymentDate ? new Date(l.PaymentDate).toLocaleString() : ''}"`,
        `"${String(l.CustomerEmail || '').replace(/"/g, '""')}"`,
        `"${String(l.CustomerContact || '').replace(/"/g, '""')}"`,
        `"${String(l.Method || '').replace(/"/g, '""')}"`
      ].join(',');
      res.write(line + '\n');
    }
    
    res.end();
  } catch (error) {
    next(error);
  }
};
