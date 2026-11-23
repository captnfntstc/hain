'use client';

import React, { useState } from 'react';
import { useHain } from '../context/HainContext';
import { 
  CookingPot, 
  Check, 
  Plus, 
  Sparkles, 
  AlertCircle, 
  ShoppingBag, 
  Search,
  CheckCircle2,
  Refrigerator
} from 'lucide-react';
import { PANTRY_STAPLES_LIST } from '../data/mockData';

interface PantryItem {
  id: string;
  name: string;
  localName: string;
  category: 'pampalasa' | 'bigas' | 'ref' | 'canned';
  isStocked: boolean;
  unit: string;
  avgSavings: number;
}

export default function KusinaTab() {
  const { excludedStaples, toggleStapleExclusion, t, language } = useHain();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'pampalasa' | 'bigas' | 'ref' | 'canned'>('all');

  const [pantryItems, setPantryItems] = useState<PantryItem[]>([
    // Essential Condiments
    { id: 'mantika', name: 'Cooking Oil', localName: 'Mantika', category: 'pampalasa', isStocked: true, unit: '1 bottle', avgSavings: 45 },
    { id: 'toyo', name: 'Soy Sauce', localName: 'Toyo', category: 'pampalasa', isStocked: true, unit: '1 pouch/bottle', avgSavings: 22 },
    { id: 'suka', name: 'Cane Vinegar', localName: 'Suka', category: 'pampalasa', isStocked: true, unit: '1 pouch/bottle', avgSavings: 18 },
    { id: 'patis', name: 'Fish Sauce', localName: 'Patis', category: 'pampalasa', isStocked: true, unit: '1 bottle', avgSavings: 28 },
    { id: 'asin', name: 'Iodized Salt', localName: 'Asin', category: 'pampalasa', isStocked: true, unit: '1 pack', avgSavings: 15 },
    { id: 'paminta', name: 'Black Pepper', localName: 'Paminta', category: 'pampalasa', isStocked: true, unit: '1 sachet', avgSavings: 12 },
    { id: 'bawang', name: 'Garlic', localName: 'Bawang', category: 'pampalasa', isStocked: true, unit: '1 head', avgSavings: 20 },
    { id: 'sibuyas', name: 'Red Onion', localName: 'Sibuyas', category: 'pampalasa', isStocked: true, unit: '2 pcs', avgSavings: 25 },
    { id: 'cubes', name: 'Magic Sarap / Knorr', localName: 'Magic Sarap / Knorr Cube', category: 'pampalasa', isStocked: true, unit: '6 sachets', avgSavings: 30 },

    // Bigas & Carbs
    { id: 'sinandomeng', name: 'Sinandomeng Rice', localName: 'Bigas (Sinandomeng)', category: 'bigas', isStocked: true, unit: '5 kg', avgSavings: 260 },
    { id: 'bihon', name: 'Rice Vermicelli', localName: 'Bihon Noodles', category: 'bigas', isStocked: false, unit: '1 pack (250g)', avgSavings: 35 },

    // Ref & Sariwa
    { id: 'itlog', name: 'Fresh Eggs', localName: 'Itlog (Medium)', category: 'ref', isStocked: true, unit: '1 dozen', avgSavings: 110 },
    { id: 'calamansi', name: 'Calamansi', localName: 'Kalamansi', category: 'ref', isStocked: true, unit: '10 pcs', avgSavings: 20 },
    { id: 'luya', name: 'Fresh Ginger', localName: 'Luya', category: 'ref', isStocked: false, unit: '1 thumb', avgSavings: 15 },

    // Canned / Emergency Baon
    { id: 'sardinas', name: 'Canned Sardines', localName: 'Sardinas sa Kamatis', category: 'canned', isStocked: true, unit: '2 cans', avgSavings: 44 },
    { id: 'tuna', name: 'Canned Flaked Tuna', localName: 'Century Tuna Flakes', category: 'canned', isStocked: false, unit: '1 can', avgSavings: 38 },
  ]);

  const toggleItemStock = (id: string) => {
    setPantryItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isStocked: !item.isStocked } : item
      )
    );
    if (PANTRY_STAPLES_LIST.some((s) => s.id === id)) {
      toggleStapleExclusion(id);
    }
  };

  const stockedCount = pantryItems.filter((i) => i.isStocked).length;
  const totalSavings = pantryItems
    .filter((i) => i.isStocked)
    .reduce((sum, item) => sum + item.avgSavings, 0);

  const filteredItems = pantryItems.filter((item) => {
    if (activeCategory !== 'all' && item.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.localName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex-1 pb-safe-nav">
      {/* Header Banner */}
      <section 
        aria-label="Kusina Header" 
        className="bg-[#B8381D] text-white px-5 pt-safe pb-6 rounded-b-[40px] shadow-md transition-all duration-300"
      >
        <div className="flex items-center justify-between text-xs text-white/90 font-medium mb-3">
          <span className="font-sans font-bold tracking-[0.3em] text-xs">H A I N</span>
          <div className="w-5 h-5 rounded-full overflow-hidden border border-white/40 shadow-sm flex items-center justify-center bg-white/20 text-[9px] font-bold text-white">
            PH
          </div>
        </div>

        <div className="flex items-center gap-2 mb-1">
          <CookingPot className="w-6 h-6 text-white" />
          <h1 className="font-serif-title font-bold text-2xl sm:text-[28px] tracking-tight leading-tight text-white">
            {t.kusina_header_title}
          </h1>
        </div>
        <p className="text-xs text-white/85 font-sans leading-relaxed">
          {t.kusina_header_desc}
        </p>

        {/* Dynamic Savings Stat Card */}
        <div className="mt-4 bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-3.5 flex items-center justify-between text-white shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white text-[#B8381D] flex items-center justify-center shadow-sm">
              <CookingPot className="w-5 h-5 text-[#B8381D]" />
            </div>
            <div>
              <div className="text-[11px] font-medium text-white/90">
                {t.kusina_stock_card_title}
              </div>
              <div className="text-sm font-bold tracking-tight">
                {t.kusina_stocked_summary.replace('{count}', String(stockedCount)).replace('{total}', String(pantryItems.length))}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-white/80 uppercase font-semibold">
              {t.kusina_savings_label}
            </div>
            <div className="text-base font-bold text-amber-200">
              ~₱{totalSavings.toLocaleString()}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="px-4 pt-4 space-y-4">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.kusina_search_placeholder}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#EBE3D5] text-stone-900 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B8381D]/30 placeholder:text-stone-400 font-sans"
          />
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'all', label: t.kusina_cat_all },
            { id: 'pampalasa', label: t.kusina_cat_spices },
            { id: 'bigas', label: t.kusina_cat_rice },
            { id: 'ref', label: t.kusina_cat_fridge },
            { id: 'canned', label: t.kusina_cat_canned },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all tap-spring shadow-sm ${
                activeCategory === cat.id
                  ? 'bg-[#B8381D] text-white'
                  : 'bg-white border border-[#EBE3D5] text-stone-700 hover:border-stone-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Pantry Items Grouped List (Clean Inset Grouped, not overusing rounded cards) */}
        <div className="bg-white rounded-2xl border border-stone-200/80 divide-y divide-stone-100 overflow-hidden shadow-none">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleItemStock(item.id)}
              className={`p-3.5 px-4 transition-all cursor-pointer tap-spring flex items-center justify-between ${
                item.isStocked
                  ? 'bg-white'
                  : 'bg-stone-50/60 opacity-80'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Stock Toggle Checkbox */}
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
                    item.isStocked
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'border-2 border-stone-300 bg-white'
                  }`}
                >
                  {item.isStocked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-sans font-bold text-sm text-stone-900">
                      {language === 'en' ? item.name : item.localName}
                    </h3>
                    {language === 'en' && item.localName && (
                      <span className="text-[10px] text-stone-400 font-medium">
                        ({item.localName})
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Est. Standard: {item.unit}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="text-right">
                <span
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-md ${
                    item.isStocked
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {item.isStocked ? t.kusina_status_stocked : t.kusina_status_tobuy}
                </span>
                <div className="text-[10px] text-stone-400 mt-1">
                  {t.kusina_savings_prefix} ₱{item.avgSavings}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tipid Advice Card */}
        <div className="bg-[#FAF4EB] rounded-2xl p-4 border border-[#EBE3D5] flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-stone-700 leading-relaxed">
            <strong className="text-stone-900 block font-bold mb-0.5">{t.kusina_rule_title}</strong>
            {t.kusina_rule_desc}
          </div>
        </div>
      </div>
    </div>
  );
}
