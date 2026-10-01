import React from "react";

export function CategoryStrip() {
  const categories = [
    { name: "GST Returns", color: "bg-indigo-600" },
    { name: "GST Reconciliation", color: "bg-teal-600" },
    { name: "AI Invoice to Tally (PDF)", color: "bg-amber-800" },
    { name: "Income Tax", color: "bg-emerald-600" },
    { name: "Bulk Emails", color: "bg-amber-600" },
    { name: "PDF Toolkit", color: "bg-violet-600" },
  ];

  return (
    <div className="border-b border-slate-200 bg-white py-5">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {categories.map((cat, idx) => (
            <a
              key={idx}
              href="#features"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
            >
              <span className={`h-2 w-2 rounded-full ${cat.color}`}></span>
              {cat.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
