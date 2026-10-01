const sql = require('mssql/msnodesqlv8');
require('dotenv').config();

async function test() {
  const connStr = `Server=${process.env.DB_SERVER};Database=${process.env.DB_NAME};Trusted_Connection=yes;Driver={ODBC Driver 17 for SQL Server};`;
  try {
    const pool = await sql.connect({ connectionString: connStr });
    const res = await pool.request().query('SELECT * FROM [dbo].[Admins]');
    console.log("Admins:", res.recordset);
    process.exit(0);
  } catch (err) {
    console.error("DB Error:", err);
    process.exit(1);
  }
}
test();
