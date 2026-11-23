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

export type TransportMode = 'walk' | 'commute' | 'car';

export interface MarketVenue {
  id: string;
  name: string;
  shortName: string;
  type: 'wetmarket' | 'supermarket';
  distanceKm: number;
  distanceMeters: number;
  walkMinutes: number;
  commuteMinutes: number;
  driveMinutes: number;
  walkability: 'High' | 'Moderate' | 'Low';
  walkabilityDesc: string;
  trafficLevel: 'Light' | 'Moderate' | 'Heavy';
  trafficDesc: string;
  commuteFare: number;
  address: string;
  badge: string;
  wholesaleRate: boolean;
  commonAlternativeId?: string;
  alternativeReason?: string;
}

export interface RegionLocation {
  id: string;
  name: string;
  shortName: string;
  region: string;
  provinceOrCity: string;
  lat: number;
  lng: number;
  isDefault?: boolean;
}

export const NEARBY_WET_MARKETS: MarketVenue[] = [
  {
    id: 'munoz',
    name: 'Muñoz Public Wet Market',
    shortName: 'Muñoz Palengke',
    type: 'wetmarket',
    distanceKm: 0.45,
    distanceMeters: 450,
    walkMinutes: 6,
    commuteMinutes: 5,
    driveMinutes: 4,
    walkability: 'High',
    walkabilityDesc: '6 mins walk • Safe sidewalk & pedestrian crossing',
    trafficLevel: 'Light',
    trafficDesc: 'Light interior market traffic',
    commuteFare: 13,
    address: 'Roosevelt Ave cor EDSA, Quezon City',
    badge: 'DA Bantay Presyo Partner',
    wholesaleRate: false,
  },
  {
    id: 'balintawak',
    name: 'Balintawak Cloverleaf Bagsakan',
    shortName: 'Balintawak Market',
    type: 'wetmarket',
    distanceKm: 1.8,
    distanceMeters: 1800,
    walkMinutes: 25,
    commuteMinutes: 28,
    driveMinutes: 18,
    walkability: 'Low',
    walkabilityDesc: '25 mins walk along busy EDSA highway & footbridges',
    trafficLevel: 'Heavy',
    trafficDesc: 'Heavy traffic at EDSA-Cloverleaf bottleneck',
    commuteFare: 15,
    address: 'A. Bonifacio Ave, Balintawak, Quezon City',
    badge: 'Wholesale Bagsakan (15-20% Cheaper)',
    wholesaleRate: true,
    commonAlternativeId: 'munoz',
    alternativeReason: 'Muñoz Public Wet Market is only 450m away (6 mins walk, zero traffic delay) with DA Bantay Presyo SRP rates.',
  },
  {
    id: 'frisco',
    name: 'Frisco Market (San Francisco del Monte)',
    shortName: 'Frisco Palengke',
    type: 'wetmarket',
    distanceKm: 1.4,
    distanceMeters: 1400,
    walkMinutes: 18,
    commuteMinutes: 12,
    driveMinutes: 8,
    walkability: 'Moderate',
    walkabilityDesc: '18 mins walk through residential side-streets',
    trafficLevel: 'Moderate',
    trafficDesc: 'Moderate neighborhood traffic',
    commuteFare: 25,
    address: 'Del Monte Ave, San Francisco del Monte, QC',
    badge: 'Talipapa & Neighborhood Cuts',
    wholesaleRate: false,
    commonAlternativeId: 'munoz',
    alternativeReason: 'Muñoz Public Wet Market is nearer (450m vs 1.4km) with zero transfer.',
  },
];

