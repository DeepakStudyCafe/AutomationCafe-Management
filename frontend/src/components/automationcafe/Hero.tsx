"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Download, CalendarCheck, Play, CheckCircle2, Star, ShieldCheck } from "lucide-react";


export function Hero() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-20 lg:pt-32 lg:pb-28">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-blue-50 to-white transform rotate-12 -translate-y-10 translate-x-20 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-100 rounded-full blur-3xl opacity-40 -translate-x-10 translate-y-10"></div>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('https://vyaparapp.in/images/pattern.png')] bg-repeat opacity-[0.03]"></div>
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-12">

          {/* Left Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-bold text-blue-700 mb-8 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              #1 CA Automation Software in India
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              The Ultimate<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 relative inline-block">
                Automation
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-300 opacity-70" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" /></svg>
              </span><br />
              Suite
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              One desktop tool. 30+ automation modules. Handle GST returns, income tax, bank statements, reconciliation, Tally sync and client emails — all without touching a single portal manually.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <Link
                href="/download"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-blue-600/30 transition-all hover:bg-blue-700 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-600/40 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                <Download className="h-5 w-5 relative z-10 animate-bounce" />
                <span className="relative z-10">Download Free</span>
              </Link>
              <Link
                href="/demo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-blue-700 hover:border-blue-200 hover:-translate-y-1"
              >
                <CalendarCheck className="h-5 w-5 text-blue-600" />
                Book a Demo
              </Link>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 text-sm font-semibold text-slate-600">
              <div className="flex items-center gap-1.5"><ShieldCheck className="w-5 h-5 text-emerald-500" /> 100% Offline & Secure</div>
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </div>

          {/* Right Visual / Video */}
          <div className="w-full lg:w-1/2 relative">
            {/* Floating feature badges */}
            <div className="absolute -left-8 top-10 z-20 hidden md:flex items-center gap-3 bg-white p-3 pr-5 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 animate-[bounce_4s_infinite]">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">AI Invoice to Tally</p>
                <p className="text-[10px] text-slate-500 font-medium">New Feature</p>
              </div>
            </div>

            <div className="absolute -right-6 bottom-16 z-20 hidden md:flex items-center gap-3 bg-white p-3 pr-5 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 animate-[bounce_5s_infinite_reverse]">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">GSTR-2B Reconciled</p>
                <p className="text-[10px] text-emerald-600 font-bold">100% Match</p>
              </div>
            </div>

            {/* Main Video Container */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none rounded-3xl p-3 bg-white shadow-2xl shadow-blue-900/10 border border-slate-200">
              <div className="relative aspect-[4/3] sm:aspect-video lg:aspect-[4/3] xl:aspect-video rounded-2xl bg-slate-900 overflow-hidden group">
                {isPlaying ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/bzB5viFiAUU?autoplay=1&rel=0&modestbranding=1"
                    title="Product Demo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 rounded-2xl"
                  ></iframe>
                ) : (
                  <div
                    className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center overflow-hidden transition-all hover:brightness-110"
                    onClick={() => setIsPlaying(true)}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-80"
                      style={{ backgroundImage: "url('https://img.youtube.com/vi/Cc5EbodnzqU/maxresdefault.jpg')" }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>

                    <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600/90 text-white shadow-2xl shadow-blue-600/50 transition-transform group-hover:scale-110 group-hover:bg-blue-600 backdrop-blur-sm border-4 border-white/20 mb-4">
                        <Play className="h-8 w-8 ml-1" fill="currentColor" />
                      </div>
                      <div className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
                        <p className="font-bold text-white tracking-wide">Watch Product Demo</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Background Blob behind video */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[3rem] opacity-10 rotate-3 blur-lg"></div>
          </div>
        </div>

        {/* Stats Row - redesigned */}
        <div className="mt-20 pt-10 border-t border-slate-100">
          <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Trusted by thousands of CA firms across India</p>
          <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-1">30+</div>
              <div className="text-sm font-bold text-blue-600">Automation Modules</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-1">10k+</div>
              <div className="text-sm font-bold text-blue-600">CA Professionals</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-1 flex items-baseline gap-1">
                4.9<span className="text-2xl text-slate-400 font-bold">/5</span>
              </div>
              <div className="text-sm font-bold text-blue-600">User Rating</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-1">100%</div>
              <div className="text-sm font-bold text-blue-600">Offline & Secure</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
