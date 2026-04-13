'use client';

import { useEffect, useState, useCallback } from 'react';
import { Search, RefreshCw, ChevronLeft, ChevronRight, Mail } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import StatusBadge from '@/components/admin/StatusBadge';
import { toast } from 'sonner';

interface Quote {
  _id: string;
  name: string;
  company?: string;
  email: string;
  equipmentInterest: string;
  message: string;
  status: string;
  createdAt: string;
}

const QUOTE_STATUSES = ['new', 'contacted', 'closed'];

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchQuotes = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: '15' });
    if (search) params.set('search', search);
    if (statusFilter) params.set('status', statusFilter);
    try {
      const res = await fetch(`/api/admin/quotes?${params}`);
      const json = await res.json();
      if (json.success) {
        setQuotes(json.data.quotes);
        setTotal(json.data.total);
        setTotalPages(json.data.totalPages);
      } else toast.error(json.message);
    } catch { toast.error('Failed to fetch quotes'); }
    finally { setLoading(false); }
  }, [page, search, statusFilter]);

  useEffect(() => { fetchQuotes(); }, [fetchQuotes]);

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/quotes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success('Status updated');
        setQuotes(prev => prev.map(q => q._id === id ? { ...q, status } : q));
      } else toast.error(json.message);
    } catch { toast.error('Update failed'); }
    finally { setUpdatingId(null); }
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div>
      <AdminHeader title="B2B Quotes" subtitle="Manage equipment inquiries and leads" />

      <div className="p-6 lg:p-8 max-w-[1400px]">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or company…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#708238]/30 bg-white"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none"
          >
            <option value="">All Statuses</option>
            {QUOTE_STATUSES.map(s => <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
          <button onClick={fetchQuotes} className="p-2.5 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors">
            <RefreshCw size={16} />
          </button>
        </div>

        <div className="space-y-3">
          {loading ? (
            [...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 h-24 animate-pulse" />
            ))
          ) : quotes.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 py-20 text-center text-gray-400 font-medium">
              No quotes found
            </div>
          ) : (
            quotes.map(quote => (
              <div key={quote._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div
                  className="flex items-start gap-4 p-5 cursor-pointer hover:bg-gray-50/50 transition-colors"
                  onClick={() => setExpanded(expanded === quote._id ? null : quote._id)}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                    {quote.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900">{quote.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{quote.email} {quote.company ? `· ${quote.company}` : ''}</p>
                        <p className="text-sm text-gray-600 mt-1 font-medium truncate">{quote.equipmentInterest}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-xs text-gray-400 whitespace-nowrap">{formatDate(quote.createdAt)}</span>
                        <StatusBadge status={quote.status} />
                      </div>
                    </div>
                  </div>
                </div>

                {expanded === quote._id && (
                  <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 bg-gray-50 rounded-xl p-4">{quote.message}</p>
                    <div className="flex items-center gap-3">
                      <a
                        href={`mailto:${quote.email}`}
                        className="flex items-center gap-2 px-4 py-2 bg-[#708238] text-white rounded-xl text-xs font-bold hover:bg-[#5a6a2c] transition-colors"
                      >
                        <Mail size={14} />
                        Send Email
                      </a>
                      <select
                        value={quote.status}
                        disabled={updatingId === quote._id}
                        onChange={(e) => updateStatus(quote._id, e.target.value)}
                        className="px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-[#708238]/30 disabled:opacity-50"
                      >
                        {QUOTE_STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-xs text-gray-400 font-medium">{total} quotes — Page {page} of {totalPages}</p>
            <div className="flex gap-2">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="p-2 rounded-lg border border-gray-200 text-gray-500 disabled:opacity-40"><ChevronLeft size={16} /></button>
              <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="p-2 rounded-lg border border-gray-200 text-gray-500 disabled:opacity-40"><ChevronRight size={16} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
