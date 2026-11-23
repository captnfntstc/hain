'use client';

import React from 'react';
import { useHain } from '../context/HainContext';
import { AlertTriangle, MapPin, Navigation, ArrowRight, X, Footprints, Car } from 'lucide-react';

export default function TrafficAlertPromptModal() {
  const {
    trafficPrompt,
    setTrafficPrompt,
    confirmTrafficMarket,
    useAlternativeMarket,
    language,
    colorTheme,
  } = useHain();

  if (!trafficPrompt || !trafficPrompt.isOpen) return null;

  const isTagalog = language === 'tl';
  const target = trafficPrompt.targetMarket;
  const alt = trafficPrompt.alternativeMarket;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-5 animate-in fade-in duration-200">
      <div className="bg-white rounded-[28px] max-w-sm w-full p-5 sm:p-6 shadow-2xl border border-stone-100 relative space-y-4 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setTrafficPrompt(null)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Warning Icon & Title */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 shadow-xs">
            <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="font-sans font-bold text-base text-stone-900 leading-tight">
              {isTagalog ? 'Trapiko at Layo ng Biyahe' : 'Traffic & Distance Alert'}
            </h3>
            <p className="text-[11px] text-stone-500 mt-0.5">
              {isTagalog ? 'Pagsusuri sa daan at walkability' : 'Route condition & walkability check'}
            </p>
          </div>
        </div>

        {/* Target Destination Card */}
        <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/70 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
              <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span className="truncate">{target.name}</span>
            </div>
            <span className="text-[10px] font-bold text-amber-800 bg-amber-200/70 px-2 py-0.5 rounded-full shrink-0">
              {target.distanceKm} km
            </span>
          </div>

          <p className="text-xs text-amber-950/80 leading-relaxed font-sans">
            {trafficPrompt.reason}
          </p>

          <div className="flex items-center gap-3 pt-1 text-[11px] text-amber-900 font-medium">
            <span className="inline-flex items-center gap-1">
              <Car className="w-3.5 h-3.5 text-amber-700" />
              {isTagalog ? 'Mabigat na trapiko' : 'Heavy road traffic'}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Footprints className="w-3.5 h-3.5 text-amber-700" />
              {isTagalog ? 'Mababang walkability' : 'Low walkability'}
            </span>
          </div>
        </div>

        {/* Core Question */}
        <div className="text-center px-1">
          <p className="font-sans font-semibold text-xs sm:text-[13px] text-stone-800 leading-snug">
            {isTagalog
              ? 'Willing ka bang pumunta kahit mabigat ang trapiko at malayo?'
              : 'Are you willing to go despite the traffic and distance?'}
          </p>
        </div>

        {/* Suggested Alternative Card */}
        {alt && (
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-2.5">
            <div className="min-w-0">
              <div className="text-[10px] uppercase font-bold text-emerald-800">
                {isTagalog ? 'Mas Malapit na Alternatibo' : 'Nearest Common Alternative'}
              </div>
              <div className="text-xs font-bold text-emerald-950 truncate mt-0.5">
                {alt.name}
              </div>
              <div className="text-[11px] text-emerald-700 mt-0.5">
                {alt.distanceKm} km • {alt.walkMinutes} {isTagalog ? 'mins lakad (Walang trapiko)' : 'mins walk (No traffic delay)'}
              </div>
            </div>

            <button
              type="button"
              onClick={useAlternativeMarket}
              className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shrink-0 shadow-sm transition-all active:scale-95"
            >
              {isTagalog ? 'Gamitin Ito' : 'Use This'}
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-1">
          {alt && (
            <button
              type="button"
              onClick={useAlternativeMarket}
              style={{ backgroundColor: colorTheme.badgeBg || '#1E4638' }}
              className="w-full py-3 px-4 rounded-full text-white text-xs sm:text-sm font-bold shadow-md hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <span>{isTagalog ? `Lumipat sa ${alt.shortName}` : `Switch to ${alt.shortName}`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={confirmTrafficMarket}
            className="w-full py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-all active:scale-98"
          >
            {isTagalog
              ? `Oo, ituloy sa ${target.shortName} (Willing Pumunta)`
              : `Proceed to ${target.shortName} (Willing to travel)`}
          </button>
        </div>
      </div>
    </div>
  );
}
