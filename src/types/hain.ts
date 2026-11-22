export type TimeOfDayState = 'morning' | 'lunch' | 'dinner' | 'midnight';

export type ThemeMode = 'light' | 'dark' | 'system';

export type StoreType = 'palengke' | 'supermarket' | 'talipapa' | 'online';

export type CookingEquipment = 'rice-cooker' | '15min-gas' | 'no-cook' | 'standard';

export type IngredientStatus = 'to-buy' | 'bought' | 'stocked';

export type CurrencyCode = 'PHP' | 'USD' | 'EUR' | 'JPY' | 'GBP' | 'SGD' | 'CAD' | 'AED' | 'SAR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  localName: string;
  flag: string;
  isOfficial?: boolean;
}

export const SUPPORTED_CURRENCIES: CurrencyConfig[] = [
  {
    code: 'PHP',
    symbol: '₱',
    name: 'Philippine Peso',
    localName: 'Piso ng Pilipinas',
    flag: '🇵🇭',
    isOfficial: true,
  },
  {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    localName: 'US Dollar',
    flag: '🇺🇸',
  },
  {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    localName: 'Euro',
    flag: '🇪🇺',
  },
  {
    code: 'JPY',
    symbol: '¥',
    name: 'Japanese Yen',
    localName: 'Japanese Yen',
    flag: '🇯🇵',
  },
  {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    localName: 'British Pound',
    flag: '🇬🇧',
  },
  {
    code: 'SGD',
    symbol: 'S$',
    name: 'Singapore Dollar',
    localName: 'Singapore Dollar',
    flag: '🇸🇬',
  },
  {
    code: 'CAD',
    symbol: 'CA$',
    name: 'Canadian Dollar',
    localName: 'Canadian Dollar',
    flag: '🇨🇦',
  },
  {
    code: 'AED',
    symbol: 'AED',
    name: 'UAE Dirham',
    localName: 'UAE Dirham',
    flag: '🇦🇪',
  },
  {
    code: 'SAR',
    symbol: 'SAR',
    name: 'Saudi Riyal',
    localName: 'Saudi Riyal',
    flag: '🇸🇦',
  },
];

export type ActiveTab = 'home' | 'search' | 'list' | 'kusina' | 'leftovers' | 'more';

export interface HouseholdMember {
  id: string;
  name: string;
  relationship: string;
  avatar: string;
  allergens: string[];
  dietaryRestrictions: string[];
  isEatingToday: boolean;
}

export interface MealPlanDay {
  id: string;
  dayName: string;
  dateLabel: string;
  lunchRecipeId?: string;
  dinnerRecipeId?: string;
}

export interface Ingredient {
  id: string;
  name: string;
  localName: string;
  category: 'meat-seafood' | 'vegetables' | 'condiments' | 'dry-goods' | 'pantry-staple';
  quantity: string;
  weightGrams?: number;
  estimatedPrice: number;
  storeSource: string;
  storeType: StoreType;
  isPantryStaple: boolean;
  isExcluded: boolean;
  actualPrice?: number;
  isChecked?: boolean;
  swapAlternative?: {
    originalIngredient: string;
    swapName: string;
    savings: number;
    description: string;
  };
}

export interface CookingStep {
  stepNumber: number;
  title: string;
  instruction: string;
  timerSeconds?: number;
  tip?: string;
  tags?: string[];
}

export interface Recipe {
  id: string;
  title: string;
  tagline: string;
  localName: string;
  source: string;
  rating: number;
  description: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  estimatedPrice: number;
  equipment: CookingEquipment;
  tier: 'tipid' | 'budget' | 'family';
  ingredients: Ingredient[];
  prepSteps: { stepNumber: number; title: string; instruction: string; tags: string[] }[];
  cookSteps: { stepNumber: number; title: string; instruction: string }[];
  image: string;
  tags: string[];
  allergens: string[];
  isSagipUlam?: boolean;
  leftoverBase?: string;
}

export interface Store {
  id: string;
  name: string;
  type: StoreType;
  distanceKm: number;
  estimatedTravelTime: string;
  address: string;
  badgeText: string;
  rating: number;
  acceptsCash: boolean;
  acceptsGcash: boolean;
}

