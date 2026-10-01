import sql from 'mssql/msnodesqlv8';
import { env } from './env';

// When no DB_USER is provided, we build a native connection string for msnodesqlv8
// to force Windows Authentication via ODBC, completely bypassing the default TCP/IP requirement.
const isWindowsAuth = !env.DB_USER;
const nativeConnStr = `Server=${env.DB_SERVER};Database=${env.DB_NAME};Trusted_Connection=yes;Driver={ODBC Driver 17 for SQL Server};`;

const sqlConfig: sql.config = {
  user: env.DB_USER || undefined,
  password: env.DB_PASSWORD || undefined,
  database: env.DB_NAME,
  server: env.DB_SERVER,
  port: env.DB_PORT ? parseInt(env.DB_PORT, 10) : undefined,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true,
    trustServerCertificate: true,
    trustedConnection: isWindowsAuth
  }
};

let pool: sql.ConnectionPool | null = null;

export const getDbPool = async (): Promise<sql.ConnectionPool> => {
  if (pool) {
    return pool;
  }
  
  try {
    const configToUse = isWindowsAuth ? { connectionString: nativeConnStr } : sqlConfig;
    pool = await sql.connect(configToUse as any);
    console.log('Connected to SQL Server Database: ' + env.DB_NAME);
    return pool;
  } catch (err) {
    console.error('Database connection failed: ', err);
    throw err;
  }
};

export const closeDbPool = async () => {
  if (pool) {
    await pool.close();
    pool = null;
    console.log('Database connection pool closed.');
  }
};
