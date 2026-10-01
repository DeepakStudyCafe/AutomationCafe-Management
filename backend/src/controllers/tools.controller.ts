import { Request, Response, NextFunction } from 'express';
import { ExternalServiceError } from '../utils/errors';
import { getDbPool } from '../config/db';

import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import crypto from 'crypto';

export const scanBankPdf = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(501).json({
      success: false,
      error: { message: 'Not Implemented: Legacy scanner not found in source.' }
    });
  } catch (error) {
    next(error);
  }
};

