import React from 'react';
import { RefreshCcw, Calendar } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Automation Cafe refund policy. Understand our policy for custom development, digital products, subscriptions, and project cancellations.",
  alternates: {
    canonical: "https://automationcafe.in/Refund"
  }
};

export default function RefundPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24 border-b border-slate-200/50">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-blue-100/40 via-indigo-50/20 to-transparent blur-3xl opacity-70 pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/50 bg-blue-50/50 px-4 py-1.5 text-[13px] font-bold text-blue-600 mb-8 backdrop-blur-sm shadow-sm tracking-wide">
              <RefreshCcw className="w-4 h-4" />
              Refund Policy
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-black tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Refund Policy
            </h1>
            <p className="text-lg sm:text-xl text-slate-500 max-w-2xl leading-relaxed font-medium mb-8">
              We are committed to delivering high-quality automation solutions and digital services. Please review our refund policy carefully.
            </p>
            <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200/60 bg-white shadow-sm px-4 py-2 text-[13px] font-bold text-slate-500">
              <Calendar className="w-4 h-4 text-blue-500" />
              Last Updated: June 2026
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* TOC (Sidebar) */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-28 bg-[#FAFAFA] border border-slate-200/60 rounded-[1.5rem] p-6 shadow-sm">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Contents</h4>
                <nav className="space-y-1">
                  <a href="#custom" className="block text-[13px] font-bold text-slate-600 hover:text-blue-600 hover:bg-white rounded-lg px-3 py-2 transition-colors border border-transparent hover:border-slate-200/60 hover:shadow-sm">Custom Development</a>
                  <a href="#digital" className="block text-[13px] font-bold text-slate-600 hover:text-blue-600 hover:bg-white rounded-lg px-3 py-2 transition-colors border border-transparent hover:border-slate-200/60 hover:shadow-sm">Digital Products</a>
                  <a href="#subscription" className="block text-[13px] font-bold text-slate-600 hover:text-blue-600 hover:bg-white rounded-lg px-3 py-2 transition-colors border border-transparent hover:border-slate-200/60 hover:shadow-sm">Subscriptions</a>
                  <a href="#cancellation" className="block text-[13px] font-bold text-slate-600 hover:text-blue-600 hover:bg-white rounded-lg px-3 py-2 transition-colors border border-transparent hover:border-slate-200/60 hover:shadow-sm">Project Cancellation</a>
                  <a href="#delays" className="block text-[13px] font-bold text-slate-600 hover:text-blue-600 hover:bg-white rounded-lg px-3 py-2 transition-colors border border-transparent hover:border-slate-200/60 hover:shadow-sm">Service Delays</a>
                  <a href="#contact" className="block text-[13px] font-bold text-slate-600 hover:text-blue-600 hover:bg-white rounded-lg px-3 py-2 transition-colors border border-transparent hover:border-slate-200/60 hover:shadow-sm">Contact Us</a>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9 max-w-3xl">
              <p className="text-[17px] text-slate-500 leading-relaxed font-medium mb-12">
                At Automation Cafe, we are committed to delivering high-quality automation solutions, websites, software tools, and digital services. Due to the nature of digital products and custom development services, our refund policy is as follows:
              </p>

              <div id="custom" className="scroll-mt-28">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-16 mb-6">1. Custom Development Services</h2>
                <p className="text-[15px] font-medium text-slate-500 leading-relaxed mb-4">
                  For website development, automation setup, CRM implementation, software customization, and other custom services:
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "Advance payments made for project initiation are generally non-refundable.",
                    "Once project work has commenced, refunds will not be provided for completed work, resources utilized, or time invested.",
                    "In exceptional circumstances, partial refunds may be considered at Automation Cafe's sole discretion."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px] font-medium text-slate-500 leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div id="digital" className="scroll-mt-28">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-16 mb-6">2. Digital Products and Software</h2>
                <p className="text-[15px] font-medium text-slate-500 leading-relaxed mb-4">
                  Due to the digital nature of software, templates, automation tools, and downloadable products:
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "All purchases are final.",
                    "No refunds will be provided after delivery, download, activation, or access has been granted."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px] font-medium text-slate-500 leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div id="subscription" className="scroll-mt-28">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-16 mb-6">3. Subscription Services</h2>
                <p className="text-[15px] font-medium text-slate-500 leading-relaxed mb-4">
                  For recurring services such as maintenance, hosting, support, or software subscriptions:
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "Clients may cancel future renewals by providing notice before the next billing cycle.",
                    "Fees already paid for the current billing period are non-refundable unless otherwise specified."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px] font-medium text-slate-500 leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div id="cancellation" className="scroll-mt-28">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-16 mb-6">4. Project Cancellation</h2>
                <p className="text-[15px] font-medium text-slate-500 leading-relaxed mb-4">
                  If a client chooses to cancel a project after work has started:
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "Payments made for completed milestones remain non-refundable.",
                    "Any outstanding work may be paused or terminated upon cancellation."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px] font-medium text-slate-500 leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div id="delays" className="scroll-mt-28">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-16 mb-6">5. Service Delays</h2>
                <p className="text-[15px] font-medium text-slate-500 leading-relaxed mb-4">
                  Automation Cafe shall not be held responsible for delays caused by:
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "Client-side approval delays",
                    "Incomplete content or information",
                    "Third-party service providers",
                    "Technical issues beyond our control"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px] font-medium text-slate-500 leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-[15px] font-medium text-slate-500 leading-relaxed mb-6">
                  Such delays do not qualify for refunds.
                </p>
              </div>

              <div id="contact" className="scroll-mt-28 mb-12">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-16 mb-6">6. Contact Us</h2>
                <p className="text-[15px] font-medium text-slate-500 leading-relaxed mb-6">
                  For refund-related questions, please contact:
                </p>
                <div className="bg-[#FAFAFA] border border-slate-200/60 p-8 rounded-[2rem] shadow-sm">
                  <strong className="text-slate-900 font-bold block text-[17px] mb-2">Automation Cafe</strong>
                  <div className="flex items-center gap-2 text-[15px] font-medium text-slate-500">
                    <strong className="text-slate-900">Website:</strong> 
                    <a href="https://www.automationcafe.in" className="text-blue-600 font-bold hover:underline">www.automationcafe.in</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
