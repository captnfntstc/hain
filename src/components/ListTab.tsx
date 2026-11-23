'use client';

import React, { useState } from 'react';
import { useHain } from '../context/HainContext';
import { 
  CheckSquare, 
  Square, 
  ShoppingBag, 
  Send, 
  Truck, 
  Store, 
  HelpCircle,
  MapPin,
  AlertTriangle,
  ArrowRight,
  Footprints,
  Bus,
  Car,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Button } from 'glisse';
import { TransportMode, formatStoreTravelTime } from '../types/hain';

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
    language,
    activeWetMarket,
    activeSupermarket,
    transportMode,
    setTransportMode,
    setPreferredWetMarketId,
    setIsRegionModalOpen,
  } = useHain();

  const [dismissTrafficBanner, setDismissTrafficBanner] = useState(false);

  const isTagalog = language === 'tl';

  const { basketTotal, checkedTotal, remainingBudget, isWithinCap } =
    calculateRecipeBasket(activeRecipe);

  const palengkeItems = activeRecipe.ingredients.filter((i) => i.storeType === 'palengke');
  const supermarketItems = activeRecipe.ingredients.filter((i) => i.storeType === 'supermarket');

  const travelTime = formatStoreTravelTime(activeWetMarket, transportMode);

  const isHighTraffic = activeWetMarket.trafficLevel === 'Heavy' && !dismissTrafficBanner;

  return (
    <div className="flex-1 pb-safe-nav">
      {/* Curved Header Banner (Edge-to-edge behind status bar with Dynamic Island clearance) */}
      <section aria-label="Shopping List Header" className="bg-gradient-to-b from-[var(--theme-banner-start)] to-[var(--theme-banner-end)] text-white px-5 pt-safe pb-6 rounded-b-[36px] shadow-md transition-all duration-300">
        <div className="flex items-center justify-between text-xs text-white/80 font-medium mb-3">
          <span>Active Grocery Run</span>
          <div className="w-5 h-5 rounded-full overflow-hidden border border-white/30 shadow-sm flex items-center justify-center bg-white/20 text-[9px] font-bold text-white">
            PH
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
                {isTagalog ? 'Nabili na sa Tindahan' : 'Spent in Store'}
              </div>
              <div className="font-display font-extrabold text-xl text-[var(--theme-primary)] tabular-nums">
                ₱{checkedTotal.toFixed(0)} <span className="text-xs font-normal text-stone-400">/ ₱{budgetCap} cap</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">
                {isTagalog ? 'Natitirang Sukli' : 'Remaining Change'}
              </div>
              <div className="font-display font-extrabold text-lg text-emerald-600 dark:text-emerald-400 tabular-nums">
                ₱{(budgetCap - checkedTotal).toFixed(0)}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2.5 text-xs text-stone-500">
            <span>{isTagalog ? 'Kabuuang Kailangan' : 'Total Needed'}: ₱{basketTotal.toFixed(0)}</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              {isWithinCap ? (isTagalog ? 'Pasok sa Budget' : 'Within Budget') : (isTagalog ? 'Lampas sa Cap' : 'Exceeds Cap')}
            </span>
          </div>
        </div>

        {/* Route, Transpo & Traffic Alert Card */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
                  {isTagalog ? 'Ruta at Biyahe' : 'Trip Route & Traffic'}
                </div>
                <div className="text-xs font-bold text-stone-900 truncate">
                  {activeWetMarket.name}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsRegionModalOpen(true)}
              className="p-1 text-stone-400 hover:text-stone-700 tap-spring transition-colors"
              aria-label="Change location"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-between pt-1 text-xs text-stone-600 border-t border-stone-100">
            <span className="font-semibold text-stone-800">{activeWetMarket.distanceKm} km • {travelTime}</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              activeWetMarket.trafficLevel === 'Heavy'
                ? 'bg-rose-100 text-rose-800'
                : 'bg-emerald-100 text-emerald-800'
            }`}>
              {isTagalog ? `Trapiko: ${activeWetMarket.trafficLevel}` : `Traffic: ${activeWetMarket.trafficLevel}`}
            </span>
          </div>

          {/* Quick Mode of Transportation Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1">
            {[
              { id: 'dynamic' as TransportMode, label: 'Dynamic', icon: <Sparkles className="w-3.5 h-3.5 text-amber-500" /> },
              { id: 'walk' as TransportMode, label: isTagalog ? 'Lakad' : 'Walk', icon: <Footprints className="w-3.5 h-3.5 text-[#B8381D]" /> },
              { id: 'commute' as TransportMode, label: isTagalog ? 'Commute' : 'Commute', icon: <Bus className="w-3.5 h-3.5 text-blue-600" /> },
              { id: 'car' as TransportMode, label: isTagalog ? 'Sasakyan' : 'Car', icon: <Car className="w-3.5 h-3.5 text-emerald-600" /> },
            ].map((m) => {
              const active = transportMode === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setTransportMode(m.id)}
                  className={`py-1.5 px-2 rounded-xl text-[11px] font-bold border flex items-center justify-center gap-1.5 transition-all tap-spring ${
                    active
                      ? 'bg-[#B8381D] text-white border-[#B8381D] shadow-xs'
                      : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  {m.icon}
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>

          {/* Traffic Warning & Willingness Prompt Banner */}
          {isHighTraffic && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-2 mt-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-[11px] text-amber-950 font-medium leading-snug">
                  {isTagalog
                    ? `Mabigat ang trapiko sa EDSA papuntang ${activeWetMarket.shortName} (${activeWetMarket.distanceKm} km, ~${activeWetMarket.commuteMinutes} mins biyahe). Willing ka bang pumunta?`
                    : `Heavy traffic along EDSA to ${activeWetMarket.shortName} (${activeWetMarket.distanceKm} km, ~${activeWetMarket.commuteMinutes} mins). Willing to travel?`}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setPreferredWetMarketId('munoz')}
                  className="flex-1 py-1.5 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold shadow-xs transition-all flex items-center justify-center gap-1"
                >
                  <span>{isTagalog ? 'Lumipat sa Muñoz (450m)' : 'Switch to Muñoz (450m)'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                <button
                  type="button"
                  onClick={() => setDismissTrafficBanner(true)}
                  className="py-1.5 px-2.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-700 text-[11px] font-semibold transition-all"
                >
                  {isTagalog ? 'Willing Ako' : 'Willing to Go'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* STOP 1: Preferred Wet Market */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-stone-800 dark:text-stone-200">
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] flex items-center justify-center font-extrabold">
                1
              </span>
              <span>Stop 1: {activeWetMarket.name}</span>
            </div>
            <span className="text-stone-400 text-[11px]">{isTagalog ? 'Karne at Gulay' : 'Meat & Produce'}</span>
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

        {/* STOP 2: Preferred Supermarket Spillover */}
        {supermarketItems.length > 0 && (
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-800 dark:text-stone-200">
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-[10px] flex items-center justify-center font-extrabold">
                  2
                </span>
                <span>Stop 2: {activeSupermarket.name}</span>
              </div>
              <span className="text-stone-400 text-[11px]">{isTagalog ? 'Mga Sachet at Condiments' : 'Sachets & Condiments'}</span>
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
