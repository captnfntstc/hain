'use client';

import React, { useState } from 'react';
import { useHain } from '../context/HainContext';
import { X, Copy, Check, Send } from 'lucide-react';
import { Button } from 'glisse';

export default function PabiliExportModal() {
  const {
    isPabiliOpen,
    setIsPabiliOpen,
    activeRecipe,
    calculateRecipeBasket,
    budgetCap,
  } = useHain();

  const [copied, setCopied] = useState(false);

  if (!isPabiliOpen || !activeRecipe) return null;

  const { basketTotal, remainingBudget } = calculateRecipeBasket(activeRecipe);

  const palengkeItems = activeRecipe.ingredients.filter((i) => i.storeType === 'palengke');
  const supermarketItems = activeRecipe.ingredients.filter((i) => i.storeType === 'supermarket');

  const pabiliText = `🛒 *PABILI PO (Hain Ulam Planner)*
Ihahain: *${activeRecipe.localName}* (${activeRecipe.title})
Target Budget Cap: ₱${budgetCap.toLocaleString()}.00

📍 *STOP 1: Muñoz Wet Market (Palengke)*
${palengkeItems.map((i) => `• ${i.localName} ~ ₱${i.actualPrice || i.estimatedPrice}.00`).join('\n')}

${
  supermarketItems.length > 0
    ? `📍 *STOP 2: Puregold Muñoz (Supermarket Spillover)*\n${supermarketItems
        .map((i) => `• ${i.localName} ~ ₱${i.actualPrice || i.estimatedPrice}.00`)
        .join('\n')}\n`
    : ''
}
💰 *Estimated Total*: ₱${basketTotal.toFixed(0)}.00
${remainingBudget > 0 ? `💵 *May sukli na*: ₱${remainingBudget.toFixed(0)}.00 mula sa ₱${budgetCap.toLocaleString()} budget!\n` : ''}
Salamat po! Ingat sa pag-uwi!`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pabiliText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white dark:bg-[#1E1B18] border border-stone-200 dark:border-stone-800 rounded-3xl p-5 shadow-2xl flex flex-col space-y-4 max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[var(--theme-banner-start)] text-white flex items-center justify-center font-bold">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-white">
                1-Tap &quot;Pabili&quot; Export
              </h3>
              <p className="text-[10px] text-stone-400">
                Pre-formatted for Viber, Messenger, or SMS
              </p>
            </div>
          </div>

          <Button
            variant="glass"
            icon={<X className="w-4 h-4 text-stone-600" />}
            onClick={() => setIsPabiliOpen(false)}
            className="!w-8 !h-8 !rounded-full"
          />
        </div>

        {/* Message Box */}
        <div className="flex-1 overflow-y-auto bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-3 font-mono text-xs leading-relaxed text-stone-800 dark:text-stone-200 whitespace-pre-wrap select-all">
          {pabiliText}
        </div>

        {/* Action Button */}
        <Button
          variant="filled"
          tint={copied ? "#059669" : "#B8381D"}
          onClick={handleCopy}
          className="w-full !py-3 !px-4 !rounded-full font-bold text-xs !text-white shadow-sm"
        >
          {copied ? (
            <span className="flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              <span>Kopyado Na sa Clipboard!</span>
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Copy className="w-4 h-4" />
              <span>Kopyahin ang Text (Copy)</span>
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
