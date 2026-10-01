import { Request, Response, NextFunction } from 'express';
import { getDbPool } from '../config/db';
import { DatabaseError, NotFoundError } from '../utils/errors';
import { getAvailableSlotsAsync, createDemoEventAsync, cancelEventAsync } from '../integrations/calendar';
import { sendZohoEmail } from '../integrations/zoho';
import { z } from 'zod';
import { env } from '../config/env';

export const getSlots = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: 'Date is required.' });

    const d = new Date(date as string);
    if (d.getDay() === 0) {
      return res.status(400).json({ error: 'Sunday demo is not available. Please select Monday to Saturday.' });
    }
    
    const today = new Date();
    today.setHours(0,0,0,0);
    if (d < today) {
      return res.status(400).json({ error: 'Cannot book slots in the past.' });
    }

    const slots = await getAvailableSlotsAsync(d);
    res.status(200).json(slots);
  } catch (error: any) {
    res.status(500).json({ error: 'Unable to fetch available slots.', detail: error.message });
  }
};

const demoSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  company: z.string().nullable().optional(),
  practiceSize: z.string().nullable().optional(),
  message: z.string().nullable().optional(),
  selectedDate: z.string(),
  selectedTimeSlot: z.string()
});

const generateIcsContent = (booking: any, startUtc: Date, endUtc: Date, meetLink: string) => {
  const formatIcsDate = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const dtStart = formatIcsDate(startUtc);
  const dtEnd = formatIcsDate(endUtc);
  const dtStamp = formatIcsDate(new Date());
  const uid = `${Date.now()}@automationcafe.in`;

  const practiceDesc = booking.practiceSize ? `\\nPractice Size: ${booking.practiceSize}` : '';

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Automation Cafe//Demo Booking//EN
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
DTSTART:${dtStart}
DTEND:${dtEnd}
DTSTAMP:${dtStamp}
ORGANIZER;CN=Automation Cafe:mailto:tech@studycafe.in
ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN=${booking.name}:mailto:${booking.email}
UID:${uid}
CREATED:${dtStamp}
DESCRIPTION:Demo call with Automation Cafe.${practiceDesc}\\n\\nJoin here: ${meetLink}
LAST-MODIFIED:${dtStamp}
LOCATION:${meetLink}
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:Automation Cafe Demo - ${booking.name}
TRANSP:OPAQUE
END:VEVENT
END:VCALENDAR`;
};

export const requestDemo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const booking = demoSchema.parse(req.body);

    const d = new Date(booking.selectedDate);
    if (d.getDay() === 0) return res.status(400).json({ error: 'Sunday demo is not available. Please select Monday to Saturday.' });
    
    let confirmation;
    try {
      confirmation = await createDemoEventAsync(booking, booking.selectedTimeSlot);
    } catch (err: any) {
      if (err.message === 'Conflict') {
        return res.status(409).json({ error: 'This slot was just booked by someone else. Please choose another.' });
      }
      throw err;
    }

    const pool = await getDbPool();
    const result = await pool.request()
      .input('FullName', booking.name)
      .input('Email', booking.email)
      .input('Phone', booking.phone)
      .input('Company', booking.company || null)
      .input('PracticeSize', booking.practiceSize || null)
      .input('Message', booking.message || null)
      .input('StartUTC', confirmation.startUtc)
      .input('EndUTC', confirmation.endUtc)
      .input('GoogleEventID', confirmation.eventId!)
      .input('MeetLink', confirmation.meetLink)
      .execute('sp_SaveDemoBooking');

    if (result.recordset[0].Response === 'CONFLICT') {
      await cancelEventAsync(confirmation.eventId!);
      return res.status(409).json({ error: 'This slot was just booked by someone else. Please choose another.' });
    }

    const bookingId = result.recordset[0].BookingID;
    const meetLink = confirmation.meetLink;
    const icsContent = generateIcsContent(booking, confirmation.startUtc, confirmation.endUtc, meetLink);

    const localStart = confirmation.startUtc.toLocaleString('en-US', { timeZone: env.GOOGLE_CALENDAR_TIMEZONE || 'Asia/Kolkata', month: 'short', day: '2-digit', hour: 'numeric', minute: '2-digit', hour12: true });
    const localEnd = confirmation.endUtc.toLocaleString('en-US', { timeZone: env.GOOGLE_CALENDAR_TIMEZONE || 'Asia/Kolkata', hour: 'numeric', minute: '2-digit', hour12: true });

    const userEmailBody = `
      <div style='font-family:Inter,Arial,sans-serif; max-width:600px; margin:0 auto; background:#ffffff; border-radius:16px; overflow:hidden; border:1px solid #e2e8f0;'>
          <div style='background:linear-gradient(135deg,#0f172a 0%,#1e3a8a 60%,#1d4ed8 100%); padding:40px 32px; text-align:center;'>
              <h1 style='color:#ffffff; margin:0 0 8px; font-size:24px;'>Demo Call Confirmed! ✅</h1>
              <p style='color:#93c5fd; margin:0; font-size:14px;'>Automation Cafe</p>
          </div>
          <div style='padding:32px;'>
              <p style='color:#0f172a; font-size:16px; margin:0 0 20px;'>Hi <strong>${booking.name}</strong>,</p>
              <p style='color:#475569; font-size:14px; line-height:1.6; margin:0 0 24px;'>
                  Your one-on-one demo call has been confirmed. Here are the details:
              </p>
              <div style='background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:20px; margin-bottom:24px;'>
                  <table style='width:100%; border-collapse:collapse;'>
                      <tr>
                          <td style='padding:8px 0; color:#64748b; font-size:13px; width:100px;'>📅 Date & Time</td>
                          <td style='padding:8px 0; color:#0f172a; font-size:14px; font-weight:600;'>${localStart} – ${localEnd} IST</td>
                      </tr>
                  </table>
              </div>
              <p style='color:#94a3b8; font-size:12px; text-align:center; margin:0;'>
                  A calendar invite has also been sent to your email. Please join on time.
              </p>
          </div>
      </div>`;

    await sendZohoEmail({
      to: booking.email,
      subject: 'Your Automation Cafe Demo Call – Confirmed ✅',
      htmlBody: userEmailBody,
      attachments: [{ name: 'invite.ics', content: Buffer.from(icsContent).toString('base64'), type: 'text/calendar' }]
    });

    const adminEmailBody = `
      <div style='font-family:Inter,Arial,sans-serif; max-width:600px; margin:0 auto;'>
          <h2 style='color:#0f172a;'>🆕 New Demo Booking (#${bookingId})</h2>
          <table style='width:100%; border-collapse:collapse; margin-top:16px;'>
              <tr><td style='padding:6px 8px; color:#64748b; border-bottom:1px solid #e2e8f0;'>Name</td>
                  <td style='padding:6px 8px; color:#0f172a; font-weight:600; border-bottom:1px solid #e2e8f0;'>${booking.name}</td></tr>
              <tr><td style='padding:6px 8px; color:#64748b; border-bottom:1px solid #e2e8f0;'>Email</td>
                  <td style='padding:6px 8px; border-bottom:1px solid #e2e8f0;'><a href='mailto:${booking.email}'>${booking.email}</a></td></tr>
              <tr><td style='padding:6px 8px; color:#64748b; border-bottom:1px solid #e2e8f0;'>Phone</td>
                  <td style='padding:6px 8px; color:#0f172a; border-bottom:1px solid #e2e8f0;'>${booking.phone}</td></tr>
              <tr><td style='padding:6px 8px; color:#64748b; border-bottom:1px solid #e2e8f0;'>Company / Firm</td>
                  <td style='padding:6px 8px; color:#0f172a; border-bottom:1px solid #e2e8f0;'>${booking.company || "—"}</td></tr>
              <tr><td style='padding:6px 8px; color:#64748b; border-bottom:1px solid #e2e8f0;'>Practice Size</td>
                  <td style='padding:6px 8px; color:#1d4ed8; font-weight:700; border-bottom:1px solid #e2e8f0;'>${booking.practiceSize || "Not specified"}</td></tr>
              <tr><td style='padding:6px 8px; color:#64748b; border-bottom:1px solid #e2e8f0;'>Date/Time</td>
                  <td style='padding:6px 8px; color:#0f172a; font-weight:600; border-bottom:1px solid #e2e8f0;'>${localStart}–${localEnd} IST</td></tr>
              <tr><td style='padding:6px 8px; color:#64748b;'>Meet Link</td>
                  <td style='padding:6px 8px;'><a href='${meetLink}'>${meetLink}</a></td></tr>
          </table>
          ${booking.message ? `<p style='margin-top:16px; padding:12px; background:#f8fafc; border-radius:8px; color:#475569; font-size:14px;'><strong>Message:</strong><br/>${booking.message}</p>` : ""}
      </div>`;

    await sendZohoEmail({
      to: env.ADMIN_CONTACT_EMAIL || 'tech@studycafe.in',
      cc: ['sales@studycafe.in', 'support@studycafe.in', 'info@studycafe.in', 'contact@studycafe.in'],
      subject: `New Demo Booking: ${booking.name} – ${localStart}`,
      htmlBody: adminEmailBody
    });

    res.status(200).json({ success: true, message: 'Demo requested successfully', bookingId, meetLink });
  } catch (error) {
    next(error);
  }
};

export const getDemoBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pool = await getDbPool();
    const result = await pool.request().execute('sp_GetAllDemoBookings');
    res.status(200).json({ success: true, data: result.recordset });
  } catch (error) {
    next(new DatabaseError('Failed to fetch demo bookings'));
  }
};

export const getSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fs = require('fs').promises;
    const path = require('path');
    const filePath = path.join(__dirname, '../../data/DemoSettings.json');
    try {
      const data = await fs.readFile(filePath, 'utf8');
      res.status(200).json({ success: true, data: JSON.parse(data) });
    } catch (e) {
      res.status(200).json({ success: true, data: { AvailableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], Holidays: [] } });
    }
  } catch (error) {
    next(new DatabaseError('Failed to load demo settings'));
  }
};

export const saveSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fs = require('fs').promises;
    const path = require('path');
    const filePath = path.join(__dirname, '../../data/DemoSettings.json');
    
    // Ensure data directory exists
    const dataDir = path.join(__dirname, '../../data');
    try { await fs.mkdir(dataDir, { recursive: true }); } catch (e) {}
    
    await fs.writeFile(filePath, JSON.stringify(req.body, null, 2));
    res.status(200).json({ success: true, message: 'Settings saved' });
  } catch (error) {
    next(new DatabaseError('Failed to save demo settings'));
  }
};
export const updateDemo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    
    const pool = await getDbPool();
    const request = pool.request();
    request.input('BookingID', id);
    request.input('Status', status);
    request.input('AdminNotes', notes);
    
    // We will use raw SQL to ensure it works if sp_UpdateDemoBooking doesn't exist
    const result = await request.query(`
      UPDATE [dbo].[DemoBookings] 
      SET Status = @Status, AdminNotes = @AdminNotes 
      OUTPUT INSERTED.GoogleEventID, INSERTED.Status
      WHERE BookingID = @BookingID
    `);
    
    if (result.recordset.length === 0) {
      throw new NotFoundError('Booking not found');
    }

    const updated = result.recordset[0];

    // If status was updated to Cancelled, cancel the google event
    if (updated.Status === 'Cancelled' && updated.GoogleEventID) {
      await cancelEventAsync(updated.GoogleEventID);
    }
    
    res.status(200).json({ success: true, message: 'Demo updated' });
  } catch (error) {
    next(error);
  }
};

export const cancelDemo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const pool = await getDbPool();
    const request = pool.request();
    request.input('BookingID', id);
    const result = await request.execute('sp_CancelDemoBooking');
    
    if (result.recordset && result.recordset.length > 0 && result.recordset[0].GoogleEventID) {
      await cancelEventAsync(result.recordset[0].GoogleEventID);
    }
    
    res.status(200).json({ success: true, message: 'Demo cancelled' });
  } catch (error) {
    next(error);
  }
};
