import { google, calendar_v3 } from 'googleapis';
import { env } from '../config/env';
import { ExternalServiceError } from '../utils/errors';
import { logger } from '../utils/logger';

export const getCalendarClient = () => {
  if (!env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    throw new ExternalServiceError('Google Service Account credentials not configured');
  }

  const credentials = JSON.parse(env.GOOGLE_SERVICE_ACCOUNT_JSON);
  
  const auth = new google.auth.JWT(
    { email: credentials.client_email, key: credentials.private_key, scopes: ['https://www.googleapis.com/auth/calendar'] }
  );

  return google.calendar({ version: 'v3', auth });
};

// Returns available slots by checking Google Calendar FreeBusy and fixed slots
export const getAvailableSlotsAsync = async (date: Date) => {
  const calendarId = env.GOOGLE_CALENDAR_ID || 'primary';
  const timeZone = env.GOOGLE_CALENDAR_TIMEZONE || 'Asia/Kolkata';
  const bufferMinutes = 0; // Legacy default
  
  const slots: { startTime: string; endTime: string; display: string }[] = [];

  // Default fixed slots 12-1 and 4-5
  const fixedSlots = [
    { startHour: 12, startMin: 0, endHour: 13, endMin: 0 },
    { startHour: 16, startMin: 0, endHour: 17, endMin: 0 }
  ];

  // In Next.js backend, assume all weekdays are available, check sunday earlier
  
  const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
  const dayEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);

  const now = new Date();
  
  let busyPeriods: { start: Date; end: Date }[] = [];
  try {
    const calendar = getCalendarClient();
    const freeBusyResponse = await calendar.freebusy.query({
      requestBody: {
        timeMin: (dayStart < now ? now : dayStart).toISOString(),
        timeMax: dayEnd.toISOString(),
        timeZone: timeZone,
        items: [{ id: calendarId }]
      }
    });

    const calendarBusy = freeBusyResponse.data.calendars?.[calendarId]?.busy;
    if (calendarBusy) {
      for (const busy of calendarBusy) {
        if (busy.start && busy.end) {
          busyPeriods.push({ start: new Date(busy.start), end: new Date(busy.end) });
        }
      }
    }
  } catch (error) {
    logger.warn('Google Calendar check skipped or failed, falling back to all fixed slots. Error: ' + (error as Error).message);
  }

  for (const slot of fixedSlots) {
    const slotStartLocal = new Date(date.getFullYear(), date.getMonth(), date.getDate(), slot.startHour, slot.startMin, 0);
    const slotEndLocal = new Date(date.getFullYear(), date.getMonth(), date.getDate(), slot.endHour, slot.endMin, 0);

    if (slotStartLocal < now) continue;

    const slotEndWithBuffer = new Date(slotEndLocal.getTime() + bufferMinutes * 60000);
    
    // Check overlaps
    const isAvailable = !busyPeriods.some(bp => bp.start < slotEndWithBuffer && bp.end > slotStartLocal);

    if (isAvailable) {
      const formatTime = (d: Date) => {
        let h = d.getHours();
        const m = d.getMinutes().toString().padStart(2, '0');
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12;
        if (h === 0) h = 12;
        return `${h}:${m} ${ampm}`;
      };

      slots.push({
        startTime: `${slot.startHour.toString().padStart(2, '0')}:${slot.startMin.toString().padStart(2, '0')}`,
        endTime: `${slot.endHour.toString().padStart(2, '0')}:${slot.endMin.toString().padStart(2, '0')}`,
        display: `${formatTime(slotStartLocal)} – ${formatTime(slotEndLocal)}`
      });
    }
  }

  return slots;
};

export const createDemoEventAsync = async (booking: any, startTimeStr: string, durationMinutes = 60) => {
  const [hourStr, minStr] = startTimeStr.split(':');
  const d = new Date(booking.selectedDate);
  const localStart = new Date(d.getFullYear(), d.getMonth(), d.getDate(), parseInt(hourStr), parseInt(minStr), 0);
  const localEnd = new Date(localStart.getTime() + durationMinutes * 60000);

  try {
    const calendar = getCalendarClient();
    const calendarId = env.GOOGLE_CALENDAR_ID || 'primary';
    const timeZone = env.GOOGLE_CALENDAR_TIMEZONE || 'Asia/Kolkata';

    const description = `Demo call booked by:\n` +
      `Name: ${booking.name}\n` +
      `Email: ${booking.email}\n` +
      `Phone: ${booking.phone}\n` +
      (booking.company ? `Company: ${booking.company}\n` : '') +
      (booking.message ? `\nMessage:\n${booking.message}` : '');

    const response = await calendar.events.insert({
      calendarId,
      conferenceDataVersion: 1,
      sendUpdates: 'all',
      requestBody: {
        summary: `Automation Cafe - Demo Call with ${booking.name}`,
        description,
        start: { dateTime: localStart.toISOString(), timeZone },
        end: { dateTime: localEnd.toISOString(), timeZone },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 30 },
            { method: 'popup', minutes: 10 }
          ]
        },
        conferenceData: {
          createRequest: {
            requestId: `demo-${Date.now()}-${Math.random().toString(36).substring(7)}`,
            conferenceSolutionKey: { type: 'hangoutsMeet' }
          }
        }
      },
    });
    
    return {
      eventId: response.data.id,
      meetLink: response.data.hangoutLink || response.data.conferenceData?.entryPoints?.[0]?.uri || '',
      startUtc: localStart,
      endUtc: localEnd
    };
  } catch (error: any) {
    if (error.code === 409) {
      throw new Error('Conflict');
    }
    logger.warn('Google Calendar Error or not configured. Returning mock event for local development.', error.message);
    // Return mock event for local dev
    return {
      eventId: `mock-event-${Date.now()}`,
      meetLink: env.GOOGLE_CALENDAR_STATIC_MEET_LINK || 'https://meet.google.com/mock-link',
      startUtc: localStart,
      endUtc: localEnd
    };
  }
};

export const cancelEventAsync = async (googleEventId: string) => {
  try {
    const calendar = getCalendarClient();
    const calendarId = env.GOOGLE_CALENDAR_ID || 'primary';
    await calendar.events.delete({
      calendarId,
      eventId: googleEventId,
      sendUpdates: 'all'
    });
    return true;
  } catch (err) {
    logger.warn('Failed to cancel Google Calendar event (might be mock event). Error: ' + (err as Error).message);
    return false;
  }
};
