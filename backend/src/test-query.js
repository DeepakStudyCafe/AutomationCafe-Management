const sql = require('mssql/msnodesqlv8');
require('dotenv').config();

async function test() {
  const connStr = `Server=${process.env.DB_SERVER};Database=${process.env.DB_NAME};Trusted_Connection=yes;Driver={ODBC Driver 17 for SQL Server};`;
  try {
    const pool = await sql.connect({ connectionString: connStr });
    const res = await pool.request().query(`
      SELECT COUNT(*) as cnt FROM [dbo].[Users]
    `);
    console.log("Count:", res.recordset[0]);

    const res2 = await pool.request().query(`
      SELECT UserID, FullName, Email, Mobile, Profession, 
        IsActive, IsPremium, TrialExpiryDate, LastLogin, CreatedAt,
        AllowedDeviceLimit
      FROM [dbo].[Users]
      ORDER BY CreatedAt DESC
      OFFSET 0 ROWS
      FETCH NEXT 20 ROWS ONLY
    `);
    console.log("Records:", res2.recordset.length);
    process.exit(0);
  } catch (err) {
    console.error("DB Error:", err);
    process.exit(1);
  }
}
test();
