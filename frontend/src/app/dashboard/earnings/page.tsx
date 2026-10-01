'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Info, Banknote, Users } from 'lucide-react';

export default function ReferralEarningsPage() {
  const [data, setData] = useState<any>(null);
  const [earnings, setEarnings] = useState<any[]>([]);
  const [conversions, setConversions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [withdrawing, setWithdrawing] = useState(false);
  const [message, setMessage] = useState<{type: 'success'|'error', text: string} | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashRes, earnRes, convRes] = await Promise.all([
          api.get('/api/v1/user/referrals/dashboard'),
          api.get('/api/v1/user/referrals/earnings'),
          api.get('/api/v1/user/referrals/conversions')
        ]);
        setData(dashRes.data?.data);
        setEarnings(earnRes.data?.data || []);
        setConversions(convRes.data?.data || []);
      } catch (err) {
        console.error('Failed to load earnings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleWithdraw = async () => {
    try {
      setWithdrawing(true);
      setMessage(null);
      const res = await api.post('/api/v1/user/referrals/withdraw');
      const msg = res.data.response;
      if (msg === 'SUCCESS') {
        setMessage({ type: 'success', text: 'Withdrawal request submitted successfully!' });
        const dashRes = await api.get('/api/v1/user/referrals/dashboard');
        setData(dashRes.data?.data);
      } else if (msg === 'ALREADY_PENDING') {
        setMessage({ type: 'error', text: 'You already have a pending withdrawal request.' });
      } else if (msg === 'NO_FUNDS') {
        setMessage({ type: 'error', text: 'You have no pending funds to withdraw.' });
      } else if (msg === 'PREMIUM_MIN_CONVERSIONS') {
        setMessage({ type: 'error', text: 'Premium members need at least 1 successful referral to withdraw.' });
      } else if (msg === 'FREE_MIN_CONVERSIONS') {
        setMessage({ type: 'error', text: 'Free members need at least 2 successful referrals to withdraw.' });
      } else if (msg === 'MIN_AMOUNT_NOT_MET') {
        setMessage({ type: 'error', text: 'Your pending balance does not meet the minimum withdrawal threshold.' });
      } else {
        setMessage({ type: 'error', text: 'An error occurred while submitting your request.' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to request withdrawal' });
    } finally {
      setWithdrawing(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading your earnings...</div>;
  if (!data?.profile) return <div className="p-8 text-center text-red-500">Failed to load data.</div>;

  const { profile, stats } = data;
  const isEligible = (stats?.PendingAmount || 0) >= (profile?.EffectiveMinWithdrawal || 0);

  return (
    <div className="space-y-6">
      {message && (
        <div className={`p-4 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Total Earned</div>
          <div className="text-2xl font-black text-slate-800">₹{(stats?.TotalEarnings || 0).toFixed(2)}</div>
          <div className="text-xs text-slate-400 mt-1">All commissions</div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Paid Out</div>
          <div className="text-2xl font-black text-emerald-600">₹{(stats?.PaidAmount || 0).toFixed(2)}</div>
          <div className="text-xs text-slate-400 mt-1">Transferred to bank</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Pending</div>
          <div className="text-2xl font-black text-amber-600">₹{(stats?.PendingAmount || 0).toFixed(2)}</div>
          <div className="text-xs text-slate-400 mt-1">Awaiting transfer</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Conversions</div>
          <div className="text-2xl font-black text-slate-800">{stats?.TotalConversions || 0}</div>
          <div className="text-xs text-slate-400 mt-1">Paid upgrades</div>
        </div>
      </div>

      {/* Payout Policy Info & CTA */}
      <div className="bg-[#F3F0FF] border border-[#E9D5FF] rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex gap-4">
          <Info className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
          <p className="text-sm text-slate-700 leading-relaxed">
            <strong>Payout Policy:</strong> Commissions are paid out when your pending balance reaches <strong>₹{profile?.EffectiveMinWithdrawal || 2000} or more</strong>. 
            Commission is <strong>{profile?.EffectiveCommissionRate || 0}%</strong> of the plan amount, earned on the <strong>first premium purchase</strong> only. 
            Earnings are eligible for withdrawal within <strong>30 days from the date of sale</strong>. Payouts are processed by our admin team — ensure your bank details are updated in your profile.
          </p>
        </div>
        <button 
          onClick={handleWithdraw}
          disabled={!isEligible || withdrawing}
          className={`shrink-0 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
            isEligible && !withdrawing 
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5' 
              : 'bg-blue-300 text-white/90 cursor-not-allowed shadow-none'
          }`}
        >
          {withdrawing ? 'Processing...' : 'Request Withdrawal'}
        </button>
      </div>

      {/* Earnings Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mt-6">
        <div className="px-6 py-5 border-b flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Banknote className="w-4 h-4 text-slate-500" />
            Month-wise Earnings Breakdown
          </h3>
        </div>
        {earnings.length === 0 ? (
          <div className="p-10 text-center">
            <Banknote className="w-10 h-10 mx-auto mb-4 text-slate-200" />
            <p className="text-slate-500 font-medium">No earnings yet.</p>
            <p className="text-sm text-slate-400 mt-1">Share your link and earn {profile?.EffectiveCommissionRate || 0}% on conversions!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Description</th>
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y text-slate-600">
                {earnings.map((e: any, i: number) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-700">
                      {new Date(e.CreatedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">{e.Description || 'Commission'}</td>
                    <td className="px-6 py-4 text-right font-bold text-emerald-600">+ ₹{(e.Amount || 0).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Conversions Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mt-6">
        <div className="px-6 py-5 border-b flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Users className="w-4 h-4 text-slate-500" />
            Referred Customer Conversions
          </h3>
          <span className="text-sm font-bold text-slate-700">{conversions.length} Total</span>
        </div>
        {conversions.length === 0 ? (
          <div className="p-10 text-center">
            <Users className="w-10 h-10 mx-auto mb-4 text-slate-200" />
            <p className="text-slate-500 font-medium">No conversions yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">User ID</th>
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-right">Plan Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y text-slate-600">
                {conversions.map((c: any, i: number) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-700">
                      {new Date(c.ConvertedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">#{c.ReferredUserID}</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-800">₹{(c.PlanAmount || 0).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
