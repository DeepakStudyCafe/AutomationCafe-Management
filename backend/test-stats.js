const sql = require('mssql/msnodesqlv8');
const nativeConnStr = 'Server=localhost;Database=StudyCafeToolsDB;Trusted_Connection=yes;Driver={ODBC Driver 17 for SQL Server};';
sql.connect({ connectionString: nativeConnStr }).then(pool => {
  pool.request().query(`
      SELECT 
        (SELECT COUNT(*) FROM [dbo].[Users] WHERE IsActive = 1) AS TotalActiveUsers,
        (SELECT COUNT(*) FROM [dbo].[Users] WHERE IsPremium = 1) AS TotalPremiumUsers,
        (SELECT COUNT(*) FROM [dbo].[DemoBookings] WHERE Status = 'Confirmed') AS TotalDemoBookings,
        (SELECT COUNT(*) FROM [dbo].[ContactMessages] WHERE IsContacted = 0) AS PendingInquiries
  `).then(r => {
    console.log('Success:', r.recordset);
    process.exit(0);
  }).catch(e => {
    console.error('SQL Error:', e.message);
    process.exit(1);
  });
});
