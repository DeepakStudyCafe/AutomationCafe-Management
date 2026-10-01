"use client";

import React, { useState } from 'react';
import { Network, CheckCircle2, FileJson, ArrowRightLeft, Headset, ArrowRight } from 'lucide-react';

export function TallyPartnerClient() {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Mobile: '',
    City: '',
    PartnerType: '',
    CompanyName: '',
    Message: ''
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
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
        <div className="absolute top-0 left-0 -ml-40 -mt-40 w-[800px] h-[800px] rounded-full bg-blue-500/20 blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 -mr-40 -mb-40 w-[800px] h-[800px] rounded-full bg-indigo-500/20 blur-3xl opacity-50 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            
            {/* Left Column */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 backdrop-blur-sm px-4 py-1.5 text-[13px] font-bold text-orange-300 mb-8 tracking-wide">
                <Network className="w-4 h-4 text-orange-400" />
                Official Tally Integration Program
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-[1.1]">
                Empower your clients with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Tally Automation</span>
              </h1>
              <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-xl font-medium">
                Join hands with AutomationCafe. Apply now to offer instant PDF/Excel Invoice to Tally conversion, automated GST portal sync, and direct Tally XML automation to CA firms and businesses across India.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-sm text-slate-300 font-bold text-[14px]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Priority Tech Support
                </div>
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-sm text-slate-300 font-bold text-[14px]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Free Demo & Onboarding
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-bl from-orange-600/20 to-blue-600/20 blur-2xl rounded-[3rem] transform -rotate-3"></div>
              <div className="bg-white rounded-[2rem] p-8 sm:p-10 shadow-2xl relative z-10 border border-slate-200/60">
                {submitted ? (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-100 text-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-sm">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Application Submitted!</h3>
                    <p className="text-slate-500 text-[15px] font-medium leading-relaxed mb-8">
                      Dear <strong className="text-slate-900">{formData.Name || "Partner"}</strong>, thank you for applying for Tally Integration. We have sent a confirmation email to your address and our Tally Integration Specialist will contact you shortly.
                    </p>
                    <button 
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ Name: '', Email: '', Mobile: '', City: '', PartnerType: '', CompanyName: '', Message: '' });
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
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Apply for Tally Integration</h3>
                    <p className="text-slate-500 text-[15px] font-medium mb-8">Fill out the details below to apply for Tally automation & integration services.</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-[13px] font-bold text-slate-700 mb-2">Full Name *</label>
                          <input 
                            type="text" 
                            name="Name"
                            required
                            value={formData.Name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border-1.5 border-slate-200 bg-[#FAFAFA] text-[15px] text-slate-900 font-medium placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" 
                            placeholder="e.g. Rajesh Kumar" 
                          />
                        </div>
                        <div>
                          <label className="block text-[13px] font-bold text-slate-700 mb-2">Email Address *</label>
                          <input 
                            type="email" 
                            name="Email"
                            required
                            value={formData.Email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border-1.5 border-slate-200 bg-[#FAFAFA] text-[15px] text-slate-900 font-medium placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" 
                            placeholder="name@company.com" 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-[13px] font-bold text-slate-700 mb-2">Mobile Number *</label>
                          <input 
                            type="text" 
                            name="Mobile"
                            required
                            value={formData.Mobile}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border-1.5 border-slate-200 bg-[#FAFAFA] text-[15px] text-slate-900 font-medium placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" 
                            placeholder="10-digit mobile number" 
                          />
                        </div>
                        <div>
                          <label className="block text-[13px] font-bold text-slate-700 mb-2">City / Location *</label>
                          <input 
                            type="text" 
                            name="City"
                            required
                            value={formData.City}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border-1.5 border-slate-200 bg-[#FAFAFA] text-[15px] text-slate-900 font-medium placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" 
                            placeholder="e.g. Mumbai, Delhi" 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-[13px] font-bold text-slate-700 mb-2">Profession / Category *</label>
                          <select 
                            name="PartnerType"
                            required
                            value={formData.PartnerType}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border-1.5 border-slate-200 bg-[#FAFAFA] text-[15px] text-slate-900 font-medium focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none appearance-none"
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
                        <div>
                          <label className="block text-[13px] font-bold text-slate-700 mb-2">Company / Firm Name *</label>
                          <input 
                            type="text" 
                            name="CompanyName"
                            required
                            value={formData.CompanyName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border-1.5 border-slate-200 bg-[#FAFAFA] text-[15px] text-slate-900 font-medium placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" 
                            placeholder="e.g. ABC Infotech" 
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[13px] font-bold text-slate-700 mb-2">Message <span className="text-slate-400 font-medium">(Optional)</span></label>
                        <textarea 
                          name="Message"
                          rows={3}
                          value={formData.Message}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border-1.5 border-slate-200 bg-[#FAFAFA] text-[15px] text-slate-900 font-medium placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none resize-none" 
                          placeholder="Tell us briefly about your integration requirement..." 
                        ></textarea>
                      </div>

                      <div className="pt-2">
                        <button 
                          type="submit" 
                          disabled={loading}
                          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-[15px] font-bold text-white shadow-xl shadow-blue-500/30 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-500/40 disabled:opacity-70 disabled:hover:translate-y-0"
                        >
                          {loading ? 'Submitting...' : 'Submit Application'}
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

      {/* Feature Points Section */}
      <section className="py-24 bg-[#FAFAFA] border-t border-slate-200/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-[13px] font-bold text-blue-600 mb-6 uppercase tracking-widest">Tally Ecosystem</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">Why Businesses & CAs Choose Tally Integration</h2>
            <p className="text-slate-500 font-medium text-[16px] max-w-2xl mx-auto">Streamline your accounting workflow with reliable Tally automation tools and dedicated support.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200/60 rounded-[1.5rem] p-10 hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-300 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-[1.25rem] bg-blue-50 text-blue-600 flex items-center justify-center mb-6 border border-blue-100 shadow-sm">
                <FileJson className="w-7 h-7" />
              </div>
              <h3 className="text-[19px] font-black text-slate-900 mb-3 tracking-tight">AI Invoice to Tally</h3>
              <p className="text-slate-500 font-medium text-[15px] leading-relaxed">Convert PDF & scanned purchase/sales invoices directly into Tally XML format with 99.8% field extraction accuracy.</p>
            </div>

            <div className="bg-white border border-slate-200/60 rounded-[1.5rem] p-10 hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-300 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-[1.25rem] bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 border border-indigo-100 shadow-sm">
                <ArrowRightLeft className="w-7 h-7" />
              </div>
              <h3 className="text-[19px] font-black text-slate-900 mb-3 tracking-tight">GSTR-2B to Tally Sync</h3>
              <p className="text-slate-500 font-medium text-[15px] leading-relaxed">Automate GSTR-2B downloads and reconcile with Tally purchase registers in 1-click for your entire client portfolio.</p>
            </div>

            <div className="bg-white border border-slate-200/60 rounded-[1.5rem] p-10 hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-300 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-[1.25rem] bg-sky-50 text-sky-600 flex items-center justify-center mb-6 border border-sky-100 shadow-sm">
                <Headset className="w-7 h-7" />
              </div>
              <h3 className="text-[19px] font-black text-slate-900 mb-3 tracking-tight">Dedicated Enablement</h3>
              <p className="text-slate-500 font-medium text-[15px] leading-relaxed">Get dedicated integration account managers, customized product demos, marketing collateral, and fast technical support.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
