'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Calendar, Clock, Building, User, Mail, Phone, MessageSquare, CheckCircle2 } from 'lucide-react';
import api from '@/lib/api';

export default function DemoPage() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [slots, setSlots] = useState<{ startTime: string; display: string }[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    practiceSize: '',
    message: ''
  });

  const practiceSizes = ['1-5', '6-20', '21-50', '50+'];

  const handleDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateStr = e.target.value;
    setSelectedDate(dateStr);
    setSelectedSlot(null);
    setSlots([]);
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!dateStr) return;

    const d = new Date(dateStr);
    const day = d.getDay();
    if (day === 0) {
      setErrorMsg("Sunday is not available for demo calls. Please choose Monday to Saturday.");
      return;
    }

    setLoadingSlots(true);
    try {
      const res = await api.get(`/api/v1/demos/slots?date=${dateStr}`);
      if (res.data && res.data.length > 0) {
        setSlots(res.data);
      } else {
        setErrorMsg("No available slots on this day. Try another date.");
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || "Failed to load slots. Please try again.");
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleBookDemo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedSlot) {
      setErrorMsg("Please select a date and time slot first.");
      return;
    }
    
    setSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      await api.post('/api/v1/demos/book', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || null,
        practiceSize: formData.practiceSize || null,
        message: formData.message || null,
        selectedDate,
        selectedTimeSlot: selectedSlot
      });

      setSuccessMsg("Demo Call Booked Successfully! Check your email for details.");
      setFormData({ name: '', email: '', phone: '', company: '', practiceSize: '', message: '' });
      setSelectedSlot(null);
      setSlots([]);
      setSelectedDate('');
      
    } catch (err: any) {
      if (err.response?.status === 409) {
        setErrorMsg("This slot is no longer available. Please select another.");
        // Refresh slots
        handleDateChange({ target: { value: selectedDate } } as any);
      } else {
        setErrorMsg(err.response?.data?.error || "Failed to book demo. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-24">
      <Head>
        <title>Book a Demo | AutomationCafe</title>
        <meta name="description" content="Schedule a personalized demo of AutomationCafe's tools and discover how we can streamline your professional workflows." />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            See AutomationCafe in <span className="text-blue-600">Action</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Book a personalized walkthrough with our experts. Learn how our tools can save you time, reduce errors, and scale your practice.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            
            {/* Left Sidebar Info */}
            <div className="bg-blue-600 text-white p-8 lg:p-12 lg:col-span-2 flex flex-col">
              <h3 className="text-2xl font-bold mb-6">What to expect?</h3>
              
              <div className="space-y-6 flex-1">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-6 h-6 text-blue-200" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Personalized Tour</h4>
                    <p className="text-blue-100 text-sm mt-1">A brief introduction tailored to your firm's specific needs and scale.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-6 h-6 text-blue-200" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Live Workflow</h4>
                    <p className="text-blue-100 text-sm mt-1">Watch live how to process GSTR imports, JSON generation, and Tally sync in seconds.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-6 h-6 text-blue-200" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Q&A Session</h4>
                    <p className="text-blue-100 text-sm mt-1">Get your technical or pricing questions answered instantly by our product specialists.</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-blue-500">
                <p className="text-blue-100 text-sm">Need immediate help?</p>
                <a href="mailto:contact@studycafe.in" className="font-medium hover:text-blue-200 transition-colors">contact@studycafe.in</a>
              </div>
            </div>

            {/* Right Booking Form */}
            <div className="p-8 lg:p-12 lg:col-span-3">
              {successMsg ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Demo Scheduled!</h3>
                  <p className="text-slate-600 mb-8 max-w-md">{successMsg}</p>
                  <button 
                    onClick={() => setSuccessMsg(null)}
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Book Another Session
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookDemo} className="space-y-8">
                  
                  {/* Step 1: Schedule */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      1. Choose a Time
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Select Date</label>
                        <input 
                          type="date" 
                          required
                          min={new Date().toISOString().split('T')[0]}
                          value={selectedDate}
                          onChange={handleDateChange}
                          className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>

                    {errorMsg && (
                      <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100">
                        {errorMsg}
                      </div>
                    )}

                    {loadingSlots && (
                      <div className="mt-6 flex gap-3 animate-pulse">
                        <div className="h-10 w-24 bg-slate-200 rounded-lg"></div>
                        <div className="h-10 w-24 bg-slate-200 rounded-lg"></div>
                        <div className="h-10 w-24 bg-slate-200 rounded-lg"></div>
                      </div>
                    )}

                    {!loadingSlots && slots.length > 0 && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Available Slots</label>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                          {slots.map((s, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setSelectedSlot(s.startTime)}
                              className={`py-2 px-3 text-sm font-medium rounded-lg border transition-all ${
                                selectedSlot === s.startTime 
                                  ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                                  : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                              }`}
                            >
                              {s.display}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Step 2: Details */}
                  <div className={`transition-opacity duration-300 ${(!selectedDate || !selectedSlot) ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2 pt-6 border-t border-slate-100">
                      <User className="w-5 h-5 text-blue-600" />
                      2. Your Details
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            required
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                            placeholder="John Doe"
                          />
                          <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Work Email *</label>
                        <div className="relative">
                          <input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                            placeholder="john@company.com"
                          />
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
                        <div className="relative">
                          <input 
                            type="tel" 
                            required
                            value={formData.phone}
                            onChange={e => setFormData({...formData, phone: e.target.value})}
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                            placeholder="+91 9876543210"
                          />
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Company / Firm Name</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            value={formData.company}
                            onChange={e => setFormData({...formData, company: e.target.value})}
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                            placeholder="Optional"
                          />
                          <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-5">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Practice Size (Employees)</label>
                      <div className="flex flex-wrap gap-3">
                        {practiceSizes.map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setFormData({...formData, practiceSize: size})}
                            className={`py-1.5 px-4 text-sm font-medium rounded-full border transition-all ${
                              formData.practiceSize === size 
                                ? 'bg-slate-800 text-white border-slate-800' 
                                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Anything specific you want to see?</label>
                      <div className="relative">
                        <textarea 
                          rows={3}
                          value={formData.message}
                          onChange={e => setFormData({...formData, message: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none"
                          placeholder="E.g. Bank statement converter, GST JSON import..."
                        ></textarea>
                        <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={submitting || !selectedDate || !selectedSlot}
                      className="w-full mt-8 py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg rounded-xl shadow-lg shadow-blue-600/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Scheduling...
                        </>
                      ) : (
                        'Confirm Booking'
                      )}
                    </button>
                    <p className="text-xs text-center text-slate-500 mt-4">
                      By booking, you agree to our <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
                    </p>
                  </div>

                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
