import Razorpay from 'razorpay';
import crypto from 'crypto';
import { env } from '../config/env';
import { ExternalServiceError } from '../utils/errors';

export const getRazorpayInstance = () => {
  if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET) {
    throw new ExternalServiceError('Razorpay credentials are not configured');
  }
  return new Razorpay({
    key_id: env.RAZORPAY_KEY_ID,
    key_secret: env.RAZORPAY_KEY_SECRET,
  });
};

export const createOrder = async (amountInINR: number, receiptId: string) => {
  const rzp = getRazorpayInstance();
  try {
    const options = {
      amount: Math.round(amountInINR * 100), // convert to paise
      currency: 'INR',
      receipt: receiptId,
    };
    const order = await rzp.orders.create(options);
    return order;
  } catch (error) {
    throw new ExternalServiceError('Failed to create Razorpay order');
  }
};

export const verifyPaymentSignature = (
  orderId: string,
  paymentId: string,
  signature: string
): boolean => {
  if (!env.RAZORPAY_KEY_SECRET) return false;
  
  const generatedSignature = crypto
    .createHmac('sha256', env.RAZORPAY_KEY_SECRET)
    .update(orderId + '|' + paymentId)
    .digest('hex');

  return generatedSignature === signature;
};
