'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, X, Save } from 'lucide-react';
import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';
import { toast } from 'sonner';

interface FormData {
  name: string;
  description: string;
  price: string;
  category: string;
  businessType: string;
  image: string;
  stock: string;
  slug: string;
  type: string;
  featured: boolean;
  isQuoteRequired: boolean;
  flavors: string[];
  variants: string[];
}

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [form, setForm] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newFlavor, setNewFlavor] = useState('');
  const [newVariant, setNewVariant] = useState('');

  useEffect(() => {
    fetch(`/api/admin/products/${id}`)
      .then(r => r.json())
      .then(json => {
        if (json.success) {
          const p = json.data;
          setForm({
            name: p.name ?? '',
            description: p.description ?? '',
            price: String(p.price ?? 0),
            category: p.category ?? 'ice-cream',
            businessType: p.businessType ?? 'b2c',
            image: p.image ?? '',
            stock: String(p.stock ?? 0),
            slug: p.slug ?? '',
            type: p.type ?? '',
            featured: !!p.featured,
            isQuoteRequired: !!p.isQuoteRequired,
            flavors: p.flavors ?? [],
            variants: p.variants ?? [],
          });
        } else toast.error(json.message);
      })
      .catch(() => toast.error('Failed to load product'))
      .finally(() => setLoading(false));
  }, [id]);

  const set = (key: keyof FormData, value: unknown) => setForm(prev => prev ? { ...prev, [key]: value } : prev);

  const addTag = (field: 'flavors' | 'variants', val: string) => {
    if (!val.trim() || !form) return;
    set(field, [...form[field], val.trim()]);
    field === 'flavors' ? setNewFlavor('') : setNewVariant('');
  };

  const removeTag = (field: 'flavors' | 'variants', i: number) => {
    if (!form) return;
    set(field, form[field].filter((_, idx) => idx !== i));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
        }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success('Product updated!');
        router.push('/admin/products');
      } else {
        toast.error(json.message);
        if (json.errors) json.errors.forEach((err: { message: string }) => toast.error(err.message));
      }
    } catch { toast.error('Failed to update product'); }
    finally { setSaving(false); }
  };

  if (loading) {
    return (
      <div>
        <AdminHeader title="Edit Product" subtitle="Loading…" />
        <div className="p-8 max-w-4xl space-y-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-white rounded-2xl border border-gray-100 animate-pulse" />)}
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div>
        <AdminHeader title="Edit Product" subtitle="Product not found" />
        <div className="p-8">
          <Link href="/admin/products" className="text-[#708238] font-semibold hover:underline">← Back to Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader title="Edit Product" subtitle={form.name} />

      <div className="p-6 lg:p-8 max-w-4xl">
        <Link href="/admin/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors">
          <ArrowLeft size={16} />
          Back to Products
        </Link>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Section title="Basic Information">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <Label>Product Name *</Label>
                <input type="text" required value={form.name} onChange={e => set('name', e.target.value)} className={inputCls} />
              </div>
              <div className="sm:col-span-2">
                <Label>Description *</Label>
                <textarea required value={form.description} onChange={e => set('description', e.target.value)} rows={3} className={`${inputCls} resize-none`} />
              </div>
              <div>
                <Label>Category *</Label>
                <select required value={form.category} onChange={e => set('category', e.target.value)} className={inputCls}>
                  <option value="ice-cream">Ice Cream</option>
                  <option value="popsicle">Popsicle</option>
                  <option value="equipment">Equipment</option>
                  <option value="sip-up">Sip Up</option>
                </select>
              </div>
              <div>
                <Label>Business Type *</Label>
                <select value={form.businessType} onChange={e => set('businessType', e.target.value)} className={inputCls}>
                  <option value="b2c">B2C (Consumer)</option>
                  <option value="b2b">B2B (Business)</option>
                </select>
              </div>
              <div>
                <Label>Price (AED)</Label>
                <input type="number" min="0" step="0.01" value={form.price} onChange={e => set('price', e.target.value)} className={inputCls} />
              </div>
              <div>
                <Label>Stock Quantity</Label>
                <input type="number" min="0" value={form.stock} onChange={e => set('stock', e.target.value)} className={inputCls} />
              </div>
              <div>
                <Label>Type / Sub-type</Label>
                <input type="text" value={form.type} onChange={e => set('type', e.target.value)} className={inputCls} />
              </div>
              <div>
                <Label>URL Slug *</Label>
                <input required type="text" value={form.slug} onChange={e => set('slug', slugify(e.target.value))} className={inputCls} />
              </div>
            </div>
          </Section>

          <Section title="Product Image">
            <div>
              <Label>Image URL *</Label>
              <input type="url" required value={form.image} onChange={e => set('image', e.target.value)} className={inputCls} />
            </div>
            {form.image && (
              <div className="mt-4 w-32 h-32 rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
                <img src={form.image} alt="Preview" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
            )}
          </Section>

          <Section title="Variants & Flavors">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label>Flavors</Label>
                <div className="flex gap-2 mb-3">
                  <input type="text" value={newFlavor} onChange={e => setNewFlavor(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag('flavors', newFlavor); } }}
                    className={inputCls} placeholder="Add flavor…" />
                  <button type="button" onClick={() => addTag('flavors', newFlavor)} className="p-2.5 bg-[#708238] text-white rounded-xl hover:bg-[#5a6a2c] transition-colors flex-shrink-0"><Plus size={16} /></button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.flavors.map((f, i) => <TagChip key={i} label={f} onRemove={() => removeTag('flavors', i)} />)}
                </div>
              </div>
              <div>
                <Label>Variants</Label>
                <div className="flex gap-2 mb-3">
                  <input type="text" value={newVariant} onChange={e => setNewVariant(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag('variants', newVariant); } }}
                    className={inputCls} placeholder="Add variant…" />
                  <button type="button" onClick={() => addTag('variants', newVariant)} className="p-2.5 bg-[#708238] text-white rounded-xl hover:bg-[#5a6a2c] transition-colors flex-shrink-0"><Plus size={16} /></button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.variants.map((v, i) => <TagChip key={i} label={v} onRemove={() => removeTag('variants', i)} />)}
                </div>
              </div>
            </div>
          </Section>

          <Section title="Product Flags">
            <div className="flex flex-wrap gap-6">
              {([
                { key: 'featured',        label: 'Featured Product' },
                { key: 'isQuoteRequired', label: 'Quote Required (B2B)' },
              ] as { key: keyof FormData; label: string }[]).map(({ key, label }) => (
                <label key={key} className="flex items-center gap-3 cursor-pointer select-none">
                  <div onClick={() => set(key, !form[key])} className={`w-11 h-6 rounded-full transition-colors relative ${form[key] ? 'bg-[#708238]' : 'bg-gray-200'}`}>
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${form[key] ? 'translate-x-5' : ''}`} />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </Section>

          <div className="flex gap-3 pt-2">
            <Link href="/admin/products" className="px-5 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </Link>
            <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-[#708238] text-white rounded-xl text-sm font-bold hover:bg-[#5a6a2c] transition-colors disabled:opacity-60 shadow-sm">
              {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />}
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="font-black text-gray-900 text-sm">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">{children}</label>;
}

function TagChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#708238]/10 text-[#708238] rounded-lg text-xs font-bold border border-[#708238]/20">
      {label}
      <button type="button" onClick={onRemove} className="text-[#708238]/60 hover:text-[#708238]"><X size={12} /></button>
    </span>
  );
}

const inputCls = 'w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#708238]/30 focus:border-[#708238] transition-colors';
