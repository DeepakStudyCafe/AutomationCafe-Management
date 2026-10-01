const { getDbPool } = require('./dist/config/database.js');
async function run() {
  try {
    const pool = await getDbPool();
    await pool.request().input('UserID', 1170).query(`
      SELECT u.UserID, u.Username, u.Password, u.FullName, u.Email, u.Mobile,
             u.IsPremium, u.IsActive, u.AllowedDeviceLimit,
             u.TrialExpiryDate, u.LastLogin, u.CreatedAt,
             COUNT(d.DeviceID) AS DeviceCount,
             u.PlanID, sp.PlanName, u.Profession,
             a.FullName AS GrantorName,
             u.PDFScanned, u.PDFScannedLimit,
             u.BankPDFScanned, u.BankPDFScannedLimit, u.RazorpayPaymentID,
             u.State, u.ReferralCode, u.MyReferralCode,
             u.PremiumGrantedBy
      FROM Users u
      LEFT JOIN UserDevices d ON u.UserID = d.UserID
      LEFT JOIN SubscriptionPlans sp ON u.PlanID = sp.PlanID
      LEFT JOIN Admins a ON u.PremiumGrantedBy = a.AdminID
      WHERE u.UserID = @UserID
      GROUP BY u.UserID, u.Username, u.Password, u.FullName, u.Email, u.Mobile,
               u.IsPremium, u.IsActive, u.AllowedDeviceLimit,
               u.TrialExpiryDate, u.LastLogin, u.CreatedAt,
               u.PlanID, sp.PlanName, u.Profession, a.FullName,
               u.PDFScanned, u.PDFScannedLimit,
               u.BankPDFScanned, u.BankPDFScannedLimit, u.RazorpayPaymentID,
               u.State, u.ReferralCode, u.MyReferralCode,
               u.PremiumGrantedBy
    `);
    console.log('QUERY SUCCESS');
  } catch (err) {
    console.log('QUERY ERROR:', err.message);
  }
  process.exit(0);
}
run();
