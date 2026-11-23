'use client';

import React from 'react';
import { useHain } from '../context/HainContext';
import { User, Wallet, Users, MapPin, PackageCheck, Zap, ShieldCheck } from 'lucide-react';
import { PANTRY_STAPLES_LIST } from '../data/mockData';
import { Button } from 'glisse';

export default function ProfileTab() {
  const {
    budgetCap,
    servingsPax,
    setIsBudgetModalOpen,
    setBudgetModalStep,
    excludedStaples,
    toggleStapleExclusion,
  } = useHain();

  return (
    <div className="flex-1 pb-safe-nav">
      {/* Curved Header Banner (Edge-to-edge behind status bar with Dynamic Island clearance) */}
      <section aria-label="Profile Header" className="bg-gradient-to-b from-[var(--theme-banner-start)] to-[var(--theme-banner-end)] text-white px-5 pt-safe pb-6 rounded-b-[36px] shadow-md transition-all duration-300">
        <div className="flex items-center justify-between text-xs text-white/80 font-medium mb-3">
          <span>Household Profile</span>
          <div className="w-5 h-5 rounded-full overflow-hidden border border-white/30 shadow-sm flex items-center justify-center bg-white/20 text-[9px] font-bold text-white">
            PH
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white text-[var(--theme-primary)] flex items-center justify-center font-bold text-lg shadow-md">
            G
          </div>
          <div>
            <h1 className="font-display font-extrabold text-xl text-white">
              Graciepherlyn
            </h1>
            <p className="text-xs text-white/80">
              Household Head • Quezon City
            </p>
          </div>
        </div>
      </section>

      {/* Main Settings */}
      <div className="px-4 pt-4 space-y-4">
        {/* Budget & Household Summary */}
        <div className="bg-white dark:bg-[#1E1B18] rounded-3xl p-4 border border-stone-100 dark:border-stone-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-xs uppercase tracking-wider text-stone-400">
              Default Meal Settings
            </h2>
            <Button
              variant="glass"
              onClick={() => {
                setBudgetModalStep(1);
                setIsBudgetModalOpen(true);
              }}
              className="!text-xs !font-bold !text-[#B8381D] !bg-[#FDECE8] !px-3 !py-1 !rounded-md"
            >
              <span>Change</span>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800">
              <div className="text-stone-400 text-[10px]">Budget Ceiling</div>
              <div className="font-bold text-sm text-[var(--theme-primary)] tabular-nums mt-0.5">
                ₱ {budgetCap.toLocaleString()}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800">
              <div className="text-stone-400 text-[10px]">Household Size</div>
              <div className="font-bold text-sm text-stone-800 dark:text-stone-200 tabular-nums mt-0.5">
                {servingsPax} pax
              </div>
            </div>
          </div>
        </div>

        {/* Location & Radius */}
        <div className="bg-white dark:bg-[#1E1B18] rounded-3xl p-4 border border-stone-100 dark:border-stone-800 shadow-sm space-y-2 text-xs">
          <h2 className="font-display font-bold text-xs uppercase tracking-wider text-stone-400">
            Primary Store Locator
          </h2>
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[var(--theme-primary)]" />
              <div>
                <div className="font-bold text-stone-800 dark:text-stone-200">Muñoz Public Wet Market</div>
                <div className="text-[10px] text-stone-400">3 km radius • Tricycle / Walking</div>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Active
            </span>
          </div>
        </div>

        {/* Stock Sa Bahay (Pantry Staples Checklist) */}
        <div className="bg-white dark:bg-[#1E1B18] rounded-3xl p-4 border border-stone-100 dark:border-stone-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <PackageCheck className="w-4 h-4 text-[var(--theme-primary)]" />
              <h2 className="font-display font-bold text-xs uppercase tracking-wider text-stone-800 dark:text-stone-200">
                May Stock Na Sa Bahay
              </h2>
            </div>
            <span className="text-[10px] text-stone-400">
              {excludedStaples.length} excluded
            </span>
          </div>
          <p className="text-[11px] text-stone-500 leading-tight">
            Tap items to exclude whole bottle prices from single-meal budgets:
          </p>

          <div className="grid grid-cols-2 gap-1.5">
            {PANTRY_STAPLES_LIST.map((staple) => {
              const isExcluded = excludedStaples.includes(staple.id);
              return (
                <button
                  key={staple.id}
                  onClick={() => toggleStapleExclusion(staple.id)}
                  className={`p-2 rounded-xl text-left text-xs font-semibold transition-all tap-spring border ${
                    isExcluded
                      ? 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/40 text-[var(--theme-primary)]'
                      : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-400'
                  }`}
                >
                  <div className="text-[11px] font-bold">{staple.localName}</div>
                  <div className="text-[9px] opacity-75">{isExcluded ? 'Stock' : 'Add to buy'}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
