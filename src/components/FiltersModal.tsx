'use client';

import React from 'react';
import { useHain } from '../context/HainContext';
import { Button } from 'glisse';
import { X, RotateCcw } from 'lucide-react';
import { DietaryIcon, AllergenIcon } from './FilterIcons';

export default function FiltersModal() {
  const {
    isFiltersModalOpen,
    setIsFiltersModalOpen,
    selectedDietaryPreferences,
    toggleDietaryPreference,
    selectedAllergenExclusions,
    toggleAllergenExclusion,
    resetFilters,
    activeFilterCount,
    language,
  } = useHain();

  if (!isFiltersModalOpen) return null;

  const dietaryPreferences = [
    { id: 'pescatarian', label: 'Pescatarian' },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'halal', label: 'Halal' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'low-calorie', label: 'Low Calorie' },
    { id: 'high-protein', label: 'High Protein' },
  ];

  const allergenExclusions = [
    { id: 'shellfish', label: 'Shellfish Free' },
    { id: 'dairy', label: 'Dairy Free' },
    { id: 'gluten', label: 'Gluten Free' },
    { id: 'nut', label: 'Nut Free' },
    { id: 'egg', label: 'Egg Free' },
    { id: 'fish', label: 'Fish Free' },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsFiltersModalOpen(false);
      }}
    >
      {/* Bottom Sheet Modal (Always slides up smoothly from the bottom on all screen sizes) */}
      <div className="w-full sm:max-w-md bg-[#FFFBF2] rounded-t-[36px] shadow-2xl flex flex-col max-h-[88vh] overflow-hidden border-t border-x border-[#F2ECE1] animate-in slide-in-from-bottom duration-300 ease-out">
        
        {/* Top Drag Handle Bar */}
        <div className="w-12 h-1.5 rounded-full bg-stone-300/80 mx-auto mt-3 mb-1" />

        {/* Modal Header */}
        <div className="px-6 pt-2 pb-3 border-b border-stone-100 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="font-sans font-bold text-xl text-stone-900 tracking-tight">
                {language === 'tl' ? 'Mga Filter sa Ulam' : 'Filters & Dietary Rules'}
              </h2>
              {/* Reset All link in header */}
              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-stone-400 hover:text-stone-700 tap-spring transition-colors"
              >
                {language === 'tl' ? 'I-reset Lahat' : 'Reset All'}
              </button>
            </div>
            
            <p className="text-xs text-stone-500 font-medium mt-1">
              {language === 'tl' ? 'I-customize ang iyong pang-araw-araw na ulam at grocery.' : 'Customize your daily ulam & grocery search.'}
            </p>

            {/* Noticeable Filter Status Badge under the title */}
            <div className="mt-2">
              <span className={`inline-flex items-center text-[11px] font-bold px-3 py-1 rounded-full border ${
                activeFilterCount > 0
                  ? 'bg-[#FBE8DE] text-[#B8381D] border-[#E89D7A]'
                  : 'bg-stone-100 text-stone-600 border-stone-200'
              }`}>
                {activeFilterCount === 0 
                  ? (language === 'tl' ? 'Walang filter na naka-apply' : 'No Filters applied')
                  : `${activeFilterCount} ${language === 'tl' ? 'Filter na naka-apply' : `Filter${activeFilterCount > 1 ? 's' : ''} applied`}`
                }
              </span>
            </div>
          </div>

          {/* Circular Close Button with Glisse Glass */}
          <Button
            variant="glass"
            icon={<X className="w-4 h-4 stroke-[2.5]" />}
            onClick={() => setIsFiltersModalOpen(false)}
            aria-label="Close"
            className="shrink-0"
          />
        </div>

        {/* Scrollable Filter Categories with Fixed Space (Constant 2px border, no line jumps on toggle) */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 no-scrollbar">
          
          {/* Section 1: Dietary Preferences */}
          <div className="space-y-3">
            <div>
              <h3 className="font-sans font-bold text-base text-stone-900">
                {language === 'tl' ? 'Dietary Preferences' : 'Dietary Preferences'}
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                {language === 'tl' ? 'Pumili ng isa o higit pa' : 'Choose one or more'}
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {dietaryPreferences.map((pref) => {
                const isActive = selectedDietaryPreferences.includes(pref.id);
                return (
                  <button
                    key={pref.id}
                    onClick={() => toggleDietaryPreference(pref.id)}
                    className={`h-[46px] px-4 rounded-full text-xs sm:text-sm font-bold transition-all tap-spring shadow-xs shrink-0 whitespace-nowrap border-2 flex items-center gap-2.5 ${
                      isActive
                        ? 'bg-[#FBE8DE] border-[#E89D7A] text-stone-900 shadow-sm'
                        : 'bg-white border-[#EBE3D5] text-stone-800 hover:border-stone-400'
                    }`}
                  >
                    <DietaryIcon type={pref.id} className="w-6 h-6 shrink-0" />
                    <span>{pref.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Allergen Exclusions */}
          <div className="space-y-3">
            <div>
              <h3 className="font-sans font-bold text-base text-stone-900">
                {language === 'tl' ? 'Mga Bawal / Allergen Exclusions' : 'Allergen Exclusions'}
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                {language === 'tl' ? 'I-filter out ang mga sangkap na hindi maaaring kainin' : 'Filter out ingredients you cannot eat'}
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {allergenExclusions.map((allergen) => {
                const isActive = selectedAllergenExclusions.includes(allergen.id);
                return (
                  <button
                    key={allergen.id}
                    onClick={() => toggleAllergenExclusion(allergen.id)}
                    className={`h-[46px] px-4 rounded-full text-xs sm:text-sm font-bold transition-all tap-spring shadow-xs shrink-0 whitespace-nowrap border-2 flex items-center gap-2.5 ${
                      isActive
                        ? 'bg-[#FBE8DE] border-[#E89D7A] text-stone-900 shadow-sm'
                        : 'bg-white border-[#EBE3D5] text-stone-800 hover:border-stone-400'
                    }`}
                  >
                    <AllergenIcon type={allergen.id} className="w-6 h-6 shrink-0" />
                    <span>{allergen.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Sticky Action Footer (Reset button beside Apply Filters) */}
        <div className="p-4 px-6 border-t border-stone-100 bg-[#FFFBF2] flex items-center justify-between gap-3 shadow-lg safe-bottom">
          {/* Reset Button beside Apply Filters */}
          <Button
            variant="glass"
            icon={<RotateCcw className="w-3.5 h-3.5 text-stone-600" />}
            onClick={resetFilters}
            aria-label="Reset Filters"
            className="shrink-0 font-bold"
          >
            <span>{language === 'tl' ? 'I-reset' : 'Reset'}</span>
          </Button>

          {/* Big Terracotta Button: "Apply Filters" */}
          <Button
            variant="filled"
            tint="#B8381D"
            onClick={() => setIsFiltersModalOpen(false)}
            aria-label="Apply Filters"
            className="flex-1 font-bold shadow-md !text-white text-sm"
          >
            {language === 'tl' ? 'Ilapat ang Filters' : 'Apply Filters'} {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}
          </Button>
        </div>
      </div>
    </div>
  );
}
