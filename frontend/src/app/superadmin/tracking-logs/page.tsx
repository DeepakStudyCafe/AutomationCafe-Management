'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { 
  Search, Grid, Receipt, Calculator, Mail, FileText, BookOpen, 
  ListOrdered, PlayCircle, Download, Clock, Pause, Play, RefreshCw, Radio
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default function TrackingLogsExplorer() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [moduleName, setModuleName] = useState('All');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  
  const [isLive, setIsLive] = useState(true);
  const [pollInterval, setPollInterval] = useState(5000);
  const [newLogsCount, setNewLogsCount] = useState(0);

  // Main data query
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['trackingLogs', page, pageSize, searchQuery, moduleName, fromDate, toDate],
    queryFn: async () => {
      const res = await api.get('/api/v1/tracking', {
        params: { page, pageSize, search: searchQuery, moduleName, fromDate, toDate }
      });
      return res.data;
    },
    refetchInterval: isLive && page === 1 ? pollInterval : false,
    refetchIntervalInBackground: true
  });

  const logs = data?.data || [];
  const pagination = data?.pagination;

  // Poll for new logs if not on page 1
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLive && page > 1 && logs.length > 0) {
      const latestLogId = logs[0].LogID;
      interval = setInterval(async () => {
        try {
          const res = await api.get('/api/v1/tracking/recent', {
            params: { afterLogId: latestLogId, search: searchQuery, moduleName, fromDate, toDate }
          });
          if (res.data?.success && res.data.data.length > 0) {
            setNewLogsCount(prev => prev + res.data.data.length);
          }
        } catch (e) {}
      }, pollInterval);
    }
    return () => clearInterval(interval);
  }, [isLive, page, logs, searchQuery, moduleName, fromDate, toDate, pollInterval]);

  const handleReset = () => {
    setSearch('');
    setSearchQuery('');
    setModuleName('All');
    setFromDate('');
    setToDate('');
    setPage(1);
  };

  const exportCSV = async () => {
    try {
      const qs = new URLSearchParams();
      if (searchQuery) qs.append('search', searchQuery);
      if (moduleName && moduleName !== 'All') qs.append('moduleName', moduleName);
      if (fromDate) qs.append('fromDate', fromDate);
      if (toDate) qs.append('toDate', toDate);

      const res = await api.get(`/api/v1/tracking/export?${qs.toString()}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `TrackingLogs_${format(new Date(), 'yyyyMMdd_HHmmss')}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error('Export failed', e);
    }
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds || seconds <= 0) return '-';
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const rem = seconds % 60;
    return rem > 0 ? `${mins}m ${rem}s` : `${mins}m`;
  };

  const ActionBadge = ({ action }: { action: string }) => {
    let color = 'bg-slate-100 text-slate-700';
    if (action.includes('EXECUTE') || action === 'VIEW') color = 'bg-green-100 text-green-700 border border-green-200';
    if (action.includes('FAIL') || action.includes('ERROR')) color = 'bg-red-100 text-red-700 border border-red-200';
    if (action.includes('START') || action.includes('PROCESS')) color = 'bg-blue-100 text-blue-700 border border-blue-200';
    return <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase ${color}`}>{action}</span>;
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
            Tracking Logs Explorer
          </h2>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {[
          { name: 'All', label: 'All Categories', icon: Grid },
          { name: 'GST Suite', label: 'GST Suite', icon: Receipt },
          { name: 'IT Suite', label: 'IT Suite', icon: Calculator },
          { name: 'Email Suite', label: 'Email Suite', icon: Mail },
          { name: 'PDF Suite', label: 'PDF Suite', icon: FileText },
          { name: 'Tally Suite', label: 'Tally Suite', icon: BookOpen },
        ].map(cat => (
          <button
            key={cat.name}
            onClick={() => { setModuleName(cat.name); setPage(1); setNewLogsCount(0); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
              moduleName === cat.name || (moduleName === 'All' && cat.name === 'All')
                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <cat.icon className="w-4 h-4" />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col xl:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full min-w-[250px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by User Email, Device ID, or Tool Name..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { setSearchQuery(search); setPage(1); } }}
          />
        </div>
        
        <div className="flex flex-wrap md:flex-nowrap items-center gap-3 w-full xl:w-auto">


          <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-1.5 bg-white w-full md:w-auto">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">From</span>
            <input 
              type="date" 
              className="outline-none text-slate-600 bg-transparent text-sm min-w-[110px]" 
              value={fromDate} 
              onChange={(e) => { setFromDate(e.target.value); setPage(1); setNewLogsCount(0); }} 
            />
            <span className="text-slate-200">|</span>
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">To</span>
            <input 
              type="date" 
              className="outline-none text-slate-600 bg-transparent text-sm min-w-[110px]" 
              value={toDate} 
              onChange={(e) => { setToDate(e.target.value); setPage(1); setNewLogsCount(0); }} 
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button 
              onClick={() => { setSearchQuery(search); setPage(1); }}
              className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <ListOrdered className="w-4 h-4" /> Filter
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

      {/* Page Offset Notice */}
      {newLogsCount > 0 && page > 1 && (
        <div className="bg-cyan-50 border border-cyan-200 text-cyan-800 px-4 py-3 rounded-lg flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 text-sm">
            <Radio className="w-4 h-4 text-cyan-600 animate-pulse" />
            <span><strong className="font-semibold">New logs received in real-time!</strong> You are currently viewing Page {page}.</span>
          </div>
          <button 
            onClick={() => { setPage(1); setNewLogsCount(0); refetch(); }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <PlayCircle className="w-3.5 h-3.5" /> View Latest (Page 1)
          </button>
        </div>
      )}

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        {/* Table Header Controls */}
        <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <ListOrdered className="w-5 h-5 text-blue-600" />
              Telemetry Usage Logs
            </h3>
            
            <span className={`px-2 py-1 rounded text-xs font-bold flex items-center gap-1.5 border ${isLive ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
              <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`}></span>
              {isLive ? 'Live Active' : 'Paused'}
            </span>

            {(newLogsCount > 0 && page === 1) && (
              <span className="px-2 py-1 bg-blue-600 text-white rounded text-xs font-bold flex items-center gap-1">
                +{newLogsCount} new
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button onClick={exportCSV} className="px-3 py-1.5 bg-white border border-green-200 text-green-700 hover:bg-green-50 rounded flex items-center gap-1.5 text-xs font-semibold transition-colors">
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
            
            <div className="flex items-center border border-slate-200 bg-white rounded overflow-hidden h-[30px]">
              <span className="px-2 text-slate-500 text-xs font-medium border-r border-slate-200 bg-slate-50 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Rate
              </span>
              <select 
                value={pollInterval} 
                onChange={e => setPollInterval(Number(e.target.value))}
                className="pl-2 pr-6 py-1 text-xs font-medium bg-white text-slate-700 outline-none"
              >
                <option value={3000}>3s</option>
                <option value={5000}>5s</option>
                <option value={10000}>10s</option>
                <option value={30000}>30s</option>
              </select>
            </div>

            <button 
              onClick={() => setIsLive(!isLive)}
              className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded flex items-center gap-1.5 text-xs font-semibold transition-colors"
            >
              {isLive ? <><Pause className="w-3.5 h-3.5" /> Pause</> : <><Play className="w-3.5 h-3.5" /> Resume</>}
            </button>

            <button 
              onClick={() => refetch()}
              className="px-2 py-1.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded transition-colors"
              title="Refresh Now"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            <span className="px-2.5 py-1 bg-slate-600 text-white text-xs font-semibold rounded ml-1">
              Total: {pagination?.total?.toLocaleString() || 0}
            </span>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-slate-50 border-b text-slate-600 font-bold text-xs uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">LOG ID</th>
                <th className="py-3 px-4">USER EMAIL (CLICK FOR ANALYTICS)</th>
                <th className="py-3 px-4">CLIENT DEVICE ID</th>
                <th className="py-3 px-4">SUITE / MODULE</th>
                <th className="py-3 px-4">TOOL NAME</th>
                <th className="py-3 px-4">ACTION</th>
                <th className="py-3 px-4">TIME (UTC)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan={7} className="py-8 text-center text-slate-500">Loading logs...</td></tr>
              ) : logs.length === 0 ? (
                <tr><td colSpan={7} className="py-8 text-center text-slate-500">No logs found.</td></tr>
              ) : (
                logs.map((log: any) => (
                  <tr key={log.LogID} className="hover:bg-slate-50/50 transition-colors bg-white">
                    <td className="py-3 px-4 text-xs font-medium text-slate-600">#{log.LogID}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        {log.UserEmail || 'Anonymous'}
                        <span className="text-blue-500 cursor-pointer" title="Verified User">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" /></svg>
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">User ID: #{log.UserID}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-mono tracking-widest border border-slate-200">
                        {log.ClientDeviceId || 'Unknown'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-semibold">
                        {log.ModuleName || 'General'}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-800 text-xs">
                      {log.ToolName}
                    </td>
                    <td className="py-3 px-4">
                      <ActionBadge action={log.ToolAction} />
                    </td>
                    <td className="py-3 px-4 text-slate-600 text-xs font-medium">
                      {format(new Date(log.EnteredAt), 'yyyy-MM-dd HH:mm:ss')}
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
              Showing <span className="font-medium text-slate-700">{(page - 1) * pageSize + 1}</span> to <span className="font-medium text-slate-700">{Math.min(page * pageSize, pagination.total)}</span> of <span className="font-medium text-slate-700">{pagination.total}</span> logs
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
    </div>
  );
}
