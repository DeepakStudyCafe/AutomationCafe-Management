'use client';

import { useState, useRef } from 'react';
import { Mail, Send, CheckCircle2, Gift, Megaphone, UploadCloud, Calendar as CalendarIcon, Eye, Link } from 'lucide-react';
import api from '@/lib/api';

export default function EmailSenderPage() {
  const [template, setTemplate] = useState<'holiday' | 'announcement'>('holiday');
  const [subject, setSubject] = useState('Notice: Warm Holiday Wishes from Automation Cafe');
  const [customHeaderHtml, setCustomHeaderHtml] = useState('');
  const [occasionTitle, setOccasionTitle] = useState('Warm Holiday Wishes & Office Notice');
  const [closedFromDate, setClosedFromDate] = useState('');
  const [message, setMessage] = useState('Wishing you and your family a joyful, peaceful, and prosperous festive season! Please note that our office will remain closed starting from the date mentioned below. Our automated systems and tools will continue to run seamlessly.\n\nWishing you and your loved ones peace, happiness, and success!');
  
  // Specific to announcements
  const [btnText, setBtnText] = useState('Visit Automation Cafe');
  const [btnUrl, setBtnUrl] = useState('https://automationcafe.in');

  const [testEmail, setTestEmail] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [status, setStatus] = useState<'idle'|'sending_test'|'test_success'|'sending_all'|'all_success'|'error'>('idle');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTemplateChange = (newTemplate: 'holiday' | 'announcement') => {
    setTemplate(newTemplate);
    if (newTemplate === 'holiday') {
      setSubject('Notice: Warm Holiday Wishes from Automation Cafe');
      setOccasionTitle('Warm Holiday Wishes & Office Notice');
      setMessage('Wishing you and your family a joyful, peaceful, and prosperous festive season! Please note that our office will remain closed starting from the date mentioned below. Our automated systems and tools will continue to run seamlessly.\n\nWishing you and your loved ones peace, happiness, and success!');
    } else {
      setSubject('System Update: Platform Enhancements');
      setOccasionTitle('Important System Update & New Features');
      setMessage('We are excited to share some important updates regarding our platform improvements and new features that are now available in your dashboard.');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateInnerHtml = () => {
    let html = '';
    
    if (customHeaderHtml) {
      html += `<div style="margin-bottom: 20px;">${customHeaderHtml}</div>`;
    }

    if (template === 'holiday') {
      let startFormatted = 'Select date';
      if (closedFromDate) {
        startFormatted = new Date(closedFromDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
      }

      html += `
        <div style="font-family:'Inter','Segoe UI',Arial,sans-serif;color:#333;">
            ${imagePreview ? `
            <div style="margin:0 0 24px;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.06);background:#fff;border:1px solid #f0edf8;">
                <img src="${imagePreview}" alt="Holiday Wishes" style="width:100%;height:auto;max-height:360px;object-fit:cover;display:block;margin:0 auto;" />
            </div>
            ` : ''}

            <div style="margin-bottom:20px;">
                <h2 style="color:#7c3aed; font-size:1.45rem; font-weight:800; margin:0 0 8px; letter-spacing:-.3px;">${occasionTitle}</h2>
                <div style="width:48px;height:3.5px;background:linear-gradient(90deg,#7c3aed,#ec4899);border-radius:3px;"></div>
            </div>

            <p style="margin:0 0 16px;font-size:15px;color:#374151;">Hi <strong>{{FullName}}</strong>,</p>

            ${message ? `<p style="margin:0 0 20px;font-size:15px;color:#4b5563;line-height:1.75;">${message.replace(/\n/g, '<br>')}</p>` : ''}

            <div style="background:linear-gradient(135deg,#fdf4ff 0%,#faf5ff 50%,#f5f3ff 100%);border-left:4px solid #a855f7;border-radius:0 12px 12px 0;padding:18px 22px;margin:24px 0;">
                <div style="display:flex;align-items:center;gap:14px;">
                    <div style="width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,#7c3aed,#9333ea);display:flex;align-items:center;justify-content:center;font-size:1.25rem;color:#fff;flex-shrink:0;box-shadow:0 3px 10px rgba(124,58,237,.25);">
                        📅
                    </div>
                    <div>
                        <div style="font-size:.72rem;font-weight:700;color:#7c3aed;text-transform:uppercase;letter-spacing:.6px;">Office Closed Starting From</div>
                        <div style="font-size:1.15rem;font-weight:800;color:#1e1b4b;margin-top:2px;">${startFormatted}</div>
                        <div style="font-size:.75rem;color:#6b7280;margin-top:2px;">Our team will be observing the holiday period. Automated services remain fully active.</div>
                    </div>
                </div>
            </div>

            <div style="margin-top:28px;padding-top:20px;border-top:1px solid #f3f4f6;">
                <p style="margin:0;font-size:14px;color:#4b5563;line-height:1.6;">
                    Wishing you and your loved ones peace, happiness, and success!<br>
                    <strong style="color:#1e1b4b;">Warm regards,<br>Team Automation Cafe</strong>
                </p>
            </div>
        </div>
      `;
    } else {
      // Announcements Template
      html += `
        <div style="font-family:'Inter','Segoe UI',Arial,sans-serif;color:#333;">
            ${imagePreview ? `
            <div style="margin:0 0 24px;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.06);background:#fff;border:1px solid #f0edf8;">
                <img src="${imagePreview}" alt="Announcement Banner" style="width:100%;height:auto;max-height:360px;object-fit:cover;display:block;margin:0 auto;" />
            </div>
            ` : ''}

            <div style="margin-bottom:20px;">
                <h2 style="color:#4c1d95; font-size:1.45rem; font-weight:800; margin:0 0 8px; letter-spacing:-.3px;">${occasionTitle}</h2>
                <div style="width:48px;height:3.5px;background:linear-gradient(90deg,#7c3aed,#a855f7);border-radius:3px;"></div>
            </div>

            <p style="margin:0 0 16px;font-size:15px;color:#374151;">Hi <strong>{{FullName}}</strong>,</p>
            <p style="margin:0 0 20px;font-size:15px;color:#4b5563;line-height:1.75;">${message.replace(/\n/g, '<br>')}</p>

            ${btnText && btnUrl ? `
            <div style="text-align:center;margin:32px 0 12px;">
                <a href="${btnUrl}" style="display:inline-block;padding:13px 34px;font-size:.92rem;font-weight:700;color:#fff;background:linear-gradient(135deg,#7c3aed 0%,#6d28d9 100%);border-radius:10px;text-decoration:none;box-shadow:0 4px 14px rgba(124,58,237,.3);letter-spacing:.3px;">${btnText}</a>
            </div>
            ` : ''}

            <div style="margin-top:28px;padding-top:20px;border-top:1px solid #f3f4f6;">
                <p style="margin:0;font-size:14px;color:#4b5563;line-height:1.6;">
                    Best regards,<br>
                    <strong style="color:#1e1b4b;">Automation Cafe Team</strong>
                </p>
            </div>
        </div>
      `;
    }

    return html;
  };

  const sendEmailRequest = async (recipient: string, type: 'test' | 'all') => {
    setStatus(type === 'test' ? 'sending_test' : 'sending_all');
    try {
      await api.post('/api/v1/emails/send', {
        recipient,
        subject,
        message: generateInnerHtml()
      });
      setStatus(type === 'test' ? 'test_success' : 'all_success');
      setTimeout(() => setStatus('idle'), 4000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto min-h-screen pb-12">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 text-[11px] font-bold tracking-wider mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse"></span> ((•)) EMAIL BROADCAST
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Compose & Send</h1>
        <p className="text-slate-500 text-sm">Send holiday wishes greetings or system announcements with rich formatting and live broadcast tracking.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 items-start">
        {/* Left Column: Form */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="bg-[#f8fafc] px-6 py-4 border-b border-slate-200/80 flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#7c3aed] text-white flex items-center justify-center">
              <Mail className="w-3.5 h-3.5" />
            </div>
            <h3 className="font-bold text-slate-800 text-[15px]">Email Configuration</h3>
          </div>

          <div className="p-6 space-y-7">
            {/* Template Selection */}
            <div>
              <label className="flex items-center gap-2 text-[13px] font-bold text-slate-600 mb-3 uppercase tracking-wide">
                <ListIcon /> Choose Template
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div 
                  onClick={() => handleTemplateChange('holiday')}
                  className={`cursor-pointer rounded-xl border-2 p-5 text-center transition-all relative ${template === 'holiday' ? 'border-[#7c3aed] bg-[#f5f3ff]' : 'border-slate-200 hover:border-slate-300'}`}
                >
                  {template === 'holiday' && (
                    <div className="absolute top-3 right-3 text-[#7c3aed]">
                      <CheckCircle2 className="w-5 h-5 fill-current text-white" />
                    </div>
                  )}
                  <div className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3 ${template === 'holiday' ? 'bg-[#ec4899] text-white shadow-md' : 'bg-slate-100 text-slate-400'}`}>
                    <Gift className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Holiday Wishes & Notice</h4>
                  <p className="text-xs text-slate-500">Festive greetings, photo & closing notice</p>
                </div>

                <div 
                  onClick={() => handleTemplateChange('announcement')}
                  className={`cursor-pointer rounded-xl border-2 p-5 text-center transition-all relative ${template === 'announcement' ? 'border-[#7c3aed] bg-[#f5f3ff]' : 'border-slate-200 hover:border-slate-300'}`}
                >
                  {template === 'announcement' && (
                    <div className="absolute top-3 right-3 text-[#7c3aed]">
                      <CheckCircle2 className="w-5 h-5 fill-current text-white" />
                    </div>
                  )}
                  <div className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3 ${template === 'announcement' ? 'bg-blue-500 text-white shadow-md' : 'bg-slate-100 text-slate-400'}`}>
                    <Megaphone className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Updates & Announcements</h4>
                  <p className="text-xs text-slate-500">New features, changes & general news</p>
                </div>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-[13px] font-bold text-slate-600 mb-2 uppercase tracking-wide">
                <TextIcon /> Subject Line
              </label>
              <input 
                type="text" 
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/50 focus:border-[#7c3aed] bg-slate-50/50"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-[13px] font-bold text-slate-600 mb-2 uppercase tracking-wide">
                <CodeIcon /> Custom Header HTML <span className="text-slate-400 normal-case font-normal">(optional)</span>
              </label>
              <textarea 
                rows={2}
                value={customHeaderHtml}
                onChange={e => setCustomHeaderHtml(e.target.value)}
                placeholder="Paste extra HTML/banner here if needed"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/50 focus:border-[#7c3aed] bg-slate-50/50 resize-none"
              ></textarea>
              <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                <InfoIcon /> The Automation Cafe branded white logo header is already included by default.
              </p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-[13px] font-bold text-slate-600 mb-2 uppercase tracking-wide">
                <SparklesIcon /> {template === 'holiday' ? 'Holiday / Occasion Title' : 'Announcement Title'}
              </label>
              <input 
                type="text" 
                value={occasionTitle}
                onChange={e => setOccasionTitle(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/50 focus:border-[#7c3aed] bg-slate-50/50"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-[13px] font-bold text-slate-600 mb-2 uppercase tracking-wide">
                <ImageIcon /> {template === 'holiday' ? 'Holiday Wishes Photo / Banner' : 'Announcement Banner'} <span className="text-slate-400 normal-case font-normal">(optional)</span>
              </label>
              
              {!imagePreview ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center cursor-pointer hover:border-[#7c3aed] hover:bg-[#f5f3ff]/50 transition-colors"
                >
                  <div className="w-10 h-10 mx-auto rounded-full bg-[#7c3aed] text-white flex items-center justify-center mb-3 shadow-sm">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Upload {template === 'holiday' ? 'Holiday Wishes Graphic / Greeting Photo' : 'Announcement Banner'}</h4>
                  <p className="text-xs text-slate-500">Drag and drop or click to choose (PNG, JPG, WebP up to 10MB)</p>
                </div>
              ) : (
                <div className="border border-slate-200 rounded-xl overflow-hidden relative">
                    <img src={imagePreview} alt="Preview" className="w-full h-auto max-h-48 object-cover" />
                    <div className="p-3 bg-white flex justify-between items-center border-t border-slate-100">
                        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Banner Uploaded</span>
                        <button 
                            type="button"
                            onClick={() => { setImagePreview(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                            className="text-xs font-bold text-red-600 hover:text-red-700"
                        >
                            Remove
                        </button>
                    </div>
                </div>
              )}
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                className="hidden" 
              />
            </div>

            {template === 'holiday' && (
              <div>
                <label className="flex items-center gap-2 text-[13px] font-bold text-slate-600 mb-2 uppercase tracking-wide">
                  <CalendarIcon className="w-4 h-4 text-[#7c3aed]" /> Closed From Date
                </label>
                <input 
                  type="date" 
                  value={closedFromDate}
                  onChange={e => setClosedFromDate(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/50 focus:border-[#7c3aed] bg-slate-50/50"
                />
                <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                  <InfoIcon /> Office closure begins from this date. (No reopening date is shown).
                </p>
              </div>
            )}

            <div>
              <label className="flex items-center gap-2 text-[13px] font-bold text-slate-600 mb-2 uppercase tracking-wide">
                <MessageIcon /> {template === 'holiday' ? 'Holiday Wishes & Message' : 'Details & Changes'}
              </label>
              <textarea 
                rows={5}
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/50 focus:border-[#7c3aed] bg-slate-50/50 resize-y"
              ></textarea>
            </div>

            {template === 'announcement' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-[13px] font-bold text-slate-600 mb-2 uppercase tracking-wide">
                    <MessageIcon /> Button Text <span className="text-slate-400 normal-case font-normal">(optional)</span>
                  </label>
                  <input 
                    type="text" 
                    value={btnText}
                    onChange={e => setBtnText(e.target.value)}
                    placeholder="e.g., View Dashboard"
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/50 focus:border-[#7c3aed] bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-[13px] font-bold text-slate-600 mb-2 uppercase tracking-wide">
                    <Link className="w-4 h-4" /> Button URL <span className="text-slate-400 normal-case font-normal">(optional)</span>
                  </label>
                  <input 
                    type="url" 
                    value={btnUrl}
                    onChange={e => setBtnUrl(e.target.value)}
                    placeholder="https://automationcafe.in"
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/50 focus:border-[#7c3aed] bg-slate-50/50"
                  />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="bg-[#f5f3ff] border border-[#e0e7ff] rounded-xl p-5">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold text-[#4338ca] text-[15px]">Send Test Email First</h4>
                <span className="text-[10px] font-bold bg-[#e0e7ff] text-[#4338ca] px-2 py-1 rounded-md">Preserves Form Data</span>
              </div>
              <div className="flex gap-3">
                <input 
                  type="email" 
                  value={testEmail}
                  onChange={e => setTestEmail(e.target.value)}
                  placeholder="deepanshiromilla042@gmail.com"
                  className="flex-1 border border-[#c7d2fe] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4338ca] bg-white shadow-sm"
                />
                <button 
                  onClick={() => sendEmailRequest(testEmail, 'test')}
                  disabled={!testEmail || status.startsWith('sending')}
                  className="bg-[#4338ca] hover:bg-[#3730a3] disabled:opacity-50 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2 shadow-sm"
                >
                  {status === 'sending_test' ? 'Sending...' : <><Send className="w-4 h-4" /> Send Test Email</>}
                </button>
              </div>
              {status === 'test_success' && <p className="text-emerald-600 text-xs mt-2 font-semibold">Test email sent!</p>}
              <p className="text-[11px] text-[#4338ca]/70 mt-3 flex items-center gap-1">
                <InfoIcon /> Sends sample email without clearing form fields or removing typed content.
              </p>
            </div>

            <div className="bg-[#fff1f2] border border-[#ffe4e6] rounded-xl p-5">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-[#be123c] text-[15px] flex items-center gap-2"><BroadcastIcon /> Ready for Live Broadcast?</h4>
                <span className="text-[10px] font-bold bg-[#ffe4e6] text-[#be123c] px-2 py-1 rounded-md border border-[#fecdd3]">All Registered Users</span>
              </div>
              <p className="text-[12px] text-[#be123c]/80 mb-4 font-medium">Sends emails asynchronously to all registered users with real-time live delivery progress tracking.</p>
              <button 
                onClick={() => {
                  if (confirm('Are you sure you want to broadcast this to ALL registered users?')) {
                    sendEmailRequest('ALL', 'all');
                  }
                }}
                disabled={status.startsWith('sending')}
                className="w-full bg-[#e11d48] hover:bg-[#be123c] disabled:opacity-50 text-white py-3.5 rounded-lg font-bold text-[15px] transition-all flex justify-center items-center gap-2 shadow-md hover:shadow-lg"
              >
                {status === 'sending_all' ? 'Broadcasting...' : <><Megaphone className="w-5 h-5" /> Broadcast to ALL Registered Users</>}
              </button>
              {status === 'all_success' && <p className="text-emerald-600 text-sm mt-3 font-bold text-center">Broadcast completed successfully!</p>}
              {status === 'error' && <p className="text-red-600 text-sm mt-3 font-bold text-center">An error occurred while sending.</p>}
            </div>
          </div>
        </div>

        {/* Right Column: Preview */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden sticky top-6">
          <div className="bg-[#f8fafc] px-6 py-4 border-b border-slate-200/80 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#7c3aed] text-white flex items-center justify-center">
                <Eye className="w-3.5 h-3.5" />
              </div>
              <h3 className="font-bold text-slate-800 text-[15px]">Live Email Preview</h3>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-[#bbf7d0] bg-[#f0fdf4] text-[#16a34a] text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse"></span> Real-time
            </div>
          </div>

          <div className="p-6 bg-[#f1f5f9] min-h-[600px] flex justify-center">
            {/* Fake Email Client */}
            <div className="bg-white rounded-xl shadow-lg w-full max-w-[500px] overflow-hidden border border-slate-200 flex flex-col">
              {/* Browser bar */}
              <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <div className="ml-4 bg-white border border-slate-200 rounded text-[10px] text-slate-400 font-semibold px-2 py-0.5 flex items-center gap-1">
                  <Mail className="w-3 h-3" /> Inbox Preview
                </div>
              </div>

              {/* Email Meta */}
              <div className="px-6 py-4 border-b border-slate-100 flex gap-3">
                <div className="w-10 h-10 rounded-full bg-[#7c3aed] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  AC
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-[13px]">Automation Cafe</div>
                  <div className="text-slate-500 text-[11px] mb-1">noreply@automationcafe.in</div>
                  <div className="font-semibold text-slate-800 text-[12px] leading-tight">{subject || 'No subject'}</div>
                </div>
              </div>

              {/* Email Body Wrapper */}
              <div className="flex-1 bg-[#f0eef6] p-4 flex flex-col">
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200/50 relative flex-1 flex flex-col">
                  {/* Top Gradient line */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899]"></div>
                  
                  {/* Header Logo Area */}
                  <div className="p-6 text-center border-b border-slate-50">
                    <img 
                      src="/Images/automationcafe-black.png" 
                      alt="Automation Cafe" 
                      className="h-9 w-auto mx-auto object-contain" 
                    />
                  </div>

                  {/* Rendered HTML */}
                  <div 
                    className="p-6 text-[14px] text-slate-700 flex-1 preview-html"
                    dangerouslySetInnerHTML={{ __html: generateInnerHtml() }}
                  >
                  </div>

                  {/* Footer */}
                  <div className="bg-[#f9fafb] p-6 text-center border-t border-slate-100">
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      © {new Date().getFullYear()} Automation Cafe. All rights reserved.<br/>
                      You are receiving this email because you are registered with us.<br/>
                      <a href="#" className="text-[#7c3aed] font-semibold">automationcafe.in</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Icons
const ListIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>;
const TextIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>;
const CodeIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>;
const InfoIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>;
const SparklesIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18"></path><path d="M3 12h18"></path><path d="m18.36 5.64-12.72 12.72"></path><path d="m5.64 5.64 12.72 12.72"></path></svg>;
const ImageIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>;
const MessageIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>;
const BroadcastIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2"></circle><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path></svg>;
