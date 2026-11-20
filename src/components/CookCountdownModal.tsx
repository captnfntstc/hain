'use client';

import React, { useEffect } from 'react';
import { useHain } from '../context/HainContext';
import { X, Play, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from 'glisse';

export default function CookCountdownModal() {
  const {
    isCookCountdownOpen,
    setIsCookCountdownOpen,
    countdownPhase,
    setCountdownPhase,
    activeRecipe,
  } = useHain();

  useEffect(() => {
    if (!isCookCountdownOpen) return;

    if (countdownPhase === 'ready') {
      const timer = setTimeout(() => setCountdownPhase(3), 1200);
      return () => clearTimeout(timer);
    }
    if (countdownPhase === 3) {
      const timer = setTimeout(() => setCountdownPhase(2), 1000);
      return () => clearTimeout(timer);
    }
    if (countdownPhase === 2) {
      const timer = setTimeout(() => setCountdownPhase(1), 1000);
      return () => clearTimeout(timer);
    }
    if (countdownPhase === 1) {
      const timer = setTimeout(() => {
        setCountdownPhase('start');
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      }, 1000);
      return () => clearTimeout(timer);
    }
    if (countdownPhase === 'start') {
      const timer = setTimeout(() => setCountdownPhase('cooking'), 1200);
      return () => clearTimeout(timer);
    }
  }, [isCookCountdownOpen, countdownPhase, setCountdownPhase]);

  if (!isCookCountdownOpen) return null;

  const handleCancel = () => {
    setIsCookCountdownOpen(false);
    setCountdownPhase('ready');
  };

  // Ring stroke calculation
  const getStrokeDashoffset = () => {
    const circumference = 2 * Math.PI * 90; // r=90
    if (countdownPhase === 'ready') return 0;
    if (countdownPhase === 3) return circumference * 0.25;
    if (countdownPhase === 2) return circumference * 0.50;
    if (countdownPhase === 1) return circumference * 0.75;
    return circumference; // empty on Start
  };

  const circumference = 2 * Math.PI * 90;

  return (
    <div className="fixed inset-0 z-50 bg-[var(--theme-bg-app)] flex flex-col justify-between items-center pt-safe-card pb-safe-sheet px-6 animate-in fade-in duration-200">
      <div className="w-full flex justify-end">
        <Button
          variant="glass"
          icon={<X className="w-4 h-4 text-stone-700" />}
          onClick={handleCancel}
          className="!w-8 !h-8 !rounded-full"
        />
      </div>

      {countdownPhase !== 'cooking' ? (
        /* Circular Gauge Screen (Exact from Figma Mockup) */
        <div className="flex-1 flex flex-col items-center justify-center space-y-12">
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Background Ring */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="90"
                stroke="currentColor"
                strokeWidth="7"
                fill="none"
                className="text-stone-200 dark:text-stone-800"
              />
              <circle
                cx="100"
                cy="100"
                r="90"
                stroke="var(--theme-primary)"
                strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={getStrokeDashoffset()}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-700 ease-out"
              />
            </svg>

            {/* Centered Countdown Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display font-bold text-4xl sm:text-5xl text-stone-900 dark:text-white transition-all scale-100">
                {countdownPhase === 'ready' && 'Ready?'}
                {countdownPhase === 3 && '3'}
                {countdownPhase === 2 && '2'}
                {countdownPhase === 1 && '1'}
                {countdownPhase === 'start' && 'Start!'}
              </span>
            </div>
          </div>

          <Button
            variant="filled"
            tint="#1E4638"
            onClick={handleCancel}
            className="w-32 !rounded-full !text-white text-xs font-bold shadow-md"
          >
            <span>Cancel</span>
          </Button>
        </div>
      ) : (
        /* Active Cooking Mode Screen */
        <div className="flex-1 flex flex-col justify-between max-w-sm w-full text-center space-y-6 pt-4">
          <div>
            <div className="text-[11px] uppercase tracking-wider font-bold text-[var(--theme-primary)]">
              {activeRecipe.localName}
            </div>
            <h2 className="font-display font-extrabold text-2xl text-stone-900 dark:text-white mt-1">
              Step 1: Sear the Beef
            </h2>
            <p className="text-xs text-stone-500 mt-2 leading-relaxed">
              Saute garlic and onions in hot oil, then brown 1kg beef chuck cubes for 5 minutes.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl inline-flex flex-col items-center mx-auto">
            <span className="text-[10px] uppercase font-bold text-stone-400">Timer</span>
            <span className="font-display font-extrabold text-4xl text-[var(--theme-primary)] tabular-nums my-1">
              05:00
            </span>
            <span className="text-[10px] text-stone-500">Screen kept awake for wet hands</span>
          </div>

          <div className="space-y-2 pb-6">
            <Button
              variant="filled"
              tint="#1E4638"
              onClick={() => {
                confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
                handleCancel();
              }}
              className="w-full !rounded-full !text-white text-xs font-bold shadow-md"
            >
              <span>Complete Step &amp; Done!</span>
            </Button>
            <Button
              variant="glass"
              onClick={handleCancel}
              className="w-full !rounded-full text-stone-500 text-xs font-semibold"
            >
              <span>Back to Recipe</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
