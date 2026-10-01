'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Eye, Ban, CheckCircle, FileText } from 'lucide-react';

export default function BlogsPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const pageSize = 50;

  const { data, isLoading } = useQuery({
    queryKey: ['admin-blogs', page],
    queryFn: async () => {
      const res = await api.get(`/api/v1/blogs/admin?page=${page}&pageSize=${pageSize}`);
      return res.data;
    }
  });

  const toggleStatusMutation = useMutation({
    mutationFn: async (id: number) => {
      await api.patch(`/api/v1/blogs/admin/${id}/toggle-status`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blogs'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      if (confirm('Are you sure you want to delete this blog post?')) {
        await api.delete(`/api/v1/blogs/admin/${id}`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blogs'] });
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-500" /> Blog Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">Manage your blog posts, write new content, and update existing articles.</p>
        </div>
        <Link 
          href="/superadmin/blogs/form" 
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
        >
          <Plus className="w-4 h-4" /> Create New Post
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-700">Post Title</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Author</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Created At</th>
                <th className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    <div className="flex justify-center mb-2">
                      <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    Loading blog posts...
                  </td>
                </tr>
              ) : data?.data?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No blog posts found.
                  </td>
                </tr>
              ) : (
                data?.data?.map((blog: any) => (
                  <tr key={blog.BlogID} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800 max-w-md truncate">{blog.Title}</div>
                      <div className="text-xs text-slate-400 mt-0.5 truncate max-w-md">/{blog.Slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                          {blog.AuthorName?.charAt(0) || 'A'}
                        </div>
                        <span className="text-slate-700">{blog.AuthorName || 'Admin'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${
                        blog.Status === 'Published' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {blog.Status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-sm">
                      {new Date(blog.CreatedAt).toLocaleDateString('en-IN', {
                        day: '2-digit', month: 'short', year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1 opacity-100">
                        <Link href={`/blog/${blog.Slug}`} target="_blank" className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors border border-transparent hover:border-indigo-100 shadow-sm" title="View Public Post">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link href={`/superadmin/blogs/form?id=${blog.BlogID}`} className="p-1.5 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors border border-transparent hover:border-blue-100 shadow-sm" title="Edit">
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => toggleStatusMutation.mutate(blog.BlogID)}
                          className={`p-1.5 rounded-md transition-colors border border-transparent shadow-sm ${blog.Status === 'Published' ? 'text-amber-400 hover:text-amber-600 hover:bg-amber-50 hover:border-amber-100' : 'text-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 hover:border-emerald-100'}`} 
                          title={blog.Status === 'Published' ? "Unpublish" : "Publish"}
                        >
                          {blog.Status === 'Published' ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                        </button>
                        <button 
                          onClick={() => deleteMutation.mutate(blog.BlogID)}
                          className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors border border-transparent hover:border-red-100 shadow-sm" 
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data?.pagination && data.pagination.totalPages > 1 && (
          <div className="border-t px-6 py-4 bg-slate-50 flex items-center justify-between text-sm text-slate-500">
            <div>
              Showing <span className="font-medium text-slate-700">{(page - 1) * pageSize + 1}</span> to <span className="font-medium text-slate-700">{Math.min(page * pageSize, data.pagination.total)}</span> of <span className="font-medium text-slate-700">{data.pagination.total}</span> posts
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))} 
                disabled={page === 1} 
                className="px-3 py-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 font-medium transition-colors"
              >
                Prev
              </button>
              <div className="px-4 py-1.5 font-medium text-slate-700">{page} / {data.pagination.totalPages}</div>
              <button 
                onClick={() => setPage(p => Math.min(data.pagination.totalPages, p + 1))} 
                disabled={page >= data.pagination.totalPages} 
                className="px-3 py-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 font-medium transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
