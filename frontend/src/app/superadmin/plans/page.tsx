'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Plus, Edit, Trash2, Power, PowerOff, Shield, X, Package } from 'lucide-react';
import toast from 'react-hot-toast'; // Using native alert as fallback if not installed, wait no I'll use native alert explicitly to avoid build errors.

export default function PlansPage() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    planName: '',
    isActive: true,
    allowedModules: [] as string[]
  });

  const availableModules = [
    'GSTR2B', 'GSTR3B', 'GSTR3B_Excel', 'GST_Verifier', 'GST_Challan',
    'R1_JSON', 'JSON_Excel', 'R1_PDF', 'IMS', 'GSTR1_Cons', 'GST_Reco', 'GST_Reports',
    'IT_26AS', 'IT_Challan', 'ITR_Bot', 'ITR_Status', 'Demand_Checker', 'Refund_Checker',
    'PDF_Merge', 'PDF_Split', 'PDF_Extract', 'PDF_Compress', 'PDF_Redact',
    'Email_GST_Request', 'Email_Invoice', 'Email_Payment',
    'Tally_Automation', 'Tally_Bank', 'Tally_Sales'
  ];

  const { data, isLoading } = useQuery({
    queryKey: ['plans'],
    queryFn: async () => {
      const res = await api.get('/api/v1/plans');
      return res.data;
    }
  });

  const toggleStatusMutation = useMutation({
    mutationFn: (id: number) => api.patch(`/api/v1/plans/${id}/toggle-status`),
    onSuccess: () => {
      alert('Plan status updated');
      queryClient.invalidateQueries({ queryKey: ['plans'] });
    },
    onError: (err: any) => alert(err.response?.data?.error?.message || 'Failed')
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/api/v1/plans/${id}`),
    onSuccess: () => {
      alert('Plan deleted');
      queryClient.invalidateQueries({ queryKey: ['plans'] });
    },
    onError: (err: any) => alert(err.response?.data?.error?.message || 'Failed to delete plan. Ensure no users are assigned.')
  });

  const saveMutation = useMutation({
    mutationFn: async (payload: any) => {
      if (editingPlan) return api.put(`/api/v1/plans/${editingPlan.PlanID}`, payload);
      return api.post('/api/v1/plans', payload);
    },
    onSuccess: () => {
      alert(editingPlan ? 'Plan updated' : 'Plan created');
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['plans'] });
    },
    onError: (err: any) => alert(err.response?.data?.error?.message || 'Failed')
  });

  const openCreate = () => {
    setEditingPlan(null);
    setFormData({ planName: '', isActive: true, allowedModules: [] });
    setIsModalOpen(true);
  };

  const openEdit = (plan: any) => {
    setEditingPlan(plan);
    setFormData({
      planName: plan.PlanName || '',
      isActive: !!plan.IsActive,
      allowedModules: plan.AllowedModules || []
    });
    setIsModalOpen(true);
  };

  const togglePermission = (mod: string) => {
    setFormData(prev => ({
      ...prev,
      allowedModules: prev.allowedModules.includes(mod)
        ? prev.allowedModules.filter(m => m !== mod)
        : [...prev.allowedModules, mod]
    }));
  };

  const selectGroup = (prefix: string) => {
    setFormData(prev => {
      const related = availableModules.filter(m => m.startsWith(prefix));
      const allSelected = related.every(m => prev.allowedModules.includes(m));
      if (allSelected) {
        return { ...prev, allowedModules: prev.allowedModules.filter(m => !related.includes(m)) };
      } else {
        const newMods = new Set([...prev.allowedModules, ...related]);
        return { ...prev, allowedModules: Array.from(newMods) };
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Subscription Plans</h2>
          <p className="text-sm text-slate-500">Manage premium subscription plans and module access.</p>
        </div>
        <button 
          onClick={openCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full py-8 text-center text-slate-500">Loading plans...</div>
        ) : data?.data?.length === 0 ? (
          <div className="col-span-full py-8 text-center text-slate-500">No plans found.</div>
        ) : (
          data?.data.map((plan: any) => (
            <div key={plan.PlanID} className={`bg-white rounded-xl border shadow-sm overflow-hidden flex flex-col ${!plan.IsActive ? 'opacity-75 bg-slate-50' : ''}`}>
              <div className="p-5 border-b flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-600" /> {plan.PlanName}
                  </h3>
                </div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${plan.IsActive ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                  {plan.IsActive ? 'Active' : 'Disabled'}
                </span>
              </div>
              <div className="p-5 flex-1">
                <p className="text-sm font-medium text-slate-700 mb-3">Included Modules ({plan.AllowedModules?.length || 0})</p>
                <div className="flex flex-wrap gap-1.5">
                  {plan.AllowedModules?.slice(0, 10).map((mod: string) => (
                    <span key={mod} className="bg-blue-50 text-blue-700 border border-blue-100 text-[10px] px-2 py-1 rounded">
                      {mod}
                    </span>
                  ))}
                  {(plan.AllowedModules?.length || 0) > 10 && (
                    <span className="bg-slate-100 text-slate-600 border border-slate-200 text-[10px] px-2 py-1 rounded">
                      +{plan.AllowedModules.length - 10} more
                    </span>
                  )}
                </div>
              </div>
              <div className="p-4 border-t bg-slate-50 flex justify-end gap-2">
                <button onClick={() => toggleStatusMutation.mutate(plan.PlanID)} className={`p-1.5 rounded-md ${plan.IsActive ? 'text-amber-600 hover:bg-amber-100' : 'text-emerald-600 hover:bg-emerald-100'}`} title={plan.IsActive ? 'Disable' : 'Enable'}>
                  {plan.IsActive ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
                </button>
                <button onClick={() => openEdit(plan)} className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-md"><Edit className="w-4 h-4" /></button>
                <button onClick={() => { if (confirm(`Delete ${plan.PlanName}?`)) deleteMutation.mutate(plan.PlanID); }} className="p-1.5 text-red-600 hover:bg-red-100 rounded-md"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">{editingPlan ? 'Edit Plan' : 'Create Plan'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Plan Name *</label>
                  <input type="text" value={formData.planName} onChange={e => setFormData({...formData, planName: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:border-blue-500" />
                </div>
                <div className="flex items-center mt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="rounded text-blue-600" />
                    <span className="text-sm font-medium text-slate-700">Is Active</span>
                  </label>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3 border-b pb-2">
                  <h4 className="text-sm font-medium text-slate-900">Module Access</h4>
                  <div className="flex gap-2 text-xs">
                    <button onClick={() => selectGroup('GST')} className="text-blue-600 hover:underline">Toggle GST</button>
                    <button onClick={() => selectGroup('IT')} className="text-blue-600 hover:underline">Toggle IT</button>
                    <button onClick={() => selectGroup('PDF')} className="text-blue-600 hover:underline">Toggle PDF</button>
                    <button onClick={() => selectGroup('Tally')} className="text-blue-600 hover:underline">Toggle Tally</button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {availableModules.map(mod => (
                    <label key={mod} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-slate-50 rounded border border-transparent hover:border-slate-200">
                      <input 
                        type="checkbox" 
                        checked={formData.allowedModules.includes(mod)}
                        onChange={() => togglePermission(mod)}
                        className="rounded text-blue-600"
                      />
                      <span className="text-xs text-slate-700 truncate">{mod.replace(/_/g, ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t bg-slate-50 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-md">Cancel</button>
              <button onClick={() => saveMutation.mutate(formData)} disabled={saveMutation.isPending || !formData.planName} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50">
                {saveMutation.isPending ? 'Saving...' : (editingPlan ? 'Update Plan' : 'Create Plan')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
