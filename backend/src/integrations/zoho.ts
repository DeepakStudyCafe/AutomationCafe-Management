import axios from 'axios';
import { env } from '../config/env';
import { ExternalServiceError } from '../utils/errors';
import { logger } from '../utils/logger';

export interface EmailPayload {
  to: string;
  subject: string;
  htmlBody: string;
  cc?: string[];
  attachments?: { name: string; content: string; type: string }[];
}

export const sendZohoEmail = async (payload: EmailPayload): Promise<boolean> => {
  if (!env.ZOHO_EMAIL_API_KEY || !env.ZOHO_EMAIL_API_URL) {
    logger.warn('Zoho Email credentials not configured, skipping email send.');
    return false;
  }

  try {
    const data: any = {
      from: { address: env.ZOHO_FROM_EMAIL || 'noreply@automationcafe.in' },
      to: [{ email_address: { address: payload.to } }],
      subject: payload.subject,
      htmlbody: payload.htmlBody,
    };

    if (payload.cc && payload.cc.length > 0) {
      data.cc = payload.cc.map(email => ({ email_address: { address: email } }));
    }

    if (payload.attachments && payload.attachments.length > 0) {
      data.attachments = payload.attachments.map(att => ({
        name: att.name,
        content: att.content,
        mime_type: att.type
      }));
    }

    const response = await axios.post(
      env.ZOHO_EMAIL_API_URL,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Zoho-enczapikey ${env.ZOHO_EMAIL_API_KEY}`,
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      return true;
    } else {
      logger.error('Zoho API returned unexpected status', { status: response.status, data: response.data });
      return false;
    }
  } catch (error: any) {
    logger.error('Zoho Email Error:', error?.response?.data || error.message);
    throw new ExternalServiceError('Failed to send email via Zoho');
  }
};
