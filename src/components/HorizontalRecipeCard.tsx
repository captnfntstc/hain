'use client';

import React from 'react';
import { useHain } from '../context/HainContext';
import { Recipe } from '../types/hain';
import { Star, Users, Clock, Check } from 'lucide-react';

interface HorizontalRecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
  categoryTag?: string;
  isNoRice?: boolean;
}

const RECIPE_META: Record<
  string,
  {
    categoryTag: string;
    englishSubtitle: string;
    exclusionTag: string;
    dietarySafeText: string;
  }
> = {
  'sinigang-baboy': {
    categoryTag: 'Pork',
    englishSubtitle: 'Pork Tamarind Soup',
    exclusionTag: 'No Patis',
    dietarySafeText: 'Dairy & Gluten-Free',
  },
  'tortang-talong': {
    categoryTag: 'Pork',
    englishSubtitle: 'Pork Eggplant Omelet',
    exclusionTag: 'No Eggs',
    dietarySafeText: 'Gluten-Free',
  },
  'kalderetang-baka': {
    categoryTag: 'Beef',
    englishSubtitle: 'Beef Caldereta Stew',
    exclusionTag: 'No Dairy',
    dietarySafeText: 'Nut & Shellfish-Free',
  },
  'ginisang-monggo': {
    categoryTag: 'Gulay',
    englishSubtitle: 'Savory Mung Bean Stew',
    exclusionTag: 'No Pork',
    dietarySafeText: 'High-Protein & Gluten-Free',
  },
  'tinolang-manok': {
    categoryTag: 'Chicken',
    englishSubtitle: 'Ginger Chicken Broth',
    exclusionTag: 'No Patis',
    dietarySafeText: 'Dairy & Egg-Free',
  },
  'adobong-sitaw-tokwa': {
    categoryTag: 'Tipid',
    englishSubtitle: 'Yardlong Beans & Tofu Adobo',
    exclusionTag: 'No Meat',
    dietarySafeText: '100% Plant-Based',
  },
  'sinigang-na-hipon': {
    categoryTag: 'Seafood',
    englishSubtitle: 'Shrimp Tamarind Soup',
    exclusionTag: 'No Shellfish',
    dietarySafeText: 'Low-Fat & Dairy-Free',
  },
  'sarciadong-bangus': {
    categoryTag: 'Seafood',
    englishSubtitle: 'Milkfish in Tomato Egg Gravy',
    exclusionTag: 'No Dairy',
    dietarySafeText: 'Dairy & Gluten-Free',
  },
};

export default function HorizontalRecipeCard({
  recipe,
  onClick,
  categoryTag: overrideCategoryTag,
  isNoRice = false,
}: HorizontalRecipeCardProps) {
  const { currencySymbol } = useHain();

  const meta = RECIPE_META[recipe.id] || {
    categoryTag: recipe.tags[0] || 'Pinoy',
    englishSubtitle: recipe.tagline || recipe.description.slice(0, 36),
    exclusionTag: 'No MSG',
    dietarySafeText: 'Family Safe',
  };

  const categoryTag = overrideCategoryTag || meta.categoryTag;
  const englishSubtitle = meta.englishSubtitle;
  const exclusionTag = meta.exclusionTag;
  const dietarySafeText = meta.dietarySafeText;

  // If "No Rice?" is toggled, subtract ₱30 (approx 1/2 kg milled rice price)
  const displayPrice = isNoRice
    ? Math.max(50, recipe.estimatedPrice - 30)
    : recipe.estimatedPrice;

  const pricePerPax = Math.round(displayPrice / (recipe.servings || 1));

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-3xl p-3.5 shadow-sm border border-[#F2ECE1] flex items-start gap-3.5 hover:shadow-md transition-all tap-spring cursor-pointer select-none group"
    >
      {/* Left Column: Image with Overlaid Badges */}
      <div className="relative w-36 h-36 shrink-0 rounded-2xl overflow-hidden bg-stone-100">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top-Left: Category Tag */}
        <div className="absolute top-2 left-2 bg-[#F5ECE1]/95 backdrop-blur-xs text-stone-800 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
          {categoryTag}
        </div>

        {/* Top-Right: Exclusion / Dietary Tag */}
        {exclusionTag && (
          <div className="absolute top-2 right-2 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
            <span>{exclusionTag}</span>
            <span className="text-[11px] leading-none">⊘</span>
          </div>
        )}
      </div>

      {/* Right Column: Recipe Details */}
      <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
        <div>
          {/* Star Rating: 5 Gold Stars */}
          <div className="flex items-center gap-0.5 text-[#C29B63] mb-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-3.5 h-3.5 fill-[#C29B63] text-[#C29B63]" />
            ))}
          </div>

          {/* Dish Title in Warm Serif Font */}
          <h3 className="font-serif font-bold text-base sm:text-[17px] text-[#7A2814] leading-snug line-clamp-2 group-hover:text-[#9A3412] transition-colors">
            {recipe.localName || recipe.title}
          </h3>

          {/* English Culinary Subtitle */}
          <p className="text-xs text-stone-500 font-normal line-clamp-1 mt-0.5">
            {englishSubtitle}
          </p>

          {/* Price & Servings Pax */}
          <div className="mt-1.5 flex items-baseline gap-1.5 flex-wrap">
            <span className="font-bold text-sm text-stone-900 tabular-nums">
              {currencySymbol}{displayPrice} ·
            </span>
            <span className="text-xs font-semibold text-stone-700 flex items-center gap-1">
              <Users className="w-3 h-3 text-stone-500" />
              <span>{recipe.servings} pax</span>
            </span>
          </div>

          {/* Price per Pax & Cook Time */}
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mt-0.5">
            <span>{currencySymbol}{pricePerPax}/pax</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-stone-400" />
              <span>{recipe.cookTimeMinutes} mins</span>
            </span>
          </div>
        </div>

        {/* Dietary / Allergen Safe Badge at Bottom */}
        <div className="pt-2">
          <span className="bg-[#EAF3EB] text-[#2D6A4F] text-[10px] font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1 shadow-2xs">
            <Check className="w-3 h-3 text-[#2D6A4F] stroke-[2.5]" />
            <span>{dietarySafeText}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
