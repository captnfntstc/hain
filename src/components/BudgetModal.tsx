'use client';

import React, { useState, useEffect } from 'react';
import { useHain } from '../context/HainContext';
import { Button } from 'glisse';
import { X, Minus, Plus, Users, AlertTriangle, ChevronLeft } from 'lucide-react';

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
    currency,
  } = useHain();

  // Local Draft States (Changes won't be saved unless confirmed in Step 2!)
  const [tempBudget, setTempBudget] = useState<number>(budgetCap);
  const [tempPax, setTempPax] = useState<number>(servingsPax);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState<boolean>(false);

  // Sync draft states whenever modal opens
  useEffect(() => {
    if (isBudgetModalOpen) {
      setTempBudget(budgetCap);
      setTempPax(servingsPax);
      setShowDiscardConfirm(false);
    }
  }, [isBudgetModalOpen, budgetCap, servingsPax]);

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
    // Clamp budget: min 100, max 5,000
    const clampedBudget = Math.min(5000, Math.max(100, tempBudget));
    setTempBudget(clampedBudget);
    setBudgetModalStep(2);
  };

  const handleConfirm = () => {
    // Final commit to global state on Confirm
    const clampedBudget = Math.min(5000, Math.max(100, tempBudget));
    const clampedPax = Math.min(50, Math.max(1, tempPax));
    setBudgetCap(clampedBudget);
    setServingsPax(clampedPax);
    setIsBudgetModalOpen(false);
    setBudgetModalStep(1);
  };

  const servingPresets = [1, 2, 4, 6, 10, 12];
  const tempCostPerPerson = tempPax > 0 ? (tempBudget / tempPax).toFixed(2) : '0.00';

  return (
    <div className="fixed inset-0 z-50 sm:max-w-md sm:mx-auto bg-[#FFFBF2] flex flex-col justify-between overflow-y-auto animate-in fade-in duration-200">
      
      {/* STEP 1: How much is your budget? (Full Page) */}
      {budgetModalStep === 1 && (
        <div className="flex-1 flex flex-col justify-between min-h-screen">
          {/* Top Terracotta Card (Edge-to-edge behind status bar with Dynamic Island clearance) */}
          <div className="bg-[#B8381D] text-white px-6 pt-safe-card pb-10 rounded-b-[44px] shadow-md flex flex-col justify-between min-h-[55vh] relative">
            {/* Top Bar Navigation: (X) Close & Step indicator */}
            <div className="flex items-center justify-between">
              <Button
                variant="glass"
                icon={<X className="w-5 h-5 stroke-[2.5]" />}
                onClick={handleCloseAttempt}
                aria-label="Close"
                className="shrink-0 drop-shadow-md"
              />

              <span className="px-4 py-1.5 rounded-full bg-[#1D4A38] text-white text-xs font-bold tracking-wider shadow-sm">
                1 of 2
              </span>
            </div>

            {/* Title & Amount Display with Direct Typing and Pill Directly Below Textbox */}
            <div className="text-center space-y-4 my-auto py-4 flex flex-col items-center">
              <h1 className="font-serif-title font-bold text-3xl sm:text-[34px] leading-tight text-white">
                How much is<br />your budget?
              </h1>

              {/* Big Currency Display with Official Currency Symbol and Editable Typing Input */}
              <div className="font-sans font-bold text-5xl sm:text-6xl tracking-tight text-white inline-flex items-baseline justify-center gap-2 pt-1">
                <span className="font-serif select-none">{currencySymbol}</span>
                <input
                  type="number"
                  min={100}
                  max={5000}
                  value={tempBudget || ''}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    setTempBudget(isNaN(val) ? 0 : Math.min(5000, val));
                  }}
                  onBlur={() => {
                    if (tempBudget < 100) setTempBudget(100);
                    if (tempBudget > 5000) setTempBudget(5000);
                  }}
                  className="w-48 sm:w-56 bg-transparent text-center border-b-[4px] border-white pb-1 focus:outline-none focus:border-amber-300 transition-colors tabular-nums text-white cursor-text font-bold"
                  title="Type your budget"
                />
              </div>

              {/* Pill directly underneath the budget textbox as requested */}
              <div className="pt-2">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-stone-900 text-xs sm:text-sm font-bold shadow-lg border border-stone-100 whitespace-nowrap tap-spring">
                  <Users className="w-4 h-4 text-stone-700" />
                  <span>About {currencySymbol}{tempCostPerPerson} per person</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Controls in Warm Cream Background (Safe from Home Indicator bar) */}
          <div className="flex-1 flex flex-col justify-between px-6 pt-10 pb-safe-sheet bg-[#FFFBF2] space-y-6">
            {/* Quick Increment Pills with Official Currency Symbol */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[1000, 2000, 5000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setTempBudget(Math.min(5000, tempBudget + amt))}
                  className="py-3 px-3 rounded-full bg-white border-2 border-[#B8381D] text-[#B8381D] text-xs sm:text-sm font-bold shadow-sm tap-spring hover:bg-[#B8381D]/5 transition-all text-center"
                >
                  + {currencySymbol}{amt.toLocaleString()}
                </button>
              ))}
            </div>

            {/* Stepper Controls: [ - ]  +₱10 per tap  [ + ] */}
            <div className="flex items-center justify-center gap-8 py-2">
              <button
                onClick={() => setTempBudget(Math.max(100, tempBudget - 10))}
                className="w-16 h-16 rounded-full bg-white text-[#B8381D] shadow-[0_6px_18px_rgba(0,0,0,0.08)] flex items-center justify-center tap-spring border border-stone-100 hover:bg-stone-50"
                title={`Minus 10 ${currency}`}
              >
                <Minus className="w-7 h-7 stroke-[3]" />
              </button>

              <span className="text-sm font-bold text-stone-800">
                +{currencySymbol}10 per tap
              </span>

              <button
                onClick={() => setTempBudget(Math.min(5000, tempBudget + 10))}
                className="w-16 h-16 rounded-full bg-[#B8381D] text-white shadow-[0_6px_18px_rgba(184,56,29,0.35)] flex items-center justify-center tap-spring hover:bg-[#A33017]"
                title={`Plus 10 ${currency}`}
              >
                <Plus className="w-7 h-7 stroke-[3]" />
              </button>
            </div>

            {/* Next Button (Glisse Filled Button) */}
            <div className="pt-2">
              <Button
                variant="filled"
                tint="#1E4638"
                onClick={handleNext}
                className="w-full !h-12 !rounded-full text-base font-bold shadow-lg tracking-wide !text-white"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: How many people are you cooking for? (Full Page with Back Button) */}
      {budgetModalStep === 2 && (
        <div className="flex-1 flex flex-col justify-between min-h-screen">
          {/* Top Terracotta Card (Edge-to-edge behind status bar with Dynamic Island clearance) */}
          <div className="bg-[#B8381D] text-white px-6 pt-safe-card pb-10 rounded-b-[44px] shadow-md flex flex-col justify-between min-h-[55vh] relative">
            {/* Top Bar Navigation: [←] Back Button + (X) Close + 2 of 2 Badge */}
            <div className="flex items-center justify-between">
              <Button
                variant="glass"
                icon={<ChevronLeft className="w-6 h-6 stroke-[2.5]" />}
                onClick={() => setBudgetModalStep(1)}
                aria-label="Back to Budget Setting"
                className="shrink-0 drop-shadow-md"
              />

              <div className="flex items-center gap-2">
                <span className="px-4 py-1.5 rounded-full bg-[#1D4A38] text-white text-xs font-bold tracking-wider shadow-sm">
                  2 of 2
                </span>
                <Button
                  variant="glass"
                  icon={<X className="w-5 h-5 stroke-[2.5]" />}
                  onClick={handleCloseAttempt}
                  aria-label="Close"
                  className="shrink-0 drop-shadow-md"
                />
              </div>
            </div>

            {/* Title & Pax Display with Direct Typing and Pill Directly Below Textbox */}
            <div className="text-center space-y-4 my-auto py-4 flex flex-col items-center">
              <h1 className="font-serif-title font-bold text-3xl sm:text-[34px] leading-tight text-white">
                How many people are<br />you cooking for?
              </h1>

              {/* Big Pax Display with Editable Typing Input */}
              <div className="font-sans font-bold text-5xl sm:text-6xl tracking-tight text-white inline-flex items-baseline justify-center gap-2 pt-1">
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
                  className="w-24 sm:w-28 bg-transparent text-center border-b-[4px] border-white pb-1 focus:outline-none focus:border-amber-300 transition-colors tabular-nums text-white cursor-text font-bold"
                  title="Type number of people"
                />
                <span className="font-medium text-4xl sm:text-5xl">pax</span>
              </div>

              {/* Pill directly underneath the pax textbox as requested */}
              <div className="pt-2">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-stone-900 text-xs sm:text-sm font-bold shadow-lg border border-stone-100 whitespace-nowrap tap-spring">
                  <Users className="w-4 h-4 text-stone-700" />
                  <span>About {currencySymbol}{tempCostPerPerson} per person</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Controls in Warm Cream Background (Safe from Home Indicator bar) */}
          <div className="flex-1 flex flex-col justify-between px-6 pt-10 pb-safe-sheet bg-[#FFFBF2] space-y-6">
            {/* Number Circles: 1, 2, 4, 6, 10, 12 */}
            <div className="flex items-center justify-between gap-2 pt-2">
              {servingPresets.map((pax) => {
                const isSelected = tempPax === pax;
                return (
                  <button
                    key={pax}
                    onClick={() => setTempPax(pax)}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full text-sm sm:text-base font-extrabold transition-all tap-spring flex items-center justify-center shadow-sm ${
                      isSelected
                        ? 'bg-[#B8381D] text-white border-2 border-[#B8381D] scale-110 shadow-md'
                        : 'bg-white border-2 border-[#B8381D] text-stone-900 hover:bg-[#B8381D]/5'
                    }`}
                  >
                    {pax}
                  </button>
                );
              })}
            </div>

            {/* Stepper Controls: [ - ]  +1 pax per tap  [ + ] */}
            <div className="flex items-center justify-center gap-8 py-2">
              <button
                onClick={() => setTempPax(Math.max(1, tempPax - 1))}
                className="w-16 h-16 rounded-full bg-white text-[#B8381D] shadow-[0_6px_18px_rgba(0,0,0,0.08)] flex items-center justify-center tap-spring border border-stone-100 hover:bg-stone-50"
                title="Minus 1 Person"
              >
                <Minus className="w-7 h-7 stroke-[3]" />
              </button>

              <span className="text-sm font-bold text-stone-800">
                +1 pax per tap
              </span>

              <button
                onClick={() => setTempPax(Math.min(50, tempPax + 1))}
                className="w-16 h-16 rounded-full bg-[#B8381D] text-white shadow-[0_6px_18px_rgba(184,56,29,0.35)] flex items-center justify-center tap-spring hover:bg-[#A33017]"
                title="Plus 1 Person"
              >
                <Plus className="w-7 h-7 stroke-[3]" />
              </button>
            </div>

            {/* Confirm Button (Glisse Filled Button) */}
            <div className="pt-2">
              <Button
                variant="filled"
                tint="#1E4638"
                onClick={handleConfirm}
                className="w-full !h-12 !rounded-full text-base font-bold shadow-lg tracking-wide !text-white"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* DISCARD CONFIRMATION MODAL (Shows when clicking (X) with unsaved changes) */}
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
                Your budget and serving adjustments won&apos;t be saved unless you tap Confirm on the next step.
              </p>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <Button
                variant="glass"
                onClick={handleDiscardAndExit}
                className="w-full !py-3 !rounded-full !bg-stone-100 text-stone-800 text-xs font-bold"
              >
                <span>Discard &amp; Exit</span>
              </Button>
              <Button
                variant="filled"
                tint="#1E4638"
                onClick={() => setShowDiscardConfirm(false)}
                className="w-full !py-3 !rounded-full !text-white text-xs font-bold shadow-md"
              >
                <span>Keep Editing</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
