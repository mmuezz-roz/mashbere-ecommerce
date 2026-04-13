'use client';

import { useState } from 'react';
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

const INITIAL: FormData = {
  name: '', description: '', price: '0', category: 'ice-cream', businessType: 'b2c',
  image: '', stock: '0', slug: '', type: '', featured: false, isQuoteRequired: false,
  flavors: [], variants: [],
};

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(INITIAL);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newFlavor, setNewFlavor] = useState('');
  const [newVariant, setNewVariant] = useState('');

  const set = (key: keyof FormData, value: unknown) => setForm(prev => ({ ...prev, [key]: value }));

  const handleNameChange = (name: string) => {
    set('name', name);
    if (!form.slug || form.slug === slugify(form.name)) {
      set('slug', slugify(name));
    }
  };

  const addTag = (field: 'flavors' | 'variants', val: string) => {
    if (!val.trim()) return;
    set(field, [...form[field], val.trim()]);
    field === 'flavors' ? setNewFlavor('') : setNewVariant('');
  };

  const removeTag = (field: 'flavors' | 'variants', i: number) => {
    set(field, form[field].filter((_, idx) => idx !== i));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.image.trim()) { toast.error('Image URL is required'); return; }
    if (!form.slug.trim()) { toast.error('Slug is required'); return; }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
        }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success('Product created!');
        router.push('/admin/products');
      } else {
        toast.error(json.message);
        if (json.errors) {
          json.errors.forEach((err: { message: string }) => toast.error(err.message));
        }
      }
    } catch { toast.error('Failed to create product'); }
    finally { setSaving(false); }
  };

  return (
    <div>
      <AdminHeader title="New Product" subtitle="Add a product to your catalog" />

      <div className="p-6 lg:p-8 max-w-4xl">
        <Link href="/admin/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors">
          <ArrowLeft size={16} />
          Back to Products
        </Link>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <Section title="Basic Information">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <Label>Product Name *</Label>
                <input type="text" required value={form.name} onChange={e => handleNameChange(e.target.value)} className={inputCls} placeholder="e.g. Mango Popsicle" />
              </div>
              <div className="sm:col-span-2">
                <Label>Description *</Label>
                <textarea required value={form.description} onChange={e => set('description', e.target.value)} rows={3} className={`${inputCls} resize-none`} placeholder="Describe the product…" />
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
                <input type="number" min="0" step="0.01" value={form.price} onChange={e => set('price', e.target.value)} className={inputCls} placeholder="0.00" />
              </div>
              <div>
                <Label>Stock Quantity</Label>
                <input type="number" min="0" value={form.stock} onChange={e => set('stock', e.target.value)} className={inputCls} placeholder="0" />
              </div>
              <div>
                <Label>Type / Sub-type</Label>
                <input type="text" value={form.type} onChange={e => set('type', e.target.value)} className={inputCls} placeholder="e.g. gelato, freezer" />
              </div>
              <div>
                <Label>URL Slug *</Label>
                <input required type="text" value={form.slug} onChange={e => set('slug', slugify(e.target.value))} className={inputCls} placeholder="auto-generated from name" />
              </div>
            </div>
          </Section>

          {/* Image */}
          <Section title="Product Image">
            <div className="space-y-4">
              <Label>Upload Image *</Label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    setUploading(true);
                    const formData = new FormData();
                    formData.append('file', file);

                    try {
                      const res = await fetch('/api/upload', {
                        method: 'POST',
                        body: formData,
                      });
                      const data = await res.json();
                      if (data.success) {
                        set('image', data.url);
                        toast.success('Image uploaded successfully!');
                      } else {
                        toast.error('Upload failed: ' + data.message);
                      }
                    } catch {
                      toast.error('Failed to upload image');
                    } finally {
                      setUploading(false);
                    }
                  }}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className={`flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold cursor-pointer hover:bg-gray-200 transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {uploading ? (
                    <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  ) : <Plus size={16} />}
                  {uploading ? 'Uploading...' : 'Choose File'}
                </label>
                <span className="text-xs text-gray-400">or enter URL below</span>
              </div>

              <input
                type="url"
                required
                value={form.image}
                onChange={(e) => set('image', e.target.value)}
                className={inputCls}
                placeholder="https://cloudinary.com/..."
              />
            </div>
            {form.image && (
              <div className="mt-4 w-44 h-44 rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 relative group">
                <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => set('image', '')}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </Section>

          {/* Variants & Flavors */}
          <Section title="Variants & Flavors">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label>Flavors</Label>
                <div className="flex gap-2 mb-3">
                  <input type="text" value={newFlavor} onChange={e => setNewFlavor(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag('flavors', newFlavor); } }}
                    className={inputCls} placeholder="Add flavor…" />
                  <button type="button" onClick={() => addTag('flavors', newFlavor)} className="p-2.5 bg-[#708238] text-white rounded-xl hover:bg-[#5a6a2c] transition-colors flex-shrink-0">
                    <Plus size={16} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.flavors.map((f, i) => (
                    <TagChip key={i} label={f} onRemove={() => removeTag('flavors', i)} />
                  ))}
                </div>
              </div>
              <div>
                <Label>Variants</Label>
                <div className="flex gap-2 mb-3">
                  <input type="text" value={newVariant} onChange={e => setNewVariant(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag('variants', newVariant); } }}
                    className={inputCls} placeholder="Add variant…" />
                  <button type="button" onClick={() => addTag('variants', newVariant)} className="p-2.5 bg-[#708238] text-white rounded-xl hover:bg-[#5a6a2c] transition-colors flex-shrink-0">
                    <Plus size={16} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.variants.map((v, i) => (
                    <TagChip key={i} label={v} onRemove={() => removeTag('variants', i)} />
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* Flags */}
          <Section title="Product Flags">
            <div className="flex flex-wrap gap-6">
              {([
                { key: 'featured',        label: 'Featured Product' },
                { key: 'isQuoteRequired', label: 'Quote Required (B2B)' },
              ] as { key: keyof FormData; label: string }[]).map(({ key, label }) => (
                <label key={key} className="flex items-center gap-3 cursor-pointer select-none">
                  <div
                    onClick={() => set(key, !form[key])}
                    className={`w-11 h-6 rounded-full transition-colors relative ${form[key] ? 'bg-[#708238]' : 'bg-gray-200'}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${form[key] ? 'translate-x-5' : ''}`} />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </Section>

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <Link href="/admin/products" className="px-5 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-[#708238] text-white rounded-xl text-sm font-bold hover:bg-[#5a6a2c] transition-colors disabled:opacity-60 shadow-sm"
            >
              {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />}
              {saving ? 'Creating…' : 'Create Product'}
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
