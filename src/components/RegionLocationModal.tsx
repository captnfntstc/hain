'use client';

import React from 'react';
import { useHain } from '../context/HainContext';
import { 
  X, 
  MapPin, 
  Footprints, 
  Bus, 
  Car, 
  Store, 
  ShoppingBag, 
  Check, 
  AlertTriangle,
  ChevronRight,
  Sparkles,
  Compass
} from 'lucide-react';
import { 
  REGION_LOCATIONS, 
  NEARBY_WET_MARKETS, 
  NEARBY_SUPERMARKETS, 
  TransportMode 
} from '../types/hain';

export default function RegionLocationModal() {
  const {
    isRegionModalOpen,
    setIsRegionModalOpen,
    setIsStoreMapOpen,
    userRegionId,
    setUserRegionId,
    preferredWetMarketId,
    selectWetMarketWithCheck,
    preferredSupermarketId,
    selectSupermarketWithCheck,
    transportMode,
    setTransportMode,
    language,
    colorTheme,
  } = useHain();

  if (!isRegionModalOpen) return null;

  const isTagalog = language === 'tl';

  const transpoOptions: { id: TransportMode; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'walk',
      label: isTagalog ? 'Lakad Lang' : 'Walking',
      icon: <Footprints className="w-4 h-4" />,
      desc: isTagalog ? 'Walang trapiko, libreng lakad' : 'Zero delay, ₱0 fare',
    },
    {
      id: 'commute',
      label: isTagalog ? 'Commute' : 'Commute',
      icon: <Bus className="w-4 h-4" />,
      desc: isTagalog ? 'Jeep, Trike, o Carousel' : 'Jeepney, Trike, or Bus',
    },
    {
      id: 'car',
      label: isTagalog ? 'May Sasakyan' : 'Car / Motor',
      icon: <Car className="w-4 h-4" />,
      desc: isTagalog ? 'Kotse o motorsiklo' : 'Personal car or motorcycle',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#FFFBF2] w-full max-w-lg rounded-t-[36px] sm:rounded-[36px] max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden animate-in slide-in-from-bottom duration-200">
        
        {/* Header Bar */}
        <div 
          style={{ backgroundColor: colorTheme.headerBg }}
          className="text-white px-6 pt-5 pb-5 rounded-b-[28px] shadow-sm relative shrink-0"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-lg text-white leading-tight">
                  {isTagalog ? 'Rehiyon at Palengke' : 'Region & Market Hub'}
                </h2>
                <p className="text-[11px] text-white/80">
                  {isTagalog ? 'Naka-angkla sa Muñoz / Balintawak, QC' : 'Anchored at Muñoz / Balintawak, QC'}
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
        <div className="p-5 overflow-y-auto space-y-5">
          
          {/* SECTION 1: Region / Neighborhood Anchor */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
                  {isTagalog ? 'Kasalukuyang Lokasyon / Rehiyon' : 'Current Region / City'}
                </span>
                <h3 className="text-sm font-bold text-stone-900 mt-0.5">
                  {isTagalog ? 'Pumili ng Rehiyon sa Pilipinas' : 'Select Philippine Region'}
                </h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                Live GPS Pin
              </span>
            </div>

            <select
              value={userRegionId}
              onChange={(e) => setUserRegionId(e.target.value)}
              className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm font-semibold text-stone-800 focus:outline-none focus:border-[#B8381D] cursor-pointer"
            >
              {REGION_LOCATIONS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} ({r.region}) {r.isDefault ? '• Testing Default' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Interactive Map Quick Launcher Banner */}
          <button
            type="button"
            onClick={() => {
              setIsRegionModalOpen(false);
              setIsStoreMapOpen(true);
            }}
            className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-between tap-spring hover:opacity-95 active:scale-98 transition-all"
          >
            <div className="flex items-center gap-2.5">
              <Compass className="w-5 h-5 text-white shrink-0" />
              <div className="text-left">
                <div className="leading-tight">{isTagalog ? 'Buksan ang Interactive Map Picker' : 'Open Interactive Store Map'}</div>
                <div className="text-[10px] text-white/80 font-normal">{isTagalog ? 'May predefined radius at pinpoint ng S&R, Balintawak' : 'Radar radius, pinpoints & S&R scroll picker'}</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>

          {/* SECTION 2: Mode of Transportation */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs space-y-3">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
                {isTagalog ? 'Paraan ng Pagpunta' : 'Mode of Transportation'}
              </span>
              <h3 className="text-sm font-bold text-stone-900 mt-0.5">
                {isTagalog ? 'Paano ka mamimili sa palengke?' : 'How do you travel to market?'}
              </h3>
              <p className="text-[11px] text-stone-500 mt-0.5">
                {isTagalog
                  ? 'Bumabase rito ang bilis ng biyahe, walkability, at babala sa trapiko.'
                  : 'Calculates commute time, walkability score, and traffic delays.'}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {transpoOptions.map((opt) => {
                const isSelected = transportMode === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setTransportMode(opt.id)}
                    className={`p-3 rounded-2xl border text-center transition-all tap-spring flex flex-col items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#B8381D] text-white border-[#B8381D] shadow-sm scale-102'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100/70'
                    }`}
                  >
                    <div className={isSelected ? 'text-white' : 'text-[#B8381D]'}>
                      {opt.icon}
                    </div>
                    <span className="text-xs font-bold leading-tight">{opt.label}</span>
                    <span className={`text-[10px] leading-tight ${isSelected ? 'text-white/80' : 'text-stone-400'}`}>
                      {opt.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 3: Preferred Wet Market (Palengke) */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <Store className="w-4 h-4 text-[#B8381D]" />
                  <h3 className="text-sm font-bold text-stone-900">
                    {isTagalog ? 'Paboritong Palengke (Wet Market)' : 'Preferred Wet Market'}
                  </h3>
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  {isTagalog ? 'Pinagbabatayan ng sariwang karne, isda, at gulay' : 'Source for fresh meat, fish, and vegetables'}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {NEARBY_WET_MARKETS.map((market) => {
                const isSelected = preferredWetMarketId === market.id;
                
                // Dynamic travel time based on transport mode
                const travelTime = 
                  transportMode === 'walk'
                    ? `${market.walkMinutes} mins lakad`
                    : transportMode === 'commute'
                    ? `~${market.commuteMinutes} mins commute (₱${market.commuteFare})`
                    : `~${market.driveMinutes} mins biyahe`;

                return (
                  <div
                    key={market.id}
                    onClick={() => selectWetMarketWithCheck(market.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer tap-spring ${
                      isSelected
                        ? 'bg-amber-50/70 border-[#B8381D] shadow-xs'
                        : 'bg-stone-50 border-stone-200 hover:bg-stone-100/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-stone-900 truncate">
                            {market.name}
                          </span>
                          {isSelected && (
                            <span className="w-4 h-4 rounded-full bg-[#B8381D] text-white flex items-center justify-center shrink-0">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-500">
                          <span className="font-semibold text-stone-700">{market.distanceKm} km</span>
                          <span>•</span>
                          <span>{travelTime}</span>
                        </div>

                        {/* Traffic & Walkability Indicators */}
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            market.trafficLevel === 'Heavy'
                              ? 'bg-rose-100 text-rose-800'
                              : market.trafficLevel === 'Moderate'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {isTagalog ? `Trapiko: ${market.trafficLevel}` : `Traffic: ${market.trafficLevel}`}
                          </span>

                          <span className="text-[10px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                            {market.badge}
                          </span>
                        </div>
                      </div>

                      {market.trafficLevel === 'Heavy' && (
                        <div className="flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-100/80 px-2 py-1 rounded-lg shrink-0">
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                          <span>EDSA Choke</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 4: Preferred Supermarket */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4 text-emerald-700" />
                  <h3 className="text-sm font-bold text-stone-900">
                    {isTagalog ? 'Paboritong Supermarket' : 'Preferred Supermarket'}
                  </h3>
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  {isTagalog ? 'Para sa mga sachet, pampalasa, mantika, at grocery staples' : 'For condiment sachets, cooking oil, and packaged staples'}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {NEARBY_SUPERMARKETS.map((supermarket) => {
                const isSelected = preferredSupermarketId === supermarket.id;

                const travelTime = 
                  transportMode === 'walk'
                    ? `${supermarket.walkMinutes} mins lakad`
                    : transportMode === 'commute'
                    ? `~${supermarket.commuteMinutes} mins commute`
                    : `~${supermarket.driveMinutes} mins biyahe`;

                return (
                  <div
                    key={supermarket.id}
                    onClick={() => selectSupermarketWithCheck(supermarket.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer tap-spring ${
                      isSelected
                        ? 'bg-emerald-50/70 border-emerald-600 shadow-xs'
                        : 'bg-stone-50 border-stone-200 hover:bg-stone-100/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-stone-900 truncate">
                            {supermarket.name}
                          </span>
                          {isSelected && (
                            <span className="w-4 h-4 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-500">
                          <span className="font-semibold text-stone-700">{supermarket.distanceKm} km</span>
                          <span>•</span>
                          <span>{travelTime}</span>
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            supermarket.trafficLevel === 'Heavy'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {isTagalog ? `Trapiko: ${supermarket.trafficLevel}` : `Traffic: ${supermarket.trafficLevel}`}
                          </span>
                          <span className="text-[10px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full truncate">
                            {supermarket.badge}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Bottom Confirm Button */}
        <div className="p-4 bg-white border-t border-stone-200/80 shrink-0">
          <button
            type="button"
            onClick={() => setIsRegionModalOpen(false)}
            style={{ backgroundColor: colorTheme.badgeBg || '#1E4638' }}
            className="w-full py-3.5 rounded-full text-white font-bold text-sm shadow-md active:scale-98 transition-all"
          >
            {isTagalog ? 'Ilapat ang Lokasyon at Palengke' : 'Apply Location & Markets'}
          </button>
        </div>
      </div>
    </div>
  );
}
