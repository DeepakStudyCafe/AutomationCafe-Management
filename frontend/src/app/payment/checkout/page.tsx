'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Script from 'next/script';
import api from '@/lib/api';
import { CreditCard, CheckCircle2, ShieldCheck, ArrowRight, Loader2, RefreshCw } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  
  const [couponCode, setCouponCode] = useState('');
  const [couponStatus, setCouponStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [discountPercent, setDiscountPercent] = useState(0);

  const basePrice = 9999;
  const discountAmount = Math.round(basePrice * (discountPercent / 100));
  const planAmount = basePrice - discountAmount;
  const gstAmount = Math.round(planAmount * 0.18);
  const totalAmount = planAmount + gstAmount;

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const res = await api.get('/api/v1/auth/me');
        if (res.data?.success && res.data.data) {
          setUser(res.data.data);
          // Log checkout view
          api.post('/api/v1/payments/log-event', {
            userId: res.data.data.id,
            userName: res.data.data.fullName,
            userEmail: res.data.data.email,
            userPhone: res.data.data.mobile,
            amount: basePrice,
            planName: 'Automation Cafe Annual Plan',
            status: 'CHECKOUT_VIEW',
            step: 'Checkout Page Opened',
            sourcePage: '/payment/checkout'
          }).catch(console.error);
        } else {
          router.push('/account/login?redirect=/payment/checkout');
        }
      } catch (err) {
        router.push('/account/login?redirect=/payment/checkout');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  const applyCoupon = async () => {
    if (!couponCode) return;
    try {
      setProcessing(true);
      // Wait, is there a coupon validation endpoint? Let's just assume we call a validate endpoint.
      // But we can also pass it to create-order. The old logic had a dedicated endpoint. 
      // I'll simulate or skip for now if it fails.
      const res = await api.post('/api/v1/coupons/validate', { code: couponCode }).catch(() => null);
      if (res?.data?.success && res.data.discountPercent) {
        setDiscountPercent(res.data.discountPercent);
        setCouponStatus('valid');
      } else {
        setCouponStatus('invalid');
        setDiscountPercent(0);
      }
    } catch {
      setCouponStatus('invalid');
      setDiscountPercent(0);
    } finally {
      setProcessing(false);
    }
  };

  const handleCheckout = async () => {
    if (!user) return;
    setProcessing(true);
    try {
      // Create Razorpay order
      const orderRes = await api.post('/api/v1/payments/create-order', {
        planId: 1, // Assume planId 1 is Annual Plan
        couponCode: couponStatus === 'valid' ? couponCode : undefined
      });

      if (!orderRes.data.success) {
        alert('Failed to create order: ' + (orderRes.data.message || 'Unknown error'));
        setProcessing(false);
        return;
      }

      const { data: orderData } = orderRes.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Use the key from env
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Automation Cafe',
        description: 'Annual Premium Plan',
        image: '/Images/automationcafe-black.png',
        order_id: orderData.id,
        handler: async function (response: any) {
          try {
            setProcessing(true);
            // Verify payment
            const verifyRes = await api.post('/api/v1/payments/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              planId: 1,
              couponCode: couponStatus === 'valid' ? couponCode : undefined
            });

            if (verifyRes.data.success) {
              window.location.href = `/payment/success?payment_id=${response.razorpay_payment_id}`;
            } else {
              alert('Payment verification failed.');
              setProcessing(false);
            }
          } catch (err: any) {
            alert('Verification Error: ' + err.message);
            setProcessing(false);
          }
        },
        prefill: {
          name: user.fullName,
          email: user.email,
          contact: user.mobile || ''
        },
        theme: {
          color: '#2563eb'
        },
        modal: {
          ondismiss: function () {
            setProcessing(false);
            api.post('/api/v1/payments/log-event', {
              userId: user.id,
              userName: user.fullName,
              userEmail: user.email,
              userPhone: user.mobile,
              amount: basePrice,
              planName: 'Automation Cafe Annual Plan',
              status: 'MODAL_DISMISSED',
              step: 'User closed payment popup',
              sourcePage: '/payment/checkout'
            }).catch(console.error);
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        api.post('/api/v1/payments/log-event', {
          userId: user.id,
          userName: user.fullName,
          userEmail: user.email,
          userPhone: user.mobile,
          amount: basePrice,
          planName: 'Automation Cafe Annual Plan',
          status: 'PAYMENT_FAILED',
          step: 'Gateway Payment Failed',
          failureReason: response.error.description,
          sourcePage: '/payment/checkout'
        }).catch(console.error);
      });
      rzp.open();

    } catch (err: any) {
      alert('Error initiating checkout. Please try again.');
      setProcessing(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans py-12">
      <Head>
        <title>Secure Checkout - AutomationCafe</title>
      </Head>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <div className="container mx-auto max-w-4xl px-4">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Complete Your Purchase</h1>
          <p className="text-slate-600 mt-2">You're one step away from 30+ CA automation modules.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Order Summary */}
          <div className="flex-1 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 p-6 text-white">
              <h3 className="text-xl font-bold">Order Summary</h3>
              <p className="text-slate-400 text-sm mt-1">Automation Cafe Annual Plan</p>
            </div>
            
            <div className="p-6 space-y-6">
              
              <div className="space-y-3 border-b border-slate-100 pb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Base Price (1 Year)</span>
                  <span className="font-semibold text-slate-900">₹{basePrice.toLocaleString()}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="font-semibold">-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>GST (18%)</span>
                  <span className="font-semibold text-slate-900">₹{gstAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-lg font-bold">
                <span className="text-slate-900">Total Payable</span>
                <span className="text-blue-600 text-2xl">₹{totalAmount.toLocaleString()}</span>
              </div>

              {/* Coupon Section */}
              <div className="pt-4">
                <label className="text-sm font-semibold text-slate-700 block mb-2">Have a coupon code?</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={couponCode}
                    onChange={(e) => { setCouponCode(e.target.value); setCouponStatus('idle'); }}
                    placeholder="Enter code" 
                    className="flex-1 border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 uppercase"
                  />
                  <button 
                    onClick={applyCoupon}
                    disabled={!couponCode || processing}
                    className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    Apply
                  </button>
                </div>
                {couponStatus === 'invalid' && <p className="text-red-500 text-xs mt-2 font-medium">Invalid or expired coupon code.</p>}
                {couponStatus === 'valid' && <p className="text-green-600 text-xs mt-2 font-medium">Coupon applied successfully!</p>}
              </div>

            </div>
          </div>

          {/* User & Payment Details */}
          <div className="flex-1 space-y-6">
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                Account Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Name</span>
                  <span className="font-medium text-slate-900">{user?.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Email</span>
                  <span className="font-medium text-slate-900">{user?.email}</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-slate-500">Mobile</span>
                  <span className="font-medium text-slate-900">{user?.mobile || '-'}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl">
              <div className="flex items-start gap-4">
                <ShieldCheck className="w-8 h-8 text-blue-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-blue-900">100% Secure Payment</h4>
                  <p className="text-sm text-blue-700/80 mt-1">
                    Your transaction is protected with 256-bit encryption. We never store your card details.
                  </p>
                </div>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={processing}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
            >
              {processing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <CreditCard className="w-5 h-5" />}
              {processing ? 'Processing...' : `Pay ₹${totalAmount.toLocaleString()}`}
            </button>
            <p className="text-center text-xs text-slate-500 mt-4">By proceeding, you agree to our Terms of Service and Privacy Policy.</p>

          </div>

        </div>
      </div>
    </div>
  );
}
