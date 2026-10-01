'use client';

export default function DevicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Devices</h2>
          <p className="text-sm text-slate-500">Manage user devices and sessions.</p>
        </div>
      </div>
      <div className="bg-white rounded-xl border shadow-sm p-12 text-center">
        <p className="text-slate-500 mb-4">This module is currently being migrated from the legacy application.</p>
        <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full">Coming Soon</span>
      </div>
    </div>
  );
}
