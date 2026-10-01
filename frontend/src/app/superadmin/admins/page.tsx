'use client';

import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Search, Plus, Edit, Trash2, Power, PowerOff, Shield, ShieldAlert, Key, X } from 'lucide-react';

export default function AdminsPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<any>(null);

  // Form state
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
    role: 'admin',
    canGrantPremium: false,
    modulePermissions: [] as string[]
  });

  const availableModules = [
    'analytics', 'users', 'coupons', 'devices', 'blogs', 'referrals', 'demo-bookings', 'email-sender', 'authors', 'tally-tools'
  ];

  const { data, isLoading } = useQuery({
    queryKey: ['admins', page, pageSize, searchQuery, roleFilter, statusFilter],
    queryFn: async () => {
      const res = await api.get('/api/v1/admins', {
        params: { page, pageSize, search: searchQuery, role: roleFilter, status: statusFilter }
      });
      return res.data;
    }
  });

  const toggleStatusMutation = useMutation({
    mutationFn: (id: number) => api.patch(`/api/v1/admins/${id}/toggle`),
    onSuccess: () => {
      alert('Status updated');
      queryClient.invalidateQueries({ queryKey: ['admins'] });
    },
    onError: (err: any) => alert(err.response?.data?.error?.message || 'Failed to update status')
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/api/v1/admins/${id}`),
    onSuccess: () => {
      alert('Admin deleted');
      queryClient.invalidateQueries({ queryKey: ['admins'] });
    },
    onError: (err: any) => alert(err.response?.data?.error?.message || 'Failed to delete')
  });

  const saveMutation = useMutation({
    mutationFn: async (payload: any) => {
      if (editingAdmin) {
        return api.put(`/api/v1/admins/${editingAdmin.AdminID}`, payload);
      }
      return api.post('/api/v1/admins', payload);
    },
    onSuccess: () => {
      alert(editingAdmin ? 'Admin updated' : 'Admin created');
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['admins'] });
    },
    onError: (err: any) => alert(err.response?.data?.error?.message || 'Failed to save admin')
  });

  const openCreate = () => {
    setEditingAdmin(null);
    setFormData({
      username: '', fullName: '', email: '', password: '', role: 'admin', canGrantPremium: false, modulePermissions: []
    });
    setIsModalOpen(true);
  };

  const openEdit = async (admin: any) => {
    setEditingAdmin(admin);
    let perms = [];
    if (admin.Role !== 'superadmin') {
      try {
        const res = await api.get(`/api/v1/admins/${admin.AdminID}/permissions`);
        perms = res.data.data;
      } catch (e) { }
    }
    setFormData({
      username: admin.Username || '',
      fullName: admin.FullName || '',
      email: admin.Email || '',
      password: '', // Blank password means do not update
      role: admin.Role || 'admin',
      canGrantPremium: !!admin.CanGrantPremium,
      modulePermissions: perms || []
    });
    setIsModalOpen(true);
  };

  const togglePermission = (mod: string) => {
    setFormData(prev => ({
      ...prev,
      modulePermissions: prev.modulePermissions.includes(mod)
        ? prev.modulePermissions.filter(m => m !== mod)
        : [...prev.modulePermissions, mod]
    }));
  };

  const renderPagination = () => {
    if (!data?.pagination) return null;
    const { page, totalPages } = data.pagination;
    const pages = [];

    // Always show first, last, and +/- 2 from current
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - 2 && i <= page + 2)) {
        pages.push(i);
      } else if (i === page - 3 || i === page + 3) {
        pages.push('...');
      }
    }

    return (
      <div className="flex items-center gap-1">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded hover:bg-slate-50 disabled:opacity-50 text-sm"
        >
          Previous
        </button>
        {pages.map((p, idx) => (
          <button
            key={idx}
            disabled={p === '...'}
            onClick={() => typeof p === 'number' && setPage(p)}
            className={`px-3 py-1 border rounded text-sm ${p === page ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-slate-50 text-slate-700'
              } ${p === '...' ? 'border-transparent bg-transparent hover:bg-transparent cursor-default' : ''}`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page >= totalPages}
          className="px-3 py-1 border rounded hover:bg-slate-50 disabled:opacity-50 text-sm"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Admin Management</h2>
          <p className="text-sm text-slate-500">Manage dashboard administrators and their roles/permissions.</p>
        </div>
        <button
          onClick={openCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Admin
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl border shadow-sm">
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search admins by name, username..."
            className="w-full pl-9 pr-4 py-2 rounded-md border text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setSearchQuery(search)}
            onBlur={() => setSearchQuery(search)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <select 
            className="px-3 py-2 rounded-md border text-sm outline-none focus:border-blue-500 bg-white"
            value={roleFilter}
            onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="superadmin">SuperAdmin</option>
          </select>
          
          <select 
            className="px-3 py-2 rounded-md border text-sm outline-none focus:border-blue-500 bg-white"
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b text-slate-600 font-medium">
              <tr>
                <th className="py-3 px-4">Admin</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Can Grant Premium</th>
                <th className="py-3 px-4">Last Login</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">Loading admins...</td>
                </tr>
              ) : data?.data?.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">No admins found.</td>
                </tr>
              ) : (
                data?.data.map((admin: any) => (
                  <tr key={admin.AdminID} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-900">{admin.FullName || admin.Username}</div>
                      <div className="text-slate-500 text-xs">@{admin.Username} {admin.Email ? `| ${admin.Email}` : ''}</div>
                    </td>
                    <td className="py-3 px-4">
                      {admin.Role === 'superadmin' ? (
                        <span className="inline-flex items-center gap-1 text-purple-700 bg-purple-100 px-2 py-0.5 rounded text-xs font-medium">
                          <ShieldAlert className="w-3.5 h-3.5" /> SuperAdmin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-blue-700 bg-blue-100 px-2 py-0.5 rounded text-xs font-medium">
                          <Shield className="w-3.5 h-3.5" /> Admin
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${admin.IsActive ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                        {admin.IsActive ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {admin.CanGrantPremium ? 'Yes' : 'No'}
                    </td>
                    <td className="py-3 px-4 text-slate-600 text-xs">
                      {admin.LastLogin ? new Date(admin.LastLogin).toLocaleString() : 'Never'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => toggleStatusMutation.mutate(admin.AdminID)}
                          title={admin.IsActive ? 'Disable' : 'Enable'}
                          className={`p-1.5 rounded-md ${admin.IsActive ? 'text-amber-600 hover:bg-amber-50' : 'text-emerald-600 hover:bg-emerald-50'}`}
                        >
                          {admin.IsActive ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => openEdit(admin)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete ${admin.Username}?`)) {
                              deleteMutation.mutate(admin.AdminID);
                            }
                          }}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"
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
          <div className="border-t px-6 py-4 flex items-center justify-between text-sm text-slate-600">
            <div>
              Showing <span className="font-medium">{(page - 1) * pageSize + 1}</span> to <span className="font-medium">{Math.min(page * pageSize, data.pagination.total)}</span> of <span className="font-medium">{data.pagination.total}</span> records
            </div>
            {renderPagination()}
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">
                {editingAdmin ? 'Edit Admin' : 'Create Admin'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Username *</label>
                  <input type="text" disabled={!!editingAdmin} value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:border-blue-500 disabled:bg-slate-100" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Full Name</label>
                  <input type="text" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Email</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Password {editingAdmin && '(Leave blank to keep current)'}</label>
                  <input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Role</label>
                  <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:border-blue-500">
                    <option value="admin">Admin</option>
                    <option value="superadmin">SuperAdmin</option>
                  </select>
                </div>
                <div className="flex items-center mt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.canGrantPremium} onChange={e => setFormData({ ...formData, canGrantPremium: e.target.checked })} className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm font-medium text-slate-700">Can Grant Premium</span>
                  </label>
                </div>
              </div>

              {formData.role === 'admin' && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-slate-900 mb-3 border-b pb-2">Module Permissions</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {availableModules.map(mod => (
                      <label key={mod} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.modulePermissions.includes(mod)}
                          onChange={() => togglePermission(mod)}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-slate-600 capitalize">{mod}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t bg-slate-50 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-md transition-colors">
                Cancel
              </button>
              <button
                onClick={() => saveMutation.mutate(formData)}
                disabled={saveMutation.isPending || (!editingAdmin && (!formData.username || !formData.password))}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors disabled:opacity-50"
              >
                {saveMutation.isPending ? 'Saving...' : (editingAdmin ? 'Update Admin' : 'Create Admin')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
