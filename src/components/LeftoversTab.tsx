'use client';

import React from 'react';
import { useHain } from '../context/HainContext';
import { RefreshCw, Sparkles, ArrowRight, UtensilsCrossed } from 'lucide-react';
import { MOCK_RECIPES } from '../data/mockData';

export default function LeftoversTab() {
  const { setActiveRecipe, setIsRecipeDetailOpen } = useHain();

  const leftoverDishes = MOCK_RECIPES.filter((r) => r.isSagipUlam || r.id === 'sagip-sarciadong-bangus');

  return (
    <div className="flex-1 pb-safe-nav">
      {/* Curved Header Banner (Edge-to-edge behind status bar with Dynamic Island clearance) */}
      <section aria-label="Leftovers Header" className="bg-gradient-to-b from-[var(--theme-banner-start)] to-[var(--theme-banner-end)] text-white px-5 pt-safe pb-6 rounded-b-[36px] shadow-md transition-all duration-300">
        <div className="flex items-center justify-between text-xs text-white/80 font-medium mb-3">
          <span>Sagip-Ulam Engine</span>
          <div className="w-5 h-5 rounded-full overflow-hidden border border-white/30 shadow-sm flex items-center justify-center bg-white/20 text-[9px] font-bold text-white">
            PH
          </div>
        </div>

        <h1 className="font-display font-extrabold text-2xl tracking-tight leading-tight">
          Leftovers &amp; Baon Prep
        </h1>
        <p className="text-xs text-white/80 mt-1">
          Zero food waste • Transform yesterday&apos;s cooked food into a new feast
        </p>
      </section>

      {/* Main Content */}
      <div className="px-4 pt-4 space-y-4">
        {/* Sagip-Ulam Reminder Banner */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-xs space-y-2">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold">
            <Sparkles className="w-4 h-4" />
            <span>&ldquo;May tirang ulam ka pa ba?&rdquo;</span>
          </div>
          <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-[11px]">
            Huwag itapon ang tirang inihaw na isda, pritong baboy, o kalahating gulay! Ang Hain Sagip-Ulam ay nagrerekomenda ng murang add-ons para makagawa ng bagong putahe.
          </p>
        </div>

        {/* Featured Leftover Transformation Cards */}
        <div className="space-y-3">
          <h2 className="font-display font-bold text-sm text-stone-900 dark:text-stone-100">
            Available Leftover Makeovers
          </h2>

          <div className="bg-white dark:bg-[#1E1B18] rounded-2xl border border-stone-200/80 divide-y divide-stone-100 dark:divide-stone-800 overflow-hidden shadow-none">
            {leftoverDishes.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => {
                  setActiveRecipe(recipe);
                  setIsRecipeDetailOpen(true);
                }}
                className="p-4 hover:bg-stone-50 dark:hover:bg-stone-900/40 transition-all cursor-pointer tap-spring space-y-3"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                      Sagip-Ulam
                    </span>
                    <h3 className="font-display font-bold text-sm text-stone-900 dark:text-white truncate mt-1">
                      {recipe.localName}
                    </h3>
                    <p className="text-[11px] text-stone-500 line-clamp-1">
                      Base: {recipe.leftoverBase || 'Tirang ulam'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800 text-xs">
                  <span className="text-stone-500 text-[11px]">
                    Add-on cost: <span className="font-extrabold text-[var(--theme-primary)]">₱{recipe.estimatedPrice}.00 only</span>
                  </span>
                  <span className="text-[11px] font-bold text-[var(--theme-primary)] flex items-center gap-1">
                    <span>Ihain</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
