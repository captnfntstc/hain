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
    flag: 'PH',
    isOfficial: true,
  },
  {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    localName: 'US Dollar',
    flag: 'US',
  },
  {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    localName: 'Euro',
    flag: 'EU',
  },
  {
    code: 'JPY',
    symbol: '¥',
    name: 'Japanese Yen',
    localName: 'Japanese Yen',
    flag: 'JP',
  },
  {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    localName: 'British Pound',
    flag: 'GB',
  },
  {
    code: 'SGD',
    symbol: 'S$',
    name: 'Singapore Dollar',
    localName: 'Singapore Dollar',
    flag: 'SG',
  },
  {
    code: 'CAD',
    symbol: 'CA$',
    name: 'Canadian Dollar',
    localName: 'Canadian Dollar',
    flag: 'CA',
  },
  {
    code: 'AED',
    symbol: 'AED',
    name: 'UAE Dirham',
    localName: 'UAE Dirham',
    flag: 'AE',
  },
  {
    code: 'SAR',
    symbol: 'SAR',
    name: 'Saudi Riyal',
    localName: 'Saudi Riyal',
    flag: 'SA',
  },
];

export type ActiveTab = 'home' | 'search' | 'list' | 'kusina' | 'leftovers' | 'more';

export type MoreSubpage = 'menu' | 'profile' | 'household' | 'palengke' | 'settings' | 'language' | 'currency' | 'transport';

export interface AddressAnchorItem {
  id: string;
  name: string;
  shortName: string;
  barangayOrDistrict: string;
  city: string;
  mapX: number;
  mapY: number;
  lat: number;
  lng: number;
  landmarkNote: string;
}

export const PRESET_ADDRESS_ANCHORS: AddressAnchorItem[] = [
  {
    id: 'dangay-54',
    name: '54 Dangay St, Veterans Village, Project 7, Quezon City',
    shortName: '54 Dangay St',
    barangayOrDistrict: 'Veterans Village, Project 7',
    city: 'Quezon City',
    mapX: 500,
    mapY: 500,
    lat: 14.6565,
    lng: 121.0189,
    landmarkNote: '250m mula sa Muñoz Market • Katabi ng FPJ Ave',
  },
  {
    id: 'roosevelt-edsa',
    name: 'Roosevelt Ave (FPJ Ave) cor EDSA, Muñoz, Quezon City',
    shortName: 'Roosevelt / EDSA',
    barangayOrDistrict: 'Muñoz / Veterans Village',
    city: 'Quezon City',
    mapX: 515,
    mapY: 480,
    lat: 14.6575,
    lng: 121.0198,
    landmarkNote: 'LRT-1 FPJ Station & Muñoz Market junction',
  },
  {
    id: 'bansalangin-proj7',
    name: 'Bansalangin St, Veterans Village, Project 7, Quezon City',
    shortName: 'Bansalangin St',
    barangayOrDistrict: 'Veterans Village',
    city: 'Quezon City',
    mapX: 480,
    mapY: 515,
    lat: 14.6558,
    lng: 121.0180,
    landmarkNote: 'Residential inner street near Muñoz',
  },
  {
    id: 'shorthorn-proj8',
    name: '12 Short Horn St, Project 8, Quezon City',
    shortName: 'Short Horn St',
    barangayOrDistrict: 'Project 8 / Bahay Toro',
    city: 'Quezon City',
    mapX: 430,
    mapY: 530,
    lat: 14.6592,
    lng: 121.0235,
    landmarkNote: 'Tapat ng Dali Everyday Grocery Short Horn',
  },
  {
    id: 'congressional-proj8',
    name: 'Congressional Ave near EDSA, Project 8, Quezon City',
    shortName: 'Congressional Ave',
    barangayOrDistrict: 'Project 8',
    city: 'Quezon City',
    mapX: 680,
    mapY: 340,
    lat: 14.6645,
    lng: 121.0310,
    landmarkNote: 'Malapit sa S&R Membership Shopping',
  },
  {
    id: 'balintawak-bonifacio',
    name: 'A. Bonifacio Ave, Balintawak, Quezon City',
    shortName: 'Balintawak / Cloverleaf',
    barangayOrDistrict: 'Balintawak / Balingasa',
    city: 'Quezon City',
    mapX: 250,
    mapY: 280,
    lat: 14.6580,
    lng: 121.0040,
    landmarkNote: 'Katabi ng Balintawak Cloverleaf Bagsakan',
  },
  {
    id: 'frisco-delmonte',
    name: 'Del Monte Ave cor Roosevelt, San Francisco Del Monte, QC',
    shortName: 'Frisco / Del Monte',
    barangayOrDistrict: 'San Francisco Del Monte',
    city: 'Quezon City',
    mapX: 380,
    mapY: 660,
    lat: 14.6420,
    lng: 121.0120,
    landmarkNote: 'Malapit sa Frisco Talipapa at San Pedro Bautista',
  },
  {
    id: 'north-ave-sm',
    name: 'North Avenue cor EDSA, Quezon City',
    shortName: 'North Avenue / SM',
    barangayOrDistrict: 'Bagong Pag-asa',
    city: 'Quezon City',
    mapX: 740,
    mapY: 580,
    lat: 14.6530,
    lng: 121.0325,
    landmarkNote: 'SM City North EDSA Complex & MRT-3',
  },
];

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

