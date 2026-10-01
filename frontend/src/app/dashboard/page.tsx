'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Copy, Check, Share2, MousePointer2, UserPlus, ArrowUpRight, IndianRupee, Hourglass, CheckCircle2, Percent, Calendar } from 'lucide-react';

export default function ReferralDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [clicks, setClicks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashRes, clickRes] = await Promise.all([
          api.get('/api/v1/user/referrals/dashboard'),
          api.get('/api/v1/user/referrals/clicks')
        ]);
        if (dashRes.data?.data?.profile === null) {
          await api.post('/api/v1/user/referrals/join');
          const reloaded = await api.get('/api/v1/user/referrals/dashboard');
          setData(reloaded.data?.data);
        } else {
          setData(dashRes.data?.data);
        }
        setClicks(clickRes.data?.data || []);
      } catch (err) {
        console.error('Failed to load referral dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCopy = () => {
    if (data?.profile?.MyReferralCode) {
      const link = `${window.location.origin}/?ref=${data.profile.MyReferralCode}`;
      navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading your referral dashboard...</div>;
  if (!data?.profile) return <div className="p-8 text-center text-red-500">Failed to load referral data.</div>;

  const { profile, stats } = data;
  const refCode = profile.MyReferralCode || '';
  const refUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/?ref=${refCode}&utm_source=Referral&utm_medium=referral&utm_campaign=${refCode.toLowerCase()}`;
  const waShareText = encodeURIComponent(`Check out AutomationCafe GST & Tax Automation Suite: ${refUrl}`);

  return (
    <div className="space-y-6">
      {/* Link Banner */}
      <div className="bg-[#7c3aed] rounded-xl p-6 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1 overflow-hidden">
          <div className="text-xs font-bold tracking-wider text-white/80 uppercase mb-2">Your Unique Referral Link</div>
          <div className="font-mono text-sm md:text-base text-white/90 break-all bg-white/10 px-4 py-2 rounded-lg truncate w-full">
            {refUrl}
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0 w-full md:w-auto mt-2 md:mt-0">
          <button 
            onClick={handleCopy}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border border-white/20"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied' : 'Copy Link'}
          </button>
          <a 
            href={`https://api.whatsapp.com/send?text=${waShareText}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#20bd5a] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Share
          </a>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex justify-between items-start">
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Total Clicks</div>
            <div className="text-3xl font-black text-slate-800">{stats?.TotalClicks || 0}</div>
            <div className="text-xs text-slate-400 mt-2">Link visits</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
            <MousePointer2 className="w-5 h-5" />
          </div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex justify-between items-start">
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Registrations</div>
            <div className="text-3xl font-black text-slate-800">{stats?.TotalRegistrations || 0}</div>
            <div className="text-xs text-slate-400 mt-2">Sign-ups</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center">
            <UserPlus className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex justify-between items-start">
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Conversions</div>
            <div className="text-3xl font-black text-slate-800">{stats?.TotalConversions || 0}</div>
            <div className="text-xs text-slate-400 mt-2">Paid upgrades</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex justify-between items-start">
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Total Earned</div>
            <div className="text-3xl font-black text-slate-800">₹{stats?.TotalEarnings?.toLocaleString() || 0}</div>
            <div className="text-xs text-slate-400 mt-2">All time</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-500 flex items-center justify-center">
            <IndianRupee className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Payout Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
            <Hourglass className="w-7 h-7" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Pending Payout</div>
            <div className="text-3xl font-black text-amber-500">₹{(stats?.PendingAmount || 0).toFixed(2)}</div>
            <div className="text-xs text-slate-400 mt-1">Min threshold: ₹{profile?.EffectiveMinWithdrawal?.toLocaleString() || 2000}</div>
          </div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Paid Out</div>
            <div className="text-3xl font-black text-emerald-500">₹{(stats?.PaidAmount || 0).toFixed(2)}</div>
            <div className="text-xs text-slate-400 mt-1">Successfully transferred</div>
          </div>
        </div>
      </div>

      {/* Policy Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-5 flex items-start gap-4">
          <Percent className="w-6 h-6 text-emerald-600 mt-1 shrink-0" />
          <div>
            <div className="font-bold text-emerald-800 text-[15px] mb-1">Commission Rate: {profile?.EffectiveCommissionRate || 0}%</div>
            <div className="text-sm text-emerald-700/80 leading-relaxed">Earn this percentage on every successful first purchase made via your link.</div>
          </div>
        </div>
        
        <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-5 flex items-start gap-4">
          <Calendar className="w-6 h-6 text-orange-600 mt-1 shrink-0" />
          <div>
            <div className="font-bold text-orange-800 text-[15px] mb-1">
              Program Expiry: {profile?.ProgramExpiryDate ? new Date(profile.ProgramExpiryDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Never'}
            </div>
            <div className="text-sm text-orange-700/80 leading-relaxed">Your ability to earn commissions ends on this date. Keep referring before it expires.</div>
          </div>
        </div>
      </div>

      {/* Recent Clicks */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mt-6">
        <div className="px-6 py-5 border-b flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Recent Link Clicks</h3>
        </div>
        {clicks.length === 0 ? (
          <div className="p-10 text-center">
            <MousePointer2 className="w-10 h-10 mx-auto mb-4 text-slate-200" />
            <p className="text-slate-500 font-medium">No link clicks yet.</p>
            <p className="text-sm text-slate-400 mt-1">Share your link to start getting traffic.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Landing Page</th>
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Source</th>
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Campaign</th>
                </tr>
              </thead>
              <tbody className="divide-y text-slate-600">
                {clicks.slice(0, 10).map((c: any, i: number) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-700">
                      {new Date(c.ClickedAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-4 max-w-[200px] truncate" title={c.LandingPage}>{c.LandingPage || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-xs font-medium">{c.UTMSource || 'Direct'}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{c.UTMCampaign || '-'}</td>
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
