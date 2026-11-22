'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Recipe, 
  Ingredient, 
  TimeOfDayState, 
  ThemeMode, 
  IngredientStatus, 
  ActiveTab, 
  HouseholdMember, 
  CurrencyCode, 
  SUPPORTED_CURRENCIES,
  PrimaryColorThemeId,
  ColorThemeConfig,
  COLOR_THEMES
} from '../types/hain';
import { MOCK_RECIPES, PANTRY_STAPLES_LIST } from '../data/mockData';
import { TRANSLATIONS, Language } from '../data/translations';

export type { ActiveTab, Language, ThemeMode, CurrencyCode, PrimaryColorThemeId, ColorThemeConfig };

interface HainContextType {
  // Navigation Tabs
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;

  // Language & Localization
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof TRANSLATIONS['en'];

  // Currency & Official Philippine Peso
  currency: CurrencyCode;
  setCurrency: (curr: CurrencyCode) => void;
  currencySymbol: string;
  formatPrice: (amount: number, showDecimals?: boolean) => string;

  // Grab-style Category Filter & Dedicated Category Trending Page
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  activeCategoryPage: string | null;
  setActiveCategoryPage: (cat: string | null) => void;

  // Household & Family Members (Apple Health style)
  householdMembers: HouseholdMember[];
  setHouseholdMembers: React.Dispatch<React.SetStateAction<HouseholdMember[]>>;
  toggleMemberEatingToday: (id: string) => void;
  addHouseholdMember: (member: Omit<HouseholdMember, 'id'>) => void;
  removeHouseholdMember: (id: string) => void;
  isFamilyShieldEnabled: boolean;
  setIsFamilyShieldEnabled: (enabled: boolean) => void;

  // Calendar Meal History & Planner Page
  isCalendarPageOpen: boolean;
  setIsCalendarPageOpen: (open: boolean) => void;
  isCalendarModalOpen: boolean;
  setIsCalendarModalOpen: (open: boolean) => void;
  selectedPlanDay: string;
  setSelectedPlanDay: (day: string) => void;
  mealPlanSchedule: Record<string, { lunch?: Recipe; dinner?: Recipe }>;
  assignRecipeToPlan: (dayId: string, mealType: 'lunch' | 'dinner', recipe: Recipe) => void;

  // Theme Mode (Dark, Light, System)
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;

  // Developer Options: Primary Color Theme
  colorThemeId: PrimaryColorThemeId;
  colorTheme: ColorThemeConfig;
  setColorThemeId: (themeId: PrimaryColorThemeId) => void;
  isDevOptionsOpen: boolean;
  setIsDevOptionsOpen: (open: boolean) => void;

  // Ambiance & Time (Automatic by default)
  timeOfDay: TimeOfDayState;
  isAutoTime: boolean;
  setTimeOfDay: (time: TimeOfDayState) => void;
  setIsAutoTime: (auto: boolean) => void;

  // Budget & Servings (Mockup Sync)
  budgetCap: number;
  setBudgetCap: (val: number) => void;
  servingsPax: number;
  setServingsPax: (pax: number) => void;
  costPerPerson: number;

  // Budget Stepper Modal
  isBudgetModalOpen: boolean;
  setIsBudgetModalOpen: (open: boolean) => void;
  budgetModalStep: 1 | 2;
  setBudgetModalStep: (step: 1 | 2) => void;

  // Dedicated Actual Search View
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  recentSearches: string[];
  addRecentSearch: (term: string) => void;
  removeRecentSearch: (term: string) => void;
  clearRecentSearches: () => void;

  // Search & Filtering (Dietary & Allergens from Mockup)
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedDietFilter: string;
  setSelectedDietFilter: (diet: string) => void;
  selectedDietaryPreferences: string[];
  toggleDietaryPreference: (id: string) => void;
  selectedAllergenExclusions: string[];
  toggleAllergenExclusion: (id: string) => void;
  resetFilters: () => void;
  isFiltersModalOpen: boolean;
  setIsFiltersModalOpen: (open: boolean) => void;
  activeFilterCount: number;

  // Recipe Detail View
  activeRecipe: Recipe;
  setActiveRecipe: (r: Recipe) => void;
  isRecipeDetailOpen: boolean;
  setIsRecipeDetailOpen: (open: boolean) => void;

