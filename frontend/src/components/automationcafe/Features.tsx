import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  CloudDownload,
  ShieldCheck,
  ArrowLeftRight,
  FileSpreadsheet,
  Network,
  Calculator,
  Mail,
  FileText,
  MessageCircle
} from "lucide-react";

export function Features() {
  const features = [
    {
      title: "Bulk GST Downloads",
      desc: "Download GSTR-1 (JSON + PDF), GSTR-2B, GSTR-3B, GST Challans and IMS data for all clients at once via automated browser — no manual portal login loops.",
      icon: <CloudDownload className="h-6 w-6 text-indigo-600" />,
      iconBg: "bg-indigo-100",
      accent: "border-indigo-600",
      tags: [
        { name: "GSTR-1 PDF", bg: "bg-indigo-100", color: "text-indigo-700" },
        { name: "GSTR-2B", bg: "bg-indigo-100", color: "text-indigo-700" },
        { name: "GSTR-3B", bg: "bg-indigo-100", color: "text-indigo-700" },
        { name: "Challan", bg: "bg-indigo-100", color: "text-indigo-700" },
        { name: "IMS", bg: "bg-indigo-100", color: "text-indigo-700" }
      ]
    },
    {
      title: "GSTIN Verifier",
      desc: "Verify hundreds of GSTINs in bulk from the GST portal. Extracts live filing history, return status, trade name and compliance details — all exported to Excel.",
      icon: <ShieldCheck className="h-6 w-6 text-emerald-600" />,
      iconBg: "bg-emerald-100",
      accent: "border-emerald-600",
      tags: [
        { name: "Bulk Lookup", bg: "bg-emerald-100", color: "text-emerald-700" },
        { name: "Filing History", bg: "bg-emerald-100", color: "text-emerald-700" },
        { name: "Excel Export", bg: "bg-emerald-100", color: "text-emerald-700" }
      ]
    },
    {
      title: "GST Reconciliation",
      desc: "Reconcile GSTR-2B portal data against your Tally or purchase register. Automatically matches invoices, flags mismatches, and exports a detailed difference report.",
      icon: <ArrowLeftRight className="h-6 w-6 text-teal-600" />,
      iconBg: "bg-teal-100",
      accent: "border-teal-600",
      tags: [
        { name: "GSTR-2B vs Books", bg: "bg-teal-100", color: "text-teal-700" },
        { name: "ITC Maximiser", bg: "bg-teal-100", color: "text-teal-700" },
        { name: "Mismatch Report", bg: "bg-teal-100", color: "text-teal-700" }
      ]
    },
    {
      title: "JSON & 3B to Excel",
      desc: "Convert GSTR-1 JSON portal exports into structured multi-sheet Excel workbooks. Also converts GSTR-3B PDFs to Excel. Consolidate multiple GSTR-1 files into one unified report.",
      icon: <FileSpreadsheet className="h-6 w-6 text-pink-600" />,
      iconBg: "bg-pink-100",
      accent: "border-pink-600",
      tags: [
        { name: "GSTR-1 JSON → Excel", bg: "bg-pink-100", color: "text-pink-700" },
        { name: "3B PDF → Excel", bg: "bg-pink-100", color: "text-pink-700" },
        { name: "GSTR-1 Consolidation", bg: "bg-pink-100", color: "text-pink-700" }
      ]
    },
    {
      title: "AI Invoice to Tally & Tally Automation",
      desc: "AI-powered extraction of PDF & scanned invoices, Excel sheets, and GSTR-2B data into Tally-ready XML outputs. Auto-maps supplier/customer ledgers and generates vouchers instantly.",
      icon: <Network className="h-6 w-6 text-orange-600" />,
      iconBg: "bg-orange-100",
      accent: "border-orange-600",
      tags: [
        { name: "AI PDF Invoice → Tally", bg: "bg-orange-100", color: "text-orange-700" },
        { name: "GSTR-2B → Tally XML", bg: "bg-orange-100", color: "text-orange-700" },
        { name: "Auto Mapping", bg: "bg-orange-100", color: "text-orange-700" },
        { name: "Batch Import", bg: "bg-orange-100", color: "text-orange-700" }
      ]
    },
    {
      title: "Income Tax Suite",
      desc: "Complete income tax workflow automation. Download 26AS, AIS and TIS reports in bulk, check outstanding demands and refund status for all clients, and automate ITR filing with the ITR bot.",
      icon: <Calculator className="h-6 w-6 text-sky-600" />,
      iconBg: "bg-sky-100",
      accent: "border-sky-600",
      tags: [
        { name: "26AS / AIS / TIS", bg: "bg-sky-100", color: "text-sky-700" },
        { name: "Demand Checker", bg: "bg-sky-100", color: "text-sky-700" },
        { name: "Refund Checker", bg: "bg-sky-100", color: "text-sky-700" },
        { name: "ITR Bot", bg: "bg-sky-100", color: "text-sky-700" }
      ]
    },
    {
      title: "Bulk Email Automation",
      desc: "Send personalised bulk emails via Outlook in one click. Request GST return data from clients, dispatch invoices with PDF attachments, and send payment reminders — all auto-filled from Excel.",
      icon: <Mail className="h-6 w-6 text-amber-600" />,
      iconBg: "bg-amber-100",
      accent: "border-amber-600",
      tags: [
        { name: "GST Return Request", bg: "bg-amber-100", color: "text-amber-700" },
        { name: "Invoice Sender", bg: "bg-amber-100", color: "text-amber-700" },
        { name: "Payment Reminder", bg: "bg-amber-100", color: "text-amber-700" }
      ]
    },
    {
      title: "PDF Toolkit",
      desc: "A full PDF utility suite built-in. Merge multiple files, split by page range, extract specific pages, compress to reduce file size, and permanently redact sensitive information from documents.",
      icon: <FileText className="h-6 w-6 text-violet-600" />,
      iconBg: "bg-violet-100",
      accent: "border-violet-600",
      tags: [
        { name: "Merge", bg: "bg-violet-100", color: "text-violet-700" },
        { name: "Split", bg: "bg-violet-100", color: "text-violet-700" },
        { name: "Extract", bg: "bg-violet-100", color: "text-violet-700" },
        { name: "Compress", bg: "bg-violet-100", color: "text-violet-700" },
        { name: "Redact", bg: "bg-violet-100", color: "text-violet-700" }
      ]
    },
    {
      title: "WhatsApp Automation",
      desc: "Connect your WhatsApp Business account to automate client communications. Send important compliance updates, document collection requests, and tax filing reminders directly to your clients.",
      icon: <MessageCircle className="h-6 w-6 text-green-600" />,
      iconBg: "bg-green-100",
      accent: "border-green-600",
      tags: [
        { name: "Tax Filing Reminders", bg: "bg-green-100", color: "text-green-700" },
        { name: "Document Requests", bg: "bg-green-100", color: "text-green-700" },
        { name: "Template Messages", bg: "bg-green-100", color: "text-green-700" },
        { name: "Client Updates", bg: "bg-green-100", color: "text-green-700" }
      ]
    }
  ];

  return (
    <section id="features" className="bg-slate-50 py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Official Recognition & Partner Badges */}
        <div className="mx-auto mb-20 max-w-4xl text-center">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-5 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
              <BadgeCheck className="h-4 w-4" />
              Official Tech Provider & Authorised Partner
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <div className="flex h-[120px] w-full max-w-[320px] items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-md sm:w-auto">
              <Image
                src="/Images/partners/Meta_tech_provider.svg"
                alt="Meta Tech Provider"
                width={200}
                height={70}
                className="h-[70px] w-auto object-contain transition-transform hover:scale-105"
              />
            </div>
            <Link
              href="/tallypartner"
              className="flex h-[120px] w-full max-w-[320px] items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-md sm:w-auto"
              title="Tally Authorised Partner — Join Tally Partner Program"
            >
              <Image
                src="/Images/partners/Tally_authorised_partner.svg"
                alt="Tally Authorised Partner"
                width={200}
                height={70}
                className="h-[70px] w-auto object-contain transition-transform hover:scale-105"
              />
            </Link>
          </div>
        </div>

        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-blue-600">What&apos;s Inside</p>
          <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Everything a CA firm needs,<br />in a single desktop app
          </h2>
          <p className="text-lg leading-relaxed text-slate-600">
            Built on real portal workflows. Every module automates an actual manual process your team does every month.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1.5 hover:border-transparent hover:shadow-xl"
            >
              {/* Top Accent Line */}
              <div className={`absolute left-0 right-0 top-0 h-1 opacity-0 transition-opacity group-hover:opacity-100 ${feat.iconBg.replace('100', '500')}`}></div>

              <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${feat.iconBg}`}>
                {feat.icon}
              </div>

              <h3 className="mb-3 text-lg font-bold text-slate-900 leading-snug">
                {feat.title}
              </h3>

              <p className="mb-6 flex-grow text-sm leading-relaxed text-slate-600">
                {feat.desc}
              </p>

              <div className="mt-auto flex flex-wrap gap-2">
                {feat.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${tag.bg} ${tag.color}`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
