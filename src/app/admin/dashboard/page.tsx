'use client';

import { useEffect, useState } from 'react';
import { Package, ShoppingBag, Users, FileText, TrendingUp, AlertCircle } from 'lucide-react';
import StatsCard from '@/components/admin/StatsCard';
import AdminHeader from '@/components/admin/AdminHeader';
import Link from 'next/link';

interface Stats {
  products: { total: number; active: number; lowStock: number; outOfStock: number };
  orders: { total: number; pending: number; processing: number; completed: number; revenue: number };
  users: { total: number; admins: number; b2b: number; customers: number };
  quotes: { total: number; new: number; contacted: number; closed: number };
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setStats(json.data);
        else setError(json.message);
      })
      .catch(() => setError('Failed to load dashboard stats'))
      .finally(() => setLoading(false));
  }, []);

  const cards = stats
    ? [
        { label: 'Total Products',   value: stats.products.total,    icon: Package,    color: 'from-[#708238] to-[#4a5a25]' },
        { label: 'Total Orders',     value: stats.orders.total,      icon: ShoppingBag, color: 'from-blue-500 to-indigo-600' },
        { label: 'Total Users',      value: stats.users.total,       icon: Users,      color: 'from-purple-500 to-violet-600' },
        { label: 'B2B Quotes',       value: stats.quotes.total,      icon: FileText,   color: 'from-pink-500 to-rose-600' },
        { label: 'Revenue (AED)',     value: `AED ${stats.orders.revenue.toFixed(0)}`, icon: TrendingUp, color: 'from-amber-500 to-orange-600' },
        { label: 'Pending Orders',   value: stats.orders.pending,    icon: AlertCircle, color: 'from-rose-500 to-red-600' },
      ]
    : [];

  return (
    <div>
      <AdminHeader title="Dashboard" subtitle="Overview of your store" />

      <div className="p-6 lg:p-8 max-w-[1400px]">

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm font-medium">
            {error}
          </div>
        )}

        {/* Stats Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-36 border border-gray-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cards.map((c) => (
              <StatsCard key={c.label} {...c} />
            ))}
          </div>
        )}

        {/* Quick links */}
        <div className="mt-10">
          <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Add Product', href: '/admin/products/new', color: 'bg-[#708238] text-white' },
              { label: 'View Orders', href: '/admin/orders',       color: 'bg-blue-600 text-white' },
              { label: 'View Quotes', href: '/admin/quotes',       color: 'bg-purple-600 text-white' },
              { label: 'Manage Users', href: '/admin/users',       color: 'bg-gray-800 text-white' },
            ].map(({ label, href, color }) => (
              <Link
                key={href}
                href={href}
                className={`${color} rounded-xl px-4 py-4 text-sm font-bold text-center hover:opacity-90 transition-opacity shadow-sm`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Secondary stats */}
        {stats && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Orders breakdown */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-black text-gray-900 mb-4">Orders by Status</h3>
              <div className="space-y-3">
                {[
                  { label: 'Pending',    val: stats.orders.pending,    color: 'bg-amber-400' },
                  { label: 'Processing', val: stats.orders.processing, color: 'bg-blue-400' },
                  { label: 'Completed',  val: stats.orders.completed,  color: 'bg-emerald-400' },
                ].map(({ label, val, color }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
                    <span className="text-sm text-gray-500 flex-1">{label}</span>
                    <span className="text-sm font-black text-gray-900">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Product breakdown */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-black text-gray-900 mb-4">Inventory Health</h3>
              <div className="space-y-3">
                {[
                  { label: 'Active',     val: stats.products.active,    color: 'bg-emerald-400' },
                  { label: 'Low Stock',  val: stats.products.lowStock,  color: 'bg-amber-400' },
                  { label: 'Out of Stock', val: stats.products.outOfStock, color: 'bg-rose-400' },
                ].map(({ label, val, color }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
                    <span className="text-sm text-gray-500 flex-1">{label}</span>
                    <span className="text-sm font-black text-gray-900">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quotes breakdown */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-black text-gray-900 mb-4">Quote Pipeline</h3>
              <div className="space-y-3">
                {[
                  { label: 'New',       val: stats.quotes.new,       color: 'bg-sky-400' },
                  { label: 'Contacted', val: stats.quotes.contacted, color: 'bg-purple-400' },
                  { label: 'Closed',    val: stats.quotes.closed,    color: 'bg-gray-300' },
                ].map(({ label, val, color }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
                    <span className="text-sm text-gray-500 flex-1">{label}</span>
                    <span className="text-sm font-black text-gray-900">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
