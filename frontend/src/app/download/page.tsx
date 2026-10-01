'use client';

import Head from 'next/head';
import Link from 'next/link';
import { Download, ShieldCheck, Monitor, FileDown, AlertTriangle, PlaySquare, CheckCircle, Lightbulb } from 'lucide-react';
import Image from 'next/image';

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-100 selection:text-blue-900">
      <Head>
        <title>Download Automation Suite - AutomationCafe</title>
        <meta name="description" content="Download Automation Suite for Windows. A single secure desktop app to automate your GST, Tally, and income tax workflows. No installation wizard required." />
      </Head>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200 pt-20 pb-16 lg:pt-28 lg:pb-24">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
          <div className="w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-3xl opacity-60"></div>
        </div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3">
          <div className="w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-3xl opacity-60"></div>
        </div>

        <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-1.5 text-sm font-semibold text-blue-700 mb-6 shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Windows Desktop Edition
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Download <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Automation Suite</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            Get started in minutes. Follow the steps below to install and activate your copy. A single secure desktop app to automate your GST, Tally, and income tax workflows.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/Downloads/AutomationCafe2.0.exe"
              className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/40 w-full sm:w-auto overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              <Download className="h-5 w-5 relative z-10" />
              <span className="relative z-10">Download Automation Cafe 2.0</span>
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-sm font-medium text-slate-500">
            <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% Safe & Secure</div>
            <div className="hidden sm:flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> No installation wizard required</div>
          </div>
        </div>
      </section>

      {/* Installation Steps Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Installation Steps</h2>
            <p className="text-lg text-slate-600">
              Windows may show a security prompt for unsigned apps — here's exactly what to do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="absolute -top-5 -left-5 w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 mt-2">Download the File</h3>

              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 mb-5 flex flex-col items-center justify-center text-center h-48">
                <FileDown className="w-12 h-12 text-blue-500 mb-3" />
                <p className="font-semibold text-slate-700 text-sm mb-2">AutomationSuite.exe</p>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mb-2 overflow-hidden">
                  <div className="bg-emerald-500 h-1.5 rounded-full w-full"></div>
                </div>
                <p className="text-emerald-600 text-xs font-medium flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Download complete</p>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                Click the <strong>Download</strong> button above. Save the file anywhere on your PC — no installation wizard is needed.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="absolute -top-5 -left-5 w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 mt-2">Windows SmartScreen</h3>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-5 h-48 shadow-inner overflow-hidden flex flex-col">
                <div className="bg-slate-800 rounded-t-lg px-3 py-1.5 flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  <span className="text-[10px] text-slate-300 ml-2 font-medium">Windows Security</span>
                </div>
                <div className="bg-white p-3 flex-1 flex flex-col items-center text-center border-x border-b border-slate-200 rounded-b-lg">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white mb-2">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-bold text-slate-800 mb-1">Windows protected your PC</p>
                  <p className="text-[10px] text-slate-500 mb-2 leading-tight">Microsoft Defender SmartScreen prevented an unrecognized app from starting.</p>
                  <p className="text-[10px] text-blue-600 underline font-medium cursor-pointer animate-pulse mt-auto">More info ↓</p>
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                This is normal for unsigned apps. Click <strong className="text-blue-600">"More info"</strong> to reveal the Run Anyway button.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="absolute -top-5 -left-5 w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 mt-2">Click "Run Anyway"</h3>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-5 h-48 shadow-inner overflow-hidden flex flex-col">
                <div className="bg-slate-800 rounded-t-lg px-3 py-1.5 flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  <span className="text-[10px] text-slate-300 ml-2 font-medium">Windows Security</span>
                </div>
                <div className="bg-white p-3 flex-1 flex flex-col border-x border-b border-slate-200 rounded-b-lg">
                  <p className="text-xs font-bold text-slate-800 mb-1">Windows protected your PC</p>
                  <div className="text-[9px] text-slate-600 mb-2">
                    <span className="font-semibold">App:</span> AutomationSuite.exe<br />
                    <span className="font-semibold">Publisher:</span> Unknown publisher
                  </div>
                  <div className="mt-auto flex justify-end gap-1.5">
                    <div className="px-2 py-1 border border-slate-300 rounded text-[9px] bg-slate-50 text-slate-700">Don't run</div>
                    <div className="px-2 py-1 border border-red-600 rounded text-[9px] bg-red-500 text-white font-medium">Run anyway</div>
                  </div>
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                After clicking "More info", the <strong className="text-red-600">"Run anyway"</strong> button appears. Click it to launch Automation Suite.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="absolute -top-5 -left-5 w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                4
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 mt-2">Login & Activate</h3>

              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 mb-5 flex flex-col justify-center h-48">
                <p className="text-center font-bold text-slate-700 text-xs mb-3">Automation Suite — Login</p>
                <div className="space-y-2 mb-3">
                  <div className="bg-white border border-slate-200 rounded flex items-center px-2 py-1.5">
                    <div className="w-3 h-3 rounded-full bg-slate-200 mr-2"></div>
                    <div className="h-2 w-16 bg-slate-200 rounded"></div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded flex items-center px-2 py-1.5">
                    <div className="w-3 h-3 rounded-full bg-slate-200 mr-2"></div>
                    <div className="h-2 w-12 bg-slate-200 rounded"></div>
                  </div>
                </div>
                <div className="bg-emerald-500 text-white text-[10px] font-bold text-center py-1.5 rounded">Login</div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                Enter the <strong>email</strong> and <strong>password</strong> you registered with on our website to activate the tool.
              </p>
            </div>
          </div>

          {/* Tip Box */}
          <div className="mt-16 max-w-4xl mx-auto bg-amber-50 rounded-2xl p-6 md:p-8 border border-amber-200 flex flex-col sm:flex-row gap-6 items-start shadow-sm">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Why does Windows show this warning?</h4>
              <p className="text-slate-700 mb-3 leading-relaxed">
                Windows SmartScreen flags apps that don't have a paid digital code-signing certificate. Automation Suite is completely safe — the warning appears only because the app is not yet digitally signed. You can verify this by checking the publisher info on the dialog.
              </p>
              <p className="text-slate-700 font-medium">
                Not registered yet? <Link href="/account/register" className="text-blue-600 hover:text-blue-700 hover:underline">Register here first →</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://vyaparapp.in/images/pattern.png')] opacity-10"></div>
        <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Ready to automate your GST workflow?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Download Automation Suite and process returns for hundreds of clients in minutes.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/Downloads/AutomationCafe2.0.exe"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-blue-600 shadow-xl transition-all hover:bg-blue-50 hover:scale-105"
            >
              <Download className="w-5 h-5" />
              Automation Cafe 2.0
            </a>
            <Link
              href="/account/register"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 bg-transparent px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/10"
            >
              Register License
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
