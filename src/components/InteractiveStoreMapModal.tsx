'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useHain } from '../context/HainContext';
import { 
  X, 
  MapPin, 
  Navigation, 
  Footprints, 
  Bus, 
  Car, 
  Store, 
  ShoppingBag, 
  Check, 
  AlertTriangle, 
  ZoomIn, 
  ZoomOut, 
  LocateFixed, 
  ChevronRight,
  Sparkles,
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import { ALL_MAP_STORES, MarketVenue, TransportMode } from '../types/hain';

export default function InteractiveStoreMapModal() {
  const {
    isStoreMapOpen,
    setIsStoreMapOpen,
    preferredWetMarketId,
    setPreferredWetMarketId,
    preferredSupermarketId,
    setPreferredSupermarketId,
    selectWetMarketWithCheck,
    selectSupermarketWithCheck,
    transportMode,
    setTransportMode,
    language,
    colorTheme,
  } = useHain();

  const isTagalog = language === 'tl';

  // Selected Store ID on Map
  const [activeStoreId, setActiveStoreId] = useState<string>('munoz');
  
  // Radius filter in meters: 500, 1500, 3000, 5000
  const [selectedRadius, setSelectedRadius] = useState<number>(1500);

  // Store filter: 'all' | 'wetmarket' | 'supermarket'
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'wetmarket' | 'supermarket'>('all');

  // Map panning & zoom state (viewBox relative to 1000x1000 map canvas)
  const [mapCenter, setMapCenter] = useState<{ x: number; y: number }>({ x: 500, y: 500 });
  const [zoomLevel, setZoomLevel] = useState<number>(1.2); // 0.8 (zoomed out) to 2.2 (zoomed in)

  // Carousel & Map refs
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const mapSvgRef = useRef<SVGSVGElement>(null);
  const isProgrammaticScroll = useRef<boolean>(false);

  // Filtered stores based on category and radius
  const visibleStores = useMemo(() => {
    return ALL_MAP_STORES.filter((store) => {
      const matchCat = categoryFilter === 'all' || store.type === categoryFilter;
      const matchRadius = store.radiusTier <= selectedRadius;
      return matchCat && matchRadius;
    });
  }, [categoryFilter, selectedRadius]);

  const activeStore = useMemo(() => {
    return ALL_MAP_STORES.find((s) => s.id === activeStoreId) || ALL_MAP_STORES[0];
  }, [activeStoreId]);

  // Center map on a specific store's coordinates
  const centerOnStore = useCallback((store: MarketVenue) => {
    setMapCenter({ x: store.mapX, y: store.mapY });
    // If store is outside current radius, automatically expand radius so it's revealed
    if (store.radiusTier > selectedRadius) {
      setSelectedRadius(store.radiusTier);
    }
  }, [selectedRadius]);

  // Scroll horizontal picker carousel to a specific store card
  const scrollCarouselToStore = useCallback((storeId: string) => {
    const cardEl = cardRefs.current[storeId];
    if (cardEl && carouselRef.current) {
      isProgrammaticScroll.current = true;
      cardEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 400);
    }
  }, []);

  // When user clicks a store pin on the map
  const handlePinClick = useCallback((store: MarketVenue) => {
    setActiveStoreId(store.id);
    centerOnStore(store);
    scrollCarouselToStore(store.id);
  }, [centerOnStore, scrollCarouselToStore]);

  // Two-way synchronization: When horizontal carousel scrolls, update active store & center map
  const handleCarouselScroll = useCallback(() => {
    if (isProgrammaticScroll.current || !carouselRef.current) return;
    
    const container = carouselRef.current;
    const containerCenter = container.getBoundingClientRect().left + container.offsetWidth / 2;

    let closestStoreId = activeStoreId;
    let minDistance = Infinity;

    visibleStores.forEach((store) => {
      const card = cardRefs.current[store.id];
      if (card) {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const dist = Math.abs(containerCenter - cardCenter);
        if (dist < minDistance) {
          minDistance = dist;
          closestStoreId = store.id;
        }
      }
    });

    if (closestStoreId !== activeStoreId) {
      setActiveStoreId(closestStoreId);
      const target = ALL_MAP_STORES.find((s) => s.id === closestStoreId);
      if (target) {
        setMapCenter({ x: target.mapX, y: target.mapY });
      }
    }
  }, [activeStoreId, visibleStores]);

  // Center on user location (Muñoz / Roosevelt Ave cor EDSA, QC)
  const centerOnUser = () => {
    setMapCenter({ x: 500, y: 500 });
    setZoomLevel(1.2);
  };

  // Zoom controls
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(2.4, prev + 0.3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const next = Math.max(0.7, prev - 0.3);
      if (next < 1.0 && selectedRadius < 3000) {
        setSelectedRadius(3000); // revealing more stores on pinch out
      }
      return next;
    });
  };

  // Radius change: when zooming out or picking wider radius, reveal more stores
  const handleRadiusChange = (radius: number) => {
    setSelectedRadius(radius);
    if (radius === 500) setZoomLevel(1.5);
    else if (radius === 1500) setZoomLevel(1.2);
    else if (radius === 3000) setZoomLevel(0.9);
  };

  // Touch pinch-to-zoom on map
  const touchStartDist = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchStartDist.current = Math.hypot(dx, dy);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchStartDist.current !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const diff = dist - touchStartDist.current;

      if (Math.abs(diff) > 20) {
        if (diff > 0) {
          // Pinching out (expanding view / revealing more)
          handleZoomOut();
        } else {
          // Pinching in (zooming into detail)
          handleZoomIn();
        }
        touchStartDist.current = dist;
      }
    }
  };

  const handleTouchEnd = () => {
    touchStartDist.current = null;
  };

  // Handle selecting the store as active preferred store in Hain state
  const handleSelectStore = (store: MarketVenue) => {
    if (store.type === 'wetmarket') {
      selectWetMarketWithCheck(store.id);
    } else {
      selectSupermarketWithCheck(store.id);
    }
    setIsStoreMapOpen(false);
  };

  if (!isStoreMapOpen) return null;

  // Compute SVG viewBox based on mapCenter and zoomLevel
  const boxWidth = 1000 / zoomLevel;
  const boxHeight = 850 / zoomLevel;
  const viewBoxMinX = Math.max(0, Math.min(1000 - boxWidth, mapCenter.x - boxWidth / 2));
  const viewBoxMinY = Math.max(0, Math.min(1000 - boxHeight, mapCenter.y - boxHeight / 2));
  const viewBox = `${viewBoxMinX} ${viewBoxMinY} ${boxWidth} ${boxHeight}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex flex-col justify-between overflow-hidden animate-in fade-in duration-200">
      
      {/* TOP FLOATING NAVIGATION & CONTROLS */}
      <div className="absolute top-0 left-0 right-0 z-20 px-4 pt-10 pb-3 bg-gradient-to-b from-stone-900/90 via-stone-900/60 to-transparent flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          {/* Location & Title Chip */}
          <div className="flex items-center gap-2 bg-stone-900/80 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full border border-white/20 shadow-md">
            <Compass className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold font-sans">
              {isTagalog ? 'Mapa ng mga Palengke at Grocery' : 'Live Store Map & Radar'}
            </span>
            <span className="text-[10px] text-amber-300 font-semibold">• Muñoz, QC</span>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsStoreMapOpen(false)}
            className="w-10 h-10 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all active:scale-95 shadow-md"
            aria-label="Close Map"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Radius Filter Pills */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar pt-1">
          <div className="flex items-center gap-1.5 bg-stone-900/70 backdrop-blur-md p-1 rounded-full border border-white/15">
            {[500, 1500, 3000].map((rad) => {
              const isSelected = selectedRadius === rad;
              const label = rad === 500 ? '500m (Walking)' : rad === 1500 ? '1.5 km (S&R / SM)' : '3.0 km (Bagsakan)';
              return (
                <button
                  key={rad}
                  type="button"
                  onClick={() => handleRadiusChange(rad)}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all tap-spring whitespace-nowrap ${
                    isSelected
                      ? 'bg-amber-400 text-stone-950 shadow-sm'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Mode of Transpo Selector */}
          <div className="flex items-center gap-1 bg-stone-900/70 backdrop-blur-md p-1 rounded-full border border-white/15 shrink-0">
            {[
              { id: 'walk' as TransportMode, icon: <Footprints className="w-3.5 h-3.5" />, title: 'Lakad' },
              { id: 'commute' as TransportMode, icon: <Bus className="w-3.5 h-3.5" />, title: 'Commute' },
              { id: 'car' as TransportMode, icon: <Car className="w-3.5 h-3.5" />, title: 'Kotse' },
            ].map((m) => {
              const active = transportMode === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setTransportMode(m.id)}
                  title={m.title}
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all tap-spring ${
                    active ? 'bg-[#B8381D] text-white shadow-xs' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {m.icon}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* INTERACTIVE VECTOR MAP CANVAS */}
      <div 
        className="relative flex-1 w-full h-full bg-[#EFEADF] overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <svg
          ref={mapSvgRef}
          viewBox={viewBox}
          className="w-full h-full transition-all duration-300 ease-out"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Green park texture */}
            <pattern id="parkPattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="40" height="40" fill="#E2EED9" />
              <circle cx="20" cy="20" r="1.5" fill="#C5DEB6" />
            </pattern>
            {/* Radar wave pulse animation */}
            <radialGradient id="radarPulse" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
              <stop offset="70%" stopColor="#3B82F6" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* BASE MAP BLOCKS & URBAN GREENERY */}
          <rect x="0" y="0" width="1000" height="1000" fill="#EFEADF" />
          
          {/* Parks & Open Spaces (Veterans Memorial, Cloverleaf Park, San Francisco Park) */}
          <rect x="700" y="600" width="280" height="350" rx="20" fill="url(#parkPattern)" />
          <text x="820" y="760" fill="#8DA67E" fontSize="14" fontWeight="bold" fontFamily="sans-serif">Veterans Green</text>
          
          <rect x="50" y="60" width="220" height="180" rx="16" fill="url(#parkPattern)" />
          <text x="110" y="150" fill="#8DA67E" fontSize="13" fontWeight="bold" fontFamily="sans-serif">Balintawak Area</text>

          <rect x="560" y="80" width="320" height="180" rx="16" fill="#E8E2D4" />
          <text x="660" y="170" fill="#A89E8C" fontSize="13" fontWeight="bold" fontFamily="sans-serif">Project 8 Residential</text>

          <rect x="80" y="620" width="340" height="260" rx="16" fill="#E8E2D4" />
          <text x="180" y="750" fill="#A89E8C" fontSize="13" fontWeight="bold" fontFamily="sans-serif">Frisco / SFDM District</text>

          {/* PREDEFINED RADIUS RADAR CIRCLES AROUND USER (500, 500) */}
          {/* 3000m radius circle */}
          <circle 
            cx="500" 
            cy="500" 
            r="380" 
            fill={selectedRadius >= 3000 ? 'url(#radarPulse)' : 'none'} 
            stroke="#C9BBA5" 
            strokeWidth="1.5" 
            strokeDasharray="6 6" 
          />
          <text x="505" y="130" fill="#A39682" fontSize="11" fontWeight="bold" fontFamily="sans-serif">3.0 km Radius</text>

          {/* 1500m radius circle */}
          <circle 
            cx="500" 
            cy="500" 
            r="240" 
            fill={selectedRadius >= 1500 ? 'url(#radarPulse)' : 'none'} 
            stroke="#B5A58D" 
            strokeWidth="1.8" 
            strokeDasharray="4 4" 
          />
          <text x="505" y="270" fill="#8C7A62" fontSize="11" fontWeight="bold" fontFamily="sans-serif">1.5 km (S&R • SM • Frisco)</text>

          {/* 500m radius circle */}
          <circle 
            cx="500" 
            cy="500" 
            r="90" 
            fill="url(#radarPulse)" 
            stroke="#B8381D" 
            strokeWidth="2" 
            strokeDasharray="2 3" 
          />
          <text x="505" y="420" fill="#B8381D" fontSize="10" fontWeight="bold" fontFamily="sans-serif">500m Walking Zone</text>

          {/* MAJOR THOROUGHFARES / ROADS */}
          {/* EDSA (Major highway diagonal connecting Balintawak to North Ave) */}
          <path 
            d="M 120 180 L 320 320 L 500 500 L 720 620 L 940 760" 
            stroke="#F59E0B" 
            strokeWidth="28" 
            strokeLinecap="round" 
            fill="none" 
            opacity="0.25"
          />
          <path 
            d="M 120 180 L 320 320 L 500 500 L 720 620 L 940 760" 
            stroke="#FFFFFF" 
            strokeWidth="22" 
            strokeLinecap="round" 
            fill="none" 
          />
          <path 
            d="M 120 180 L 320 320 L 500 500 L 720 620 L 940 760" 
            stroke="#F59E0B" 
            strokeWidth="4" 
            strokeDasharray="10 8" 
            strokeLinecap="round" 
            fill="none" 
          />
          <text x="240" y="275" transform="rotate(32, 240, 275)" fill="#B45309" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
            E D S A  (HIGHWAY)
          </text>
          <text x="610" y="565" transform="rotate(30, 610, 565)" fill="#B45309" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
            E D S A  (NORTH AVE MRT)
          </text>

          {/* Roosevelt Ave / Fernando Poe Jr. Ave (Connecting South-West to EDSA) */}
          <path 
            d="M 280 880 L 500 500 L 580 340 L 700 120" 
            stroke="#FFFFFF" 
            strokeWidth="16" 
            strokeLinecap="round" 
            fill="none" 
          />
          <text x="350" y="690" transform="rotate(-60, 350, 690)" fill="#78716C" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
            ROOSEVELT / FPJ AVE
          </text>

          {/* Congressional Avenue (Leading to S&R) */}
          <path 
            d="M 480 480 L 680 340 L 920 220" 
            stroke="#FFFFFF" 
            strokeWidth="18" 
            strokeLinecap="round" 
            fill="none" 
          />
          <text x="590" y="415" transform="rotate(-32, 590, 415)" fill="#1E3A8A" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
            CONGRESSIONAL AVE (S&R)
          </text>

          {/* A. Bonifacio Ave (Leading to Balintawak Cloverleaf) */}
          <path 
            d="M 160 380 L 260 270 L 360 140" 
            stroke="#FFFFFF" 
            strokeWidth="16" 
            strokeLinecap="round" 
            fill="none" 
          />
          <text x="200" y="320" transform="rotate(-48, 200, 320)" fill="#78716C" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
            A. BONIFACIO AVE
          </text>

          {/* North Avenue / West Avenue */}
          <path 
            d="M 720 620 L 950 620" 
            stroke="#FFFFFF" 
            strokeWidth="14" 
            strokeLinecap="round" 
            fill="none" 
          />
          <text x="790" y="612" fill="#78716C" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
            NORTH AVE
          </text>

          {/* MRT / LRT Elevated Track Line */}
          <path 
            d="M 140 195 L 330 330 L 505 505 L 725 625 L 945 765" 
            stroke="#0284C7" 
            strokeWidth="3.5" 
            strokeDasharray="4 4" 
            fill="none" 
          />

          {/* USER LOCATION BEACON (500, 500) */}
          <g transform="translate(500, 500)">
            {/* Pulsing ring */}
            <circle r="22" fill="#3B82F6" opacity="0.3" className="animate-ping" />
            <circle r="14" fill="#3B82F6" opacity="0.4" />
            <circle r="7.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2.5" />
            
            {/* User Label Flag */}
            <rect x="-38" y="12" width="76" height="18" rx="9" fill="#1E3A8A" />
            <text x="0" y="24" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
              You are here
            </text>
          </g>

          {/* STORE PINPOINTS ON MAP */}
          {visibleStores.map((store) => {
            const isSelected = activeStoreId === store.id;
            const isWet = store.type === 'wetmarket';
            const isClub = store.id === 'snr-congressional' || store.id === 'landers-balintawak';

            const pinColor = isWet ? '#B8381D' : isClub ? '#0F3A60' : '#15803D';

            return (
              <g 
                key={store.id} 
                transform={`translate(${store.mapX}, ${store.mapY})`}
                onClick={() => handlePinClick(store)}
                className="cursor-pointer transition-transform duration-200"
              >
                {/* Active selection glow ring */}
                {isSelected && (
                  <circle r="24" fill={pinColor} opacity="0.25" className="animate-pulse" />
                )}

                {/* Pin Shadow */}
                <ellipse cx="0" cy="5" rx="8" ry="3.5" fill="#000000" opacity="0.2" />

                {/* Pin Body / Teardrop Marker */}
                <path
                  d="M 0 0 C -9 -14 -12 -22 -12 -30 A 12 12 0 1 1 12 -30 C 12 -22 9 -14 0 0 Z"
                  fill={isSelected ? pinColor : '#44403C'}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  filter="drop-shadow(0px 3px 6px rgba(0,0,0,0.3))"
                  className={isSelected ? 'scale-110' : ''}
                />

                {/* Inner Icon Indicator */}
                <circle cx="0" cy="-30" r="5" fill="#FFFFFF" />
                {isWet ? (
                  <circle cx="0" cy="-30" r="2.5" fill={pinColor} />
                ) : (
                  <rect x="-2" y="-32" width="4" height="4" fill={pinColor} rx="1" />
                )}

                {/* PROMINENT SPEECH BUBBLE WHEN ACTIVE (As specifically requested: "parang bubble sa pinpoint, may name and the distance from the user") */}
                {isSelected && (
                  <g transform="translate(0, -52)" className="animate-in zoom-in-95 duration-150">
                    {/* Bubble Container */}
                    <rect 
                      x="-85" 
                      y="-34" 
                      width="170" 
                      height="34" 
                      rx="17" 
                      fill="#FFFFFF" 
                      stroke={pinColor} 
                      strokeWidth="2.5" 
                      filter="drop-shadow(0px 8px 16px rgba(0,0,0,0.22))"
                    />
                    
                    {/* Speech Bubble Pointer Arrow */}
                    <polygon 
                      points="-7,0 7,0 0,7" 
                      fill="#FFFFFF" 
                      stroke={pinColor}
                      strokeWidth="2"
                    />
                    {/* Mask bottom arrow border */}
                    <line x1="-6" y1="0" x2="6" y2="0" stroke="#FFFFFF" strokeWidth="3" />

                    {/* Bubble Text: Store Name & Distance */}
                    <text 
                      x="0" 
                      y="-19" 
                      textAnchor="middle" 
                      fill="#1C1917" 
                      fontSize="11" 
                      fontWeight="bold" 
                      fontFamily="sans-serif"
                    >
                      {store.shortName}
                    </text>
                    <text 
                      x="0" 
                      y="-7" 
                      textAnchor="middle" 
                      fill={pinColor} 
                      fontSize="10" 
                      fontWeight="bold" 
                      fontFamily="sans-serif"
                    >
                      📍 {store.distanceKm} km • {store.walkMinutes} mins
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* FLOATING MAP ZOOM & RESET CONTROLS (Right side) */}
        <div className="absolute right-4 top-28 z-10 flex flex-col gap-2">
          <button
            type="button"
            onClick={handleZoomIn}
            className="w-10 h-10 rounded-full bg-white/95 text-stone-800 shadow-lg flex items-center justify-center hover:bg-white active:scale-95 transition-all border border-stone-200"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handleZoomOut}
            className="w-10 h-10 rounded-full bg-white/95 text-stone-800 shadow-lg flex items-center justify-center hover:bg-white active:scale-95 transition-all border border-stone-200"
            title="Zoom Out (Reveal More)"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={centerOnUser}
            className="w-10 h-10 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center hover:bg-blue-700 active:scale-95 transition-all"
            title="Recenter on My Location"
            aria-label="Recenter on My Location"
          >
            <LocateFixed className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* BOTTOM DRAWER / HORIZONTAL SNAP-SCROLL PICKER */}
      <div className="relative z-20 bg-white rounded-t-[32px] shadow-[0_-10px_35px_rgba(0,0,0,0.18)] border-t border-stone-200/80 pt-3 pb-safe-sheet flex flex-col space-y-3">
        
        {/* Grab Handle & Category Switcher */}
        <div className="flex items-center justify-between px-5 pt-1">
          <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-full text-xs font-bold">
            <button
              type="button"
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1 rounded-full transition-all tap-spring ${
                categoryFilter === 'all'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              {isTagalog ? 'Lahat' : 'All Stores'} ({visibleStores.length})
            </button>
            <button
              type="button"
              onClick={() => setCategoryFilter('wetmarket')}
              className={`px-3 py-1 rounded-full transition-all tap-spring ${
                categoryFilter === 'wetmarket'
                  ? 'bg-[#B8381D] text-white shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              🐟 {isTagalog ? 'Palengke' : 'Wet Market'}
            </button>
            <button
              type="button"
              onClick={() => setCategoryFilter('supermarket')}
              className={`px-3 py-1 rounded-full transition-all tap-spring ${
                categoryFilter === 'supermarket'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              🛒 Supermarket &amp; Club
            </button>
          </div>

          <span className="text-[11px] font-semibold text-stone-500">
            {isTagalog ? 'I-swipe ang mga store ➔' : 'Swipe cards below ➔'}
          </span>
        </div>

        {/* HORIZONTAL CAROUSEL PICKER (Synchronized with Map) */}
        <div
          ref={carouselRef}
          onScroll={handleCarouselScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-3 px-5 pb-2 no-scrollbar scroll-smooth"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {visibleStores.map((store) => {
            const isSelected = activeStoreId === store.id;
            const isCurrentPreferred =
              store.type === 'wetmarket'
                ? preferredWetMarketId === store.id
                : preferredSupermarketId === store.id;

            const travelTime =
              transportMode === 'walk'
                ? `${store.walkMinutes} mins lakad`
                : transportMode === 'commute'
                ? `~${store.commuteMinutes} mins commute (₱${store.commuteFare})`
                : `~${store.driveMinutes} mins biyahe`;

            const isWet = store.type === 'wetmarket';
            const accent = isWet ? '#B8381D' : '#15803D';

            return (
              <div
                key={store.id}
                ref={(el) => { cardRefs.current[store.id] = el; }}
                onClick={() => handlePinClick(store)}
                className={`snap-center shrink-0 w-[84vw] sm:w-[320px] rounded-2xl p-4 border-2 transition-all cursor-pointer tap-spring flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#B8381D] bg-amber-50/50 shadow-md scale-101'
                    : 'border-stone-200 bg-stone-50/70 hover:bg-stone-100/60 shadow-xs'
                }`}
              >
                <div>
                  {/* Top Row: Store Name & Distance */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${isWet ? 'bg-[#B8381D]' : 'bg-emerald-600'}`} />
                        <h4 className="font-sans font-bold text-sm text-stone-900 truncate">
                          {store.name}
                        </h4>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5 truncate">
                        {store.address}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-extrabold text-stone-900 bg-white border border-stone-200 px-2.5 py-1 rounded-full shadow-xs">
                        {store.distanceKm} km
                      </span>
                    </div>
                  </div>

                  {/* Travel & Traffic Indicators */}
                  <div className="flex items-center gap-2 mt-2.5 text-xs text-stone-600">
                    <span className="font-semibold text-stone-800">{travelTime}</span>
                    <span>•</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      store.trafficLevel === 'Heavy'
                        ? 'bg-rose-100 text-rose-800'
                        : store.trafficLevel === 'Moderate'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {isTagalog ? `Trapiko: ${store.trafficLevel}` : `Traffic: ${store.trafficLevel}`}
                    </span>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-1.5 mt-2 overflow-hidden">
                    <span className="text-[10px] text-stone-600 bg-white border border-stone-200 px-2 py-0.5 rounded-md truncate">
                      {store.badge}
                    </span>
                    {store.wholesaleRate && (
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md shrink-0">
                        Wholesale
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Action: Select Store */}
                <div className="pt-3.5 mt-2 border-t border-stone-200/60 flex items-center justify-between">
                  <div className="text-[11px] font-semibold text-stone-500">
                    {isCurrentPreferred ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        {isTagalog ? 'Kasalukuyang Bilihan' : 'Active Choice'}
                      </span>
                    ) : (
                      <span>{store.type === 'wetmarket' ? (isTagalog ? 'Palengke' : 'Wet Market') : (isTagalog ? 'Supermarket' : 'Supermarket')}</span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectStore(store);
                    }}
                    style={{ backgroundColor: isCurrentPreferred ? '#15803D' : colorTheme.badgeBg }}
                    className="px-4 py-2 rounded-xl text-white text-xs font-bold shadow-sm tap-spring hover:opacity-95 active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <span>{isCurrentPreferred ? (isTagalog ? 'Naka-set' : 'Selected') : (isTagalog ? 'Piliin Ito' : 'Select Store')}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
