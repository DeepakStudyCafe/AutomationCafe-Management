"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, TrendingUp, Zap, Headset, CheckCircle2, ArrowRight } from 'lucide-react';

export function PartnerClient() {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Mobile: '',
    CompanyName: '',
    Profession: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let value = e.target.value;
    if (e.target.name === 'Mobile') {
      value = value.replace(/\D/g, '').slice(0, 10);
    }
    setFormData({ ...formData, [e.target.name]: value });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-32 bg-slate-900">
        <div className="absolute inset-0 bg-[url('/Images/grid.svg')] bg-center opacity-[0.035]"></div>
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[800px] h-[800px] rounded-full bg-blue-500/20 blur-3xl opacity-50 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            
            {/* Left Column */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 backdrop-blur-sm px-4 py-1.5 text-[13px] font-bold text-blue-300 mb-8 tracking-wide">
                <Sparkles className="w-4 h-4 text-blue-400" />
                AutomationCafe Partnership Program
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-[1.1]">
                Partner with us & grow your practice
              </h1>
              <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-xl font-medium">
                Join our ecosystem of CA firms, tax advisors, agency partners, and tech advocates. Empower your clients with powerful automation while creating a recurring revenue stream.
              </p>

              <div className="space-y-4 max-w-lg">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-[17px] mb-1">Attractive Recurring Income</h3>
                    <p className="text-slate-400 text-[14px] leading-relaxed font-medium">Earn generous commissions & rewards on every onboarded firm.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-[17px] mb-1">Industry-Leading Tools</h3>
                    <p className="text-slate-400 text-[14px] leading-relaxed font-medium">GST, Income Tax, Tally & Bank Statement converters built for CA and tax professionals.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
                    <Headset className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-[17px] mb-1">Dedicated Support</h3>
                    <p className="text-slate-400 text-[14px] leading-relaxed font-medium">Direct technical manager for joint client demos and priority assistance.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 blur-2xl rounded-[3rem] transform rotate-3"></div>
              <div className="bg-white rounded-[2rem] p-8 sm:p-10 shadow-2xl relative z-10 border border-slate-200/60">
                {submitted ? (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-100 text-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-sm">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Application Submitted Successfully!</h3>
                    <p className="text-slate-500 text-[15px] font-medium leading-relaxed mb-8">
                      Dear <strong className="text-slate-900">{formData.Name || "Partner"}</strong>, thank you for applying for the AutomationCafe Partnership Program. We have sent a confirmation email to your address. Our partnership specialist will contact you shortly via Call or WhatsApp.
                    </p>
                    <button 
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ Name: '', Email: '', Mobile: '', CompanyName: '', Profession: '' });
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-8 py-3.5 text-[15px] font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-[12px] font-bold text-blue-600 uppercase tracking-widest mb-6">
                      Fast-Track Application
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Apply for Partnership</h3>
                    <p className="text-slate-500 text-[15px] font-medium mb-8">Fill out your details below. Our team will reach out within 24 hours.</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="block text-[13px] font-bold text-slate-700 mb-2">Full Name *</label>
                        <input 
                          type="text" 
                          name="Name"
                          required
                          value={formData.Name}
                          onChange={handleInputChange}
                          className="w-full px-5 py-3.5 rounded-xl border-1.5 border-slate-200 bg-[#FAFAFA] text-[15px] text-slate-900 font-medium placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" 
                          placeholder="e.g. Rahul Sharma" 
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-[13px] font-bold text-slate-700 mb-2">Email Address *</label>
                          <input 
                            type="email" 
                            name="Email"
                            required
                            value={formData.Email}
                            onChange={handleInputChange}
                            className="w-full px-5 py-3.5 rounded-xl border-1.5 border-slate-200 bg-[#FAFAFA] text-[15px] text-slate-900 font-medium placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" 
                            placeholder="rahul@example.com" 
                          />
                        </div>
                        <div>
                          <label className="block text-[13px] font-bold text-slate-700 mb-2">Mobile Number *</label>
                          <input 
                            type="text" 
                            name="Mobile"
                            required
                            value={formData.Mobile}
                            onChange={handleInputChange}
                            className="w-full px-5 py-3.5 rounded-xl border-1.5 border-slate-200 bg-[#FAFAFA] text-[15px] text-slate-900 font-medium placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" 
                            placeholder="10-digit mobile number" 
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[13px] font-bold text-slate-700 mb-2">Company / Firm Name *</label>
                        <input 
                          type="text" 
                          name="CompanyName"
                          required
                          value={formData.CompanyName}
                          onChange={handleInputChange}
                          className="w-full px-5 py-3.5 rounded-xl border-1.5 border-slate-200 bg-[#FAFAFA] text-[15px] text-slate-900 font-medium placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" 
                          placeholder="e.g. Sharma & Associates" 
                        />
                      </div>

                      <div>
                        <label className="block text-[13px] font-bold text-slate-700 mb-2">Your Profession / Category *</label>
                        <select 
                          name="Profession"
                          required
                          value={formData.Profession}
                          onChange={handleInputChange}
                          className="w-full px-5 py-3.5 rounded-xl border-1.5 border-slate-200 bg-[#FAFAFA] text-[15px] text-slate-900 font-medium focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none appearance-none"
                        >
                          <option value="">-- Select Profession --</option>
                          <option value="CA PRACTICE">CA Practice</option>
                          <option value="ACCOUNTANT">Accountant</option>
                          <option value="TAX PROFESSIONAL">Tax Professional</option>
                          <option value="LAWYER">Lawyer</option>
                          <option value="BUSINESS">Business</option>
                          <option value="AGENCY">Agency / Reseller</option>
                          <option value="INFLUENCER">Content Creator / Influencer</option>
                          <option value="OTHERS">Others</option>
                        </select>
                      </div>

                      <div className="pt-2">
                        <button 
                          type="submit" 
                          disabled={loading}
                          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-[15px] font-bold text-white shadow-xl shadow-blue-500/30 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-500/40 disabled:opacity-70 disabled:hover:translate-y-0"
                        >
                          {loading ? 'Submitting...' : 'Submit Partnership Inquiry'}
                          {!loading && <ArrowRight className="w-5 h-5" />}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 bg-white border-t border-slate-200/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-[13px] font-bold text-blue-600 mb-6 uppercase tracking-widest">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">3 Steps to start your partnership</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FAFAFA] border border-slate-200/60 rounded-[1.5rem] p-10 text-center hover:shadow-lg hover:shadow-slate-200/50 hover:border-slate-300 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-full bg-blue-600 text-white font-black text-xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-600/30">1</div>
              <h3 className="text-[19px] font-black text-slate-900 mb-3">Submit Application</h3>
              <p className="text-slate-500 font-medium text-[15px] leading-relaxed">Fill in your basic details and profession in the inquiry form above.</p>
            </div>

            <div className="bg-[#FAFAFA] border border-slate-200/60 rounded-[1.5rem] p-10 text-center hover:shadow-lg hover:shadow-slate-200/50 hover:border-slate-300 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-full bg-blue-600 text-white font-black text-xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-600/30">2</div>
              <h3 className="text-[19px] font-black text-slate-900 mb-3">Connect & Align</h3>
              <p className="text-slate-500 font-medium text-[15px] leading-relaxed">Our partnership manager reaches out to discuss commercial models and synergy.</p>
            </div>

            <div className="bg-[#FAFAFA] border border-slate-200/60 rounded-[1.5rem] p-10 text-center hover:shadow-lg hover:shadow-slate-200/50 hover:border-slate-300 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-full bg-blue-600 text-white font-black text-xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-600/30">3</div>
              <h3 className="text-[19px] font-black text-slate-900 mb-3">Start Onboarding</h3>
              <p className="text-slate-500 font-medium text-[15px] leading-relaxed">Get access to partner perks, collateral, links, and start growing together.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
