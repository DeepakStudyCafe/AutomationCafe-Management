'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    profession: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // In a real flow, this goes to /api/v1/auth/register.
      // We didn't build the auth register API yet because the legacy app might use an SP for this. 
      // But we will hit the endpoint assuming we build it.
      const res = await api.post('/api/v1/auth/register', formData);
      if (res.data.success) {
        router.push('/account/login');
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 py-12">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create an Account</h1>
          <p className="text-sm text-slate-500 mt-1">Join StudyCafe and access premium tools.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
            <input 
              name="fullName"
              type="text" 
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              placeholder="John Doe"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
              <input 
                name="email"
                type="email" 
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Mobile Number</label>
              <input 
                name="mobile"
                type="text" 
                required
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                placeholder="9876543210"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Profession</label>
            <select 
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm bg-white"
            >
              <option value="">Select Profession</option>
              <option value="CA">Chartered Accountant (CA)</option>
              <option value="CS">Company Secretary (CS)</option>
              <option value="CMA">CMA</option>
              <option value="Advocate">Advocate</option>
              <option value="Student">Student</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <input 
                name="password"
                type="password" 
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
              <input 
                name="confirmPassword"
                type="password" 
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-70 mt-4"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-8">
          Already have an account? <Link href="/login" className="text-blue-600 font-medium hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
