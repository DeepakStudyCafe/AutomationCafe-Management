'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, LogOut, LayoutDashboard, IndianRupee, User } from 'lucide-react';
import api from '@/lib/api';

export default function ReferralPortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/api/v1/auth/me');
        if (res.data.data) {
          setProfile(res.data.data);
        } else {
          router.push('/account/login');
        }
      } catch (err) {
        router.push('/account/login');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [router]);

  const handleLogout = async () => {
    try {
      await api.post('/api/v1/auth/logout', { role: 'user' });
      router.push('/account/login');
    } catch (e) {
      window.location.href = '/account/login';
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading Referral Portal...</div>;
  }

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Earnings', href: '/dashboard/earnings', icon: IndianRupee },
    { name: 'My Profile', href: '/dashboard/profile', icon: User },
  ];

  // Get active title for topbar
  const activeTitle = navItems.find(item => pathname === item.href)?.name || 'Dashboard';

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1b1b3a] transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <Link href="/" className="inline-block mb-1">
            <Image
              src="/Images/automationcafe-white.png"
              alt="AutomationCafe"
              width={160}
              height={26}
              className="h-6 w-auto object-contain"
              style={{ width: 'auto' }}
            />
          </Link>
          <div className="text-[10px] tracking-[0.2em] text-slate-400 uppercase font-semibold pl-1">Referral Portal</div>
        </div>

        <div className="px-4 mt-4">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Menu</div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-[#7c3aed] text-white shadow-md' 
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-4">
          <div className="flex items-center gap-3 px-4 py-3 bg-black/20 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-[#7c3aed] flex items-center justify-center text-white font-bold text-sm">
              {profile?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-semibold text-white truncate">{profile?.email || 'User'}</div>
              <div className="text-xs text-slate-400 truncate">{profile?.userID ? `ID: ${profile.userID}` : 'Active'}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 sm:px-6 shadow-sm z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-slate-800">{activeTitle}</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Link 
              href="/"
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Main Site
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-100 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
