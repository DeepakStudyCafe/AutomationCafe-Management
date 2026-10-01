'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Video, CalendarCheck, CheckCircle2, XCircle, Search, Calendar, Edit, Trash2, Plus, PhoneIcon as WhatsappIcon, Settings, List, Clock } from 'lucide-react';

export default function DemoBookingsPage() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'bookings' | 'settings'>('bookings');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Confirmed' | 'Completed' | 'Cancelled'>('All');
  const [search, setSearch] = useState('');

  const { data: bookingsData, isLoading: loadingBookings } = useQuery({
    queryKey: ['demo-bookings'],
    queryFn: async () => (await api.get('/api/v1/demos')).data.data
  });

  const { data: settingsData, isLoading: loadingSettings } = useQuery({
    queryKey: ['demo-settings'],
    queryFn: async () => (await api.get('/api/v1/demos/settings')).data.data
  });

  const saveSettingsMutation = useMutation({
    mutationFn: (data: any) => api.post('/api/v1/demos/settings', data),
    onSuccess: () => {
      alert('Settings saved successfully!');
      queryClient.invalidateQueries({ queryKey: ['demo-settings'] });
    }
  });



  const cancelMutation = useMutation({
    mutationFn: (id: number) => api.post(`/api/v1/demos/${id}/cancel`),
    onSuccess: () => {
      alert('Demo cancelled successfully.');
      queryClient.invalidateQueries({ queryKey: ['demo-bookings'] });
    }
  });

  const [manageModalOpen, setManageModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const bookings = bookingsData || [];
  const filteredBookings = bookings.filter((b: any) => {
    if (statusFilter !== 'All' && b.Status !== statusFilter) return false;
    if (search) {
      const s = search.toLowerCase();
      return b.FullName?.toLowerCase().includes(s) || 
             b.Email?.toLowerCase().includes(s) || 
             b.Phone?.includes(s) ||
             b.Company?.toLowerCase().includes(s);
    }
    return true;
  });

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter((b: any) => b.Status === 'Confirmed' || b.Status === 'Upcoming').length,
    completed: bookings.filter((b: any) => b.Status === 'Completed').length,
    cancelled: bookings.filter((b: any) => b.Status === 'Cancelled').length,
  };

  const [localSettings, setLocalSettings] = useState<any>(null);

  // Sync settings when loaded
  if (settingsData && !localSettings && !loadingSettings) {
    setLocalSettings(settingsData);
  }

  const handleCancel = (id: number) => {
    cancelMutation.mutate(id);
    setManageModalOpen(false);
  };

  const openManageModal = (booking: any) => {
    setSelectedBooking(booking);
    setManageModalOpen(true);
  };

  const toggleDay = (day: string) => {
    if (!localSettings) return;
    const days = localSettings.AvailableDays || [];
    if (days.includes(day)) {
      setLocalSettings({ ...localSettings, AvailableDays: days.filter((d: string) => d !== day) });
    } else {
      setLocalSettings({ ...localSettings, AvailableDays: [...days, day] });
    }
  };

  const addHoliday = () => {
    if (!localSettings) return;
    setLocalSettings({
      ...localSettings,
      Holidays: [...(localSettings.Holidays || []), { Date: '', Description: '' }]
    });
  };

  const updateHoliday = (index: number, field: string, value: string) => {
    if (!localSettings) return;
    const newHolidays = [...localSettings.Holidays];
    newHolidays[index][field] = value;
    setLocalSettings({ ...localSettings, Holidays: newHolidays });
  };

  const removeHoliday = (index: number) => {
    if (!localSettings) return;
    const newHolidays = [...localSettings.Holidays];
    newHolidays.splice(index, 1);
    setLocalSettings({ ...localSettings, Holidays: newHolidays });
  };

  const handleSaveSettings = () => {
    if (localSettings) saveSettingsMutation.mutate(localSettings);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
          <span className="text-blue-600 cursor-pointer">≡</span> Demo Bookings
        </h2>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('bookings')} 
            className={`px-4 py-2 text-sm font-medium rounded-md flex items-center gap-2 ${activeTab === 'bookings' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <List className="w-4 h-4" /> Demo List
          </button>
          <button 
            onClick={() => setActiveTab('settings')} 
            className={`px-4 py-2 text-sm font-medium rounded-md flex items-center gap-2 ${activeTab === 'settings' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <Settings className="w-4 h-4" /> Calendar Settings
          </button>
        </div>
      </div>

      {activeTab === 'bookings' && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                <Video className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 leading-none">{stats.total}</div>
                <div className="text-xs text-slate-500 font-medium mt-1">Total Demo Bookings</div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 leading-none">{stats.confirmed}</div>
                <div className="text-xs text-slate-500 font-medium mt-1">Confirmed / Upcoming</div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 leading-none">{stats.completed}</div>
                <div className="text-xs text-slate-500 font-medium mt-1">Completed Calls</div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 leading-none">{stats.cancelled}</div>
                <div className="text-xs text-slate-500 font-medium mt-1">Cancelled</div>
              </div>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by name, email, phone, firm or practice size..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-slate-700 mr-2">Status:</span>
              <div className="flex rounded-md overflow-hidden border border-slate-300">
                <button 
                  onClick={() => setStatusFilter('All')} 
                  className={`px-3 py-1.5 font-medium border-r border-slate-300 ${statusFilter === 'All' ? 'bg-slate-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                >
                  All ({stats.total})
                </button>
                <button 
                  onClick={() => setStatusFilter('Confirmed')} 
                  className={`px-3 py-1.5 font-medium border-r border-slate-300 ${statusFilter === 'Confirmed' ? 'bg-blue-50 text-blue-600' : 'bg-white text-blue-600 hover:bg-slate-50'}`}
                >
                  Confirmed ({stats.confirmed})
                </button>
                <button 
                  onClick={() => setStatusFilter('Completed')} 
                  className={`px-3 py-1.5 font-medium border-r border-slate-300 ${statusFilter === 'Completed' ? 'bg-green-50 text-green-600' : 'bg-white text-green-600 hover:bg-slate-50'}`}
                >
                  Completed ({stats.completed})
                </button>
                <button 
                  onClick={() => setStatusFilter('Cancelled')} 
                  className={`px-3 py-1.5 font-medium ${statusFilter === 'Cancelled' ? 'bg-red-50 text-red-600' : 'bg-white text-red-600 hover:bg-slate-50'}`}
                >
                  Cancelled ({stats.cancelled})
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" /> Demo Bookings List
              </h3>
              <div className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-md font-medium border border-slate-200">
                Showing {filteredBookings.length} items
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-slate-50 border-b text-slate-600 font-medium">
                  <tr>
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Client & Firm</th>
                    <th className="py-3 px-4">Contact Info</th>
                    <th className="py-3 px-4">Practice Size</th>
                    <th className="py-3 px-4">Scheduled Time (IST)</th>
                    <th className="py-3 px-4">Meeting Link</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Admin Notes</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {loadingBookings ? (
                    <tr><td colSpan={9} className="py-8 text-center text-slate-500">Loading bookings...</td></tr>
                  ) : filteredBookings.length === 0 ? (
                    <tr><td colSpan={9} className="py-8 text-center text-slate-500">No bookings found.</td></tr>
                  ) : (
                    filteredBookings.map((b: any, i: number) => (
                      <tr key={b.BookingID} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 text-slate-500 text-xs">#{b.BookingID}</td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{b.FullName}</div>
                          {b.Company && <div className="text-slate-500 text-xs flex items-center gap-1 mt-1">🏢 {b.Company}</div>}
                        </td>
                        <td className="py-3 px-4">
                          <a href={`mailto:${b.Email}`} className="text-blue-600 text-xs flex items-center gap-1 hover:underline mb-1">
                            ✉ {b.Email}
                          </a>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-600 text-xs flex items-center gap-1">📞 {b.Phone}</span>
                            <a href={`https://wa.me/${b.Phone}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[10px] bg-green-50 text-green-600 border border-green-200 px-1.5 py-0.5 rounded font-medium">
                              <WhatsappIcon className="w-3 h-3" /> WhatsApp
                            </a>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2.5 py-1 rounded-md whitespace-nowrap">
                            {b.PracticeSize || 'Not specified'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1 text-slate-800 font-medium text-xs mb-1">
                            <Clock className="w-3.5 h-3.5 text-blue-500" />
                            {new Date(b.ScheduledStartUTC).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} – {new Date(b.ScheduledEndUTC).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          <div className="text-slate-500 text-xs ml-4">
                            {new Date(b.ScheduledStartUTC).toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-xs">
                          {b.MeetLink ? (
                            <a href={b.MeetLink} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Link</a>
                          ) : (
                            <span className="text-slate-400">No link</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                            b.Status === 'Confirmed' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                            b.Status === 'Completed' ? 'bg-green-50 text-green-600 border-green-200' :
                            'bg-red-50 text-red-600 border-red-200'
                          }`}>
                            {b.Status === 'Confirmed' ? <Clock className="w-3 h-3" /> : null}
                            {b.Status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-500 text-xs">
                          {b.AdminNotes ? (
                            <span className="truncate block w-48" title={b.AdminNotes}>{b.AdminNotes}</span>
                          ) : (
                            <span className="text-slate-400 italic">No notes</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button 
                            onClick={() => openManageModal(b)}
                            className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center justify-center gap-1.5 ml-auto shadow-sm transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5" /> Manage
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Demo Calendar Settings</h2>
            <p className="text-slate-500 text-sm">Configure which days of the week are available for demo bookings and set specific holiday dates when the office is closed.</p>
          </div>
          
          <div className="p-6 space-y-8">
            {/* Working Days */}
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-blue-600" /> Available Working Days
              </h3>
              <div className="flex flex-wrap gap-4">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => {
                  const isActive = localSettings?.AvailableDays?.includes(day);
                  return (
                    <label key={day} className="flex items-center gap-2 cursor-pointer select-none">
                      <div 
                        className={`w-10 h-5 rounded-full p-0.5 transition-colors ${isActive ? 'bg-blue-600' : 'bg-slate-200'}`}
                        onClick={() => toggleDay(day)}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform ${isActive ? 'translate-x-5' : 'translate-x-0'}`} />
                      </div>
                      <span className={`text-sm ${isActive ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>{day}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Holidays */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-red-500" /> Holidays
                </h3>
                <button 
                  onClick={addHoliday}
                  className="bg-white border border-blue-200 text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded flex items-center gap-1.5 text-sm font-semibold transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Holiday
                </button>
              </div>

              <table className="w-full text-sm text-left border-t border-slate-200 mt-2">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-900 font-bold">
                  <tr>
                    <th className="py-3 px-4 w-48">Date</th>
                    <th className="py-3 px-4">Description / Occasion</th>
                    <th className="py-3 px-4 text-right w-24">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {localSettings?.Holidays?.length === 0 ? (
                    <tr><td colSpan={3} className="py-6 text-center text-slate-500 bg-white">No holidays configured.</td></tr>
                  ) : (
                    localSettings?.Holidays?.map((holiday: any, i: number) => (
                      <tr key={i} className="bg-white">
                        <td className="py-3 px-4">
                          <input 
                            type="date" 
                            className="border border-slate-300 rounded px-3 py-1.5 w-full text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                            value={holiday.Date}
                            onChange={(e) => updateHoliday(i, 'Date', e.target.value)}
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input 
                            type="text" 
                            placeholder="e.g. Diwali, New Year"
                            className="border border-slate-300 rounded px-3 py-1.5 w-full text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                            value={holiday.Description}
                            onChange={(e) => updateHoliday(i, 'Description', e.target.value)}
                          />
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button 
                            onClick={() => removeHoliday(i)}
                            className="p-1.5 text-red-500 border border-red-200 rounded hover:bg-red-50 ml-auto block transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button 
                onClick={handleSaveSettings}
                className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-6 py-2.5 rounded text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {manageModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[500px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-5 flex justify-between items-start">
              <div>
                <h3 className="font-bold text-[#1e1b4b] text-[22px] tracking-tight leading-none mb-1.5">Manage Demo Booking</h3>
                <p className="text-slate-500 text-[13px]">Demo Booking #{selectedBooking.BookingID} — {selectedBooking.FullName}</p>
              </div>
              <button onClick={() => setManageModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors p-1">
                <XCircle className="w-6 h-6" strokeWidth={1.5} />
              </button>
            </div>
            
            <div className="px-6 pb-6">
              <div className="bg-[#f8fafc] border border-slate-200/80 rounded-xl p-5 mb-5 shadow-sm">
                <div className="grid grid-cols-2 gap-y-5 gap-x-4 mb-4">
                  <div>
                    <label className="block text-[13px] text-slate-500 mb-1 font-medium">Client Name:</label>
                    <div className="text-[14px] font-bold text-slate-900">{selectedBooking.FullName}</div>
                  </div>
                  <div>
                    <label className="block text-[13px] text-slate-500 mb-1 font-medium">Firm / Company:</label>
                    <div className="text-[14px] font-bold text-slate-900">{selectedBooking.Company || 'N/A'}</div>
                  </div>
                  <div>
                    <label className="block text-[13px] text-slate-500 mb-1 font-medium">Practice Size:</label>
                    <div className="text-[14px] font-bold text-[#2563eb]">{selectedBooking.PracticeSize || 'N/A'}</div>
                  </div>
                  <div>
                    <label className="block text-[13px] text-slate-500 mb-1 font-medium">Scheduled Slot (IST):</label>
                    <div className="text-[14px] font-bold text-slate-900">
                      {new Date(selectedBooking.ScheduledStartUTC).toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' })},{' '}
                      {new Date(selectedBooking.ScheduledStartUTC).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} – {new Date(selectedBooking.ScheduledEndUTC).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/80 flex items-center gap-5">
                  <a href={`mailto:${selectedBooking.Email}`} className="flex items-center gap-1.5 text-blue-600 font-semibold text-[13px] hover:underline">
                    ✉ {selectedBooking.Email}
                  </a>
                  <div className="flex items-center gap-1.5 text-slate-700 font-semibold text-[13px]">
                    📞 {selectedBooking.Phone}
                  </div>
                </div>
                <div className="mt-3">
                  <a href={`https://wa.me/${selectedBooking.Phone}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[13px] text-[#16a34a] border border-[#bbf7d0] bg-[#f0fdf4] px-2.5 py-1 rounded-md font-bold hover:bg-[#dcfce7] transition-colors">
                    <WhatsappIcon className="w-4 h-4" /> WhatsApp
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-[14px] font-bold text-slate-900 mb-2">
                    <span className="text-blue-500">⚑</span> Booking Status:
                  </label>
                  <select 
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-700 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/50 focus:border-[#7c3aed] bg-white transition-all shadow-sm"
                    defaultValue={selectedBooking.Status === 'Upcoming' ? 'Confirmed' : selectedBooking.Status}
                    id="modal-status"
                  >
                    <option value="Confirmed">Confirmed / Upcoming</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-[14px] font-bold text-slate-900 mb-2">
                    <span className="text-blue-500">📄</span> Call Notes / Next Follow-up:
                  </label>
                  <textarea 
                    id="modal-notes"
                    rows={3} 
                    className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-slate-700 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/50 focus:border-[#7c3aed] resize-none shadow-sm transition-all"
                    placeholder="e.g. Conducted live walkthrough of GST filing tool. Client interested in Multi-user license. Follow up on Friday..."
                    defaultValue={selectedBooking.AdminNotes || ''}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 flex justify-end gap-3">
              <button 
                onClick={() => setManageModalOpen(false)}
                className="px-6 py-2.5 rounded-lg text-[14px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={async () => {
                  const status = (document.getElementById('modal-status') as HTMLSelectElement).value;
                  const notes = (document.getElementById('modal-notes') as HTMLTextAreaElement).value;
                  
                  try {
                    await api.post(`/api/v1/demos/${selectedBooking.BookingID}/update`, { status, notes });
                    setManageModalOpen(false);
                    queryClient.invalidateQueries({ queryKey: ['demo-bookings'] });
                  } catch (e) {
                    alert('Failed to update booking');
                  }
                }}
                className="px-6 py-2.5 rounded-lg text-[14px] font-bold text-white bg-[#8b5cf6] hover:bg-[#7c3aed] flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <CheckCircle2 className="w-4 h-4" /> Save Status & Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
