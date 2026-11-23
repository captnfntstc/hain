'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useHain } from '../context/HainContext';
import { 
  X, 
  MapPin, 
  Search, 
  LocateFixed, 
  ZoomIn, 
  ZoomOut, 
  Compass, 
  Check, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { 
  PRESET_ADDRESS_ANCHORS, 
  AddressAnchorItem 
} from '../types/hain';

export default function RegionLocationModal() {
  const {
    isRegionModalOpen,
    setIsRegionModalOpen,
    userAddress,
    setUserAddress,
    userPinCoordinates,
    setUserPinCoordinates,
    language,
    colorTheme,
  } = useHain();

  const isTagalog = language === 'tl';

  // Active address search query
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Selected Anchor / Coordinates on the map
  const [selectedAnchor, setSelectedAnchor] = useState<AddressAnchorItem>(() => {
    const existing = PRESET_ADDRESS_ANCHORS.find(a => a.name === userAddress || a.shortName === userAddress);
    return existing || PRESET_ADDRESS_ANCHORS[0];
  });

  const [pinPos, setPinPos] = useState<{ x: number; y: number }>(() => ({
    x: userPinCoordinates?.x || 500,
    y: userPinCoordinates?.y || 500,
  }));

  // Zoom and map center
  const [zoomLevel, setZoomLevel] = useState<number>(1.2);
  const [mapCenter, setMapCenter] = useState<{ x: number; y: number }>({
    x: userPinCoordinates?.x || 500,
    y: userPinCoordinates?.y || 500,
  });

  const mapSvgRef = useRef<SVGSVGElement>(null);

  // Sync state whenever modal opens
  useEffect(() => {
    if (isRegionModalOpen) {
      const match = PRESET_ADDRESS_ANCHORS.find(a => a.name === userAddress || a.shortName === userAddress);
      if (match) {
        setSelectedAnchor(match);
        setPinPos({ x: match.mapX, y: match.mapY });
        setMapCenter({ x: match.mapX, y: match.mapY });
      } else {
        setPinPos({ x: userPinCoordinates.x, y: userPinCoordinates.y });
        setMapCenter({ x: userPinCoordinates.x, y: userPinCoordinates.y });
      }
      setSearchQuery('');
    }
  }, [isRegionModalOpen, userAddress, userPinCoordinates]);

  // Filtered preset suggestions based on query
  const filteredSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return PRESET_ADDRESS_ANCHORS;
    const q = searchQuery.toLowerCase().trim();
    return PRESET_ADDRESS_ANCHORS.filter(
      a => a.name.toLowerCase().includes(q) || 
           a.shortName.toLowerCase().includes(q) ||
           a.barangayOrDistrict.toLowerCase().includes(q) ||
           a.city.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Center on anchor when chosen
  const selectAnchor = useCallback((anchor: AddressAnchorItem) => {
    setSelectedAnchor(anchor);
    setPinPos({ x: anchor.mapX, y: anchor.mapY });
    setMapCenter({ x: anchor.mapX, y: anchor.mapY });
    setSearchQuery('');
    setIsSearchFocused(false);
  }, []);

  // Handle tap/click anywhere on SVG map to drop pin
  const handleMapClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!mapSvgRef.current) return;
    const svg = mapSvgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const cursorPt = pt.matrixTransform(svg.getScreenCTM()?.inverse());

    const clampedX = Math.max(80, Math.min(920, Math.round(cursorPt.x)));
    const clampedY = Math.max(80, Math.min(720, Math.round(cursorPt.y)));

    setPinPos({ x: clampedX, y: clampedY });

    // Check if clicked near an existing anchor
    const nearest = [...PRESET_ADDRESS_ANCHORS].sort((a, b) => {
      const distA = Math.hypot(a.mapX - clampedX, a.mapY - clampedY);
      const distB = Math.hypot(b.mapX - clampedX, b.mapY - clampedY);
      return distA - distB;
    })[0];

    const distToNearest = Math.hypot(nearest.mapX - clampedX, nearest.mapY - clampedY);
    if (distToNearest < 75) {
      setSelectedAnchor(nearest);
    } else {
      // Custom pinned position in Project 7 / Muñoz
      setSelectedAnchor({
        id: `custom-${clampedX}-${clampedY}`,
        name: `${clampedX > 500 ? 'Dangay St near Roosevelt' : 'Veterans Village'}, Project 7, Quezon City`,
        shortName: clampedX > 500 ? 'Dangay St Area' : 'Veterans Village',
        barangayOrDistrict: 'Veterans Village, Project 7',
        city: 'Quezon City',
        mapX: clampedX,
        mapY: clampedY,
        lat: 14.6565 + (clampedY - 500) * 0.00005,
        lng: 121.0189 + (clampedX - 500) * 0.00005,
        landmarkNote: 'Naka-pin sa mapa • Quezon City',
      });
    }
  };

  // Recenter map on user default (54 Dangay St)
  const handleResetToDangay = () => {
    const dangay = PRESET_ADDRESS_ANCHORS[0];
    selectAnchor(dangay);
  };

  // Confirm and apply location
  const handleApplyLocation = () => {
    setUserAddress(selectedAnchor.name);
    setUserPinCoordinates({
      x: pinPos.x,
      y: pinPos.y,
      lat: selectedAnchor.lat,
      lng: selectedAnchor.lng,
    });
    setIsRegionModalOpen(false);
  };

  if (!isRegionModalOpen) return null;

  // Compute viewBox dynamically based on center and zoomLevel
  const boxWidth = 1000 / zoomLevel;
  const boxHeight = 800 / zoomLevel;
  const minX = Math.max(0, Math.min(1000 - boxWidth, mapCenter.x - boxWidth / 2));
  const minY = Math.max(0, Math.min(800 - boxHeight, mapCenter.y - boxHeight / 2));
  const viewBoxString = `${minX} ${minY} ${boxWidth} ${boxHeight}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#FFFDF9] w-full max-w-xl rounded-t-[36px] sm:rounded-[36px] max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden animate-in slide-in-from-bottom duration-200">
        
        {/* Header Bar */}
        <div 
          style={{ backgroundColor: colorTheme.headerBg }}
          className="text-white px-6 pt-5 pb-4 rounded-b-[28px] shadow-sm relative shrink-0"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-lg text-white leading-tight">
                  {isTagalog ? 'I-set ang Lokasyon at Pin' : 'Set Address & Location Pin'}
                </h2>
                <p className="text-[11px] text-white/80">
                  {isTagalog ? 'Literal na mapa ng Muñoz, Dangay St & QC' : 'Interactive Map of Muñoz, Dangay St & QC'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsRegionModalOpen(false)}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 flex-1">
          
          {/* SEARCH FOR ADDRESS BAR */}
          <div className="relative">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder={isTagalog ? 'Maghanap ng address o kalye (e.g. 54 Dangay St)...' : 'Search street or address (e.g. 54 Dangay St)...'}
                className="w-full bg-white pl-10 pr-9 py-2.5 rounded-2xl border border-stone-200 text-xs sm:text-sm font-sans font-medium text-stone-900 focus:outline-none focus:border-[#B8381D] focus:ring-2 focus:ring-[#B8381D]/15 shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-stone-400 hover:text-stone-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Live Autocomplete Dropdown */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-2xl shadow-xl border border-stone-200/90 max-h-48 overflow-y-auto z-40 divide-y divide-stone-100">
                {filteredSuggestions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => selectAnchor(item)}
                    className="w-full px-3.5 py-2.5 text-left hover:bg-amber-50/70 flex items-start gap-2.5 transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#B8381D] shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-stone-900 truncate">{item.shortName}</div>
                      <div className="text-[11px] text-stone-500 truncate">{item.name}</div>
                    </div>
                  </button>
                ))}

                {filteredSuggestions.length === 0 && (
                  <div className="p-3 text-center text-xs text-stone-400">
                    {isTagalog ? 'Walang nahanap na tugmang kalye' : 'No matching street found'}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Preset Street Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
            {PRESET_ADDRESS_ANCHORS.slice(0, 5).map((anchor) => {
              const isSelected = selectedAnchor.id === anchor.id;
              return (
                <button
                  key={anchor.id}
                  type="button"
                  onClick={() => selectAnchor(anchor)}
                  className={`px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all tap-spring shrink-0 flex items-center gap-1 ${
                    isSelected
                      ? 'bg-[#B8381D] text-white shadow-2xs'
                      : 'bg-stone-100/90 text-stone-700 hover:bg-stone-200/80 border border-stone-200/60'
                  }`}
                >
                  <MapPin className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-stone-400'}`} />
                  <span>{anchor.shortName}</span>
                </button>
              );
            })}
          </div>

          {/* LITERAL INTERACTIVE STREET MAP CANVAS */}
          <div className="relative rounded-3xl overflow-hidden border border-stone-300 shadow-sm bg-[#F5F2EA] h-64 sm:h-72 select-none group">
            
            {/* SVG Map of Muñoz / Dangay / Project 7 */}
            <svg
              ref={mapSvgRef}
              viewBox={viewBoxString}
              onClick={handleMapClick}
              className="w-full h-full cursor-crosshair transition-all duration-300 ease-out"
            >
              <defs>
                <pattern id="city-blocks" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#EAE4D7" strokeWidth="1" />
                </pattern>
                <filter id="pin-shadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.25" />
                </filter>
              </defs>

              {/* Base Land Fill & City Grid */}
              <rect width="1000" height="800" fill="#F6F3EB" />
              <rect width="1000" height="800" fill="url(#city-blocks)" opacity="0.6" />

              {/* Park & Green Zones */}
              {/* Veterans Village Park */}
              <rect x="520" y="540" width="130" height="80" rx="16" fill="#D9EAD3" stroke="#C3DEC0" strokeWidth="1.5" />
              <text x="585" y="585" fontSize="11" fontWeight="bold" fill="#38761D" textAnchor="middle">
                Veterans Village Park
              </text>

              {/* Roosevelt Playground */}
              <rect x="360" y="440" width="90" height="60" rx="12" fill="#D9EAD3" stroke="#C3DEC0" strokeWidth="1.5" />
              <text x="405" y="475" fontSize="9" fontWeight="bold" fill="#38761D" textAnchor="middle">
                Plaza / Playground
              </text>

              {/* Balintawak Park / Greenery */}
              <rect x="120" y="160" width="110" height="90" rx="16" fill="#D9EAD3" stroke="#C3DEC0" strokeWidth="1.5" />
              <text x="175" y="210" fontSize="10" fontWeight="bold" fill="#38761D" textAnchor="middle">
                Balintawak Green
              </text>

              {/* MAJOR ROADS */}
              
              {/* EDSA (Epifanio de los Santos Avenue) Highway */}
              <path
                d="M 100 180 Q 420 380 900 680"
                fill="none"
                stroke="#E5DEC9"
                strokeWidth="38"
                strokeLinecap="round"
              />
              <path
                d="M 100 180 Q 420 380 900 680"
                fill="none"
                stroke="#D8CEB6"
                strokeWidth="34"
                strokeLinecap="round"
              />
              {/* EDSA Center Yellow Dashed Line */}
              <path
                d="M 100 180 Q 420 380 900 680"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="2.5"
                strokeDasharray="14 10"
              />
              <text x="310" y="300" fontSize="13" fontWeight="bold" fill="#8C7A58" transform="rotate(27, 310, 300)">
                EDSA (C-4 HIGHWAY)
              </text>
              <text x="730" y="565" fontSize="13" fontWeight="bold" fill="#8C7A58" transform="rotate(27, 730, 565)">
                EDSA (SOUTHBOUND)
              </text>

              {/* Roosevelt Ave (FPJ Ave) */}
              <path
                d="M 270 760 L 630 260"
                fill="none"
                stroke="#E5DEC9"
                strokeWidth="26"
                strokeLinecap="round"
              />
              <path
                d="M 270 760 L 630 260"
                fill="none"
                stroke="#FAF7F0"
                strokeWidth="20"
                strokeLinecap="round"
              />
              <text x="380" y="600" fontSize="12" fontWeight="bold" fill="#786B52" transform="rotate(-54, 380, 600)">
                Roosevelt Ave (FPJ Ave)
              </text>

              {/* LRT-1 Elevated Track on Roosevelt Ave */}
              <path
                d="M 270 760 L 630 260"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="5"
                strokeDasharray="6 3"
              />
              {/* LRT-1 FPJ Station Marker */}
              <g transform="translate(505, 430)">
                <rect x="-55" y="-14" width="110" height="28" rx="8" fill="#1E293B" stroke="#FFFFFF" strokeWidth="1.5" />
                <text x="0" y="4" fontSize="10" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">
                  LRT-1 FPJ Station
                </text>
              </g>

              {/* Congressional Avenue */}
              <path
                d="M 520 400 L 920 380"
                fill="none"
                stroke="#E5DEC9"
                strokeWidth="24"
                strokeLinecap="round"
              />
              <path
                d="M 520 400 L 920 380"
                fill="none"
                stroke="#FAF7F0"
                strokeWidth="18"
                strokeLinecap="round"
              />
              <text x="680" y="385" fontSize="11" fontWeight="bold" fill="#786B52">
                Congressional Ave
              </text>

              {/* LOCAL RESIDENTIAL STREETS */}

              {/* DANGAY STREET (Requested User Street) */}
              <path
                d="M 440 500 L 660 500"
                fill="none"
                stroke="#FAF7F0"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <text x="550" y="495" fontSize="11" fontWeight="bold" fill="#B8381D" textAnchor="middle">
                Dangay St (Veterans Village)
              </text>

              {/* Bansalangin Street */}
              <path
                d="M 440 535 L 660 535"
                fill="none"
                stroke="#FAF7F0"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <text x="550" y="530" fontSize="10" fontWeight="bold" fill="#786B52" textAnchor="middle">
                Bansalangin St
              </text>

              {/* Short Horn Street (Project 8) */}
              <path
                d="M 430 490 L 390 680"
                fill="none"
                stroke="#FAF7F0"
                strokeWidth="13"
                strokeLinecap="round"
              />
              <text x="400" y="580" fontSize="10" fontWeight="bold" fill="#786B52" transform="rotate(78, 400, 580)">
                Short Horn St (Project 8)
              </text>

              {/* Payna Street */}
              <path
                d="M 510 470 L 510 570"
                fill="none"
                stroke="#FAF7F0"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <text x="502" y="525" fontSize="9" fontWeight="bold" fill="#786B52" transform="rotate(90, 502, 525)">
                Payna St
              </text>

              {/* LANDMARK BUILDING FOOTPRINTS */}

              {/* Muñoz Public Wet Market */}
              <g transform="translate(525, 465)">
                <rect x="-40" y="-22" width="80" height="44" rx="8" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5" />
                <text x="0" y="-3" fontSize="9" fontWeight="bold" fill="#991B1B" textAnchor="middle">
                  Muñoz Market
                </text>
                <text x="0" y="11" fontSize="8" fill="#B91C1C" textAnchor="middle">
                  (Palengke)
                </text>
              </g>

              {/* WalterMart Supermarket */}
              <g transform="translate(470, 410)">
                <rect x="-35" y="-16" width="70" height="32" rx="6" fill="#DCFCE7" stroke="#22C55E" strokeWidth="1.2" />
                <text x="0" y="4" fontSize="8.5" fontWeight="bold" fill="#15803D" textAnchor="middle">
                  WalterMart
                </text>
              </g>

              {/* Puregold Muñoz */}
              <g transform="translate(460, 360)">
                <rect x="-32" y="-15" width="64" height="30" rx="6" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.2" />
                <text x="0" y="3" fontSize="8.5" fontWeight="bold" fill="#B45309" textAnchor="middle">
                  Puregold
                </text>
              </g>

              {/* S&R Membership Shopping */}
              <g transform="translate(730, 350)">
                <rect x="-35" y="-18" width="70" height="36" rx="6" fill="#E0F2FE" stroke="#0EA5E9" strokeWidth="1.2" />
                <text x="0" y="4" fontSize="9" fontWeight="bold" fill="#0369A1" textAnchor="middle">
                  S&R Superstore
                </text>
              </g>

              {/* Balintawak Cloverleaf */}
              <g transform="translate(190, 230)">
                <circle cx="0" cy="0" r="28" fill="none" stroke="#E5DEC9" strokeWidth="8" />
                <text x="0" y="3" fontSize="9" fontWeight="bold" fill="#786B52" textAnchor="middle">
                  Balintawak
                </text>
              </g>

              {/* INTERACTIVE USER LOCATION PIN (Draggable/Tappable) */}
              <g transform={`translate(${pinPos.x}, ${pinPos.y})`} filter="url(#pin-shadow)">
                {/* Concentric Pulsing Radar Rings */}
                <circle cx="0" cy="0" r="32" fill="#B8381D" fillOpacity="0.12">
                  <animate attributeName="r" values="18;38;18" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.4s" repeatCount="indefinite" />
                </circle>
                <circle cx="0" cy="0" r="14" fill="#B8381D" fillOpacity="0.25" />
                <circle cx="0" cy="0" r="6" fill="#FFFFFF" stroke="#B8381D" strokeWidth="2.5" />

                {/* Pin Teardrop Marker */}
                <path
                  d="M 0 0 C -12 -12 -16 -24 -16 -34 C -16 -44 -8 -52 0 -52 C 8 -52 16 -44 16 -34 C 16 -24 12 -12 0 0 Z"
                  fill="#B8381D"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                />
                <circle cx="0" cy="-34" r="5" fill="#FFFFFF" />

                {/* Floating Speech Bubble Callout above Pin */}
                <g transform="translate(0, -64)">
                  {/* Speech bubble card */}
                  <rect
                    x="-95"
                    y="-38"
                    width="190"
                    height="38"
                    rx="12"
                    fill="#1C1917"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                  {/* Bubble Pointer Arrow */}
                  <polygon points="0,0 -7,-6 7,-6" fill="#1C1917" />
                  
                  {/* Bubble Text */}
                  <text x="0" y="-22" fontSize="11" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">
                    {selectedAnchor.shortName}
                  </text>
                  <text x="0" y="-9" fontSize="9" fill="#FBBF24" textAnchor="middle">
                    {Math.hypot(pinPos.x - 525, pinPos.y - 465) < 90 ? '250m to Muñoz Wet Market' : 'Tap to adjust location pin'}
                  </text>
                </g>
              </g>
            </svg>

            {/* Tap-on-map hint overlay badge */}
            <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isTagalog ? 'I-tap saanman para ilipat ang pin' : 'Tap anywhere to drop pin'}</span>
            </div>

            {/* Map Zoom & GPS Control Buttons */}
            <div className="absolute bottom-2.5 right-2.5 flex flex-col gap-1.5">
              <button
                type="button"
                onClick={handleResetToDangay}
                title="Center on Dangay St"
                className="w-8 h-8 rounded-full bg-white text-stone-800 shadow-md flex items-center justify-center hover:bg-stone-50 tap-spring border border-stone-200"
              >
                <LocateFixed className="w-4 h-4 text-[#B8381D]" />
              </button>

              <button
                type="button"
                onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2.0))}
                title="Zoom in"
                className="w-8 h-8 rounded-full bg-white text-stone-800 shadow-md flex items-center justify-center hover:bg-stone-50 tap-spring border border-stone-200"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.9))}
                title="Zoom out"
                className="w-8 h-8 rounded-full bg-white text-stone-800 shadow-md flex items-center justify-center hover:bg-stone-50 tap-spring border border-stone-200"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* SELECTED LOCATION CONFIRMATION CARD */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
                  {isTagalog ? 'Napiling Lokasyon / Address' : 'Selected Anchor Address'}
                </span>
                <div className="text-sm font-bold text-stone-900 flex items-center gap-1.5 mt-0.5 truncate">
                  <MapPin className="w-4 h-4 text-[#B8381D] shrink-0" />
                  <span className="truncate">{selectedAnchor.shortName}</span>
                </div>
                <p className="text-xs text-stone-600 mt-0.5 pl-5 leading-tight">
                  {selectedAnchor.name}
                </p>
              </div>

              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full shrink-0 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Pin
              </span>
            </div>

            {selectedAnchor.landmarkNote && (
              <div className="pl-5 pt-1 text-[11px] text-amber-800 dark:text-amber-300 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600 shrink-0" />
                <span>{selectedAnchor.landmarkNote}</span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Bottom Apply Button */}
        <div className="p-4 bg-white border-t border-stone-200/80 shrink-0">
          <button
            type="button"
            onClick={handleApplyLocation}
            style={{ backgroundColor: colorTheme.badgeBg || '#B8381D' }}
            className="w-full py-3.5 rounded-full text-white font-bold text-sm shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 tap-spring"
          >
            <span>{isTagalog ? 'Ilapat ang Lokasyong Ito' : 'Apply This Location'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}