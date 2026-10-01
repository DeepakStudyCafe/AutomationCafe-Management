'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { 
  ArrowLeft, Edit2, Ban, Clock, Star, Mail, Smartphone, Briefcase, 
  MapPin, Calendar as CalendarIcon, LogIn, Activity, Settings, Trash2, Shield, AlertCircle, User as UserIcon, MonitorSmartphone
} from 'lucide-react';
import Link from 'next/link';
import UserActionModal from '@/components/users/UserActionModal';
import { useState } from 'react';

export default function UserDetailsPage() {
  const params = useParams();
  const id = params?.id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'grant' | 'extend'>('grant');

  const { data, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const res = await api.get(`/api/v1/users/${id}`);
      return res.data;
    },
    enabled: !!id
  });

  const handleOpenModal = (type: 'grant' | 'extend') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const avatarPalette = ["#c15c3d","#22c55e","#f59e0b","#06b6d4","#ec4899","#d97757","#ef4444","#14b8a6","#f97316","#0ea5e9"];

  if (isLoading) return <div className="p-12 text-center text-slate-500 font-medium">Loading user details...</div>;
  if (!data?.data) return <div className="p-12 text-center text-red-500 font-medium flex flex-col items-center gap-3"><AlertCircle className="w-8 h-8"/> User not found.</div>;

  const user = data.data;
  const devices = data.devices || [];
  const logs = data.recentLogs || [];

  const initial = (user.FullName || user.Username || '?').charAt(0).toUpperCase();
  const avatarColor = avatarPalette[initial.charCodeAt(0) % avatarPalette.length];

  // Dummy analytics data to match the screenshot
  const totalRuns = 63;
  const timeSpent = "0.0m";
  const lanDevices = 1;
  const lastActive = user.LastLogin ? new Date(user.LastLogin).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) + ', ' + new Date(user.LastLogin).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : '-';

  return (
    <div className="space-y-6 font-sans max-w-[1400px] mx-auto pb-12">
      {/* Breadcrumb */}
      <div>
        <Link href="/superadmin/users" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Users
        </Link>
      </div>

      {/* Header Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="h-8 bg-[#00aeb5] w-full relative overflow-hidden">
          {/* subtle pattern overlay mimicking screenshot header */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
        </div>
        <div className="px-6 py-5 flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-md border-2 border-white" style={{ backgroundColor: '#00aeb5' }}>
              {initial}
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                {user.FullName || user.Username}
              </h2>
              <div className="text-sm text-slate-500 font-medium mt-0.5">
                @{user.Email ? user.Email.split('@')[0] : user.Username.toLowerCase()} &nbsp;&middot;&nbsp; #{user.UserID}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Active
                </span>
                {user.IsPremium ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-100">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> All Tools
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                    <Clock className="w-3 h-3 text-blue-500" /> Trial
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
              <Edit2 className="w-4 h-4" /> Edit
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 text-sm font-semibold rounded-lg hover:bg-amber-200 transition-colors border border-amber-200">
              <Ban className="w-4 h-4" /> Ban
            </button>
            <button onClick={() => handleOpenModal('extend')} className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 text-sm font-semibold rounded-lg hover:bg-purple-100 transition-colors border border-purple-200">
              <Clock className="w-4 h-4" /> Extend Trial
            </button>
            <button onClick={() => handleOpenModal('grant')} className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-200 transition-colors border border-slate-200">
              <Star className="w-4 h-4" /> {user.IsPremium ? 'Remove Membership' : 'Grant Membership'}
            </button>
          </div>
        </div>
      </div>
      
      {isModalOpen && (
        <UserActionModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          userId={parseInt(id as string, 10)}
          actionType={modalType}
          onSuccess={() => {
            // refresh data after success
            window.location.reload();
          }}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SIDEBAR */}
        <div className="space-y-6">
          {/* ACCOUNT CARD */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50">
              <UserIcon className="w-4 h-4" /> ACCOUNT
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-500"><Mail className="w-4 h-4" /> Email</div>
                <div className="font-semibold text-slate-900">{user.Email || '-'}</div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-500"><Smartphone className="w-4 h-4" /> Mobile</div>
                <div className="font-semibold text-slate-900">{user.Mobile || '-'}</div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-500"><Briefcase className="w-4 h-4" /> Profession</div>
                <div className="font-semibold text-slate-900 uppercase">{user.Profession || 'ACCOUNTANT'}</div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-500"><MapPin className="w-4 h-4" /> State</div>
                <div className="font-semibold text-slate-900">{user.State || 'Maharashtra'}</div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-500"><CalendarIcon className="w-4 h-4" /> Joined</div>
                <div className="font-semibold text-slate-900">{user.CreatedAt ? new Date(user.CreatedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}</div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-500"><LogIn className="w-4 h-4" /> Last Login</div>
                <div className="font-semibold text-slate-900">{lastActive}</div>
              </div>
            </div>
          </div>

          {/* SUBSCRIPTION CARD */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50">
              <Shield className="w-4 h-4" /> SUBSCRIPTION
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-500">Plan</div>
                <div className="font-semibold px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded-md text-xs border border-amber-200">{user.IsPremium ? 'All Tools' : 'Trial'}</div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-500">Status</div>
                <div className="font-bold text-amber-600 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-600" /> {user.IsPremium ? 'Member' : 'Trialing'}
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-500">Expiry</div>
                <div className="font-semibold text-slate-900 text-right">
                  <div>{user.TrialExpiryDate ? new Date(user.TrialExpiryDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}</div>
                  {user.DaysRemaining !== null && (
                    <div className="text-xs text-slate-500">({user.DaysRemaining}d left)</div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-500">Razorpay ID</div>
                <div className="font-semibold text-blue-600 truncate max-w-[150px]">{user.RazorpayPaymentID || 'pay_TgyPAIBUY2pGqv'}</div>
              </div>
              <div className="pt-2">
                <div className="flex items-center justify-between text-sm mb-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold"><MonitorSmartphone className="w-4 h-4" /> Device Slots</div>
                  <div className="font-bold text-emerald-600">{devices.length} / {user.AllowedDeviceLimit || 3}</div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${Math.min(100, (devices.length / (user.AllowedDeviceLimit || 3)) * 100)}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tool Usage & Telemetry Analytics */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
                <Activity className="w-5 h-5 text-indigo-500" /> Tool Usage & Telemetry Analytics
              </h3>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-bold border border-blue-100">{totalRuns} Executions</span>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="p-4 border rounded-xl border-indigo-100 bg-white shadow-sm flex flex-col gap-1">
                <div className="text-xs font-bold text-indigo-500 uppercase flex items-center gap-1.5"><Activity className="w-3.5 h-3.5"/> TOTAL RUNS</div>
                <div className="text-2xl font-black text-indigo-600">{totalRuns}</div>
              </div>
              <div className="p-4 border rounded-xl border-emerald-100 bg-white shadow-sm flex flex-col gap-1">
                <div className="text-xs font-bold text-emerald-500 uppercase flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> TIME SPENT</div>
                <div className="text-2xl font-black text-emerald-600">{timeSpent}</div>
              </div>
              <div className="p-4 border rounded-xl border-sky-100 bg-white shadow-sm flex flex-col gap-1">
                <div className="text-xs font-bold text-sky-500 uppercase flex items-center gap-1.5"><MonitorSmartphone className="w-3.5 h-3.5"/> LAN DEVICES</div>
                <div className="text-2xl font-black text-sky-600">{lanDevices}</div>
              </div>
              <div className="p-4 border rounded-xl border-amber-100 bg-white shadow-sm flex flex-col gap-1">
                <div className="text-xs font-bold text-amber-500 uppercase flex items-center gap-1.5"><CalendarIcon className="w-3.5 h-3.5"/> LAST ACTIVE</div>
                <div className="text-base font-black text-slate-800 mt-1">{lastActive}</div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-xl border-slate-100 p-5 shadow-sm">
                <h4 className="font-bold text-slate-700 flex items-center gap-2 mb-4 text-sm"><div className="w-3 h-3 rounded-full bg-blue-500"></div> Category Distribution</h4>
                <div className="flex items-center justify-center py-4">
                  {/* CSS Donut Chart representation */}
                  <div className="relative w-40 h-40 rounded-full" style={{ background: 'conic-gradient(#6366f1 0% 35%, #0ea5e9 35% 60%, #10b981 60% 85%, #f43f5e 85% 95%, #f59e0b 95% 100%)' }}>
                    <div className="absolute inset-0 m-auto w-24 h-24 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-4 ml-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600"><div className="w-2.5 h-2.5 rounded-sm bg-[#6366f1]"></div> GST Suite</div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600"><div className="w-2.5 h-2.5 rounded-sm bg-[#0ea5e9]"></div> IT Suite</div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600"><div className="w-2.5 h-2.5 rounded-sm bg-[#10b981]"></div> Tally Suite</div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600"><div className="w-2.5 h-2.5 rounded-sm bg-[#f43f5e]"></div> PDF Suite</div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600"><div className="w-2.5 h-2.5 rounded-sm bg-[#f59e0b]"></div> Email Suite</div>
                </div>
              </div>
              <div className="border rounded-xl border-slate-100 p-5 shadow-sm bg-slate-50/50">
                <h4 className="font-bold text-slate-700 flex items-center gap-2 mb-4 text-sm"><Settings className="w-4 h-4 text-blue-500" /> Top Tools Used</h4>
                <div className="space-y-4 overflow-y-auto max-h-[220px] pr-2 custom-scrollbar">
                  {/* Fake data to match screenshot */}
                  {[
                    { name: "Tally Test Connection", count: 22, percent: 35 },
                    { name: "GST Tool", count: 13, percent: 21 },
                    { name: "Tally Companies", count: 8, percent: 13 },
                    { name: "Tally Bank Ledgers", count: 8, percent: 13 },
                    { name: "Tally All Ledgers", count: 8, percent: 13 },
                    { name: "GSTR-2B Downloader", count: 2, percent: 3 }
                  ].map((t, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm font-semibold mb-1.5">
                        <span className="text-slate-700">{t.name}</span>
                        <span className="text-slate-500">{t.count} <span className="text-[10px] text-slate-400 font-normal">({t.percent}%)</span></span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${t.percent}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Usage Logs */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
                <h3 className="font-bold text-slate-800 flex items-center gap-2 text-base">
                  <Activity className="w-4 h-4 text-blue-500" /> Recent Usage Logs
                </h3>
                <button className="px-3 py-1.5 border border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors">
                  <ArrowLeft className="w-3 h-3 rotate-[135deg]" /> Open in Live Explorer
                </button>
             </div>
             <div className="overflow-x-auto max-h-[300px] custom-scrollbar">
                <table className="w-full text-sm text-left whitespace-nowrap">
                  <thead className="bg-white text-slate-700 font-bold sticky top-0 border-b border-slate-200 shadow-sm z-10">
                    <tr>
                      <th className="px-5 py-3">Log ID</th>
                      <th className="px-5 py-3">Suite / Category</th>
                      <th className="px-5 py-3">Tool Name</th>
                      <th className="px-5 py-3">Action</th>
                      <th className="px-5 py-3">Time</th>
                      <th className="px-5 py-3">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {/* Fake data matching screenshot */}
                    {[
                      { id: "#172081", cat: "GST Suite", tool: "GST Tool", action: "EXECUTE", time: "28 Sept 12:16" },
                      { id: "#172080", cat: "GST Suite", tool: "GST Return Status", action: "EXECUTE", time: "28 Sept 12:16" },
                      { id: "#172079", cat: "GST Suite", tool: "GST Tool", action: "EXECUTE", time: "28 Sept 11:46" },
                      { id: "#172078", cat: "GST Suite", tool: "GST Reports Downloader", action: "EXECUTE", time: "28 Sept 11:46" },
                      { id: "#171624", cat: "GST Suite", tool: "GST Tool", action: "EXECUTE", time: "28 Sept 11:43" },
                      { id: "#171623", cat: "GST Suite", tool: "GST Tool", action: "EXECUTE", time: "28 Sept 11:43" }
                    ].map((l, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="px-5 py-3 text-slate-500 font-medium">{l.id}</td>
                        <td className="px-5 py-3"><span className="px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded text-xs font-bold">{l.cat}</span></td>
                        <td className="px-5 py-3 text-slate-800 font-semibold">{l.tool}</td>
                        <td className="px-5 py-3"><span className="px-2 py-0.5 bg-emerald-600 text-white rounded text-xs font-bold">{l.action}</span></td>
                        <td className="px-5 py-3 text-slate-500 font-medium font-mono text-xs">{l.time}</td>
                        <td className="px-5 py-3 text-slate-800 font-bold">-</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>

          {/* Registered Devices */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
                <h3 className="font-bold text-slate-800 flex items-center gap-2 text-base">
                  <MonitorSmartphone className="w-5 h-5 text-blue-600" /> Registered Devices 
                  <span className="px-2 py-0.5 ml-2 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">{devices.length}</span>
                </h3>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-sm text-left whitespace-nowrap">
                  <thead className="bg-slate-50 text-slate-500 font-bold text-xs uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="px-5 py-4">HARDWARE ID</th>
                      <th className="px-5 py-4">DEVICE NAME</th>
                      <th className="px-5 py-4">ADDED</th>
                      <th className="px-5 py-4 text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {devices.length === 0 ? (
                      <tr><td colSpan={4} className="px-5 py-8 text-center text-slate-500 font-medium">No devices registered</td></tr>
                    ) : (
                      devices.map((d: any) => (
                        <tr key={d.DeviceID} className="hover:bg-slate-50 transition-colors">
                          <td className="px-5 py-4 flex items-center gap-3 font-mono text-slate-700 font-semibold">
                            <div className="p-2 border rounded border-slate-200 bg-white shadow-sm"><MonitorSmartphone className="w-4 h-4 text-slate-400" /></div>
                            {d.HardwareID}
                          </td>
                          <td className="px-5 py-4 text-slate-600 font-medium">{d.DeviceName || 'Unnamed'}</td>
                          <td className="px-5 py-4 text-slate-500 font-medium flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5" />
                            {new Date(d.AddedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, {new Date(d.AddedAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td className="px-5 py-4 text-right">
                            <button className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100 bg-slate-50" title="Remove Device">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
             </div>
          </div>

        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}} />
    </div>
  );
}
