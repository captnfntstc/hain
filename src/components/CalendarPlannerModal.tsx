'use client';

import React from 'react';
import { useHain } from '../context/HainContext';
import { X, Calendar as CalendarIcon, ChevronRight, Plus, Sparkles, CheckCircle2 } from 'lucide-react';
import { MOCK_RECIPES } from '../data/mockData';
import { Button } from 'glisse';

export default function CalendarPlannerModal() {
  const {
    isCalendarModalOpen,
    setIsCalendarModalOpen,
    selectedPlanDay,
    setSelectedPlanDay,
    mealPlanSchedule,
    assignRecipeToPlan,
    setActiveRecipe,
    setIsRecipeDetailOpen,
    t,
    language,
  } = useHain();

  if (!isCalendarModalOpen) return null;

  const days = [
    { id: 'today', label: language === 'en' ? 'Friday' : 'Biyernes', sub: language === 'en' ? 'Today' : 'Ngayon', date: 'Nov 20' },
    { id: 'tomorrow', label: language === 'en' ? 'Saturday' : 'Sabado', sub: language === 'en' ? 'Tomorrow' : 'Bukas', date: 'Nov 21' },
    { id: 'sunday', label: language === 'en' ? 'Sunday' : 'Linggo', sub: language === 'en' ? 'Feast' : 'Salo-salo', date: 'Nov 22' },
    { id: 'monday', label: language === 'en' ? 'Monday' : 'Lunes', sub: language === 'en' ? 'Monggo Day' : 'Monggo Day', date: 'Nov 23' },
    { id: 'tuesday', label: language === 'en' ? 'Tuesday' : 'Martes', sub: language === 'en' ? 'Budget Day' : 'Tipid Day', date: 'Nov 24' },
    { id: 'wednesday', label: language === 'en' ? 'Wednesday' : 'Miyerkules', sub: language === 'en' ? 'Soup Day' : 'Sabaw Day', date: 'Nov 25' },
    { id: 'thursday', label: language === 'en' ? 'Thursday' : 'Huwebes', sub: language === 'en' ? 'Veggie Day' : 'Gulay Day', date: 'Nov 26' },
  ];

  const currentDayPlan = mealPlanSchedule[selectedPlanDay] || {
    lunch: MOCK_RECIPES[2],
    dinner: MOCK_RECIPES[0],
  };

  const handleOpenRecipe = (recipe: typeof MOCK_RECIPES[0]) => {
    setActiveRecipe(recipe);
    setIsRecipeDetailOpen(true);
  };

  const selectedDayLabel = days.find((d) => d.id === selectedPlanDay)?.label || '';

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsCalendarModalOpen(false);
      }}
    >
      <div className="w-full sm:max-w-md bg-[#FFFBF2] rounded-t-[36px] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border-t border-x border-[#F2ECE1] animate-in slide-in-from-bottom duration-300 ease-out">
        
        {/* Drag handle */}
        <div className="w-12 h-1.5 rounded-full bg-stone-300/80 mx-auto mt-3 mb-1" />

        {/* Modal Header */}
        <div className="px-6 pt-2 pb-4 border-b border-stone-100 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#B8381D]/10 text-[#B8381D] flex items-center justify-center">
                <CalendarIcon className="w-4 h-4" />
              </div>
              <h2 className="font-sans font-bold text-xl text-stone-900 tracking-tight">
                {t.cal_title}
              </h2>
            </div>
            <p className="text-xs text-stone-500 font-medium mt-1">
              {t.cal_sub}
            </p>
          </div>

          <Button
            variant="glass"
            icon={<X className="w-4 h-4 stroke-[2.5] text-stone-800" />}
            onClick={() => setIsCalendarModalOpen(false)}
            className="!w-9 !h-9 !rounded-full shadow-md"
          />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5 no-scrollbar">
          
          {/* Day Selector Carousel */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">
              {t.cal_pick_day}
            </div>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {days.map((day) => {
                const isSelected = selectedPlanDay === day.id;
                return (
                  <button
                    key={day.id}
                    onClick={() => setSelectedPlanDay(day.id)}
                    className={`flex-shrink-0 px-3.5 py-2.5 rounded-2xl flex flex-col items-center min-w-[70px] transition-all tap-spring border ${
                      isSelected
                        ? 'bg-[#B8381D] text-white border-[#B8381D] shadow-md scale-105'
                        : 'bg-white text-stone-700 border-stone-200/70 hover:border-stone-400'
                    }`}
                  >
                    <span className="text-[10px] font-medium opacity-85 uppercase">
                      {day.sub}
                    </span>
                    <span className="text-sm font-bold tracking-tight">
                      {day.label}
                    </span>
                    <span className="text-[10px] opacity-75 mt-0.5">
                      {day.date}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Meals for Selected Day */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-sans font-bold text-base text-stone-900">
                {t.cal_scheduled_meals.replace('{day}', selectedDayLabel)}
              </h3>
              <span className="text-xs text-[#B8381D] font-bold">
                Est. ₱{((currentDayPlan.lunch?.estimatedPrice || 0) + (currentDayPlan.dinner?.estimatedPrice || 0)).toLocaleString()}
              </span>
            </div>

            {/* Tanghali (Lunch) Card */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                  {t.cal_lunch}
                </span>
                <span className="text-xs font-bold text-stone-900">
                  {currentDayPlan.lunch ? `₱${currentDayPlan.lunch.estimatedPrice}` : t.cal_no_meal}
                </span>
              </div>

              {currentDayPlan.lunch ? (
                <div 
                  onClick={() => handleOpenRecipe(currentDayPlan.lunch!)}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <img 
                    src={currentDayPlan.lunch.image} 
                    alt={currentDayPlan.lunch.title}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 shadow-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-sans font-bold text-sm text-stone-900 truncate group-hover:text-[#B8381D] transition-colors">
                      {currentDayPlan.lunch.title}
                    </h4>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {currentDayPlan.lunch.prepTimeMinutes + currentDayPlan.lunch.cookTimeMinutes} mins • {currentDayPlan.lunch.servings} pax
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-700" />
                </div>
              ) : (
                <button 
                  onClick={() => assignRecipeToPlan(selectedPlanDay, 'lunch', MOCK_RECIPES[2])}
                  className="w-full py-3 rounded-xl border border-dashed border-stone-300 text-stone-600 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-stone-50 tap-spring"
                >
                  <Plus className="w-4 h-4 text-[#B8381D]" />
                  <span>{t.cal_pick_lunch}</span>
                </button>
              )}
            </div>

            {/* Hapunan (Dinner) Card */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                  {t.cal_dinner}
                </span>
                <span className="text-xs font-bold text-stone-900">
                  {currentDayPlan.dinner ? `₱${currentDayPlan.dinner.estimatedPrice}` : t.cal_no_meal}
                </span>
              </div>

              {currentDayPlan.dinner ? (
                <div 
                  onClick={() => handleOpenRecipe(currentDayPlan.dinner!)}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <img 
                    src={currentDayPlan.dinner.image} 
                    alt={currentDayPlan.dinner.title}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 shadow-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-sans font-bold text-sm text-stone-900 truncate group-hover:text-[#B8381D] transition-colors">
                      {currentDayPlan.dinner.title}
                    </h4>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {currentDayPlan.dinner.prepTimeMinutes + currentDayPlan.dinner.cookTimeMinutes} mins • {currentDayPlan.dinner.servings} pax
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-700" />
                </div>
              ) : (
                <button 
                  onClick={() => assignRecipeToPlan(selectedPlanDay, 'dinner', MOCK_RECIPES[0])}
                  className="w-full py-3 rounded-xl border border-dashed border-stone-300 text-stone-600 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-stone-50 tap-spring"
                >
                  <Plus className="w-4 h-4 text-[#B8381D]" />
                  <span>{t.cal_pick_dinner}</span>
                </button>
              )}
            </div>
          </div>

          {/* Tipid Chaining Advice */}
          <div className="bg-[#FAF4EB] rounded-2xl p-4 border border-[#EBE3D5] flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-stone-700 leading-relaxed">
              <strong className="text-stone-900 block font-bold mb-0.5">{t.cal_tipid_title}</strong>
              {t.cal_tipid_desc}
            </div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="p-4 px-6 border-t border-stone-100 bg-[#FFFBF2] flex items-center justify-between safe-bottom">
          <div className="text-xs text-stone-600">
            <span className="block font-medium">{t.cal_weekly_est}</span>
            <span className="font-bold text-stone-900 text-base">₱3,450 / 7 {language === 'en' ? 'days' : 'araw'}</span>
          </div>
          <Button
            variant="filled"
            tint="#B8381D"
            onClick={() => setIsCalendarModalOpen(false)}
            className="!h-11 !px-6 !rounded-2xl !text-white text-xs font-bold shadow-md transition-all"
          >
            <span>{t.cal_save_plan}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
