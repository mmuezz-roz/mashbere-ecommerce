'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Plus, Search, Pencil, Trash2, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import StatusBadge from '@/components/admin/StatusBadge';
import ConfirmModal from '@/components/admin/ConfirmModal';
import { toast } from 'sonner';

interface Product {
  _id: string;
  name: string;
  category: string;
  businessType: string;
  price: number;
  stock: number;
  featured: boolean;
  image: string;
  createdAt: string;
}

interface PaginatedProducts {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

export default function ProductsPage() {
  const [data, setData] = useState<PaginatedProducts | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: '15' });
    if (search) params.set('search', search);
    if (category) params.set('category', category);

    try {
      const res = await fetch(`/api/admin/products?${params}`);
      const json = await res.json();
      if (json.success) setData(json.data);
      else toast.error(json.message);
    } catch {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [page, search, category]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/products/${deleteId}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        toast.success('Product deleted');
        setDeleteId(null);
        fetchProducts();
      } else {
        toast.error(json.message);
      }
    } catch {
      toast.error('Failed to delete product');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <AdminHeader title="Products" subtitle="Manage your product catalog" />

      <div className="p-6 lg:p-8 max-w-[1400px]">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#708238]/30 focus:border-[#708238] bg-white"
            />
          </div>
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#708238]/30"
          >
            <option value="">All Categories</option>
            <option value="ice-cream">Ice Cream</option>
            <option value="popsicle">Popsicle</option>
            <option value="equipment">Equipment</option>
            <option value="sip-up">Sip Up</option>
          </select>
          <button onClick={fetchProducts} className="p-2.5 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors">
            <RefreshCw size={16} />
          </button>
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#708238] text-white rounded-xl text-sm font-bold hover:bg-[#5a6a2c] transition-colors shadow-sm"
          >
            <Plus size={16} />
            Add Product
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-5 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Product</th>
                  <th className="text-left px-5 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Category</th>
                  <th className="text-left px-5 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Type</th>
                  <th className="text-left px-5 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Price</th>
                  <th className="text-left px-5 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Stock</th>
                  <th className="text-left px-5 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  [...Array(8)].map((_, i) => (
                    <tr key={i}>
                      {[...Array(6)].map((_, j) => (
                        <td key={j} className="px-5 py-4">
                          <div className="h-4 bg-gray-100 rounded animate-pulse" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : data?.products.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center text-gray-400 font-medium">
                      No products found
                    </td>
                  </tr>
                ) : (
                  data?.products.map((p) => (
                    <tr key={p._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-10 h-10 rounded-xl object-cover bg-gray-100 flex-shrink-0"
                            onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.png'; }}
                          />
                          <span className="font-semibold text-gray-900 truncate max-w-[200px]">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={p.category} />
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={p.businessType} />
                      </td>
                      <td className="px-5 py-4 font-semibold text-gray-900">
                        {p.price > 0 ? `AED ${p.price}` : '—'}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`font-bold ${p.stock === 0 ? 'text-rose-600' : p.stock <= 10 ? 'text-amber-600' : 'text-gray-900'}`}>
                          {p.stock}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/products/edit/${p._id}`}
                            className="p-2 rounded-lg text-gray-400 hover:text-[#708238] hover:bg-[#708238]/10 transition-all"
                          >
                            <Pencil size={15} />
                          </Link>
                          <button
                            onClick={() => setDeleteId(p._id)}
                            className="p-2 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                          >
                            <Trash2 size={15} />
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
          {data && data.totalPages > 1 && (
            <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 font-medium">
                Showing {((page - 1) * 15) + 1}–{Math.min(page * 15, data.total)} of {data.total}
              </p>
              <div className="flex gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  disabled={page === data.totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Product"
        message="This will permanently remove the product. This action cannot be undone."
        confirmLabel="Delete"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