  // Cook Countdown & Wet Hands
  isCookCountdownOpen: boolean;
  setIsCookCountdownOpen: (open: boolean) => void;
  countdownPhase: 'ready' | 3 | 2 | 1 | 'start' | 'cooking';
  setCountdownPhase: (phase: 'ready' | 3 | 2 | 1 | 'start' | 'cooking') => void;

  // Shopping / Split-Basket & 3-Click Status
  ingredientStatuses: Record<string, IngredientStatus>;
  cycleIngredientStatus: (id: string) => void;
  checkedItems: Record<string, boolean>;
  toggleItemCheck: (id: string) => void;
  excludedStaples: string[];
  toggleStapleExclusion: (id: string) => void;

  // Modals & Extras
  isPabiliOpen: boolean;
  setIsPabiliOpen: (open: boolean) => void;
  isPadeliverOpen: boolean;
  setIsPadeliverOpen: (open: boolean) => void;

  // Calculations
  filteredRecipes: Recipe[];
  calculateRecipeBasket: (recipe: Recipe) => {
    basketTotal: number;
    checkedTotal: number;
    remainingBudget: number;
    isWithinCap: boolean;
  };
}

const HainContext = createContext<HainContextType | undefined>(undefined);

function getSystemTimeOfDay(): TimeOfDayState {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) return 'morning'; // 5 AM - 10:59 AM
  if (hour >= 11 && hour < 16) return 'lunch';   // 11 AM - 3:59 PM
  if (hour >= 16 && hour < 21) return 'dinner';  // 4 PM - 8:59 PM
  return 'midnight';                             // 9 PM - 4:59 AM
}

