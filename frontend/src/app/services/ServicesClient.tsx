"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Grid3X3, 
  Download, 
  Search, 
  CloudDownload, 
  ShieldCheck, 
  ArrowLeftRight, 
  FileSpreadsheet, 
  Network, 
  Calculator, 
  Mail, 
  FileBox, 
  MessageCircle, 
  CheckCircle2,
  Monitor,
  Lock,
  RefreshCcw,
  Users
} from 'lucide-react';

const SERVICES = [
  {
    category: "gst",
    id: "bulk-gst",
    accent: "from-indigo-600 to-indigo-500",
    bgClass: "bg-indigo-50 border-indigo-100",
    iconColor: "text-indigo-600",
    icon: <CloudDownload />,
    title: "Bulk GST Downloads",
    desc: "Download GST returns for all your clients at once via automated browser — no manual portal login loops. Covers all major return types.",
    features: [
      "GSTR-1 (JSON + PDF) bulk download",
      "GSTR-2B, GSTR-3B, GST Challans",
      "IMS data for all clients at once",
      "Automated browser — no portal logins"
    ],
    tags: ["GSTR-1 PDF", "GSTR-2B", "GSTR-3B", "Challan", "IMS"],
    tagColors: "bg-indigo-100 text-indigo-700"
  },
  {
    category: "gst",
    id: "gstin-verifier",
    accent: "from-emerald-600 to-emerald-500",
    bgClass: "bg-emerald-50 border-emerald-100",
    iconColor: "text-emerald-600",
    icon: <ShieldCheck />,
    title: "GSTIN Verifier",
    desc: "Verify hundreds of GSTINs in bulk directly from the GST portal. Get live compliance data for every client in one go.",
    features: [
      "Bulk GSTIN lookup from Excel list",
      "Live filing history & return status",
      "Trade name & compliance details",
      "Full results exported to Excel"
    ],
    tags: ["Bulk Lookup", "Filing History", "Excel Export"],
    tagColors: "bg-emerald-100 text-emerald-700"
  },
  {
    category: "gst",
    id: "gst-reconcile",
    accent: "from-teal-600 to-teal-500",
    bgClass: "bg-teal-50 border-teal-100",
    iconColor: "text-teal-600",
    icon: <ArrowLeftRight />,
    title: "GST Reconciliation",
    desc: "Reconcile GSTR-2B portal data against your Tally or purchase register. Maximise ITC claims and reduce compliance risk automatically.",
    features: [
      "GSTR-2B vs Tally / purchase register",
      "Intelligent invoice matching",
      "Automated exception reports",
      "Save 80% reconciliation time"
    ],
    tags: ["GSTR-2B vs Books", "ITC Maximiser", "Mismatch Report"],
    tagColors: "bg-teal-100 text-teal-700"
  },
  {
    category: "gst",
    id: "json-excel",
    accent: "from-pink-600 to-pink-500",
    bgClass: "bg-pink-50 border-pink-100",
    iconColor: "text-pink-600",
    icon: <FileSpreadsheet />,
    title: "JSON & 3B to Excel",
    desc: "Convert GST portal exports into structured Excel workbooks instantly. Consolidate multiple files into a single unified report.",
    features: [
      "GSTR-1 JSON → multi-sheet Excel",
      "GSTR-3B PDF → Excel conversion",
      "Consolidate multiple GSTR-1 files",
      "Clean, structured output format"
    ],
    tags: ["GSTR-1 JSON → Excel", "3B PDF → Excel", "Consolidation"],
    tagColors: "bg-pink-100 text-pink-700"
  },
  {
    category: "tally",
    id: "tally-auto",
    accent: "from-orange-600 to-orange-500",
    bgClass: "bg-orange-50 border-orange-100",
    iconColor: "text-orange-600",
    icon: <Network />,
    title: "AI Invoice to Tally",
    desc: "AI-powered extraction of PDF & scanned invoices, Excel sheets, and GSTR-2B data directly into Tally-ready XML files. Auto-maps ledgers and eliminates manual data entry.",
    features: [
      "AI Invoice to Tally (with PDF & Excel)",
      "GSTR-2B data → Tally XML",
      "Auto-maps supplier & customer ledgers",
      "Generates Tally vouchers automatically",
      "Batch processing for multi-client firms"
    ],
    tags: ["AI PDF Invoice → Tally", "GSTR-2B → Tally XML", "Auto Mapping"],
    tagColors: "bg-orange-100 text-orange-700"
  },
  {
    category: "income-tax",
    id: "it-suite",
    accent: "from-sky-600 to-sky-500",
    bgClass: "bg-sky-50 border-sky-100",
    iconColor: "text-sky-600",
    icon: <Calculator />,
    title: "Income Tax Suite",
    desc: "Complete income tax workflow automation. Download all key reports in bulk and automate ITR filing for your entire client list.",
    features: [
      "Bulk 26AS / AIS / TIS downloads",
      "Outstanding demand checker",
      "Refund status checker",
      "ITR Bot for automated filing"
    ],
    tags: ["26AS / AIS / TIS", "Demand Checker", "Refund Checker", "ITR Bot"],
    tagColors: "bg-sky-100 text-sky-700"
  },
  {
    category: "email",
    id: "bulk-email",
    accent: "from-amber-600 to-amber-500",
    bgClass: "bg-amber-50 border-amber-100",
    iconColor: "text-amber-600",
    icon: <Mail />,
    title: "Bulk Email Automation",
    desc: "Send personalised bulk emails via Outlook in one click. Communicate with all your clients without composing a single email manually.",
    features: [
      "GST return data request emails",
      "Invoice dispatch with PDF attachments",
      "Payment reminder campaigns",
      "Auto-filled from Excel data"
    ],
    tags: ["GST Return Request", "Invoice Sender", "Payment Reminder"],
    tagColors: "bg-amber-100 text-amber-700"
  },
  {
    category: "pdf",
    id: "pdf-tools",
    accent: "from-purple-600 to-purple-500",
    bgClass: "bg-purple-50 border-purple-100",
    iconColor: "text-purple-600",
    icon: <FileBox />,
    title: "PDF Toolkit",
    desc: "A full PDF utility suite built right into the app. Handle every common document task without needing third-party software or online tools.",
    features: [
      "Merge multiple PDF files",
      "Split & extract specific pages",
      "Compress to reduce file size",
      "Permanently redact sensitive data"
    ],
    tags: ["Merge", "Split", "Extract", "Compress", "Redact"],
    tagColors: "bg-purple-100 text-purple-700"
  },
  {
    category: "whatsapp",
    id: "wa-auto",
    accent: "from-green-500 to-green-400",
    bgClass: "bg-green-50 border-green-100",
    iconColor: "text-green-600",
    icon: <MessageCircle />,
    title: "WhatsApp Automation",
    desc: "Automate client communications directly through WhatsApp. Connect your WhatsApp Business account to send updates, reminders, and alerts seamlessly.",
    features: [
      "WhatsApp Business account integration",
      "Send tax filing reminders & alerts",
      "Automated document collection requests",
      "Official pre-approved message templates"
    ],
    tags: ["Tax Filing Reminders", "Document Requests", "Template Messages"],
    tagColors: "bg-green-100 text-green-700"
  }
];

