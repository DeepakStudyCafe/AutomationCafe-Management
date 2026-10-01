'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Plus, Percent, CheckCircle2, XCircle, Trash2, Power, Globe, Globe2 } from 'lucide-react';

export default function CouponsPage() {
  const queryClient = useQueryClient();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['coupons'],
    queryFn: async () => {
      const res = await api.get('/api/v1/coupons');
      return res.data;
    }
  });

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    discountPercent: 10,
    expiryDate: '',
    isLive: false
  });

  const toggleStatusMutation = useMutation({
    mutationFn: (id: number) => api.patch(`/api/v1/coupons/${id}/toggle-status`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['coupons'] }),
    onError: (err: any) => alert(err.response?.data?.error?.message || 'Failed')
  });

  const toggleLiveMutation = useMutation({
    mutationFn: (id: number) => api.patch(`/api/v1/coupons/${id}/toggle-live`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['coupons'] }),
    onError: (err: any) => alert(err.response?.data?.error?.message || 'Failed')
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/api/v1/coupons/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['coupons'] }),
    onError: (err: any) => alert(err.response?.data?.error?.message || 'Failed')
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/api/v1/coupons', formData);
      setShowModal(false);
      setFormData({ code: '', discountPercent: 10, expiryDate: '', isLive: false });
      refetch();
    } catch (err: any) {
      alert(err.response?.data?.error?.message || 'Failed to create coupon');
    }
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Coupons & Discounts</h2>
          <p className="text-sm text-slate-500">Manage promotional codes and live website offers.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Coupon
        </button>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 border-b text-slate-600 font-medium">
            <tr>
              <th className="py-3 px-4">Code</th>
              <th className="py-3 px-4">Discount</th>
              <th className="py-3 px-4">Expiry Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Live on Site</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {isLoading ? (
              <tr><td colSpan={6} className="py-8 text-center text-slate-500">Loading coupons...</td></tr>
            ) : data?.data?.length === 0 ? (
              <tr><td colSpan={6} className="py-8 text-center text-slate-500">No coupons found.</td></tr>
            ) : (
              data?.data?.map((coupon: any) => (
                <tr key={coupon.CouponID} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900 flex items-center gap-2">
                      <Percent className="w-4 h-4 text-slate-400" />
                      {coupon.Code}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-semibold text-blue-600">
                    {coupon.DiscountPercent}%
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {coupon.ExpiryDate ? new Date(coupon.ExpiryDate).toLocaleDateString() : 'Never'}
                  </td>
                  <td className="py-3 px-4">
                    {coupon.IsActive ? (
                      <span className="flex items-center gap-1 text-emerald-600 text-xs font-medium"><CheckCircle2 className="w-3.5 h-3.5" /> Active</span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-600 text-xs font-medium"><XCircle className="w-3.5 h-3.5" /> Inactive</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {coupon.IsLive ? (
                      <span className="flex items-center gap-1 text-purple-600 text-xs font-medium"><Globe className="w-3.5 h-3.5" /> Live Offer</span>
                    ) : (
                      <span className="flex items-center gap-1 text-slate-400 text-xs font-medium"><Globe2 className="w-3.5 h-3.5" /> Hidden</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => toggleLiveMutation.mutate(coupon.CouponID)} className="text-purple-600 hover:text-purple-800 p-1" title="Toggle Live on Website">
                        <Globe className="w-4 h-4" />
                      </button>
                      <button onClick={() => toggleStatusMutation.mutate(coupon.CouponID)} className="text-amber-600 hover:text-amber-800 p-1" title="Toggle Status">
                        <Power className="w-4 h-4" />
                      </button>
                      <button onClick={() => { if(confirm('Delete coupon?')) deleteMutation.mutate(coupon.CouponID) }} className="text-red-600 hover:text-red-800 p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md animate-in zoom-in-95">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Create Coupon</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Coupon Code</label>
                <input 
                  required
                  type="text" 
                  value={formData.code}
                  onChange={e => setFormData({...formData, code: e.target.value.toUpperCase()})}
                  className="w-full px-3 py-2 border rounded-md uppercase"
                  placeholder="e.g. SAVE20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Discount Percent (%)</label>
                <input 
                  required
                  type="number" 
                  min="1" max="100"
                  value={formData.discountPercent}
                  onChange={e => setFormData({...formData, discountPercent: Number(e.target.value)})}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date (Optional)</label>
                <input 
                  type="date" 
                  value={formData.expiryDate}
                  onChange={e => setFormData({...formData, expiryDate: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="flex items-center gap-2 mt-4">
                <input 
                  type="checkbox" 
                  id="isLive"
                  checked={formData.isLive}
                  onChange={e => setFormData({...formData, isLive: e.target.checked})}
                  className="rounded border-slate-300 text-blue-600"
                />
                <label htmlFor="isLive" className="text-sm font-medium text-slate-700">Make Live on Checkout Page</label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-md">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium">
                  Create Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
