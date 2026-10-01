"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Gift, Briefcase, ShieldCheck, Star, User, Network, LogOut, ChevronDown } from "lucide-react";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await api.get('/api/v1/auth/me');
        return res.data.data;
      } catch {
        return null;
      }
    },
    retry: false,
    refetchOnWindowFocus: true,
  });

  const isAuthenticated = !!user;

  const handleLogout = async () => {
    try {
      await api.post('/api/v1/auth/logout');
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
      window.location.href = '/account/login';
    } catch (err) {
      console.error(err);
    }
  };

  // Hide header on dashboard and admin routes
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/superadmin') || pathname?.startsWith('/dashboard')) {
    return null;
  }

  const navLinks = [
    { name: "Home", href: "/", isExact: true },
    { name: "Download", href: "/download", isExact: false },
    { name: "How to Use", href: "/howtouse", isExact: false },
    { name: "Pricing", href: "/pricing", isExact: false },
    { name: "Book Demo", href: "/demo", isExact: false },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white shadow-[0_1px_12px_rgba(0,0,0,0.06)]">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/Images/automationcafe-black.png"
              alt="AutomationCafe"
              width={180}
              height={28}
              className="h-7 w-auto object-contain"
              style={{ width: "auto" }}
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:items-center lg:gap-1">
          {navLinks.map((link) => {
            const isActive = link.isExact
              ? pathname === link.href
              : pathname.startsWith(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium transition-colors hover:text-blue-800 ${isActive ? "text-blue-900 font-semibold" : "text-slate-600"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}

          <Link
            href="/partner"
            className="ml-1 inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 px-3 py-1.5 text-xs font-bold text-blue-700 shadow-[0_2px_8px_rgba(37,99,235,0.15)] transition-all hover:border-blue-300 hover:shadow-md"
          >
            <Briefcase className="h-3.5 w-3.5 text-blue-600" />
            Partner with Us
          </Link>

          <Link
            href="/referral"
            className="ml-2 flex items-center gap-1.5 px-2 py-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
          >
            <Gift className="h-4 w-4" />
            Refer and Earn
          </Link>
        </nav>

        {/* Auth / CTA */}
        <div className="hidden lg:flex lg:items-center lg:gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="relative">
                <div 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2.5 cursor-pointer rounded-full border border-slate-200 bg-white p-1 pr-3.5 shadow-sm transition-all hover:border-blue-200 hover:shadow-md active:scale-95"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-inner text-sm font-bold text-white tracking-wider ring-2 ring-white">
                    {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-sm font-bold text-slate-700 truncate max-w-[140px]">{user?.fullName || 'User'}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </div>
                
                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
                    <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-white shadow-xl ring-1 ring-slate-900/5 z-50 overflow-hidden">
                      <div className="p-4 bg-slate-50 border-b border-slate-100">
                        <div className="text-sm font-medium text-slate-500 mb-2 truncate">
                          {user?.email || 'info@studycafe.in'}
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#16a34a] text-white text-[0.7rem] font-bold">
                          <Star className="w-3.5 h-3.5 fill-white" />
                          Premium Active
                        </div>
                      </div>
                      <div className="py-2 border-b border-slate-100">
                        <Link 
                          href="/dashboard" 
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <User className="w-4 h-4 text-blue-600" />
                          My Dashboard
                        </Link>
                        <Link 
                          href="/referral" 
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Network className="w-4 h-4 text-purple-600" />
                          My Referrals
                        </Link>
                      </div>
                      <div className="py-2">
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#ef4444] hover:bg-red-50 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Log Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/account/login"
                className="px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-800"
              >
                Log In
              </Link>
              <Link
                href="/account/register"
                className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600"
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navLinks.map((link) => {
              const isActive = link.isExact
                ? pathname === link.href
                : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block rounded-md px-3 py-2.5 text-base font-medium ${isActive
                      ? "bg-blue-50 text-blue-900"
                      : "text-slate-700 hover:bg-slate-50 hover:text-blue-800"
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}

            <Link
              href="/partner"
              className="flex items-center gap-2 rounded-md px-3 py-2.5 text-base font-medium text-blue-700 hover:bg-blue-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Briefcase className="h-4 w-4" /> Partner with Us
            </Link>

            <Link
              href="/referral"
              className="flex items-center gap-2 rounded-md px-3 py-2.5 text-base font-medium text-emerald-600 hover:bg-emerald-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Gift className="h-4 w-4" /> Refer and Earn
            </Link>

            <div className="mt-4 border-t border-slate-100 pt-4">
              <Link
                href="/account/login"
                className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Log In
              </Link>
              <Link
                href="/account/register"
                className="mt-2 block w-full text-center rounded-md bg-blue-600 px-3 py-2.5 text-base font-medium text-white hover:bg-blue-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
