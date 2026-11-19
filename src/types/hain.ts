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
