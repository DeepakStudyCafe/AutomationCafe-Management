"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Megaphone, 
  IndianRupee, 
  PlayCircle, 
  Infinity as InfinityIcon, 
  Gift, 
  ArrowRightCircle, 
  Banknote, 
  BarChart2, 
  CalendarCheck,
  Users,
  Calculator,
  Briefcase,
  Laptop,
  ChevronDown
} from 'lucide-react';

export function ReferralClient() {
  const [openFaq, setOpenFaq] = useState<number>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  const FAQS = [
    {
      q: "How do I get paid?",
      a: "Commissions are calculated and paid directly to your registered bank account within 30 days from the date of sale."
    },
    {
      q: "Is there a minimum payout threshold?",
      a: "Yes, the minimum payout threshold is ₹2000. If your earnings are below this in a given month, they carry forward to the next month."
    },
    {
      q: "How long does approval take?",
      a: "Approval is instant! Just navigate to your Referral Dashboard and your account will automatically be enrolled in the program."
    },
    {
      q: "Can I refer other Referrals?",
      a: "Currently, the up to 30% commission applies to end-user subscriptions only. Contact us at contact@studycafe.in to discuss partnership or sub-affiliate opportunities."
    },
    {
      q: "What promotional materials are provided?",
      a: "We provide banners, social media creatives, and product demo videos to help you easily recommend AutomationCafe to your network."
    },
    {
      q: "Is there any cost to join the program?",
      a: "No. Joining the AutomationCafe Referral Program is completely free. There are no hidden charges or subscription fees."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-32 bg-slate-900 text-center">
        <div className="absolute inset-0 bg-[url('/Images/grid.svg')] bg-center opacity-[0.035]"></div>
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[800px] h-[800px] rounded-full bg-indigo-500/20 blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[800px] h-[800px] rounded-full bg-blue-500/20 blur-3xl opacity-50 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 backdrop-blur-sm px-4 py-1.5 text-[13px] font-bold text-blue-300 mb-6 tracking-wide">
            <Megaphone className="w-4 h-4 text-blue-400" />
            Referral Program
          </div>
          
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-2.5 text-[15px] font-bold text-white shadow-lg shadow-emerald-500/30">
              <IndianRupee className="w-5 h-5" />
              Earn Up to 30% Commission on Every Sale
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-[1.1]">
            Promote AutomationCafe.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Earn Every Month.</span>
          </h1>
          
          <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
            Join our Referral Program, share your unique referral link with your network, and earn <strong className="text-emerald-400 font-bold">up to 30% commission</strong> on every successful subscription — month after month.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 text-[15px] font-bold text-white shadow-xl shadow-blue-500/30 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-500/40"
            >
              <ArrowRightCircle className="w-5 h-5" />
              Go to Dashboard
            </Link>
            <a 
              href="#how-it-works" 
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/5 border border-white/10 px-8 py-3.5 text-[15px] font-bold text-white shadow-sm transition-all hover:bg-white/10"
            >
              <PlayCircle className="w-5 h-5" />
              How It Works
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-16 max-w-3xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400 mb-1">Up to 30%</div>
              <p className="text-slate-400 text-sm font-medium">Commission Per Sale</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-2xl md:text-3xl font-black text-white mb-1">
                <InfinityIcon className="w-8 h-8 mx-auto text-blue-400" />
              </div>
              <p className="text-slate-400 text-sm font-medium">No Referral Cap</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-2xl md:text-3xl font-black text-white mb-1">Free</div>
              <p className="text-slate-400 text-sm font-medium">To Join</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-white border-b border-slate-200/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-[13px] font-bold text-blue-600 mb-6 uppercase tracking-widest">Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">How It Works</h2>
            <p className="text-slate-500 font-medium text-[16px] max-w-2xl mx-auto">Start earning in 4 simple steps. No technical skills required — just share and earn.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#FAFAFA] border border-slate-200/60 rounded-[1.5rem] p-8 relative overflow-hidden group hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-black text-[17px] flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">1</div>
              <h3 className="text-[17px] font-black text-slate-900 mb-3 tracking-tight">Join Instantly</h3>
              <p className="text-slate-500 font-medium text-[14px] leading-relaxed">Simply log into your AutomationCafe account and visit the Referral Dashboard to activate your profile.</p>
            </div>

            <div className="bg-[#FAFAFA] border border-slate-200/60 rounded-[1.5rem] p-8 relative overflow-hidden group hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-black text-[17px] flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">2</div>
              <h3 className="text-[17px] font-black text-slate-900 mb-3 tracking-tight">Get Your Unique Link</h3>
              <p className="text-slate-500 font-medium text-[14px] leading-relaxed">Receive your personalized referral link and share it with your network, colleagues, or clients.</p>
            </div>

            <div className="bg-[#FAFAFA] border border-slate-200/60 rounded-[1.5rem] p-8 relative overflow-hidden group hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-black text-[17px] flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">3</div>
              <h3 className="text-[17px] font-black text-slate-900 mb-3 tracking-tight">Share & Promote</h3>
              <p className="text-slate-500 font-medium text-[14px] leading-relaxed">Share your link via WhatsApp, Telegram, Email, LinkedIn, or directly with your professional network.</p>
            </div>

            <div className="bg-[#FAFAFA] border border-slate-200/60 rounded-[1.5rem] p-8 relative overflow-hidden group hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-black text-[17px] flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">4</div>
              <h3 className="text-[17px] font-black text-slate-900 mb-3 tracking-tight">Earn Up to 30%</h3>
              <p className="text-slate-500 font-medium text-[14px] leading-relaxed">For every user who subscribes via your link, you earn up to 30% of the subscription value. Payments processed monthly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-[#FAFAFA] border-b border-slate-200/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-[13px] font-bold text-blue-600 mb-6 uppercase tracking-widest">Why Join Us</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-6">Benefits of the Program</h2>
              <p className="text-slate-500 font-medium text-[16px] leading-relaxed mb-8">
                AutomationCafe's Referral Program is designed to reward any user who believes in the power of automation and shares it with their network.
              </p>
              <Link 
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 text-[15px] font-bold text-white shadow-xl shadow-blue-500/30 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-500/40"
              >
                Go to Dashboard
                <ArrowRightCircle className="w-5 h-5 ml-1" />
              </Link>
            </div>

            <div className="lg:col-span-7">
              <div className="space-y-4">
                <div className="flex items-start gap-5 bg-white border border-slate-200/60 p-6 rounded-[1.25rem] shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Banknote className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-slate-900 mb-1">Up to 30% Commission on Every Sale</h3>
                    <p className="text-slate-500 text-[14px] font-medium leading-relaxed">Earn up to 30% commission on every successful subscription made through your referral link — no tiers, no conditions.</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 bg-white border border-slate-200/60 p-6 rounded-[1.25rem] shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <InfinityIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-slate-900 mb-1">No Cap on Earnings</h3>
                    <p className="text-slate-500 text-[14px] font-medium leading-relaxed">Refer as many people as you want. There is no upper limit on how much you can earn — the more you share, the more you earn.</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 bg-white border border-slate-200/60 p-6 rounded-[1.25rem] shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                    <BarChart2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-slate-900 mb-1">Real-Time Dashboard</h3>
                    <p className="text-slate-500 text-[14px] font-medium leading-relaxed">Track your clicks, conversions, and earnings in a dedicated referral dashboard — full transparency on your performance.</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 bg-white border border-slate-200/60 p-6 rounded-[1.25rem] shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <CalendarCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-slate-900 mb-1">Monthly Payouts</h3>
                    <p className="text-slate-500 text-[14px] font-medium leading-relaxed">Commissions are calculated and paid out every month directly to your bank account — hassle-free and on time.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Who Can Join */}
      <section className="py-24 bg-white border-b border-slate-200/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-[13px] font-bold text-blue-600 mb-6 uppercase tracking-widest">Who Can Join</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">Perfect for Professionals & Users</h2>
            <p className="text-slate-500 font-medium text-[16px] max-w-2xl mx-auto">Anyone who uses or recommends automation tools can join and earn.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#FAFAFA] border border-slate-200/60 rounded-[1.5rem] p-8 text-center hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="w-16 h-16 rounded-[1.25rem] bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-5">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-[16px] font-bold text-slate-900 mb-2">Colleagues & Peers</h3>
              <p className="text-slate-500 text-[14px] font-medium leading-relaxed">Share with fellow professionals and accountants who can benefit from automating their workflows.</p>
            </div>

            <div className="bg-[#FAFAFA] border border-slate-200/60 rounded-[1.5rem] p-8 text-center hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="w-16 h-16 rounded-[1.25rem] bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-5">
                <Calculator className="w-8 h-8" />
              </div>
              <h3 className="text-[16px] font-bold text-slate-900 mb-2">Chartered Accountants</h3>
              <p className="text-slate-500 text-[14px] font-medium leading-relaxed">Recommend AutomationCafe to other CA firms, WhatsApp groups, and your professional community.</p>
            </div>

            <div className="bg-[#FAFAFA] border border-slate-200/60 rounded-[1.5rem] p-8 text-center hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="w-16 h-16 rounded-[1.25rem] bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5">
                <Briefcase className="w-8 h-8" />
              </div>
              <h3 className="text-[16px] font-bold text-slate-900 mb-2">Freelancers & Consultants</h3>
              <p className="text-slate-500 text-[14px] font-medium leading-relaxed">Help your clients or other tax consultants save time and earn a commission on their subscription.</p>
            </div>

            <div className="bg-[#FAFAFA] border border-slate-200/60 rounded-[1.5rem] p-8 text-center hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="w-16 h-16 rounded-[1.25rem] bg-orange-50 text-orange-600 flex items-center justify-center mx-auto mb-5">
                <Laptop className="w-8 h-8" />
              </div>
              <h3 className="text-[16px] font-bold text-slate-900 mb-2">Existing Users</h3>
              <p className="text-slate-500 text-[14px] font-medium leading-relaxed">Love our tools? Get rewarded just for referring others to use the same tools that help you daily.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-[13px] font-bold text-blue-600 mb-6 uppercase tracking-widest">FAQs</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div 
                key={index} 
                className={`bg-white border rounded-[1.25rem] overflow-hidden transition-all duration-300 ${openFaq === index ? 'border-blue-500 shadow-md ring-4 ring-blue-500/10' : 'border-slate-200/80 hover:border-blue-300'}`}
              >
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className={`font-bold text-[15px] ${openFaq === index ? 'text-blue-700' : 'text-slate-900'}`}>
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-slate-500 text-[15px] font-medium leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="relative overflow-hidden bg-slate-900 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[url('/Images/grid.svg')] bg-center opacity-[0.035]"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[400px] h-[400px] rounded-full bg-blue-500/20 blur-3xl opacity-80 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] rounded-full bg-indigo-500/20 blur-3xl opacity-80 pointer-events-none"></div>

        <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 font-bold tracking-widest text-[11px] uppercase mb-6">
            Ready to Earn?
          </span>
          <h2 className="mb-6 text-4xl font-black tracking-tight text-white sm:text-5xl max-w-3xl mx-auto leading-tight">
            Start Earning <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Up to 30% Commission</span> Today
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-[17px] leading-relaxed text-slate-400 font-medium">
            Join thousands of professionals already promoting AutomationCafe. Activate your referral account and start earning passive income by recommending our tools.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link 
              href="/dashboard"
              className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-[15px] font-bold text-white shadow-xl transition-all hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-2xl hover:shadow-blue-500/30"
            >
              <ArrowRightCircle className="h-5 w-5" /> Start Referring
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/5 border border-white/10 px-8 py-4 text-[15px] font-bold text-white shadow-sm transition-all hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>

          <p className="text-slate-500 text-[13px] font-medium">
            Questions? Email us at{' '}
            <a href="mailto:contact@studycafe.in" className="text-blue-400 hover:underline">contact@studycafe.in</a>
            {' '}or{' '}
            <a href="mailto:info@studycafe.in" className="text-blue-400 hover:underline">info@studycafe.in</a>
          </p>
        </div>
      </section>
    </div>
  );
}
