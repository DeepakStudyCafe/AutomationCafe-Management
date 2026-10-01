'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Users, Banknote, Settings, Check, X } from 'lucide-react';

export default function ReferralsPage() {
  const [activeTab, setActiveTab] = useState<'referrers' | 'withdrawals' | 'settings'>('referrers');
  const queryClient = useQueryClient();

  const { data: referrers, isLoading: loadingReferrers } = useQuery({
    queryKey: ['referrers'],
    queryFn: async () => (await api.get('/api/v1/referrals')).data.data,
    enabled: activeTab === 'referrers'
  });

  const { data: withdrawals, isLoading: loadingWithdrawals } = useQuery({
    queryKey: ['withdrawals'],
    queryFn: async () => (await api.get('/api/v1/referrals/withdrawals')).data.data,
    enabled: activeTab === 'withdrawals'
  });

  const { data: settings, isLoading: loadingSettings } = useQuery({
    queryKey: ['global-settings'],
    queryFn: async () => (await api.get('/api/v1/referrals/settings/global')).data.data,
    enabled: activeTab === 'settings'
  });

  const approveMutation = useMutation({
    mutationFn: (id: number) => api.post(`/api/v1/referrals/withdrawals/${id}/approve`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['withdrawals'] })
  });

  const rejectMutation = useMutation({
    mutationFn: (id: number) => api.post(`/api/v1/referrals/withdrawals/${id}/reject`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['withdrawals'] })
  });

  const [globalFormData, setGlobalFormData] = useState<any>({});
  
  const saveSettingsMutation = useMutation({
    mutationFn: (data: any) => api.post('/api/v1/referrals/settings/global', data),
    onSuccess: () => {
      alert('Settings saved!');
      queryClient.invalidateQueries({ queryKey: ['global-settings'] });
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Referral Program</h2>
          <p className="text-sm text-slate-500">Manage referrers, process payouts, and configure commission rates.</p>
        </div>
      </div>

      <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg w-fit">
        <button onClick={() => setActiveTab('referrers')} className={`px-4 py-2 text-sm font-medium rounded-md flex items-center gap-2 ${activeTab === 'referrers' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
          <Users className="w-4 h-4" /> Referrers
        </button>
        <button onClick={() => setActiveTab('withdrawals')} className={`px-4 py-2 text-sm font-medium rounded-md flex items-center gap-2 ${activeTab === 'withdrawals' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
          <Banknote className="w-4 h-4" /> Withdrawals
        </button>
        <button onClick={() => setActiveTab('settings')} className={`px-4 py-2 text-sm font-medium rounded-md flex items-center gap-2 ${activeTab === 'settings' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
          <Settings className="w-4 h-4" /> Global Settings
        </button>
      </div>

      {activeTab === 'referrers' && (
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b text-slate-600 font-medium">
              <tr>
                <th className="py-3 px-4">Referrer Name</th>
                <th className="py-3 px-4">Referral Code</th>
                <th className="py-3 px-4">Conversions</th>
                <th className="py-3 px-4">Total Earnings</th>
                <th className="py-3 px-4">Pending</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loadingReferrers ? (
                <tr><td colSpan={5} className="py-8 text-center text-slate-500">Loading...</td></tr>
              ) : referrers?.length === 0 ? (
                <tr><td colSpan={5} className="py-8 text-center text-slate-500">No referrers found.</td></tr>
              ) : (
                referrers?.map((r: any) => (
                  <tr key={r.UserID} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{r.FullName}</div>
                      <div className="text-slate-500 text-xs">{r.Email}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-medium">{r.MyReferralCode || '-'}</td>
                    <td className="py-3 px-4">{r.TotalConversions}</td>
                    <td className="py-3 px-4 text-emerald-600 font-semibold">₹{r.TotalEarnings}</td>
                    <td className="py-3 px-4 text-amber-600">₹{r.PendingAmount}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'withdrawals' && (
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b text-slate-600 font-medium">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Bank Details</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loadingWithdrawals ? (
                <tr><td colSpan={5} className="py-8 text-center text-slate-500">Loading...</td></tr>
              ) : withdrawals?.length === 0 ? (
                <tr><td colSpan={5} className="py-8 text-center text-slate-500">No withdrawal requests.</td></tr>
              ) : (
                withdrawals?.map((w: any) => (
                  <tr key={w.RequestID} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-900">{w.FullName}</div>
                      <div className="text-slate-500 text-xs">{w.Email}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-900 font-bold">₹{w.RequestedAmount}</td>
                    <td className="py-3 px-4 text-xs text-slate-600">
                      <div>Name: {w.BankAccountName || '-'}</div>
                      <div>A/C: {w.BankAccountNumber || '-'}</div>
                      <div>IFSC: {w.BankIFSC || '-'}</div>
                      <div>PAN: {w.PAN || '-'}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${w.Status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : w.Status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>
                        {w.Status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {w.Status === 'Pending' && (
                        <div className="flex gap-2 justify-end">
                          <button onClick={() => approveMutation.mutate(w.RequestID)} className="p-1 text-emerald-600 hover:bg-emerald-50 rounded" title="Approve & Mark Paid">
                            <Check className="w-5 h-5" />
                          </button>
                          <button onClick={() => rejectMutation.mutate(w.RequestID)} className="p-1 text-red-600 hover:bg-red-50 rounded" title="Reject">
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white rounded-xl border shadow-sm p-6 max-w-2xl">
          {loadingSettings ? <div>Loading...</div> : (
            <form onSubmit={(e) => {
              e.preventDefault();
              saveSettingsMutation.mutate(globalFormData);
            }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Free Commission Rate</label>
                  <input type="number" step="0.01" className="w-full border rounded-lg px-3 py-2" defaultValue={settings?.GlobalFreeCommissionRate} onChange={e => setGlobalFormData({...globalFormData, freeCommissionRate: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Premium Commission Rate</label>
                  <input type="number" step="0.01" className="w-full border rounded-lg px-3 py-2" defaultValue={settings?.GlobalPremiumCommissionRate} onChange={e => setGlobalFormData({...globalFormData, premiumCommissionRate: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Free Min Withdrawal (₹)</label>
                  <input type="number" className="w-full border rounded-lg px-3 py-2" defaultValue={settings?.GlobalFreeMinWithdrawal} onChange={e => setGlobalFormData({...globalFormData, freeMinWithdrawal: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Premium Min Withdrawal (₹)</label>
                  <input type="number" className="w-full border rounded-lg px-3 py-2" defaultValue={settings?.GlobalPremiumMinWithdrawal} onChange={e => setGlobalFormData({...globalFormData, premiumMinWithdrawal: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Months</label>
                  <input type="number" className="w-full border rounded-lg px-3 py-2" defaultValue={settings?.GlobalExpiryMonths} onChange={e => setGlobalFormData({...globalFormData, expiryMonths: e.target.value})} />
                </div>
              </div>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                Save Global Settings
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
