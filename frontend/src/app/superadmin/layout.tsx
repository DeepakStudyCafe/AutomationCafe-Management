'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import AdminTopbar from '@/components/layout/AdminTopbar';
import api from '@/lib/api';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<{ role: string; fullName: string; modules?: string[] } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/api/v1/auth/admin/me');
        setProfile({ role: res.data.data.role, fullName: res.data.data.email, modules: res.data.data.modules || [] });
      } catch (err) {
        // Redirect to login if unauthenticated
        window.location.href = '/admin/login';
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading dashboard...</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <AdminSidebar userRole={profile?.role || 'admin'} allowedModules={profile?.modules} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminTopbar userName={profile?.fullName} />
        <main className="flex-1 overflow-y-auto p-4 md:p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