export type TransportMode = 'dynamic' | 'walk' | 'commute' | 'car';

export function formatStoreTravelTime(store: MarketVenue, mode: TransportMode): string {
  if (mode === 'walk') {
    return `${store.walkMinutes} mins lakad`;
  }
  if (mode === 'commute') {
    return `~${store.commuteMinutes} mins commute (₱${store.commuteFare})`;
  }
  if (mode === 'car') {
    return `~${store.driveMinutes} mins biyahe`;
  }
  // Dynamic mode: choose most practical mode based on distance
  if (store.distanceKm <= 0.6) {
    return `${store.walkMinutes} mins lakad (Walking distance)`;
  }
  return `~${store.commuteMinutes} mins commute / ${store.driveMinutes} mins biyahe`;
}

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
  mapX: number; // SVG map coordinate relative to center (0 to 1000)
  mapY: number;
  radiusTier: 500 | 1500 | 3000 | 5000; // minimum radius in meters to reveal
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
    mapX: 520,
    mapY: 460,
    radiusTier: 500,
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
    mapX: 250,
    mapY: 280,
    radiusTier: 3000,
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
    mapX: 380,
    mapY: 660,
    radiusTier: 1500,
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
    mapX: 470,
    mapY: 480,
    radiusTier: 500,
  },
  {
    id: 'dali-shorthorn',
    name: 'Dali Everyday Grocery Short Horn',
    shortName: 'Dali Short Horn',
    type: 'supermarket',
    distanceKm: 0.4,
    distanceMeters: 400,
    walkMinutes: 5,
    commuteMinutes: 4,
    driveMinutes: 3,
    walkability: 'High',
    walkabilityDesc: '5 mins walk through neighborhood street',
    trafficLevel: 'Light',
    trafficDesc: 'Quiet residential access',
    commuteFare: 13,
    address: 'Short Horn St, Project 8, Quezon City',
    badge: 'Hard-Discount Eggs, Oil & Canned Goods',
    wholesaleRate: false,
    mapX: 430,
    mapY: 530,
    radiusTier: 500,
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
    mapX: 540,
    mapY: 510,
    radiusTier: 500,
  },
  {
    id: 'snr-congressional',
    name: 'S&R Membership Shopping Congressional',
    shortName: 'S&R Congressional',
    type: 'supermarket',
    distanceKm: 1.3,
    distanceMeters: 1300,
    walkMinutes: 17,
    commuteMinutes: 10,
    driveMinutes: 6,
    walkability: 'Moderate',
    walkabilityDesc: '17 mins walk along Congressional Ave',
    trafficLevel: 'Moderate',
    trafficDesc: 'Standard Congressional Ave flow',
    commuteFare: 13,
    address: 'Congressional Ave near EDSA, Project 8, QC',
    badge: 'Warehouse Club • Bulk Meats & Fresh Deli',
    wholesaleRate: true,
    mapX: 680,
    mapY: 340,
    radiusTier: 1500,
  },
  {
    id: 'sm-north',
    name: 'SM City North EDSA Hypermarket',
    shortName: 'SM North EDSA',
    type: 'supermarket',
    distanceKm: 1.5,
    distanceMeters: 1500,
    walkMinutes: 20,
    commuteMinutes: 15,
    driveMinutes: 8,
    walkability: 'Moderate',
    walkabilityDesc: '20 mins walk via MRT pedestrian walkway',
    trafficLevel: 'Moderate',
    trafficDesc: 'EDSA-North Ave flow',
    commuteFare: 13,
    address: 'EDSA cor North Ave, Quezon City',
    badge: 'Large Hypermarket & Complete Pantry Items',
    wholesaleRate: false,
    mapX: 740,
    mapY: 530,
    radiusTier: 1500,
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
    mapX: 210,
    mapY: 260,
    radiusTier: 3000,
  },
  {
    id: 'landers-balintawak',
    name: 'Landers Superstore Balintawak',
    shortName: 'Landers Balintawak',
    type: 'supermarket',
    distanceKm: 2.2,
    distanceMeters: 2200,
    walkMinutes: 32,
    commuteMinutes: 25,
    driveMinutes: 15,
    walkability: 'Low',
    walkabilityDesc: '32 mins walk along EDSA highway',
    trafficLevel: 'Heavy',
    trafficDesc: 'Heavy Balintawak interchange traffic',
    commuteFare: 15,
    address: '1240 EDSA, Balintawak, Quezon City',
    badge: 'Superstore • Imported Cuts & Fresh Deli',
    wholesaleRate: true,
    commonAlternativeId: 'puregold-munoz',
    alternativeReason: 'Puregold Muñoz or S&R Congressional are nearer with lighter traffic.',
    mapX: 180,
    mapY: 310,
    radiusTier: 3000,
  },
];

