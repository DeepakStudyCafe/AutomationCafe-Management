'use client';

import { useState, useEffect } from 'react';
import { X, Star, Clock, FileText } from 'lucide-react';
import api from '@/lib/api';

interface Plan {
  PlanID: number;
  PlanName: string;
}

interface UserActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  actionType: 'grant' | 'extend';
  onSuccess: () => void;
}

export default function UserActionModal({ isOpen, onClose, userId, actionType, onSuccess }: UserActionModalProps) {
  const [activeTab, setActiveTab] = useState<'grant' | 'extend'>(actionType);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlans, setSelectedPlans] = useState<number[]>([]);
  
  // Grant State
  const [expiryDate, setExpiryDate] = useState('');
  const [razorpayId, setRazorpayId] = useState('');
  const [isPartial, setIsPartial] = useState(false);
  const [partialDetails, setPartialDetails] = useState('');
  const [grantSendEmail, setGrantSendEmail] = useState(true);
  
  // Extend State
  const [newExpiry, setNewExpiry] = useState('');
  const [pdfLimit, setPdfLimit] = useState(10);
  const [bankLimit, setBankLimit] = useState(5);
  const [resetScans, setResetScans] = useState(true);
  const [extendSendEmail, setExtendSendEmail] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setActiveTab(actionType);
  }, [actionType, isOpen]);

  useEffect(() => {
    if (isOpen && activeTab === 'grant' && plans.length === 0) {
      api.get('/api/v1/plans').then(res => {
        if (res.data?.data) {
          setPlans(res.data.data.filter((p: Plan) => p.PlanName !== 'Trial'));
        }
      }).catch(err => console.error(err));
    }
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  const handleGrant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlans.length === 0) {
      setError("Please select at least one plan.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await api.post(`/api/v1/users/${userId}/grant-premium`, {
        planIds: selectedPlans,
        expiryDate: expiryDate || null,
        razorpayPaymentId: razorpayId,
        isPartialPayment: isPartial,
        partialPaymentDetails: partialDetails,
        sendEmail: grantSendEmail
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to grant membership");
    } finally {
      setLoading(false);
    }
  };

  const handleExtend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpiry) {
      setError("New expiry date is required.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await api.post(`/api/v1/users/${userId}/extend-trial`, {
        newExpiryDate: newExpiry,
        pdfScannedLimit: pdfLimit,
        bankPdfScannedLimit: bankLimit,
        resetScans,
        sendEmail: extendSendEmail
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to extend trial");
    } finally {
      setLoading(false);
    }
  };

  const applyPreset = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    setNewExpiry(d.toISOString().split('T')[0]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
            User Access Management
          </h3>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-3 bg-slate-50">
          <div className="flex bg-slate-100 p-1 rounded-lg gap-1">
            <button 
              className={`flex-1 py-1.5 rounded-md text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${activeTab === 'grant' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
              onClick={() => setActiveTab('grant')}
            >
              <Star className={`w-4 h-4 ${activeTab === 'grant' ? 'text-amber-500' : 'text-slate-400'}`} /> Grant Membership
            </button>
            <button 
              className={`flex-1 py-1.5 rounded-md text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${activeTab === 'extend' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
              onClick={() => setActiveTab('extend')}
            >
              <Clock className={`w-4 h-4 ${activeTab === 'extend' ? 'text-blue-500' : 'text-slate-400'}`} /> Extend Trial
            </button>
          </div>
        </div>

        <div className="overflow-y-auto flex-1 p-4">
          {error && <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-medium">{error}</div>}
          
          {activeTab === 'grant' && (
            <form id="grant-form" onSubmit={handleGrant} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Subscription Plan(s) <span className="text-slate-400 font-normal text-xs">(select one or more)</span></label>
                <div className="grid grid-cols-2 gap-2">
                  {plans.map(p => (
                    <label key={p.PlanID} className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-colors ${selectedPlans.includes(p.PlanID) ? 'border-amber-500 bg-amber-50' : 'border-slate-200 hover:bg-slate-50 bg-white'}`}>
                      <input 
                        type="checkbox" 
                        checked={selectedPlans.includes(p.PlanID)} 
                        onChange={(e) => {
                          if (e.target.checked) setSelectedPlans([...selectedPlans, p.PlanID]);
                          else setSelectedPlans(selectedPlans.filter(id => id !== p.PlanID));
                        }} 
                        className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500" 
                      />
                      <span className={`text-sm font-medium ${selectedPlans.includes(p.PlanID) ? 'text-amber-800' : 'text-slate-700'}`}>{p.PlanName}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Expiry Date <span className="text-slate-400 font-normal text-xs">(optional)</span></label>
                  <input type="date" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} className="w-full border-slate-200 rounded-lg text-sm focus:ring-amber-500 focus:border-amber-500" />
                  <p className="text-[10px] text-slate-500 mt-1">Leave blank for lifetime.</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Razorpay ID <span className="text-slate-400 font-normal text-xs">(optional)</span></label>
                  <input type="text" placeholder="pay_123xyz" value={razorpayId} onChange={e => setRazorpayId(e.target.value)} className="w-full border-slate-200 rounded-lg text-sm focus:ring-amber-500 focus:border-amber-500" />
                  <p className="text-[10px] text-slate-500 mt-1">Payment ref ID.</p>
                </div>
              </div>

              <div className="p-3 bg-amber-50/50 border border-amber-200 rounded-lg">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={isPartial} onChange={e => setIsPartial(e.target.checked)} className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500 border-amber-300" />
                  <span className="text-sm font-semibold text-amber-800">Mark as Partial Payment</span>
                </label>
                {isPartial && (
                  <div className="mt-3">
                    <input type="text" placeholder="e.g. Paid ₹5,000 / Pending ₹5,000" value={partialDetails} onChange={e => setPartialDetails(e.target.value)} className="w-full border-amber-200 rounded-md text-sm bg-white focus:ring-amber-500 focus:border-amber-500 placeholder-amber-200" />
                  </div>
                )}
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={grantSendEmail} onChange={e => setGrantSendEmail(e.target.checked)} className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-emerald-300" />
                  <span className="text-sm font-semibold text-emerald-800">Send activation email notification</span>
                </label>
              </div>
            </form>
          )}

          {activeTab === 'extend' && (
            <form id="extend-form" onSubmit={handleExtend} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Quick Presets</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  <button type="button" onClick={() => applyPreset(3)} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-md border border-slate-200 transition-colors">+3 Days</button>
                  <button type="button" onClick={() => applyPreset(7)} className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded-md border border-blue-200 transition-colors">+7 Days</button>
                  <button type="button" onClick={() => applyPreset(15)} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-md border border-slate-200 transition-colors">+15 Days</button>
                  <button type="button" onClick={() => applyPreset(30)} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-md border border-slate-200 transition-colors">+30 Days</button>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">New Expiry Date <span className="text-red-500">*</span></label>
                  <input type="date" required value={newExpiry} onChange={e => setNewExpiry(e.target.value)} className="w-full border-slate-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Scan Limits</label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1"><FileText className="w-3 h-3 text-red-500" /> General PDF</label>
                    <div className="flex">
                      <input type="number" min="0" value={pdfLimit} onChange={e => setPdfLimit(parseInt(e.target.value) || 0)} className="w-full border-slate-200 rounded-l-md text-sm focus:ring-blue-500 focus:border-blue-500 h-8" />
                      <button type="button" onClick={() => setPdfLimit(prev => prev + 10)} className="px-2 bg-slate-200 text-slate-700 text-xs font-bold rounded-r-md border border-l-0 border-slate-200 hover:bg-slate-300">+10</button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1"><FileText className="w-3 h-3 text-blue-500" /> Bank Statement</label>
                    <div className="flex">
                      <input type="number" min="0" value={bankLimit} onChange={e => setBankLimit(parseInt(e.target.value) || 0)} className="w-full border-slate-200 rounded-l-md text-sm focus:ring-blue-500 focus:border-blue-500 h-8" />
                      <button type="button" onClick={() => setBankLimit(prev => prev + 5)} className="px-2 bg-slate-200 text-slate-700 text-xs font-bold rounded-r-md border border-l-0 border-slate-200 hover:bg-slate-300">+5</button>
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={resetScans} onChange={e => setResetScans(e.target.checked)} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-slate-300" />
                    <span className="text-xs font-semibold text-slate-700">Reset scan usage count back to 0</span>
                  </label>
                </div>
              </div>

              <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={extendSendEmail} onChange={e => setExtendSendEmail(e.target.checked)} className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 border-indigo-300" />
                  <span className="text-sm font-semibold text-indigo-800">Send email notification</span>
                </label>
              </div>
            </form>
          )}
        </div>

        <div className="p-4 border-t border-slate-100 flex justify-end gap-2 bg-slate-50">
          <button onClick={onClose} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button 
            type="submit" 
            form={activeTab === 'grant' ? 'grant-form' : 'extend-form'}
            disabled={loading}
            className={`flex items-center gap-2 px-6 py-2 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm ${activeTab === 'grant' ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700' : 'bg-blue-600 hover:bg-blue-700'} disabled:opacity-50`}
          >
            {activeTab === 'grant' ? <Star className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
            {loading ? 'Processing...' : activeTab === 'grant' ? 'Grant Membership' : 'Extend Trial'}
          </button>
        </div>
      </div>
    </div>
  );
}
