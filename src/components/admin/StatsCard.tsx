import { LucideIcon } from 'lucide-react';

interface Props {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;         // Tailwind gradient classes e.g. "from-green-500 to-emerald-600"
  change?: string;       // e.g. "+12%" optional
  changePositive?: boolean;
}

export default function StatsCard({ label, value, icon: Icon, color, change, changePositive = true }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm group hover:shadow-md transition-shadow relative overflow-hidden">
      {/* Decorative glow */}
      <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${color} opacity-10 blur-2xl rounded-full`} />

      <div className="flex items-start justify-between mb-5">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-md`}>
          <Icon size={22} />
        </div>
        {change && (
          <span className={`text-xs font-black px-2 py-1 rounded-lg ${changePositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            {change}
          </span>
        )}
      </div>

      <p className="text-xs text-gray-400 font-black uppercase tracking-widest mb-1">{label}</p>
      <p className="text-2xl font-black text-gray-900">{value}</p>
    </div>
  );
}
