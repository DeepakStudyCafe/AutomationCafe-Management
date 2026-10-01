import { Request, Response, NextFunction } from 'express';
import { getDbPool } from '../config/db';
import { DatabaseError, NotFoundError, BadRequestError } from '../utils/errors';
import { invalidateCache, CACHE_KEYS } from '../utils/cache';

export const getPlans = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pool = await getDbPool();
    const result = await pool.query(`
      SELECT PlanID, PlanName, AllowedModules, IsActive
      FROM [dbo].[SubscriptionPlans]
      ORDER BY PlanID ASC
    `);

    const plans = result.recordset.map(plan => {
      let parsedModules = [];
      try {
        parsedModules = plan.AllowedModules ? JSON.parse(plan.AllowedModules) : [];
      } catch (e) {}
      return {
        ...plan,
        AllowedModules: parsedModules
      };
    });

    res.status(200).json({ success: true, data: plans });
  } catch (error) {
    next(new DatabaseError('Failed to fetch subscription plans'));
  }
};

export const getPlanById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const pool = await getDbPool();
    const result = await pool.request().input('PlanID', id).query(`
      SELECT * FROM [dbo].[SubscriptionPlans] WHERE PlanID = @PlanID
    `);

    if (result.recordset.length === 0) throw new NotFoundError('Plan not found');

    const plan = result.recordset[0];
    let parsedModules = [];
    try {
      parsedModules = plan.AllowedModules ? JSON.parse(plan.AllowedModules) : [];
    } catch (e) {}

    res.status(200).json({
      success: true,
      data: { ...plan, AllowedModules: parsedModules }
    });
  } catch (error) {
    next(error);
  }
};

export const createPlan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { planName, allowedModules, isActive } = req.body;
    
    if (!planName) throw new BadRequestError('Plan name is required');

    const pool = await getDbPool();
    
    const checkRes = await pool.request()
      .input('PlanName', planName)
      .query(`SELECT PlanID FROM [dbo].[SubscriptionPlans] WHERE PlanName = @PlanName`);
      
    if (checkRes.recordset.length > 0) throw new BadRequestError('A plan with this name already exists');

    const modulesJson = JSON.stringify(Array.isArray(allowedModules) ? allowedModules : []);

    await pool.request()
      .input('PlanName', planName.trim())
      .input('AllowedModules', modulesJson)
      .input('IsActive', isActive === undefined ? 1 : (isActive ? 1 : 0))
      .query(`
        INSERT INTO [dbo].[SubscriptionPlans] (PlanName, AllowedModules, IsActive)
        VALUES (@PlanName, @AllowedModules, @IsActive)
      `);

    res.status(201).json({ success: true, message: 'Plan created successfully' });
  } catch (error) {
    next(error);
  }
};

export const updatePlan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const { planName, allowedModules, isActive } = req.body;

    if (!planName) throw new BadRequestError('Plan name is required');

    const pool = await getDbPool();
    const request = pool.request();
    request.input('PlanID', id);

    const checkRes = await request.query(`SELECT PlanID FROM [dbo].[SubscriptionPlans] WHERE PlanID = @PlanID`);
    if (checkRes.recordset.length === 0) throw new NotFoundError('Plan not found');

    const dupCheck = await pool.request()
      .input('PlanID', id)
      .input('PlanName', planName)
      .query(`SELECT PlanID FROM [dbo].[SubscriptionPlans] WHERE PlanName = @PlanName AND PlanID != @PlanID`);
    if (dupCheck.recordset.length > 0) throw new BadRequestError('A plan with this name already exists');

    const modulesJson = JSON.stringify(Array.isArray(allowedModules) ? allowedModules : []);

    request.input('PlanName', planName.trim());
    request.input('AllowedModules', modulesJson);
    request.input('IsActive', isActive ? 1 : 0);

    await request.query(`
      UPDATE [dbo].[SubscriptionPlans]
      SET PlanName = @PlanName, AllowedModules = @AllowedModules, IsActive = @IsActive
      WHERE PlanID = @PlanID
    `);

    res.status(200).json({ success: true, message: 'Plan updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const deletePlan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const pool = await getDbPool();
    
    // Check if users are assigned to this plan
    const usersCount = await pool.request().input('PlanID', id).query(`
      SELECT COUNT(*) as Cnt FROM [dbo].[Users] WHERE PlanID = @PlanID
    `);
    
    if (usersCount.recordset[0].Cnt > 0) {
      throw new BadRequestError('Cannot delete this plan \u2014 users are currently assigned to it. Reassign them first.');
    }

    const result = await pool.request().input('PlanID', id).query(`
      DELETE FROM [dbo].[SubscriptionPlans] WHERE PlanID = @PlanID
    `);

    if (result.rowsAffected[0] === 0) throw new NotFoundError('Plan not found');

    res.status(200).json({ success: true, message: 'Plan deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const togglePlanStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const pool = await getDbPool();
    const request = pool.request();
    request.input('PlanID', id);

    const planRes = await request.query(`SELECT IsActive FROM [dbo].[SubscriptionPlans] WHERE PlanID = @PlanID`);
    if (planRes.recordset.length === 0) throw new NotFoundError('Plan not found');

    const newStatus = planRes.recordset[0].IsActive ? 0 : 1;
    await request.input('IsActive', newStatus).query(`
      UPDATE [dbo].[SubscriptionPlans] SET IsActive = @IsActive WHERE PlanID = @PlanID
    `);

    res.status(200).json({ success: true, message: 'Plan status updated' });
  } catch (error) {
    next(error);
  }
};
