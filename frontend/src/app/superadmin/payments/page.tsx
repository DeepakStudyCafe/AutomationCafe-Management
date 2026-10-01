'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Search, CreditCard, Activity, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function PaymentLogsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['payment-logs', page, pageSize, searchQuery, status],
    queryFn: async () => {
      const res = await api.get('/api/v1/payments/logs', {
        params: { page, pageSize, search: searchQuery, status }
      });
      return res.data;
    }
  });

  const renderPagination = () => {
    if (!data?.pagination) return null;
    const { page, totalPages } = data.pagination;
    const pages = [];
    
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - 2 && i <= page + 2)) {
        pages.push(i);
      } else if (i === page - 3 || i === page + 3) {
        pages.push('...');
      }
    }

    return (
      <div className="flex items-center gap-1">
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 border rounded hover:bg-slate-50 disabled:opacity-50 text-sm">Previous</button>
        {pages.map((p, idx) => (
          <button key={idx} disabled={p === '...'} onClick={() => typeof p === 'number' && setPage(p)}
            className={`px-3 py-1 border rounded text-sm ${p === page ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-slate-50 text-slate-700'} ${p === '...' ? 'border-transparent bg-transparent cursor-default' : ''}`}>
            {p}
          </button>
        ))}
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages} className="px-3 py-1 border rounded hover:bg-slate-50 disabled:opacity-50 text-sm">Next</button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Payment Logs</h2>
          <p className="text-sm text-slate-500">Monitor all Razorpay transactions across the platform.</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl border shadow-sm">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by User, Email, Order ID, Payment ID..."
            className="w-full pl-9 pr-4 py-2 rounded-md border text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setSearchQuery(search)}
            onBlur={() => setSearchQuery(search)}
          />
        </div>
        <select 
          className="border rounded-md px-3 py-2 text-sm outline-none focus:border-blue-500"
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
        >
          <option value="">All Statuses</option>
          <option value="Success">Success</option>
          <option value="Failed">Failed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b text-slate-600 font-medium">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Transaction Details</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {isLoading ? (
                <tr><td colSpan={5} className="py-8 text-center text-slate-500">Loading payment logs...</td></tr>
              ) : data?.data?.length === 0 ? (
                <tr><td colSpan={5} className="py-8 text-center text-slate-500">No payment logs found.</td></tr>
              ) : (
                data?.data.map((log: any) => (
                  <tr key={log.LogID} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4">
                      {log.UserID ? (
                        <>
                          <Link href={`/superadmin/users/${log.UserID}`} className="font-medium text-blue-600 hover:underline">{log.FullName || 'Unknown'}</Link>
                          <div className="text-slate-500 text-xs">{log.Email || log.Mobile || ''}</div>
                        </>
                      ) : (
                        <span className="text-slate-500">System / Unknown</span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs">
                      <div className="text-slate-800">Order: {log.OrderID || '-'}</div>
                      <div className="text-slate-500">Payment: {log.PaymentID || '-'}</div>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-900">
                      ₹{log.Amount?.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      {log.PaymentStatus === 'Success' ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-xs font-medium">
                          <CheckCircle className="w-3.5 h-3.5" /> Success
                        </span>
                      ) : log.PaymentStatus === 'Failed' ? (
                        <span className="inline-flex items-center gap-1 text-red-700 bg-red-100 px-2 py-0.5 rounded text-xs font-medium">
                          <XCircle className="w-3.5 h-3.5" /> Failed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-100 px-2 py-0.5 rounded text-xs font-medium">
                          <Activity className="w-3.5 h-3.5" /> {log.PaymentStatus}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-600 text-xs">
                      {new Date(log.CreatedAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {data?.pagination && data.pagination.totalPages > 1 && (
          <div className="border-t px-6 py-4 flex items-center justify-between text-sm text-slate-600">
            <div>
              Showing <span className="font-medium">{(page - 1) * pageSize + 1}</span> to <span className="font-medium">{Math.min(page * pageSize, data.pagination.total)}</span> of <span className="font-medium">{data.pagination.total}</span> records
            </div>
            {renderPagination()}
          </div>
        )}
      </div>
    </div>
  );
}
