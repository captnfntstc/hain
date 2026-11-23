'use client';

import React, { useState, useEffect } from 'react';
import { useHain } from '../context/HainContext';
import { Button } from 'glisse';
import { 
  Users, 
  Search as SearchIcon, 
  Mic, 
  Calendar as CalendarIcon, 
  X as XIcon, 
  SlidersHorizontal,
  ShieldCheck,
  Star,
  Sparkles,
  ChevronRight,
  ChevronDown,
  MapPin,
  RotateCcw,
  Ham,
  Drumstick,
  Beef,
  Fish,
  Carrot,
  Soup,
  Coins,
  Flame
} from 'lucide-react';

export default function HomeTab() {
  const {
    timeOfDay,
    budgetCap,
    servingsPax,
    costPerPerson,
    currencySymbol,
    setIsBudgetModalOpen,
    setBudgetModalStep,
    filteredRecipes,
    setActiveRecipe,
    setIsRecipeDetailOpen,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    activeCategoryPage,
    setActiveCategoryPage,
    householdMembers,
    isFamilyShieldEnabled,
    setIsFamilyShieldEnabled,
    isCalendarPageOpen,
    setIsCalendarPageOpen,
    currentRegion,
    setIsRegionModalOpen,
    isSearchOpen,
    setIsSearchOpen,
    setIsFiltersModalOpen,
    activeFilterCount,
    resetFilters,
    t,
    language,
    colorTheme,
  } = useHain();

  const [isScrolled, setIsScrolled] = useState(false);

  // Dynamic search placeholders (defaulting to Kaldereta matching Figma mockup)
  const searchPlaceholders = language === 'tl' ? [
    'Kaldereta',
    'Sinigang na Baboy',
    'Anong craving mo ngayong araw?',
    'Nais mo ba ng Tinola ngayon?',
    'Maghanap ng tipid na ulam (e.g. Tortang Talong)...',
    'Maghanap ng ulam na pasok sa budget...',
  ] : [
    'Kaldereta',
    'Sinigang na Baboy',
    'What are you craving for today?',
    'Craving Sinigang or Kaldereta today?',
    'Search dishes matching your budget...',
    'Search budget meals (e.g. Tortang Talong)...',
  ];

  const [activePlaceholder, setActivePlaceholder] = useState('Kaldereta');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * searchPlaceholders.length);
    setActivePlaceholder(searchPlaceholders[randomIndex]);
  }, [language]);

  // Ensure search query is cleared on Home so search never carries over
  useEffect(() => {
    if (searchQuery) {
      setSearchQuery('');
    }
  }, [searchQuery, setSearchQuery]);

  // ALWAYS KEEP SALUTATIONS IN TAGALOG (As requested by the user)
  const tagalogSalutation = {
    morning: 'Magandang Umaga, Graciepherlyn! ☀️',
    lunch: 'Magandang Tanghali, Graciepherlyn! ☀️',
    dinner: 'Magandang Gabi, Graciepherlyn! 🌙',
    midnight: 'Gabi na, Graciepherlyn! Baon prep? 🍱',
  }[timeOfDay];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 8 Grab-Style Circular Categories using Official Icon Library (Lucide-react)
  // Clean single label without subtitle/translation below
  const grabCategories = [
    {
      id: 'baboy',
      label: t.cat_pork,
      bg: 'bg-[#FDECE8]',
      textColor: 'text-[#C2410C]',
      icon: <Ham className="w-6 h-6" />,
    },
    {
      id: 'manok',
      label: t.cat_chicken,
      bg: 'bg-[#FEF3C7]',
      textColor: 'text-[#D97706]',
      icon: <Drumstick className="w-6 h-6" />,
    },
    {
      id: 'baka',
      label: t.cat_beef,
      bg: 'bg-[#FEE2E2]',
      textColor: 'text-[#B91C1C]',
      icon: <Beef className="w-6 h-6" />,
    },
    {
      id: 'isda',
      label: t.cat_seafood,
      bg: 'bg-[#E0F2FE]',
      textColor: 'text-[#0284C7]',
      icon: <Fish className="w-6 h-6" />,
    },
    {
      id: 'gulay',
      label: t.cat_veggies,
      bg: 'bg-[#DCFCE7]',
      textColor: 'text-[#15803D]',
      icon: <Carrot className="w-6 h-6" />,
    },
    {
      id: 'sabaw',
      label: t.cat_soups,
      bg: 'bg-[#FFEDD5]',
      textColor: 'text-[#EA580C]',
      icon: <Soup className="w-6 h-6" />,
    },
    {
      id: 'tipid',
      label: t.cat_budget,
      bg: 'bg-[#FEF9C3]',
      textColor: 'text-[#A16207]',
      icon: <Coins className="w-6 h-6" />,
    },
    {
      id: 'inihaw',
      label: t.cat_grilled,
      bg: 'bg-[#FFF1EB]',
      textColor: 'text-[#EA580C]',
      icon: <Flame className="w-6 h-6" />,
    },
  ];

  const handleCategoryClick = (id: string) => {
    setActiveCategoryPage(id);
  };

  return (
    <div className="flex-1 pb-safe-nav">
      {/* 
        CURVED MAGNETIZED RED HEADER (Sticky to top even when scrolled)
        Collapses into a sleek, compact search bar when scrolled down
        Matches Figma mockup: H A I N top-left, Philippine flag badge top-right,
        Large editorial serif title "What are you / craving for today?",
        and full-width search bar with Kaldereta placeholder.
      */}
      <section 
        aria-label="Home Header" 
        style={{ 
          backgroundColor: colorTheme.headerBg,
          color: colorTheme.headerText 
        }}
        className={`sticky top-0 z-30 px-5 sm:px-6 pt-safe shadow-md transition-all duration-300 ease-out ${
          isScrolled 
            ? 'pb-2.5 rounded-b-[24px] shadow-lg' 
            : 'pb-6 rounded-b-[36px] sm:rounded-b-[40px]'
        }`}
      >
        {/* Brand bar with calendar button - smoothly collapses on scroll to minimize magnetized height */}
        <div className={`flex items-center justify-between font-medium transition-all duration-200 ease-out overflow-hidden ${
          isScrolled ? 'max-h-0 opacity-0 mb-0' : 'max-h-12 opacity-100 mb-3.5'
        }`}>
          <span 
            style={{ color: colorTheme.headerTrackedText }}
            className="font-inter font-bold tracking-[0.35em] text-xs sm:text-sm select-none transition-colors duration-300"
          >
            H A I N
          </span>
          
          {/* Region Picker Button on top right (Replacing the previous calendar position) */}
          <button
            type="button"
            onClick={() => setIsRegionModalOpen(true)}
            aria-label={language === 'tl' ? 'Pumili ng Rehiyon at Palengke' : 'Select Region & Market'}
            title={currentRegion.name}
            style={{ 
              borderColor: colorTheme.headerIconBorder,
              color: colorTheme.headerText,
              backgroundColor: colorTheme.headerText === '#FFFFFF' ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.08)'
            }}
            className="h-9 px-3 rounded-full flex items-center gap-1.5 hover:opacity-85 active:scale-95 transition-all border backdrop-blur-md shadow-xs tap-spring shrink-0"
          >
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[11px] font-bold font-sans tracking-tight">
              {currentRegion.shortName}
            </span>
            <ChevronDown className="w-3 h-3 opacity-70 shrink-0" />
          </button>
        </div>

        {/* HERO TITLE - Large Editorial Serif Title from Figma Mockup */}
        <div className={`overflow-hidden transition-all duration-200 ease-out ${
          isScrolled ? 'max-h-0 opacity-0 mb-0' : 'max-h-32 opacity-100 mb-4'
        }`}>
          <h1 
            style={{ color: colorTheme.headerText }}
            className="font-serif font-bold text-[32px] xs:text-[36px] sm:text-[40px] tracking-tight leading-[1.12] transition-colors duration-300"
          >
            {language === 'tl' ? (
              <>
                Anong craving mo
                <br />
                ngayong araw?
              </>
            ) : (
              <>
                What are you
                <br />
                craving for today?
              </>
            )}
          </h1>
        </div>

        {/* Search Bar Row with Dedicated Calendar Button Beside It */}
        <div className="flex items-center gap-2.5 w-full">
          {/* Magnetized Full-Width Search Bar */}
          <div 
            onClick={() => setIsSearchOpen(true)}
            className={`relative flex-1 cursor-pointer tap-spring bg-white rounded-full flex items-center shadow-md transition-all duration-200 ${
              isScrolled ? 'h-10 px-3.5 shadow-lg' : 'h-12 sm:h-13 px-4'
            }`}
          >
            <SearchIcon className={`${isScrolled ? 'w-4 h-4' : 'w-5 h-5'} text-stone-400 shrink-0 pointer-events-none`} />
            <input
              type="text"
              readOnly
              onClick={() => setIsSearchOpen(true)}
              onFocus={() => setIsSearchOpen(true)}
              value=""
              placeholder={activePlaceholder}
              className="w-full bg-transparent pl-3 pr-8 text-stone-900 text-sm sm:text-base font-sans font-medium focus:outline-none placeholder:text-stone-400 cursor-pointer"
            />
            <button 
              type="button" 
              onClick={(e) => {
                e.stopPropagation();
                setIsSearchOpen(true);
              }}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 tap-spring p-1"
              title="Voice Search"
              aria-label="Voice Search"
            >
              <Mic className={`${isScrolled ? 'w-4 h-4' : 'w-5 h-5'}`} />
            </button>
          </div>

          {/* Calendar Button Moved Beside Search Bar */}
          <button
            type="button"
            onClick={() => setIsCalendarPageOpen(true)}
            aria-label={language === 'tl' ? 'Buksan ang Meal Calendar' : 'Open Meal Calendar'}
            title={language === 'tl' ? 'Meal Planner Calendar' : 'Meal Planner Calendar'}
            className={`${
              isScrolled ? 'w-10 h-10' : 'w-12 h-12 sm:w-13 sm:h-13'
            } rounded-full bg-white text-stone-800 shadow-md flex items-center justify-center tap-spring hover:bg-stone-50 transition-all shrink-0 active:scale-95 border border-stone-100 group`}
          >
            <CalendarIcon className={`${isScrolled ? 'w-4 h-4' : 'w-5 h-5'} text-[#B8381D] group-hover:scale-110 transition-transform`} />
          </button>
        </div>
      </section>

      {/* Main Container in Warm Cream */}
      <div className="px-4 pt-4 space-y-4">
        
        {/* 
          TODAY'S BUDGET & SERVES CARD 
          Quicksand font requested by user, bold metrics, clean text Edit action
        */}
        <div className="bg-white rounded-[28px] p-5 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-[#E5DAC6]">
          <div className="grid grid-cols-[1.15fr_0.85fr] divide-x divide-[#E5DAC6] pb-3.5">
            {/* Left Column: Today's Budget */}
            <div className="pr-3 xs:pr-4">
              <div className="font-quicksand text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-stone-900 mb-2.5">
                {language === 'en' ? "TODAY'S BUDGET" : "BADYET NGAYON"}
              </div>
              <div className="flex items-center gap-3">
                <div 
                  style={{ backgroundColor: colorTheme.badgeBg }}
                  className="w-12 h-12 rounded-[16px] text-white flex items-center justify-center shadow-sm shrink-0 transition-colors duration-300"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="13" x="2" y="5.5" rx="2" />
                    <circle cx="12" cy="12" r="2.2" />
                    <path d="M6 12h.01M18 12h.01" />
                  </svg>
                </div>
                <div className="font-quicksand font-[700] text-[26px] xs:text-[30px] sm:text-[34px] text-stone-900 tracking-tight leading-none whitespace-nowrap">
                  P {budgetCap.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Right Column: Serves */}
            <div className="pl-3.5 xs:pl-4">
              <div className="font-quicksand text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-stone-900 mb-2.5">
                {language === 'en' ? "SERVES" : "KASALO"}
              </div>
              <div className="flex items-center gap-3">
                <div 
                  style={{ backgroundColor: colorTheme.badgeBg }}
                  className="w-12 h-12 rounded-full text-white flex items-center justify-center shadow-sm shrink-0 transition-colors duration-300"
                >
                  <Users className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div className="font-quicksand font-[700] text-[26px] xs:text-[30px] sm:text-[34px] text-stone-900 tracking-tight leading-none whitespace-nowrap">
                  {servingsPax}pax.
                </div>
              </div>
            </div>
          </div>

          {/* Subtext and Clean Text Edit Action */}
          <div className="flex items-center justify-between pt-3.5 border-t border-[#E5DAC6]">
            <div className="font-quicksand text-xs sm:text-[13px] font-bold text-stone-900">
              {language === 'en' ? 'About' : 'Tinatayang'}{' '}
              <span 
                style={{ color: colorTheme.accentColor }} 
                className="font-bold transition-colors duration-300"
              >
                P{Math.round(costPerPerson)}
              </span>{' '}
              {language === 'en' ? 'per person' : 'bawat tao'}
            </div>
            <button
              onClick={() => {
                setBudgetModalStep(1);
                setIsBudgetModalOpen(true);
              }}
              style={{ color: colorTheme.accentColor }}
              className="font-quicksand font-bold text-xs sm:text-[13px] tap-spring transition-colors duration-300 cursor-pointer hover:opacity-80"
            >
              {language === 'en' ? 'Edit' : 'Baguhin'}
            </button>
          </div>
        </div>

        {/* 
          QUICK DISH CATEGORIES (2 Rows x 4 Columns)
          Using Lucide Icon Library, clean single label without subtitle/translation below
        */}
        <div className="bg-white rounded-[26px] p-4 shadow-sm border border-[#F2ECE1]">
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-3 px-1">
            {t.home_categories_title}
          </div>
          
          <div className="grid grid-cols-4 gap-y-3.5 gap-x-2">
            {grabCategories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className="flex flex-col items-center justify-center tap-spring group text-center"
                >
                  {/* Circular pastel icon badge with fixed stable dimensions (no layout shift) */}
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${cat.bg} ${cat.textColor} ${
                      isActive
                        ? 'shadow-sm ring-1.5 ring-stone-900/15'
                        : 'shadow-xs hover:shadow-sm'
                    }`}
                  >
                    {cat.icon}
                  </div>
                  {/* Clean single label with active indicator dot */}
                  <div className="flex flex-col items-center">
                    <span
                      className={`text-xs mt-1.5 leading-tight font-sans tracking-tight transition-colors ${
                        isActive ? 'font-bold text-[#B8381D]' : 'font-semibold text-stone-800'
                      }`}
                    >
                      {cat.label}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B8381D] mt-0.5" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 
          HOUSEHOLD SAFETY SHIELD & DIETARY FILTERS ROW
          Connects the Family Profile directly to the Home screen
        */}
        <div className="flex items-center justify-between gap-2">
          {/* Family Safety Shield Chip */}
          <button
            onClick={() => setIsFamilyShieldEnabled(!isFamilyShieldEnabled)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all tap-spring shadow-sm border ${
              isFamilyShieldEnabled
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-stone-100 text-stone-500 border-stone-200'
            }`}
            title="Toggle Household Safety Shield"
          >
            <ShieldCheck className={`w-3.5 h-3.5 ${isFamilyShieldEnabled ? 'text-emerald-600' : 'text-stone-400'}`} />
            <span>
              {isFamilyShieldEnabled
                ? t.home_shield_active.replace('{count}', String(householdMembers.filter(m => m.isEatingToday).length))
                : t.home_shield_off}
            </span>
          </button>

          {/* Filters & Dietary Rules Modal Trigger Button */}
          <div className="flex items-center gap-1.5">
            <Button
              variant={activeFilterCount > 0 ? 'filled' : 'glass'}
              tint={activeFilterCount > 0 ? '#B8381D' : undefined}
              icon={<SlidersHorizontal className="w-3.5 h-3.5" />}
              onClick={() => setIsFiltersModalOpen(true)}
              aria-label="Filters"
              className="text-xs font-bold shrink-0 !h-8 !px-3"
            >
              <span>{t.home_filters} {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
            </Button>

            {/* Clear Filters Button if any active */}
            {(activeFilterCount > 0 || !!selectedCategory) && (
              <Button
                variant="glass"
                icon={<RotateCcw className="w-3.5 h-3.5 text-stone-600" />}
                onClick={() => {
                  resetFilters();
                  setSelectedCategory('');
                  setSearchQuery('');
                }}
                aria-label={t.home_reset_all}
                className="shrink-0 drop-shadow-xs"
              />
            )}
          </div>
        </div>

        {/* Section Header: Ulam Recommendations */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <h2 className="font-serif-title font-bold text-lg text-stone-900 tracking-tight">
              {t.home_recommended_title}
            </h2>
            <p className="text-[11px] text-stone-500 font-medium">
              {t.home_budget_subtext
                .replace('₱', currencySymbol)
                .replace('{budget}', budgetCap.toLocaleString())
                .replace('{pax}', String(servingsPax))}
            </p>
          </div>
          <span 
            style={{ color: colorTheme.accentColor }} 
            className="text-xs font-bold transition-colors duration-300"
          >
            {t.home_dishes_count.replace('{count}', String(filteredRecipes.length))}
          </span>
        </div>

        {/* 
          2-COLUMN RECIPE GRID (Exact match with Figma / User Mockup)
          Each card shows photo, 4-star rating, recipe title, price, and pax
        */}
        <div className="grid grid-cols-2 gap-3 pb-6">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => {
                setActiveRecipe(recipe);
                setIsRecipeDetailOpen(true);
              }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200/80 hover:shadow-md transition-all tap-spring cursor-pointer flex flex-col"
            >
              {/* Recipe Image with Tagline Badge */}
              <div className="relative aspect-square w-full bg-stone-100 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
                {recipe.allergens.length > 0 && (
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                    {recipe.allergens[0]}
                  </div>
                )}
              </div>

              {/* Recipe Details */}
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-amber-500 mb-1">
                    {[1, 2, 3, 4].map((s) => (
                      <Star key={s} className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                    ))}
                    <Star className="w-3 h-3 text-stone-300 stroke-stone-300" />
                  </div>

                  {/* Title */}
                  <h3 className="font-sans font-bold text-sm text-stone-900 line-clamp-1 leading-snug">
                    {recipe.title}
                  </h3>
                </div>

                {/* Price and Pax */}
                <div className="flex items-center justify-between text-xs text-stone-500 font-medium mt-2 pt-2 border-t border-stone-100">
                  <span className="font-bold text-stone-800">
                    {currencySymbol}{recipe.estimatedPrice}
                  </span>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{recipe.servings}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRecipes.length === 0 && (
          <div className="bg-white rounded-3xl p-8 text-center space-y-3 border border-stone-200 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 mx-auto flex items-center justify-center text-xl">
              🍲
            </div>
            <h3 className="font-sans font-bold text-base text-stone-900">
              {t.home_no_results}
            </h3>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              {t.home_no_results_sub}
            </p>
            <Button
              variant="filled"
              tint="#B8381D"
              onClick={() => {
                resetFilters();
                setSelectedCategory('');
                setSearchQuery('');
              }}
              className="!px-4 !py-2 !rounded-xl !text-white text-xs font-bold shadow-sm"
            >
              <span>{t.home_reset_all}</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