export function ServicesClient() {
  const [filter, setFilter] = useState("all");

  const filteredServices = SERVICES.filter(s => filter === "all" || s.category === filter);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24 text-center border-b border-slate-200/50">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-blue-100/40 via-indigo-50/20 to-transparent blur-3xl opacity-70 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-sky-100/40 via-blue-50/20 to-transparent blur-3xl opacity-70 pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/50 bg-blue-50/50 px-4 py-1.5 text-[13px] font-bold text-blue-600 mb-8 backdrop-blur-sm shadow-sm tracking-wide">
            <Grid3X3 className="w-4 h-4" />
            Our Services
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-black tracking-tight text-slate-900 mb-6 leading-[1.1]">
            30+ Automation Modules.<br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent pb-2">
              One Desktop App.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Every module automates an actual manual process your team does every month — built specifically for CA firms, CSs, lawyers and tax professionals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/download" 
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/40"
            >
              <Download className="h-5 w-5" /> Download Free
            </Link>
            <Link 
              href="/register" 
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-[15px] font-bold text-slate-700 shadow-sm border border-slate-200 transition-all hover:bg-slate-50"
            >
              Register Free
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-white border-b border-slate-200/50 py-12 relative z-20 shadow-sm">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
            <div>
              <div className="text-4xl font-black text-slate-900">30+</div>
              <div className="text-[13px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Automation Modules</div>
            </div>
            <div>
              <div className="text-4xl font-black text-slate-900">10k+</div>
              <div className="text-[13px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Downloads</div>
            </div>
            <div>
              <div className="text-4xl font-black text-slate-900">4.9/5</div>
              <div className="text-[13px] font-bold text-slate-400 mt-2 uppercase tracking-widest">User Rating</div>
            </div>
            <div>
              <div className="text-4xl font-black text-slate-900">100%</div>
              <div className="text-[13px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Secure & Offline</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 py-4 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex overflow-x-auto pb-2 -mb-2 hide-scrollbar items-center gap-2 sm:flex-wrap justify-start md:justify-center">
            <button 
              onClick={() => setFilter("all")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-[13px] font-bold whitespace-nowrap transition-all ${filter === "all" ? 'bg-slate-900 text-white shadow-md' : 'bg-white border border-slate-200/60 text-slate-600 hover:bg-slate-50 hover:border-slate-300'}`}
            >
              <Grid3X3 className="w-4 h-4" /> All Tools
            </button>
            <button 
              onClick={() => setFilter("gst")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-[13px] font-bold whitespace-nowrap transition-all ${filter === "gst" ? 'bg-indigo-600 text-white shadow-md' : 'bg-white border border-slate-200/60 text-slate-600 hover:bg-slate-50 hover:border-slate-300'}`}
            >
              <span className={`w-2 h-2 rounded-full ${filter === "gst" ? 'bg-white' : 'bg-indigo-600'}`}></span> GST
            </button>
            <button 
              onClick={() => setFilter("income-tax")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-[13px] font-bold whitespace-nowrap transition-all ${filter === "income-tax" ? 'bg-sky-600 text-white shadow-md' : 'bg-white border border-slate-200/60 text-slate-600 hover:bg-slate-50 hover:border-slate-300'}`}
            >
              <span className={`w-2 h-2 rounded-full ${filter === "income-tax" ? 'bg-white' : 'bg-sky-600'}`}></span> Income Tax
            </button>
            <button 
              onClick={() => setFilter("tally")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-[13px] font-bold whitespace-nowrap transition-all ${filter === "tally" ? 'bg-orange-600 text-white shadow-md' : 'bg-white border border-slate-200/60 text-slate-600 hover:bg-slate-50 hover:border-slate-300'}`}
            >
              <span className={`w-2 h-2 rounded-full ${filter === "tally" ? 'bg-white' : 'bg-orange-600'}`}></span> Tally
            </button>
            <button 
              onClick={() => setFilter("pdf")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-[13px] font-bold whitespace-nowrap transition-all ${filter === "pdf" ? 'bg-purple-600 text-white shadow-md' : 'bg-white border border-slate-200/60 text-slate-600 hover:bg-slate-50 hover:border-slate-300'}`}
            >
              <span className={`w-2 h-2 rounded-full ${filter === "pdf" ? 'bg-white' : 'bg-purple-600'}`}></span> PDF
            </button>
            <button 
              onClick={() => setFilter("email")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-[13px] font-bold whitespace-nowrap transition-all ${filter === "email" ? 'bg-amber-600 text-white shadow-md' : 'bg-white border border-slate-200/60 text-slate-600 hover:bg-slate-50 hover:border-slate-300'}`}
            >
              <span className={`w-2 h-2 rounded-full ${filter === "email" ? 'bg-white' : 'bg-amber-600'}`}></span> Email
            </button>
            <button 
              onClick={() => setFilter("whatsapp")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-[13px] font-bold whitespace-nowrap transition-all ${filter === "whatsapp" ? 'bg-green-600 text-white shadow-md' : 'bg-white border border-slate-200/60 text-slate-600 hover:bg-slate-50 hover:border-slate-300'}`}
            >
              <span className={`w-2 h-2 rounded-full ${filter === "whatsapp" ? 'bg-white' : 'bg-green-500'}`}></span> WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-20 sm:py-24 bg-[#FAFAFA] min-h-[50vh]">
        <div className="container mx-auto px-4 max-w-7xl">
          {filteredServices.length === 0 ? (
            <div className="text-center py-20">
              <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">No tools found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map(svc => (
                <div key={svc.id} className="group flex flex-col bg-white border border-slate-200/60 rounded-[1.5rem] overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-300 transition-all duration-300 hover:-translate-y-1">
                  <div className={`h-1.5 w-full bg-gradient-to-r ${svc.accent} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm border ${svc.bgClass} ${svc.iconColor}`}>
                      {React.cloneElement(svc.icon as React.ReactElement<any>, { className: "w-6 h-6" })}
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">{svc.title}</h3>
                    <p className="text-slate-500 text-[15px] font-medium leading-relaxed mb-8">{svc.desc}</p>
                    
                    <ul className="space-y-4 mb-8 flex-grow">
                      {svc.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-3 text-[14px] font-medium text-slate-600">
                          <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${svc.iconColor}`} />
                          <span className="leading-tight pt-0.5">{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-slate-100">
                      {svc.tags.map((tag, i) => (
                        <span key={i} className={`text-[11px] font-bold px-3 py-1.5 rounded-full border ${svc.tagColors} border-current/20`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why AutomationCafe */}
      <section className="py-24 bg-white border-y border-slate-200/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-[13px] font-bold text-blue-600 mb-6">Why Automation Cafe</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Built Differently. Designed for Your Practice.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 rounded-[1.5rem] bg-blue-50 border border-blue-100 shadow-sm text-blue-600 flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110">
                <Monitor className="w-8 h-8" />
              </div>
              <h3 className="text-[17px] font-black text-slate-900 mb-3">Windows Native</h3>
              <p className="text-slate-500 font-medium text-[15px] leading-relaxed">Desktop app that runs entirely on your PC. No browser, no internet required for core functions.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 rounded-[1.5rem] bg-emerald-50 border border-emerald-100 shadow-sm text-emerald-600 flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-[17px] font-black text-slate-900 mb-3">100% Secure & Offline</h3>
              <p className="text-slate-500 font-medium text-[15px] leading-relaxed">Your client data never leaves your machine. No cloud storage, no data sharing.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 rounded-[1.5rem] bg-orange-50 border border-orange-100 shadow-sm text-orange-600 flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110">
                <RefreshCcw className="w-8 h-8" />
              </div>
              <h3 className="text-[17px] font-black text-slate-900 mb-3">Free Regular Updates</h3>
              <p className="text-slate-500 font-medium text-[15px] leading-relaxed">Portal changes? We update the tools. Registered users get every new module free.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 rounded-[1.5rem] bg-purple-50 border border-purple-100 shadow-sm text-purple-600 flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-[17px] font-black text-slate-900 mb-3">Built for CA Firms</h3>
              <p className="text-slate-500 font-medium text-[15px] leading-relaxed">Every workflow is designed around real CA practice needs, not generic automation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="relative overflow-hidden bg-[#FAFAFA] py-24 sm:py-32">
        <div className="container relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[2.5rem] bg-slate-900 overflow-hidden shadow-2xl p-10 sm:p-16 lg:p-20 text-center">
            
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[400px] h-[400px] rounded-full bg-blue-500/20 blur-3xl opacity-80 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] rounded-full bg-indigo-500/20 blur-3xl opacity-80 pointer-events-none"></div>

            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 font-bold tracking-widest text-[11px] uppercase mb-6">
                Get Started Today
              </span>
              <h2 className="mb-6 text-4xl font-black tracking-tight text-white sm:text-5xl max-w-3xl mx-auto leading-tight">
                Start Automating Your Practice
              </h2>
              <p className="mx-auto mb-10 max-w-2xl text-[17px] leading-relaxed text-slate-400 font-medium">
                Join thousands of CA firms already saving hours every month with Automation Cafe.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  href="/download" 
                  className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-[15px] font-bold text-white shadow-xl transition-all hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-2xl hover:shadow-blue-500/30"
                >
                  <Download className="h-5 w-5" /> Download Free
                </Link>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white/5 border border-white/10 px-8 py-4 text-[15px] font-bold text-white shadow-sm transition-all hover:bg-white/10"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
