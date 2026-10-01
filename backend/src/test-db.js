const sql = require('mssql/msnodesqlv8');
require('dotenv').config();

async function test() {
  const connStr = `Server=${process.env.DB_SERVER};Database=${process.env.DB_NAME};Trusted_Connection=yes;Driver={ODBC Driver 17 for SQL Server};`;
  console.log("Connecting with:", connStr);
  
  try {
    const pool = await sql.connect({ connectionString: connStr });
    const res = await pool.request().query('SELECT COUNT(*) as cnt FROM [dbo].[Users]');
    console.log("Users count:", res.recordset[0].cnt);
    
    const sample = await pool.request().query('SELECT TOP 5 * FROM [dbo].[Users]');
    console.log("Sample Users:", sample.recordset);
    process.exit(0);
  } catch (err) {
    console.error("DB Error:", err);
    process.exit(1);
  }
}
test();
