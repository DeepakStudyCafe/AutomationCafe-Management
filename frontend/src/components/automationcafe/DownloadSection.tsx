"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Monitor, Download, Info, PlayCircle } from "lucide-react";

export function DownloadSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="download" className="bg-white py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          
          {/* Left Content */}
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-blue-600">Get Started Today</p>
            <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Download<br />
              <span className="text-blue-600">Automation Suite</span> for Windows
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-slate-600">
              A single <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-blue-600">.exe</code> file — no installation, no setup wizard. Run it, log in with your registered email, and you&apos;re ready to automate.
            </p>

            <div className="mb-8 rounded-2xl border-l-4 border-l-blue-600 border-y border-r border-y-blue-200 border-r-blue-200 bg-blue-50/50 p-6">
              <div className="flex items-center gap-5">
                <Monitor className="h-10 w-10 text-blue-600 flex-shrink-0" />
                <div className="flex-grow">
                  <div className="font-bold text-slate-900 text-lg mb-1">Windows Desktop Edition</div>
                  <p className="text-sm text-slate-500 mb-0">Includes all 30+ automation modules</p>
                </div>
                <Link 
                  href="/download" 
                  className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg"
                >
                  <Download className="h-4 w-4" />
                  .EXE
                </Link>
              </div>
            </div>

            <div className="mb-8 flex flex-wrap items-center gap-8">
              <div className="flex flex-col items-center sm:items-start">
                <span className="text-2xl font-extrabold text-slate-900">10k+</span>
                <span className="mt-1 text-xs font-semibold text-slate-500 uppercase tracking-wide">Downloads</span>
              </div>
              <div className="hidden h-10 w-px bg-slate-200 sm:block"></div>
              <div className="flex flex-col items-center sm:items-start">
                <span className="text-2xl font-extrabold text-slate-900">4.9/5</span>
                <span className="mt-1 text-xs font-semibold text-slate-500 uppercase tracking-wide">User Rating</span>
              </div>
              <div className="hidden h-10 w-px bg-slate-200 sm:block"></div>
              <div className="flex flex-col items-center sm:items-start">
                <span className="text-2xl font-extrabold text-slate-900">Free</span>
                <span className="mt-1 text-xs font-semibold text-slate-500 uppercase tracking-wide">To Download</span>
              </div>
            </div>

            <p className="flex items-center gap-2 text-sm text-slate-500">
              <Info className="h-4 w-4 text-blue-600" />
              Windows may show a SmartScreen prompt.
              <Link href="/download" className="font-semibold text-blue-600 hover:underline">
                See installation guide &rarr;
              </Link>
            </p>
          </div>

          {/* Right Video */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative aspect-video rounded-2xl bg-slate-900 shadow-xl overflow-hidden group border border-slate-200">
              {isPlaying ? (
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/Cc5EbodnzqU?autoplay=1&rel=0&modestbranding=1"
                  title="Platform Walkthrough"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0"
                ></iframe>
              ) : (
                <div 
                  className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center overflow-hidden transition-all hover:brightness-105"
                  onClick={() => setIsPlaying(true)}
                >
                  {/* Notice we use maxresdefault of the EXACT same video Cc5EbodnzqU */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: "url('https://img.youtube.com/vi/Cc5EbodnzqU/maxresdefault.jpg')" }}
                  ></div>
                  <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px] transition-all group-hover:bg-white/20"></div>
                  
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/95 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 shadow-sm">
                      <PlayCircle className="h-4 w-4" />
                      Walkthrough
                    </div>
                    
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/40 transition-transform group-hover:scale-110">
                      <PlayCircle className="h-8 w-8 ml-0.5" />
                    </div>
                    
                    <div className="mt-4 text-center rounded-lg bg-white/90 px-4 py-2 shadow-sm">
                      <p className="font-bold text-blue-900 mb-0.5">See it in action</p>
                      <p className="text-xs text-slate-600 mb-0">Watch the full platform walkthrough</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
