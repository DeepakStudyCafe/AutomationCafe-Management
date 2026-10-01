'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { 
  Users, Crown, PlayCircle, Clock, CheckCircle2, 
  AlertCircle, Box, PieChart, BarChart3, TrendingUp, Calendar
} from 'lucide-react';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, 
  BarElement, Title, Tooltip, Legend, ArcElement
} from 'chart.js';
import { Pie, Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, 
  BarElement, Title, Tooltip, Legend, ArcElement
);

const palette = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4', '#84cc16'];

export default function SuperAdminDashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const res = await api.get('/api/v1/analytics/dashboard');
      return res.data.data;
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm animate-pulse h-32"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !data) {
    return <div className="text-red-500 bg-red-50 p-4 rounded-lg">Failed to load dashboard statistics.</div>;
  }

  const { kpi, tools, modules, dailyTrend, monthlyTrend, topUsers, usersStatus } = data;

  const kpiStats = [
    { label: 'Executions', value: kpi?.TotalExecutions || 0, icon: PlayCircle, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Active Users', value: kpi?.TotalActiveUsers || 0, icon: Users, color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { label: 'Today\'s Logins', value: usersStatus?.TodayLogins || 0, icon: CheckCircle2, color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Time Spent (hrs)', value: (kpi?.TotalHoursSpent || 0).toFixed(1), icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Today Runs', value: kpi?.TodayExecutions || 0, icon: TrendingUp, color: 'text-pink-600', bg: 'bg-pink-50' },
  ];

  const userStats = [
    { label: 'Total Users', value: usersStatus?.TotalUsers || 0, icon: Users, color: 'text-blue-600', border: 'border-l-blue-500' },
    { label: 'Active', value: usersStatus?.ActiveUsers || 0, icon: CheckCircle2, color: 'text-emerald-600', border: 'border-l-emerald-500' },
    { label: 'Members', value: usersStatus?.PremiumUsers || 0, icon: Crown, color: 'text-amber-600', border: 'border-l-amber-500' },
    { label: 'Trial Active', value: usersStatus?.TrialUsers || 0, icon: Clock, color: 'text-cyan-600', border: 'border-l-cyan-500' },
    { label: 'Expired Trials', value: usersStatus?.ExpiredTrials || 0, icon: AlertCircle, color: 'text-red-500', border: 'border-l-red-500' },
  ];

  const toolsData = {
    labels: tools?.map((t: any) => t.ToolName) || [],
    datasets: [{
      data: tools?.map((t: any) => t.UsageCount) || [],
      backgroundColor: palette,
      borderWidth: 2,
    }]
  };

  const modulesData = {
    labels: modules?.map((m: any) => m.ModuleName) || [],
    datasets: [{
      data: modules?.map((m: any) => m.UsageCount) || [],
      backgroundColor: [...palette].reverse(),
      borderWidth: 2,
    }]
  };

  const dailyData = {
    labels: dailyTrend?.map((d: any) => d.UsageDate) || [],
    datasets: [{
      label: 'Daily Activity',
      data: dailyTrend?.map((d: any) => d.ExecutionCount) || [],
      backgroundColor: '#0ea5e9',
    }]
  };

  const monthlyData = {
    labels: monthlyTrend?.map((m: any) => m.UsageMonth) || [],
    datasets: [{
      label: 'Monthly Trend',
      data: monthlyTrend?.map((m: any) => m.ExecutionCount) || [],
      backgroundColor: '#f59e0b',
    }]
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <BarChart3 className="text-blue-600 w-8 h-8" /> Dashboard Overview
        </h2>
        <p className="text-slate-500 mt-1">Real-time telemetric analytics & user account management (Last 7 Days)</p>
      </div>

      {/* KPI Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {kpiStats.map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex justify-between items-start hover:shadow-md transition-all">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">{stat.label}</p>
              <h3 className={`text-2xl font-extrabold ${stat.color}`}>{stat.value}</h3>
            </div>
            <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <PieChart className="text-blue-600 w-5 h-5" /> Tool-Wise Usage Distribution
          </h3>
          <div className="h-64">
            {tools?.length > 0 ? (
              <Doughnut data={toolsData} options={{ maintainAspectRatio: false, cutout: '70%', plugins: { legend: { position: 'bottom' } } }} />
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400">No tool data recorded.</div>
            )}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Box className="text-emerald-600 w-5 h-5" /> Module Category Breakdown
          </h3>
          <div className="h-64">
            {modules?.length > 0 ? (
              <Pie data={modulesData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400">No module data recorded.</div>
            )}
          </div>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingUp className="text-cyan-600 w-5 h-5" /> Daily Activity Trend (30 Days)
          </h3>
          <div className="h-64">
            {dailyTrend?.length > 0 ? (
              <Bar data={dailyData} options={{ maintainAspectRatio: false }} />
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400">No daily activity recorded.</div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Calendar className="text-amber-600 w-5 h-5" /> Monthly Usage Trend (12 Months)
          </h3>
          <div className="h-64">
            {monthlyTrend?.length > 0 ? (
              <Bar data={monthlyData} options={{ maintainAspectRatio: false }} />
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400">No monthly activity recorded.</div>
            )}
          </div>
        </div>
      </div>

      {/* Table & Account Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Users */}
        <div className="bg-white rounded-xl border shadow-sm flex flex-col">
          <div className="p-4 border-b flex items-center gap-2">
            <Crown className="text-amber-500 w-5 h-5" />
            <h3 className="font-bold text-slate-900">Top Active Users</h3>
            <span className="ml-auto text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">Top 10</span>
          </div>
          <div className="flex-1 overflow-x-auto p-0">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600 border-b">
                <tr>
                  <th className="px-4 py-3 font-semibold">User Email</th>
                  <th className="px-4 py-3 font-semibold text-center">LAN Devices</th>
                  <th className="px-4 py-3 font-semibold text-center">Time Spent</th>
                  <th className="px-4 py-3 font-semibold text-right">Executions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {topUsers?.length > 0 ? topUsers.map((u: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">{u.UserEmail}</td>
                    <td className="px-4 py-3 text-center"><span className="bg-slate-100 border px-2 py-0.5 rounded text-xs">{u.DeviceCount}</span></td>
                    <td className="px-4 py-3 text-center text-slate-500">{u.MinutesSpent} mins</td>
                    <td className="px-4 py-3 text-right"><span className="bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded text-xs">{u.ExecutionCount}</span></td>
                  </tr>
                )) : (
                  <tr><td colSpan={4} className="text-center py-6 text-slate-500">No active users recorded.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Account Status Mini Cards */}
        <div className="bg-white rounded-xl border shadow-sm flex flex-col">
          <div className="p-4 border-b flex items-center gap-2">
            <Users className="text-blue-600 w-5 h-5" />
            <h3 className="font-bold text-slate-900">User Accounts & Membership Status</h3>
          </div>
          <div className="p-4 grid grid-cols-2 gap-4">
            {userStats.map((stat, i) => (
              <div key={i} className={`bg-slate-50 p-4 rounded-lg border-l-4 ${stat.border} hover:bg-white hover:shadow-md transition-all cursor-pointer`}>
                <div className="flex justify-between items-start">
                  <p className="text-xs font-bold uppercase text-slate-500">{stat.label}</p>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <h4 className={`text-xl font-bold mt-1 ${stat.color}`}>{stat.value}</h4>
              </div>
            ))}
          </div>
          
          {/* Membership Distribution Visualizer */}
          <div className="px-4 pb-4">
            <div className="p-3 bg-slate-50 rounded-lg border">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-xs text-slate-900 flex items-center gap-1">
                  <PieChart className="w-3 h-3 text-blue-600" /> Membership Breakdown
                </span>
                <span className="text-xs text-slate-500">{usersStatus?.TotalUsers || 0} Total Accounts</span>
              </div>
              
              {(() => {
                const total = usersStatus?.TotalUsers || 1;
                const memberPct = ((usersStatus?.PremiumUsers || 0) / total) * 100;
                const trialPct = ((usersStatus?.TrialUsers || 0) / total) * 100;
                const expiredPct = ((usersStatus?.ExpiredTrials || 0) / total) * 100;
                
                return (
                  <>
                    <div className="w-full h-2.5 bg-slate-200 rounded-full flex overflow-hidden mb-3">
                      <div className="bg-amber-500 h-full" style={{ width: `${memberPct}%` }} title={`Paid Members (${memberPct.toFixed(1)}%)`}></div>
                      <div className="bg-cyan-500 h-full" style={{ width: `${trialPct}%` }} title={`Active Trials (${trialPct.toFixed(1)}%)`}></div>
                      <div className="bg-red-500 h-full" style={{ width: `${expiredPct}%` }} title={`Expired Trials (${expiredPct.toFixed(1)}%)`}></div>
                    </div>
                    <div className="flex justify-between flex-wrap gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        <span className="text-slate-500">Paid:</span>
                        <strong className="text-slate-900">{usersStatus?.PremiumUsers || 0} ({memberPct.toFixed(1)}%)</strong>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                        <span className="text-slate-500">Trials:</span>
                        <strong className="text-slate-900">{usersStatus?.TrialUsers || 0} ({trialPct.toFixed(1)}%)</strong>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        <span className="text-slate-500">Expired:</span>
                        <strong className="text-slate-900">{usersStatus?.ExpiredTrials || 0} ({expiredPct.toFixed(1)}%)</strong>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
