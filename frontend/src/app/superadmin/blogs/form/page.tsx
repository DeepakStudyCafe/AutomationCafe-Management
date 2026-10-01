'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import Link from 'next/link';
import { ArrowLeft, Save, Globe, Search, Share2, Eye } from 'lucide-react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

// Dynamically import ReactQuill to prevent SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function BlogFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');
  const isEditing = !!editId;

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    featuredImage: '',
    content: '',
    tags: '',
    metaTitle: '',
    metaDescription: '',
    focusKeyword: '',
    metaKeywords: '',
    ogImage: '',
    status: 'Draft'
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing) {
      setFetching(true);
      api.get(`/api/v1/blogs/admin/${editId}`)
        .then(res => {
          const blog = res.data.data;
          setFormData({
            title: blog.Title || '',
            slug: blog.Slug || '',
            featuredImage: blog.FeaturedImage || '',
            content: blog.Content || '',
            tags: blog.Tags || '',
            metaTitle: blog.MetaTitle || '',
            metaDescription: blog.MetaDescription || '',
            focusKeyword: blog.FocusKeyword || '',
            metaKeywords: blog.MetaKeywords || '',
            ogImage: blog.OgImage || '',
            status: blog.Status || 'Draft'
          });
        })
        .catch(err => {
          setError("Failed to fetch blog post for editing.");
        })
        .finally(() => {
          setFetching(false);
        });
    }
  }, [editId, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const handleSave = async (status: string) => {
    if (!formData.title) {
      setError("Post Title is required");
      return;
    }
    if (!formData.content || formData.content === '<p><br></p>') {
      setError("Content is required");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const payload = { ...formData, status };
      if (isEditing) {
        await api.put(`/api/v1/blogs/admin/${editId}`, payload);
      } else {
        await api.post('/api/v1/blogs/admin', payload);
      }
      router.push('/superadmin/blogs');
    } catch (err: any) {
      setError(err.response?.data?.error || "An error occurred while saving blog post.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Preview Logic
  const displayTitle = formData.metaTitle || formData.title || 'Your blog title here...';
  const displayDesc = formData.metaDescription || 'Your meta description will appear here...';
  const displayUrl = `automationcafe.in/Blog/${formData.slug || 'your-slug'}`;

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-sans pb-12">
      <div className="flex items-center gap-4">
        <Link href="/superadmin/blogs" className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{isEditing ? 'Edit Blog Post' : 'Create New Post'}</h1>
          <p className="text-sm text-slate-500">Draft, optimize, and publish your content.</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* LEFT COLUMN - Main Content */}
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Post Title <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow" 
                placeholder="Enter an engaging title..." 
              />
              <p className="text-xs text-slate-400 mt-2">URL: automationcafe.in/Blog/{formData.slug || '...'}</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-semibold text-slate-700">Slug <span className="text-slate-400 font-normal text-xs">(auto-generated)</span></label>
              </div>
              <input 
                type="text" 
                name="slug" 
                value={formData.slug} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" 
                placeholder="leave-blank-to-auto-generate" 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Featured Image</label>
              <div className="flex gap-3">
                <input 
                  type="text" 
                  name="featuredImage" 
                  value={formData.featuredImage} 
                  onChange={handleChange} 
                  className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" 
                  placeholder="https://... or upload below" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Content <span className="text-red-500">*</span></label>
              <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                <ReactQuill 
                  theme="snow" 
                  value={formData.content} 
                  onChange={handleContentChange} 
                  className="h-96"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tags</label>
              <input 
                type="text" 
                name="tags" 
                value={formData.tags} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" 
                placeholder="GST, Automation, CA Tools" 
              />
              <p className="text-xs text-slate-400 mt-1">Comma-separated. Used for filtering and SEO.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button 
              type="button" 
              onClick={() => handleSave('Draft')}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-300 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> Save Draft
            </button>
            <button 
              type="button" 
              onClick={() => handleSave('Published')}
              disabled={loading}
              className="flex items-center gap-2 px-8 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50"
            >
              <Globe className="w-4 h-4" /> Publish Now
            </button>
            <Link href="/superadmin/blogs" className="px-4 py-2.5 text-slate-500 text-sm font-medium hover:text-slate-800 underline transition-colors">
              Cancel
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN - Sidebar Settings */}
        <div className="w-full lg:w-80 space-y-6">
          
          {/* SEO Settings Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-purple-50/50 px-4 py-3 border-b border-purple-100 flex items-center gap-2">
              <Search className="w-4 h-4 text-purple-600" />
              <h3 className="font-bold text-sm text-purple-800">SEO SETTINGS</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  Meta Title <span className={`${formData.metaTitle.length > 60 ? 'text-red-500' : 'text-emerald-500'}`}>{formData.metaTitle.length}/70</span>
                </label>
                <input 
                  type="text" 
                  name="metaTitle" 
                  value={formData.metaTitle} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none" 
                  placeholder="SEO title (default: post title)" 
                />
                <p className="text-[10px] text-slate-400 mt-1">Appears in Google results. 50-60 chars ideal.</p>
              </div>

              <div>
                <label className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  Meta Description <span className={`${formData.metaDescription.length > 160 ? 'text-red-500' : 'text-emerald-500'}`}>{formData.metaDescription.length}/160</span>
                </label>
                <textarea 
                  name="metaDescription" 
                  value={formData.metaDescription} 
                  onChange={handleChange} 
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none" 
                  placeholder="Brief description for Google snippets..." 
                />
                <p className="text-[10px] text-slate-400 mt-1">120-160 chars ideal for Google.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Focus Keyword</label>
                <input 
                  type="text" 
                  name="focusKeyword" 
                  value={formData.focusKeyword} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none" 
                  placeholder="e.g. GST automation software" 
                />
                <p className="text-[10px] text-slate-400 mt-1">Primary keyword to rank for.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Meta Keywords</label>
                <input 
                  type="text" 
                  name="metaKeywords" 
                  value={formData.metaKeywords} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none" 
                  placeholder="keyword1, keyword2, keyword3" 
                />
              </div>
            </div>
          </div>

          {/* Social Share Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-purple-50/50 px-4 py-3 border-b border-purple-100 flex items-center gap-2">
              <Share2 className="w-4 h-4 text-purple-600" />
              <h3 className="font-bold text-sm text-purple-800">SOCIAL SHARE (OG)</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">OG Image URL</label>
                <input 
                  type="text" 
                  name="ogImage" 
                  value={formData.ogImage} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none" 
                  placeholder="https://... (1200x630 px ideal)" 
                />
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">Shown when sharing on Facebook, LinkedIn etc. Leave blank to use featured image.</p>
              </div>
            </div>
          </div>

          {/* Google Preview Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-purple-50/50 px-4 py-3 border-b border-purple-100 flex items-center gap-2">
              <Eye className="w-4 h-4 text-purple-600" />
              <h3 className="font-bold text-sm text-purple-800">GOOGLE PREVIEW</h3>
            </div>
            <div className="p-4">
              <div className="p-3 bg-white border border-slate-100 shadow-sm rounded-lg">
                <div className="text-[14px] text-[#1a0dab] truncate font-medium hover:underline cursor-pointer">{displayTitle}</div>
                <div className="text-[12px] text-[#006621] truncate mt-0.5">{displayUrl}</div>
                <div className="text-[12px] text-[#545454] mt-1 line-clamp-2 leading-relaxed">{displayDesc}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
