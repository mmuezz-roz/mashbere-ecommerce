'use client';

import { useEffect, useState, useCallback } from 'react';
import { Search, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import StatusBadge from '@/components/admin/StatusBadge';
import { toast } from 'sonner';

interface Order {
  _id: string;
  deliveryInfo: { firstName: string; lastName: string; email: string; phone: string };
  total: number;
  status: string;
  paymentStatus: string;
  paymentInfo: { method: string };
  createdAt: string;
  items: Array<{ name: string; quantity: number }>;
}

const ORDER_STATUSES = ['pending', 'processing', 'shipped', 'completed', 'cancelled'];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: '15' });
    if (search) params.set('search', search);
    if (statusFilter) params.set('status', statusFilter);
    try {
      const res = await fetch(`/api/admin/orders?${params}`);
      const json = await res.json();
      if (json.success) {
        setOrders(json.data.orders);
        setTotal(json.data.total);
        setTotalPages(json.data.totalPages);
      } else toast.error(json.message);
    } catch { toast.error('Failed to fetch orders'); }
    finally { setLoading(false); }
  }, [page, search, statusFilter]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success('Status updated');
        setOrders(prev => prev.map(o => o._id === id ? { ...o, status } : o));
      } else toast.error(json.message);
    } catch { toast.error('Update failed'); }
    finally { setUpdatingId(null); }
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div>
      <AdminHeader title="Orders" subtitle="View and manage customer orders" />

      <div className="p-6 lg:p-8 max-w-[1400px]">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by customer email or name…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#708238]/30 focus:border-[#708238] bg-white"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none"
          >
            <option value="">All Statuses</option>
            {ORDER_STATUSES.map(s => <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
          <button onClick={fetchOrders} className="p-2.5 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors">
            <RefreshCw size={16} />
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-5 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Customer</th>
                  <th className="text-left px-5 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Items</th>
                  <th className="text-left px-5 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Total</th>
                  <th className="text-left px-5 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Payment</th>
                  <th className="text-left px-5 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="text-left px-5 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  [...Array(8)].map((_, i) => (
                    <tr key={i}>
                      {[...Array(6)].map((_, j) => (
                        <td key={j} className="px-5 py-4"><div className="h-4 bg-gray-100 rounded animate-pulse" /></td>
                      ))}
                    </tr>
                  ))
                ) : orders.length === 0 ? (
                  <tr><td colSpan={6} className="px-5 py-16 text-center text-gray-400 font-medium">No orders found</td></tr>
                ) : (
                  orders.map(order => (
                    <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-900">{order.deliveryInfo.firstName} {order.deliveryInfo.lastName}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{order.deliveryInfo.email}</p>
                      </td>
                      <td className="px-5 py-4 text-gray-500">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</td>
                      <td className="px-5 py-4 font-bold text-gray-900">AED {order.total.toFixed(2)}</td>
                      <td className="px-5 py-4">
                        <div className="flex flex-col gap-1">
                          <StatusBadge status={order.paymentStatus} />
                          <span className="text-xs text-gray-400 uppercase">{order.paymentInfo.method}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-500 whitespace-nowrap">{formatDate(order.createdAt)}</td>
                      <td className="px-5 py-4">
                        <select
                          value={order.status}
                          disabled={updatingId === order._id}
                          onChange={(e) => updateStatus(order._id, e.target.value)}
                          className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-[#708238]/30 disabled:opacity-50 cursor-pointer"
                        >
                          {ORDER_STATUSES.map(s => (
                            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 font-medium">
                {total} total orders — Page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40">
                  <ChevronLeft size={16} />
                </button>
                <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
