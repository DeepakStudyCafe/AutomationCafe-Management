'use client';

import Head from 'next/head';
import Link from 'next/link';
import { CheckCircle2, PhoneCall, ShieldCheck, DownloadCloud, FileSpreadsheet, Lock, HelpCircle, Mail, Phone, Wrench, FileSearch, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import api from '@/lib/api';

export default function PricingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', mobile: '', email: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const planPrice = "9,999";
  const maskedPrice = "49,999";
  const discountPercent = 80;

  const faqs = [
    {
      q: "What is included in the ₹9,999/year plan?",
      a: "Everything. All 30+ automation modules are included — Bulk GST Downloads, GST Reconciliation, Tally Automation, Income Tax Suite, GSTIN Verifier, Bulk Email Automation, PDF Toolkit, JSON to Excel, and all future modules we release. No add-ons, no hidden extras."
    },
    {
      q: "How does Renewal work after the first year?",
      a: "After your initial subscription, annual renewal is available at just ₹9,999 / Year. This ensures uninterrupted access to all existing tools, new module releases, and compliance updates."
    },
    {
      q: "What is the original price and how much am I saving?",
      a: `The original price of Automation Cafe is ₹49,999. The current discounted annual plan is available at just ₹9,999 per year — a saving of 80%. This is a limited-time offer, so contact our support team to lock in this rate.`
    },
    {
      q: "How do I buy? Why can't I pay online directly?",
      a: "We handle purchases through our support team so we can verify your details, generate a proper GST invoice, and ensure smooth onboarding. Simply contact us via email or the contact form — we typically respond within 2 hours and can complete the ₹9,999/year purchase the same day."
    },
    {
      q: "Will I get a GST invoice?",
      a: "Yes. Every purchase comes with an official GST tax invoice which you can use for ITC claims and business accounting."
    },
    {
      q: "How many PCs can I install the software on?",
      a: "The licence covers a single installation. If you need multi-seat licences for a larger team, contact our support team — we can discuss bulk pricing options."
    },
    {
      q: "What if I need help after purchase?",
      a: "All purchases include dedicated support via email and phone. Email inquiries are answered within 2 hours and phone calls are answered immediately during business hours."
    }
  ];

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg('');

    try {
      const res = await api.post('/api/v1/demos/book', {
        name: formData.name,
        phone: formData.mobile,
        email: formData.email,
        message: formData.notes,
        practiceSize: 'Pricing Callback Request',
        selectedDate: new Date().toISOString().split('T')[0],
        selectedTimeSlot: 'ASAP'
      });
      setSuccessMsg('Request received! Our team will call you shortly.');
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccessMsg('');
        setFormData({ name: '', mobile: '', email: '', notes: '' });
      }, 3000);
    } catch (err) {
      alert('Could not submit request. Please call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Head>
        <title>Pricing - AutomationCafe</title>
        <meta name="description" content={`Automation Cafe annual plan — ₹${planPrice}/year (discounted from ₹${maskedPrice}). Full suite of 30+ automation modules for CA firms.`} />
      </Head>

      {/* Hero Section */}
      <section className="bg-slate-900 pt-24 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://vyaparapp.in/images/pattern.png')] opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-20 translate-x-1/3 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600 rounded-full blur-[120px] opacity-20 -translate-x-1/3 translate-y-1/2"></div>

        <div className="container relative z-10 mx-auto max-w-7xl px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-semibold text-blue-300 mb-6 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Pricing
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Simple, Honest Pricing.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              ₹{planPrice}/Year. Everything Included.
            </span>
          </h1>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Get the full Automation Cafe suite at just ₹{planPrice} per year — a massive discount from the original ₹{maskedPrice} price. All 30+ modules, free updates, dedicated support.
          </p>
        </div>
      </section>

      {/* Main Pricing Content */}
      <section className="-mt-16 relative z-20 pb-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Pricing Card */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl shadow-2xl shadow-blue-900/10 border border-slate-200 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                <div className="absolute top-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Best Value
                </div>

                <div className="p-8 md:p-12">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Annual Plan — Limited Offer</p>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">Automation Cafe — Complete Suite</h2>

                  <div className="flex flex-wrap items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-slate-500">₹</span>
                    <span className="text-6xl font-black text-slate-900 tracking-tighter">{planPrice}</span>
                    <span className="text-lg font-bold text-slate-500">/year</span>
                    <span className="text-xl text-slate-400 line-through font-semibold ml-2">₹{maskedPrice}</span>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded border border-green-200 ml-2">SAVE {discountPercent}%</span>
                  </div>

                  <p className="text-sm font-medium text-slate-500 mb-6">Billed annually · All 30+ modules included · Free updates</p>

                  <div className="bg-blue-50/80 border border-blue-100 rounded-xl p-4 flex items-center gap-3 mb-8">
                    <RefreshCw className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <p className="text-sm font-bold text-blue-900">Renewal: <span className="text-blue-700">₹9,999</span> / Year</p>
                  </div>

                  <div className="border-t border-slate-100 pt-8 mb-8">
                    <ul className="space-y-4">
                      {[
                        "Annual Renewal — ₹9,999 / Year",
                        "30+ Automation Modules — all included, nothing extra",
                        "Bulk GST Downloads — GSTR-1, 2B, 3B, Challans, IMS",
                        "GST Reconciliation — GSTR-2B vs Tally / purchase register",
                        "AI-Powered Invoice to Tally (PDF & Excel) — AI auto-extracts & converts PDF invoices",
                        "Tally XML Automation — GSTR-2B & voucher auto-mapping & import",
                        "Income Tax Suite — 26AS / AIS / TIS, demands, refunds, ITR Bot",
                        "GSTIN Verifier — bulk lookup with Excel export",
                        "Bulk Email Automation — Outlook integration, auto-filled",
                        "PDF Toolkit — merge, split, compress, redact",
                        "JSON & 3B to Excel — GSTR-1 JSON, 3B PDF converter",
                        "Free updates for all future modules in this plan",
                        "Dedicated support via email & phone"
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 font-medium">
                            {feature.includes('—') ? (
                              <>
                                <strong className="text-slate-900">{feature.split('—')[0]}</strong> — {feature.split('—')[1]}
                              </>
                            ) : feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a href="/payment/checkout" className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-1">
                    Buy Now — ₹{planPrice}/year
                  </a>
                  <p className="text-center text-xs text-slate-500 font-medium mt-4 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> Secured by Razorpay · GST invoice provided · Instant activation
                  </p>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-5 space-y-8">

              {/* How to Buy Card */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">How to Purchase</p>
                <h3 className="text-xl font-bold text-slate-900 mb-6">Buying is Simple</h3>

                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center flex-shrink-0 border border-blue-100">1</div>
                    <div>
                      <p className="font-bold text-slate-900 mb-1">Contact our support team</p>
                      <p className="text-sm text-slate-600">Reach us via email, phone, or the contact form.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center flex-shrink-0 border border-blue-100">2</div>
                    <div>
                      <p className="font-bold text-slate-900 mb-1">Get your invoice</p>
                      <p className="text-sm text-slate-600">We'll send a GST invoice with payment details.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center flex-shrink-0 border border-blue-100">3</div>
                    <div>
                      <p className="font-bold text-slate-900 mb-1">Instant activation</p>
                      <p className="text-sm text-slate-600">Receive your licence key and download link immediately after payment.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <button onClick={() => setIsModalOpen(true)} className="w-full bg-slate-50 hover:bg-blue-50 text-blue-700 font-bold py-3 px-4 rounded-xl border border-slate-200 hover:border-blue-200 transition-all flex items-center justify-center gap-2">
                    <PhoneCall className="w-4 h-4" /> Request Instant Callback
                  </button>
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Reach Us Directly</p>

                <div className="space-y-5">
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-0.5">Sales Inquiry</p>
                      <a href="tel:+919773844877" className="block text-sm font-bold text-slate-900 hover:text-blue-600">+91 97738 44877</a>
                      <a href="mailto:sales@studycafe.in" className="block text-xs font-medium text-slate-600 hover:text-blue-600">sales@studycafe.in</a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-0.5">Customer Support</p>
                      <a href="tel:+919625080264" className="block text-sm font-bold text-slate-900 hover:text-emerald-600">+91 96250 80264</a>
                      <a href="mailto:support@studycafe.in" className="block text-xs font-medium text-slate-600 hover:text-emerald-600">support@studycafe.in</a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-purple-600 uppercase tracking-wider mb-0.5">Technical Support</p>
                      <a href="tel:+919218192459" className="block text-sm font-bold text-slate-900 hover:text-purple-600">+91 92181 92459</a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Modules Included */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Everything Included</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-10">All Modules. One Price.</h2>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              { name: "Bulk GST Downloads", color: "bg-indigo-600" },
              { name: "GSTIN Verifier", color: "bg-emerald-600" },
              { name: "GST Reconciliation", color: "bg-teal-700" },
              { name: "JSON & 3B to Excel", color: "bg-pink-600" },
              { name: "AI Invoice to Tally", color: "bg-orange-600" },
              { name: "Tally XML Automation", color: "bg-orange-600" },
              { name: "Income Tax Suite", color: "bg-sky-600" },
              { name: "26AS / AIS / TIS Bulk", color: "bg-sky-600" },
              { name: "Demand & Refund Checker", color: "bg-sky-600" },
              { name: "ITR Bot", color: "bg-sky-600" },
              { name: "Bulk Email Automation", color: "bg-amber-600" },
              { name: "PDF Toolkit", color: "bg-violet-600" },
              { name: "+ Future Modules", color: "bg-rose-500" }
            ].map((mod, i) => (
              <div key={i} className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:shadow-md transition-shadow cursor-default">
                <span className={`w-2 h-2 rounded-full ${mod.color}`}></span>
                {mod.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Elements */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4 shadow-sm border border-blue-200/50">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-900 mb-1">100% Secure</h4>
              <p className="text-xs text-slate-500 font-medium">Data never leaves your machine</p>
            </div>
            <div className="p-4">
              <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-4 shadow-sm border border-emerald-200/50">
                <RefreshCw className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-900 mb-1">Free Updates Included</h4>
              <p className="text-xs text-slate-500 font-medium">New modules ship free</p>
            </div>
            <div className="p-4">
              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-4 shadow-sm border border-purple-200/50">
                <FileSearch className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-900 mb-1">GST Invoice Provided</h4>
              <p className="text-xs text-slate-500 font-medium">Official tax invoice on purchase</p>
            </div>
            <div className="p-4">
              <div className="w-16 h-16 mx-auto bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-4 shadow-sm border border-orange-200/50">
                <Zap className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-900 mb-1">Instant Activation</h4>
              <p className="text-xs text-slate-500 font-medium">Get started immediately</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-slate-200 rounded-xl overflow-hidden transition-all duration-200 bg-white shadow-sm hover:border-blue-200">
                <button
                  className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-bold text-slate-900 text-lg">{faq.q}</span>
                  <span className={`transform transition-transform duration-200 flex-shrink-0 ml-4 ${activeFaq === index ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                <div className={`transition-all duration-300 ease-in-out ${activeFaq === index ? 'max-h-96 opacity-100 pb-5 px-6' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                  <p className="text-slate-600 leading-relaxed font-medium text-sm pt-2 border-t border-slate-100">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-600 font-medium mb-4">Still have questions?</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-full transition-all">
              <Mail className="w-4 h-4" /> Ask Us Anything
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-slate-900 py-24 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[url('https://vyaparapp.in/images/pattern.png')] opacity-10"></div>
        <div className="container relative z-10 mx-auto max-w-3xl px-4">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto">
            Contact our support team today. We'll get you set up with the full Automation Cafe suite — same day.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/payment/checkout" className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold text-lg py-4 px-10 rounded-full shadow-lg shadow-white/10 hover:scale-105 transition-all">
              <Lock className="w-5 h-5" /> Buy Now — ₹{planPrice}
            </a>
            <Link href="/services" className="inline-flex items-center gap-2 border-2 border-slate-700 text-slate-300 font-bold text-lg py-4 px-10 rounded-full hover:bg-slate-800 hover:text-white transition-all">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Callback Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h3 className="text-xl font-bold mb-1 flex items-center gap-2"><PhoneCall className="w-5 h-5" /> Request Instant Callback</h3>
              <p className="text-blue-100 text-sm">Speak to an automation consultant within 5–10 minutes.</p>
            </div>

            <div className="p-6">
              {successMsg ? (
                <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-100 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                  <p className="font-bold">{successMsg}</p>
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text" required
                      value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                      placeholder="e.g. CA Rahul Sharma"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Mobile Number *</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-4 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-slate-500 font-bold">+91</span>
                      <input
                        type="tel" required pattern="[0-9]{10}" maxLength={10}
                        value={formData.mobile} onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-r-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                        placeholder="10-digit number"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                      placeholder="name@firm.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Requirements / Question (Optional)</label>
                    <textarea
                      rows={2}
                      value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all resize-none"
                      placeholder="e.g. Need GST invoice, multi-user license..."
                    ></textarea>
                  </div>
                  <button
                    type="submit" disabled={submitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {submitting ? 'Submitting...' : <><PhoneCall className="w-5 h-5" /> Request Callback Now</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
