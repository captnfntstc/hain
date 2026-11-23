'use client';

import React, { useState, useEffect } from 'react';
import { useHain } from '../context/HainContext';
import { 
  X, 
  Plus, 
  Minus, 
  Flame, 
  Sparkles, 
  Check, 
  Users,
  Info
} from 'lucide-react';
import { 
  RiceType, 
  RICE_VARIETIES, 
  formatRiceKg, 
  calculateRecommendedRiceKilos 
} from '../types/hain';

export default function RiceAllocationModal() {
  const {
    isRiceModalOpen,
    setIsRiceModalOpen,
    riceKilos,
    setRiceKilos,
    riceType,
    setRiceType,
    includeRiceInBudget,
    setIncludeRiceInBudget,
    servingsPax,
    colorTheme,
    language,
    currencySymbol
  } = useHain();

  // Temporary draft state during modal edit
  const [tempKilos, setTempKilos] = useState<number>(riceKilos);
  const [tempType, setTempType] = useState<RiceType>(riceType);
  const [tempInclude, setTempInclude] = useState<boolean>(includeRiceInBudget);
  
  // Smart Calculator Meal Frequency: 1 (lunch only), 2 (lunch & dinner - standard), 3 (3 meals / with baon)
  const [mealFrequency, setMealFrequency] = useState<1 | 2 | 3>(2);

  // Sync state when modal opens
  useEffect(() => {
    if (isRiceModalOpen) {
      setTempKilos(riceKilos);
      setTempType(riceType);
      setTempInclude(includeRiceInBudget);
    }
  }, [isRiceModalOpen, riceKilos, riceType, includeRiceInBudget]);

  if (!isRiceModalOpen) return null;

  // Active variety object and pricing
  const currentVariety = RICE_VARIETIES.find((v) => v.id === tempType) || RICE_VARIETIES[0];
  const tempTotalCost = Math.round(tempKilos * currentVariety.pricePerKg);

  // Cups conversion: 1 kg uncooked ≈ 5 standard cups raw ≈ 10-12 cups cooked
  const rawCups = Math.round(tempKilos * 5 * 10) / 10;
  const cookedCups = Math.round(tempKilos * 10);

  // Smart recommendation calculation based on active servingsPax and mealFrequency
  const smartRecommendedKg = calculateRecommendedRiceKilos(servingsPax, mealFrequency);
  const smartRawCups = Math.round(smartRecommendedKg * 5 * 10) / 10;
  const smartCookedCups = Math.round(smartRecommendedKg * 10);

  const headerBgColor = colorTheme.headerBg || '#B8381D';
  const accentColor = colorTheme.accentColor || '#B8381D';
  const isTagalog = language === 'tl';

  const handleSave = () => {
    setRiceKilos(tempKilos);
    setRiceType(tempType);
    setIncludeRiceInBudget(tempInclude);
    setIsRiceModalOpen(false);
  };

  const handleStep = (delta: number) => {
    setTempKilos((prev) => {
      const next = Math.round((prev + delta) * 100) / 100;
      return Math.min(15, Math.max(0.25, next));
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#FFFBF2] overflow-y-auto flex flex-col font-sans select-none animate-in fade-in duration-200">
      <div className="flex-1 flex flex-col justify-between min-h-screen">
        
        {/* ======================================================= */}
        {/* TOP CURVED SHEET (Identical to Budget & Pax Adjust)     */}
        {/* ======================================================= */}
        <div 
          style={{ backgroundColor: headerBgColor }}
          className="text-white px-6 pt-12 pb-10 rounded-b-[44px] shadow-lg flex flex-col justify-between min-h-[50vh] relative transition-colors duration-300"
        >
          {/* Top Bar: Close Button + Rice Allocation Pill */}
          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => setIsRiceModalOpen(false)}
              aria-label="Close"
              className="w-10 h-10 rounded-full bg-stone-300/35 hover:bg-stone-300/50 backdrop-blur-md flex items-center justify-center text-stone-900 border border-white/20 transition-all active:scale-95 shadow-xs"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            <span className="px-3.5 py-1 rounded-full bg-black/20 text-white text-xs font-semibold tracking-wide shadow-xs backdrop-blur-sm border border-white/15">
              {isTagalog ? 'Alokasyon ng Bigas' : 'Rice Allocation'}
            </span>
          </div>

          {/* Heading: 2-line Editorial Serif Heading */}
          <div className="text-center space-y-4 my-auto py-3 flex flex-col items-center">
            <h1 className="font-serif font-bold text-3xl sm:text-[34px] leading-tight text-white tracking-tight">
              {isTagalog ? (
                <>
                  Ilang kilo ng bigas<br />ang lulutuin ngayon?
                </>
              ) : (
                <>
                  How much rice<br />for today?
                </>
              )}
            </h1>

            {/* Big Kilos Display with Solid White Horizontal Underline Bar */}
            <div className="flex flex-col items-center pt-2">
              <div className="inline-flex items-baseline justify-center text-white">
                <div className="flex flex-col items-center">
                  <div className="font-quicksand font-bold text-5xl sm:text-6xl text-white tracking-tight leading-none whitespace-nowrap">
                    {formatRiceKg(tempKilos)}
                  </div>
                  {/* Solid White Horizontal Underline Bar */}
                  <div className="w-full h-1 bg-white rounded-full mt-2.5" />
                </div>
              </div>

              {/* Subtext Pill: Cost and Cups equivalent */}
              <div className="pt-4">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-stone-800 text-xs sm:text-sm font-semibold shadow-md border border-stone-200/50 whitespace-nowrap">
                  <Flame className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    {currencySymbol}{tempTotalCost} • ~{rawCups} {isTagalog ? 'tasang hilaw' : 'cups raw'} (~{cookedCups} {isTagalog ? 'luto' : 'cooked'})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================= */}
        {/* BOTTOM CONTROLS in Warm Cream Background (#FFFBF2)      */}
        {/* ======================================================= */}
        <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-[#FFFBF2] space-y-6">
          
          <div className="space-y-5">
            {/* 1. SMART DAY CALCULATOR WIDGET (Requested by User) */}
            <div className="bg-white rounded-2xl p-4 border border-[#E5DAC6] shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-xs text-stone-900">
                      {isTagalog ? 'Kalkulasyon para sa ' : 'Smart Calculator for '}
                      <span className="text-[#B8381D]">{servingsPax} {isTagalog ? 'Kasalo' : 'Pax'}</span>
                    </h3>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-full">
                  {isTagalog ? 'Araw-araw' : 'Today Only'}
                </span>
              </div>

              {/* Meal Frequency Segmented Selector */}
              <div className="grid grid-cols-3 gap-1 bg-stone-100 p-1 rounded-xl text-center">
                <button
                  type="button"
                  onClick={() => setMealFrequency(1)}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all tap-spring ${
                    mealFrequency === 1
                      ? 'bg-white text-stone-900 shadow-xs border border-stone-200/80'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  {isTagalog ? '1 Kainan (Tanghalian)' : '1 Meal (Lunch)'}
                </button>
                <button
                  type="button"
                  onClick={() => setMealFrequency(2)}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all tap-spring ${
                    mealFrequency === 2
                      ? 'bg-white text-[#B8381D] shadow-xs border border-stone-200/80'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  {isTagalog ? '2 Kainan (Buong Araw)' : '2 Meals (Day)'}
                </button>
                <button
                  type="button"
                  onClick={() => setMealFrequency(3)}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all tap-spring ${
                    mealFrequency === 3
                      ? 'bg-white text-stone-900 shadow-xs border border-stone-200/80'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  {isTagalog ? '3 Kainan (+ Baon)' : '3 Meals (+ Baon)'}
                </button>
              </div>

              {/* Recommendation Action Row */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <div className="text-stone-600 font-medium">
                  {isTagalog ? 'Rekomendado:' : 'Recommended:'}{' '}
                  <span className="font-bold text-stone-900">{formatRiceKg(smartRecommendedKg)}</span>
                  <span className="text-stone-400 text-[11px]"> (~{smartRawCups} {isTagalog ? 'tasa' : 'cups'})</span>
                </div>

                <button
                  type="button"
                  onClick={() => setTempKilos(smartRecommendedKg)}
                  style={{ color: accentColor }}
                  className="font-bold hover:underline tap-spring transition-transform text-xs"
                >
                  {isTagalog ? `Gamitin (${formatRiceKg(smartRecommendedKg)})` : `Use ${formatRiceKg(smartRecommendedKg)}`}
                </button>
              </div>
            </div>

            {/* 2. QUICK INCREMENT PILLS (+ 1/4 kg, + 1/2 kg, + 1 kg) */}
            <div className="grid grid-cols-3 gap-2.5">
              {[0.25, 0.5, 1].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setTempKilos((prev) => Math.min(15, Math.round((prev + amt) * 100) / 100))}
                  style={{ borderColor: accentColor, color: accentColor }}
                  className="py-2.5 px-3 rounded-full border bg-white/70 hover:bg-white text-xs sm:text-sm font-quicksand font-bold shadow-2xs tap-spring transition-all active:scale-95 text-center"
                >
                  + {formatRiceKg(amt)}
                </button>
              ))}
            </div>

            {/* 3. PRESET KILOS SELECTOR PILLS */}
            <div className="flex flex-wrap gap-1.5">
              {[0.25, 0.5, 0.75, 1, 1.5, 2, 3, 5].map((k) => {
                const isSelected = tempKilos === k;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setTempKilos(k)}
                    className={`py-1.5 px-3 rounded-xl text-xs font-quicksand font-bold transition-all tap-spring border ${
                      isSelected
                        ? 'bg-[#B8381D] text-white border-[#B8381D] shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    {formatRiceKg(k)}
                  </button>
                );
              })}
            </div>

            {/* 4. STEPPER CONTROLS (- and + buttons) */}
            <div className="flex items-center justify-between px-2 pt-1">
              <button
                type="button"
                onClick={() => handleStep(-0.25)}
                disabled={tempKilos <= 0.25}
                aria-label="Decrease rice amount"
                className="w-14 h-14 rounded-full bg-white hover:bg-stone-50 border border-stone-200 shadow-sm flex items-center justify-center text-stone-700 disabled:opacity-40 active:scale-95 transition-all tap-spring"
              >
                <Minus className="w-6 h-6 stroke-[2.5]" />
              </button>

              <div className="text-center">
                <span className="font-quicksand text-xs sm:text-sm font-bold text-stone-600">
                  {isTagalog ? '1/4 kg bawat tap' : '1/4 kg per tap'}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleStep(0.25)}
                disabled={tempKilos >= 15}
                aria-label="Increase rice amount"
                style={{ backgroundColor: headerBgColor }}
                className="w-14 h-14 rounded-full text-white shadow-md flex items-center justify-center active:scale-95 transition-all tap-spring hover:opacity-95"
              >
                <Plus className="w-6 h-6 stroke-[2.5]" />
              </button>
            </div>

            {/* 5. TYPE OF RICE SELECTOR (4 Philippine Varieties) */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                  {isTagalog ? 'Uri ng Bigas' : 'Type of Rice'}
                </span>
                <span className="text-[11px] text-stone-500 font-medium">
                  {isTagalog ? 'DA Bantay Presyo' : 'DA Price Benchmark'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {RICE_VARIETIES.map((variety) => {
                  const isSelected = tempType === variety.id;
                  const estimatedCost = Math.round(tempKilos * variety.pricePerKg);
                  return (
                    <button
                      key={variety.id}
                      type="button"
                      onClick={() => setTempType(variety.id)}
                      className={`p-3 rounded-2xl border text-left transition-all tap-spring relative flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#B8381D] bg-white ring-2 ring-[#B8381D]/20 shadow-xs'
                          : 'bg-white/80 border-stone-200/90 hover:border-stone-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="font-sans font-bold text-xs text-stone-900 truncate">
                            {variety.name}
                          </h4>
                          {isSelected && (
                            <div className="w-4 h-4 rounded-full bg-[#B8381D] text-white flex items-center justify-center shrink-0">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          )}
                        </div>
                        <div className="text-[10px] text-stone-500 mt-0.5">
                          {variety.grade}
                        </div>
                      </div>

                      <div className="mt-2.5 pt-1.5 border-t border-stone-100 flex items-center justify-between text-[11px]">
                        <span className="text-stone-500">
                          {currencySymbol}{variety.pricePerKg}/kg
                        </span>
                        <span className="font-bold text-[#B8381D]">
                          {currencySymbol}{estimatedCost}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 6. INCLUDE IN MEAL BUDGET TOGGLE */}
            <div className="bg-white rounded-2xl p-3.5 px-4 border border-stone-200/80 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-stone-900">
                  {isTagalog ? 'Isama ang bigas sa gastos ng ulam' : 'Factor rice into daily meal budget'}
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5">
                  {isTagalog 
                    ? `Ibabawas ang ₱${tempTotalCost} sa daily budget cap` 
                    : `Deducts ₱${tempTotalCost} from your daily budget cap`}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setTempInclude(!tempInclude)}
                className={`w-11 h-6 rounded-full transition-colors relative tap-spring shrink-0 ml-3 ${
                  tempInclude ? 'bg-emerald-600' : 'bg-stone-300'
                }`}
                aria-label="Toggle include rice in budget"
              >
                <div 
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    tempInclude ? 'left-6' : 'left-1'
                  }`} 
                />
              </button>
            </div>

          </div>

          {/* 7. BOTTOM SAVE ACTION BUTTON */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleSave}
              style={{ backgroundColor: headerBgColor }}
              className="w-full py-4 px-6 rounded-full text-white font-quicksand font-bold text-base shadow-md active:scale-95 transition-all tap-spring hover:opacity-95 flex items-center justify-center gap-2"
            >
              <span>{isTagalog ? 'I-save ang Alokasyon ng Bigas' : 'Save Rice Allocation'}</span>
              <span>•</span>
              <span>{currencySymbol}{tempTotalCost}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
