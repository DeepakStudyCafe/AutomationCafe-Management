'use client';

import { LogOut, User } from 'lucide-react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function AdminTopbar({ userName = 'Admin' }: { userName?: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.post('/api/v1/auth/logout', { role: 'admin' });
      router.push('/admin/login');
    } catch (e) {
      console.error(e);
      // Force redirect anyway
      window.location.href = '/admin/login';
    }
  };

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle would go here */}
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm text-slate-700">
          <User className="w-4 h-4 text-slate-500" />
          <span className="font-medium">{userName}</span>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </header>
  );
}
