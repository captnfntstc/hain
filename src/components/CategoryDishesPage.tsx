'use client';

import React from 'react';
import { useHain } from '../context/HainContext';
import { Button } from 'glisse';
import { 
  ChevronLeft, 
  SlidersHorizontal,
  Ham,
  Drumstick,
  Beef,
  Fish,
  Carrot,
  Soup,
  Coins,
  LayoutGrid,
  Flame
} from 'lucide-react';
import { MOCK_RECIPES } from '../data/mockData';
import { Recipe } from '../types/hain';
import HorizontalRecipeCard from './HorizontalRecipeCard';

export default function CategoryDishesPage() {
  const { 
    activeCategoryPage, 
    setActiveCategoryPage, 
    setActiveRecipe, 
    setIsRecipeDetailOpen,
    setIsFiltersModalOpen,
    budgetCap,
    currencySymbol,
    language 
  } = useHain();

  const categoryInfo: Record<string, {
    titleEn: string;
    titleTl: string;
    tagLabel: string;
    icon: React.ReactNode;
    filterFn: (r: Recipe) => boolean;
  }> = {
    baboy: {
      titleEn: 'Pork Dishes',
      titleTl: 'Mga Ulam na Baboy',
      tagLabel: 'Pork',
      icon: <Ham className="w-5 h-5" />,
      filterFn: (r) => 
        r.tags.some(t => t.toLowerCase().includes('pork') || t.toLowerCase().includes('baboy')) ||
        r.ingredients.some(i => i.name.toLowerCase().includes('pork') || i.localName.toLowerCase().includes('baboy')),
    },
    manok: {
      titleEn: 'Chicken Dishes',
      titleTl: 'Mga Ulam na Manok',
      tagLabel: 'Chicken',
      icon: <Drumstick className="w-5 h-5" />,
      filterFn: (r) => 
        r.tags.some(t => t.toLowerCase().includes('chicken') || t.toLowerCase().includes('manok')) ||
        r.ingredients.some(i => i.name.toLowerCase().includes('chicken') || i.localName.toLowerCase().includes('manok')),
    },
    baka: {
      titleEn: 'Beef Dishes',
      titleTl: 'Mga Ulam na Baka',
      tagLabel: 'Beef',
      icon: <Beef className="w-5 h-5" />,
      filterFn: (r) => 
        r.tags.some(t => t.toLowerCase().includes('beef') || t.toLowerCase().includes('baka')) ||
        r.ingredients.some(i => i.name.toLowerCase().includes('beef') || i.localName.toLowerCase().includes('baka')),
    },
    isda: {
      titleEn: 'Fish & Seafood',
      titleTl: 'Isda at Seafood',
      tagLabel: 'Seafood',
      icon: <Fish className="w-5 h-5" />,
      filterFn: (r) => 
        r.tags.some(t => t.toLowerCase().includes('fish') || t.toLowerCase().includes('isda') || t.toLowerCase().includes('seafood')) ||
        r.ingredients.some(i => i.name.toLowerCase().includes('fish') || i.localName.toLowerCase().includes('bangus') || i.localName.toLowerCase().includes('tilapia')),
    },
    gulay: {
      titleEn: 'Vegetables',
      titleTl: 'Mga Ulam na Gulay',
      tagLabel: 'Gulay',
      icon: <Carrot className="w-5 h-5" />,
      filterFn: (r) => 
        r.tags.some(t => t.toLowerCase().includes('vegetable') || t.toLowerCase().includes('gulay') || t.toLowerCase().includes('monggo') || t.toLowerCase().includes('pinakbet')) ||
        r.ingredients.some(i => i.category === 'vegetables'),
    },
    sabaw: {
      titleEn: 'Soups & Sabaw',
      titleTl: 'Sabaw at Sinigang',
      tagLabel: 'Soup',
      icon: <Soup className="w-5 h-5" />,
      filterFn: (r) => 
        r.tags.some(t => t.toLowerCase().includes('soup') || t.toLowerCase().includes('sabaw') || t.toLowerCase().includes('sinigang') || t.toLowerCase().includes('tinola') || t.toLowerCase().includes('nilaga')),
    },
    tipid: {
      titleEn: 'Budget Meals (<₱350)',
      titleTl: 'Tipid Ulam (<₱350)',
      tagLabel: 'Tipid',
      icon: <Coins className="w-5 h-5" />,
      filterFn: (r) => r.estimatedPrice <= 350 || r.tags.some(t => t.toLowerCase().includes('tipid') || t.toLowerCase().includes('egg') || t.toLowerCase().includes('tokwa')),
    },
    inihaw: {
      titleEn: 'Grilled Dishes',
      titleTl: 'Mga Inihaw na Ulam',
      tagLabel: 'Inihaw',
      icon: <Flame className="w-5 h-5" />,
      filterFn: (r) => 
        r.tags.some(t => t.toLowerCase().includes('inihaw') || t.toLowerCase().includes('grilled') || t.toLowerCase().includes('bbq') || t.toLowerCase().includes('inasal')) ||
        r.title.toLowerCase().includes('inihaw') ||
        r.title.toLowerCase().includes('inasal') ||
        r.localName.toLowerCase().includes('inihaw'),
    },
    all: {
      titleEn: 'All Dishes',
      titleTl: 'Lahat ng Ulam',
      tagLabel: 'Ulam',
      icon: <LayoutGrid className="w-5 h-5" />,
      filterFn: () => true,
    },
  };

  const currentCategoryKey = activeCategoryPage || 'all';
  const currentInfo = categoryInfo[currentCategoryKey] || categoryInfo['all'];
  const categoryTitle = language === 'en' ? currentInfo.titleEn : currentInfo.titleTl;

  // Filter recipes matching this category
  const categoryRecipes = MOCK_RECIPES.filter(currentInfo.filterFn);

  const handleOpenRecipe = (recipe: Recipe) => {
    setActiveRecipe(recipe);
    setIsRecipeDetailOpen(true);
  };

  return (
    <div className="flex-1 pb-28 bg-[#FFFBF2] min-h-screen flex flex-col animate-in slide-in-from-right duration-200">
      
      {/* 
        ============================================================
        UNIFIED SEAMLESS TOP NAVIGATION (No separate two-toned header)
        Matches exact reference: Back button, Category name + count, Sliders
        ============================================================
      */}
      <div className="px-5 pt-safe pt-3">
        <div className="flex items-center justify-between">
          {/* Back Button (<): Glisse Liquid Glass Button */}
          <Button
            variant="glass"
            icon={<ChevronLeft className="w-5 h-5 stroke-[2.5]" />}
            onClick={() => setActiveCategoryPage(null)}
            aria-label="Back to Home"
            className="shrink-0 drop-shadow-xs"
          />

          {/* Center Category Label & Item Count: Quick Dishes Categories to prevent redundancy with hero title */}
          <div className="text-center px-2 flex-1">
            <div className="font-sans font-bold text-[10px] sm:text-[11px] tracking-[0.16em] text-stone-900 uppercase">
              {language === 'tl' ? 'Mabilisang Kategorya' : 'Quick Dishes Categories'}
            </div>
            <div className="text-xs text-stone-500 font-normal mt-0.5">
              {categoryRecipes.length} {categoryRecipes.length === 1 ? 'item' : 'items'}
            </div>
          </div>

          {/* Filter Sliders Button: Glisse Liquid Glass Button */}
          <Button
            variant="glass"
            icon={<SlidersHorizontal className="w-4 h-4 stroke-[2]" />}
            onClick={() => setIsFiltersModalOpen(true)}
            aria-label="Open Filters"
            className="shrink-0 drop-shadow-xs"
          />
        </div>

        {/* 
          ============================================================
          CENTERED HERO TITLE & GREEN BUDGET PILL
          ============================================================
        */}
        <div className="text-center pt-5 pb-2">
          {/* Main Display Title in Rich Espresso Serif */}
          <h1 className="font-serif font-bold text-3xl sm:text-[36px] text-[#261A13] tracking-tight leading-tight">
            {categoryTitle}
          </h1>

          {/* Green MAX Budget Pill Badge */}
          <div className="mt-2.5">
            <span className="bg-[#38764B] text-white text-xs sm:text-[13px] font-bold px-4 py-1.5 rounded-full inline-block shadow-xs">
              {currencySymbol}{budgetCap.toLocaleString()} MAX Budget
            </span>
          </div>
        </div>
      </div>

      {/* 
        ============================================================
        HORIZONTAL RECIPE CARDS LIST
        ============================================================
      */}
      <div className="px-4 pt-4 space-y-3.5 flex-1">
        {categoryRecipes.map((recipe) => (
          <HorizontalRecipeCard
            key={recipe.id}
            recipe={recipe}
            onClick={() => handleOpenRecipe(recipe)}
            categoryTag={currentInfo.tagLabel}
          />
        ))}

        {categoryRecipes.length === 0 && (
          <div className="bg-white rounded-3xl p-8 text-center space-y-2 border border-stone-200/80 my-4 shadow-xs">
            <div className="text-4xl">🍲</div>
            <div className="font-bold text-stone-800 text-sm">
              No dishes found under this category
            </div>
            <div className="text-xs text-stone-500">
              Try adjusting your dietary filters or budget cap.
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
