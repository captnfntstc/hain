'use client';

import React, { useState } from 'react';
import { useHain } from '../context/HainContext';
import { DELIVERY_PLATFORMS } from '../data/mockData';
import { X, Truck, ExternalLink, CheckCircle2, Clock } from 'lucide-react';
import { Button } from 'glisse';

export default function PadeliverModal() {
  const {
    isPadeliverOpen,
    setIsPadeliverOpen,
    activeRecipe,
    calculateRecipeBasket,
    budgetCap,
  } = useHain();

  const [selectedPlatform, setSelectedPlatform] = useState<string>('grabmart');
  const [isHandoffTriggered, setIsHandoffTriggered] = useState<boolean>(false);

  if (!isPadeliverOpen || !activeRecipe) return null;

  const { basketTotal } = calculateRecipeBasket(activeRecipe);

  const currentPlatform =
    DELIVERY_PLATFORMS.find((p) => p.id === selectedPlatform) || DELIVERY_PLATFORMS[0];

  const grandTotalWithDelivery = basketTotal + currentPlatform.deliveryFee;

  const handleCheckoutHandoff = () => {
    setIsHandoffTriggered(true);
    setTimeout(() => {
      setIsHandoffTriggered(false);
      setIsPadeliverOpen(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white dark:bg-[#1E1B18] border border-stone-200 dark:border-stone-800 rounded-3xl p-5 shadow-2xl flex flex-col space-y-4 max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-950/40 text-[var(--theme-primary)] flex items-center justify-center font-bold">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-white">
                1-Tap &quot;Padeliver Na Lang&quot;
              </h3>
              <p className="text-[10px] text-stone-400">
                Direct online grocery handoff
              </p>
            </div>
          </div>

          <Button
            variant="glass"
            icon={<X className="w-4 h-4 text-stone-600" />}
            onClick={() => setIsPadeliverOpen(false)}
            className="!w-8 !h-8 !rounded-full"
          />
        </div>

        {/* Recipe Basket Summary */}
        <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
          <div>
            <div className="font-bold text-stone-800 dark:text-stone-200">{activeRecipe.localName} Basket</div>
            <div className="text-[10px] text-stone-400">{activeRecipe.ingredients.length} items pre-loaded</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-stone-400">Subtotal</div>
            <div className="text-sm font-extrabold text-[var(--theme-primary)] tabular-nums">₱{basketTotal.toFixed(0)}</div>
          </div>
        </div>

        {/* Platforms List */}
        <div className="space-y-1.5 flex-1 overflow-y-auto">
          {DELIVERY_PLATFORMS.map((platform) => {
            const isSelected = selectedPlatform === platform.id;
            return (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`w-full p-2.5 rounded-2xl border text-left transition-all tap-spring flex items-center justify-between gap-2.5 ${
                  isSelected
                    ? 'bg-red-50/50 dark:bg-red-950/20 border-[var(--theme-primary)]'
                    : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">{platform.logo}</span>
                  <div>
                    <div className="text-xs font-bold text-stone-900 dark:text-white leading-tight">
                      {platform.name}
                    </div>
                    <div className="text-[10px] text-stone-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      <span>{platform.eta}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-stone-800 dark:text-stone-200 tabular-nums">
                    +₱{platform.deliveryFee}
                  </div>
                  <div className="text-[9px] text-stone-400">delivery</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Grand Total */}
        <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs">
          <div>
            <div className="text-[10px] uppercase font-bold text-stone-400">
              Total with Delivery
            </div>
            <div className="text-base font-extrabold text-[var(--theme-primary)] tabular-nums font-display">
              ₱{grandTotalWithDelivery.toFixed(0)}
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] text-stone-400">Cap: ₱{budgetCap.toLocaleString()}</div>
            <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
              {budgetCap >= grandTotalWithDelivery ? 'Pasok sa budget ✓' : 'Over budget'}
            </div>
          </div>
        </div>

        {/* Button */}
        <Button
          variant="filled"
          tint="#B8381D"
          onClick={handleCheckoutHandoff}
          disabled={isHandoffTriggered}
          className="w-full !py-3 !px-4 !rounded-full !text-white font-bold text-xs shadow-sm disabled:opacity-50"
        >
          {isHandoffTriggered ? (
            <span className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 animate-pulse" />
              <span>Naglo-load sa {currentPlatform.name}...</span>
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <span>I-Hand off sa {currentPlatform.name}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
