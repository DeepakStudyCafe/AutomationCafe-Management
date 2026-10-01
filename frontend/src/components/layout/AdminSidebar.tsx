'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Users,
  BarChart3,
  CreditCard,
  Settings,
  FileText,
  BookOpen,
  Mail,
  MonitorSmartphone,
  Calendar,
  Percent,
  Activity
} from 'lucide-react';

export interface SidebarItem {
  title: string;
  href: string;
  icon: React.ElementType;
  moduleKey?: string;
  roleOnly?: string;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { title: 'Dashboard', href: '/superadmin', icon: BarChart3, moduleKey: 'analytics' },
  { title: 'Users Management', href: '/superadmin/users', icon: Users, moduleKey: 'users' },
  { title: 'Plans & Pricing', href: '/superadmin/plans', icon: CreditCard, roleOnly: 'superadmin' },
  { title: 'Coupons Module', href: '/superadmin/coupons', icon: Percent, moduleKey: 'coupons' },
  { title: 'Devices Management', href: '/superadmin/devices', icon: MonitorSmartphone, moduleKey: 'devices' },
  { title: 'Blogs Management', href: '/superadmin/blogs', icon: BookOpen, moduleKey: 'blogs' },
  { title: 'Referrals & Earn', href: '/superadmin/referrals', icon: FileText, moduleKey: 'referrals' },
  { title: 'Demo Bookings', href: '/superadmin/demo-bookings', icon: Calendar, moduleKey: 'demo-bookings' },
  { title: 'Email Sender', href: '/superadmin/email-sender', icon: Mail, moduleKey: 'email-sender' },
  { title: 'Tally Inquiries', href: '/superadmin/tally-partner', icon: FileText, moduleKey: 'tally-tools' },
  { title: 'Tracking Logs', href: '/superadmin/tracking-logs', icon: Activity, moduleKey: 'analytics' },
  { title: 'Payment Logs', href: '/superadmin/payment-logs', icon: CreditCard, moduleKey: 'payments' },
  { title: 'All Payments Logs', href: '/superadmin/all-payments-logs', icon: CreditCard, moduleKey: 'payments' },
  { title: 'Admin Management', href: '/superadmin/admins', icon: Settings, roleOnly: 'superadmin' },
];

// In a real app, this module keys list would come from the user's fetched profile or context.
export default function AdminSidebar({ userRole, allowedModules = [] }: { userRole: string, allowedModules?: string[] }) {
  const pathname = usePathname();

  const filteredItems = SIDEBAR_ITEMS.filter(item => {
    if (userRole === 'superadmin') return true;
    if (item.roleOnly && item.roleOnly !== userRole) return false;
    if (item.moduleKey && !allowedModules.includes(item.moduleKey)) return false;
    return true;
  });

  return (
    <aside className="w-64 bg-white border-r h-screen hidden md:flex flex-col">
      <div className="h-16 flex items-center px-6 border-b">
        <Link href="/superadmin">
          <img
            src="/Images/automationcafe-black.png"
            alt="Automation Cafe"
            className="h-6 w-auto object-contain"
          />
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {filteredItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-blue-600" : "text-slate-400")} />
              {item.title}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t text-xs text-slate-500">
        Logged in as <span className="font-semibold uppercase">{userRole}</span>
      </div>
    </aside>
  );
}