export const ALL_MAP_STORES: MarketVenue[] = [
  ...NEARBY_WET_MARKETS,
  ...NEARBY_SUPERMARKETS,
].sort((a, b) => a.distanceMeters - b.distanceMeters);

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

export type RiceType = 'sinandomeng' | 'dinorado' | 'jasmine' | 'brown';

export interface RiceVarietyInfo {
  id: RiceType;
  name: string;
  tagalogName: string;
  grade: string;
  pricePerKg: number;
  descriptionTl: string;
  descriptionEn: string;
}

export const RICE_VARIETIES: RiceVarietyInfo[] = [
  {
    id: 'sinandomeng',
    name: 'Sinandomeng',
    tagalogName: 'Sinandomeng (Regular Milled)',
    grade: 'Regular Milled',
    pricePerKg: 50,
    descriptionTl: 'Karaniwang bigas para sa araw-araw, malambot at siksik.',
    descriptionEn: 'Daily staple regular-milled rice, soft and filling.',
  },
  {
    id: 'dinorado',
    name: 'Dinorado',
    tagalogName: 'Dinorado (Well Milled)',
    grade: 'Well Milled',
    pricePerKg: 56,
    descriptionTl: 'Mabango, maputi, at pino ang lambot ng bawat butil.',
    descriptionEn: 'Naturally fragrant, clean white, and tender grains.',
  },
  {
    id: 'jasmine',
    name: 'Jasmine / Milagrosa',
    tagalogName: 'Jasmine / Milagrosa (Premium)',
    grade: 'Premium Fragrant',
    pricePerKg: 64,
    descriptionTl: 'Extra malambot at mabangong espesyal para sa masasarap na ulam.',
    descriptionEn: 'Fluffy and aromatic premium grain, best for rich Filipino dishes.',
  },
  {
    id: 'brown',
    name: 'Brown / Red Rice',
    tagalogName: 'Brown / Red Rice (Whole Grain)',
    grade: 'Whole Grain / Low GI',
    pricePerKg: 75,
    descriptionTl: 'Mataas sa fiber at mineral, mabuti sa kalusugan at blood sugar.',
    descriptionEn: 'Nutrient-rich unpolished grain with lower glycemic index.',
  },
];

export function formatRiceKg(kilos: number): string {
  if (kilos === 0.25) return '1/4 kg';
  if (kilos === 0.5) return '1/2 kg';
  if (kilos === 0.75) return '3/4 kg';
  if (kilos === 1) return '1 kg';
  if (kilos === 1.25) return '1 1/4 kg';
  if (kilos === 1.5) return '1 1/2 kg';
  if (kilos === 1.75) return '1 3/4 kg';
  if (kilos === 2) return '2 kg';
  if (kilos === 2.5) return '2 1/2 kg';
  if (kilos === 3) return '3 kg';
  if (kilos === 4) return '4 kg';
  if (kilos === 5) return '5 kg';
  if (Number.isInteger(kilos)) return `${kilos} kg`;
  return `${kilos.toFixed(2)} kg`;
}

export function calculateRecommendedRiceKilos(pax: number, mealCount: number = 2): number {
  // Standard Philippine household guideline:
  // 1 adult serving per meal ≈ 100g (0.1 kg) uncooked rice (≈ 0.5 cup raw / ~1 cup cooked).
  // mealCount: 1 = lunch only (0.1kg/pax), 2 = lunch & dinner (0.2kg/pax), 3 = 3 meals (0.25kg/pax).
  const ratePerPax = mealCount === 1 ? 0.1 : mealCount === 3 ? 0.25 : 0.2;
  const rawKilos = Math.max(1, pax) * ratePerPax;
  // Snap to nearest 0.25 kg (1/4 kg)
  return Math.max(0.25, Math.round(rawKilos * 4) / 4);
}

