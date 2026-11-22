'use client';

import React, { useState } from 'react';
import { useHain } from '../context/HainContext';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Star, 
  Sparkles,
  ChefHat,
  ChevronRight as ChevronRightIcon
} from 'lucide-react';
import { Recipe } from '../types/hain';
import { MOCK_RECIPES } from '../data/mockData';

interface PastMeal {
  id: string;
  timeOfDay: 'morning' | 'lunch' | 'dinner';
  timeLabel: string;
  dotColor: string; // Tailwind bg color class
  recipe: Recipe;
}

export default function CalendarHistoryPage() {
  const { 
    setIsCalendarPageOpen, 
    setActiveRecipe, 
    setIsRecipeDetailOpen,
    language 
  } = useHain();

  // Calendar State: Current viewing month and selected date
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(10); // 10 = November (0-indexed)
  const [selectedDay, setSelectedDay] = useState<number>(20); // Default to today (Nov 20)

  // Mock Meal History database for November 2026
  // Colored dots:
  // - Umagahan (Morning): Amber / Yellow (bg-amber-400)
  // - Tanghalian (Lunch): Orange (bg-orange-500)
  // - Hapunan (Dinner): Deep Terracotta / Red (bg-[#B8381D])
  const mealHistoryByDate: Record<number, PastMeal[]> = {
    20: [ // Today
      {
        id: 'nov20-lunch',
        timeOfDay: 'lunch',
        timeLabel: language === 'en' ? '☀️ Lunch' : '☀️ Tanghalian',
        dotColor: 'bg-orange-500',
        recipe: MOCK_RECIPES[2], // Ginisang Monggo
      },
      {
        id: 'nov20-dinner',
        timeOfDay: 'dinner',
        timeLabel: language === 'en' ? '🌙 Dinner' : '🌙 Hapunan',
        dotColor: 'bg-[#B8381D]',
        recipe: MOCK_RECIPES[0], // Kalderetang Baka
      },
    ],
    19: [ // Yesterday: 3 meals
      {
        id: 'nov19-breakfast',
        timeOfDay: 'morning',
        timeLabel: language === 'en' ? '🌅 Breakfast' : '🌅 Umagahan',
        dotColor: 'bg-amber-400',
        recipe: MOCK_RECIPES[3], // Tortang Talong
      },
      {
        id: 'nov19-lunch',
        timeOfDay: 'lunch',
        timeLabel: language === 'en' ? '☀️ Lunch' : '☀️ Tanghalian',
        dotColor: 'bg-orange-500',
        recipe: MOCK_RECIPES[4], // Chicken Tinola
      },
      {
        id: 'nov19-dinner',
        timeOfDay: 'dinner',
        timeLabel: language === 'en' ? '🌙 Dinner' : '🌙 Hapunan',
        dotColor: 'bg-[#B8381D]',
        recipe: MOCK_RECIPES[1], // Sinigang na Baboy
      },
    ],
    18: [
      {
        id: 'nov18-lunch',
        timeOfDay: 'lunch',
        timeLabel: language === 'en' ? '☀️ Lunch' : '☀️ Tanghalian',
        dotColor: 'bg-orange-500',
        recipe: MOCK_RECIPES[7], // Bistek Tagalog
      },
      {
        id: 'nov18-dinner',
        timeOfDay: 'dinner',
        timeLabel: language === 'en' ? '🌙 Dinner' : '🌙 Hapunan',
        dotColor: 'bg-[#B8381D]',
        recipe: MOCK_RECIPES[5], // Sarciadong Bangus
      },
    ],
    16: [
      {
        id: 'nov16-lunch',
        timeOfDay: 'lunch',
        timeLabel: language === 'en' ? '☀️ Lunch' : '☀️ Tanghalian',
        dotColor: 'bg-orange-500',
        recipe: MOCK_RECIPES[6], // Adobong Sitaw at Tokwa
      },
      {
        id: 'nov16-dinner',
        timeOfDay: 'dinner',
        timeLabel: language === 'en' ? '🌙 Dinner' : '🌙 Hapunan',
        dotColor: 'bg-[#B8381D]',
        recipe: MOCK_RECIPES[5], // Tinolang Manok
      },
    ],
    14: [
      {
        id: 'nov14-lunch',
        timeOfDay: 'lunch',
        timeLabel: language === 'en' ? '☀️ Lunch' : '☀️ Tanghalian',
        dotColor: 'bg-orange-500',
        recipe: MOCK_RECIPES[4], // Sarciadong Bangus
      },
      {
        id: 'nov14-dinner',
        timeOfDay: 'dinner',
        timeLabel: language === 'en' ? '🌙 Dinner' : '🌙 Hapunan',
        dotColor: 'bg-[#B8381D]',
        recipe: MOCK_RECIPES[7], // Sinigang na Hipon
      },
    ],
    12: [
      {
        id: 'nov12-dinner',
        timeOfDay: 'dinner',
        timeLabel: language === 'en' ? '🌙 Dinner' : '🌙 Hapunan',
        dotColor: 'bg-[#B8381D]',
        recipe: MOCK_RECIPES[3], // Tortang Talong with Giniling
      },
    ],
    10: [
      {
        id: 'nov10-lunch',
        timeOfDay: 'lunch',
        timeLabel: language === 'en' ? '☀️ Lunch' : '☀️ Tanghalian',
        dotColor: 'bg-orange-500',
        recipe: MOCK_RECIPES[2], // Ginisang Monggo
      },
    ],
    8: [
      {
        id: 'nov8-breakfast',
        timeOfDay: 'morning',
        timeLabel: language === 'en' ? '🌅 Breakfast' : '🌅 Umagahan',
        dotColor: 'bg-amber-400',
        recipe: MOCK_RECIPES[3], // Tortang Talong
      },
      {
        id: 'nov8-dinner',
        timeOfDay: 'dinner',
        timeLabel: language === 'en' ? '🌙 Dinner' : '🌙 Hapunan',
        dotColor: 'bg-[#B8381D]',
        recipe: MOCK_RECIPES[0], // Kalderetang Baka
      },
    ],
    5: [
      {
        id: 'nov5-lunch',
        timeOfDay: 'lunch',
        timeLabel: language === 'en' ? '☀️ Lunch' : '☀️ Tanghalian',
        dotColor: 'bg-orange-500',
        recipe: MOCK_RECIPES[4], // Chicken Tinola
      },
    ],
    2: [
      {
        id: 'nov2-dinner',
        timeOfDay: 'dinner',
        timeLabel: language === 'en' ? '🌙 Dinner' : '🌙 Hapunan',
        dotColor: 'bg-[#B8381D]',
        recipe: MOCK_RECIPES[1], // Sinigang na Baboy
      },
    ],
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthNamesTagalog = [
    'Enero', 'Pebrero', 'Marso', 'Abril', 'Mayo', 'Hunyo',
    'Hulyo', 'Agosto', 'Setyembre', 'Oktubre', 'Nobyembre', 'Disyembre'
  ];

  const currentMonthLabel = language === 'en' 
    ? `${monthNames[currentMonthIndex]} ${currentYear}`
    : `${monthNamesTagalog[currentMonthIndex]} ${currentYear}`;

  // November 2026 starts on Sunday (day 0), has 30 days
  const daysInMonth = 30;
  const startDayOfWeek = 0; // 0 = Sunday

  const dayHeaders = language === 'en'
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    : ['Lin', 'Lun', 'Mar', 'Miy', 'Huw', 'Biy', 'Sab'];

  const selectedMeals = (mealHistoryByDate[selectedDay] || []).filter((m) => !!m?.recipe);

  const handleOpenRecipe = (recipe?: Recipe) => {
    if (!recipe) return;
    setActiveRecipe(recipe);
    setIsRecipeDetailOpen(true);
  };

  return (
    <div className="flex-1 pb-safe-nav bg-[var(--theme-bg-app)] animate-in slide-in-from-right duration-250 min-h-screen flex flex-col">
      {/* 
        CURVED HEADER BANNER WITH BACK BUTTON
      */}
      <section 
        aria-label="Calendar Header" 
        className="bg-[#B8381D] text-white px-5 sm:px-6 pt-safe pb-6 rounded-b-[36px] shadow-md transition-all duration-300"
      >
        <div className="flex items-center justify-between text-white font-medium mb-3">
          <span className="font-inter font-bold tracking-[0.35em] text-xs sm:text-sm text-white select-none">H A I N</span>
        </div>

        <div className="flex items-center gap-3.5">
          <button
            type="button"
            onClick={() => setIsCalendarPageOpen(false)}
            aria-label="Back to Home"
            title="Back to Home"
            className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 transition-all text-white border border-white/20 backdrop-blur-sm shadow-sm tap-spring flex items-center justify-center shrink-0"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
              {language === 'en' ? 'Meal Calendar' : 'Ulam Calendar'}
            </h1>
            <p className="text-xs text-white/80 font-sans mt-0.5">
              {language === 'en' 
                ? 'Track cooked meals and rediscover family favorites' 
                : 'Subaybayan ang mga niluto at balikan ang mga paborito'}
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CALENDAR CONTAINER */}
      <div className="px-4 pt-4 space-y-4 flex-1">
        
        {/* Calendar Card */}
        <div className="bg-white rounded-[28px] p-5 sm:p-6 border border-[#E5DAC6] shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          
          {/* Month Navigator Bar */}
          <div className="flex items-center justify-between mb-4 pb-3.5 border-b border-stone-100">
            <button
              type="button"
              onClick={() => {
                if (currentMonthIndex > 0) setCurrentMonthIndex(currentMonthIndex - 1);
              }}
              aria-label="Previous Month"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-stone-100 hover:bg-stone-200 active:scale-95 text-stone-700 transition-all tap-spring shrink-0"
            >
              <ChevronLeft className="w-5 h-5 text-stone-700" />
            </button>

            <div className="text-center">
              <h2 className="font-serif font-bold text-lg sm:text-xl text-stone-900 tracking-tight">
                {currentMonthLabel}
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#B8381D]/10 text-[#B8381D] font-inter font-semibold text-[11px] mt-1">
                <Sparkles className="w-3 h-3" />
                {Object.keys(mealHistoryByDate).length * 2 - 3} {language === 'en' ? 'meals logged' : 'putaheng nailuto'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                if (currentMonthIndex < 11) setCurrentMonthIndex(currentMonthIndex + 1);
              }}
              aria-label="Next Month"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-stone-100 hover:bg-stone-200 active:scale-95 text-stone-700 transition-all tap-spring shrink-0"
            >
              <ChevronRight className="w-5 h-5 text-stone-700" />
            </button>
          </div>

          {/* Days of Week Row */}
          <div className="grid grid-cols-7 text-center mb-2.5">
            {dayHeaders.map((dh, i) => (
              <div 
                key={dh} 
                className={`text-[11px] font-inter font-bold uppercase tracking-wider py-1 ${
                  i === 0 || i === 6 ? 'text-[#B8381D]' : 'text-stone-400'
                }`}
              >
                {dh}
              </div>
            ))}
          </div>

          {/* Month Calendar Grid (30 Days of Nov 2026) */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Empty slots for month start offset */}
            {Array.from({ length: startDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="h-11 sm:h-12" />
            ))}

            {/* Days 1 to 30 */}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const dayNum = index + 1;
              const isSelected = selectedDay === dayNum;
              const isToday = dayNum === 20;
              const mealsOnDay = (mealHistoryByDate[dayNum] || []).filter((m) => !!m?.recipe);
              const hasMeals = mealsOnDay.length > 0;

              return (
                <button
                  key={dayNum}
                  onClick={() => setSelectedDay(dayNum)}
                  className={`w-10 h-11 sm:w-11 sm:h-12 mx-auto rounded-2xl flex flex-col items-center justify-center transition-all tap-spring relative ${
                    isSelected
                      ? 'bg-[#B8381D] text-white shadow-md shadow-[#B8381D]/30 font-bold scale-105 z-10'
                      : isToday
                      ? 'bg-[#FBE8DE] text-[#B8381D] font-bold ring-1.5 ring-[#B8381D]/50'
                      : 'hover:bg-stone-100 text-stone-800 font-medium'
                  }`}
                >
                  {/* Date Number */}
                  <span className="text-sm leading-none font-inter">
                    {dayNum}
                  </span>

                  {/* 
                    COLORED DOTS CONTAINER 
                    - Number of dots = number of ulam cooked
                    - Yellow/Amber = Umagahan
                    - Orange = Tanghalian
                    - Terracotta/Red = Hapunan
                  */}
                  <div className="flex items-center justify-center gap-1 mt-1 h-1.5">
                    {hasMeals ? (
                      mealsOnDay.map((m) => (
                        <span
                          key={m.id}
                          className={`w-1.5 h-1.5 rounded-full ${
                            isSelected ? 'bg-white' : m.dotColor
                          }`}
                          title={m.timeLabel}
                        />
                      ))
                    ) : (
                      <span className="w-1.5 h-1.5 opacity-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Color Legend Bar */}
          <div className="flex items-center justify-center gap-2 pt-4 mt-3 border-t border-stone-100 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-900 text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
              <span>{language === 'en' ? 'Breakfast' : 'Umagahan'}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/60 text-orange-900 text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
              <span>{language === 'en' ? 'Lunch' : 'Tanghalian'}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-[#B8381D] text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#B8381D] shrink-0" />
              <span>{language === 'en' ? 'Dinner' : 'Hapunan'}</span>
            </div>
          </div>
        </div>

        {/* 
          POPUP MEAL CARD CONTAINER (Appears exactly below the calendar)
          Shows dishes cooked on the selected date
        */}
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom duration-250 pb-8">
          
          <div className="flex items-center justify-between px-1">
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900">
                {language === 'en'
                  ? `${monthNames[currentMonthIndex]} ${selectedDay}, ${currentYear}`
                  : `${monthNamesTagalog[currentMonthIndex]} ${selectedDay}, ${currentYear}`}
              </h3>
              <p className="text-xs text-stone-500 font-sans">
                {selectedMeals.length > 0 
                  ? (language === 'en' ? 'Meals prepared on this day' : 'Mga inihain noong araw na ito')
                  : (language === 'en' ? 'No meals logged' : 'Walang nailistang ulam')}
              </p>
            </div>
            {selectedMeals.length > 0 && (
              <span className="px-3 py-1 rounded-full bg-[#B8381D]/10 text-[#B8381D] font-inter font-bold text-xs">
                {selectedMeals.length} {language === 'en' ? 'Dishes' : 'Ulam'}
              </span>
            )}
          </div>

          {/* If meals exist on this day: list the cards in a clean Inset Grouped container */}
          {selectedMeals.length > 0 ? (
            <div className="space-y-2.5">
              {selectedMeals.map((meal) => (
                <div
                  key={meal.id}
                  onClick={() => handleOpenRecipe(meal.recipe)}
                  className="bg-white rounded-[22px] p-3.5 sm:p-4 border border-[#E5DAC6] shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-md transition-all tap-spring cursor-pointer flex items-center justify-between gap-3.5 group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Dish Image */}
                    <img
                      src={meal.recipe?.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80'}
                      alt={meal.recipe?.title || 'Ulam'}
                      className="w-16 h-16 rounded-[14px] object-cover shrink-0 shadow-sm group-hover:scale-105 transition-transform"
                    />

                    <div className="min-w-0 flex-1">
                      {/* Time of day pill */}
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-1 ${
                        meal.timeOfDay === 'morning'
                          ? 'bg-amber-100 text-amber-800'
                          : meal.timeOfDay === 'lunch'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-rose-100 text-[#B8381D]'
                      }`}>
                        {meal.timeLabel}
                      </span>

                      {/* Recipe Title */}
                      <h4 className="font-sans font-bold text-sm sm:text-base text-stone-900 truncate group-hover:text-[#B8381D] transition-colors">
                        {meal.recipe?.localName || meal.recipe?.title || 'Lutong Ulam'}
                      </h4>

                      {/* Price and Pax */}
                      <div className="flex items-center gap-2 text-xs text-stone-500 font-inter mt-0.5">
                        <span className="font-bold text-stone-900">
                          ₱{meal.recipe?.estimatedPrice ?? 0}
                        </span>
                        <span>•</span>
                        <span>{meal.recipe?.servings ?? 4} pax</span>
                      </div>
                    </div>
                  </div>

                  {/* Revisit Arrow */}
                  <div className="w-8 h-8 rounded-full bg-stone-50 group-hover:bg-[#B8381D]/10 flex items-center justify-center text-stone-400 group-hover:text-[#B8381D] shrink-0 transition-colors">
                    <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State for selected date */
            <div className="bg-white rounded-[24px] p-8 text-center space-y-2.5 border border-[#E5DAC6] shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#FBE8DE] text-[#B8381D] mx-auto flex items-center justify-center shadow-sm">
                <ChefHat className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-base text-stone-900">
                {language === 'en' 
                  ? 'No meals logged on this date' 
                  : 'Walang nailistang ulam sa petsang ito'}
              </h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto font-sans leading-relaxed">
                {language === 'en'
                  ? 'Tap any day with colored dots to see past recipes prepared for your household.'
                  : 'Pindutin ang mga petsang may tuldok upang makita ang mga nakaraang ulam.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
