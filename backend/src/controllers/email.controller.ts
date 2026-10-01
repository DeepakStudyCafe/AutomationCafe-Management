import { Request, Response, NextFunction } from 'express';
import { sendZohoEmail } from '../integrations/zoho';
import { BadRequestError } from '../utils/errors';
import { getDbPool } from '../config/db';

const buildEmailHtml = (subject: string, contentHtml: string, baseUrl: string = 'https://automationcafe.in') => {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
        body { margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #f0eef6; }
        .email-wrapper { width: 100%; background-color: #f0eef6; padding: 32px 0; }
        .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
        .email-header { background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #4c1d95 100%); padding: 28px 32px; text-align: center; }
        .email-content { padding: 32px; color: #333333; font-family: 'Inter', 'Segoe UI', Arial, sans-serif; line-height: 1.7; font-size: 15px; }
        .email-footer { background-color: #f9fafb; padding: 24px 32px; text-align: center; border-top: 1px solid #e5e7eb; }
        .email-footer p { margin: 0; font-family: 'Inter', 'Segoe UI', Arial, sans-serif; font-size: 12px; color: #9ca3af; line-height: 1.6; }
        .email-footer a { color: #7c3aed; text-decoration: none; }
    </style>
</head>
<body style="margin:0;padding:0;background-color:#f0eef6;">
    <div class="email-wrapper" style="width:100%;background-color:#f0eef6;padding:32px 0;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="600" class="email-container" style="max-width:600px;margin:0 auto;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
            <tr>
                <td style="height:5px;background:linear-gradient(90deg,#7c3aed,#a855f7,#ec4899);line-height:5px;font-size:1px;">&nbsp;</td>
            </tr>
            <tr>
                <td class="email-header" style="background-color:#ffffff;padding:24px 32px 20px;text-align:center;border-bottom:1px solid #f1f5f9;">
                    <a href="${baseUrl}" target="_blank" style="text-decoration:none;display:inline-block;">
                        <img src="${baseUrl}/Images/automationcafe-black.png" alt="Automation Cafe" width="180" style="height:auto;max-height:38px;width:180px;display:inline-block;border:0;outline:none;" />
                    </a>
                </td>
            </tr>
            <tr>
                <td class="email-content" style="padding:32px;color:#333333;font-family:'Inter','Segoe UI',Arial,sans-serif;line-height:1.7;font-size:15px;">
                    ${contentHtml}
                </td>
            </tr>
            <tr>
                <td class="email-footer" style="background-color:#f9fafb;padding:24px 32px;text-align:center;border-top:1px solid #e5e7eb;">
                    <p style="margin:0;font-family:'Inter','Segoe UI',Arial,sans-serif;font-size:12px;color:#9ca3af;line-height:1.6;">
                        &copy; ${new Date().getFullYear()} Automation Cafe. All rights reserved.<br>
                        You are receiving this email because you are registered with us.<br>
                        <a href="${baseUrl}" style="color:#7c3aed;text-decoration:none;font-weight:600;">automationcafe.in</a>
                    </p>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>`;
};

export const sendEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { recipient, subject, message } = req.body;
    
    // Legacy logic wrap in html shell
    const finalHtml = buildEmailHtml(subject, message.replace(/\n/g, '<br>'));
    
    if (recipient === 'ALL') {
      const pool = await getDbPool();
      const users = await pool.query('SELECT Email FROM [dbo].[Users] WHERE Email IS NOT NULL AND Email != \'\'');
      
      const emails = users.recordset.map((u: any) => u.Email);
      if (emails.length > 0) {
        // Send to all (in reality you might want to batch this)
        // Here we'll just CC everyone or send individual emails based on the legacy logic.
        // The legacy logic in AuthorsAdminController looped, but doing it sequentially is slow.
        // Let's just pass them as CC to Zoho if supported or loop asynchronously.
        // We will loop to be safe, firing async without waiting if there are many.
        for (const email of emails) {
          sendZohoEmail({
            to: email,
            subject: subject,
            htmlBody: finalHtml
          }).catch(e => console.error('Bulk email error to:', email, e));
        }
      }
    } else {
      await sendZohoEmail({
        to: recipient,
        subject: subject,
        htmlBody: finalHtml
      });
    }

    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    next(error);
  }
};

export const getRecipients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pool = await getDbPool();
    // Assuming Users table has Username/Email/FullName
    const result = await pool.query('SELECT Email, Username as Name FROM [dbo].[Users] WHERE Email IS NOT NULL');
    res.status(200).json(result.recordset);
  } catch (error) {
    next(error);
  }
};
