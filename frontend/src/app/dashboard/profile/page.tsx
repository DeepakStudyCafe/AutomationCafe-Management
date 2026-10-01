'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { ShieldCheck, Save } from 'lucide-react';

export default function ReferralProfilePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{type: 'success'|'error', text: string} | null>(null);

  const [form, setForm] = useState({
    bankAccountName: '',
    bankAccountNumber: '',
    bankIFSC: '',
    pan: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashRes = await api.get('/api/v1/user/referrals/dashboard');
        const profile = dashRes.data?.data?.profile;
        setData(dashRes.data?.data);
        if (profile) {
          setForm({
            bankAccountName: profile.BankAccountName || '',
            bankAccountNumber: profile.BankAccountNumber || '',
            bankIFSC: profile.BankIFSC || '',
            pan: profile.PAN || ''
          });
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage(null);
      const res = await api.put('/api/v1/user/referrals/bank', form);
      if (res.data.response === 'SUCCESS') {
        setMessage({ type: 'success', text: 'Bank details updated successfully.' });
      } else {
        setMessage({ type: 'error', text: 'Failed to update bank details.' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update bank details' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading your profile...</div>;
  if (!data?.profile) return <div className="p-8 text-center text-red-500">Failed to load data.</div>;

  const { profile } = data;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Profile Sidebar */}
      <div className="lg:col-span-4">
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center shadow-sm h-full flex flex-col justify-between">
          <div>
            <div className="w-24 h-24 rounded-full bg-[#7c3aed] text-white flex items-center justify-center text-4xl font-bold mx-auto mb-6 shadow-md">
              {profile?.FullName?.charAt(0) || 'U'}
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">{profile?.FullName || 'User'}</h2>
            <p className="text-sm text-slate-500 mb-6">{profile?.Email}</p>
            <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              Active
            </div>
          </div>

          <div className="mt-12 text-left border-t border-slate-100 pt-6">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Referral Code</div>
            <div className="text-2xl font-bold text-[#7c3aed] font-mono tracking-widest">{profile?.MyReferralCode || '-'}</div>
          </div>
        </div>
      </div>

      {/* Bank Details Form */}
      <div className="lg:col-span-8">
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Bank Details for Payouts</h3>
            <p className="text-sm text-slate-500">
              Your commission payouts will be sent to the bank account below. Make sure all details are accurate.
            </p>
          </div>
          
          {message && (
            <div className={`mb-8 p-4 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {message.text}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  name="bankAccountName"
                  value={form.bankAccountName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] outline-none transition-all text-sm"
                  placeholder="As per bank records"
                />
              </div>
              
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">
                  Account Number
                </label>
                <input
                  type="text"
                  name="bankAccountNumber"
                  value={form.bankAccountNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] outline-none transition-all text-sm"
                  placeholder="Bank account number"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">
                  IFSC Code
                </label>
                <input
                  type="text"
                  name="bankIFSC"
                  value={form.bankIFSC}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] outline-none transition-all uppercase text-sm"
                  placeholder="E.G. HDFC0001234"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">
                  PAN Number
                </label>
                <input
                  type="text"
                  name="pan"
                  value={form.pan}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] outline-none transition-all uppercase text-sm"
                  placeholder="E.G. ABCDE1234F"
                />
              </div>
            </div>

            <div className="bg-[#fef9c3] border border-[#fef08a] rounded-xl p-5 flex items-start gap-3 mb-6">
              <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 leading-relaxed">
                Your bank details are encrypted and used only for commission payouts. Payouts are triggered when you request a withdrawal and your balance meets the minimum threshold.
              </p>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-6 py-3.5 rounded-lg font-bold text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:shadow-none"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Bank Details'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
