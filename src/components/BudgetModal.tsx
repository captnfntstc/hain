'use client';

import React, { useState, useEffect } from 'react';
import { useHain } from '../context/HainContext';
import { X, Plus, Users, AlertTriangle, ChevronLeft } from 'lucide-react';

export default function BudgetModal() {
  const {
    isBudgetModalOpen,
    setIsBudgetModalOpen,
    budgetModalStep,
    setBudgetModalStep,
    budgetCap,
    setBudgetCap,
    servingsPax,
    setServingsPax,
    currencySymbol,
    colorTheme,
  } = useHain();

  // Local Draft States (Changes won't be saved unless confirmed in Step 2!)
  const [tempBudget, setTempBudget] = useState<number>(budgetCap);
  const [tempPax, setTempPax] = useState<number>(servingsPax);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState<boolean>(false);
  const [rawBudgetInput, setRawBudgetInput] = useState<string>(budgetCap.toString());
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  // Sync draft states whenever modal opens
  useEffect(() => {
    if (isBudgetModalOpen) {
      setTempBudget(budgetCap);
      setTempPax(servingsPax);
      setRawBudgetInput(budgetCap.toLocaleString());
      setShowDiscardConfirm(false);
    }
  }, [isBudgetModalOpen, budgetCap, servingsPax]);

  // Sync formatted raw input when tempBudget changes externally (e.g. via steppers or presets)
  useEffect(() => {
    if (!isInputFocused) {
      setRawBudgetInput(tempBudget.toLocaleString());
    }
  }, [tempBudget, isInputFocused]);

  if (!isBudgetModalOpen) return null;

  // Handle Close with Unsaved Changes Confirmation
  const handleCloseAttempt = () => {
    const isModified = tempBudget !== budgetCap || tempPax !== servingsPax;
    if (isModified) {
      setShowDiscardConfirm(true);
    } else {
      setIsBudgetModalOpen(false);
      setBudgetModalStep(1);
    }
  };

  const handleDiscardAndExit = () => {
    setTempBudget(budgetCap);
    setTempPax(servingsPax);
    setShowDiscardConfirm(false);
    setIsBudgetModalOpen(false);
    setBudgetModalStep(1);
  };

  const handleNext = () => {
    const clampedBudget = Math.min(10000, Math.max(100, tempBudget));
    setTempBudget(clampedBudget);
    setBudgetModalStep(2);
  };

  const handleConfirm = () => {
    const clampedBudget = Math.min(10000, Math.max(100, tempBudget));
    const clampedPax = Math.min(50, Math.max(1, tempPax));
    setBudgetCap(clampedBudget);
    setServingsPax(clampedPax);
    setIsBudgetModalOpen(false);
    setBudgetModalStep(1);
  };

  const tempCostPerPerson = tempPax > 0 ? (tempBudget / tempPax).toFixed(2) : '0.00';
  const servingPresets = [2, 4, 6, 10];

  const headerBgColor = colorTheme?.headerBg || '#B8381D';
  const accentColor = colorTheme?.accentColor || '#B8381D';

  return (
    <div className="fixed inset-0 z-50 sm:max-w-md sm:mx-auto bg-[#FFFBF2] flex flex-col justify-between overflow-y-auto animate-in fade-in duration-200 select-none">
      
      {/* STEP 1: How much is your budget? (Exact match to Mockup) */}
      {budgetModalStep === 1 && (
        <div className="flex-1 flex flex-col justify-between min-h-screen">
          {/* Top Curved Card: Terracotta Red (#B8381D) with Deep Rounded Bottom */}
          <div 
            style={{ backgroundColor: headerBgColor }}
            className="text-white px-6 pt-12 pb-10 rounded-b-[44px] shadow-lg flex flex-col justify-between min-h-[55vh] relative"
          >
            {/* Top Bar: (X) Frosted Circle & (1 of 2) Sage Green Pill */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={handleCloseAttempt}
                aria-label="Close"
                className="w-10 h-10 rounded-full bg-stone-300/35 hover:bg-stone-300/50 backdrop-blur-md flex items-center justify-center text-stone-900 border border-white/20 transition-all active:scale-95 shadow-xs"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>

              <span className="px-3.5 py-1 rounded-full bg-[#648B65] text-white text-xs font-semibold tracking-wide shadow-xs">
                1 of 2
              </span>
            </div>

            {/* Title: 2-line Serif Heading */}
            <div className="text-center space-y-4 my-auto py-3 flex flex-col items-center">
              <h1 className="font-serif font-bold text-3xl sm:text-[34px] leading-tight text-white tracking-tight">
                How much is<br />your budget?
              </h1>

              {/* Big Budget Currency & Editable Amount with Solid White Underline */}
              <div className="flex flex-col items-center pt-2">
                <div className="inline-flex items-baseline justify-center gap-2 sm:gap-3 text-white">
                  <span className="font-quicksand font-bold text-4xl sm:text-5xl select-none leading-none">
                    {currencySymbol}
                  </span>
                  
                  <div className="flex flex-col items-center">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={rawBudgetInput}
                      onFocus={() => {
                        setIsInputFocused(true);
                        setRawBudgetInput(tempBudget.toString());
                      }}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/[^0-9]/g, '');
                        setRawBudgetInput(raw);
                        const val = parseInt(raw, 10);
                        if (!isNaN(val)) {
                          setTempBudget(Math.min(10000, val));
                        } else {
                          setTempBudget(0);
                        }
                      }}
                      onBlur={() => {
                        setIsInputFocused(false);
                        const clamped = Math.min(10000, Math.max(100, tempBudget));
                        setTempBudget(clamped);
                        setRawBudgetInput(clamped.toLocaleString());
                      }}
                      className="w-40 sm:w-48 bg-transparent text-center focus:outline-none tabular-nums text-white cursor-text font-quicksand font-bold text-5xl sm:text-6xl p-0 leading-none"
                      title="Tap to type your budget"
                    />
                    {/* Solid White Horizontal Underline Bar directly underneath the amount */}
                    <div className="w-full h-1 bg-white rounded-full mt-2.5" />
                  </div>
                </div>

                {/* Subtext Pill: About ₱150.00 per person */}
                <div className="pt-4">
                  <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-stone-800 text-xs sm:text-sm font-semibold shadow-md border border-stone-200/50 whitespace-nowrap">
                    <Users className="w-4 h-4 text-stone-500 shrink-0" />
                    <span>About {currencySymbol}{tempCostPerPerson} per person</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Controls in Warm Cream Background (#FFFBF2) */}
          <div className="flex-1 flex flex-col justify-between px-6 pt-7 pb-8 bg-[#FFFBF2] space-y-6">
            {/* Quick Increment Pills: + ₱1,000 | + ₱2,000 | + ₱5,000 */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {[1000, 2000, 5000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setTempBudget((prev) => Math.min(10000, prev + amt))}
                  style={{ borderColor: accentColor, color: accentColor }}
                  className="py-2.5 px-2 rounded-full bg-[#FFFBF2] border text-xs sm:text-sm font-bold shadow-xs tap-spring hover:bg-stone-100/50 active:scale-95 transition-all text-center whitespace-nowrap"
                >
                  + {currencySymbol}{amt.toLocaleString()}
                </button>
              ))}
            </div>

            {/* Stepper Controls: [ - ]   ₱10 per tap   [ + ] */}
            <div className="flex items-center justify-center gap-8 py-1">
              {/* Minus Button: Large White Circle with Terracotta Line */}
              <button
                type="button"
                onClick={() => setTempBudget((prev) => Math.max(100, prev - 10))}
                className="w-16 h-16 rounded-full bg-white shadow-[0_6px_20px_rgba(0,0,0,0.08)] flex items-center justify-center tap-spring border border-stone-100 hover:bg-stone-50 active:scale-95 transition-all"
                title="Minus 10"
              >
                <span 
                  style={{ backgroundColor: accentColor }}
                  className="w-6 h-[3.5px] rounded-full inline-block" 
                />
              </button>

              <span className="font-sans font-medium text-sm text-stone-800 select-none">
                {currencySymbol}10 per tap
              </span>

              {/* Plus Button: Large Red Circle with White Plus */}
              <button
                type="button"
                onClick={() => setTempBudget((prev) => Math.min(10000, prev + 10))}
                style={{ backgroundColor: accentColor }}
                className="w-16 h-16 rounded-full text-white shadow-[0_8px_24px_rgba(184,56,29,0.35)] flex items-center justify-center tap-spring hover:scale-105 active:scale-95 transition-all"
                title="Plus 10"
              >
                <Plus className="w-7 h-7 stroke-[3] text-white" />
              </button>
            </div>

            {/* Next Button: Hunter Green (#1E4638) Pill */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleNext}
                className="w-full py-4 rounded-full bg-[#1E4638] hover:bg-[#16362B] text-white font-bold text-base shadow-md active:scale-98 transition-all tracking-wide"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: How many people are you feeding? (Matching Design Language) */}
      {budgetModalStep === 2 && (
        <div className="flex-1 flex flex-col justify-between min-h-screen">
          {/* Top Curved Card */}
          <div 
            style={{ backgroundColor: headerBgColor }}
            className="text-white px-6 pt-12 pb-10 rounded-b-[44px] shadow-lg flex flex-col justify-between min-h-[55vh] relative"
          >
            {/* Top Bar Navigation: [←] Back Button + (X) Close + 2 of 2 Badge */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => setBudgetModalStep(1)}
                aria-label="Back to Budget Setting"
                className="w-10 h-10 rounded-full bg-stone-300/35 hover:bg-stone-300/50 backdrop-blur-md flex items-center justify-center text-stone-900 border border-white/20 transition-all active:scale-95 shadow-xs"
              >
                <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
              </button>

              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1 rounded-full bg-[#648B65] text-white text-xs font-semibold tracking-wide shadow-xs">
                  2 of 2
                </span>
                <button
                  type="button"
                  onClick={handleCloseAttempt}
                  aria-label="Close"
                  className="w-10 h-10 rounded-full bg-stone-300/35 hover:bg-stone-300/50 backdrop-blur-md flex items-center justify-center text-stone-900 border border-white/20 transition-all active:scale-95 shadow-xs"
                >
                  <X className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Title: 2-line Serif Heading */}
            <div className="text-center space-y-4 my-auto py-3 flex flex-col items-center">
              <h1 className="font-serif font-bold text-3xl sm:text-[34px] leading-tight text-white tracking-tight">
                How many people<br />are you feeding?
              </h1>

              {/* Big Pax Display with Solid White Underline */}
              <div className="flex flex-col items-center pt-2">
                <div className="inline-flex items-baseline justify-center gap-2 text-white">
                  <div className="flex flex-col items-center">
                    <div className="inline-flex items-baseline gap-2">
                      <input
                        type="number"
                        min={1}
                        max={50}
                        value={tempPax || ''}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          setTempPax(isNaN(val) ? 0 : Math.min(50, val));
                        }}
                        onBlur={() => {
                          if (tempPax < 1) setTempPax(1);
                          if (tempPax > 50) setTempPax(50);
                        }}
                        className="w-24 sm:w-28 bg-transparent text-center focus:outline-none tabular-nums text-white cursor-text font-quicksand font-bold text-5xl sm:text-6xl p-0 leading-none"
                        title="Type number of people"
                      />
                      <span className="font-quicksand font-bold text-3xl sm:text-4xl text-white">pax</span>
                    </div>
                    {/* Solid White Horizontal Underline Bar */}
                    <div className="w-full h-1 bg-white rounded-full mt-2.5" />
                  </div>
                </div>

                {/* Subtext Pill: About ₱150.00 per person */}
                <div className="pt-4">
                  <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-stone-800 text-xs sm:text-sm font-semibold shadow-md border border-stone-200/50 whitespace-nowrap">
                    <Users className="w-4 h-4 text-stone-500 shrink-0" />
                    <span>About {currencySymbol}{tempCostPerPerson} per person</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Controls in Warm Cream Background (#FFFBF2) */}
          <div className="flex-1 flex flex-col justify-between px-6 pt-7 pb-8 bg-[#FFFBF2] space-y-6">
            {/* Quick Presets: 2 pax | 4 pax | 6 pax | 10 pax */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {servingPresets.map((pax) => {
                const isSelected = tempPax === pax;
                return (
                  <button
                    key={pax}
                    type="button"
                    onClick={() => setTempPax(pax)}
                    style={{
                      borderColor: accentColor,
                      backgroundColor: isSelected ? accentColor : '#FFFBF2',
                      color: isSelected ? '#FFFFFF' : accentColor,
                    }}
                    className={`py-2.5 px-1 rounded-full text-xs sm:text-sm font-bold border transition-all tap-spring shadow-xs text-center ${
                      isSelected ? 'shadow-md scale-105' : 'hover:bg-stone-100/50'
                    }`}
                  >
                    {pax} pax
                  </button>
                );
              })}
            </div>

            {/* Stepper Controls: [ - ]   1 person per tap   [ + ] */}
            <div className="flex items-center justify-center gap-8 py-1">
              <button
                type="button"
                onClick={() => setTempPax((prev) => Math.max(1, prev - 1))}
                className="w-16 h-16 rounded-full bg-white shadow-[0_6px_20px_rgba(0,0,0,0.08)] flex items-center justify-center tap-spring border border-stone-100 hover:bg-stone-50 active:scale-95 transition-all"
                title="Minus 1 Person"
              >
                <span 
                  style={{ backgroundColor: accentColor }}
                  className="w-6 h-[3.5px] rounded-full inline-block" 
                />
              </button>

              <span className="font-sans font-medium text-sm text-stone-800 select-none">
                1 person per tap
              </span>

              <button
                type="button"
                onClick={() => setTempPax((prev) => Math.min(50, prev + 1))}
                style={{ backgroundColor: accentColor }}
                className="w-16 h-16 rounded-full text-white shadow-[0_8px_24px_rgba(184,56,29,0.35)] flex items-center justify-center tap-spring hover:scale-105 active:scale-95 transition-all"
                title="Plus 1 Person"
              >
                <Plus className="w-7 h-7 stroke-[3] text-white" />
              </button>
            </div>

            {/* Confirm Button: Hunter Green (#1E4638) Pill */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleConfirm}
                className="w-full py-4 rounded-full bg-[#1E4638] hover:bg-[#16362B] text-white font-bold text-base shadow-md active:scale-98 transition-all tracking-wide"
              >
                Save &amp; Plan Meals
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DISCARD CONFIRMATION MODAL */}
      {showDiscardConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-5 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl border border-stone-100 animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-red-100 text-[#B8381D] flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-lg text-stone-900">
                Discard changes?
              </h3>
              <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                Your budget and serving adjustments won&apos;t be saved unless you tap Save &amp; Plan Meals on the next step.
              </p>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={handleDiscardAndExit}
                className="w-full py-3 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all"
              >
                Discard &amp; Exit
              </button>
              <button
                type="button"
                onClick={() => setShowDiscardConfirm(false)}
                className="w-full py-3 rounded-full bg-[#1E4638] hover:bg-[#16362B] text-white text-xs font-bold shadow-md transition-all"
              >
                Keep Editing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
