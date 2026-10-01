'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { 
  Search, FileSpreadsheet, Plus, FileText, Landmark, 
  Clock, Eye, Edit2, Ban, CheckCircle, Star, Calendar, 
  X, Filter
} from 'lucide-react';
import * as XLSX from 'xlsx';
import Link from 'next/link';
import UserActionModal from '@/components/users/UserActionModal';

export default function UsersPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [plan, setPlan] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [grantedBy, setGrantedBy] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [pdfScan, setPdfScan] = useState('');
  
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionModalType, setActionModalType] = useState<'grant' | 'extend'>('grant');
  const [actionModalUserId, setActionModalUserId] = useState<number>(0);

  const { data, isLoading } = useQuery({
    queryKey: ['users', page, pageSize, searchQuery, status, plan, paymentType, grantedBy, fromDate, toDate, pdfScan],
    queryFn: async () => {
      const res = await api.get('/api/v1/users', {
        params: { page, pageSize, search: searchQuery, status, plan, paymentType, grantedBy, fromDate, toDate, pdfScan }
      });
      return res.data;
    }
  });

  const handleExport = async () => {
    try {
      const res = await api.get('/api/v1/users/export/excel', { 
        params: { search: searchQuery, status, plan, paymentType, grantedBy, fromDate, toDate, pdfScan } 
      });
      const exportData = res.data.data;
      if (!exportData || exportData.length === 0) return alert('No data to export');

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
      XLSX.writeFile(workbook, `StudyCafe_Users_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
    } catch (e) {
      alert('Export failed');
    }
  };

  const toggleStatusMutation = useMutation({
    mutationFn: (id: number) => api.patch(`/api/v1/users/${id}/toggle-status`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] })
  });

  const avatarPalette = ["#c15c3d","#22c55e","#f59e0b","#06b6d4","#ec4899","#d97757","#ef4444","#14b8a6","#f97316","#0ea5e9"];

  const getPaginationNumbers = (currentPage: number, totalPages: number) => {
    const current = Number(currentPage);
    const total = Number(totalPages);
    if (total <= 11) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 7) return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '...', total];
    if (current >= total - 4) return [1, '...', total - 8, total - 7, total - 6, total - 5, total - 4, total - 3, total - 2, total - 1, total];
    return [1, '...', current - 3, current - 2, current - 1, current, current + 1, current + 2, current + 3, '...', total];
  };  return (
    <div className="space-y-4 font-sans max-w-[1400px] mx-auto">
      {/* TOOLBAR */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col gap-4">
        {/* Top Row: Search and Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-grow max-w-lg">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search name, email or mobile..." 
                className="w-full pl-9 pr-8 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-slate-50"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && setSearchQuery(search)}
                onBlur={() => setSearchQuery(search)}
              />
              {search && (
                <button onClick={() => { setSearch(''); setSearchQuery(''); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button onClick={() => setSearchQuery(search)} className="p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
              <Search className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200 shadow-sm font-medium text-sm">
              <FileSpreadsheet className="w-4 h-4" /> Export
            </button>
            <Link href="/superadmin/users/form" className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-sm text-sm font-medium">
              <Plus className="w-4 h-4" /> Add User
            </Link>
          </div>
        </div>

        {/* Bottom Row: Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-500 font-semibold mr-1">
            <Filter className="w-4 h-4" /> Filters:
          </div>
          <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-700 outline-none focus:border-blue-500 min-w-[120px] transition-colors hover:bg-slate-100 cursor-pointer" value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="banned">Banned</option>
          </select>

          <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-700 outline-none focus:border-blue-500 min-w-[120px] transition-colors hover:bg-slate-100 cursor-pointer" value={plan} onChange={(e) => { setPlan(e.target.value); setPage(1); }}>
            <option value="">All Plans</option>
            <option value="trial">Trial (Active)</option>
            <option value="premium">Membership</option>
            <option value="expired">Expired</option>
          </select>
          
          <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-700 outline-none focus:border-blue-500 min-w-[140px] transition-colors hover:bg-slate-100 cursor-pointer" value={grantedBy} onChange={(e) => { setGrantedBy(e.target.value); setPage(1); }}>
            <option value="">Granted By (All)</option>
          </select>

          <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-700 outline-none focus:border-blue-500 min-w-[140px] transition-colors hover:bg-slate-100 cursor-pointer" value={pdfScan} onChange={(e) => { setPdfScan(e.target.value); setPage(1); }}>
            <option value="">PDF Scan Usage</option>
            <option value="high">Highest Scanned</option>
            <option value="low">Lowest Scanned</option>
            <option value="over50">Used &gt; 50%</option>
            <option value="under50">Used &lt; 50%</option>
            <option value="reached">Reached Limit</option>
            <option value="zero">Zero Scans</option>
          </select>

          <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 text-sm overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
            <div className="px-3 py-2 bg-slate-100 border-r border-slate-200 flex items-center justify-center text-slate-500">
              <Calendar className="w-4 h-4" />
            </div>
            <input type="date" className="outline-none text-slate-600 bg-transparent px-2 py-2 cursor-pointer" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            <span className="text-slate-300 px-1">-</span>
            <input type="date" className="outline-none text-slate-600 bg-transparent px-2 py-2 cursor-pointer" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </div>
          
          {(status || plan || grantedBy || pdfScan || fromDate || toDate) && (
            <button 
              onClick={() => { setStatus(''); setPlan(''); setGrantedBy(''); setPdfScan(''); setFromDate(''); setToDate(''); setPage(1); }}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold underline px-2 py-2"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        {/* Table */}
        <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-slate-50 border-b text-slate-600 font-medium">
                <tr>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">PDF Scans</th>
                  <th className="py-3 px-4">Plan</th>
                  <th className="py-3 px-4">Expiry Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {isLoading ? (
                <tr><td colSpan={6} className="py-12 text-center text-slate-500">Loading users...</td></tr>
              ) : data?.data?.length === 0 ? (
                <tr><td colSpan={6} className="py-12 text-center text-slate-500">No users found.</td></tr>
              ) : (
                data?.data.map((user: any) => {
                  const initial = (user.FullName || user.Username || '?').charAt(0).toUpperCase();
                  const avatarColor = avatarPalette[initial.charCodeAt(0) % avatarPalette.length];
                  
                  return (
                    <tr key={user.UserID} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm" style={{ backgroundColor: avatarColor }}>
                            {initial}
                          </div>
                          <div className="flex flex-col">
                            <Link href={`/superadmin/users/${user.UserID}`} className="font-semibold text-slate-800 hover:text-blue-600 transition-colors">
                              {user.FullName || user.Username}
                            </Link>
                            <div className="text-xs text-slate-400 mt-0.5">
                              #{user.UserID} &nbsp;&middot;&nbsp; @{user.Email ? user.Email.split('@')[0] : user.Username.toLowerCase()}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex flex-col gap-0.5">
                          {user.Email ? <div className="text-slate-600">{user.Email}</div> : null}
                          {user.Mobile ? <div className="text-slate-500 text-xs">{user.Mobile}</div> : null}
                          {!user.Email && !user.Mobile && <span className="text-slate-300">—</span>}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex flex-col gap-1.5 font-medium text-xs">
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <FileText className="w-3.5 h-3.5 text-red-500" />
                            {user.PDFScanned || 0} / {user.PDFScannedLimit || 3000}
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <Landmark className="w-3.5 h-3.5 text-blue-600" />
                            {user.BankPDFScanned || 0} / {user.BankPDFScannedLimit || 3000}
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex flex-col gap-1 items-start">
                          {user.IsPremium ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200">
                              <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> All Tools
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
                              <Clock className="w-3 h-3 text-blue-500" /> Trial
                            </span>
                          )}
                          
                          {/* Subtext like "7d left" or "by chanchal" */}
                          {user.IsPremium && user.GrantorName ? (
                            <span className="text-[10px] text-slate-400 font-medium">by {user.GrantorName.toLowerCase()}</span>
                          ) : user.DaysRemaining !== null ? (
                            <span className="text-[10px] text-slate-400 font-medium">{user.DaysRemaining > 0 ? `${user.DaysRemaining}d left` : 'Expires today'}</span>
                          ) : null}
                        </div>
                      </td>

                      <td className="py-3 px-4 text-slate-600 font-medium text-sm">
                        {user.TrialExpiryDate ? new Date(user.TrialExpiryDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/superadmin/users/${user.UserID}`} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors border border-transparent hover:border-slate-200 shadow-sm" title="View">
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link href={`/superadmin/users/form?id=${user.UserID}`} className="p-1.5 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors border border-transparent hover:border-blue-100 shadow-sm" title="Edit">
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button 
                            onClick={() => toggleStatusMutation.mutate(user.UserID)}
                            className={`p-1.5 rounded-md transition-colors border border-transparent shadow-sm \${user.IsActive ? 'text-red-400 hover:text-red-600 hover:bg-red-50 hover:border-red-100' : 'text-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 hover:border-emerald-100'}`} 
                            title={user.IsActive ? "Ban" : "Unban"}
                          >
                            {user.IsActive ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                          </button>
                          <button 
                            onClick={() => {
                              setActionModalType('extend');
                              setActionModalUserId(user.UserID);
                              setIsActionModalOpen(true);
                            }}
                            className="p-1.5 text-purple-400 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors border border-transparent hover:border-purple-100 shadow-sm" title="Extend Trial">
                            <Clock className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => {
                              setActionModalType('grant');
                              setActionModalUserId(user.UserID);
                              setIsActionModalOpen(true);
                            }}
                            className="p-1.5 text-amber-400 hover:text-amber-500 hover:bg-amber-50 rounded-md transition-colors border border-transparent hover:border-amber-100 shadow-sm" title={user.IsPremium ? "Remove Premium" : "Make Premium"}>
                            <Star className={`w-4 h-4 ${user.IsPremium ? 'fill-amber-400' : ''}`} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {data?.pagination && (
          <div className="border-t px-6 py-4 bg-slate-50 flex items-center justify-between text-sm text-slate-500">
            <div>
              Showing <span className="font-medium text-slate-700">{(page - 1) * pageSize + 1}</span> to <span className="font-medium text-slate-700">{Math.min(page * pageSize, data.pagination.total)}</span> of <span className="font-medium text-slate-700">{data.pagination.total}</span> users
            </div>
            
            {data.pagination.totalPages > 1 && (
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))} 
                  disabled={page === 1} 
                  className="px-3 py-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 text-slate-700 font-medium transition-colors disabled:cursor-not-allowed"
                >
                  Prev
                </button>
                
                <div className="flex items-center gap-1 mx-2">
                  {getPaginationNumbers(page, data.pagination.totalPages).map((pageNum, idx) => (
                    pageNum === '...' ? (
                      <span key={`ellipsis-${idx}`} className="px-2 text-slate-400">...</span>
                    ) : (
                      <button
                        key={`page-${pageNum}`}
                        onClick={() => setPage(pageNum as number)}
                        className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
                          page === pageNum 
                            ? 'bg-blue-600 text-white border border-blue-600' 
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  ))}
                </div>

                <button 
                  onClick={() => setPage(p => Math.min(data.pagination.totalPages, p + 1))} 
                  disabled={page >= data.pagination.totalPages} 
                  className="px-3 py-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 text-slate-700 font-medium transition-colors disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {isActionModalOpen && actionModalUserId > 0 && (
        <UserActionModal 
          isOpen={isActionModalOpen}
          onClose={() => setIsActionModalOpen(false)}
          userId={actionModalUserId}
          actionType={actionModalType}
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
          }}
        />
      )}
    </div>
  );
}
