const sql = require('mssql');
async function run() {
  await sql.connect('mssql://sa:StrongPass123!@localhost:1433/AutomationCafeDB?encrypt=false');
  const res = await sql.query("SELECT ROUTINE_NAME FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_TYPE='PROCEDURE' AND ROUTINE_NAME LIKE '%Demo%'");
  console.log(res.recordset);
  process.exit(0);
}
run();
