'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import api from '@/lib/api';
import { 
  Search, RefreshCw, Filter, FileText, Download, User, Monitor, CreditCard, ShieldCheck, X
} from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function AllPaymentLogs() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [gatewayFilter, setGatewayFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  
  const [selectedLog, setSelectedLog] = useState<any>(null);

  // Main data query
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['allPaymentLogs', page, pageSize, searchQuery, gatewayFilter, statusFilter, fromDate, toDate],
    queryFn: async () => {
      const res = await api.get('/api/v1/all-payments', {
        params: { page, limit: pageSize, search: searchQuery, gateway: gatewayFilter, status: statusFilter, fromDate, toDate }
      });
      return res.data;
    },
    refetchInterval: false,
  });

  const syncMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post('/api/v1/all-payments/sync');
      return res.data;
    },
    onSuccess: () => {
      toast.success('Successfully synchronized payments from all gateways.');
      refetch();
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to sync payments.');
    }
  });

  const logs = data?.data || [];
  const pagination = data?.pagination;

  const handleReset = () => {
    setSearch('');
    setSearchQuery('');
    setGatewayFilter('ALL');
    setStatusFilter('ALL');
    setFromDate('');
    setToDate('');
    setPage(1);
  };

  const exportCSV = async () => {
    try {
      const qs = new URLSearchParams();
      if (searchQuery) qs.append('search', searchQuery);
      if (gatewayFilter && gatewayFilter !== 'ALL') qs.append('gateway', gatewayFilter);
      if (statusFilter && statusFilter !== 'ALL') qs.append('status', statusFilter);
      if (fromDate) qs.append('fromDate', fromDate);
      if (toDate) qs.append('toDate', toDate);

      const res = await api.get(`/api/v1/all-payments/export?${qs.toString()}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `AllGatewayPayments_${format(new Date(), 'yyyyMMdd_HHmmss')}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      toast.error('Export failed');
      console.error('Export failed', e);
    }
  };

  const StatusBadge = ({ status }: { status: string }) => {
    let color = 'bg-slate-100 text-slate-700';
    const s = status?.toLowerCase() || '';
    if (s === 'captured' || s === 'success' || s === 'authorized') color = 'bg-green-100 text-green-700 border border-green-200';
    if (s === 'failed' || s === 'error') color = 'bg-red-100 text-red-700 border border-red-200';
    if (s === 'created') color = 'bg-purple-100 text-purple-700 border border-purple-200';
    if (s === 'refunded') color = 'bg-orange-100 text-orange-700 border border-orange-200';
    
    return <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase ${color}`}>{status}</span>;
  };

  const getPaginationNumbers = (currentPage: number, totalPages: number) => {
    const current = Number(currentPage);
    const total = Number(totalPages);

    if (total <= 11) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current <= 6) {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '...', total];
    }

    if (current >= total - 5) {
      return [1, '...', total - 9, total - 8, total - 7, total - 6, total - 5, total - 4, total - 3, total - 2, total - 1, total];
    }

    return [
      1, 
      '...', 
      current - 4, current - 3, current - 2, current - 1, 
      current, 
      current + 1, current + 2, current + 3, current + 4, 
      '...', 
      total
    ];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            All Payments Logs (Multi-Gateway)
          </h2>
          <p className="text-slate-500 text-sm mt-1">Unified view of payments across BannerBuddy, AutomationCafe, StudyCafe, CodeCamp, and LearnLoop.</p>
        </div>
        <div>
          <button 
            onClick={() => syncMutation.mutate()}
            disabled={syncMutation.isPending}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${syncMutation.isPending ? 'animate-spin' : ''}`} /> 
            {syncMutation.isPending ? 'Syncing Data...' : 'Sync Latest Data'}
          </button>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col xl:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full min-w-[250px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Email, Phone, Order ID, Payment ID..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { setSearchQuery(search); setPage(1); } }}
          />
        </div>
        
        <div className="flex flex-wrap md:flex-nowrap items-center gap-3 w-full xl:w-auto">

          <div className="flex items-center gap-2 border border-slate-200 rounded-lg bg-white overflow-hidden w-full md:w-auto">
            <select 
              value={gatewayFilter}
              onChange={(e) => { setGatewayFilter(e.target.value); setPage(1); }}
              className="outline-none text-sm px-3 py-2 text-slate-700 bg-white min-w-[140px] cursor-pointer"
            >
              <option value="ALL">All Gateways</option>
              <option value="BannerBuddy">BannerBuddy</option>
              <option value="AutomationCafe">AutomationCafe</option>
              <option value="StudyCafe">StudyCafe</option>
              <option value="CodeCamp">CodeCamp</option>
              <option value="LearnLoop">LearnLoop</option>
            </select>
          </div>

          <div className="flex items-center gap-2 border border-slate-200 rounded-lg bg-white overflow-hidden w-full md:w-auto">
            <select 
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="outline-none text-sm px-3 py-2 text-slate-700 bg-white min-w-[140px] cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="captured">Captured / Success</option>
              <option value="authorized">Authorized</option>
              <option value="created">Created</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>

          <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-1.5 bg-white w-full md:w-auto">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">From</span>
            <input 
              type="date" 
              className="outline-none text-slate-600 bg-transparent text-sm min-w-[110px]" 
              value={fromDate} 
              onChange={(e) => { setFromDate(e.target.value); setPage(1); }} 
            />
            <span className="text-slate-200">|</span>
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">To</span>
            <input 
              type="date" 
              className="outline-none text-slate-600 bg-transparent text-sm min-w-[110px]" 
              value={toDate} 
              onChange={(e) => { setToDate(e.target.value); setPage(1); }} 
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button 
              onClick={() => { setSearchQuery(search); setPage(1); }}
              className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" /> Filter
            </button>
            <button 
              onClick={handleReset}
              className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-lg text-sm font-medium transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        {/* Table Header Controls */}
        <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Consolidated Gateway Logs
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={exportCSV} 
              className="px-3 py-1.5 bg-white border border-green-200 text-green-700 hover:bg-green-50 rounded flex items-center gap-1.5 text-xs font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Export Excel/CSV
            </button>
            <button 
              onClick={() => refetch()}
              className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded flex items-center gap-1.5 text-xs font-semibold transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} /> Refresh
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-slate-50 border-b text-slate-600 font-bold text-xs uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 w-20">PROJECT / GATEWAY</th>
                <th className="py-3 px-4">PAYMENT ID</th>
                <th className="py-3 px-4">AMOUNT</th>
                <th className="py-3 px-4">CUSTOMER</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4">DATE & TIME</th>
                <th className="py-3 px-4 text-right w-20">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan={7} className="py-8 text-center text-slate-500">Loading logs...</td></tr>
              ) : logs.length === 0 ? (
                <tr><td colSpan={7} className="py-8 text-center text-slate-500">No logs found. Try syncing or change filters.</td></tr>
              ) : (
                logs.map((log: any) => (
                  <tr key={log.Id} className="hover:bg-slate-50/50 transition-colors bg-white">
                    <td className="py-3 px-4">
                      <div className="text-sm font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 inline-block">{log.Gateway}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm font-mono text-slate-800">{log.PaymentId}</div>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">{log.OrderId || 'No Order ID'}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-800 text-sm">{log.Currency} {log.Amount ? log.Amount.toLocaleString() : '0'}</div>
                      <div className="text-[11px] text-slate-500 uppercase mt-0.5 tracking-wider">{log.Method || 'N/A'}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-700 text-sm">{log.CustomerEmail || 'N/A'}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{log.CustomerContact || 'N/A'}</div>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={log.Status || 'UNKNOWN'} />
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-600">
                      {format(new Date(log.PaymentDate), 'MMM dd, yyyy')}
                      <div className="text-slate-400 mt-0.5">{format(new Date(log.PaymentDate), 'HH:mm:ss a')}</div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button 
                        onClick={() => setSelectedLog(log)}
                        className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors"
                      >
                        View Raw
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {pagination && (
          <div className="border-t px-6 py-4 bg-slate-50 flex items-center justify-between text-sm text-slate-500">
            <div>
              Showing <span className="font-medium text-slate-700">{(page - 1) * pageSize + (pagination.totalRecords > 0 ? 1 : 0)}</span> to <span className="font-medium text-slate-700">{Math.min(page * pageSize, pagination.totalRecords)}</span> of <span className="font-medium text-slate-700">{pagination.totalRecords}</span> logs
            </div>
            
            {pagination.totalPages > 1 && (
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))} 
                  disabled={page === 1} 
                  className="px-3 py-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 text-slate-700 font-medium transition-colors disabled:cursor-not-allowed"
                >
                  Prev
                </button>
                
                <div className="flex items-center gap-1 mx-2">
                  {getPaginationNumbers(page, pagination.totalPages).map((pageNum, idx) => (
                    pageNum === '...' ? (
                      <span key={`ellipsis-${idx}`} className="px-2 text-slate-400">...</span>
                    ) : (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum as number)}
                        className={`min-w-[32px] h-8 rounded-md flex items-center justify-center text-sm font-medium transition-colors ${
                          page === pageNum 
                            ? 'bg-blue-600 text-white shadow-sm border border-blue-600' 
                            : 'bg-transparent text-slate-600 hover:bg-slate-100 border border-transparent'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  ))}
                </div>

                <button 
                  onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))} 
                  disabled={page >= pagination.totalPages} 
                  className="px-3 py-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 text-slate-700 font-medium transition-colors disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* View Log Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-slate-50 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-700 bg-slate-800 flex justify-between items-center text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight">Raw Payment JSON</h3>
                  <p className="text-sm text-slate-400 font-medium">Gateway: {selectedLog.Gateway} &middot; ID: {selectedLog.PaymentId}</p>
                </div>
              </div>
              <button onClick={() => setSelectedLog(null)} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto bg-slate-900 text-green-400 font-mono text-sm">
              <pre>{JSON.stringify(JSON.parse(selectedLog.RawData || '{}'), null, 2)}</pre>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-200 bg-white flex justify-end items-center rounded-b-xl shrink-0">
              <button 
                onClick={() => setSelectedLog(null)}
                className="px-6 py-2 bg-slate-600 text-white rounded-md text-sm font-medium hover:bg-slate-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
