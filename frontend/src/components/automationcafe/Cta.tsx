import React from "react";
import Link from "next/link";
import { CalendarCheck, Download } from "lucide-react";

export function Cta() {
  return (
    <section className="relative overflow-hidden bg-blue-50 py-24 text-center">
      {/* Decorative circles to replace the dark theme neon glows */}
      <div className="absolute -right-20 -top-20 h-[360px] w-[360px] rounded-full bg-blue-200/50 blur-3xl"></div>
      <div className="absolute -bottom-16 -left-16 h-[280px] w-[280px] rounded-full bg-indigo-200/50 blur-3xl"></div>

      <div className="container relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-indigo-600">
          Start Automating
        </p>
        <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
          Stop doing manually<br className="hidden sm:block" />
          what a computer can do in seconds
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-600">
          Register your license and download Automation Suite today. Built for CA firms and tax professionals across India.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/demo"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl"
          >
            <CalendarCheck className="h-5 w-5" />
            Book a Demo
          </Link>
          <Link
            href="/download"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-200 bg-white px-8 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:border-blue-300 hover:bg-slate-50 hover:text-blue-700"
          >
            <Download className="h-5 w-5" />
            Download Suite
          </Link>
        </div>
      </div>
    </section>
  );
}
