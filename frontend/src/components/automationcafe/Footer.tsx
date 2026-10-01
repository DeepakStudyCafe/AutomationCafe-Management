"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  // Hide footer on dashboard and admin routes
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/superadmin') || pathname?.startsWith('/dashboard')) {
    return null;
  }

  return (
    <footer className="relative z-10 border-t border-slate-200 bg-slate-50 pt-16 pb-8">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          {/* Brand Col */}
          <div className="md:col-span-4 lg:col-span-5">
            <Link href="/" className="inline-block mb-4">
              {/* Note: Legacy used white logo for dark footer, we use black logo for light theme */}
              <Image
                src="/Images/automationcafe-black.png"
                alt="AutomationCafe"
                width={160}
                height={26}
                className="h-6 w-auto object-contain opacity-90"
                style={{ width: "auto" }}
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-600">
              Automation tools for CA firms and tax professionals. Handle GST, Income Tax and client workflows — without touching a portal manually.
            </p>
          </div>

          {/* Product Links */}
          <div className="md:col-span-3 lg:col-span-2">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-900">
              Product
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="text-slate-600 transition-colors hover:text-blue-700">Home</Link></li>
              <li><Link href="/blog" className="text-slate-600 transition-colors hover:text-blue-700">Blog</Link></li>
              <li><Link href="/download" className="text-slate-600 transition-colors hover:text-blue-700">Download</Link></li>
              <li><Link href="/demo" className="text-slate-600 transition-colors hover:text-blue-700">Book Demo</Link></li>
              <li><Link href="/pricing" className="text-slate-600 transition-colors hover:text-blue-700">Pricing</Link></li>
              <li><Link href="/account/register" className="text-slate-600 transition-colors hover:text-blue-700">Register License</Link></li>
              <li><Link href="/referral" className="text-slate-600 transition-colors hover:text-blue-700">Referral Program</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="md:col-span-3 lg:col-span-2">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-900">
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="text-slate-600 transition-colors hover:text-blue-700">About Us</Link></li>
              <li><Link href="/services" className="text-slate-600 transition-colors hover:text-blue-700">Services</Link></li>
              <li><Link href="/partner" className="text-slate-600 transition-colors hover:text-blue-700">Partner With Us</Link></li>
              <li><Link href="/tallypartner" className="text-slate-600 transition-colors hover:text-blue-700">Tally Partner Program</Link></li>
              <li><Link href="/contact" className="text-slate-600 transition-colors hover:text-blue-700">Contact Us</Link></li>
              <li><Link href="/ethics" className="text-slate-600 transition-colors hover:text-blue-700">Ethics Policy</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="md:col-span-2 lg:col-span-3">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-900">
              Legal
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/privacy" className="text-slate-600 transition-colors hover:text-blue-700">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-slate-600 transition-colors hover:text-blue-700">Terms of Use</Link></li>
              <li><Link href="/refund" className="text-slate-600 transition-colors hover:text-blue-700">Refund Policy</Link></li>
              <li><Link href="/disclaimer" className="text-slate-600 transition-colors hover:text-blue-700">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 md:flex-row">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} AutomationCafe — All Rights Reserved
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wide text-slate-500">
              A product of
            </span>
            <a
              href="https://www.studycafe.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <Image
                src="/Images/automationcafe-black.png"
                alt="Automation Cafe"
                width={120}
                height={22}
                className="h-[22px] w-auto object-contain opacity-80 transition-opacity hover:opacity-100"
                style={{ width: "auto" }}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