export interface DeliveryPlatform {
  id: string;
  name: string;
  logo: string;
  deliveryFee: number;
  eta: string;
  minimumSpend: number;
  available: boolean;
}

export interface PantryStapleItem {
  id: string;
  name: string;
  localName: string;
  defaultExcluded: boolean;
}

export type PrimaryColorThemeId = 'warm-red' | 'sage-green' | 'warm-yellow' | 'off-white';

export interface ColorThemeConfig {
  id: PrimaryColorThemeId;
  name: string;
  tagline: string;
  headerBg: string;
  headerText: string;
  headerSubtext: string;
  headerTrackedText: string;
  headerIconBorder: string;
  badgeBg: string;
  badgeIconColor: string;
  accentColor: string;
  accentSubtle: string;
  shieldBadgeBg: string;
  shieldBadgeText: string;
  tabActiveColor: string;
  previewGradient: string;
}

export const COLOR_THEMES: Record<PrimaryColorThemeId, ColorThemeConfig> = {
  'warm-red': {
    id: 'warm-red',
    name: 'Warm Orange or Red Primary',
    tagline: 'Warm Terracotta & Filipino Spice',
    headerBg: '#B8381D',
    headerText: '#FFFFFF',
    headerSubtext: 'rgba(255, 255, 255, 0.85)',
    headerTrackedText: '#FFFFFF',
    headerIconBorder: 'rgba(255, 255, 255, 0.25)',
    badgeBg: '#B8381D',
    badgeIconColor: '#FFFFFF',
    accentColor: '#B8381D',
    accentSubtle: 'rgba(184, 56, 29, 0.1)',
    shieldBadgeBg: '#FDECE8',
    shieldBadgeText: '#B8381D',
    tabActiveColor: '#B8381D',
    previewGradient: 'from-[#B8381D] to-[#9E2B14]',
  },
  'sage-green': {
    id: 'sage-green',
    name: 'Soft Green / Sage Primary',
    tagline: 'Lush Banana Leaf & Fresh Gulay',
    headerBg: '#365840',
    headerText: '#FFFFFF',
    headerSubtext: 'rgba(255, 255, 255, 0.85)',
    headerTrackedText: '#FFFFFF',
    headerIconBorder: 'rgba(255, 255, 255, 0.25)',
    badgeBg: '#365840',
    badgeIconColor: '#FFFFFF',
    accentColor: '#365840',
    accentSubtle: 'rgba(54, 88, 64, 0.1)',
    shieldBadgeBg: '#EAF2EC',
    shieldBadgeText: '#2E4F36',
    tabActiveColor: '#365840',
    previewGradient: 'from-[#3D6449] to-[#2E4F36]',
  },
  'warm-yellow': {
    id: 'warm-yellow',
    name: 'Warm Yellow Primary',
    tagline: 'Golden Turmeric & Calamansi Warmth',
    headerBg: '#DB9F1D',
    headerText: '#2B1D0B',
    headerSubtext: '#4A361E',
    headerTrackedText: '#2B1D0B',
    headerIconBorder: 'rgba(43, 29, 11, 0.2)',
    badgeBg: '#DB9F1D',
    badgeIconColor: '#FFFFFF',
    accentColor: '#B8800B',
    accentSubtle: 'rgba(219, 159, 29, 0.12)',
    shieldBadgeBg: '#FEF7E6',
    shieldBadgeText: '#8C6308',
    tabActiveColor: '#B8800B',
    previewGradient: 'from-[#DB9F1D] to-[#BF8810]',
  },
  'off-white': {
    id: 'off-white',
    name: 'Off-White / Light Gray Primary',
    tagline: 'Minimalist Clay & Crisp Editorial',
    headerBg: '#EDEBE6',
    headerText: '#1C1917',
    headerSubtext: '#57534E',
    headerTrackedText: '#1C1917',
    headerIconBorder: 'rgba(28, 25, 23, 0.2)',
    badgeBg: '#4A4541',
    badgeIconColor: '#FFFFFF',
    accentColor: '#292524',
    accentSubtle: 'rgba(41, 37, 36, 0.08)',
    shieldBadgeBg: '#E7E5E4',
    shieldBadgeText: '#292524',
    tabActiveColor: '#292524',
    previewGradient: 'from-[#EDEBE6] to-[#DCD9D1]',
  },
};
