'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { User, Lock, Mail, Phone, MapPin, Briefcase, MonitorSmartphone, CheckCircle, ArrowLeft } from 'lucide-react';
import api from '@/lib/api';
import Link from 'next/link';

export default function UserFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');
  const isEditing = !!editId;
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    mobile: '',
    profession: '',
    state: '',
    allowedDeviceLimit: 1
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing) {
      // Fetch user data for editing
      setFetching(true);
      api.get(`/api/v1/users/${editId}`)
        .then(res => {
          const user = res.data.data;
          setFormData({
            username: user.Username || '',
            password: '',
            fullName: user.FullName || '',
            email: user.Email || '',
            mobile: user.Mobile || '',
            profession: user.Profession || '',
            state: user.State || '',
            allowedDeviceLimit: user.AllowedDeviceLimit || 1
          });
        })
        .catch(err => {
          setError("Failed to fetch user data for editing.");
        })
        .finally(() => {
          setFetching(false);
        });
    }
  }, [editId, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'allowedDeviceLimit' ? parseInt(value) || 1 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username) {
      setError("Username is required");
      return;
    }
    if (!isEditing && !formData.password) {
      setError("Password is required for new users");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      if (isEditing) {
        await api.put(`/api/v1/users/${editId}`, formData);
      } else {
        await api.post('/api/v1/users', formData);
      }
      router.push('/superadmin/users');
    } catch (err: any) {
      setError(err.response?.data?.error || "An error occurred while saving user.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans pb-12">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/superadmin/users" className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{isEditing ? 'Edit User Profile' : 'Create New User'}</h1>
          <p className="text-sm text-slate-500">{isEditing ? `Update details for user #${editId}` : 'Add a new member to the system.'}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {error && (
          <div className="m-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm font-medium flex items-start gap-3">
            <div className="mt-0.5"><Lock className="w-4 h-4 text-red-500" /></div>
            {error}
          </div>
        )}

        <form id="user-form" onSubmit={handleSubmit} className="p-6 space-y-8">
          
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">Authentication Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400" /> Username <span className="text-red-500">*</span>
                </label>
                <input type="text" name="username" required value={formData.username} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none" placeholder="johndoe" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-slate-400" /> Password {!isEditing && <span className="text-red-500">*</span>}
                </label>
                <input type="text" name="password" required={!isEditing} value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none" placeholder={isEditing ? "Leave blank to keep current password" : "••••••••"} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">Personal Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400" /> Full Name
                </label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" /> Email
                </label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" /> Mobile
                </label>
                <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none" placeholder="+91 9876543210" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-slate-400" /> Profession
                </label>
                <select name="profession" value={formData.profession} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none bg-white">
                  <option value="">Select Profession</option>
                  <option value="CA">CA</option>
                  <option value="CS">CS</option>
                  <option value="CMA">CMA</option>
                  <option value="Lawyer">Lawyer</option>
                  <option value="Accountant">Accountant</option>
                  <option value="Student">Student</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" /> State
                </label>
                <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none" placeholder="Maharashtra" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">Device Management</h4>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <MonitorSmartphone className="w-4 h-4 text-slate-500" /> Allowed Device Limit
              </label>
              <div className="flex items-center gap-6">
                <input type="range" min="1" max="10" name="allowedDeviceLimit" value={formData.allowedDeviceLimit} onChange={handleChange} className="w-full max-w-sm accent-blue-600" />
                <span className="px-4 py-1.5 bg-white text-blue-700 font-bold rounded-lg border border-slate-200 shadow-sm min-w-[100px] text-center">
                  {formData.allowedDeviceLimit} {formData.allowedDeviceLimit === 1 ? 'Device' : 'Devices'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2">Maximum number of devices this user can be logged into simultaneously.</p>
            </div>
          </div>

        </form>

        <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
          <Link href="/superadmin/users" className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-100 transition-colors shadow-sm">
            Cancel
          </Link>
          <button 
            type="submit" 
            form="user-form"
            disabled={loading}
            className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
          >
            <CheckCircle className="w-4 h-4" />
            {loading ? 'Saving...' : isEditing ? 'Save Changes' : 'Create User'}
          </button>
        </div>
      </div>
    </div>
  );
}