export function HainProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [language, setLanguage] = useState<Language>('en');
  const t = TRANSLATIONS[language];

  // Currency State (Defaults to Official Philippine Peso ₱)
  const [currency, setCurrency] = useState<CurrencyCode>('PHP');

  const currencySymbol = useMemo(() => {
    const found = SUPPORTED_CURRENCIES.find((c) => c.code === currency);
    return found ? found.symbol : '₱';
  }, [currency]);

  const formatPrice = useCallback(
    (amount: number, showDecimals: boolean = false) => {
      if (showDecimals) {
        return `${currencySymbol}${amount.toFixed(2)}`;
      }
      return `${currencySymbol}${Math.round(amount).toLocaleString()}`;
    },
    [currencySymbol]
  );

  // Theme mode: 'light' | 'dark' | 'system' (UI ready, not implemented into CSS yet as requested)
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');

  // Developer Options: Primary Color Theme
  const [colorThemeId, setColorThemeIdState] = useState<PrimaryColorThemeId>('warm-red');
  const [isDevOptionsOpen, setIsDevOptionsOpen] = useState<boolean>(false);

  const colorTheme = useMemo(
    () => COLOR_THEMES[colorThemeId] || COLOR_THEMES['warm-red'],
    [colorThemeId]
  );

  const setColorThemeId = useCallback((themeId: PrimaryColorThemeId) => {
    setColorThemeIdState(themeId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hain_color_theme', themeId);
      const theme = COLOR_THEMES[themeId];
      if (theme) {
        document.documentElement.style.setProperty('--theme-primary', theme.badgeBg);
        document.documentElement.style.setProperty('--theme-banner-start', theme.headerBg);
        document.documentElement.style.setProperty('--theme-banner-end', theme.headerBg);
        document.documentElement.style.setProperty('--theme-banner-text', theme.headerText);
        document.documentElement.style.setProperty('--brand-primary', theme.accentColor);
        document.documentElement.style.setProperty('--lg-fill', theme.accentColor);
      }
    }
  }, []);

  // Restore saved theme on initial mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hain_color_theme') as PrimaryColorThemeId | null;
      if (saved && COLOR_THEMES[saved]) {
        setColorThemeId(saved);
      } else {
        setColorThemeId('warm-red');
      }
    }
  }, [setColorThemeId]);

  const [timeOfDay, setTimeOfDay] = useState<TimeOfDayState>('morning');
  const [isAutoTime, setIsAutoTime] = useState<boolean>(true);

  // Grab-style 8-category filter ('', 'baboy', 'manok', 'baka', 'isda', 'gulay', 'sabaw', 'tipid', 'inihaw')
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [activeCategoryPage, setActiveCategoryPage] = useState<string | null>(null);

  // Household & Family Members (Apple Health style)
  const [householdMembers, setHouseholdMembers] = useState<HouseholdMember[]>([
    {
      id: 'member-1',
      name: 'Gracepheryle',
      relationship: 'Parent / Head Cook',
      avatar: '👩‍🍳',
      allergens: [],
      dietaryRestrictions: [],
      isEatingToday: true,
    },
    {
      id: 'member-2',
      name: 'Tatay Ed',
      relationship: 'Partner',
      avatar: '👨‍💼',
      allergens: [],
      dietaryRestrictions: ['Low Purine', 'Low Sodium'],
      isEatingToday: true,
    },
    {
      id: 'member-3',
      name: 'Jun-Jun',
      relationship: 'Child',
      avatar: '🧒',
      allergens: ['Peanuts', 'Shellfish'],
      dietaryRestrictions: [],
      isEatingToday: true,
    },
    {
      id: 'member-4',
      name: 'Ate Bea',
      relationship: 'Child',
      avatar: '👧',
      allergens: ['Dairy'],
      dietaryRestrictions: ['Pescatarian'],
      isEatingToday: true,
    },
  ]);
  const [isFamilyShieldEnabled, setIsFamilyShieldEnabled] = useState<boolean>(true);

  const toggleMemberEatingToday = useCallback((id: string) => {
    setHouseholdMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isEatingToday: !m.isEatingToday } : m))
    );
  }, []);

  const addHouseholdMember = useCallback((memberData: Omit<HouseholdMember, 'id'>) => {
    const newMember: HouseholdMember = {
      ...memberData,
      id: `member-${Date.now()}`,
    };
    setHouseholdMembers((prev) => [...prev, newMember]);
  }, []);

  const removeHouseholdMember = useCallback((id: string) => {
    setHouseholdMembers((prev) => prev.filter((m) => m.id !== id));
  }, []);

  // Calendar Meal History & Planner Page
  const [isCalendarPageOpen, setIsCalendarPageOpen] = useState<boolean>(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState<boolean>(false);
  const [selectedPlanDay, setSelectedPlanDay] = useState<string>('today');
  const [mealPlanSchedule, setMealPlanSchedule] = useState<Record<string, { lunch?: Recipe; dinner?: Recipe }>>({
    today: {
      lunch: MOCK_RECIPES[2], // Ginisang Monggo
      dinner: MOCK_RECIPES[0], // Kalderetang Baka
    },
    tomorrow: {
      lunch: MOCK_RECIPES[3], // Tortang Talong
      dinner: MOCK_RECIPES[1], // Sinigang na Baboy
    },
  });

  const assignRecipeToPlan = useCallback((dayId: string, mealType: 'lunch' | 'dinner', recipe: Recipe) => {
    setMealPlanSchedule((prev) => ({
      ...prev,
      [dayId]: {
        ...prev[dayId],
        [mealType]: recipe,
      },
    }));
  }, []);

  // Default matching the user's mockup: ₱1,500 budget & 10 pax
  const [budgetCap, setBudgetCap] = useState<number>(1500);
  const [servingsPax, setServingsPax] = useState<number>(10);

  // Stepper Modal
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState<boolean>(false);
  const [budgetModalStep, setBudgetModalStep] = useState<1 | 2>(1);

  // Search & Filters
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Sinigang na Baboy',
    'Kalderetang Baka',
    'Ginisang Monggo',
    'Tortang Talong',
  ]);

  const addRecentSearch = useCallback((term: string) => {
    if (!term.trim()) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((t) => t.toLowerCase() !== term.toLowerCase().trim());
      return [term.trim(), ...filtered.slice(0, 6)];
    });
  }, []);

  const removeRecentSearch = useCallback((term: string) => {
    setRecentSearches((prev) => prev.filter((t) => t.toLowerCase() !== term.toLowerCase().trim()));
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
  }, []);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDietFilter, setSelectedDietFilter] = useState<string>('all');
  const [selectedDietaryPreferences, setSelectedDietaryPreferences] = useState<string[]>([]);
  const [selectedAllergenExclusions, setSelectedAllergenExclusions] = useState<string[]>([]);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState<boolean>(false);

  const toggleDietaryPreference = useCallback((id: string) => {
    setSelectedDietaryPreferences((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }, []);

  const toggleAllergenExclusion = useCallback((id: string) => {
    setSelectedAllergenExclusions((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  }, []);

  const resetFilters = useCallback(() => {
    setSelectedDietaryPreferences([]);
    setSelectedAllergenExclusions([]);
    setSelectedDietFilter('all');
  }, []);

  const activeFilterCount = selectedDietaryPreferences.length + selectedAllergenExclusions.length;

  // Active Recipe & Details
  const [activeRecipe, setActiveRecipe] = useState<Recipe>(MOCK_RECIPES[0]);
  const [isRecipeDetailOpen, setIsRecipeDetailOpen] = useState<boolean>(false);

  // Cook Countdown
  const [isCookCountdownOpen, setIsCookCountdownOpen] = useState<boolean>(false);
  const [countdownPhase, setCountdownPhase] = useState<'ready' | 3 | 2 | 1 | 'start' | 'cooking'>('ready');

  // 3-Click Status for Ingredients: 'to-buy' -> 'bought' -> 'stocked' -> 'to-buy'
  const [ingredientStatuses, setIngredientStatuses] = useState<Record<string, IngredientStatus>>({
    'beef-chucks': 'bought',
    'potatoes': 'to-buy',
  });

  const cycleIngredientStatus = useCallback((id: string) => {
    setIngredientStatuses((prev) => {
      const current = prev[id] || 'to-buy';
      let next: IngredientStatus = 'to-buy';
      if (current === 'to-buy') next = 'bought';
      else if (current === 'bought') next = 'stocked';
      else if (current === 'stocked') next = 'to-buy';
      return { ...prev, [id]: next };
    });
  }, []);

  // Checked Items in Ingredients / List (Backwards-compatibility sync)
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'beef-chucks': true,
    'potatoes': true,
  });

  const [excludedStaples, setExcludedStaples] = useState<string[]>(
    PANTRY_STAPLES_LIST.map((s) => s.id)
  );

  const [isPabiliOpen, setIsPabiliOpen] = useState<boolean>(false);
  const [isPadeliverOpen, setIsPadeliverOpen] = useState<boolean>(false);

  // Auto-sync time of day if enabled
  useEffect(() => {
    if (isAutoTime) {
      setTimeOfDay(getSystemTimeOfDay());
      const interval = setInterval(() => {
        if (isAutoTime) setTimeOfDay(getSystemTimeOfDay());
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [isAutoTime]);

  const costPerPerson = useMemo(() => {
    return servingsPax > 0 ? Number((budgetCap / servingsPax).toFixed(2)) : 0;
  }, [budgetCap, servingsPax]);

  const toggleItemCheck = useCallback((id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const toggleStapleExclusion = useCallback((id: string) => {
    setExcludedStaples((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }, []);

  const calculateRecipeBasket = useCallback(
    (recipe: Recipe) => {
      let basketTotal = 0;
      let checkedTotal = 0;

      recipe.ingredients.forEach((ing) => {
        const status = ingredientStatuses[ing.id] || (checkedItems[ing.id] ? 'bought' : 'to-buy');
        const isExcludedPantry = ing.isPantryStaple && excludedStaples.includes(ing.id);

        if (status === 'stocked' || isExcludedPantry) {
          // May stock na sa bahay - zero new grocery expense!
        } else {
          const price = ing.actualPrice || ing.estimatedPrice;
          basketTotal += price;
          if (status === 'bought') {
            checkedTotal += price;
          }
        }
      });

      const remainingBudget = Math.max(0, budgetCap - basketTotal);
      const isWithinCap = basketTotal <= budgetCap;

      return {
        basketTotal,
        checkedTotal,
        remainingBudget,
        isWithinCap,
      };
    },
    [ingredientStatuses, checkedItems, excludedStaples, budgetCap]
  );

  const filteredRecipes = useMemo(() => {
    return MOCK_RECIPES.filter((r) => {
      // 1. Allergen Exclusions: Filter out recipes containing excluded allergens
      if (selectedAllergenExclusions.length > 0) {
        const hasExcludedAllergen = selectedAllergenExclusions.some((allergenKey) => {
          const k = allergenKey.toLowerCase();
          return r.allergens.some((a) => {
            const al = a.toLowerCase();
            return al.includes(k) || k.includes(al);
          });
        });
        if (hasExcludedAllergen) return false;
      }

      // 3. Dietary Preferences: Recipe must meet selected dietary rules
      if (selectedDietaryPreferences.length > 0) {
        const matchesPreferences = selectedDietaryPreferences.every((prefKey) => {
          const p = prefKey.toLowerCase();
          return r.tags.some((t) => {
            const tg = t.toLowerCase();
            return tg.includes(p) || p.includes(tg);
          });
        });
        if (!matchesPreferences) return false;
      }

      // 4. Grab-style Category filtering
      if (selectedCategory && selectedCategory !== 'all') {
        const cat = selectedCategory.toLowerCase();
        if (cat === 'baboy') {
          const match = r.tags.some(t => t.toLowerCase().includes('pork') || t.toLowerCase().includes('baboy')) ||
                        r.ingredients.some(i => i.name.toLowerCase().includes('pork') || i.localName.toLowerCase().includes('baboy'));
          if (!match) return false;
        } else if (cat === 'manok') {
          const match = r.tags.some(t => t.toLowerCase().includes('chicken') || t.toLowerCase().includes('manok')) ||
                        r.ingredients.some(i => i.name.toLowerCase().includes('chicken') || i.localName.toLowerCase().includes('manok'));
          if (!match) return false;
        } else if (cat === 'baka') {
          const match = r.tags.some(t => t.toLowerCase().includes('beef') || t.toLowerCase().includes('baka')) ||
                        r.ingredients.some(i => i.name.toLowerCase().includes('beef') || i.localName.toLowerCase().includes('baka'));
          if (!match) return false;
        } else if (cat === 'isda') {
          const match = r.tags.some(t => t.toLowerCase().includes('fish') || t.toLowerCase().includes('isda') || t.toLowerCase().includes('seafood')) ||
                        r.ingredients.some(i => i.name.toLowerCase().includes('fish') || i.localName.toLowerCase().includes('bangus') || i.localName.toLowerCase().includes('tilapia'));
          if (!match) return false;
        } else if (cat === 'gulay') {
          const match = r.tags.some(t => t.toLowerCase().includes('vegetable') || t.toLowerCase().includes('gulay') || t.toLowerCase().includes('monggo') || t.toLowerCase().includes('pinakbet')) ||
                        r.ingredients.some(i => i.category === 'vegetables');
          if (!match) return false;
        } else if (cat === 'sabaw') {
          const match = r.tags.some(t => t.toLowerCase().includes('soup') || t.toLowerCase().includes('sabaw') || t.toLowerCase().includes('sinigang') || t.toLowerCase().includes('tinola') || t.toLowerCase().includes('nilaga') || t.toLowerCase().includes('bulalo'));
          if (!match) return false;
        } else if (cat === 'tipid') {
          const match = r.estimatedPrice <= 350 || r.tags.some(t => t.toLowerCase().includes('tipid') || t.toLowerCase().includes('egg') || t.toLowerCase().includes('tokwa'));
          if (!match) return false;
        } else if (cat === 'inihaw') {
          const match = r.tags.some(t => t.toLowerCase().includes('inihaw') || t.toLowerCase().includes('grilled') || t.toLowerCase().includes('bbq') || t.toLowerCase().includes('inasal')) ||
                        r.title.toLowerCase().includes('inihaw') ||
                        r.title.toLowerCase().includes('inasal') ||
                        r.localName.toLowerCase().includes('inihaw');
          if (!match) return false;
        }
      }

      // 5. Household Family Safety Shield
      if (isFamilyShieldEnabled) {
        const activeEatingMembers = householdMembers.filter(m => m.isEatingToday);
        const activeAllergens = activeEatingMembers.flatMap(m => m.allergens);
        if (activeAllergens.length > 0) {
          const hasFamilyAllergen = activeAllergens.some(al => {
            const cleanAl = al.toLowerCase();
            return r.allergens.some(ra => {
              const cleanRa = ra.toLowerCase();
              return cleanAl.includes(cleanRa) || cleanRa.includes(cleanAl) ||
                     ((cleanAl.includes('peanut') || cleanAl.includes('mani')) && (cleanRa.includes('peanut') || cleanRa.includes('mani'))) ||
                     ((cleanAl.includes('shellfish') || cleanAl.includes('hipon') || cleanAl.includes('alimango')) && (cleanRa.includes('shellfish') || cleanRa.includes('hipon'))) ||
                     ((cleanAl.includes('dairy') || cleanAl.includes('gatas')) && (cleanRa.includes('dairy') || cleanRa.includes('gatas'))) ||
                     ((cleanAl.includes('egg') || cleanAl.includes('itlog')) && (cleanRa.includes('egg') || cleanRa.includes('itlog'))) ||
                     ((cleanAl.includes('gluten') || cleanAl.includes('trigo')) && (cleanRa.includes('gluten') || cleanRa.includes('trigo'))) ||
                     ((cleanAl.includes('fish') || cleanAl.includes('isda')) && (cleanRa.includes('fish') || cleanRa.includes('isda'))) ||
                     ((cleanAl.includes('soy') || cleanAl.includes('balatong')) && (cleanRa.includes('soy') || cleanRa.includes('balatong')));
            });
          });
          if (hasFamilyAllergen) return false;
        }
      }

      return true;
    });
  }, [selectedDietaryPreferences, selectedAllergenExclusions, selectedCategory, isFamilyShieldEnabled, householdMembers]);

  return (
    <HainContext.Provider
      value={{
        activeTab,
        setActiveTab,
        language,
        setLanguage,
        t,
        currency,
        setCurrency,
        currencySymbol,
        formatPrice,
        selectedCategory,
        setSelectedCategory,
        activeCategoryPage,
        setActiveCategoryPage,
        householdMembers,
        setHouseholdMembers,
        toggleMemberEatingToday,
        addHouseholdMember,
        removeHouseholdMember,
        isFamilyShieldEnabled,
        setIsFamilyShieldEnabled,
        isCalendarPageOpen,
        setIsCalendarPageOpen,
        isCalendarModalOpen,
        setIsCalendarModalOpen,
        selectedPlanDay,
        setSelectedPlanDay,
        mealPlanSchedule,
        assignRecipeToPlan,
        timeOfDay,
        isAutoTime,
        setTimeOfDay,
        setIsAutoTime,
        themeMode,
        setThemeMode,
        colorThemeId,
        colorTheme,
        setColorThemeId,
        isDevOptionsOpen,
        setIsDevOptionsOpen,
        budgetCap,
        setBudgetCap,
        servingsPax,
        setServingsPax,
        costPerPerson,
        isBudgetModalOpen,
        setIsBudgetModalOpen,
        budgetModalStep,
        setBudgetModalStep,
        isSearchOpen,
        setIsSearchOpen,
        recentSearches,
        addRecentSearch,
        removeRecentSearch,
        clearRecentSearches,
        searchQuery,
        setSearchQuery,
        selectedDietFilter,
        setSelectedDietFilter,
        selectedDietaryPreferences,
        toggleDietaryPreference,
        selectedAllergenExclusions,
        toggleAllergenExclusion,
        resetFilters,
        isFiltersModalOpen,
        setIsFiltersModalOpen,
        activeFilterCount,
        activeRecipe,
        setActiveRecipe,
        isRecipeDetailOpen,
        setIsRecipeDetailOpen,
        isCookCountdownOpen,
        setIsCookCountdownOpen,
        countdownPhase,
        setCountdownPhase,
        ingredientStatuses,
        cycleIngredientStatus,
        checkedItems,
        toggleItemCheck,
        excludedStaples,
        toggleStapleExclusion,
        isPabiliOpen,
        setIsPabiliOpen,
        isPadeliverOpen,
        setIsPadeliverOpen,
        filteredRecipes,
        calculateRecipeBasket,
      }}
    >
      {children}
    </HainContext.Provider>
  );
}

export function useHain() {
  const context = useContext(HainContext);
  if (!context) {
    throw new Error('useHain must be used within a HainProvider');
  }
  return context;
}