export const NEARBY_SUPERMARKETS: MarketVenue[] = [
  {
    id: 'puregold-munoz',
    name: 'Puregold Price Club Muñoz',
    shortName: 'Puregold Muñoz',
    type: 'supermarket',
    distanceKm: 0.35,
    distanceMeters: 350,
    walkMinutes: 5,
    commuteMinutes: 4,
    driveMinutes: 3,
    walkability: 'High',
    walkabilityDesc: '5 mins walk • Paved pedestrian walkway',
    trafficLevel: 'Light',
    trafficDesc: 'Smooth local access',
    commuteFare: 13,
    address: 'EDSA near Congressional Ave, Quezon City',
    badge: 'Best for Sachets, Condiments & Rice',
    wholesaleRate: false,
  },
  {
    id: 'waltermart-munoz',
    name: 'WalterMart Supermarket North EDSA',
    shortName: 'WalterMart Muñoz',
    type: 'supermarket',
    distanceKm: 0.5,
    distanceMeters: 500,
    walkMinutes: 7,
    commuteMinutes: 5,
    driveMinutes: 4,
    walkability: 'High',
    walkabilityDesc: '7 mins walk • Direct mall access',
    trafficLevel: 'Light',
    trafficDesc: 'Standard mall perimeter flow',
    commuteFare: 13,
    address: 'EDSA cor Roosevelt Ave, Quezon City',
    badge: 'Air-conditioned Quick Grocery',
    wholesaleRate: false,
  },
  {
    id: 'sm-cloverleaf',
    name: 'SM Supermarket Cloverleaf',
    shortName: 'SM Cloverleaf',
    type: 'supermarket',
    distanceKm: 1.9,
    distanceMeters: 1900,
    walkMinutes: 28,
    commuteMinutes: 30,
    driveMinutes: 20,
    walkability: 'Low',
    walkabilityDesc: '28 mins walk along EDSA highway choke points',
    trafficLevel: 'Heavy',
    trafficDesc: 'Heavy EDSA-North Expressway flyover gridlock',
    commuteFare: 15,
    address: 'A. Bonifacio Ave, Balingasa, Quezon City',
    badge: 'Complete Department & Supermarket',
    wholesaleRate: false,
    commonAlternativeId: 'puregold-munoz',
    alternativeReason: 'Puregold Muñoz is only 350m away (5 mins walk, zero traffic delay).',
  },
];

export const REGION_LOCATIONS: RegionLocation[] = [
  {
    id: 'munoz-balintawak',
    name: 'Muñoz / Balintawak, Quezon City',
    shortName: 'Muñoz, QC',
    region: 'NCR',
    provinceOrCity: 'Quezon City',
    lat: 14.6575,
    lng: 121.0210,
    isDefault: true,
  },
  {
    id: 'cubao-qc',
    name: 'Cubao / Farmers Market, Quezon City',
    shortName: 'Cubao, QC',
    region: 'NCR',
    provinceOrCity: 'Quezon City',
    lat: 14.6195,
    lng: 121.0510,
  },
  {
    id: 'divisoria-manila',
    name: 'Divisoria / Tondo, City of Manila',
    shortName: 'Divisoria, Manila',
    region: 'NCR',
    provinceOrCity: 'Manila',
    lat: 14.6042,
    lng: 120.9708,
  },
  {
    id: 'marikina-city',
    name: 'Marikina Public Market',
    shortName: 'Marikina City',
    region: 'NCR',
    provinceOrCity: 'Marikina',
    lat: 14.6333,
    lng: 121.0967,
  },
  {
    id: 'pampanga-san-fernando',
    name: 'San Fernando Public Market, Pampanga',
    shortName: 'Pampanga',
    region: 'Region III',
    provinceOrCity: 'Pampanga',
    lat: 15.0285,
    lng: 120.6896,
  },
  {
    id: 'antipolo-rizal',
    name: 'Antipolo City Public Market, Rizal',
    shortName: 'Antipolo, Rizal',
    region: 'Region IV-A',
    provinceOrCity: 'Rizal',
    lat: 14.5842,
    lng: 121.1764,
  },
  {
    id: 'cebu-carbon',
    name: 'Carbon Market, Cebu City',
    shortName: 'Cebu City',
    region: 'Region VII',
    provinceOrCity: 'Cebu',
    lat: 10.2929,
    lng: 123.8990,
  },
  {
    id: 'davao-bankerohan',
    name: 'Bankerohan Public Market, Davao City',
    shortName: 'Davao City',
    region: 'Region XI',
    provinceOrCity: 'Davao del Sur',
    lat: 7.0673,
    lng: 125.6033,
  },
];

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
