import React from "react";
import { ShieldCheck, Monitor, RefreshCw, Users } from "lucide-react";

export function TrustStrip() {
  const items = [
    {
      label: "Secure & Offline",
      sub: "No data leaves your PC",
      icon: <ShieldCheck className="h-6 w-6" />
    },
    {
      label: "Windows Native",
      sub: "No browser extensions needed",
      icon: <Monitor className="h-6 w-6" />
    },
    {
      label: "Regular Updates",
      sub: "Portal changes handled quickly",
      icon: <RefreshCw className="h-6 w-6" />
    },
    {
      label: "Built for CA Firms",
      sub: "Handles 100s of clients at once",
      icon: <Users className="h-6 w-6" />
    }
  ];

  return (
    <div className="border-y border-slate-200 bg-white py-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-4">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                {item.icon}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">{item.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
