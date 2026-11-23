'use client';

import React, { useState } from 'react';
import { useHain } from '../context/HainContext';
import { Button } from 'glisse';
import {
  ChevronLeft,
  Bookmark,
  Share2,
  Check,
  X,
  Clock,
  Flame,
  Users,
  Coins,
  CheckCheck,
  Star,
} from 'lucide-react';

export default function RecipeDetailScreen() {
  const {
    activeRecipe,
    setIsRecipeDetailOpen,
    budgetCap,
    currencySymbol,
    ingredientStatuses,
    cycleIngredientStatus,
    calculateRecipeBasket,
    setIsCookCountdownOpen,
    setCountdownPhase,
    language,
  } = useHain();

  const [activeSubTab, setActiveSubTab] = useState<'ingredients' | 'procedure'>('ingredients');
  const [procedurePhase, setProcedurePhase] = useState<'prep' | 'cook'>('prep');
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { basketTotal, isWithinCap } = calculateRecipeBasket(activeRecipe);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  };

  const handleToggleBookmark = () => {
    const next = !isBookmarked;
    setIsBookmarked(next);
    showToast(next ? 'Recipe saved to bookmarks!' : 'Recipe removed from bookmarks');
  };

  const handleShare = async () => {
    const shareData = {
      title: activeRecipe.localName || activeRecipe.title,
      text: `Lutuin natin ito: ${activeRecipe.localName} - est. ₱${activeRecipe.estimatedPrice}!`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled share
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        showToast('Link copied to clipboard!');
      } catch {
        showToast('Shared recipe details!');
      }
    }
  };

  const handleStartCook = () => {
    setCountdownPhase('ready');
    setIsCookCountdownOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 sm:max-w-md sm:mx-auto bg-[var(--theme-bg-app,#FFFBF2)] flex flex-col overflow-hidden animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 bg-[#181614]/90 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full shadow-xl flex items-center gap-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP HERO FOOD IMAGE (Full-width edge-to-edge behind status bar) */}
      <div className="relative h-72 sm:h-80 w-full flex-shrink-0 bg-stone-900">
        <img
          src={activeRecipe.image}
          alt={activeRecipe.title}
          className="w-full h-full object-cover"
        />
        {/* Soft top gradient for button contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/30" />

        {/* Floating Action Buttons (Top safe area with Dynamic Island clearance) */}
        <div className="absolute top-safe pt-3 left-4 right-4 flex items-center justify-between text-white z-20">
          {/* Back Button (<) using Glisse Apple Liquid Glass */}
          <Button
            variant="glass"
            icon={<ChevronLeft className="w-5 h-5 text-white" />}
            onClick={() => setIsRecipeDetailOpen(false)}
            aria-label="Back"
            className="!w-10 !h-10 !rounded-full !p-0 lg-glass-clear flex items-center justify-center drop-shadow-md"
          />

          {/* Right Floating Actions (Bookmark & Share) using Glisse Apple Liquid Glass */}
          <div className="flex items-center gap-2">
            <Button
              variant={isBookmarked ? 'filled' : 'glass'}
              tint={isBookmarked ? '#B8381D' : undefined}
              icon={<Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-white text-white' : 'text-white'}`} />}
              onClick={handleToggleBookmark}
              aria-label="Bookmark Recipe"
              className={`!w-10 !h-10 !rounded-full !p-0 flex items-center justify-center drop-shadow-md ${!isBookmarked ? 'lg-glass-clear' : ''}`}
            />

            <Button
              variant="glass"
              icon={<Share2 className="w-4 h-4 text-white" />}
              onClick={handleShare}
              aria-label="Share Recipe"
              className="!w-10 !h-10 !rounded-full !p-0 lg-glass-clear flex items-center justify-center drop-shadow-md"
            />
          </div>
        </div>
      </div>

      {/* CURVED SHEET OVERLAY (Overlaps bottom of hero photo with rounded-t-[36px]) */}
      <div className="flex-1 bg-[#FFFBF2] -mt-8 rounded-t-[36px] shadow-[0_-8px_30px_rgba(0,0,0,0.12)] flex flex-col overflow-hidden relative z-10 border-t border-stone-200/50">
        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto px-5 pt-6 pb-28 space-y-5 no-scrollbar">
          
          {/* HEADER ROW: Title & Rating Badge */}
          <div>
            <div className="flex items-start justify-between gap-3">
              <h1 className="font-serif font-bold text-[26px] leading-[1.18] text-[#842A16] flex-1">
                {activeRecipe.localName || activeRecipe.title}
              </h1>

              {/* Rating Pill Badge */}
              <div className="shrink-0 px-3 py-1 rounded-full bg-[#C29B63] text-white text-xs font-bold flex items-center gap-1 shadow-sm mt-0.5">
                <Star className="w-3.5 h-3.5 text-white fill-white" />
                <span className="leading-none">{activeRecipe.rating?.toFixed(1) || '4.8'}</span>
              </div>
            </div>

            {/* Author / Source Subtitle */}
            <p className="text-xs text-stone-500 font-normal mt-1.5">
              Recipe by {activeRecipe.source || 'Panlasang Pinoy'}
            </p>
          </div>

          {/* 4 STATS PILLS ROW (Prep, Cook, Pax, Est. Price) */}
          <div className="grid grid-cols-4 gap-2">
            {/* 1. Prep */}
            <div className="bg-[#EADBCC] py-2.5 px-1 rounded-2xl text-center shadow-xs">
              <div className="flex items-center justify-center gap-1 font-bold text-stone-900 text-xs sm:text-sm tabular-nums">
                <Clock className="w-3.5 h-3.5 text-[#2A1D15]" />
                <span>{activeRecipe.prepTimeMinutes}m</span>
              </div>
              <div className="text-[11px] text-[#6E5D50] font-medium mt-0.5">Prep</div>
            </div>

            {/* 2. Cook */}
            <div className="bg-[#EADBCC] py-2.5 px-1 rounded-2xl text-center shadow-xs">
              <div className="flex items-center justify-center gap-1 font-bold text-stone-900 text-xs sm:text-sm tabular-nums">
                <Flame className="w-3.5 h-3.5 text-[#2A1D15] fill-[#2A1D15]" />
                <span>{activeRecipe.cookTimeMinutes}m</span>
              </div>
              <div className="text-[11px] text-[#6E5D50] font-medium mt-0.5">Cook</div>
            </div>

            {/* 3. Pax */}
            <div className="bg-[#EADBCC] py-2.5 px-1 rounded-2xl text-center shadow-xs">
              <div className="flex items-center justify-center gap-1 font-bold text-stone-900 text-xs sm:text-sm tabular-nums">
                <Users className="w-3.5 h-3.5 text-[#2A1D15]" />
                <span>{activeRecipe.servings}</span>
              </div>
              <div className="text-[11px] text-[#6E5D50] font-medium mt-0.5">Pax</div>
            </div>

            {/* 4. Est. Price */}
            <div className="bg-[#EADBCC] py-2.5 px-1 rounded-2xl text-center shadow-xs">
              <div className="flex items-center justify-center gap-1 font-bold text-stone-900 text-xs sm:text-sm tabular-nums">
                <Coins className="w-3.5 h-3.5 text-[#2A1D15]" />
                <span>{currencySymbol}{activeRecipe.estimatedPrice}</span>
              </div>
              <div className="text-[11px] text-[#6E5D50] font-medium mt-0.5">Est. Price</div>
            </div>
          </div>

          {/* SEGMENTED TABS: Ingredients vs Procedure */}
          <div className="flex border-b border-[#E5DAC6] pt-1">
            <button
              onClick={() => setActiveSubTab('ingredients')}
              className={`flex-1 pb-2.5 text-center text-sm sm:text-base transition-all relative ${
                activeSubTab === 'ingredients'
                  ? 'text-[#842A16] font-bold border-b-2 border-[#842A16] -mb-[1px]'
                  : 'text-stone-400 hover:text-stone-600 font-medium'
              }`}
            >
              Ingredients
            </button>
            <button
              onClick={() => setActiveSubTab('procedure')}
              className={`flex-1 pb-2.5 text-center text-sm sm:text-base transition-all relative ${
                activeSubTab === 'procedure'
                  ? 'text-[#842A16] font-bold border-b-2 border-[#842A16] -mb-[1px]'
                  : 'text-stone-400 hover:text-stone-600 font-medium'
              }`}
            >
              Procedure
            </button>
          </div>

          {/* INGREDIENTS VIEW */}
          {activeSubTab === 'ingredients' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              {/* Tap to cycle legend: Compact and non-wrapping */}
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-stone-500 pt-0.5 pb-1 whitespace-nowrap overflow-x-auto no-scrollbar select-none">
                <span className="font-semibold text-stone-600 shrink-0">
                  {language === 'tl' ? 'I-tap para magbago:' : 'Tap to cycle:'}
                </span>
                <div className="inline-flex items-center gap-1.5 text-stone-700">
                  <span className="inline-flex items-center gap-1 shrink-0">
                    <span className="w-3.5 h-3.5 rounded bg-[#842A16] text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                    </span>
                    <span className="font-medium">
                      {language === 'tl' ? 'Nabili na' : 'Purchased'}
                    </span>
                  </span>
                  <span className="text-stone-300">·</span>
                  <span className="inline-flex items-center gap-1 shrink-0">
                    <span className="w-3.5 h-3.5 rounded bg-[#842A16]/20 text-[#842A16] flex items-center justify-center">
                      <X className="w-2.5 h-2.5 text-[#842A16] stroke-[3]" />
                    </span>
                    <span className="font-medium">
                      {language === 'tl' ? 'May Stock' : 'In Stock'}
                    </span>
                  </span>
                  <span className="text-stone-300">·</span>
                  <span className="inline-flex items-center gap-1 shrink-0">
                    <span className="w-3.5 h-3.5 rounded border border-stone-300 bg-white inline-block" />
                    <span className="font-medium">
                      {language === 'tl' ? 'Kailangan pa' : 'Unticked'}
                    </span>
                  </span>
                </div>
              </div>

              {/* Ingredient List Cards: Uniform Height (h-14 / 56px) and Padding */}
              <div className="space-y-2.5">
                {activeRecipe.ingredients.map((ing) => {
                  const status = ingredientStatuses[ing.id] || 'to-buy';

                  // Format ingredient name cleanly according to selected language
                  const baseName = (language === 'tl' ? ing.localName : (ing.name || ing.localName)).trim();
                  let cleanName = baseName;
                  if (!/^\d/.test(cleanName) && !cleanName.toLowerCase().includes(ing.quantity.toLowerCase())) {
                    cleanName = `${ing.quantity} ${cleanName}`;
                  }

                  return (
                    <div
                      key={ing.id}
                      onClick={() => cycleIngredientStatus(ing.id)}
                      className="bg-white rounded-2xl px-4 h-14 min-h-[56px] shadow-sm border border-[#F2ECE1] flex items-center justify-between gap-3 cursor-pointer tap-spring transition-all select-none hover:border-[#E5DAC6]"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        {/* 3-Cycle State Checkbox */}
                        {status === 'bought' && (
                          <div className="w-5 h-5 rounded-md bg-[#842A16] text-white flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                        {status === 'stocked' && (
                          <div className="w-5 h-5 rounded-md bg-[#842A16]/15 border border-[#842A16]/30 text-[#842A16] flex items-center justify-center shrink-0">
                            <X className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                        {status === 'to-buy' && (
                          <div className="w-5 h-5 rounded-md border-2 border-stone-300 bg-white shrink-0" />
                        )}

                        {/* Ingredient Name & Dash */}
                        <span
                          className={`text-sm font-semibold truncate leading-none ${
                            status === 'stocked' ? 'line-through text-stone-400' : 'text-stone-800'
                          }`}
                        >
                          {cleanName} —
                        </span>
                      </div>

                      {/* Ingredient Price: Fixed Height & Vertical Center */}
                      <div className="shrink-0 text-right flex items-center justify-end h-5">
                        {status === 'stocked' ? (
                          <div className="text-sm font-bold flex items-center justify-end leading-none">
                            <span className="line-through mr-1.5 text-xs text-stone-300 font-medium tabular-nums">
                              {currencySymbol}{ing.estimatedPrice.toFixed(2)}
                            </span>
                            <span className="text-emerald-700 tabular-nums">
                              {currencySymbol}0.00
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm font-bold tabular-nums text-stone-900 leading-none">
                            {currencySymbol}{ing.estimatedPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* PROCEDURE VIEW */}
          {activeSubTab === 'procedure' && (
            <div className="space-y-4">
              {/* Switch Pill: Prep vs Cook with Smooth Sliding Spring Animation */}
              <div
                role="tablist"
                aria-label="Cooking phases"
                className="relative bg-[#EAE0D3] p-1 rounded-full flex items-center border border-[#DFCFC0] shadow-inner select-none overflow-hidden h-11"
              >
                {/* Animated Sliding Background Indicator with Spring Physics */}
                <div
                  className={`switch-pill-slider absolute top-1 bottom-1 w-[calc(50%-4px)] left-1 bg-[#842A16] rounded-full shadow-md shadow-[#842A16]/25 ${
                    procedurePhase === 'prep' ? 'translate-x-0' : 'translate-x-full'
                  }`}
                />

                {/* Option 1: Prep */}
                <button
                  type="button"
                  role="tab"
                  aria-selected={procedurePhase === 'prep'}
                  onClick={() => setProcedurePhase('prep')}
                  className={`relative z-10 flex-1 h-full py-1.5 px-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 tap-spring text-center flex items-center justify-center gap-1.5 ${
                    procedurePhase === 'prep'
                      ? 'text-white'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <span>1. Prep</span>
                  <span
                    className={`text-[11px] font-medium transition-colors duration-200 ${
                      procedurePhase === 'prep' ? 'text-white/80' : 'text-stone-500'
                    }`}
                  >
                    ({activeRecipe.prepTimeMinutes || 10} mins)
                  </span>
                </button>

                {/* Option 2: Cook */}
                <button
                  type="button"
                  role="tab"
                  aria-selected={procedurePhase === 'cook'}
                  onClick={() => setProcedurePhase('cook')}
                  className={`relative z-10 flex-1 h-full py-1.5 px-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 tap-spring text-center flex items-center justify-center gap-1.5 ${
                    procedurePhase === 'cook'
                      ? 'text-white'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <span>2. Cook</span>
                  <span
                    className={`text-[11px] font-medium transition-colors duration-200 ${
                      procedurePhase === 'cook' ? 'text-white/80' : 'text-stone-500'
                    }`}
                  >
                    ({activeRecipe.cookTimeMinutes || 20} mins)
                  </span>
                </button>
              </div>

              {/* Prep Steps */}
              {procedurePhase === 'prep' && (
                <div key="prep" className="space-y-3 anim-slide-left">
                  {activeRecipe.prepSteps && activeRecipe.prepSteps.length > 0 ? (
                    activeRecipe.prepSteps.map((step) => (
                      <div
                        key={step.stepNumber}
                        className="bg-white p-4 rounded-2xl border border-[#F2ECE1] shadow-sm space-y-2"
                      >
                        <div className="text-xs font-bold text-[#842A16]">
                          Prep {step.stepNumber} — {step.title}
                        </div>
                        <p className="text-xs text-stone-800 leading-relaxed">
                          {step.instruction}
                        </p>
                        {step.tags && step.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {step.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded-full bg-[#842A16]/10 text-[#842A16] text-[10px] font-bold"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="bg-white p-4 rounded-2xl border border-[#F2ECE1] text-xs text-stone-500 text-center">
                      Prepare your fresh ingredients and pantry staples on the counter.
                    </div>
                  )}
                </div>
              )}

              {/* Cook Steps */}
              {procedurePhase === 'cook' && (
                <div key="cook" className="space-y-3 anim-slide-right">
                  {activeRecipe.cookSteps && activeRecipe.cookSteps.length > 0 ? (
                    activeRecipe.cookSteps.map((step) => (
                      <div
                        key={step.stepNumber}
                        className="bg-white p-4 rounded-2xl border border-[#F2ECE1] shadow-sm space-y-1.5"
                      >
                        <div className="text-xs font-bold text-[#842A16]">
                          Step {step.stepNumber} — {step.title}
                        </div>
                        <p className="text-xs text-stone-800 leading-relaxed">
                          {step.instruction}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="bg-white p-4 rounded-2xl border border-[#F2ECE1] text-xs text-stone-500 text-center">
                      Follow standard sautéing and simmering until tender and savory.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* STICKY BOTTOM ACTION BAR (Dark Charcoal Pill Bar matching reference mockup) */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#181614] rounded-t-[28px] px-5 pt-3.5 pb-6 sm:pb-4 shadow-2xl flex items-center justify-between gap-3 z-30">
          <div>
            <div className="text-base font-display font-bold text-white tabular-nums tracking-tight">
              Basket Total: {currencySymbol}{basketTotal.toFixed(0)}
            </div>
            <div className="text-xs text-stone-400 font-normal mt-0.5">
              {isWithinCap
                ? `(Within ${currencySymbol}${budgetCap.toLocaleString()} cap)`
                : `(Exceeds ${currencySymbol}${budgetCap.toLocaleString()} cap)`}
            </div>
          </div>

          <Button
            variant="filled"
            tint="#B8381D"
            onClick={handleStartCook}
            className="!rounded-full font-bold shadow-md !text-white text-sm"
          >
            <span>Cook Now</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
