'use client';

import React, { useMemo, useRef, useEffect } from 'react';
import { useHain } from '../context/HainContext';
import { Button } from 'glisse';
import { 
  Search as SearchIcon, 
  ArrowLeft,
  Mic, 
  Users, 
  X as XIcon,
  Clock,
  TrendingUp,
  ChefHat,
  RotateCcw,
  Star
} from 'lucide-react';
import { MOCK_RECIPES } from '../data/mockData';
import { Recipe } from '../types/hain';
import HorizontalRecipeCard from './HorizontalRecipeCard';

export default function SearchTab() {
  const {
    searchQuery,
    setSearchQuery,
    setActiveRecipe,
    setIsRecipeDetailOpen,
    setIsSearchOpen,
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
    language,
  } = useHain();

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus input automatically on open
  useEffect(() => {
    const timer = setTimeout(() => {
      searchInputRef.current?.focus();
    }, 80);
    return () => clearTimeout(timer);
  }, []);

  // Trending Pinoy Cravings for quick selection
  const trendingCravings = [
    { label: 'Sinigang na Baboy', emoji: '🍲', query: 'Sinigang' },
    { label: 'Kalderetang Baka', emoji: '🍛', query: 'Kaldereta' },
    { label: 'Ginisang Monggo', emoji: '🥣', query: 'Monggo' },
    { label: 'Tortang Talong', emoji: '🍆', query: 'Tortang Talong' },
    { label: 'Chicken Tinola', emoji: '🍗', query: 'Tinola' },
    { label: 'Sarciadong Bangus', emoji: '🐟', query: 'Sarciado' },
    { label: 'Bistek Tagalog', emoji: '🥩', query: 'Bistek' },
  ];

  // In-House Ingredient Quick Searches (respecting selected language)
  const ingredientSearches = language === 'tl' ? [
    { label: 'Talong', query: 'Talong', icon: '🍆' },
    { label: 'Itlog', query: 'Itlog', icon: '🥚' },
    { label: 'Manok', query: 'Manok', icon: '🍗' },
    { label: 'Baboy', query: 'Baboy', icon: '🥩' },
    { label: 'Baka', query: 'Baka', icon: '🥩' },
    { label: 'Bangus', query: 'Bangus', icon: '🐟' },
    { label: 'Monggo', query: 'Monggo', icon: '🥣' },
    { label: 'Sayote', query: 'Sayote', icon: '🍈' },
    { label: 'Kangkong', query: 'Kangkong', icon: '🥬' },
    { label: 'Tokwa', query: 'Tokwa', icon: '🧈' },
  ] : [
    { label: 'Eggplant', query: 'Eggplant', icon: '🍆' },
    { label: 'Egg', query: 'Egg', icon: '🥚' },
    { label: 'Chicken', query: 'Chicken', icon: '🍗' },
    { label: 'Pork', query: 'Pork', icon: '🥩' },
    { label: 'Beef', query: 'Beef', icon: '🥩' },
    { label: 'Fish', query: 'Fish', icon: '🐟' },
    { label: 'Mung Bean', query: 'Monggo', icon: '🥣' },
    { label: 'Chayote', query: 'Sayote', icon: '🍈' },
    { label: 'Spinach', query: 'Kangkong', icon: '🥬' },
    { label: 'Tofu', query: 'Tofu', icon: '🧈' },
  ];

  // Pure, basic search directly across ALL recipes in Hain (No carried-over home filters)
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return MOCK_RECIPES.filter((r) => {
      const matchTitle = r.title.toLowerCase().includes(q);
      const matchLocal = r.localName.toLowerCase().includes(q);
      const matchDesc = r.description.toLowerCase().includes(q);
      const matchTagline = r.tagline?.toLowerCase().includes(q);
      const matchTags = r.tags.some((t) => t.toLowerCase().includes(q));
      const matchIngredients = r.ingredients.some(
        (ing) => ing.name.toLowerCase().includes(q) || ing.localName.toLowerCase().includes(q)
      );
      return matchTitle || matchLocal || matchDesc || matchTagline || matchTags || matchIngredients;
    });
  }, [searchQuery]);

  const handleSelectQuery = (query: string) => {
    setSearchQuery(query);
    addRecentSearch(query);
  };

  const handleOpenRecipe = (recipe: Recipe) => {
    addRecentSearch(recipe.localName || recipe.title);
    setActiveRecipe(recipe);
    setIsRecipeDetailOpen(true);
  };

  // Back button closes search and clears query so it does NOT carry over to Home
  const handleCloseSearch = () => {
    if (searchQuery.trim()) {
      addRecentSearch(searchQuery.trim());
    }
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  // Reset search query on unmount to prevent search carrying over to Home
  useEffect(() => {
    return () => {
      setSearchQuery('');
    };
  }, [setSearchQuery]);

  const isQueryActive = searchQuery.trim() !== '';

  return (
    <div className="flex-1 pb-safe-nav bg-[var(--theme-bg-app)] min-h-screen flex flex-col animate-in fade-in duration-150">
      
      {/* 
        ============================================================
        BASIC SEARCH HEADER
        Clean, focused search bar with back arrow and clear button
        ============================================================
      */}
      <section 
        aria-label="Search Header" 
        className="sticky top-0 z-30 bg-[#B8381D] text-white px-4 pt-safe pb-3.5 rounded-b-[28px] shadow-md transition-all duration-200"
      >
        <div className="flex items-center justify-between text-xs text-white/90 font-medium mb-2.5">
          <span className="font-sans font-bold tracking-[0.3em] text-xs">H A I N &bull; SEARCH</span>
          <div className="w-5 h-5 rounded-full overflow-hidden border border-white/40 shadow-sm flex items-center justify-center bg-white text-[10px]">
            🇵🇭
          </div>
        </div>

        {/* Search Bar Flex Row */}
        <div className="flex items-center gap-2.5">
          {/* Back Button (Returns to Home, keeping search query intact) */}
          <Button
            variant="glass"
            icon={<ArrowLeft className="w-5 h-5 text-white" />}
            onClick={handleCloseSearch}
            aria-label="Back to Home"
            className="!w-10 !h-10 !rounded-full !p-0 lg-glass-clear shrink-0 flex items-center justify-center drop-shadow-md"
          />

          {/* Search Input Field */}
          <div className="relative flex-1">
            <SearchIcon className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'en' ? 'Search ulam or ingredients...' : 'Maghanap ng ulam o sangkap...'}
              className="w-full pl-10 pr-16 py-2.5 rounded-full bg-white text-stone-900 text-xs sm:text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-white/40 placeholder:text-stone-400 transition-all font-sans font-medium"
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="w-5 h-5 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center hover:bg-stone-300 tap-spring"
                  title="Clear"
                >
                  <XIcon className="w-3 h-3 stroke-[2.5]" />
                </button>
              )}
              <button 
                type="button" 
                className="text-stone-400 hover:text-stone-600 tap-spring p-1"
                title="Voice Search"
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ============================================================
        SEARCH CONTENT BODY
        ============================================================
      */}
      <div className="px-4 pt-4 space-y-4 flex-1">
        
        {!isQueryActive ? (
          /* ======================================================== */
          /* EMPTY SEARCH: RECENT SEARCHES & TRENDING CRAVINGS        */
          /* ======================================================== */
          <div className="space-y-5 animate-in fade-in duration-150">
            
            {/* 1. RECENT SEARCHES */}
            {recentSearches.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{language === 'en' ? 'Recent Searches' : 'Mga Kamakailang Hinanap'}</span>
                  </div>
                  <button
                    onClick={clearRecentSearches}
                    className="text-[11px] font-semibold text-stone-400 hover:text-stone-700 tap-spring"
                  >
                    {language === 'en' ? 'Clear All' : 'Burahin Lahat'}
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((item) => (
                    <div
                      key={item}
                      onClick={() => handleSelectQuery(item)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200/80 text-xs font-semibold text-stone-800 shadow-none hover:border-[#B8381D] cursor-pointer tap-spring transition-colors group"
                    >
                      <span>{item}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeRecentSearch(item);
                        }}
                        className="text-stone-400 hover:text-stone-700 p-0.5 rounded-full"
                        title="Remove"
                      >
                        <XIcon className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. TRENDING PINOY CRAVINGS */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 px-1">
                <TrendingUp className="w-3.5 h-3.5 text-[#B8381D]" />
                <span>{language === 'en' ? 'Popular Filipino Cravings' : 'Patok na Ulam Ngayon'}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {trendingCravings.map((dish) => (
                  <button
                    key={dish.label}
                    onClick={() => handleSelectQuery(dish.query)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200/80 text-xs font-bold text-stone-800 hover:border-[#B8381D] hover:bg-[#B8381D]/5 tap-spring transition-all"
                  >
                    <span>{dish.emoji}</span>
                    <span>{dish.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. SEARCH BY INGREDIENTS */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 px-1">
                <ChefHat className="w-3.5 h-3.5 text-emerald-600" />
                <span>{language === 'en' ? 'Search by In-House Ingredients' : 'May Sangkap Ka Ba sa Kusina?'}</span>
              </div>
              <p className="text-[11px] text-stone-500 px-1 font-sans">
                {language === 'en' 
                  ? 'Tap an ingredient to find dishes you can cook right now:' 
                  : 'Pumili ng sangkap para makita ang mga ulam na pwede mong lutuin:'}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {ingredientSearches.map((ing) => (
                  <button
                    key={ing.label}
                    onClick={() => handleSelectQuery(ing.query)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-100/90 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 border border-stone-200/70 text-xs font-medium text-stone-700 tap-spring transition-colors"
                  >
                    <span>{ing.icon}</span>
                    <span>{ing.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* ======================================================== */
          /* ACTIVE SEARCH: 2-COLUMN RECIPE GRID (Exact match with Home) */
          /* ======================================================== */
          <div className="space-y-3 animate-in fade-in duration-150">
            
            {/* Results count header */}
            <div className="flex items-center justify-between text-xs font-medium text-stone-500 px-1">
              <span>
                {language === 'en' ? 'Results for' : 'Resulta para sa'} &ldquo;{searchQuery}&rdquo;:
              </span>
              <span className="font-bold text-[#B8381D]">
                {searchResults.length} {language === 'en' ? 'dishes' : 'ulam'}
              </span>
            </div>

            {/* Zero Matches State */}
            {searchResults.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center space-y-3 border border-stone-200/80 shadow-none my-4">
                <div className="text-4xl">🍲</div>
                <h3 className="font-sans font-bold text-base text-stone-800">
                  {language === 'en' ? 'No matching dishes found' : 'Walang nahanap na ulam'}
                </h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto leading-relaxed font-sans">
                  {language === 'en'
                    ? `No recipes matched "${searchQuery}". Try searching for meat cuts, vegetables, or familiar ulam names.`
                    : `Walang recipe na tumugma sa "${searchQuery}". Subukang mag-search ng karne (baboy, manok), gulay (talong, sitaw), o sabaw.`}
                </p>

                <Button
                  variant="filled"
                  tint="#B8381D"
                  onClick={() => setSearchQuery('')}
                  icon={<RotateCcw className="w-3.5 h-3.5 text-white" />}
                  className="mt-2 !px-4 !py-2 !rounded-xl !text-white text-xs font-bold"
                >
                  <span>{language === 'en' ? 'Clear Search' : 'Burahin ang Search'}</span>
                </Button>
              </div>
            ) : (
              /* Search Results: Horizontal Recipe Cards (Matching category mockup) */
              <div className="space-y-3.5 pb-6">
                {searchResults.map((recipe) => (
                  <HorizontalRecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onClick={() => handleOpenRecipe(recipe)}
                  />
                ))}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
