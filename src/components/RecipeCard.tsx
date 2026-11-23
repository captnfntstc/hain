'use client';

import React from 'react';
import { Recipe } from '../types/hain';
import { useHain } from '../context/HainContext';
import { Users, Star, ArrowRight } from 'lucide-react';

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const { calculateRecipeBasket, budgetCap, setActiveRecipe, setIsRecipeDetailOpen } = useHain();
  const { basketTotal, isWithinCap } = calculateRecipeBasket(recipe);

  return (
    <article
      onClick={() => {
        setActiveRecipe(recipe);
        setIsRecipeDetailOpen(true);
      }}
      className="bg-white rounded-[24px] p-3.5 border border-[#F2ECE1] shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-md transition-all cursor-pointer tap-spring flex items-center gap-3.5 group"
    >
      {/* Dish Thumbnail */}
      <div className="relative w-20 h-20 rounded-[18px] overflow-hidden bg-stone-100 flex-shrink-0">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold mb-0.5">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="text-stone-700 font-bold">{recipe.rating}</span>
          <span className="text-stone-400 font-normal">({recipe.source})</span>
        </div>

        <h3 className="font-display font-bold text-sm text-stone-900 truncate group-hover:text-[#B8381D] transition-colors">
          {recipe.localName}
        </h3>

        <div className="flex items-center gap-3 text-xs text-stone-500 mt-1">
          <span className="font-extrabold text-[#B8381D] tabular-nums">
            P{basketTotal.toFixed(0)}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-stone-600">
            <Users className="w-3 h-3 text-stone-400" />
            {recipe.servings} pax
          </span>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            {isWithinCap ? 'Pasok' : `Over P${budgetCap}`}
          </span>
        </div>
      </div>

      <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 group-hover:text-[#B8381D] group-hover:translate-x-0.5 transition-all">
        <ArrowRight className="w-4 h-4" />
      </div>
    </article>
  );
}
