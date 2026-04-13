type Status =
  | 'pending' | 'processing' | 'completed' | 'cancelled' | 'shipped'
  | 'new' | 'contacted' | 'closed'
  | 'customer' | 'admin' | 'b2b'
  | 'paid' | 'failed';

const statusMap: Record<Status, { label: string; className: string }> = {
  // Orders
  pending:    { label: 'Pending',    className: 'bg-amber-50 text-amber-700 border-amber-200' },
  processing: { label: 'Processing', className: 'bg-blue-50 text-blue-700 border-blue-200' },
  completed:  { label: 'Completed',  className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  cancelled:  { label: 'Cancelled',  className: 'bg-rose-50 text-rose-700 border-rose-200' },
  shipped:    { label: 'Shipped',    className: 'bg-violet-50 text-violet-700 border-violet-200' },
  // Quotes
  new:        { label: 'New',        className: 'bg-sky-50 text-sky-700 border-sky-200' },
  contacted:  { label: 'Contacted',  className: 'bg-purple-50 text-purple-700 border-purple-200' },
  closed:     { label: 'Closed',     className: 'bg-gray-100 text-gray-500 border-gray-200' },
  // Roles
  customer:   { label: 'Customer',   className: 'bg-slate-50 text-slate-700 border-slate-200' },
  admin:      { label: 'Admin',      className: 'bg-[#708238]/10 text-[#708238] border-[#708238]/30' },
  b2b:        { label: 'B2B',        className: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  // Payment
  paid:       { label: 'Paid',       className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  failed:     { label: 'Failed',     className: 'bg-rose-50 text-rose-700 border-rose-200' },
};

interface Props {
  status: string;
}

export default function StatusBadge({ status }: Props) {
  const config = statusMap[status as Status] ?? { label: status, className: 'bg-gray-100 text-gray-600 border-gray-200' };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold border ${config.className}`}>
      {config.label}
    </span>
  );
}
