'use client';

import React from 'react';
import { useHain } from '../context/HainContext';
import { COLOR_THEMES, PrimaryColorThemeId } from '../types/hain';
import { Palette, X, Check, Sparkles } from 'lucide-react';

export default function DeveloperOptionsModal() {
  const {
    colorThemeId,
    colorTheme,
    setColorThemeId,
    isDevOptionsOpen,
    setIsDevOptionsOpen,
  } = useHain();

  const themeList = Object.values(COLOR_THEMES);

  return (
    <>
      {/* 
        DISCREET FLOATING THEME STUDIO TRIGGER PILL
        Visible on screen so user can quickly open developer theme options while testing
      */}
      <div className="fixed bottom-24 right-3.5 z-40 pointer-events-auto">
        <button
          type="button"
          onClick={() => setIsDevOptionsOpen(true)}
          title="Developer Options: Primary Colorway Studio"
          aria-label="Open Primary Colorway Studio"
          className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-white/95 text-stone-800 border border-stone-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.12)] tap-spring hover:scale-105 transition-all text-xs font-bold backdrop-blur-md group"
        >
          {/* Active theme color swatch dot */}
          <span 
            style={{ backgroundColor: colorTheme.badgeBg }}
            className="w-3.5 h-3.5 rounded-full ring-2 ring-white shadow-xs shrink-0 transition-colors"
          />
          <span className="font-quicksand font-bold text-[11px] sm:text-xs text-stone-800">
            {colorTheme.name.split(' ')[0]} Theme
          </span>
          <Palette className="w-3.5 h-3.5 text-stone-500 group-hover:text-stone-900 transition-colors" />
        </button>
      </div>

      {/* DEVELOPER OPTIONS BOTTOM SHEET / MODAL */}
      {isDevOptionsOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsDevOptionsOpen(false)}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-md bg-[#FFFBF2] rounded-t-[32px] sm:rounded-[32px] max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden animate-in slide-in-from-bottom-6 duration-250"
          >
            {/* Modal Header */}
            <div className="p-5 pb-3 border-b border-stone-200/80 bg-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div 
                  style={{ backgroundColor: colorTheme.accentSubtle, color: colorTheme.accentColor }}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                >
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-stone-900 leading-tight">
                    Developer Options
                  </h3>
                  <p className="text-xs text-stone-500 font-sans mt-0.5">
                    Compare & pick Hain's primary brand colorway
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsDevOptionsOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-900 flex items-center justify-center tap-spring transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Colorway Options List */}
            <div className="p-4 sm:p-5 space-y-3.5 overflow-y-auto flex-1">
              {themeList.map((theme) => {
                const isSelected = colorThemeId === theme.id;
                return (
                  <div
                    key={theme.id}
                    onClick={() => setColorThemeId(theme.id as PrimaryColorThemeId)}
                    className={`p-3.5 sm:p-4 rounded-[22px] border-2 transition-all tap-spring cursor-pointer relative ${
                      isSelected 
                        ? 'bg-white shadow-md' 
                        : 'bg-white/80 border-stone-200/80 hover:border-stone-300 hover:bg-white'
                    }`}
                    style={{
                      borderColor: isSelected ? theme.accentColor : undefined,
                    }}
                  >
                    {/* Header Mini Preview Banner */}
                    <div 
                      style={{ 
                        backgroundColor: theme.headerBg,
                        color: theme.headerText 
                      }}
                      className="w-full h-18 rounded-[16px] p-3 flex flex-col justify-between mb-3 shadow-xs transition-colors relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between text-[10px] font-bold tracking-[0.25em] opacity-90">
                        <span style={{ color: theme.headerTrackedText }}>H A I N</span>
                        <div 
                          style={{ borderColor: theme.headerIconBorder }}
                          className="w-5 h-5 rounded-full border flex items-center justify-center opacity-80"
                        >
                          <span className="text-[9px]">📅</span>
                        </div>
                      </div>
                      <div className="font-serif font-bold text-xs tracking-tight leading-none truncate pr-8">
                        What are you craving for today?
                      </div>

                      {/* Mini Metric Badges Preview */}
                      <div className="absolute right-3 bottom-2 flex items-center gap-1.5">
                        <div 
                          style={{ backgroundColor: theme.badgeBg }}
                          className="w-5 h-5 rounded-md flex items-center justify-center shadow-xs"
                        >
                          <span className="text-[9px] text-white font-bold">₱</span>
                        </div>
                        <div 
                          style={{ backgroundColor: theme.badgeBg }}
                          className="w-5 h-5 rounded-full flex items-center justify-center shadow-xs"
                        >
                          <span className="text-[8px] text-white font-bold">👥</span>
                        </div>
                      </div>
                    </div>

                    {/* Theme Info & Selection Check */}
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-quicksand font-bold text-sm sm:text-base text-stone-900">
                            {theme.name}
                          </h4>
                          {isSelected && (
                            <span 
                              style={{ backgroundColor: theme.accentSubtle, color: theme.accentColor }}
                              className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full font-sans"
                            >
                              <Sparkles className="w-2.5 h-2.5" /> Active
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-500 font-sans mt-0.5">
                          {theme.tagline}
                        </p>
                      </div>

                      {/* Radio Selection Indicator */}
                      <div 
                        style={{
                          backgroundColor: isSelected ? theme.accentColor : 'transparent',
                          borderColor: isSelected ? theme.accentColor : '#D6D3D1',
                        }}
                        className="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors"
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                      </div>
                    </div>

                    {/* Color Swatch Chips */}
                    <div className="flex items-center gap-2 mt-2.5 pt-2.5 border-t border-stone-100 text-[11px] font-mono text-stone-500">
                      <div className="flex items-center gap-1.5">
                        <span 
                          style={{ backgroundColor: theme.headerBg }} 
                          className="w-3 h-3 rounded-full border border-black/10 shrink-0" 
                        />
                        <span>Header: {theme.headerBg}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1.5">
                        <span 
                          style={{ backgroundColor: theme.badgeBg }} 
                          className="w-3 h-3 rounded-full border border-black/10 shrink-0" 
                        />
                        <span>Badge: {theme.badgeBg}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer Note */}
            <div className="p-4 bg-stone-50 border-t border-stone-200/80 text-center text-xs text-stone-500 font-sans shrink-0">
              Your selection is applied live and persisted in <code className="font-mono bg-stone-200/60 px-1 py-0.5 rounded text-[11px]">localStorage</code>.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
