'use client';

import React from 'react';
import { useHain } from '../context/HainContext';
import { CheckSquare, Square, ShoppingBag, Send, Truck, Store, HelpCircle } from 'lucide-react';
import { Button } from 'glisse';

export default function ListTab() {
  const {
    activeRecipe,
    calculateRecipeBasket,
    checkedItems,
    toggleItemCheck,
    budgetCap,
    currencySymbol,
    setIsPabiliOpen,
    setIsPadeliverOpen,
  } = useHain();

  const { basketTotal, checkedTotal, remainingBudget, isWithinCap } =
    calculateRecipeBasket(activeRecipe);

  const palengkeItems = activeRecipe.ingredients.filter((i) => i.storeType === 'palengke');
  const supermarketItems = activeRecipe.ingredients.filter((i) => i.storeType === 'supermarket');

  return (
    <div className="flex-1 pb-safe-nav">
      {/* Curved Header Banner (Edge-to-edge behind status bar with Dynamic Island clearance) */}
      <section aria-label="Shopping List Header" className="bg-gradient-to-b from-[var(--theme-banner-start)] to-[var(--theme-banner-end)] text-white px-5 pt-safe pb-6 rounded-b-[36px] shadow-md transition-all duration-300">
        <div className="flex items-center justify-between text-xs text-white/80 font-medium mb-3">
          <span>Active Grocery Run</span>
          <div className="w-5 h-5 rounded-full overflow-hidden border border-white/30 shadow-sm flex items-center justify-center bg-white text-[10px]">
            🇵🇭
          </div>
        </div>

        <h1 className="font-display font-extrabold text-2xl tracking-tight leading-tight">
          Smart Split-Basket
        </h1>
        <p className="text-xs text-white/80 mt-1">
          {activeRecipe.localName} • Live in-store shopping checklist
        </p>
      </section>

      {/* Main Content */}
      <div className="px-4 pt-4 space-y-4">
        {/* Anti-Shock Running Counter Card */}
        <div className="bg-white dark:bg-[#1E1B18] rounded-3xl p-4 shadow-md border border-stone-100 dark:border-stone-800">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
            <div>
              <div className="text-[10px] uppercase font-bold text-stone-400">
                Spent in Store
              </div>
              <div className="font-display font-extrabold text-xl text-[var(--theme-primary)] tabular-nums">
                ₱{checkedTotal.toFixed(0)} <span className="text-xs font-normal text-stone-400">/ ₱{budgetCap} cap</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">
                Natitirang Sukli
              </div>
              <div className="font-display font-extrabold text-lg text-emerald-600 dark:text-emerald-400 tabular-nums">
                ₱{(budgetCap - checkedTotal).toFixed(0)}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2.5 text-xs text-stone-500">
            <span>Total Needed: ₱{basketTotal.toFixed(0)}</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              {isWithinCap ? 'Pasok sa Budget ✓' : 'Lampas sa Cap'}
            </span>
          </div>
        </div>

        {/* STOP 1: Muñoz Wet Market */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-stone-800 dark:text-stone-200">
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] flex items-center justify-center font-extrabold">
                1
              </span>
              <span>Stop 1: Muñoz Wet Market (Palengke)</span>
            </div>
            <span className="text-stone-400 text-[11px]">Meat & Gulay</span>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200/80 divide-y divide-stone-100 overflow-hidden shadow-none">
            {palengkeItems.map((ing) => {
              const isChecked = !!checkedItems[ing.id];
              return (
                <div
                  key={ing.id}
                  onClick={() => toggleItemCheck(ing.id)}
                  className={`px-4 h-13 min-h-[52px] flex items-center justify-between gap-3 cursor-pointer tap-spring transition-colors ${
                    isChecked
                      ? 'bg-stone-50/70 text-stone-400'
                      : 'hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-[var(--theme-primary)] shrink-0" />
                    ) : (
                      <Square className="w-5 h-5 text-stone-300 dark:text-stone-600 shrink-0" />
                    )}
                    <span className={`text-xs font-semibold truncate ${isChecked ? 'line-through text-stone-400' : 'text-stone-800 dark:text-stone-200'}`}>
                      {ing.localName}
                    </span>
                  </div>

                  <span className="text-xs font-bold tabular-nums text-stone-700 dark:text-stone-300 shrink-0">
                    {currencySymbol}{ing.estimatedPrice.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* STOP 2: Puregold Supermarket Spillover */}
        {supermarketItems.length > 0 && (
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-800 dark:text-stone-200">
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-[10px] flex items-center justify-center font-extrabold">
                  2
                </span>
                <span>Stop 2: Puregold Muñoz (Supermarket Spillover)</span>
              </div>
              <span className="text-stone-400 text-[11px]">Sachets</span>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200/80 divide-y divide-stone-100 overflow-hidden shadow-none">
              {supermarketItems.map((ing) => {
                const isChecked = !!checkedItems[ing.id];
                return (
                  <div
                    key={ing.id}
                    onClick={() => toggleItemCheck(ing.id)}
                    className={`px-4 h-13 min-h-[52px] flex items-center justify-between gap-3 cursor-pointer tap-spring transition-colors ${
                      isChecked
                        ? 'bg-stone-50/70 text-stone-400'
                        : 'hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 text-[var(--theme-primary)] shrink-0" />
                      ) : (
                        <Square className="w-5 h-5 text-stone-300 dark:text-stone-600 shrink-0" />
                      )}
                      <span className={`text-xs font-semibold truncate ${isChecked ? 'line-through text-stone-400' : 'text-stone-800 dark:text-stone-200'}`}>
                        {ing.localName}
                      </span>
                    </div>

                    <span className="text-xs font-bold tabular-nums text-stone-700 dark:text-stone-300 shrink-0">
                      {currencySymbol}{ing.estimatedPrice.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Quick Actions (Pabili & Padeliver) */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Button
            variant="glass"
            onClick={() => setIsPabiliOpen(true)}
            icon={<Send className="w-3.5 h-3.5 text-[#B8381D]" />}
            className="!py-3 !px-4 !rounded-2xl text-xs font-bold text-stone-800 shadow-sm"
          >
            <span>Pabili Share</span>
          </Button>

          <Button
            variant="filled"
            tint="#B8381D"
            onClick={() => setIsPadeliverOpen(true)}
            icon={<Truck className="w-3.5 h-3.5 text-white" />}
            className="!py-3 !px-4 !rounded-2xl text-xs font-bold !text-white shadow-sm"
          >
            <span>Padeliver Na Lang</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
